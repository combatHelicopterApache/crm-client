import React, { FC } from 'react'
import { Checkbox as AntdCheckbox, CheckboxProps } from 'antd'

export const Checkbox: FC<CheckboxProps> = props => {
  return <AntdCheckbox {...props} />
}
