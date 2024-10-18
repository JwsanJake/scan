import styled, { css } from "styled-components"


export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 8px 0px;
`
export const InputLabel = styled.div`
    color: darkgray;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #000000E0;
    width: ${(props) => (props.width ? props.width : "300px")};
`
export const StyledInput = styled.input`
    background-color: white;
    border: 0.2px solid #d1d1d1;
    border-radius: 6px;
    padding: 8px 18px;
    width: ${(props) => (props.width ? props.width : "300px")};
    font-family: "SegoeUI", sans-serif;
    font-weight: 300;
    font-size: 14px;
    outline: none;
    transition: 0.3s ease-in-out;

    &:hover {
        border: 0.2px solid #1677ff;
    }

    &::placeholder {
        color: #ababab;
        font-weight: 200;
    }
`

export const ErrorLabel = styled.div`
	font-weight: 400;
	font-size: 11px;
	line-height: 15px;
	color: #ff0000;
`