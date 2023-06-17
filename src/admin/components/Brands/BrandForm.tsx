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
import { PlatformCard } from './components/PlatformCard'
import { SiteCard } from './components/SiteCard'
import { H2 } from 'molecules/H2/H2'
import { createBrand } from 'api/Brands'

export enum BrandStatus {
  Inactive,
  Active,
  Pending,
}

const defaultState = {
  title: 'New Brand',
  description: '',
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
      await createBrand(data)
      notification('success', 'Brand was created successfuly!')
      navigate(AdminRoutesPath.ADMIN_BRANDS_ROUTE)
    } catch (error) {
      notification('error', 'Something went wrong!')
    }
  }

  const handleCreateBrand = async () => {
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

      setValue('logo', image?.url ? image?.url : null)
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
          <H2>Brands Platform</H2>
          <Row style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {watch('platform')?.map(item => (
              <PlatformCard key={item?.id} {...item} />
            ))}
            <DashedButton onClick={togglePlatformDrawer} title='Add Platform' />
          </Row>
          <H2>Brands Site</H2>
          <Row style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {watch('site')?.map(item => (
              <SiteCard key={item?.id} {...item} />
            ))}
            <DashedButton onClick={toggleSiteDrawer} title='Add Site' />
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
          onClick={handleCreateBrand}
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
