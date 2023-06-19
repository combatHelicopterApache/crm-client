import React, { useState, useEffect, useMemo } from 'react'
import {
  CustomTable as Table,
  ellipsisStyle,
} from 'components/Table/CustomTable'
import styled from 'styled-components'
import { CustomButton } from 'components/Button/CustomButton'
import { useNavigate } from 'react-router-dom'
import { AdminRoutesPath } from 'routes/types'
import { getBrandsList } from 'api/Brands'
import { notification } from 'components/Notification/Notification'
import moment from 'moment-timezone'
import { Spin } from 'antd'
import { H2 } from 'molecules/H2/H2'
import { BrandStatus } from './BrandForm'
import { Span } from 'molecules/Span/Span'
import { BrandInfo } from './BrandInfo'

export const BrandsList = () => {
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null)
  const [clickedRowData, setClikedRowData] = useState(null)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleClick = () => {
    return navigate(AdminRoutesPath.ADMIN_BRAND_CREATE_ROUTE)
  }

  const handleOpenBrand = record => {
    setClikedRowData(record)
    setOpen(true)
  }
  const handleCloseBrand = () => {
    setClikedRowData(null)
    setOpen(false)
  }

  const onRow = (record, rowIndex) => ({
    onClick: () => {
      handleOpenBrand(record)
      setClickedRowIndex(rowIndex)
    },
  })

  useEffect(() => {
    const fetchBrandList = async () => {
      setLoading(true)
      try {
        const { data, count } = await getBrandsList({})
        setData(data)
        setCount(count)
      } catch (error) {
        notification('error', 'Something went wrong!')
      } finally {
        setLoading(false)
      }
    }
    fetchBrandList()
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
        render: value => <Span>{value ? 'Active' : 'Inctive'}</Span>,
        onCell: record => {
          return record.key === clickedRowIndex ? undefined : ellipsisStyle
        },
      },

      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        onCell: record =>
          record.key === clickedRowIndex ? undefined : ellipsisStyle,
      },
      {
        title: 'Notes',
        dataIndex: 'description',
        key: 'description',
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
          <span>Add Brand</span>
        </CustomButton>
        <H2>{`You have ${data?.length || 0} active brand`}</H2>
      </HeadingWrapper>

      <Spin spinning={loading}>
        <Table dataSource={data} onRow={onRow} columns={columns} />
      </Spin>
      <BrandInfo
        visible={open}
        onClose={handleCloseBrand}
        brandId={clickedRowData?.id}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div``
const HeadingWrapper = styled.div`
  display: flex;
  gap: 20px;
`
