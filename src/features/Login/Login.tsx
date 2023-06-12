import React, { FC } from 'react'
import s from './Login.module.css'
import bg from '../../images/login_bg.jpg'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Form, Input, Button, Spin } from 'antd'
import { login, authSelector } from './authSlice'
import { useAppDispatch, useAppSelector } from 'store/store'
import { useNavigate } from 'react-router-dom'
import { RoutesPath, AdminRoutesPath } from 'routes/types'
import { lastModuleVisited } from 'utils/lastModuleVisit'

export const Login: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(authSelector)

  const onSubmit = async (value: []) => {
    const lastModule = lastModuleVisited('get')

    const { payload } = await dispatch(login(value))
    const { data } = payload
    if (payload.status && data?.is_admin) {
      return navigate(lastModule || AdminRoutesPath.ADMIN_COMPANIES_ROUTE)
    }
    if (payload.status && !data?.is_admin) {
      return navigate(lastModule || RoutesPath.HOME_ROUTE)
    }
  }

  return (
    <div className={s.container} style={{ backgroundImage: `url(${bg})` }}>
      <Spin spinning={loading}>
        <Form name='signin' onFinish={onSubmit}>
          <Form.Item name='email'>
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Email'
            />
          </Form.Item>

          <Form.Item name='password'>
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  )
}
