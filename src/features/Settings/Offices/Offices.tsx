import React, { useMemo, useState, useEffect } from 'react'
import moment from 'moment-timezone'
import { Spin } from 'antd'
import { CustomButton } from 'components/Button/CustomButton'
import { TableActions } from 'components/TableActions/TableActions'
import { notification } from 'components/Notification/Notification'
import styled from 'styled-components'
import { CustomTable } from 'components/Table/CustomTable'
import { Span } from 'molecules/Span/Span'
import { getOfficesList } from 'api/Offices'
import { EditOffice } from './components/EditOffice'
import { ColumnProps } from 'antd/es/table'
import { Office } from './types'

const initState: Office = {
  title: '',
  address: '',
  description: '',
  company_id: '',
  active: true,
  manager_id: '',
  time_cards: {
    time_start: '',
    time_end: '',
  },
}

export const Offices = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [office, setOffice] = useState<Office>(initState)

  const columns: ColumnProps<Office[]> = useMemo(
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
    // navigate(`/settings/users/new`)
  }
  const handleEditUser = id => {
    // navigate(`/settings/users/${id}`)
  }
  const handleDeleteUser = async () => {
    console.log('delete')
  }

  const handleClickCreateOffice = () => {
    setVisible(true)
    setOffice(initState)
  }

  const fetchOfficesList = async params => {
    try {
      setLoading(true)
      const { data } = await getOfficesList(params)

      setData(data)
    } catch (error) {
      notification('error', 'Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOfficesList({})
  }, [])

  const tableActionProps = record => ({
    todos: ['edit', 'delete'],
    callbacks: [
      () => handleEditUser(record.id),
      () => handleDeleteUser(record.id),
    ],
    preloaders: [loading],
    tooltips: ['Edit this office.', 'Remove this office?'],
    popConfirms: [false, 'Are you sure?'],
  })

  return (
    <Wrapper>
      <Spin spinning={loading}>
        <CustomButton onClick={handleClickCreateOffice}>
          <Span>Create Office</Span>
        </CustomButton>
        <CustomTable dataSource={data} columns={columns} />
      </Spin>
      <EditOffice
        visible={visible}
        office={office}
        onClose={() => setVisible(false)}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div``
