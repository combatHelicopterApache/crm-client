import React, { useState, useEffect, useRef } from 'react'
import { FormProvider, useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userFormSchema } from '../utils/validation'
import styled from 'styled-components'
import { useTitle } from 'hooks/useTitle'
import { CustomButton } from 'components/Button/CustomButton'

import { notification } from 'components/Notification/Notification'
import { Spin } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { RoutesPath } from 'routes/types'
import { MainInfo } from './components/MainInfo/MainInfo'
import { Permissions } from './components/Permissions/Permissions'
import { User, UserRole } from '../types'

import { Span } from 'molecules/Span/Span'
import useUser from '../hooks/useUser'
import { getModulesByRole } from '../helpers/helpers'
import { createUser } from '../userSlice'
import { useDispatch } from 'react-redux'
import { Restrictions } from './components/Restrictions/Restrictions'

export const UserForm = () => {
  const dispatch = useDispatch()
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
    await dispatch(createUser(data))
    notification('success', 'User was created successfuly!')
    navigate(RoutesPath.USERS_ROUTE)
  }

  const handleCreateUser = async () => {
    const isValid = await trigger()

    if (!isValid) {
      return Promise.reject()
    }
    setLoading(true)
    try {
      handleSubmit(onSubmit)()
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const roleId: UserRole = +e.target.value
    setValue('role_id', roleId)
    if (!user?.id) {
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

  useEffect(() => {
    if (user?.id && id !== 'new') {
      methods.reset(user)
    }
  }, [user, methods])

  return (
    <Spin spinning={loading}>
      <Wrapper ref={contentRef}>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <MainInfo user={user} handleChangeUserRole={handleChangeUserRole} />
            <PermBlock>
              {' '}
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
              <Controller
                name='restrictions.lead.lead_events'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Restrictions
                    data={value}
                    disabled={!user?.role_id || status === 'loading'}
                    onChange={onChange}
                    title='User Restrictions'
                    label='Leads Event'
                  />
                )}
              />
              <Controller
                name='restrictions.affiliates.affiliates_events'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Restrictions
                    data={value}
                    disabled={!user?.role_id || status === 'loading'}
                    onChange={onChange}
                    label='Affiliates Event'
                  />
                )}
              />
              <Controller
                name='restrictions.deposits.deposits_events'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Restrictions
                    data={value}
                    disabled={!user?.role_id || status === 'loading'}
                    onChange={onChange}
                    label='Deposits Event'
                  />
                )}
              />
              <Controller
                name='restrictions.calendar.calendar_events'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Restrictions
                    data={value}
                    disabled={!user?.role_id || status === 'loading'}
                    onChange={onChange}
                    label='Calendar Event'
                  />
                )}
              />
              <Controller
                name='restrictions.groups.groups_events'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Restrictions
                    data={value}
                    disabled={!user?.role_id || status === 'loading'}
                    onChange={onChange}
                    label='Groups Event'
                  />
                )}
              />
              <Controller
                name='restrictions.analytics.analytics_events'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Restrictions
                    data={value}
                    disabled={!user?.role_id || status === 'loading'}
                    onChange={onChange}
                    label='Analytics Event'
                  />
                )}
              />
              <Controller
                name='restrictions.settings.user_events'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Restrictions
                    data={value}
                    disabled={!user?.role_id || status === 'loading'}
                    onChange={onChange}
                    label='User Settings Event'
                  />
                )}
              />
              <Controller
                name='restrictions.settings.office_events'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Restrictions
                    data={value}
                    disabled={!user?.role_id || status === 'loading'}
                    onChange={onChange}
                    label='Office Settings Event'
                  />
                )}
              />
              <Controller
                name='restrictions.settings.company_events'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Restrictions
                    data={value}
                    disabled={!user?.role_id || status === 'loading'}
                    onChange={onChange}
                    label='Company Settings Event'
                  />
                )}
              />
            </PermBlock>
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

const Wrapper = styled.div`
  /* width: 50%; */
`
const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`

const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
`
const PermBlock = styled.div`
  margin-top: 40px;
`
