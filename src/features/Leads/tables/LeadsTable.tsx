import React, { useEffect, useState } from 'react'
import { Spin, Tooltip } from 'antd'
import { getLeads, deleteLead } from '../../../api/Leads'
import { CustomTable, CustomTable as Table } from 'components/Table/CustomTable'
import { notification } from 'components/Notification/Notification'
import { Span } from '../../../molecules/Span/Span'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { LeadStatus } from '../components/LeadStatus'
import { TableActions } from 'components/TableActions/TableActions'
import moment from 'moment-timezone'
import { Typography } from 'antd'
import { PaginationConfig } from 'antd/es/pagination'
import { SorterResult } from 'antd/es/table/interface'
import { SearchFilter } from 'components/Table/components/SearchFilter'
import { FilterDropdownProps } from 'antd/es/table/interface'
import { ControlsButton } from 'components/ControlsButton/ControlsButton'
import { NavLink } from 'react-router-dom'
import { countryByCode, countries } from 'utils/countryList'
import { CommentPopover } from '../components/CommentPopover'
import { ColumnsType, TableProps } from 'antd/es/table'
import { MessagesDrawer } from '../components/MessagesDrawer'
import { geoToLocalTime } from 'utils/geoToLocalTime'
import { P } from 'molecules/P/P'
import { useStatus } from 'hooks/useStatus'
import { useUsers } from 'hooks/useUsers'
import { DateRangeFilter } from 'components/Table/components/DateRangeFilter'
import { RangePickerFilter } from 'components/Table/components/RangeFilter'
import { Select } from 'components/Select/Select'
import { CreateLead } from '../components/CreateLead'
import { createLead } from '../../../api/Leads'
import { changeLeadStatus } from 'api/Status'

const { Paragraph } = Typography

const renderCopyableText = text => {
  return (
    <CopyWrapper>
      <Paragraph copyable={{ tooltips: false }}>{text}</Paragraph>
    </CopyWrapper>
  )
}

const ClientTypeFilters = [
  {
    text: 'Sales',
    value: 'sales',
  },
  {
    text: 'Retention',
    value: 'retention',
  },
]

const wordToUpperCase = (firstLater, ...rest) => {
  return firstLater?.toUpperCase() + rest?.join('')?.toLowerCase()
}

