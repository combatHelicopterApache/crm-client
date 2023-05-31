import React from 'react'
import s from './Sidebar.module.css'
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
} from '@ant-design/icons'

import { RoutesPath } from 'routes/types'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  const isOpen = useSelector(state => state.MenuToggle.isOpen)

  return (
    <div className={isOpen ? s.container + ' ' + s.close : s.container}>
      <Logo />
      <nav className={s.list}>
        <li key='1'>
          <NavLink
            to={RoutesPath.HOME_ROUTE}
            className={navData => (navData.isActive ? s.active : 'none')}
          >
            <DashboardOutlined />
            <p>Dashboard</p>
          </NavLink>
        </li>
        <li key='2'>
          <NavLink
            to={RoutesPath.LEADS_ROUTE}
            className={navData => (navData.isActive ? s.active : 'none')}
          >
            <UsergroupAddOutlined />
            <p>Leads</p>
          </NavLink>
        </li>
        <li key='3'>
          <NavLink
            to={RoutesPath.AFFILIATES_ROUTE}
            className={navData => (navData.isActive ? s.active : 'none')}
          >
            <BranchesOutlined />
            <p>Affiliates</p>
          </NavLink>
        </li>
        <li key='4'>
          <NavLink
            to={RoutesPath.DEPOSITS_ROUTE}
            className={navData => (navData.isActive ? s.active : 'none')}
          >
            <DollarOutlined />
            <p>Deposits</p>
          </NavLink>
        </li>
        <li key='5'>
          <NavLink
            to={RoutesPath.CALENDAR_ROUTE}
            className={navData => (navData.isActive ? s.active : 'none')}
          >
            <CalendarOutlined />
            <p>Calendar</p>
          </NavLink>
        </li>
        <li key='7'>
          <NavLink
            to={RoutesPath.GROUPS_ROUTE}
            className={navData => (navData.isActive ? s.active : 'none')}
          >
            <TeamOutlined />
            <p>Groups</p>
          </NavLink>
        </li>
        <li key='8'>
          <NavLink
            to={RoutesPath.USERS_ROUTE}
            className={navData => (navData.isActive ? s.active : 'none')}
          >
            <UserOutlined />
            <p>Users</p>
          </NavLink>
        </li>
        <li key='9'>
          <NavLink
            to={RoutesPath.ANALYTICS_ROUTE}
            className={navData => (navData.isActive ? s.active : 'none')}
          >
            <ProjectOutlined />
            <p>Analytics</p>
          </NavLink>
        </li>
        <li key='6'>
          <NavLink
            to={RoutesPath.SETTINGS_ROUTE}
            className={navData => (navData.isActive ? s.active : 'none')}
          >
            <SettingOutlined />
            <p>Settings</p>
          </NavLink>
        </li>
      </nav>
    </div>
  )
}

export default Sidebar
