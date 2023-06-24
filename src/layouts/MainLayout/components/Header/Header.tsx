import React from 'react'
import LoggedUser from '../LoggedUser/LoggedUser'
import styled from 'styled-components'
import { Clock } from '../Clock/Clock'

const Header = () => {
  return (
    <Wrapper>
      <Clock />
      <LoggedUser />
    </Wrapper>
  )
}

export default Header

const Wrapper = styled.div`
  height: 55px;
  background-color: ${({ theme }) => theme.colors.secondary};
  width: 100%;
  display: flex;
  justify-content: flex-end;
  
  align-items: center;
  padding: 0rem 2rem;
  border-bottom: 1px solid #3d3c3c;
  gap: 20px;
`
