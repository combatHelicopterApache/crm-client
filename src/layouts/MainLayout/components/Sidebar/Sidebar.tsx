import React from 'react'

import { NavLink } from 'react-router-dom'
import Logo from '../Logo/Logo'

import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  ProjectOutlined,
  BranchesOutlined,
  DollarOutlined,
  CalendarOutlined,
  SettingOutlined,
  ApartmentOutlined,
} from '@ant-design/icons'

import { RoutesPath } from 'routes/types'

import { useAppSelector } from 'store/store'
import styled from 'styled-components'

const Sidebar = () => {
  const isOpen = useAppSelector(state => state.ui.isOpen)

  return (
    <Wrapper className={isOpen ? 'close' : ''}>
      <Logo />
      <nav className='list'>
        <li key='1'>
          <NavLink
            to={RoutesPath.HOME_ROUTE}
            className={navData => (navData.isActive ? 'active' : 'none')}
          >
            <DashboardOutlined />
            <p>Dashboard</p>
          </NavLink>
        </li>
        <li key='2'>
          <NavLink
            to={RoutesPath.LEADS_ROUTE}
            className={navData => (navData.isActive ? 'active' : 'none')}
          >
            <UsergroupAddOutlined />
            <p>Leads</p>
          </NavLink>
        </li>
        <li key='3'>
          <NavLink
            to={RoutesPath.AFFILIATES_ROUTE}
            className={navData => (navData.isActive ? 'active' : 'none')}
          >
            <BranchesOutlined />
            <p>Affiliates</p>
          </NavLink>
        </li>
        <li key='4'>
          <NavLink
            to={RoutesPath.DEPOSITS_ROUTE}
            className={navData => (navData.isActive ? 'active' : 'none')}
          >
            <DollarOutlined />
            <p>Deposits</p>
          </NavLink>
        </li>
        <li key='5'>
          <NavLink
            to={RoutesPath.CALENDAR_ROUTE}
            className={navData => (navData.isActive ? 'active' : 'none')}
          >
            <CalendarOutlined />
            <p>Calendar</p>
          </NavLink>
        </li>
        <li key='6'>
          <NavLink
            to={RoutesPath.GROUPS_ROUTE}
            className={navData => (navData.isActive ? 'active' : 'none')}
          >
            <TeamOutlined />
            <p>Groups</p>
          </NavLink>
        </li>
        <li key='7'>
          <NavLink
            to={RoutesPath.USERS_ROUTE}
            className={navData => (navData.isActive ? 'active' : 'none')}
          >
            <UserOutlined />
            <p>Users</p>
          </NavLink>
        </li>
        <li key='8'>
          <NavLink
            to={RoutesPath.ANALYTICS_ROUTE}
            className={navData => (navData.isActive ? 'active' : 'none')}
          >
            <ProjectOutlined />
            <p>Analytics</p>
          </NavLink>
        </li>
        <li key='9'>
          <NavLink
            to={RoutesPath.BRANDS_ROUTE}
            className={navData => (navData.isActive ? 'active' : 'none')}
          >
            <ApartmentOutlined />
            <p>Brands</p>
          </NavLink>
        </li>
        <li key='10'>
          <NavLink
            to={RoutesPath.SETTINGS_ROUTE}
            className={navData => (navData.isActive ? 'active' : 'none')}
          >
            <SettingOutlined />
            <p>Settings</p>
          </NavLink>
        </li>
      </nav>
    </Wrapper>
  )
}

export default Sidebar

interface IStyleProps {
  isOpen: boolean
}

const Wrapper = styled.div<IStyleProps>`
  background-color: ${({theme}) => theme.colors.secondary};
  min-width: 180px;
  max-width: 300px;
  width: 300px;
  height: 100vh;
  display: flex;
  flex-direction: column;

  &.close {
    min-width: auto;
    width: auto;
  }

  &.close .list li a > p {
    display: none;
  }

  & .list {
    //padding: 1rem;
    overflow-y: auto;
  }

  & .list li a {
    color: ${({theme}) => theme.colors.text};
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
    border-bottom: 1px solid #181818;
    font-size: 0.8rem;
  }

  //& .list li a.active {
  //  color: #345dff;
  //}

  & .list li:has(> a.active) {
    background-color: #5385f9;
  }

  & .list li a span > svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  & .list li a p {
    font-size: .8rem;
    margin-left: 1rem;
    margin-bottom: 0rem;
  }
`
