import React, { useState, useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userFormSchema } from '../utils/validation'
import styled from 'styled-components'
import { useTitle } from 'hooks/useTitle'
import { CustomButton } from 'components/Button/CustomButton'
import { generateRandomLetters } from 'utils/generateRandomLatters'
import { notification } from 'components/Notification/Notification'
import { Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { AdminRoutesPath } from 'routes/types'
import { MainInfo } from './components/MainInfo/MainInfo'
import { Permissions } from './components/Permissions/Permissions'
import { H2 } from 'molecules/H2/H2'
import { Span } from 'molecules/Span/Span'

const defaultState = {
  user_name: '',
  user_email: '',
  user_phone: '',
  user_identifier: generateRandomLetters(),
  address: '',
  permissions: {},
  role: '',
  role_id: '',
}

export const UserForm = () => {
  useTitle('Create User')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const contentRef = useRef<HTMLDivElement>(null)
  const methods = useForm({
    resolver: yupResolver(userFormSchema),
    mode: 'onTouched',
    defaultValues: defaultState,
    shouldUnregister: false,
  })

  const {
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
    control,
    trigger,
    setValue,
    setError,
  } = methods

  const onSubmit = async data => {
    console.log(data, 'data')
  }

  const handleCreateUser = async () => {
    const isValid = await trigger()

    if (!isValid) {
      return Promise.reject()
    }
    setLoading(true)
    try {
      handleSubmit(onSubmit)()
      notification('success', 'User was created successfuly!')
      navigate(AdminRoutesPath.ADMIN_USERS_ROUTE)
    } catch (error) {
      console.log(error)
      notification('error', 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (!name || !value) return

      setError(name, { message: '' })
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <Spin spinning={loading}>
      <H2>Create New User</H2>
      <Wrapper ref={contentRef}>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <MainInfo user={defaultState} />
            <Permissions />
          </Form>
        </FormProvider>
        <CustomButton onClick={handleCreateUser} style={{ marginLeft: 'auto' }}>
          <Span>Create</Span>
        </CustomButton>
      </Wrapper>
    </Spin>
  )
}

const Wrapper = styled.div``
const Form = styled.form``
