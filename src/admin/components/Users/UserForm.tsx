import React, { useState, useEffect, useRef } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userFormSchema } from './utils/validation'
import styled from 'styled-components'
import { CustomInput } from 'components/Input/CustomInput'
import { useTitle } from 'hooks/useTitle'
import { CustomButton } from 'components/Button/CustomButton'
import ReactInputMask from 'react-input-mask'
import { generateRandomLetters } from 'utils/generateRandomLatters'
import { notification } from 'components/Notification/Notification'
import { Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { AdminRoutesPath } from 'routes/types'
import { createUser } from 'api/Users'

const defaultState = {
  full_name: '',
  email: '',
  phone: '',
  user_identifier: generateRandomLetters(),
  address: '',
  role_id: 1,
  role_name: 'SUDO',
  title: 'SUDO',
  is_admin: true,
  user_logo: '',

  notes: '',
  last_login: '',
  login_from_admin: false,
  brands: [],
  desk_id: null,
  desk_name: null,
  manager_id: null,
  manager_name: null,
  owner_id: null,
  owner_name: null,
  background_color: '',
  time_cards: { time_start: '10:00', time_end: '19:00' },

  permissions: {
    leads: true,
    affiliates: true,
    deposits: true,
    calendar: true,
    groups: true,
    users: true,
    analytics: true,
    settings: true,
  },
}

const mask = '+38(999) 99-99-999'

export const UserForm = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useTitle('Create User')
  const contentRef = useRef<HTMLDivElement>(null)
  const methods = useForm({
    resolver: yupResolver(userFormSchema),
    mode: 'onTouched',
    defaultValues: defaultState,
    shouldUnregister: false,
  })

  const {
    formState: { errors },
    handleSubmit,
    watch,
    control,
    trigger,
    setError,
  } = methods

  const onSubmit = async data => {
    try {
      await createUser({
        ...data,
        company_id: process.env.REACT_APP_ADMIN_COMPANY_ID,
        company_name: process.env.REACT_APP_ADMIN_COMPANY_NAME,
        password: process.env.REACT_APP_DEFAULT_ADMIN_PASSWORD,
      })
    } catch (error) {
      notification('error', 'Error!')
    }
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
      <h2 style={{ color: 'white' }}>Create New User</h2>
      <Wrapper ref={contentRef}>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Row>
              <Controller
                name='full_name'
                control={control}
                defaultValue={defaultState.full_name}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    placeholder='User name'
                    label='User name'
                    status={errors?.full_name?.message ? 'error' : undefined}
                    error={errors?.full_name?.message}
                  />
                )}
              />
            </Row>
            <Row>
              <Controller
                name='email'
                control={control}
                defaultValue={defaultState.email}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    placeholder='User Email'
                    label='User Email'
                    status={errors?.email?.message ? 'error' : undefined}
                    error={errors?.email?.message}
                  />
                )}
              />
            </Row>
            <Row>
              <Controller
                name='phone'
                control={control}
                defaultValue={defaultState.phone}
                render={({ field: { value, onChange, onBlur } }) => (
                  <ReactInputMask
                    mask={mask}
                    value={value}
                    onChange={e => {
                      onChange(e)
                      setError('phone', {
                        type: 'custom',
                        message: '',
                      })
                    }}
                    onBlur={onBlur}
                  >
                    {() => (
                      <CustomInput
                        placeholder='User Phone'
                        label='User Phone'
                        status={errors?.phone?.message ? 'error' : undefined}
                        error={errors?.phone?.message}
                      />
                    )}
                  </ReactInputMask>
                )}
              />
            </Row>
            <Row>
              <Controller
                name='address'
                control={control}
                defaultValue={defaultState.address}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    placeholder='Address'
                    label='Address'
                    status={errors?.address?.message ? 'error' : undefined}
                    error={errors?.address?.message}
                  />
                )}
              />
            </Row>

            <Row>
              <Controller
                name='user_identifier'
                control={control}
                defaultValue={defaultState.user_identifier}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    placeholder='User identifier'
                    label='User identifier'
                    status={
                      errors?.user_identifier?.message ? 'error' : undefined
                    }
                    error={errors?.user_identifier?.message}
                  />
                )}
              />
            </Row>
          </Form>
        </FormProvider>
        <CustomButton onClick={handleCreateUser} style={{ marginLeft: 'auto' }}>
          <span>Create</span>
        </CustomButton>
      </Wrapper>
    </Spin>
  )
}

const Wrapper = styled.div``
const Form = styled.form``
const Row = styled.div`
  padding: 10px;
`
