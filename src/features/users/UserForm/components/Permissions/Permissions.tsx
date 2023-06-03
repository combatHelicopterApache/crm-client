import React from 'react'
import { Checkbox } from 'components/Checkbox/Checkbox'
import { modulesList } from 'features/Users/utils/const'
import styled from 'styled-components'
import { Span } from 'molecules/Span/Span'
import { H2 } from 'molecules/H2/H2'

export const Permissions = (): React.ReactNode => {
  return (
    <>
      <H2 style={{ marginBottom: '20px' }}>Permissions</H2>
      <Wrapper>
        {modulesList.map(module => (
          <Row key={module.name}>
            <Span>{module.label}</Span>
            <Checkbox name={module.name} />
          </Row>
        ))}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  padding: 20px;
`
const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  align-items: center;
  gap: 5px;
`
