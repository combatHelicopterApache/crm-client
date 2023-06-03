import React, { useState } from 'react'
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons'

import s from './LoggedUser.module.css'
import { Dropdown, Space, Avatar } from 'antd'

import { logout } from '../../../../features/auth/authSlice'
import { useAppDispatch } from 'store/store'
import { changeAppTheme } from 'store/ui/UISlice'

const LoggedUser = () => {
  const dispatch = useAppDispatch()
  const [themeMode, setThemeMode] = useState(localStorage.getItem('theme'))
  const handleChangeTheme = () => {
    const theme = localStorage.getItem('theme')
    if (theme === 'dark') {
      setThemeMode('light')
      dispatch(changeAppTheme('light'))
      localStorage.setItem('theme', 'light')
    } else {
      setThemeMode('dark')
      dispatch(changeAppTheme('dark'))
      localStorage.setItem('theme', 'dark')
    }
  }

  const items = [
    {
      label: (
        <p onClick={() => handleLogout()}>
          {' '}
          <LogoutOutlined /> Logout{' '}
        </p>
      ),
      key: '0',
    },
    {
      label: (
        <p onClick={handleChangeTheme}>
          {' '}
          <SettingOutlined />
          {themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}{' '}
        </p>
      ),
      key: '0',
    },
  ]

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <div className={s.container}>
      <Dropdown
        menu={{
          items,
        }}
        trigger={['click']}
      >
        <a onClick={e => e.preventDefault()} href='#/'>
          <Space>
            <Avatar icon={<UserOutlined />} />
          </Space>
        </a>
      </Dropdown>
    </div>
  )
}

export default LoggedUser
