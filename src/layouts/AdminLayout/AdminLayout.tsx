import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import styled from 'styled-components'

const AdminLayout = ({ children }) => {
  return (
    <Wrapper>
      <Sidebar />
      <div className='inside'>
        <Header />
        <div className='content'>{children}</div>
      </div>
    </Wrapper>
  )
}

export default AdminLayout

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #1d2125;
  height: 100vh;
  width: 100%;
  & .inside {
    width: 100%;
    overflow-x: auto;
  }

  & .content {
    padding: 1.4rem;
  }
`
