import React, { useMemo, useEffect, useState } from 'react'
import { CustomTable } from 'components/Table/CustomTable'
import styled from 'styled-components'
import { CustomButton } from 'components/Button/CustomButton'
import { Span } from 'molecules/Span/Span'
import { useNavigate } from 'react-router-dom'
import { Spin } from 'antd'
import { notification } from 'components/Notification/Notification'
import { getUsers } from 'api/Users'
import moment from 'moment-timezone'
import { TableActions } from 'components/TableActions/TableActions'

export const UsersTable = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

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
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (value, record) => (
          <TableActions {...tableActionProps(record)} />
        ),
      },
    ],

    [],
  )

  const handleNavigate = () => {
    navigate(`/settings/users/new`)
  }
  const handleEditUser = id => {
    navigate(`/settings/users/${id}`)
  }
  const handleDeleteUser = async () => {
    console.log('delete')
  }

  const fetchUsersList = async params => {
    try {
      setLoading(true)
      const { data } = await getUsers(params)
      setData(data)
    } catch (error) {
      notification('error', 'Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsersList({})
  }, [])

  const tableActionProps = record => ({
    todos: ['edit', 'delete'],
    callbacks: [
      () => handleEditUser(record.id),
      () => handleDeleteUser(record.id),
    ],
    preloaders: [loading],
    tooltips: ['Edit this user.', 'Remove this user?'],
    popConfirms: [false, 'Are you sure?'],
  })

  return (
    <Wrapper>
      <Spin spinning={loading}>
        <CustomButton onClick={handleNavigate}>
          <Span>Create User</Span>
        </CustomButton>
        <CustomTable dataSource={data} columns={columns} />
      </Spin>
    </Wrapper>
  )
}

const Wrapper = styled.div``
