import React from 'react'
import { Drawer } from 'components/Drawer/Drawer'
import styled from 'styled-components'
import { CustomButton } from 'components/Button/CustomButton'
import { CustomInput } from 'components/Input/CustomInput'
import { ImageCropper } from 'components/ImageCroper/ImageCroper'

interface IProps {
  visible: boolean
  onClose: () => void
  onSave: () => void
}

export const AddSite = ({ visible, onClose, onSave }: IProps) => {
  return (
    <Drawer open={visible} onClose={onClose} width={500} title='Add site info'>
      <Wrapper>
        {/* <Row>
          <ImageCropper
            image={value?.logo}
            onUploadFinish={handleUploadImage}
            onDeleteImage={() => setValue('logo', null)}
          />
        </Row> */}

        {/* <Row>
          <CustomInput
            {...field}
            placeholder='Brand name'
            label='Brand name'
            status={errors?.title?.message ? 'error' : undefined}
            error={errors?.title?.message}
          />
        </Row> */}
      </Wrapper>
      <ControlsWrapper>
        <CustomButton buttonType='remove'>
          <span>Cancel</span>
        </CustomButton>
        <CustomButton onClick={onSave}>
          <span>Create</span>
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
