import React, { FC } from 'react'
import { Table, TableProps } from 'antd'
import styled from 'styled-components'

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
        rowKey={groups => groups.id}
        className='headerHeight'
        scroll={{ x: 1600, y: 'calc(100vh - 200px)' }}
        pagination={{
          position: ['bottomRight'],
          showSizeChanger: true,
          pageSizeOptions: ['25', '50', '100', '250', '500'],
          total: rest?.pagination?.total ?? 25,
          pageSize: 20,
          size: 'small',
          showTotal: (total, range) => (
            <p className='pagination'>{`${range[0]}-${range[1]} of ${total} items`}</p>
          ),
        }}
        rowKey='id'
        showSorterTooltip={false}
        {...rest}
      />
    </TableWrapper>
  )
}

const TableWrapper = styled.div`
  padding: 10px 0;
  .ant-table-body {
    background-color: #0e0d0d !important;
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
  .dark {
    background-color: #0e0d0d;
    color: white;
  }

  .light {
    background-color: #1f1f1f;
    color: white;
  }

  .light td,
  .dark td {
    padding: 5px 16px !important;
    font-size: 0.8rem !important;
    border-bottom: 1px solid rgba(119, 121, 157, 0.38) !important;
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
`
