import React, { useState, useEffect, useRef } from 'react'
import { FormProvider, useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userFormSchema } from '../utils/validation'
import styled from 'styled-components'
import { useTitle } from 'hooks/useTitle'
import { CustomButton } from 'components/Button/CustomButton'
import { generateRandomLetters } from 'utils/generateRandomLatters'
import { notification } from 'components/Notification/Notification'
import { Spin } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { AdminRoutesPath } from 'routes/types'
import { MainInfo } from './components/MainInfo/MainInfo'
import { Permissions } from './components/Permissions/Permissions'
import { User, UserRole } from '../types'
import { H2 } from 'molecules/H2/H2'
import { Span } from 'molecules/Span/Span'
import useUser from '../hooks/useUser'
import { getModulesByRole } from '../helpers/helpers'

export const UserForm = () => {
  const { id } = useParams<{ id: string }>()
  const { currentUser: user, status } = useUser(id)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const contentRef = useRef<HTMLDivElement>(null)
  const methods = useForm({
    resolver: yupResolver(userFormSchema),
    mode: 'onTouched',
    defaultValues: user,
    shouldUnregister: false,
  })

  useTitle(id !== 'new' ? `Update User | ${user.full_name}` : 'Create User')

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

  const onSubmit = async (data: User) => {
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

  const handleDeleteUser = async () => {
    console.log('delete')
  }

  const handleClearForm = () => {
    return reset()
  }

  const handleChangeUserRole = (
    value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const roleId: UserRole = +value

    setValue('role_id', roleId)
    if (!user.id) {
      setValue('permissions', getModulesByRole(roleId))
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
            <MainInfo user={user} handleChangeUserRole={handleChangeUserRole} />
            <Controller
              name='permissions'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Permissions
                  data={value}
                  disabled={!user?.role_id || status === 'loading'}
                  onChange={onChange}
                />
              )}
            />
          </Form>
        </FormProvider>
        <ControlsWrapper>
          {user?.id && (
            <CustomButton buttonType='remove' onClick={handleDeleteUser}>
              <Span>Delete</Span>
            </CustomButton>
          )}
          {!user?.id && (
            <CustomButton buttonType='filter' onClick={handleClearForm}>
              <Span>Clear</Span>
            </CustomButton>
          )}
          <CustomButton onClick={handleCreateUser}>
            <Span>Create</Span>
          </CustomButton>
        </ControlsWrapper>
      </Wrapper>
    </Spin>
  )
}

const Wrapper = styled.div``
const Form = styled.form``

const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
`
