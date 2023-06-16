import React, { FC } from 'react'
import { Input } from 'antd'
import styled from 'styled-components'
import { TextAreaProps } from 'antd/es/input'

const { TextArea: AntdTextArea } = Input

interface CustomInputProps extends TextAreaProps {
  error?: string
  label?: string
}

export const TextArea: FC<CustomInputProps> = ({
  error,
  ...props
}): JSX.Element => {
  return (
    <InputWrapper>
      {!!props?.label && <Label>{props?.label}</Label>}
      <AntdTextArea autoComplete='off' {...props} />
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
