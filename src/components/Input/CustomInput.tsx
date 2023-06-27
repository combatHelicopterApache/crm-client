import React, { FC } from 'react'
import styled from 'styled-components'
import { TextFieldProps } from '@mui/material/TextField'
import TextField from '@mui/material/TextField'

interface CustomInputProps extends TextFieldProps {
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
      {/* {!!label && <Label>{label}</Label>} */}
      <TextField
        autoComplete='off'
        label={label}
        size='small'
        variant='outlined'
        fullWidth
        {...props}
      />
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
  width: 100%;

  & .MuiFormLabel-root {
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
    top: 2px;
  }
  & input::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }
  & input {
    width: 100%;
  }
  & .MuiOutlinedInput-notchedOutline {
    /* background-color: ${({ theme }) => theme.colors.background}; */
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.text};
  }

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
