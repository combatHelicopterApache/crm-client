import React, { FC } from 'react'
import { Drawer } from 'components/Drawer/Drawer'
import styled from 'styled-components'
import { Office } from '../types'
import { CustomButton } from 'components/Button/CustomButton'
import { Span } from 'molecules/Span/Span'
import { EditableBlock } from 'components/UI/EditableBlock'
import { Row } from 'components/UI/Row'
import { Select } from 'components/Select/Select'
import { CustomInput } from 'components/Input/CustomInput'
import { useUsers } from 'hooks/useUsers'

interface IProps {
  visible: boolean
  onClose: () => void
  office: Office
}

export const EditOffice: FC<IProps> = ({ visible, onClose, office }) => {
  const { users } = useUsers()

  return (
    <Drawer
      destroyOnClose
      title={office?.id ? 'Edit office' : 'Create office'}
      onClose={onClose}
      open={visible}
      width={500}
    >
      <Wrapper>
        <Row width={100} title='Status'>
          <EditableBlock
            value={office.active ? 'Active' : 'Inactive'}
            editMode={!office?.id}
          >
            <Select
              label='Status'
              options={[
                {
                  value: true,
                  label: 'Active',
                },
                {
                  value: false,
                  label: 'Inactive',
                },
              ]}
            />
          </EditableBlock>
        </Row>
        <Row width={100} title='Title'>
          <EditableBlock value={office.title} editMode={!office?.id}>
            <CustomInput
              style={{ width: '100%' }}
              label='Title'
              value={office.title}
            />
          </EditableBlock>
        </Row>
        <Row width={100} title='Description'>
          <EditableBlock value={office.description} editMode={!office?.id}>
            <CustomInput label='Description' value={office.description} />
          </EditableBlock>
        </Row>
        <Row width={100} title='Address'>
          <EditableBlock value={office.address} editMode={!office?.id}>
            <CustomInput label='Address' value={office.address} />
          </EditableBlock>
        </Row>
        <Row width={100} title='Manager'>
          <EditableBlock value={office.company_id} editMode={!office?.id}>
            <Select
              label='Manager'
              options={[
                {
                  value: '1',
                  label: 'Vasya',
                },
                {
                  value: '2',
                  label: 'Petro',
                },
              ]}
            />
          </EditableBlock>
        </Row>

        <Constrols>
          {office?.id && (
            <CustomButton buttonType='remove'>
              <Span>Delete</Span>
            </CustomButton>
          )}
          <CustomButton>
            <Span>Create</Span>
          </CustomButton>
        </Constrols>
      </Wrapper>
    </Drawer>
  )
}
const Wrapper = styled.div``
const Constrols = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
  padding: 20px 0;
`
