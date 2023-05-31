import React, { FC, useState } from "react";
import s from './Login.module.css'
import bg from '../../images/login_bg.jpg'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Form, Input, Button, message, Spin } from "antd"
import { userLogin } from "../../api/login"
import { useDispatch, useSelector } from "react-redux";
import { selectData, setLoginData } from "../../features/auth/authSlice";
import { useNavigate  } from 'react-router-dom';


export const Login:FC = () => {
    const [loading, setLoading] = useState(false)
    // const [login, setLogin] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate ()

    const logUser = useSelector(selectData)
    console.log(logUser)

       const onSubmit = (value:[]) => {
           setLoading(true)
           const loginHandler = async () => {
               try {
                   const response = await userLogin(value)
                   message.success(response.data.message)
                   dispatch(setLoginData(response.data))
                   console.log(response.data)
                   if(response.data.status === true) navigate('/')
               } catch (error) {
                   message.error(error.response?.data?.message)
               } finally {
                   setLoading(false)
               }}

           loginHandler()
       }



    return (
      <div className={s.container} style={{ backgroundImage: `url(${bg})` }}>
          <Spin spinning={loading}>

              <Form name='signin' onFinish={onSubmit}  >
                  <Form.Item name='login'>
                      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Login" />
                  </Form.Item>

                  <Form.Item name='password'>
                      <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
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
