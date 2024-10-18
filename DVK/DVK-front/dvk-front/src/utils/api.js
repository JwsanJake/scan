import axios from "axios"
import { useNavigate } from "react-router-dom"
import { getAuthToken, removeAuthToken } from "./token"

//const url = 'https://zhezapp02:443/api/api'
const url = 'https://localhost:5001/api/'
//const url = 'http://zhezapp02:8124/api/api'

export const api = axios.create({
	baseURL: `${url}`,
	//withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
})

api.interceptors.request.use(
	(config) => {
		const token = getAuthToken()
        
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)


export const useResponseInterceptor = () => {
    const navigate = useNavigate()

    return api.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                removeAuthToken()
                navigate("/login")
            }

            return Promise.reject(error)
        }
    )
}