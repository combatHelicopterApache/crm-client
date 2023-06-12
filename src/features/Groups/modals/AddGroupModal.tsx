import React, {FC} from 'react'
import {Modal} from "antd"
import {AddGroupForm} from "../forms/AddGroupForm";

interface IProps {
    visible: boolean,
    handlerClose: () => void
}

export const AddGroupModal:FC<IProps> = ( { visible, handlerClose } ) => {
    return (
        <>
            <Modal open={ visible }  footer={null} onCancel={handlerClose} >
                <AddGroupForm />
            </Modal>
        </>
    )
}

