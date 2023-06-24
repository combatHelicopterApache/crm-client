import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { H2 } from 'molecules/H2/H2'

export const Clock = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const formatDate = date => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' }
    return date.toLocaleDateString('uk-UA', options)
  }

  return (
    <Wrapper>
      <H2>{formatDate(time)}</H2>
      <H2>{time.toLocaleTimeString()}</H2>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  & h2 {
    margin: 0;
  }
`
