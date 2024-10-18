import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"


const Toast = ({
        autoClose = 2000,
        position = "top-right",
        theme = "colored"
}) => {

    return (
        <ToastContainer autoClose={autoClose} position={position} theme={theme}/>
    )
}
export default Toast


