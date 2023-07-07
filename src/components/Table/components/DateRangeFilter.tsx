import { useState, useEffect, useRef } from 'react'
import { DatePicker } from 'antd'
import MenuItem from '@mui/material/MenuItem'
import styled from 'styled-components'
import { Button, Select } from '@mui/material'
import { FilterDropdownProps } from 'antd/lib/table/interface'
import { Add, Cancel } from '@mui/icons-material'
import dayjs from 'dayjs'
import useOnClickOutside from 'hooks/useOnClickOutside'

const { RangePicker, MonthPicker, YearPicker } = DatePicker

const yearFormat = 'YYYY'
const dateFormat = 'DD/MM/YYYY'
const monthFormat = 'MMM, YYYY'
const Wrapper = styled.div`
  padding: 10px;
  background-color: white;
  min-width: 250px;
  & .ant-picker {
    width: 100%;
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
`

const InputWrapper = styled.div`
  margin-bottom: 10px;
`
const date = [
  {
    label: '1 day',
    start_date: dayjs().format('YYYY-MM-DD'),
    end_date: dayjs().format('YYYY-MM-DD'),
    type: 'day',
  },
  {
    label: '1 week',
    start_date: dayjs()
      .day(dayjs().day() - 6)
      .format('YYYY-MM-DD'),
    end_date: dayjs().format('YYYY-MM-DD'),
    type: 'range',
  },
  {
    label: 'Month to date',
    start_date: dayjs().startOf('month').format('YYYY-MM-DD'),
    end_date: dayjs().format('YYYY-MM-DD'),
    type: 'range',
  },
  {
    label: '1 month',
    start_date: dayjs().startOf('month').format('YYYY-MM-DD'),
    end_date: dayjs().format('YYYY-MM-DD'),
    type: 'month',
  },
  {
    label: '3 month',
    start_date: dayjs()
      .month(dayjs().month() - 3)
      .format('YYYY-MM-DD'),
    end_date: dayjs().format('YYYY-MM-DD'),
    type: 'range',
  },
  {
    label: '6 month',
    start_date: dayjs()
      .month(dayjs().month() - 6)
      .format('YYYY-MM-DD'),
    end_date: dayjs().format('YYYY-MM-DD'),
    type: 'range',
  },
  {
    label: 'Year to date',
    start_date: dayjs().startOf('year').format('YYYY-MM-DD'),
    end_date: dayjs().format('YYYY-MM-DD'),
    type: 'range',
  },
  {
    label: '1 year',
    start_date: dayjs().startOf('year').format('YYYY-MM-DD'),
    end_date: dayjs().endOf('year').format('YYYY-MM-DD'),
    type: 'year',
  },
  {
    label: 'Custom',
    start_date: dayjs()
      .day(dayjs().day() - 6)
      .format('YYYY-MM-DD'),
    end_date: dayjs().format('YYYY-MM-DD'),
    type: 'range',
  },
]
const defaultData = {
  label: 'Month to date',
  start_date: dayjs().startOf('month').format('YYYY-MM-DD'),
  end_date: dayjs().format('YYYY-MM-DD'),
  type: 'range',
}

type Label =
  | '1 month'
  | '1 day'
  | 'Month to date'
  | 'Custom'
  | '6 month'
  | '3 month'
  | '1 year'
  | 'Month to date'
  | 'Custom'
type Type = 'range' | 'month' | 'year' | 'day'
export interface IPeriod {
  label: Label
  start_date: Moment | string
  end_date: Moment | string
  type: Type
}

export const DateRangeFilter = (props: FilterDropdownProps) => {
  const [period, setPeriod] = useState<IPeriod>(defaultData)
  const ref = useRef()
  const heandleChangePicker = (
    data: IPeriod,
    dataArrString: [string, string],
  ) => {
    props.setSelectedKeys(dataArrString)
    setPeriod(data)
  }

  const heandleSubmit = () => {
    props.confirm()
  }
  const handleReset = async () => {
    await setPeriod(defaultData)
    await props.clearFilters?.()
    await props.confirm?.()
  }

  useEffect(() => {
    if (props.visible) {
      setPeriod(defaultData)
      props.setSelectedKeys([
        `${defaultData.start_date}|${defaultData.end_date}`,
      ])
    }
  }, [props.visible])

  return (
    <Wrapper ref={ref}>
      <InputWrapper>
        <Select
          className={'date-range-select'}
          style={{ width: '100%' }}
          value={period.label}
          name='select'
          size='small'
          error={undefined}
          inputProps={undefined}
        >
          {date.map((item, idx) => (
            <MenuItem
              className='select-item'
              onClick={() =>
                heandleChangePicker(item, [
                  `${item.start_date}|${item.end_date}`,
                ])
              }
              key={idx}
              value={item.label}
            >
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </InputWrapper>

      {period.type === 'day' && (
        <DatePicker
          defaultValue={dayjs()}
          value={period?.start_date ? dayjs(period?.start_date) : dayjs()}
          onChange={(date, string) =>
            heandleChangePicker(
              {
                start_date: dayjs(date).format(dateFormat),
                end_date: dayjs(date).format(dateFormat),
                type: period.type,
                label: period.label,
              },
              [`${string}|${string}`],
            )
          }
          format={dateFormat}
          allowClear={false}
        />
      )}
      {period.type === 'month' && (
        <MonthPicker
          defaultValue={dayjs()}
          value={period?.start_date ? dayjs(period?.start_date) : dayjs()}
          onChange={date =>
            heandleChangePicker(
              {
                start_date: dayjs(date).startOf('month').format(dateFormat),
                end_date: dayjs(date).endOf('month').format(dateFormat),
                type: period.type,
                label: period.label,
              },
              [
                `${dayjs(date).startOf('month').dayjs(dateFormat)}|${dayjs(date)
                  .endOf('month')
                  .format(dateFormat)}`,
              ],
            )
          }
          format={monthFormat}
          allowClear={false}
        />
      )}
      {period.type === 'year' && (
        <YearPicker
          defaultValue={
            period?.start_date ? dayjs(period?.start_date) : dayjs()
          }
          onChange={(date, string) => {
            heandleChangePicker(
              {
                start_date: dayjs(string).startOf('year').format(dateFormat),
                end_date: dayjs(string).endOf('year').format(dateFormat),
                type: period.type,
                label: period.label,
              },

              [
                `${dayjs(string).startOf('year').format(dateFormat)}|${dayjs(
                  string,
                )
                  .endOf('year')
                  .format(dateFormat)}`,
              ],
            )
          }}
          value={period?.start_date ? dayjs(period?.start_date) : dayjs()}
          format={yearFormat}
          allowClear={false}
        />
      )}
      {period.type === 'range' && (
        <RangePicker
          defaultValue={[dayjs(period?.start_date), dayjs(period?.end_date)]}
          onChange={(date, string) =>
            heandleChangePicker(
              {
                start_date: string[0],
                end_date: string[1],
                type: period.type,
                label: period.label,
              },
              [`${string[0]}|${string[1]}`],
            )
          }
          format={dateFormat}
          allowClear={false}
          value={[dayjs(period?.start_date), dayjs(period?.end_date)]}
        />
      )}

      <ButtonWrapper>
        <Button startIcon={<Add />} onClick={handleReset}>
          Close
        </Button>
        <Button startIcon={<Cancel />} onClick={heandleSubmit}>
          Ok
        </Button>
      </ButtonWrapper>
    </Wrapper>
  )
}
