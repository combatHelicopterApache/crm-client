import React from 'react'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import s from './LoggedUser.module.css'
import { Dropdown, Space, Avatar } from 'antd'
import { useDispatch } from 'react-redux'
import { logout } from '../../../../features/Login/authSlice'
import { useNavigate } from 'react-router-dom'
import { RoutesPath } from 'routes/types'
import { lastModuleVisited } from 'utils/lastModuleVisit'

const LoggedUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChangeTheme = () => {}
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
      label: <p onClick={handleChangeTheme}> Dark theme</p>,
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
