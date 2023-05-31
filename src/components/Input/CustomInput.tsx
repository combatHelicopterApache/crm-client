import React, { FC } from 'react'
import { Input, InputProps } from 'antd'
import styled from 'styled-components'

interface CustomInputProps extends InputProps {
  error?: string
}

export const CustomInput: FC<CustomInputProps> = ({ error, ...props }) => {
  return (
    <InputWrapper>
      <Input autoComplete='off' {...props} />
      {!!error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  )
}

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`

const InputWrapper = styled.div`
  & .ant-input {
    background-color: #333;
    color: #fff;
    border-color: #555;
  }

  & .ant-input::placeholder {
    color: #999;
  }

  & .ant-input:hover,
  & .ant-input:focus {
    background-color: #444;
    border-color: #666;
  }
  & .ant-input[aria-invalid='true'] {
    border-color: red;
    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.2);
  }
`
