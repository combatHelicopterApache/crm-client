import React, { FC } from 'react'
import styled from 'styled-components'
import { Button as MiuButton } from '@mui/material'
import { Tooltip, Popconfirm } from 'antd'
import {
  Delete,
  Visibility,
  Close,
  Add,
  Edit,
  ContentCopy,
  Email,
  Phone,
  ImportExport,
} from '@mui/icons-material'

export type ActionType =
  | 'delete'
  | 'view'
  | 'close'
  | 'add'
  | 'edit'
  | 'copy'
  | 'mail'
  | 'phone'
  | 'import'
  | 'export'

interface IProps {
  type: ActionType
  action: () => void
  preloader: boolean
  tooltip: string
  popConfirm: string
  tooltipPlacement: string
  disabled: boolean
  getPopupContainer: () => void
  popConfirmPosition: string
}

export const Button: FC<IProps> = ({
  type,
  action,
  preloader,
  tooltip,
  popConfirm,
  tooltipPlacement = 'top',
  disabled,
  getPopupContainer,
  popConfirmPosition,
}) => {
  let icon: JSX.Element = <Delete />
  let text = 'Action'

  switch (type) {
    case 'delete': {
      text = 'Delete'
      icon = <Delete />
      break
    }
    case 'view': {
      text = 'View'
      icon = <Visibility />
      break
    }

    case 'close': {
      text = 'Close'
      icon = <Close />
      break
    }
    case 'add': {
      text = 'Add'
      icon = <Add />

      break
    }
    case 'edit': {
      text = 'Edit'
      icon = <Edit />
      break
    }
    case 'copy': {
      text = 'Copy'
      icon = <ContentCopy />
      break
    }

    case 'mail': {
      text = 'Mail'
      icon = <Email />
      break
    }
    case 'phone': {
      text = 'Call'
      icon = <Phone />
      break
    }
    case 'import': {
      text = 'Import'
      icon = <ImportExport />
      break
    }
    case 'export': {
      text = 'Export'
      icon = <ImportExport />
      break
    }

    default: {
      break
    }
  }

  const onCancelConfirm = () => null
  const onClickWhenPopConfirm = e => e.preventDefault()

  return (
    <Wrapper>
      <Tooltip title={tooltip} placement={tooltipPlacement}>
        <Popconfirm
          placement={popConfirmPosition ? popConfirmPosition : 'rightTop'}
          title={
            /\?$/.test(popConfirm)
              ? popConfirm
              : `Are you sure you want to ${type} ${popConfirm}?`
          }
          onConfirm={action}
          onCancel={onCancelConfirm}
          okText='Yes'
          cancelText='No'
          disabled={!popConfirm || disabled}
          getPopupContainer={getPopupContainer ? getPopupContainer : undefined}
        >
          <MiuButton
            onClick={!popConfirm ? action : onClickWhenPopConfirm}
            disabled={!!preloader || disabled}
            variant='outlined'
            startIcon={icon}
          >
            {text}
          </MiuButton>
        </Popconfirm>
      </Tooltip>
    </Wrapper>
  )
}
const Wrapper = styled.div``
