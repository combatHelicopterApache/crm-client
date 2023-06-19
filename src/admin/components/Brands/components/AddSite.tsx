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
  id: string
  site_logo: string
  site_name: string
  site_domains: string[]
}

export const AddSite = ({ visible, onClose, onSave }: IProps) => {
  const initState: IState = {
    id: uuidv4(),
    site_logo: '',
    site_name: '',
    site_domains: ['www.example.com'],
  }
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
        site_logo: image?.url ? image?.url : null,
      }))
    } catch (error) {
      notification('error', 'Invalid data')
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setState(prev => ({ ...prev, [name]: value }))
  }

  const handleAddRow = () => {
    setState(prev => ({
      ...prev,
      site_domains: [...prev.site_domains, 'www.example.com'],
    }))
  }
  const handleRemoveRow = (idx: number) => {
    setState(prev => ({
      ...prev,
      site_domains: prev.site_domains.filter((item, i) => i !== idx),
    }))
  }
  const handleChangeRow = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const newState = {
      ...state,
      site_domains: state.site_domains.map((item, i) =>
        i === idx ? e.target.value : item,
      ),
    }
    setState(newState)
  }

  const handleClose = () => {
    onClose()
    setState(initState)
  }
  return (
    <Drawer
      width={500}
      title='Add site'
      destroyOnClose
      onClose={handleClose}
      open={visible}
    >
      <Wrapper>
        <Row>
          <ImageCropper
            image={state?.site_logo}
            onUploadFinish={handleUploadImage}
            onDeleteImage={() => setState(prev => ({ ...prev, site_logo: '' }))}
          />
        </Row>

        <Row>
          <CustomInput
            onChange={onChange}
            name='site_name'
            placeholder='Site Name'
            label='Site name'
          />
        </Row>
        <Row>
          {state?.site_domains?.map((item, idx) => (
            <CustomInput
              key={`${item}-${idx}`}
              onChange={e => handleChangeRow(e, idx)}
              name='site_name'
              value={item}
              placeholder='www.example.com'
              autoFocus
              style={{ marginBottom: '20px' }}
              label={
                idx === 0 ? (
                  <Span onClick={handleAddRow}>
                    <LableRow>
                      <Tooltip title='Add new row'>
                        Site Domain <PlusOutlined />
                      </Tooltip>
                    </LableRow>{' '}
                  </Span>
                ) : (
                  <Span onClick={() => handleRemoveRow(idx)}>
                    <LableRow>
                      <Tooltip title='Remove row'>
                        Site Domain <MinusOutlined />
                      </Tooltip>
                    </LableRow>
                  </Span>
                )
              }
            />
          ))}
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
