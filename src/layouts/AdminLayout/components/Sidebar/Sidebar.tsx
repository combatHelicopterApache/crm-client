import React from 'react'
import s from './Sidebar.module.css'
import { NavLink } from 'react-router-dom'
import Logo from '../Logo/Logo'

import {
  TeamOutlined,
  ProjectOutlined,
  BranchesOutlined,
} from '@ant-design/icons'

import { AdminRoutesPath } from 'routes/types'
import { useAppSelector } from 'store/store'

const Sidebar = () => {
  const isOpen = useAppSelector(state => state.ui.isOpen)

  return (
    <div className={isOpen ? s.container + ' ' + s.close : s.container}>
      <Logo />
      <nav className={s.list}>
        <li key='1'>
          <NavLink
            to={AdminRoutesPath.ADMIN_COMPANIES_ROUTE}
            className={navData => (navData.isActive ? s.active : 'none')}
          >
            <ProjectOutlined />
            <p>Companies</p>
          </NavLink>
        </li>
        <li key='2'>
          <NavLink
            to={AdminRoutesPath.ADMIN_USERS_ROUTE}
            className={navData => (navData.isActive ? s.active : 'none')}
          >
            <TeamOutlined />
            <p>Users</p>
          </NavLink>
        </li>
        <li key='3'>
          <NavLink
            to={AdminRoutesPath.ADMIN_BRANDS_ROUTE}
            className={navData => (navData.isActive ? s.active : 'none')}
          >
            <BranchesOutlined />
            <p>Brands</p>
          </NavLink>
        </li>
      </nav>
    </div>
  )
}

export default Sidebar
