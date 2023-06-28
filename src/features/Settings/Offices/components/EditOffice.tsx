import React, { ChangeEvent, FC } from 'react'
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
import { TimePicker } from 'components/TimePicker/TimePicker'

import dayjs from 'dayjs'

const format = 'HH:mm'

interface IProps {
  visible: boolean
  onClose: () => void
  office: Office
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSave: () => void
  handleUpdate: () => void
  handleCancel: (id: Office['id']) => void
}

export const EditOffice: FC<IProps> = ({
  visible,
  onClose,
  office,
  onChange,
  handleSave,
  handleUpdate,
  handleCancel,
}) => {
  const { users } = useUsers()

  return (
    <Drawer
      destroyOnClose
      title={office?.id ? 'Edit office' : 'Create office'}
      onClose={onClose}
      open={visible}
      width={office?.id ? 700 : 500}
    >
      <Wrapper>
        <Row width={100} title='Status'>
          <EditableBlock
            value={office.active ? 'Active' : 'Inactive'}
            editMode={!office?.id}
            onSave={handleUpdate}
            onCancel={() => handleCancel(office?.id)}
          >
            <Select
              label='Status'
              name='active'
              value={office?.active}
              onChange={onChange}
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
          <EditableBlock
            onSave={handleUpdate}
            onCancel={() => handleCancel(office?.id)}
            value={office.title}
            editMode={!office?.id}
          >
            <CustomInput
              style={{ width: '100%' }}
              label='Title'
              value={office.title}
              name='title'
              onChange={onChange}
            />
          </EditableBlock>
        </Row>
        <Row width={100} title='Description'>
          <EditableBlock
            onSave={handleUpdate}
            onCancel={() => handleCancel(office?.id)}
            value={office.description}
            editMode={!office?.id}
          >
            <CustomInput
              onChange={onChange}
              name='description'
              label='Description'
              value={office.description}
            />
          </EditableBlock>
        </Row>
        <Row width={100} title='Address'>
          <EditableBlock
            onSave={handleUpdate}
            onCancel={() => handleCancel(office?.id)}
            value={office.address}
            editMode={!office?.id}
          >
            <CustomInput
              onChange={onChange}
              name='address'
              label='Address'
              value={office.address}
            />
          </EditableBlock>
        </Row>
        <Row width={100} title='Manager'>
          <EditableBlock
            onSave={handleUpdate}
            onCancel={() => handleCancel(office?.id)}
            value={office.company_id}
            editMode={!office?.id}
          >
            <Select
              label='Manager'
              name='company_id'
              onChange={onChange}
              options={users}
              displayEmpty
              disabled={!users?.length}
            />
          </EditableBlock>
        </Row>
        <Row width={100} title=' Work Start '>
          <EditableBlock
            onSave={handleUpdate}
            onCancel={() => handleCancel(office?.id)}
            value={office.time_cards?.time_start}
            editMode={!office?.id}
          >
            <TimePicker
              format={format}
              name='time_start'
              onChange={(event, dateString) =>
                onChange({ target: { name: 'time_start', value: dateString } })
              }
              value={
                office.time_cards?.time_start
                  ? dayjs(office.time_cards?.time_start, format)
                  : null
              }
            />
          </EditableBlock>
        </Row>
        <Row width={100} title=' Work End '>
          <EditableBlock
            onSave={handleUpdate}
            onCancel={() => handleCancel(office?.id)}
            value={office.time_cards?.time_end}
            editMode={!office?.id}
          >
            <TimePicker
              format={format}
              name='time_end'
              onChange={(event, dateString) =>
                onChange({ target: { name: 'time_end', value: dateString } })
              }
              value={
                office.time_cards?.time_end
                  ? dayjs(office.time_cards?.time_end, format)
                  : null
              }
            />
          </EditableBlock>
        </Row>

        <Constrols>
          {!office?.id && (
            <CustomButton onClick={handleSave}>
              <Span>Create</Span>
            </CustomButton>
          )}
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
