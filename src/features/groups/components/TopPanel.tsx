import React, { useState } from 'react'
import { Button } from 'antd'
import control from '../../../components/ControlPanel/ControlPanel.module.css'
import { UsergroupAddOutlined } from '@ant-design/icons'
import ControlPanel from '../../../components/ControlPanel/ControlPanel'
import { AddGroupModal } from '../modals/AddGroupModal'
import { CustomButton } from 'components/Button/CustomButton'

export const TopPanel = () => {
  const [visible, setVisible] = useState(false)

  const handleVisible = () => {
    setVisible(true)
  }

  const handleClose = () => {
    setVisible(false)
  }

  return (
    <>
      <ControlPanel>
        <CustomButton onClick={handleVisible}>
          <UsergroupAddOutlined /> Add group
        </CustomButton>
      </ControlPanel>

      <AddGroupModal visible={visible} handlerClose={handleClose} />
    </>
  )
}
