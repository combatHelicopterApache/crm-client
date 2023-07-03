import React, { useEffect, useState } from 'react'
import {Spin, Popover, Tag, Dropdown, Space} from 'antd'
import { getLeads } from '../../../api/Leads'
import {
  EyeOutlined,
  FormOutlined,
  UnorderedListOutlined,
  UsergroupDeleteOutlined,
  CheckOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import {CustomTable, CustomTable as Table} from 'components/Table/CustomTable'
import { notification } from 'components/Notification/Notification'
import {CustomButton} from "../../../components/Button/CustomButton";
import {Span} from "../../../molecules/Span/Span";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom'

export const LeadsTable = () => {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchLeads = async () => {
      try {
        const response = await getLeads()
        console.log(response.data)
        setLeads(response.data)
      } catch {
        notification('error', 'An error occurred while loading data')
      } finally {
        setLoading(false)
      }
    }
    fetchLeads()
  }, [])

  const columns = [
    {
      title: '#',
      dataIndex: '',
      key: 'x',
      width: 30,
      render: (text: any) => (
        <Dropdown
          menu={{
            items: [
              {
                key: '1',
                icon: <FormOutlined />,
                label: <Link to={'/lead/' + text.id}>Change</Link>,
              },
              {
                key: '2',
                icon: <UsergroupDeleteOutlined />,
                label: <p>Delete</p>,
              },
              {
                key: '3',
                icon: <CheckOutlined />,
                label: <p>Change status</p>,
              },
            ],
          }}
          trigger={['click']}
          placement='bottomRight'
        >
          <UnorderedListOutlined />
        </Dropdown>
      ),
    },
    {
      title: 'Id',
      dataIndex: 'uid',
      key: 'uid',
    },
    {
      title: 'Crated at',
      dataIndex: 'created_at',
      key: 'created_at',
      //   render: (text: number) => features.normalizeDateTime(text),
    },
    {
      title: 'First name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Affiliate',
      dataIndex: 'affiliate',
      key: 'affiliate',
    },
    {
      title: 'Country',
      dataIndex: 'geo',
      key: 'geo',
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: 'Manager',
      dataIndex: 'manager',
      key: 'manager',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (text: any, tag: any) => (
          <Space>
              <Tag
                  color={text?.status?.color}
                  key={text?.status?.title}
              >
                {tag?.status?.title?.toUpperCase()}
              </Tag>
          </Space>

      ),
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'View',
      dataIndex: '',
      key: 'x',
      render: (text: any) => (
        <Popover content={text.comment}>
          <EyeOutlined />
        </Popover>
      ),
    },
  ]

  return (
    <>
      <Spin spinning={loading}>
        <Wrapper>
          <CustomTable dataSource={leads} columns={columns} />
        </Wrapper>
      </Spin>
    </>
  )
}

const Wrapper = styled.div``