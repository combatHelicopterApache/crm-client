import React, { FC, useState } from 'react'
import { Drawer } from 'components/Drawer/Drawer'
import { Button } from '@mui/material'
import { Save, Cancel } from '@mui/icons-material'
import styled from 'styled-components'

import { Checkbox } from 'components/Checkbox/Checkbox'
import { P } from 'molecules/P/P'
import { useStatus } from 'hooks/useStatus'
import { useUsers } from 'hooks/useUsers'
import { Select } from 'components/Select/Select'

interface IProps {
  open: boolean
  onClose: () => void
}
export const BulkActions: FC<IProps> = ({ open, onClose }) => {
  const { users } = useUsers()
  const { status } = useStatus()
  const [state, setState] = useState({
    change_status: false,
    clear_comment: false,
    change_user: false,
    change_user_id: '',
    change_status_id: '',
  })

  const onChange = (name, value) => {
    setState(prev => ({ ...prev, [name]: value }))
  }
  return (
    <Drawer destroyOnClose title='Bulk Actions' open={open} onClose={onClose}>
      <Row>
        <Checkbox
          checked={state.change_status}
          onChange={() => onChange('change_status', !state.change_status)}
        />
        <P>Bulk Change Status</P>
      </Row>
      {state.change_status && (
        <Select
          value={state.change_status_id}
          size='small'
          label='Status'
          onChange={e => onChange('change_status_id', e.target.value)}
          options={status?.map(item => ({
            label: item.title,
            value: item.id,
          }))}
        />
      )}
      <Row>
        <Checkbox
          checked={state.change_user}
          onChange={() => onChange('change_user', !state.change_user)}
        />
        <P>Bulk Change Assigned User</P>
      </Row>
      {state.change_user && (
        <Select
          value={state.change_user_id}
          size='small'
          label='Users'
          onChange={e => onChange('change_user_id', e.target.value)}
          options={users?.map(item => ({
            label: item.full_name,
            value: item.id,
          }))}
        />
      )}
      <Row>
        <Checkbox
          checked={state.clear_comment}
          onChange={() => onChange('clear_comment', !state.clear_comment)}
        />
        <P>Bulk Clear Comment</P>
      </Row>
      <Controls>
        <Button onClick={onClose} startIcon={<Cancel />}>
          Cancel
        </Button>
        <Button startIcon={<Save />}>Save</Button>
      </Controls>
    </Drawer>
  )
}

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 5px 0 10px 0;
`
const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
`
