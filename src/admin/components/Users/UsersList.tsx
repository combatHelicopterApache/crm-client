import React from 'react'
import { CustomTable as Table } from 'components/Table/CustomTable'
import styled from 'styled-components'
import { CustomButton } from 'components/Button/CustomButton'
import { useNavigate } from 'react-router-dom'
import { AdminRoutesPath } from 'routes/types'

export const UsersList = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    return navigate(AdminRoutesPath.ADMIN_USER_CREATE_ROUTE)
  }
  return (
    <Wrapper>
      <CustomButton onClick={handleClick}>
        <span>Add User</span>
      </CustomButton>
      <Table dataSource={[]} columns={[]} />
    </Wrapper>
  )
}

const Wrapper = styled.div``
