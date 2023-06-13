import React, { useMemo, useEffect, useState } from 'react'
import { CustomTable } from 'components/Table/CustomTable'
import styled from 'styled-components'
import { CustomButton } from 'components/Button/CustomButton'
import { Span } from 'molecules/Span/Span'
import { useNavigate } from 'react-router-dom'
import { RoutesPath } from 'routes/types'
import { notification } from 'components/Notification/Notification'
import { getUsers } from 'api/Users'
import moment from 'moment-timezone'

export const UsersTable = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
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
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Role',
        dataIndex: 'role_name',
        key: 'role_name',
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Notes',
        dataIndex: 'notes',
        key: 'notes',
      },
      {
        title: 'Manager',
        dataIndex: 'manager_name',
        key: 'manager_name',
      },
      {
        title: 'Created at',
        dataIndex: 'created_at',
        key: 'created_at',
        render: value =>
          value ? moment(value).format('DD/MM/YYYY HH:MM A') : '-',
      },
      {
        title: 'Last Login',
        dataIndex: 'last_login',
        key: 'last_login',
        render: value =>
          value ? moment(value).format('DD/MM/YYYY HH:MM A') : '-',
      },
      {
        title: 'Identifier',
        dataIndex: 'user_identifier',
        key: 'user_identifier',
      },
    ],

    [],
  )

  const handleNavigate = () => {
    navigate(`${RoutesPath.USER_CREATE_ROUTE}`)
  }

  const fetchUsersList = async params => {
    try {
      const { data, status } = await getUsers(params)
      setData(data)
    } catch (error) {
      notification('error', 'Something went wrong!')
    }
  }

  useEffect(() => {
    fetchUsersList({})
  }, [])

  return (
    <Wrapper>
      <CustomButton onClick={handleNavigate}>
        <Span>Create User</Span>
      </CustomButton>
      <CustomTable dataSource={data} columns={columns} />
    </Wrapper>
  )
}

const Wrapper = styled.div``
