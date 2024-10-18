import { ModalOverlay, ModalWrapper, ModalTitle, ModalContent } from "./Styles"


const Modal = ({ isOpen, onClose }) => {


    return (
        <>
            <ModalOverlay onClick={onClose}></ModalOverlay>
            <ModalWrapper>  
                <ModalTitle>Добавить ФЛ</ModalTitle>

                <ModalContent>
                    Содержимое
                </ModalContent>
            </ModalWrapper>
        </>
        
    )
}
export default Modal