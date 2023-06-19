import { H2 } from 'molecules/H2/H2'
import React from 'react'
import styled from 'styled-components'
import { Tooltip, Empty } from 'antd'
import { Span } from 'molecules/Span/Span'
import { Delete } from '@mui/icons-material'

interface IProps {
  site_logo: string
  site_name: string
  site_domains: string[]
  id: string
  onDelete: (id: string) => void
}

export const SiteCard = ({
  site_logo,
  site_name,
  site_domains,
  id,
  onDelete,
}: IProps) => {
  return (
    <Wrapper key={id}>
      <IconWrapper onClick={() => onDelete(id)}>
        <Tooltip title='Delete this site'>
          <Delete />
        </Tooltip>
      </IconWrapper>
      <H2>{site_name}</H2>
      {site_logo ? (
        <img src={site_logo} width={50} alt='site_logo' />
      ) : (
        Empty.PRESENTED_IMAGE_SIMPLE
      )}

      <Tooltip
        title={site_domains?.map(d => (
          <Span style={{ display: 'block' }}>{d}</Span>
        ))}
      >
        <Span>{site_domains?.[0]}</Span>
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
