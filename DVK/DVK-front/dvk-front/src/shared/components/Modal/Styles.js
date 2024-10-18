import styled from "styled-components"

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
`

export const ModalWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    z-index: 1000;
    width: 500px;
    overflow-y: auto;
    border-radius: 15px;
`

export const ModalTitle = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 4px;
`

export const ModalContent = styled.div`
    padding: 0px 16px 16px 16px;
`

export const ModalButton = styled.button`
    background: #D4D8E1;
    border-radius: 10px;
    padding: 9px 15px;
`
