import React, { FC } from 'react'
import { DrawerProps, Drawer as AntdDrawer } from 'antd'

export const Drawer: FC<DrawerProps> = ({ children, ...props }) => {
  return <AntdDrawer {...props}>{children}</AntdDrawer>
}
