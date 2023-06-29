import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import ReactInputMask from 'react-input-mask'
import { CustomInput } from 'components/Input/CustomInput'
import { Controller, useFormContext } from 'react-hook-form'
import {
  User,
  UserRole,
  UserRoleStr,
  UserSalesRoleID,
} from 'features/Settings/Users/types'
import { Select } from 'components/Select/Select'
import { ColorPicker } from 'antd'
import { TextArea } from 'components/TextArea/TextArea'
import { Span } from 'molecules/Span/Span'
import { useUsers } from 'hooks/useUsers'
import { useBrands } from 'hooks/useBrands'
import { languages } from 'utils/languages'
import { ImageCropper } from 'components/ImageCroper/ImageCroper'
import { uploadSingleFile } from 'api/Upload'
import { notification } from 'components/Notification/Notification'
import { TimePicker } from 'components/TimePicker/TimePicker'
import dayjs from 'dayjs'

const format = 'HH:mm'

const mask = '+38(999) 99-99-999'

interface IProps {
  user: User
  handleChangeUserRole: (e: ChangeEvent<HTMLInputElement>) => void
}

export const MainInfo = ({ user, handleChangeUserRole }: IProps) => {
  const { users } = useUsers()
  const { brands } = useBrands()
  const {
    formState: { errors },
    control,
    setError,
    setValue,
    watch,
  } = useFormContext()

  const handleUploadImage = async (file: File) => {
    const fmData = new FormData()

    fmData.append('media', file)

    try {
      const image = await uploadSingleFile(fmData)

      setValue('user_logo', image?.url ? image?.url : null)
    } catch (error) {
      notification('error', 'Invalid data')
    }
  }

  return (
    <Wrapper>
      <Row style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Span>User Color</Span>
        <Controller
          name='background_color'
          control={control}
          defaultValue={user.background_color}
          render={({ field: { value, onChange } }) => (
            <ColorPicker
              format={'hex'}
              value={value}
              onChange={(value, hex) =>
                onChange({
                  target: {
                    name: 'background_color',
                    value: hex,
                  },
                })
              }
            />
          )}
        />
      </Row>

      <Row style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Span>User Logo</Span>
        <Controller
          name='user_logo'
          control={control}
          defaultValue={user.user_logo}
          render={({ value }) => (
            <ImageCropper
              image={user.user_logo}
              onUploadFinish={handleUploadImage}
              onDeleteImage={() => setValue('user_logo', null)}
            />
          )}
        />
      </Row>
      <Row>
        <Controller
          name='role_id'
          control={control}
          defaultValue={UserRoleStr[user.role_id]}
          render={({ field }) => (
            <Select
              {...field}
              style={{ width: '100%' }}
              label='User Role'
              onChange={handleChangeUserRole}
              options={[
                { value: UserRole.ADMIN, label: 'Admin' },
                { value: UserRole.MANAGER, label: 'Manager' },
                { value: UserRole.ACCOUNT_MANAGER, label: 'Account Manager' },
                { value: UserRole.AGENT, label: 'Agent' },
                { value: UserRole.WORKER, label: 'Worker' },
              ]}
              placeholder='User Role'
              status={errors?.role_id?.message ? 'error' : undefined}
              error={errors?.role_id?.message}
            />
          )}
        />
      </Row>
      <Row>
        <Controller
          name='active'
          control={control}
          defaultValue={user.status ? 'Active' : 'Inactive'}
          render={({ field }) => (
            <Select
              {...field}
              label='Status'
              style={{ width: '100%' }}
              options={[
                { value: true, label: 'Active' },
                { value: false, label: 'Inactive' },
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
          name='admin_id'
          control={control}
          defaultValue={user.admin_id}
          render={({ field }) => (
            <Select
              {...field}
              style={{ width: '100%' }}
              label='User Admin'
              options={users?.map(user => ({
                value: user.id,
                label: user.full_name,
              }))}
              status={errors?.admin_id?.message ? 'error' : undefined}
              error={errors?.admin_id?.message}
            />
          )}
        />
      </Row>
      <Row>
        <Controller
          name='brands'
          control={control}
          defaultValue={user.brands}
          render={({ field }) => (
            <Select
              {...field}
              label='User Brand'
              value={field.value || []}
              style={{ width: '100%' }}
              multiple
              options={brands?.map(brand => ({
                value: brand.id,
                label: brand.title,
              }))}
              placeholder='Brand'
              status={errors?.brands?.message ? 'error' : undefined}
              error={errors?.brands?.message}
            />
          )}
        />
      </Row>
      <Row>
        <Controller
          name='user_sales_role_id'
          control={control}
          defaultValue={user.user_sales_role_id}
          render={({ field }) => (
            <Select
              {...field}
              label='User Sales Role'
              style={{ width: '100%' }}
              value={field.value || []}
              multiple
              options={[
                { value: UserSalesRoleID.SALES, label: 'Sales' },
                { value: UserSalesRoleID.RETENTION, label: 'Retention' },
              ]}
              placeholder='Sales Role'
              status={errors?.user_sales_role_id?.message ? 'error' : undefined}
              error={errors?.user_sales_role_id?.message}
            />
          )}
        />
      </Row>
      <Row>
        <Controller
          name='manager_id'
          control={control}
          defaultValue={user.manager_id}
          render={({ field }) => (
            <Select
              {...field}
              label='User Manager'
              style={{ width: '100%' }}
              options={users?.map(user => ({
                value: user.id,
                label: user.full_name,
              }))}
              status={errors?.manager_id?.message ? 'error' : undefined}
              error={errors?.manager_id?.message}
            />
          )}
        />
      </Row>
      <Row>
        <Controller
          name='full_name'
          control={control}
          defaultValue={user.full_name}
          render={({ field }) => (
            <CustomInput
              {...field}
              placeholder='User Name'
              label='User Name'
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
          defaultValue={user.email}
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
      {!user?.id && (
        <Row>
          <Controller
            name='password'
            control={control}
            defaultValue={user.password}
            render={({ field }) => (
              <CustomInput
                {...field}
                placeholder='Password'
                label='Password'
                status={errors?.password?.message ? 'error' : undefined}
                error={errors?.password?.message}
              />
            )}
          />
        </Row>
      )}

      <Row>
        <Controller
          name='phone'
          control={control}
          defaultValue={user.phone}
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
          defaultValue={user.address}
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
          name='title'
          control={control}
          defaultValue={user.title}
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
          name='user_identifier'
          control={control}
          defaultValue={user.user_identifier}
          render={({ field }) => (
            <CustomInput
              {...field}
              placeholder='User identifier'
              label='User identifier'
              status={errors?.user_identifier?.message ? 'error' : undefined}
              error={errors?.user_identifier?.message}
            />
          )}
        />
      </Row>
      <Row>
        <Controller
          name='languages'
          control={control}
          defaultValue={user.languages}
          render={({ field }) => (
            <Select
              {...field}
              label='Languages'
              value={field.value || []}
              multiple
              style={{ width: '100%' }}
              options={languages?.map(l => ({
                ...l,
                value: l.code,
                label: l.name,
              }))}
              status={errors?.languages?.message ? 'error' : undefined}
              error={errors?.languages?.message}
            />
          )}
        />
      </Row>

      <Row style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Span>Work Time Start</Span>
        <Controller
          name='time_cards.time_start'
          control={control}
          defaultValue={user.time_cards?.time_start}
          render={({ field: { value, onChange } }) => (
            <TimePicker
              format={format}
              name='time_start'
              onChange={(event, dateString) =>
                onChange({ target: { name: 'time_start', value: dateString } })
              }
              value={value ? dayjs(value, format) : null}
            />
          )}
        />
      </Row>
      <Row style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Span>Work Time End</Span>
        <Controller
          name='time_cards.time_end'
          control={control}
          defaultValue={user.time_cards?.time_end}
          render={({ field: { value, onChange } }) => (
            <TimePicker
              format={format}
              name='time_end'
              onChange={(event, dateString) =>
                onChange({ target: { name: 'time_end', value: dateString } })
              }
              value={value ? dayjs(value, format) : null}
            />
          )}
        />
      </Row>
      <Row>
        <Controller
          name='notes'
          control={control}
          defaultValue={user.title}
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
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
`
const Row = styled.div`
  padding: 10px;
`
