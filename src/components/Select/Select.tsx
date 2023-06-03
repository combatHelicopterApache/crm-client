import React, { FC } from 'react'
import { Select as AntdSelect, SelectProps } from 'antd'
import styled from 'styled-components'

export const Select: FC<SelectProps & { error: string }> = props => {
  return (
    <Wrapper>
      <AntdSelect {...props} />
      {!!props?.error && <ErrorMessage>{props?.error}</ErrorMessage>}
    </Wrapper>
  )
}
const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
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
