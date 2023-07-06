import React, { useEffect, useState } from 'react'
import { Spin, Tooltip } from 'antd'
import styled from 'styled-components'
import moment from 'moment-timezone'
import { CustomTable as Table } from 'components/Table/CustomTable'

import { ColumnsType } from 'antd/lib/table/InternalTable'
import { FilterDropdownProps } from 'antd/es/table/interface'
import { SearchFilter } from 'components/Table/components/SearchFilter'

import { renderCopyableText } from 'utils/renderCopyableText'
import { TableActions } from 'components/TableActions/TableActions'
import { ControlsButton } from 'components/ControlsButton/ControlsButton'
import { notification } from 'components/Notification/Notification'
import { PaginationConfig } from 'antd/es/pagination'
import { SorterResult } from 'antd/es/table/interface'

export const Accounts = () => {
  const [state, setState] = useState([])
  const [loading, setLoading] = useState(false)
  const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null)
  const [comments, setComments] = useState({})
  const [openComments, setOpenComments] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [checkedRows, setCheckedRows] = useState([])
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<string | null>(null)
  const [tableFilters, setTableFilters] = useState({})
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 25,
    total: 10,
  })

  const onRow = (record: IClient, rowIndex: number) => ({
    onClick: () => {
      setClickedRowIndex(rowIndex)
    },
  })

  const fetchLeads = async params => {
    setLoading(true)
    try {
      // const response = await getLeads(params)
      // setState(response.data)
    } catch {
      notification('error', 'An error occurred while loading data')
    } finally {
      setLoading(false)
    }
  }

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

  const handleTableChange = (
    pagination: PaginationConfig,
    filters: Partial<Record<keyof [], string[]>>,
    sorter: SorterResult<[]>,
  ) => {
    setTableFilters(filters)

    fetchLeads({
      //search: undefined,
      page: pagination.current,
      sort_field: sorter.order ? sorter.field : null,
      order:
        sorter.order === 'ascend'
          ? 'asc'
          : sorter.order === 'descend'
          ? 'desc'
          : null,
      per_page: pagination.pageSize,
      ...filters,
    })

    setSortOrder(
      sorter?.order === 'ascend'
        ? 'asc'
        : sorter.order === 'descend'
        ? 'desc'
        : null,
    )
    setSortField(sorter?.field ?? null)
  }

  const controlsActionProps = record => ({
    todos: ['add'],
    callbacks: [() => null],
    preloaders: [loading],
    tooltips: ['Add CFD account?'],
    popConfirms: [null],
  })

  const tableActionProps = record => ({
    todos: ['delete', 'view', 'phone'],
    callbacks: [() => null, () => null, () => null],
    preloaders: [loading, loading, loading],
    tooltips: [
      'Remove this lead?',
      'Open this lead in the new tab?',
      'Are you want to Call?',
    ],
    popConfirms: ['Are you sure?'],
  })
  const columns: ColumnsType<[]> = [
    {
      title: 'Product',
      dataIndex: 'uid',
      key: 'uid',
      width: 150,
      sorter: true,
      render: id => renderCopyableText(id),
      filterDropdown: (props: FilterDropdownProps) => (
        <SearchFilter title={'Product'} {...props} />
      ),
    },

    {
      title: 'ID',
      dataIndex: 'first_name',
      key: 'first_name',
      width: 150,
      sorter: true,
      filterDropdown: (props: FilterDropdownProps) => (
        <SearchFilter title={'ID'} {...props} />
      ),
    },
    {
      title: 'Group',
      dataIndex: 'last_name',
      key: 'last_name',
      width: 150,
      sorter: true,
      filterDropdown: (props: FilterDropdownProps) => (
        <SearchFilter title={'Group'} {...props} />
      ),
    },
    {
      title: 'Currency',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
      sorter: true,
      render: phone => renderCopyableText(phone),
      filterDropdown: (props: FilterDropdownProps) => (
        <SearchFilter title={'Currency'} {...props} />
      ),
    },
    {
      title: 'Enabled',
      dataIndex: 'email',
      key: 'email',
      width: 250,
      sorter: true,
      filterDropdown: (props: FilterDropdownProps) => (
        <SearchFilter title={'Email'} {...props} />
      ),
    },
    {
      title: 'Leverage',
      dataIndex: 'affiliate',
      key: 'affiliate',
      width: 150,
      sorter: true,
      filterDropdown: (props: FilterDropdownProps) => (
        <SearchFilter title={'Leverage'} {...props} />
      ),
    },
    {
      title: 'Margin',
      dataIndex: 'geo',
      key: 'geo',
      width: 150,
      sorter: true,

      filterDropdown: (props: FilterDropdownProps) => (
        <SearchFilter title={'Margin'} {...props} />
      ),
    },
    {
      title: 'Margin Level',
      dataIndex: 'geo',
      key: 'geo',
      width: 150,
      sorter: true,
    },
    {
      title: 'PNL',
      dataIndex: 'source',
      key: 'source',
      width: 150,
      sorter: true,
      filterDropdown: (props: FilterDropdownProps) => (
        <SearchFilter title={'PNL'} {...props} />
      ),
    },

    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      width: 150,
      sorter: true,
      filterDropdown: (props: FilterDropdownProps) => (
        <SearchFilter title={'Balance'} {...props} />
      ),
    },
    {
      title: 'Credit',
      dataIndex: 'ip',
      key: 'ip',
      width: 150,
      sorter: true,
      filterDropdown: (props: FilterDropdownProps) => (
        <SearchFilter title={'Credit'} {...props} />
      ),
    },

    {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      render: (data: number) =>
        data ? moment(data).format('DD/MM/YYYY HH:mm') : '-',
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (value, record) => <TableActions {...tableActionProps(record)} />,
    },
  ]

  return (
    <Wrapper>
      <ControlsButton {...controlsActionProps(state)} />
      <Spin spinning={loading}>
        <Table
          onRow={onRow}
          rowSelection={rowSelection}
          dataSource={state}
          columns={columns}
          onChange={handleTableChange}
        />
      </Spin>
    </Wrapper>
  )
}

const Wrapper = styled.div``
