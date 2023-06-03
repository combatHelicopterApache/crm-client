import React, { FC } from 'react'
import { Select as AntdSelect, SelectProps } from 'antd'

export const Select: FC<SelectProps> = props => {
  return <AntdSelect {...props} />
}