export const LeadsTable = () => {
  const { status } = useStatus()
  const { users } = useUsers()
  const navigate = useNavigate()
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null)
  const [comments, setComments] = useState({})
  const [openComments, setOpenComments] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [checkedRows, setCheckedRows] = useState([])
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<string | null>(null)
  const [tableFilters, setTableFilters] = useState({})
  const [openLead, setOpenLead] = useState(false)

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 25,
    total: 10,
  })
  const fetchLeads = async params => {
    setLoading(true)
    try {
      const response = await getLeads(params)
      setLeads(response.data)
    } catch {
      notification('error', 'An error occurred while loading data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads({})
  }, [])

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
      // disabled:
      //   (!checkedRows.map(({ id }) => id).includes(record.id) &&
      //     checkedRows?.length === 2) ||
      //   (checkedRows.length && record.type !== checkedRows?.[0]?.type),
      name: record.name,
    }),
  }

  const handleTableChange = (
    pagination: PaginationConfig,
    filters: Partial<Record<keyof IProposalsTableItem, string[]>>,
    sorter: SorterResult<IProposalsTableItem>,
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

  const handleOpenLead = id => {
    return navigate(`/lead/${id}`)
  }

  const handleOpenCommentsList = comments => {
    setComments(comments)
    setOpenComments(true)
  }
  const handleCloseCommentsList = () => {
    setComments({})
    setOpenComments(false)
    fetchLeads({})
  }

  const handleDelete = async id => {
    try {
      await deleteLead(id)
      setLeads(prev => prev.filter(lead => lead.id !== id))
    } catch (error) {
      notification('error', error.message)
    }
  }

  const handleAttachUser = async (userId, leadId) => {
    setLeads(prev =>
      prev.map(item =>
        item.id === leadId ? { ...item, assigned_to: userId } : item,
      ),
    )
  }

  const onOpenLeadForm = () => {
    setOpenLead(true)
  }
  const onCloseLeadForm = () => {
    setOpenLead(false)
  }

  const onSave = async lead => {
    try {
      const res = await createLead(lead)
      onCloseLeadForm()
    } catch (error) {
      notification('error', error.message)
    }
  }

  const tableActionProps = record => ({
    todos: ['delete', 'view', 'phone'],
    callbacks: [
      () => handleDelete(record.id),
      () => handleOpenLead(record.id),
      () => null,
    ],
    preloaders: [loading, loading, loading],
    disabled: [false, false, true],
    tooltips: [
      'Remove this lead?',
      'Open this lead in the new tab?',
      'Are you want to Call?',
    ],
    popConfirms: ['Are you sure that you want to delete this lead?'],
  })
  const controlsActionProps = record => ({
    todos: ['add', 'edit', 'copy', 'delete'],
    callbacks: [
      onOpenLeadForm,
      () => handleOpenLead(checkedRows[0]?.id),
      () => null,
      () => handleDelete(checkedRows[0]?.id),
    ],
    preloaders: [loading, loading, loading, loading],
    disabled: [
      false,
      checkedRows.length !== 1,
      checkedRows.length !== 1,
      checkedRows.length !== 1,
    ],
    tooltips: [
      'Remove this lead?',
      'Open this lead in the new tab?',
      'Are you want to Call?',
    ],
    popConfirms: [
      false,
      false,
      false,
      'Are you sure that you want to delete this lead?',
    ],
  })

  const handleChangeLeadStatus = async (leadId, newStatus) => {
    try {
      const res = await changeLeadStatus(leadId, newStatus)
      notification('success', 'Status was changed successfuly!')
    } catch (error) {
      notification('error', error.message)
    }
  }

  const columns: ColumnsType<[]> = [
    {
      title: 'Lead ID',
      dataIndex: 'uid',
      key: 'uid',
      width: 150,
      sorter: true,

      render: id => renderCopyableText(id),
      filterDropdown: (props: FilterDropdownProps) => (
        <SearchFilter title={'Lead ID'} {...props} />
      ),
    },

    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      width: 150,
      sorter: true,
      filterDropdown: (props: FilterDropdownProps) => (
        <SearchFilter title={'First Name'} {...props} />
      ),
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
      width: 150,
      sorter: true,
      filterDropdown: (props: FilterDropdownProps) => (
        <SearchFilter title={'Last Name'} {...props} />
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
      sorter: true,
      render: phone => renderCopyableText(phone),
      filterDropdown: (props: FilterDropdownProps) => (
        <SearchFilter title={'Phone'} {...props} />
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 250,
      sorter: true,
      filterDropdown: (props: FilterDropdownProps) => (
        <SearchFilter title={'Email'} {...props} />
      ),
    },
    {
      title: 'Affiliate',
      dataIndex: 'affiliate',
      key: 'affiliate',
      width: 150,
      sorter: true,
      filterDropdown: (props: FilterDropdownProps) => (
        <SearchFilter title={'Affiliate'} {...props} />
      ),
    },
    {
      title: 'Country',
      dataIndex: 'geo',
      key: 'geo',
      width: 150,
      filterMode: 'tree',
      filterSearch: true,
      filters: countries?.map(item => ({ text: item.name, value: item.code })),

      render: coutry => (
        <Tooltip placement='left' title={countryByCode?.[coutry]?.name}>
          {countryByCode?.[coutry]?.image && countryByCode?.[coutry]?.name ? (
            <img
              style={{ display: 'block', width: '30px' }}
              src={countryByCode?.[coutry]?.image}
              alt={countryByCode?.[coutry]?.name}
            />
          ) : (
            <Flag>{coutry || '-'}</Flag>
          )}
        </Tooltip>
      ),
    },
    {
      title: 'Local Time',
      dataIndex: 'geo',
      key: 'geo',
      width: 150,
      sorter: true,
      render: coutry => <P>{geoToLocalTime(coutry)}</P>,
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      width: 150,
      sorter: true,
      filterDropdown: (props: FilterDropdownProps) => (
        <SearchFilter title={'Source'} {...props} />
      ),
    },
    {
      title: 'Manager',
      dataIndex: 'manager',
      key: 'manager',
      width: 150,
      sorter: true,

      render: manager => (
        <NavLink to={`settings/user/${manager?.id}`}>
          {manager?.full_name || '-'}
        </NavLink>
      ),
    },
    {
      title: 'Assigned to',
      dataIndex: 'assigned_to',
      key: 'assigned_to',
      width: 150,
      sorter: true,
      filters: users?.map(item => ({ text: item.full_name, value: item.id })),
      render: (userId, record) => (
        <Select
          value={userId}
          size='small'
          onChange={e => handleAttachUser(e.target.value, record.id)}
          options={users?.map(item => ({
            label: item.full_name,
            value: item.id,
          }))}
        />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      sorter: true,
      filters: status?.map(item => ({ text: item.title, value: item.id })),
      render: (status: any) => (
        <LeadStatus status={status?.title} color={status?.color} />
      ),
    },
    {
      title: 'Client Type',
      dataIndex: 'client_type',
      key: 'client_type',
      width: 150,
      sorter: true,
      filters: ClientTypeFilters,
      render: (status: any) => (
        <LeadStatus status={wordToUpperCase(...status)} color={'#1976d2'} />
      ),
    },
    {
      title: 'Comments',
      dataIndex: 'comments_list',
      key: 'comments_list',
      width: 200,
      sorter: true,
      render: (comments_list: any) => (
        <CommentPopover
          title='Last Comment'
          onOpen={() => handleOpenCommentsList(comments_list)}
          comments_list={comments_list}
        />
      ),
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      width: 150,
      sorter: true,
      filterDropdown: (props: FilterDropdownProps) => (
        <RangePickerFilter {...props} />
      ),
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
      width: 150,
      sorter: true,
      filterDropdown: (props: FilterDropdownProps) => (
        <SearchFilter title={'Source'} {...props} />
      ),
    },

    {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      filterDropdown: props => <DateRangeFilter {...props} />,
      render: (data: number) =>
        data ? moment(data).format('DD/MM/YYYY HH:mm') : '-',
    },
    {
      title: 'Updated at',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 150,
      sorter: true,
      filterDropdown: props => <DateRangeFilter {...props} />,
      render: (data: number) =>
        data ? moment(data).format('DD/MM/YYYY HH:mm') : '-',
    },
    {
      title: 'Created by',
      dataIndex: 'created_by',
      key: 'created_by',
      width: 150,
      sorter: true,
      filters: users?.map(item => ({ text: item.full_name, value: item.id })),
      render: (user: number) => (user ? user : ''),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: 150,
      render: (value, record) => <TableActions {...tableActionProps(record)} />,
    },
  ]

  return (
    <>
      <Spin spinning={loading}>
        <ControlsButton {...controlsActionProps(leads)} />
        <Wrapper>
          <Table
            onRow={onRow}
            rowSelection={rowSelection}
            dataSource={leads}
            columns={columns}
            onChange={handleTableChange}
          />
          <MessagesDrawer
            comments={comments}
            open={openComments}
            onClose={handleCloseCommentsList}
          />
          <CreateLead
            onClose={onCloseLeadForm}
            open={openLead}
            onSave={onSave}
          />
        </Wrapper>
      </Spin>
    </>
  )
}

const Wrapper = styled.div``
const CopyWrapper = styled.div`
  & .ant-typography {
    color: ${({ theme }) => theme.colors.text} !important;
    margin-bottom: 0;
  }
`

const Flag = styled.div`
  margin: 0;
  font-size: 24px;
`
