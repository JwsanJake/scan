import styled from "styled-components"


export const StyledSearchBar = styled.div`
    width: ${(props) => (props.width ? props.width : "300px")};
    height: 2.2rem;
    border: 0.2px solid #d1d1d1;
    border-radius: 6px;
    padding: 8px 18px;
    background-color: white;
    display: flex;
    align-items: center;
    transition: 0.3s ease-in-out;

    &:hover {
        border: 0.2px solid #1677ff;
    }

    &::placeholder {
        color: #ababab;
        font-weight: 200;
    }
`
export const StyledSearchBarInput = styled.input`
    background-color: white;
    border: none;
    height: 100%;
    width: 100%;
    font-family: "SegoeUI", sans-serif;
    font-weight: 300;
    font-size: 14px;

    &: focus {
        outline: none;
    }
`