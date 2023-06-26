import React, { FC } from 'react'
import { InputProps } from 'antd'
import styled from 'styled-components'

import TextField from '@mui/material/TextField';
interface CustomInputProps extends InputProps {
  error?: string
  label?: string
}

export const CustomInput: FC<CustomInputProps> = ({
  error,
  label,
  ...props
}): JSX.Element => {
  return (
    <InputWrapper>
      {!!label && <Label>{label}</Label>}
      <TextField autoComplete='off' {...props} label="Outlined" variant={'outlined'} />
      {!!error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  )
}

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`
const Label = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  margin-bottom: 3px;
  margin-left: 3px;
`

const InputWrapper = styled.div`
  & .ant-input {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  & .ant-input::placeholder {
    color: #999;
  }

  & .ant-input:hover,
  & .ant-input:focus {
    background-color: ${({ theme }) => theme.colors.background};
    background-color: ${({ theme }) => theme.colors.background};
  }
  & .ant-input[aria-invalid='true'] {
    border-color: red;
    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.2);
  }
`
