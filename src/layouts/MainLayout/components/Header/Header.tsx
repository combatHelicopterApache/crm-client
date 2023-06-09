import React from 'react'
import LoggedUser from '../LoggedUser/LoggedUser'
import styled from 'styled-components'

const Header = () => {
  return (
    <Wrapper>
      <LoggedUser />
    </Wrapper>
  )
}

export default Header

const Wrapper = styled.div`
  height: 80px;
  background-color: ${({ theme }) => theme.colors.secondary};
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0rem 2rem;
  border-bottom: 1px solid grey;
`
