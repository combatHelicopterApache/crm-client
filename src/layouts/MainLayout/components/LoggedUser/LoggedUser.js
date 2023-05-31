import React from 'react'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import s from './LoggedUser.module.css'
import { Dropdown, Space, Avatar } from 'antd'
import { useDispatch } from 'react-redux'
import { logout } from '../../../../features/auth/authSlice'

const LoggedUser = () => {
  const dispatch = useDispatch()

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
