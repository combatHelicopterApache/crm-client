import React, { useEffect, useState, useMemo } from 'react'
import { message, Dropdown, Modal, Spin } from 'antd'
import { deleteGroup, getGroups } from '../../../api/groups'

import {
  UnorderedListOutlined,
  UsergroupDeleteOutlined,
  FormOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

import { GroupsInfoModal } from '../modals/GroupsInfoModal'
import { IGroups } from '../../../types/groupsTypes'
import { CustomTable as Table } from 'components/Table/CustomTable'

const GroupsTable = () => {
  const [groups, setGroups] = useState<IGroups[]>([])
  const [visible, setVisible] = useState(false)
  const [activeGroupId, setActiveGroupId] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await getGroups({})
        setGroups(response.data.group)
      } catch {
        message.error('An error occurred while loading data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const removeElement = async (id: string) => {
    setLoading(true)
    try {
      const response = await deleteGroup(id)
      message.success(response.data.message)
    } catch {
      message.error('An error occurred while loading data')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this item?',
      onOk() {
        setGroups(prev => prev.filter(item => item.id !== id))
        removeElement(id)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const columns = useMemo(
    () => [
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (text: any) => (
          <Dropdown
            menu={{
              items: [
                {
                  key: '1',
                  icon: <FormOutlined />,
                  label: <Link to={'/groups/' + text.id}>Detail</Link>,
                },
                {
                  key: '2',
                  icon: <UsergroupDeleteOutlined />,
                  label: <p onClick={() => handleDelete(text.id)}>Delete</p>,
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
        title: 'Name',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: 'Crated at',
        dataIndex: 'created_at',
        key: 'created_at',
        // render: (text: string) => features.normalizeDateTime(text),
      },
      {
        title: 'Updated at',
        dataIndex: 'updated_at',
        key: 'updated_at',
        // render: (text: string) => features.normalizeDateTime(text),
      },
      {
        title: 'View',
        dataIndex: '',
        key: 'x',
        render: (text: any) => (
          <p onClick={() => handleVisible(text.id)}>
            <EyeOutlined />
          </p>
        ),
      },
    ],
    [],
  )

  const tableStyle = {
    backgroundColor: '#1f1f1f',
  }

  // const rowStyle = (record: any, index: number) => {
  //   if (index % 2 === 0) {
  //     return s.light
  //   } else {
  //     return s.dark
  //   }
  // }

  const handleVisible = (id: string) => {
    setVisible(true)
    setActiveGroupId(id)
  }

  const handleClose = () => {
    setVisible(false)
    setActiveGroupId('')
  }

  return (
    <div>
      <Spin spinning={loading}>
        <Table dataSource={groups} columns={columns} style={tableStyle} />
      </Spin>
      <GroupsInfoModal
        visible={visible}
        handlerClose={handleClose}
        id={activeGroupId}
      />
    </div>
  )
}

export default GroupsTable
