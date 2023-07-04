import React, { FC } from 'react'
import styled from 'styled-components'
import { P } from 'molecules/P/P'

interface IProps {
  status: number
  color: string
}

export const LeadStatus: FC<IProps> = ({ status, color }) => {
  return (
    <Wrapper style={{ color: color, border: `1px solid ${color}` }}>
      <P style={{ color: color }}>{status}</P>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 2px 4px;
  text-align: center;
  border-radius: 5px;
`
