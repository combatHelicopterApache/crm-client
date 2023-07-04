import React, { useMemo, useState, useEffect } from 'react'
import moment from 'moment-timezone'
import { Spin } from 'antd'
import { CustomButton } from 'components/Button/CustomButton'
import { TableActions } from 'components/TableActions/TableActions'
import { notification } from 'components/Notification/Notification'
import styled from 'styled-components'
import { CustomTable } from 'components/Table/CustomTable'
import { Span } from 'molecules/Span/Span'
import {
  getOfficesList,
  createOffice,
  deleteOffice,
  updateOffice,
} from 'api/Offices'
import { EditOffice } from './components/EditOffice'
import { ControlsButton } from 'components/ControlsButton/ControlsButton'
import { ColumnsType } from 'antd/es/table'

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
  const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null)

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [checkedRows, setCheckedRows] = useState([])

  const columns: ColumnsType<Office[]> = useMemo(
    () => [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'name',
      },

      {
        title: 'Status',
        dataIndex: 'active',
        key: 'active',
        render: value => (value ? 'Active' : 'Inactive'),
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Created at',
        dataIndex: 'created_at',
        key: 'created_at',
        render: value => moment(value).format('DD/MM/YYYY HH:MM A'),
      },
      {
        title: 'Updated at',
        dataIndex: 'updated_at',
        key: 'updated_at',
        render: value => moment(value).format('DD/MM/YYYY HH:MM A'),
      },

      {
        title: 'Manager ID',
        dataIndex: 'manager_id',
        key: 'manager_id',
      },
      {
        title: 'Work Start',
        dataIndex: 'time_cards',
        key: 'time_cards',
        render: value =>
          value?.time_start
            ? moment(value.time_start, 'HH:mm').format('HH:mm A')
            : '-',
      },
      {
        title: 'Work End',
        dataIndex: 'time_cards',
        key: 'time_cards',
        render: value =>
          value?.time_end
            ? moment(value.time_end, 'HH:mm').format(' HH:mm A')
            : '-',
      },

      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (value, record: Office) => (
          <TableActions {...tableActionProps(record)} />
        ),
      },
    ],

    [],
  )

  const handleEditOffice = (record: Office) => {
    setVisible(true)
    setOffice(record)
  }

  const handleClickCreateOffice = () => {
    setVisible(true)
    setOffice(initState)
  }

  const handleChange = e => {
    const { name, value } = e.target
    if (name === 'time_start' || name === 'time_end') {
      return setOffice(prev => ({
        ...prev,
        time_cards: {
          ...prev.time_cards,
          [name]: value,
        },
      }))
    }
    setOffice(prev => ({ ...prev, [name]: value }))
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

  const handleSave = async () => {
    setLoading(true)
    try {
      await createOffice(office)
      await fetchOfficesList({})
      setVisible(false)
    } catch (error) {
      notification('error', error.message)
    } finally {
      setLoading(false)
    }
  }
  const handleDeleteOffice = async (id: Office['id']) => {
    setLoading(true)
    try {
      await deleteOffice(id)
      await fetchOfficesList({})
    } catch (error) {
      notification('error', error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    setLoading(true)
    try {
      await updateOffice(office)
      await fetchOfficesList({})
    } catch (error) {
      notification('error', error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = id => {
    setOffice(data.find(d => d.id === id))
  }

  useEffect(() => {
    fetchOfficesList({})
  }, [])

  const tableActionProps = (record: Office) => ({
    todos: ['edit', 'delete'],
    callbacks: [
      () => handleEditOffice(record),
      () => handleDeleteOffice(record.id),
    ],
    preloaders: [loading],
    tooltips: ['Edit this office.', 'Remove this office?'],
    popConfirms: [false, 'Are you sure?'],
  })
  const controlsActionProps = (record: Office) => ({
    todos: ['add', 'delete', 'edit'],
    callbacks: [handleClickCreateOffice, () => null],
    preloaders: [loading, loading],
    disabled: [null, !checkedRows?.length, !checkedRows?.length],
    tooltips: ['Add new  user?', 'Delete selected user (s)?'],
    popConfirms: ['Are you sure?'],
  })
  const onRow = (record: Office, rowIndex: number) => ({
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
      <EditOffice
        visible={visible}
        office={office}
        handleSave={handleSave}
        onClose={() => {
          setVisible(false)
          setOffice(initState)
        }}
        onChange={handleChange}
        handleUpdate={handleUpdate}
        handleCancel={handleCancel}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div``
