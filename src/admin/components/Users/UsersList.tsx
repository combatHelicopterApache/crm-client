import React, { useState, useEffect, useMemo } from 'react'
import {
  CustomTable as Table,
  ellipsisStyle,
} from 'components/Table/CustomTable'
import styled from 'styled-components'
import { CustomButton } from 'components/Button/CustomButton'
import { useNavigate } from 'react-router-dom'
import { AdminRoutesPath } from 'routes/types'
import { getUserSAUsers } from 'api/Users'
import { notification } from 'components/Notification/Notification'
import moment from 'moment-timezone'

export const UsersList = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null)

  const handleClick = () => {
    return navigate(AdminRoutesPath.ADMIN_USER_CREATE_ROUTE)
  }
  const onRow = (record, rowIndex) => ({
    onClick: () => {
      setClickedRowIndex(rowIndex)
    },
  })

  const columns = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 200,
        onCell: record => {
          return record.key === clickedRowIndex ? undefined : ellipsisStyle
        },
      },
      {
        title: 'Name',
        dataIndex: 'full_name',
        key: 'full_name',
        width: 200,
        onCell: record => {
          return record.key === clickedRowIndex ? undefined : ellipsisStyle
        },
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        width: 200,
        onCell: record => {
          return record.key === clickedRowIndex ? undefined : ellipsisStyle
        },
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 200,
        onCell: record => {
          return record.key === clickedRowIndex ? undefined : ellipsisStyle
        },
      },

      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: 200,
        onCell: record => {
          return record.key === clickedRowIndex ? undefined : ellipsisStyle
        },
      },

      {
        title: 'Created at',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (value, record) =>
          moment(value || moment()).format('DD/MM/YYYY'),
      },
      {
        title: 'Updated at',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (value, record) =>
          moment(value || moment()).format('DD/MM/YYYY'),
      },
    ],
    [clickedRowIndex],
  )

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, status } = await getUserSAUsers()

        setData(data)
      } catch (error) {
        notification('error', 'Something went wrong')
      }
    }
    fetchUsers()
  }, [])
  return (
    <Wrapper>
      <CustomButton onClick={handleClick}>
        <span>Add User</span>
      </CustomButton>
      <Table onRow={onRow} dataSource={data} columns={columns} />
    </Wrapper>
  )
}

const Wrapper = styled.div``
