import React, { FC } from 'react'
import { Table, TableProps } from 'antd'
import styled from 'styled-components'
import { P } from 'molecules/P/P'

interface CustomTableProps<T> extends TableProps<T> {}

export const CustomTable: FC<CustomTableProps<any>> = ({
  columns,
  dataSource,
  ...rest
}) => {
  return (
    <TableWrapper>
      <Table
        dataSource={dataSource}
        columns={columns}
        className='headerHeight'
        style={{ height: '80vh' }}
        size={'small'}
        scroll={{ x: 1600, y: 'calc(100vh - 200px)' }}
        pagination={{
          position: ['bottomRight'],
          showSizeChanger: true,
          pageSizeOptions: ['25', '50', '100', '250', '500'],
          total: rest?.pagination?.total ?? 25,
          pageSize: 20,
          size: 'small',
          showTotal: (total, range) => (
            <P className='pagination'>{`${range[0]}-${range[1]} of ${total} items`}</P>
          ),
        }}
        rowKey='id'
        showSorterTooltip={false}
        {...rest}
      />
    </TableWrapper>
  )
}

export const ellipsisStyle = {
  style: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
}

const TableWrapper = styled.div`
  padding: 10px;
  .ant-table-body {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  /* & .ant-table-tbody {
    height: 100vh;
  } */

  & tr.ant-table-placeholder {
    background-color: ${({ theme }) => theme.colors.secondary} !important;
  }

  & .ant-select-selector {
    background-color: ${({ theme }) => theme.colors.secondary} !important;
  }
  & .ant-select-selection-item {
    color: ${({ theme }) => theme.colors.text} !important;
  }

  td.ant-table-cell {
    color: ${({ theme }) => theme.colors.text} !important;
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  & .ant-table-cell-row-hover {
    background-color: ${({ theme }) => theme.colors.secondary} !important;
  }
  & .ant-table-cell-scrollbar {
    background-color: ${({ theme }) => theme.colors.secondary} !important;
    border-bottom: ${({ theme }) =>
      `1px solid ${theme.colors.secondary}`} !important;
    box-shadow: ${({ theme }) =>
      `0 1px 0 1px ${theme.colors.secondary}`} !important;
  }
  & .ant-table-container {
    height: 78vh;
    background-color: ${({ theme }) => theme.colors.background} !important;
  }
  & .ant-table-body {
    height: 96%;
  }

  .ant-table-tbody > tr > td {
    transition: background 0.2s, border-color 0.2s;
    border-bottom: 1px solid transparent !important;
  }

  .ant-table-container::after {
    background-color: transparent !important;
  }

  .ant-table-pagination.ant-pagination {
    background-color: transparent !important;
  }

  .ant-pagination .ant-pagination-item-active {
    font-weight: 600;
    background-color: #0e0d0d;
    border-color: #9b9b9b;
  }

  .ant-pagination .ant-pagination-item a {
    color: #ffffff;
  }

  .headerHeight thead {
    background-color: #0e0d0d !important;
  }

  .headerHeight thead th {
    height: 20px;
    background-color: #0e0d0d !important;
    border-bottom: 1px solid rgba(119, 121, 157, 0.38) !important;
    vertical-align: middle;
    padding-top: 5px !important;
    padding-bottom: 5px !important;
    color: #f5f5f5 !important;
    font-size: 0.8rem !important;
  }

  .headerHeight thead th:before {
    background-color: rgba(119, 121, 157, 0.38) !important;
  }

  .headerHeight tbody tr:hover > td {
    background-color: black !important;
    color: #344fff;
  }

  .headerHeight .ant-pagination-item-link {
    color: #ffffff !important;
  }

  :where(.css-dev-only-do-not-override-15rg2km).ant-pagination
    .ant-pagination-item
    a {
    color: #ffffff !important;
  }

  & .pagination {
    color: white;
  }

  thead th.ant-table-cell {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & .ant-table-row-selected > td {
    background-color: ${({ theme }) => theme.colors.background} !important;
  }
  & .ant-table-filter-trigger:not(.active) svg {
    fill: ${({ theme }) => theme.colors.text} !important;
  }
  & .ant-table-column-sorter-up:not(.active) svg {
    fill: ${({ theme }) => theme.colors.text} !important;
  }
  & .ant-table-column-sorter-down:not(.active) svg {
    fill: ${({ theme }) => theme.colors.text} !important;
  }
`
