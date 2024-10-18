import styled from "styled-components"


const TextareaInput = ({ name, label, register, errors, required, type, placeholder }) => {

    return (
        <div>
            <div>
                {label}
            </div>
            <StyledTextarea 
                id={name}
                name={name}
                type="text"
                {...register(name)} 
            />
        </div>
    )
} 
export default TextareaInput

const StyledTextarea = styled.textarea`
    resize: none;
    width: 60%;
    height: 100px;
    border: 1px solid gray;
    border-radius: 15px;
    outline: none;
    background-color: white;
    color: black;

`