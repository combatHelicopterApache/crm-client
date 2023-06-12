import React, { useState } from 'react'
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import s from './LoggedUser.module.css'
import { Dropdown, Space, Avatar } from 'antd'

import { logout } from '../../../../features/Login/authSlice'
import { useAppDispatch } from 'store/store'
import { changeAppTheme } from 'store/ui/UISlice'
import { RoutesPath } from 'routes/types'
import { lastModuleVisited } from 'utils/lastModuleVisit'

const LoggedUser = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
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

  const handleLogout = () => {
    lastModuleVisited('set', window.location.pathname)
    dispatch(logout())
    navigate(RoutesPath.LOGIN)
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
