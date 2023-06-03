import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import ReactInputMask from 'react-input-mask'
import { CustomInput } from 'components/Input/CustomInput'
import { Controller, useFormContext } from 'react-hook-form'
import { User, UserRole, UserStatus } from 'features/Users/types'
import { Select } from 'components/Select/Select'
import { ColorPicker } from 'antd'
import { TextArea } from 'components/TextArea/TextArea'
import { Span } from 'molecules/Span/Span'

const mask = '+38(999) 99-99-999'

interface IProps {
  user: User
  handleChangeUserRole: (e: ChangeEvent<HTMLInputElement>) => void
}

export const MainInfo = ({ user, handleChangeUserRole }: IProps) => {
  const {
    formState: { errors },
    control,
    setError,
  } = useFormContext()

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
      <Row>
        <Controller
          name='role_id'
          control={control}
          defaultValue={user.role_id}
          render={({ field }) => (
            <Select
              {...field}
              style={{ width: '100%' }}
              onChange={handleChangeUserRole}
              options={[
                { value: UserRole.OWNER, label: 'Owner' },
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
          name='status'
          control={control}
          defaultValue={user.status}
          render={({ field }) => (
            <Select
              {...field}
              style={{ width: '100%' }}
              options={[
                { value: UserStatus.Active, label: 'Active' },
                { value: UserStatus.Inactive, label: 'Inactive' },
                { value: UserStatus.Pending, label: 'Pending' },
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
              options={[
                { value: 1, label: 'Alex' },
                { value: 2, label: 'Jonh' },
                { value: 3, label: 'Ashly' },
              ]}
              placeholder='Manager'
              status={errors?.admin_id?.message ? 'error' : undefined}
              error={errors?.admin_id?.message}
            />
          )}
        />
      </Row>
      <Row>
        <Controller
          name='brand_id'
          control={control}
          defaultValue={user.brand_id}
          render={({ field }) => (
            <Select
              {...field}
              style={{ width: '100%' }}
              options={[
                { value: 1, label: 'Rozetka' },
                { value: 2, label: 'Citrus' },
                { value: 3, label: 'Apple' },
              ]}
              placeholder='Brand'
              status={errors?.brand_id?.message ? 'error' : undefined}
              error={errors?.brand_id?.message}
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
              style={{ width: '100%' }}
              options={[
                { value: 1, label: 'Alex' },
                { value: 2, label: 'Jonh' },
                { value: 3, label: 'Ashly' },
              ]}
              placeholder='Manager'
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
              status={errors?.user_identifier?.message ? 'error' : undefined}
              error={errors?.user_identifier?.message}
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

const Wrapper = styled.div``
const Row = styled.div`
  padding: 10px;
`
