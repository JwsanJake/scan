import styled, { css } from "styled-components";


export const MainContainer = styled.div`
    display: flex;
    min-height: 100vh;
    width: 100%;
`

export const Content = styled.div`
    flex: 1;
    float: left;
    width: 80%;
`

export const Header = styled.div`
    height: 80px;
    padding: 2rem 3rem;
    background-color: white;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: end;
    align-items: center;
`
export const Main = styled.div`
    padding: 1rem 2rem;
    height: 95%;
    float: left;
    width: 100%
`