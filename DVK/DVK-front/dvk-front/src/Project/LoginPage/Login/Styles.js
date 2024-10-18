import styled from "styled-components"

export const Container = styled.div`
    flex: 1;
    margin: 0;
    padding: 0;
`
export const HeaderContainer = styled.div`
    height: 60px;
    padding: 2rem 3rem;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const LoginContainer = styled.div`
    background-color: #eff0f4;
`
export const LoginFormContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    -webkit-animation-duration: 0.3s;
    animation-duration: 0.3s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;

    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;

    @keyframes fadeInDown {
        0% {
            opacity: 0;
            transform: translateY(-20px)
        }
        100% {
            opacity: 1;
            transform: translateY(0)
        }
    }
`
export const LoginForm = styled.div`
    width: 400px;
    height: 450px;
    position: relative;
    z-index: 1;
    background:#ffffff;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1)
`
export const LoginTitle = styled.h3`
    font-weight: 700;
    font-size: 21px;
    margin-top: 20px;
    line-height: 28.64px;
    margin-bottom: 1rem;
    text-align: center;
    color: #0e1f4d;
`
export const LoginButton = styled.button`
    outline: 0;
    background: #235ee8;
    border: 0;
    width: 360px;
    border-radius: 16px;
    text-decoration: none;
    padding: 18px 64px 18px 64px;
    color: white;
    font-size: 16px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    font-family: 'Montserrat'
    font-weight: 600;
    font-size: 16px;
    line-height: 19.5px;
    width: 100%;
    margin-top:10%;
`