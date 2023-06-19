import { H2 } from 'molecules/H2/H2'
import React from 'react'
import styled from 'styled-components'
import { Tooltip, Empty } from 'antd'
import { Span } from 'molecules/Span/Span'

interface IProps {
  cfd_id: string
  cfd_logo: string
  cfd_name: string
  cfd_domain: string
}

export const PlatformCard = ({
  cfd_id,
  cfd_logo,
  cfd_name,
  cfd_domain,
}: IProps) => {
  return (
    <Wrapper key={cfd_id}>
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
