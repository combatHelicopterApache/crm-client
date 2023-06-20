import React, { useState } from 'react'
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import s from './LoggedUser.module.css'
import { Dropdown, Space, Avatar } from 'antd'

import {
  logout,
  authSelector,
  logoutFromCompany,
} from '../../../../features/Login/authSlice'
import { useAppDispatch, useAppSelector } from 'store/store'
import { changeAppTheme } from 'store/ui/UISlice'
import { RoutesPath } from 'routes/types'
import { lastModuleVisited } from 'utils/lastModuleVisit'

const LoggedUser = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { auth_user } = useAppSelector(authSelector)
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

  const handleBackToAdmin = () => {
    lastModuleVisited('set', window.location.pathname)
    dispatch(logoutFromCompany())
    // navigate(RoutesPath.LOGIN)
  }

  const items = [
    {
      label: (
        <p
          onClick={
            auth_user?.login_from_admin ? handleBackToAdmin : handleLogout
          }
        >
          {' '}
          <LogoutOutlined />{' '}
          {auth_user?.login_from_admin ? 'Back to Admin' : 'Logout'}
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
      key: '1',
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
