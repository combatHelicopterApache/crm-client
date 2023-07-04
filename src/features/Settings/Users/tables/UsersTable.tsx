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
import { ControlsButton } from 'components/ControlsButton/ControlsButton'

export const UsersTable = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null)

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [checkedRows, setCheckedRows] = useState([])

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

  const handleCreateUser = () => {
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

  const controlsActionProps = record => ({
    todos: ['add', 'delete'],
    callbacks: [handleCreateUser, () => null],
    preloaders: [loading, loading],
    disabled: [null, !checkedRows?.length],
    tooltips: ['Add new  user?', 'Delete selected user (s)?'],
    popConfirms: ['Are you sure?'],
  })
  const onRow = (record: IClient, rowIndex: number) => ({
    onClick: () => {
      setClickedRowIndex(rowIndex)
    },
  })

  const rowSelection = {
    selectedRowKeys,
    columnWidth: 30,
    onChange: (
      selectedRowKeys: React.SetStateAction<never[]>,
      selectedRows: {
        map: (arg0: (row: any) => any) => React.SetStateAction<never[]>
      },
    ) => {
      setCheckedRows(
        selectedRows.map(row => ({ ...row, display_info: row.name })),
      )
      setSelectedRowKeys(selectedRowKeys)
    },
    getCheckboxProps: (record: IClient) => ({
      disabled:
        (!checkedRows.map(({ id }) => id).includes(record.id) &&
          checkedRows?.length === 2) ||
        (checkedRows.length && record.type !== checkedRows?.[0]?.type), // Column configuration not to be checked
      name: record.name,
    }),
  }

  return (
    <Wrapper>
      <Spin spinning={loading}>
        <ControlsButton {...controlsActionProps(data)} />
        <CustomTable
          onRow={onRow}
          rowSelection={rowSelection}
          dataSource={data}
          columns={columns}
        />
      </Spin>
    </Wrapper>
  )
}

const Wrapper = styled.div``
