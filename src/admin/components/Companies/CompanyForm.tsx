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
import { TextArea } from 'components/TextArea/TextArea'
import { createCompany } from 'api/companies'
import { Select } from 'components/Select/Select'

export enum CompanyStatus {
  Inactive,
  Active,
  Pending,
}

const defaultState = {
  company_name: '',
  company_email: '',
  company_phone: '',
  admin_name: '',
  admin_phone: '',
  admin_email: '',
  company_identifier: generateRandomLetters(),
  address: '',
  title: '',
  notes: '',
  status: CompanyStatus.Active,
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
    try {
      await createCompany(data)
      notification('success', 'Company was created successfuly!')
      navigate(AdminRoutesPath.ADMIN_COMPANIES_ROUTE)
    } catch (error) {
      notification('error', 'Something went wrong!')
    }
  }

  const handleCreateCompany = async () => {
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
                name='status'
                control={control}
                defaultValue={defaultState.status}
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: '100%' }}
                    options={[
                      { value: CompanyStatus.Active, label: 'Active' },
                      { value: CompanyStatus.Inactive, label: 'Inactive' },
                      { value: CompanyStatus.Pending, label: 'Pending' },
                    ]}
                    placeholder='Status'
                    status={errors?.status?.message ? 'error' : undefined}
                    error={errors?.status?.message}
                  />
                )}
              />
            </Row>
            <Row>
              <Controller
                name='company_name'
                control={control}
                defaultValue={defaultState.company_name}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    placeholder='Company name'
                    label='Company name'
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
                    label='Company Email'
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
                        label='Company Phone'
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
                    label='Address'
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
                    label='Admin Name'
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
                    label='Admin Email'
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
                        label='Admin Phone'
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
                    label='Company identifier'
                    status={
                      errors?.company_identifier?.message ? 'error' : undefined
                    }
                    error={errors?.company_identifier?.message}
                  />
                )}
              />
            </Row>
            <Row>
              <Controller
                name='title'
                control={control}
                defaultValue={defaultState.title}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    placeholder='Title'
                    label='Title'
                    status={errors?.title?.message ? 'error' : undefined}
                    error={errors?.title?.message}
                  />
                )}
              />
            </Row>
            <Row>
              <Controller
                name='notes'
                control={control}
                defaultValue={defaultState.notes}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    placeholder='Notes'
                    label='Notes'
                    rows={5}
                    status={errors?.notes?.message ? 'error' : undefined}
                    error={errors?.notes?.message}
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
