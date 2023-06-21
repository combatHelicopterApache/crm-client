import React, { useState, useEffect, useMemo } from 'react'
import {
  CustomTable as Table,
  ellipsisStyle,
} from 'components/Table/CustomTable'
import styled from 'styled-components'
import { CustomButton } from 'components/Button/CustomButton'
import { useNavigate } from 'react-router-dom'
import { AdminRoutesPath } from 'routes/types'
import { getCompaniesList } from 'api/companies'
import { notification } from 'components/Notification/Notification'
import moment from 'moment-timezone'
import { Spin } from 'antd'
import { H2 } from 'molecules/H2/H2'
import { CompanyStatus } from './CompanyForm'

export const CompaniesList = () => {
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null)
  const navigate = useNavigate()

  const handleClick = () => {
    return navigate(AdminRoutesPath.ADMIN_COMPANY_CREATE_ROUTE)
  }

  const handleOpenCompany = id => {
    return navigate(`/admin/company/${id}`)
  }

  const onRow = (record, rowIndex) => ({
    onClick: () => {
      setClickedRowIndex(rowIndex)
      handleOpenCompany(record.id)
    },
  })

  useEffect(() => {
    const fetchCompaniesList = async () => {
      setLoading(true)
      try {
        const { data, count } = await getCompaniesList()
        setData(data)
        setCount(count)
      } catch (error) {
        notification('error', 'Something went wrong!')
      } finally {
        setLoading(false)
      }
    }
    fetchCompaniesList()
  }, [])

  const columns = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 300,
        onCell: record => {
          return record.key === clickedRowIndex ? undefined : ellipsisStyle
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render: value => (
          <p style={{ margin: '0' }}>
            {value === CompanyStatus.Active
              ? 'Active'
              : value === CompanyStatus.Inactive
              ? 'Inctive'
              : 'Pending'}
          </p>
        ),
        onCell: record => {
          return record.key === clickedRowIndex ? undefined : ellipsisStyle
        },
      },

      {
        title: 'Company Name',
        dataIndex: 'company_name',
        key: 'company_name',
        onCell: record =>
          record.key === clickedRowIndex ? undefined : ellipsisStyle,
      },
      {
        title: 'Company Email',
        dataIndex: 'company_email',
        key: 'company_email',
        onCell: record =>
          record.key === clickedRowIndex ? undefined : ellipsisStyle,
      },
      {
        title: 'Company Phone',
        dataIndex: 'company_phone',
        key: 'company_phone',
        width: 200,
        onCell: record =>
          record.key === clickedRowIndex ? undefined : ellipsisStyle,
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        onCell: record =>
          record.key === clickedRowIndex ? undefined : ellipsisStyle,
      },
      {
        title: 'Admin Name',
        dataIndex: 'admin_name',
        key: 'admin_name',
        onCell: record =>
          record.key === clickedRowIndex ? undefined : ellipsisStyle,
      },
      {
        title: 'Admin Email',
        dataIndex: 'admin_email',
        key: 'admin_email',
        onCell: record =>
          record.key === clickedRowIndex ? undefined : ellipsisStyle,
      },
      {
        title: 'Admin Phone',
        dataIndex: 'admin_phone',
        key: 'admin_phone',
        width: 200,
        onCell: record =>
          record.key === clickedRowIndex ? undefined : ellipsisStyle,
      },
      {
        title: 'Company Identifier',
        dataIndex: 'company_identifier',
        key: 'company_identifier',
        onCell: record =>
          record.key === clickedRowIndex ? undefined : ellipsisStyle,
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
  return (
    <Wrapper>
      <HeadingWrapper>
        <CustomButton onClick={handleClick}>
          <span>Add Company</span>
        </CustomButton>
        <H2>{`You have ${count} active company`}</H2>
      </HeadingWrapper>

      <Spin spinning={loading}>
        <Table dataSource={data} onRow={onRow} columns={columns} />
      </Spin>
    </Wrapper>
  )
}

const Wrapper = styled.div``
const HeadingWrapper = styled.div`
  display: flex;
  gap: 20px;
`
