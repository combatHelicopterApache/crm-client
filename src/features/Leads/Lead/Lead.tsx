import React, { useState } from 'react'
import styled from 'styled-components'
import { Tabs, Tab } from '@mui/material'
import { P } from 'molecules/P/P'
import { Personal } from './components/Personal/Personal'
import { Accounts } from './components/Accounts/Accounts'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
  title: string
}

export const Lead = () => {
  // const { id } = useParams<{ id: string }>()

  // const [loading, setLoading] = useState(false)
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  // useEffect(() => {
  //   const fetchLeadInfo = async () => {
  //     try {
  //       setLoading(true)
  //       const res = await getLeadById(id)
  //       setLead(res.data)
  //     } catch (error) {
  //       notification('error', error?.mesaage || 'Something went wrong!')
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   if (id) fetchLeadInfo()
  // }, [id])

  return (
    <Wrapper>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label='simple tabs example'
      >
        <Tab label='Personal' {...a11yProps(0)} />
        <Tab label='Accounts' {...a11yProps(1)} />
        <Tab label='Deposits' {...a11yProps(2)} />
        <Tab label='Withdrawals' {...a11yProps(3)} />
        <Tab label='Tasks' {...a11yProps(4)} />
        <Tab label='Log In Log' {...a11yProps(5)} />
        <Tab label='Activity' {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} title='Personal' index={0}>
        <Personal />
      </TabPanel>
      <TabPanel value={value} title='Accounts' index={1}>
        <Accounts />
      </TabPanel>
      <TabPanel value={value} title='Deposits' index={2}>
        Deposits
      </TabPanel>
      <TabPanel value={value} title='Withdrawals' index={3}>
        Withdrawals
      </TabPanel>
      <TabPanel value={value} title='Tasks' index={4}>
        Tasks
      </TabPanel>
      <TabPanel value={value} title='Log In Log' index={5}>
        Log In Log
      </TabPanel>
      <TabPanel value={value} title='Activity' index={6}>
        Activity
      </TabPanel>
    </Wrapper>
  )
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, title, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Content>
          {/* <P>{title}</P> */}
          {children}
        </Content>
      )}
    </div>
  )
}

const Wrapper = styled.div`
  & .css-1h9z7r5-MuiButtonBase-root-MuiTab-root:not(.Mui-selected) {
    color: ${({ theme }) => theme.colors.text} !important;
  }
`

const Content = styled.div`
  padding: 20px;
`
