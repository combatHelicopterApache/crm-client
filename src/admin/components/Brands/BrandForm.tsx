import React, { useState, useEffect, useRef } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { brandFormSchema } from './utils/validation'
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
import { DashedButton } from 'components/DashedButton/DashedButton'
import { AddPlatform } from './components/AddPlatform'
import { AddSite } from './components/AddSite'

export enum BrandStatus {
  Inactive,
  Active,
  Pending,
}

const defaultState = {
  title: 'New Brand',
  description: '',
  office_id: null,
  logo: '',
  site: [],
  platform: [],
  status: BrandStatus.Active,
}

export const BrandForm = () => {
  const navigate = useNavigate()
  useTitle('Create Brand')
  const [loading, setLoading] = useState(false)
  const [openPlatformDrawer, setOpenPlatformDrawer] = useState(false)
  const [openSiteDrawer, setOpenSiteDrawer] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null)
  const methods = useForm({
    resolver: yupResolver(brandFormSchema),
    mode: 'onTouched',
    defaultValues: defaultState,
    shouldUnregister: false,
  })

  const togglePlatformDrawer = () => {
    setOpenPlatformDrawer(prev => !prev)
  }
  const toggleSiteDrawer = () => {
    setOpenSiteDrawer(prev => !prev)
  }

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

  const handleAddSite = site => {
    const siteArr = getValues('site')
    setValue('site', [...siteArr, site])
  }
  const handleAddPlatform = platform => {
    const platformArr = getValues('platform')
    setValue('platform', [...platformArr, platform])
  }

  return (
    <Spin spinning={loading}>
      <h2 style={{ color: 'white' }}>Create New Brand</h2>
      <Wrapper ref={contentRef}>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Row>
              <Controller
                name='logo'
                control={control}
                defaultValue={defaultState.logo}
                render={({ field, value }) => (
                  <ImageCropper
                    image={value?.logo}
                    onUploadFinish={handleUploadImage}
                    onDeleteImage={() => setValue('logo', null)}
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

          <Row>
            {watch('platform').map(item => (
              <p>{console.log(item)}</p>
            ))}
            <DashedButton onClick={toggleSiteDrawer} title='Add Site' />
          </Row>
          <Row>
            <DashedButton onClick={togglePlatformDrawer} title='Add Platform' />
          </Row>

          <AddPlatform
            visible={openPlatformDrawer}
            onClose={togglePlatformDrawer}
            onSave={handleAddPlatform}
          />
          <AddSite
            visible={openSiteDrawer}
            onClose={toggleSiteDrawer}
            onSave={handleAddSite}
          />
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

const CustomBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`
