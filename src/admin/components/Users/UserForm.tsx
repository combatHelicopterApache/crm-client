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
      <h2 style={{ color: 'white' }}>Create New User</h2>
      <Wrapper ref={contentRef}>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Row>
              <Controller
                name='user_name'
                control={control}
                defaultValue={defaultState.user_name}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    placeholder='User name'
                    status={errors?.user_name?.message ? 'error' : undefined}
                    error={errors?.user_name?.message}
                  />
                )}
              />
            </Row>
            <Row>
              <Controller
                name='user_email'
                control={control}
                defaultValue={defaultState.user_email}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    placeholder='User Email'
                    status={errors?.user_email?.message ? 'error' : undefined}
                    error={errors?.user_email?.message}
                  />
                )}
              />
            </Row>
            <Row>
              <Controller
                name='user_phone'
                control={control}
                defaultValue={defaultState.user_phone}
                render={({ field: { value, onChange, onBlur } }) => (
                  <ReactInputMask
                    mask={mask}
                    value={value}
                    onChange={e => {
                      onChange(e)
                      setError('user_phone', {
                        type: 'custom',
                        message: '',
                      })
                    }}
                    onBlur={onBlur}
                  >
                    {() => (
                      <CustomInput
                        placeholder='User Phone'
                        status={
                          errors?.user_phone?.message ? 'error' : undefined
                        }
                        error={errors?.user_phone?.message}
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
