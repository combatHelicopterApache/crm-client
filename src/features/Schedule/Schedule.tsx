import React, { useRef, useState } from 'react'
import { Scheduler } from '@aldabil/react-scheduler'
import { Button, Typography } from '@mui/material'
import styled from 'styled-components'

import { SchedulerRef } from '@aldabil/react-scheduler/types'

import PersonRoundedIcon from '@mui/icons-material/PersonRounded'

export const EVENTS = [
  {
    event_id: 1,
    title: 'Event 1',
    start: new Date(new Date(new Date().setHours(9)).setMinutes(30)),
    end: new Date(new Date(new Date().setHours(10)).setMinutes(30)),
    admin_id: 1,
  },
  {
    event_id: 2,
    title: 'Event 2',
    start: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
    admin_id: 2,
  },
  {
    event_id: 3,
    title: 'Event 3',
    start: new Date(
      new Date(new Date(new Date().setHours(9)).setMinutes(0)).setDate(
        new Date().getDate() - 1,
      ),
    ),
    end: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    admin_id: 1,
  },
  {
    event_id: 4,
    title: 'Event 4',
    start: new Date(
      new Date(new Date(new Date().setHours(9)).setMinutes(0)).setDate(
        new Date().getDate() - 2,
      ),
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(10)).setMinutes(0)).setDate(
        new Date().getDate() - 2,
      ),
    ),
    admin_id: 2,
  },
  {
    event_id: 5,
    title: 'Event 5',
    start: new Date(
      new Date(new Date(new Date().setHours(10)).setMinutes(0)).setDate(
        new Date().getDate() - 2,
      ),
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(11)).setMinutes(0)).setDate(
        new Date().getDate() + 10,
      ),
    ),
    admin_id: 4,
  },
  {
    event_id: 6,
    title: 'Event 6',
    start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
    admin_id: 2,
  },
  {
    event_id: 7,
    title: 'Event 7',
    start: new Date(
      new Date(new Date(new Date().setHours(11)).setMinutes(0)).setDate(
        new Date().getDate() - 1,
      ),
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(12)).setMinutes(0)).setDate(
        new Date().getDate() - 1,
      ),
    ),
    admin_id: 3,
  },
  {
    event_id: 8,
    title: 'Event 8',
    start: new Date(
      new Date(new Date(new Date().setHours(13)).setMinutes(0)).setDate(
        new Date().getDate() - 1,
      ),
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(14)).setMinutes(0)).setDate(
        new Date().getDate() - 1,
      ),
    ),
    admin_id: 4,
  },
  {
    event_id: 9,
    title: 'Event 11',
    start: new Date(
      new Date(new Date(new Date().setHours(13)).setMinutes(0)).setDate(
        new Date().getDate() + 1,
      ),
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(15)).setMinutes(30)).setDate(
        new Date().getDate() + 1,
      ),
    ),
    admin_id: 1,
  },
  {
    event_id: 10,
    title: 'Event 9',
    start: new Date(
      new Date(new Date(new Date().setHours(15)).setMinutes(0)).setDate(
        new Date().getDate() + 1,
      ),
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(16)).setMinutes(30)).setDate(
        new Date().getDate() + 1,
      ),
    ),
    admin_id: 2,
  },
  {
    event_id: 11,
    title: 'Event 10',
    start: new Date(
      new Date(new Date(new Date().setHours(11)).setMinutes(0)).setDate(
        new Date().getDate() - 1,
      ),
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(15)).setMinutes(0)).setDate(
        new Date().getDate() - 1,
      ),
    ),
    admin_id: 1,
  },
]

export const RESOURCES = [
  {
    admin_id: 1,
    title: 'John',
    mobile: '555666777',
    avatar: 'https://picsum.photos/200/300',
    color: '#ab2d2d',
  },
  {
    admin_id: 2,
    title: 'Sarah',
    mobile: '545678354',
    avatar: 'https://picsum.photos/200/300',
    color: '#58ab2d',
  },
  {
    admin_id: 3,
    title: 'Joseph',
    mobile: '543678433',
    avatar: 'https://picsum.photos/200/300',
    color: '#a001a2',
  },
  {
    admin_id: 4,
    title: 'Mera',
    mobile: '507487620',
    avatar: 'https://picsum.photos/200/300',
    color: '#08c5bd',
  },
]

export const Schedule = () => {
  const [mode, setMode] = useState<'default' | 'tabs'>('default')
  const calendarRef = useRef<SchedulerRef>(null)
  return (
    <Wrapper>
      <div style={{ textAlign: 'end' }}>
        <Button
          color={mode === 'default' ? 'primary' : 'inherit'}
          variant={mode === 'default' ? 'contained' : 'text'}
          size='small'
          onClick={() => {
            setMode('default')
            calendarRef.current?.scheduler?.handleState(
              'default',
              'resourceViewMode',
            )
          }}
        >
          Default
        </Button>
        <Button
          color={mode === 'tabs' ? 'primary' : 'inherit'}
          variant={mode === 'tabs' ? 'contained' : 'text'}
          size='small'
          onClick={() => {
            setMode('tabs')
            calendarRef.current?.scheduler?.handleState(
              'tabs',
              'resourceViewMode',
            )
          }}
        >
          Tabs
        </Button>
      </div>
      <Scheduler
        ref={calendarRef}
        events={EVENTS}
        resources={RESOURCES}
        day={{
          step: 10,
        }}
        resourceFields={{
          idField: 'admin_id',
          textField: 'title',
          subTextField: 'mobile',
          avatarField: 'title',
          colorField: 'color',
        }}
        fields={[
          {
            name: 'admin_id',
            type: 'select',
            default: RESOURCES[0].admin_id,
            options: RESOURCES.map(res => {
              return {
                id: res.admin_id,
                text: `${res.title} (${res.mobile})`,
                value: res.admin_id, //Should match "name" property
              }
            }),
            config: { label: 'Assignee', required: true },
          },
        ]}
        viewerExtraComponent={(fields, event) => {
          return (
            <div>
              {fields.map((field, i) => {
                if (field.name === 'admin_id') {
                  const admin = field.options.find(
                    fe => fe.id === event.admin_id,
                  )
                  return (
                    <Typography
                      key={i}
                      style={{ display: 'flex', alignItems: 'center' }}
                      color='textSecondary'
                      variant='caption'
                      noWrap
                    >
                      <PersonRoundedIcon /> {admin.text}
                    </Typography>
                  )
                } else {
                  return ''
                }
              })}
            </div>
          )
        }}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  & .rs__cell.rs__header {
    background-color: ${({ theme }) => theme.colors.background} !important;
    & .MuiTypography-body1 {
      color: ${({ theme }) => theme.colors.text} !important;
    }
  }
  & .rs__cell {
    background-color: ${({ theme }) => theme.colors.background} !important;
    & .MuiTypography-caption {
      color: ${({ theme }) => theme.colors.text} !important;
    }
  }
  & .css-konndc-MuiListItemText-root {
    background-color: ${({ theme }) => theme.colors.background} !important;
  }
  & p {
    color: ${({ theme }) => theme.colors.text} !important;
  }
  & span {
    color: ${({ theme }) => theme.colors.text} !important;
  }
  & .MuiTabs-scroller {
    background-color: ${({ theme }) => theme.colors.background} !important;
  }
  & .MuiTabScrollButton-root {
    background-color: ${({ theme }) => theme.colors.background} !important;
  }
  & .MuiTabs-root {
    background-color: ${({ theme }) => theme.colors.background} !important;
  }
`
