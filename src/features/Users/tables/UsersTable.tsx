import React, { useMemo } from 'react'
import { CustomTable } from 'components/Table/CustomTable'
import styled from 'styled-components'
import { CustomButton } from 'components/Button/CustomButton'
import { Span } from 'molecules/Span/Span'
import { useNavigate } from 'react-router-dom'
import { RoutesPath } from 'routes/types'

export const UsersTable = () => {
  const navigate = useNavigate()
  const columns = useMemo(
    () => [
      {
        title: 'Full Name',
        dataIndex: 'full_name',
        key: 'name',
      },

      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
      },
      {
        title: 'Manager',
        dataIndex: 'manager',
        key: 'manager',
      },
      {
        title: 'Created at',
        dataIndex: 'created_at',
        key: 'created_at',
      },
    ],

    [],
  )

  const handleNavigate = () => {
    navigate(`${RoutesPath.USER_CREATE_ROUTE}`)
  }
  return (
    <Wrapper>
      <CustomButton onClick={handleNavigate}>
        <Span>Create User</Span>
      </CustomButton>
      <CustomTable dataSource={[]} columns={columns} />
    </Wrapper>
  )
}

const Wrapper = styled.div``
