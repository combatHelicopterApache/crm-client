import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Drawer } from 'components/Drawer/Drawer'
import { Row } from 'components/UI/Row'
import { CustomInput } from 'components/Input/CustomInput'
import { Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import { Select } from 'components/Select/Select'
import { countries } from 'utils/countryList'
import { useBrands } from 'hooks/useBrands'
import { useUsers } from 'hooks/useUsers'

interface IProps {
  open: boolean
  onClose: () => void
  onSave: () => void
  lead: object
  onChange: () => void
}
const initialLead = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  geo: '',
  brand_id: '',
  assigned_to: '',
}

export const CreateLead: FC<IProps> = ({ open, onClose, onSave }) => {
  const { brands } = useBrands()
  const { users } = useUsers()
  const [lead, setLead] = useState(initialLead)
  const onChange = e => {
    const { name, value } = e.target
    setLead(prev => ({ ...prev, [name]: value }))
  }
  return (
    <Drawer width={600} title='Create New Lead' open={open} onClose={onClose}>
      <Wrapper>
        <Row title='First Name'>
          <CustomInput
            name='first_name'
            onChange={onChange}
            value={lead?.first_name}
            label='First name'
          />
        </Row>
        <Row title='Last Name'>
          <CustomInput
            name='last_name'
            onChange={onChange}
            value={lead?.last_name}
            label='Last Name'
          />
        </Row>
        <Row title='Country'>
          <Select
            value={lead?.geo}
            onChange={e =>
              onChange({
                target: {
                  name: 'geo',
                  value: e.target.value,
                },
              })
            }
            options={countries?.map(item => ({
              value: item.code,
              label: item.name,
            }))}
          />
        </Row>
        <Row title='Email'>
          <CustomInput
            name='email'
            onChange={onChange}
            value={lead?.email}
            label='Email'
          />
        </Row>
        <Row title='Phone'>
          <CustomInput
            name='phone'
            onChange={onChange}
            value={lead?.phone}
            label='Phone'
          />
        </Row>
        <Row title='Brand'>
          <Select
            label='Brand'
            options={brands?.map(item => ({
              label: item.title,
              value: item.id,
            }))}
            value={lead?.brand_id}
            onChange={e =>
              onChange({
                target: {
                  name: 'brand_id',
                  value: e.target.value,
                },
              })
            }
          />
        </Row>
        <Row title='Assigned to'>
          <Select
            value={lead?.assigned_to}
            size='small'
            onChange={e =>
              onChange({
                target: {
                  name: 'assigned_to',
                  value: e.target.value,
                },
              })
            }
            options={users?.map(item => ({
              label: item.full_name,
              value: item.id,
            }))}
          />
        </Row>
        <Controls>
          <Button onClick={() => onSave(lead)} startIcon={<Add />}>
            Create
          </Button>
        </Controls>
      </Wrapper>
    </Drawer>
  )
}

const Wrapper = styled.div``
const Controls = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: end;
`
