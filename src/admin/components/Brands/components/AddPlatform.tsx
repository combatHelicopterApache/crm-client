import React, { ChangeEvent, useState } from 'react'
import { Drawer } from 'components/Drawer/Drawer'
import styled from 'styled-components'
import { CustomButton } from 'components/Button/CustomButton'
import { CustomInput } from 'components/Input/CustomInput'
import { ImageCropper } from 'components/ImageCroper/ImageCroper'
import { notification } from 'components/Notification/Notification'
import { uploadSingleFile } from 'api/Upload'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { Span } from 'molecules/Span/Span'
import { v4 as uuidv4 } from 'uuid'
import { Tooltip } from 'antd'

interface IProps {
  visible: boolean
  onClose: () => void
  onSave: () => void
}

interface IState {
  cfd_id: string
  cfd_logo: string
  cfd_name: string
  cfd_domain: string
}

const initState: IState = {
  cfd_id: uuidv4(),
  cfd_logo: '',
  cfd_name: '',
  cfd_domain: '',
}

export const AddPlatform = ({ visible, onClose, onSave }: IProps) => {
  const [state, setState] = useState<IState>(initState)

  const handleSave = () => {
    onSave(state)
    setState(initState)
    onClose()
  }

  const handleUploadImage = async (file: File) => {
    const fmData = new FormData()

    fmData.append('media', file)

    try {
      const image = await uploadSingleFile(fmData)

      setState(prev => ({
        ...prev,
        cfd_logo: image?.url ? image?.url : null,
      }))
    } catch (error) {
      notification('error', 'Invalid data')
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setState(prev => ({ ...prev, [name]: value }))
  }
  const handleClose = () => {
    onClose()
    setState(initState)
  }

  return (
    <Drawer
      width={500}
      title='Add  platform'
      onClose={handleClose}
      open={visible}
    >
      <Wrapper>
        <Row>
          <ImageCropper
            image={state?.cfd_logo}
            onUploadFinish={handleUploadImage}
            onDeleteImage={() => setState(prev => ({ ...prev, cfd_logo: '' }))}
          />
        </Row>

        <Row>
          <CustomInput
            onChange={onChange}
            name='cfd_name'
            value={state.cfd_name}
            placeholder='CFD Name'
            label='CFD Name'
          />
        </Row>
        <Row>
          <CustomInput
            onChange={onChange}
            name='cfd_domain'
            value={state.cfd_domain}
            placeholder='www.example.com'
            style={{ marginBottom: '20px' }}
            label='CFD Domain'
          />
        </Row>
      </Wrapper>
      <ControlsWrapper>
        <CustomButton onClick={handleClose} buttonType='remove'>
          <span>Cancel</span>
        </CustomButton>
        <CustomButton onClick={handleSave}>
          <span>Add to Brand</span>
        </CustomButton>
      </ControlsWrapper>
    </Drawer>
  )
}

const Wrapper = styled.div``
const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: end;
`
const Row = styled.div`
  padding: 10px;
`
const LableRow = styled.div`
  cursor: pointer;
  & svg {
    color: var(--blueColor);
  }
`
