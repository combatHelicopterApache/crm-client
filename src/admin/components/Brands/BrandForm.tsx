import React, { useState, useEffect, useRef } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { companyFormSchema } from './utils/validation'
import styled from 'styled-components'
import { CustomInput } from 'components/Input/CustomInput'
import { useTitle } from 'hooks/useTitle'
import { CustomButton } from 'components/Button/CustomButton'
import { notification } from 'components/Notification/Notification'
import { Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { AdminRoutesPath } from 'routes/types'
import { TextArea } from 'components/TextArea/TextArea'
import { createCompany } from 'api/companies'
import { Select } from 'components/Select/Select'
import { ImageCropper } from 'components/ImageCroper/ImageCroper'
import { uploadSingleFile } from 'api/Upload'

export enum BrandStatus {
  Inactive,
  Active,
  Pending,
}

const defaultState = {
  title: 'New Brand',
  description: '',
  office_id: null,
  site: [
    {
      site_id: null,
      site_logo: null,
      site_name: '',
      site_domains: '',
    },
  ],
  platform: {
    cfd_id: '',
    cfd_logo: '',
    cfd_name: '',
    cfd_domain: '',
  },
  status: BrandStatus.Active,
}

const mask = '+38(999) 99-99-999'

export const BrandForm = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useTitle('Create Brand')
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
    getValues,
  } = methods

  const onSubmit = async data => {
    try {
      await createCompany(data)
      notification('success', 'Brand was created successfuly!')
      navigate(AdminRoutesPath.ADMIN_BRANDS_ROUTE)
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

  const handleUploadImage = async (file: File) => {
    const fmData = new FormData()

    fmData.append('media', file)

    try {
      const image = await uploadSingleFile(fmData)

      const platform = getValues('platform')
      setValue('platform', {
        ...platform,
        cfd_logo: image?.url ? image?.url : null,
      })
    } catch (error) {
      notification('error', 'Invalid data')
    }
  }

  return (
    <Spin spinning={loading}>
      <h2 style={{ color: 'white' }}>Create New Brand</h2>
      <Wrapper ref={contentRef}>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Row>
              <Controller
                name='platform.cfd_logo'
                control={control}
                defaultValue={defaultState.platform.cfd_logo}
                render={({ field, value }) => (
                  <ImageCropper
                    image={value?.platform?.cfd_logo}
                    onUploadFinish={handleUploadImage}
                    onDeleteImage={() => setValue('platform.cfd_logo', null)}
                  />
                )}
              />
            </Row>
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
                      { value: BrandStatus.Active, label: 'Active' },
                      { value: BrandStatus.Inactive, label: 'Inactive' },
                      { value: BrandStatus.Pending, label: 'Pending' },
                    ]}
                    placeholder='Status'
                    label='Status'
                    status={errors?.status?.message ? 'error' : undefined}
                    error={errors?.status?.message}
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
                    placeholder='Brand name'
                    label='Brand name'
                    status={errors?.title?.message ? 'error' : undefined}
                    error={errors?.title?.message}
                  />
                )}
              />
            </Row>
            <Row>
              <Controller
                name='platform.cfd_name'
                control={control}
                defaultValue={defaultState.platform.cfd_name}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    placeholder='CFD Name'
                    label='CFD Name'
                    status={
                      errors?.platform?.cfd_name?.message ? 'error' : undefined
                    }
                    error={errors?.platform?.cfd_name?.message}
                  />
                )}
              />
            </Row>
            <Row>
              <Controller
                name='platform.cfd_domain'
                control={control}
                defaultValue={defaultState.platform.cfd_domain}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    placeholder='CFD Domain'
                    label='CFD Domain'
                    status={
                      errors?.platform?.cfd_domain?.message
                        ? 'error'
                        : undefined
                    }
                    error={errors?.platform?.cfd_domain?.message}
                  />
                )}
              />
            </Row>

            <Row>
              <Controller
                name='description'
                control={control}
                defaultValue={defaultState.description}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    placeholder='Notes'
                    label='Notes'
                    rows={5}
                    status={errors?.description?.message ? 'error' : undefined}
                    error={errors?.description?.message}
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
