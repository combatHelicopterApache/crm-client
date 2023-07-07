import { FilterDropdownProps } from 'antd/lib/table/interface'

import { Button } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import { CustomInput } from 'components/Input/CustomInput'
import { Search, Cancel } from '@mui/icons-material'

const Wrapper = styled.div`
  padding: 10px;
  width: 250px;

  hr {
    margin-bottom: 0;
  }
`

const Row = styled.div`
  display: flex;
  gap: 10px;
`
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`

export const RangePickerFilter: React.FC<FilterDropdownProps> = ({
  clearFilters,
  confirm,
  selectedKeys,
  setSelectedKeys,
}) => {
  const [fromDefault = '', toDefault = ''] = selectedKeys?.join('')?.split('|')
  const [range, setRange] = useState({
    from: fromDefault,
    to: toDefault,
  })
  const handleSearch = () => {
    setSelectedKeys([`${range.from}|${range.to}`])
    confirm?.()
  }
  const handleReset = () => {
    setRange({ from: '', to: '' })
    clearFilters?.()
    confirm?.()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setRange(prev => ({ ...prev, [name]: value || '' }))
  }

  return (
    <Wrapper>
      <Row>
        <CustomInput
          label='From'
          value={range.from}
          name='from'
          onChange={handleChange}
        />
        <CustomInput
          label='To'
          value={range.to}
          name='to'
          onChange={handleChange}
        />
      </Row>
      <hr />
      <Buttons>
        <Button startIcon={<Cancel />} onClick={handleReset}>
          Reset
        </Button>
        <Button
          startIcon={<Search />}
          onClick={handleSearch}
          disabled={!range.from.length && !range.to.length}
        >
          Search
        </Button>
      </Buttons>
    </Wrapper>
  )
}
