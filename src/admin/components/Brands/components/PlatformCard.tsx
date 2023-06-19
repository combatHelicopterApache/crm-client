import { H2 } from 'molecules/H2/H2'
import React from 'react'
import styled from 'styled-components'
import { Tooltip, Empty } from 'antd'
import { Span } from 'molecules/Span/Span'
import { Delete } from '@mui/icons-material'

interface IProps {
  cfd_id: string
  cfd_logo: string
  cfd_name: string
  cfd_domain: string
  onDelete: (id: string) => void
}

export const PlatformCard = ({
  cfd_id,
  cfd_logo,
  cfd_name,
  cfd_domain,
  onDelete,
}: IProps) => {
  return (
    <Wrapper key={cfd_id}>
      <IconWrapper onClick={() => onDelete(cfd_id)}>
        <Tooltip title='Delete this platform'>
          <Delete />
        </Tooltip>
      </IconWrapper>

      <H2>{cfd_name}</H2>
      {cfd_logo ? (
        <img src={cfd_logo} width={50} alt='site_logo' />
      ) : (
        Empty.PRESENTED_IMAGE_SIMPLE
      )}

      <Tooltip title={cfd_domain}>
        <Span>{cfd_domain}</Span>
      </Tooltip>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  height: 250px;
  width: 250px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  & img {
    width: 100px;
    display: block;
    height: auto;
    border-radius: 4px;
    border: 1px dashed ${({ theme }) => theme.colors.text};
  }
`
const IconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  & svg {
    color: ${({ theme }) => theme.colors.text};
  }
`
