import React, { ChangeEvent, FC } from 'react'
import styled from 'styled-components'
import { H2 } from 'molecules/H2/H2'
import { Select } from 'components/Select/Select'
import { User, UserCRUD } from 'features/Settings/Users/types'
import { ChangeHandler } from 'react-hook-form'

interface IProps {
  title: string
  data: User
  onChange: (e: ChangeHandler) => void
  label: string
}

const options = [
  { value: UserCRUD.CREATE, label: 'Create' },
  { value: UserCRUD.READ, label: 'Read' },
  { value: UserCRUD.DELETE, label: 'Delete' },
  { value: UserCRUD.UPDATE, label: 'Update' },
  { value: UserCRUD.ALL, label: 'All' },
]

export const Restrictions: FC<IProps> = ({ title, data, onChange, label }) => {
  return (
    <Wrapper>
      {title && <H2>{title}</H2>}
      <Select
        onChange={onChange}
        value={data || []}
        label={label}
        multiple
        options={options}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-bottom: 20px;
`
