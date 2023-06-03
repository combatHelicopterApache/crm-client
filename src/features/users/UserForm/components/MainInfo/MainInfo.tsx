import React from 'react'
import styled from 'styled-components'
import ReactInputMask from 'react-input-mask'
import { CustomInput } from 'components/Input/CustomInput'
import { Controller, useFormContext } from 'react-hook-form'

const mask = '+38(999) 99-99-999'

export const MainInfo = ({ user }) => {
  const {
    formState: { errors },
    control,
    watch,
    setValue,
    setError,
    clearErrors,
    getValues,
  } = useFormContext()

  return (
    <Wrapper>
      <Row>
        <Controller
          name='user_name'
          control={control}
          defaultValue={user.user_name}
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
          defaultValue={user.user_email}
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
          defaultValue={user.user_phone}
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
                  status={errors?.user_phone?.message ? 'error' : undefined}
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
    </Wrapper>
  )
}

const Wrapper = styled.div``
const Row = styled.div`
  padding: 10px;
`
