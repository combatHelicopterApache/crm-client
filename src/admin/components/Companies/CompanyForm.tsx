import React, { useState, useEffect, useRef } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { companyFormSchema } from './utils/validation'
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
  company_name: '',
  company_email: '',
  company_phone: '',
  admin_name: '',
  admin_phone: '',
  admin_email: '',
  company_identifier: generateRandomLetters(),
  address: '',
}

const mask = '+38(999) 99-99-999'

export const CompanyForm = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useTitle('Create Company')
  const contentRef = useRef<HTMLDivElement>(null)
  const methods = useForm({
    resolver: yupResolver(companyFormSchema),
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

  const handleCreateCompany = async () => {
    const isValid = await trigger()

    if (!isValid) {
      return Promise.reject()
    }
    setLoading(true)
    try {
      handleSubmit(onSubmit)()
      notification('success', 'Company was created successfuly!')
      navigate(AdminRoutesPath.ADMIN_COMPANIES_ROUTE)
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
      <h2 style={{ color: 'white' }}>Create New Company</h2>
      <Wrapper ref={contentRef}>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Row>
              <Controller
                name='company_name'
                control={control}
                defaultValue={defaultState.company_name}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    placeholder='Company name'
                    status={errors?.company_name?.message ? 'error' : undefined}
                    error={errors?.company_name?.message}
                  />
                )}
              />
            </Row>
            <Row>
              <Controller
                name='company_email'
                control={control}
                defaultValue={defaultState.company_email}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    placeholder='Company Email'
                    status={
                      errors?.company_email?.message ? 'error' : undefined
                    }
                    error={errors?.company_email?.message}
                  />
                )}
              />
            </Row>
            <Row>
              <Controller
                name='company_phone'
                control={control}
                defaultValue={defaultState.company_phone}
                render={({ field: { value, onChange, onBlur } }) => (
                  <ReactInputMask
                    mask={mask}
                    value={value}
                    onChange={e => {
                      onChange(e)
                      setError('company_phone', {
                        type: 'custom',
                        message: '',
                      })
                    }}
                    onBlur={onBlur}
                  >
                    {() => (
                      <CustomInput
                        placeholder='Company Phone'
                        status={
                          errors?.company_phone?.message ? 'error' : undefined
                        }
                        error={errors?.company_phone?.message}
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
                name='admin_name'
                control={control}
                defaultValue={defaultState.admin_name}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    placeholder='Admin Name'
                    status={errors?.admin_name?.message ? 'error' : undefined}
                    error={errors?.admin_name?.message}
                  />
                )}
              />
            </Row>
            <Row>
              <Controller
                name='admin_email'
                control={control}
                defaultValue={defaultState.admin_email}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    placeholder='Admin Email'
                    status={errors?.admin_email?.message ? 'error' : undefined}
                    error={errors?.admin_email?.message}
                  />
                )}
              />
            </Row>
            <Row>
              <Controller
                name='admin_phone'
                control={control}
                defaultValue={defaultState.admin_phone}
                render={({ field: { value, onChange, onBlur } }) => (
                  <ReactInputMask
                    mask={mask}
                    value={value}
                    onChange={e => {
                      onChange(e)
                      setError('admin_phone', {
                        type: 'custom',
                        message: '',
                      })
                    }}
                    onBlur={onBlur}
                  >
                    {() => (
                      <CustomInput
                        placeholder='Admin Phone'
                        status={
                          errors?.admin_phone?.message ? 'error' : undefined
                        }
                        error={errors?.admin_phone?.message}
                      />
                    )}
                  </ReactInputMask>
                )}
              />
            </Row>
            <Row>
              <Controller
                name='company_identifier'
                control={control}
                defaultValue={defaultState.company_identifier}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    placeholder='Company identifier'
                    status={
                      errors?.company_identifier?.message ? 'error' : undefined
                    }
                    error={errors?.company_identifier?.message}
                  />
                )}
              />
            </Row>
          </Form>
        </FormProvider>
        <CustomButton
          onClick={handleCreateCompany}
          style={{ marginLeft: 'auto' }}
        >
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
