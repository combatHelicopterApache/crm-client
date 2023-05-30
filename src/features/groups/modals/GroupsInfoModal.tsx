import React, {FC, useEffect, useState} from 'react'
import {Modal, Descriptions, message, Spin, Button} from "antd"
import {getGroupById} from "../../../api/groups"
import features from "../../../utils/features"

interface IProps {
    id: string,
    visible: boolean,
    handlerClose: () => void
}

export const GroupsInfoModal:FC<IProps> = ( { visible, handlerClose, id } ) => {

    const [info, setInfo] = useState<any>({})
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        const fetchGroup = async () => {
            try {
                const response = await getGroupById(id)
                setInfo(response.data.group)
            } catch (e) {
                message.error('Cant Loading' + e)
            } finally {
                 setLoading(false)
            }
        }
        if(id) fetchGroup().then()
    }, [id])

    return (
        <>
            <Modal open={ visible }  footer={null} onCancel={handlerClose} >
               <Spin spinning={loading}>
                   <Descriptions title="Group Info" layout="vertical">
                       <Descriptions.Item label="GroupName">       {info?.title}  </Descriptions.Item>
                       <Descriptions.Item label="GroupCode">       {info?.code}  </Descriptions.Item>
                       <Descriptions.Item label="GroupCratedAt">   {features.normalizeDateTime(info?.created_at)}  </Descriptions.Item>
                       <Descriptions.Item label="GroupUpdatedAt">  {features.normalizeDateTime(info?.updated_at)}  </Descriptions.Item>
                   </Descriptions>
               </Spin>
                <Button onClick={ handlerClose } type="primary" ghost >Ok</Button>
            </Modal>
        </>
    )
}

