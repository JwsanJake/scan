import styled from "styled-components"

export const StyledSearchDropdown = styled.div`
    width: 100%;
    background-color: white;
    position: absolute;
    flex-direction: column;
    border: 1px solid #EFF0F4;
    border-radius: 10px;
    margin-top: 0.5rem;
    max-height: 300px;
    overflow-y: auto;
    padding: 10px 15px;

    &::-webkit-scrollbar {
		width: 4px;
	}

	&::-webkit-scrollbar-track {
		width: 12px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: #d4d8e1;
		height: 128px;
		border-radius: 8px;
		margin-right: 4px;
	}
`