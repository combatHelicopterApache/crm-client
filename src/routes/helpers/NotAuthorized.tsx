import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { RoutesPath } from 'routes/types'

export const NotAuthorized = () => {
  const navigate = useNavigate()
  return (
    <Result
      status='403'
      title='403'
      subTitle='Sorry, you are not authorized to access this page.'
      extra={
        <Button onClick={() => navigate(RoutesPath.HOME_ROUTE)} type='primary'>
          Back Home
        </Button>
      }
    />
  )
}
