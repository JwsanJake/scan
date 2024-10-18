const getAuthToken = () => {
    return localStorage.getItem("ACCESS_TOKEN")
}

const setAuthToken = (token) => {
    localStorage.setItem("ACCESS_TOKEN", token)
}

const removeAuthToken = () => {
    if (getAuthToken()) {
        localStorage.removeItem("ACCESS_TOKEN")
    }
}

export { getAuthToken, setAuthToken, removeAuthToken }