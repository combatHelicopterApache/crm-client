import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { P } from 'molecules/P/P'

export const NotAuthorized = ({ path }: { path: string }) => {
  const navigate = useNavigate()
  return (
    <Result
      status='404'
      title='404'
      subTitle={<P>Sorry, you are not authorized to access this page.</P>}
      extra={
        <Button onClick={() => navigate(path)} type='primary'>
          Back Home
        </Button>
      }
    />
  )
}
