import React, { FC } from 'react'
// import { Select as AntdSelect, SelectProps } from 'antd'
import styled from 'styled-components'
import { Select as MuiSelect, SelectProps } from '@mui/material'
import { Empty } from 'antd'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
// import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'

export const Select: FC<SelectProps> = props => {
  return (
    <Wrapper>
      <FormControl sx={{ width: '100%' }}>
        {props?.label && <InputLabel id='label'>{props?.label}</InputLabel>}
        <MuiSelect
          labelId='helper-label'
          id='helper-label'
          size='small'
          fullWidth
          {...props}
        >
          {!!props?.options?.length ? (
            props?.options?.map((item, idx) => (
              <MenuItem className='select-item' key={idx} value={item?.value}>
                {item?.label}
              </MenuItem>
            ))
          ) : (
            <Empty />
          )}
        </MuiSelect>
        {!!props?.error && <ErrorMessage>{props?.error}</ErrorMessage>}
      </FormControl>
    </Wrapper>
  )
}

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`

// const Label = styled.p`
//   color: ${({ theme }) => theme.colors.text};
//   color: ${({ theme }) => (theme.colors.text ? 'red' : 'blue')};
//   font-size: 12px;
//   margin-bottom: 3px;
//   margin-left: 3px;
// `

const Wrapper = styled.div`
  width: 100%;

  & #label,
  #helper-label {
    color: ${({ theme }) => theme.colors.text} !important;
    font-size: 13px;
  }
  & #label {
    top: -3px;
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: rgba(255, 255, 255, 0.3) !important;
    /* border-color: ${({ theme }) => theme.colors.text} !important; */
  }
  & .MuiSvgIcon-root {
    color: ${({ theme }) => theme.colors.text} !important;
  }
  & .ant-select-selector {
    background-color: ${({ theme }) => theme.colors.background} !important;
  }
  & .ant-select-selection-item {
    color: ${({ theme }) => theme.colors.text} !important;
  }
  & .ant-select-selection-placeholder {
    color: ${({ theme }) => theme.colors.text} !important;
  }
  & .ant-select-arrow {
    & svg {
      fill: ${({ theme }) => theme.colors.text} !important;
    }
  }
`
