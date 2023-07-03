import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import MainLayout from 'layouts/MainLayout/MainLayout'
import { authSelector } from 'features/Login/authSlice'
import { RoutesPath } from 'routes/types'
import styled from 'styled-components'
import { P } from 'molecules/P/P'

import { useAppSelector } from 'store/store'

const linkStyle = {
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '18px',
  letterSpacing: '0.01em',
  color: '#191919',
}

export const SettingsLayout = ({ children }: React.PropsWithChildren) => {
  const [current, setCurrent] = useState('Settings')
  const auth = useAppSelector(authSelector)

  const onClick = e => {
    setCurrent(e.key)
  }
  const items = [
    {
      label: 'Company info',
      to: `/settings${RoutesPath.SETTINGS_ROUTE_COMPANY}`,
      isAccess: true,
    },
    {
      label: 'Users',
      to: `/settings${RoutesPath.SETTINGS_ROUTE_USERS}`,
      isAccess: true,
    },
    {
      label: 'Offices',
      to: `/settings${RoutesPath.SETTINGS_ROUTE_OFFICES}`,
      isAccess: true,
    },
  ]

  useEffect(() => {
    document.title = `Settings - ${current}`
  }, [current])

  useEffect(() => {
    const initTab = items.find(item => item.to === window.location.pathname)
    setCurrent(initTab?.label)
  }, [])

  const Item = props => (
    <Link style={linkStyle} {...props}>
      <P>{props.label}</P>
    </Link>
  )

  return (
    <MainLayout>
      <HeadingWrapper>
        <Menu onClick={onClick} selectedKeys={[current]} mode='horizontal'>
          {items
            .filter(({ isAccess }) => isAccess)
            .map(item => (
              <Menu.Item className='settings-sub-menu' key={item.label}>
                <Item {...item} />
              </Menu.Item>
            ))}
        </Menu>
      </HeadingWrapper>

      <ContentWrapper>
        {/*{current && <Title> {current}</Title>}*/}
        {children}
      </ContentWrapper>
    </MainLayout>
  )
}

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text} !important;
  font-size: 20px;
  padding: 10px 0;
`
const HeadingWrapper = styled.div`
  //margin-top: -10px;
  & ul,
  .ant-menu-light {
    background-color: ${({ theme }) => theme.colors.secondary} !important;
  }
`
const ContentWrapper = styled.div`
  padding: 16px;
`
