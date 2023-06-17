import { H2 } from 'molecules/H2/H2'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  site_logo: string
  site_name: string
  site_domains: string[]
  id: string
}

export const PlatformCard = ({
  site_logo,
  site_name,
  site_domains,
  id,
}: IProps) => {
  return (
    <Wrapper>
      <H2>{site_name}</H2>
      <img src={site_logo} width={50} alt='site_logo' />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`
