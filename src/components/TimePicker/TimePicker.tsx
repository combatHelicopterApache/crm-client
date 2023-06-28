import React, { FC } from 'react'
import { TimePicker as AntdTimePicker, TimePickerProps } from 'antd'
import styled from 'styled-components'

export const TimePicker: FC<TimePickerProps> = props => {
  return (
    <Wrapper>
      <AntdTimePicker {...props} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  & .ant-picker {
    background-color: ${({ theme }) => theme.colors.background} !important;
  }
  & input::placeholder {
    color: ${({ theme }) => theme.colors.text} !important;
  }
  & input {
    color: ${({ theme }) => theme.colors.text} !important;
  }
  & .anticon-clock-circle svg {
    fill: ${({ theme }) => theme.colors.text} !important;
  }
  & .ant-picker-clear {
    background-color: transparent;
  }
`
