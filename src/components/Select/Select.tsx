import React, { FC } from 'react'
import { Select as AntdSelect, SelectProps } from 'antd'
import styled from 'styled-components'

export const Select: FC<
  SelectProps & { error: string; label?: string }
> = props => {
  return (
    <Wrapper>
      {!!props?.label && <Label>{props?.label}</Label>}
      <AntdSelect {...props} />
      {!!props?.error && <ErrorMessage>{props?.error}</ErrorMessage>}
    </Wrapper>
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

const Wrapper = styled.div`
  & .ant-select-selector {
    background-color: ${({ theme }) => theme.colors.background} !important;
  }
  & .ant-select-selection-item {
    color: ${({ theme }) => theme.colors.text} !important;
  }
  & .ant-select-selection-placeholder {
    color: ${({ theme }) => theme.colors.text} !important;
  }
`
