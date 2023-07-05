import React from 'react'
import { Drawer } from 'components/Drawer/Drawer'
import styled from 'styled-components'
import { CustomInput } from 'components/Input/CustomInput'
import { ColorPicker } from 'antd'
import { P } from 'molecules/P/P'
import { Button } from '@mui/material'
import { Delete, Add } from '@mui/icons-material'

export const LeadStatusForm = ({
  state,
  open,
  onClose,
  onSave,
  onChange,
  onDelete,
}) => {
  return (
    <Drawer
      title={state?.id ? 'Update Status' : 'Create New Status'}
      open={open}
      onClose={onClose}
    >
      <Wrapper>
        <ColorPickerWrapper>
          <P>Status Color:</P>
          <ColorPicker
            format={'hex'}
            value={state.value}
            onChange={(value, hex) =>
              onChange({
                target: {
                  name: 'color',
                  value: hex,
                },
              })
            }
          />
        </ColorPickerWrapper>

        <CustomInput
          onChange={onChange}
          label='Status Name'
          name='title'
          value={state.title}
        />
      </Wrapper>
      <ControlsWrapper>
        {state?.id && (
          <Button startIcon={<Delete />} onClick={() => onDelete(state.id)}>
            Delete
          </Button>
        )}
        <Button onClick={onSave} startIcon={<Add />}>
          {state?.id ? 'Update' : 'Create'}
        </Button>
      </ControlsWrapper>
    </Drawer>
  )
}
const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;
`

const ColorPickerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
  padding: 10px;
`
