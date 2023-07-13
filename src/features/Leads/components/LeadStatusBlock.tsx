import React, { FC, useState, useEffect } from 'react'
import { getLeadStatusById } from 'api/Status'
import styled from 'styled-components'
import { notification } from 'components/Notification/Notification'
import { Spin } from 'antd'
import { Avatar } from 'components/Avatar/Avatar'
import { LeadStatus } from './LeadStatus'
import { KeyboardBackspace } from '@mui/icons-material'
import moment from 'moment-timezone'

interface IProps {
  leadId: string
}
interface ILogs {
  creator: {
    full_name: string
    title: string
    role_id: number
    user_avatar: string
  }
  curr_status_color: string
  curr_status_id: string
  curr_status_title: string
  description: string
  prev_status_color: string
  prev_status_id: string
  prev_status_title: string
  created_at: string
}

const format = 'DD/MM/YYYY HH:mm a'

const StatusCard = ({ item }: { item: ILogs }) => {
  const clientName = item?.creator?.full_name || 'User'
  return (
    <Row>
      <AvatarWrapper>
        <Avatar
          pictureURL={item?.creator.user_avatar}
          color={'#626ed4'}
          title={clientName}
          size={26}
        >
          {clientName}
        </Avatar>
      </AvatarWrapper>
      <StatusWrapper>
        <Title>
          {clientName}
          {!!item?.prev_status_title
            ? ' changed the Status '
            : ' created lead  '}
        </Title>
        <Statuses>
          {!!item?.prev_status_title && (
            <LeadStatus
              status={item.prev_status_title}
              color={item.prev_status_color}
            />
          )}
          {!!item.prev_status_title && (
            <KeyboardBackspace
              style={{ transform: 'rotate(180deg)', color: 'white' }}
            />
          )}
          <LeadStatus
            status={item.curr_status_title}
            color={item.curr_status_color}
          />
        </Statuses>
        {!!item?.description && (
          <TitleCreated style={{ wordBreak: 'break-all' }}>
            {item?.description}
          </TitleCreated>
        )}

        <TitleCreated>
          {`${!!item?.prev_status_id ? 'Updated at' : 'Created at'} ${moment(
            item.created_at,
          ).format(format)} by   `}{' '}
          <Links>{clientName}</Links>
        </TitleCreated>
      </StatusWrapper>
    </Row>
  )
}

export const LeadStatusBlock: FC<IProps> = ({ leadId }) => {
  const [status, setStatus] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchStatusList = async () => {
      try {
        setLoading(true)
        const res = await getLeadStatusById(leadId)
        setStatus(res.data)
      } catch (error) {
        notification('error', error.message)
      } finally {
        setLoading(false)
      }
    }

    if (leadId) fetchStatusList()
  }, [leadId])

  return (
    <Spin spinning={loading}>
      <Wrapper>
        {status?.map((item, idx) => (
          <StatusCard item={item} key={idx} />
        ))}
      </Wrapper>
    </Spin>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Row = styled.div`
  display: flex;
  gap: 6px;
  padding: 10px;
`

const AvatarWrapper = styled.div`
  width: 50px;
  display: flex;
  align-items: start;
  gap: 6px;
`
const TitleCreated = styled.p`
  color: ${({ theme }) => theme.colors.text} !important;
  font-size: 12px;
`
const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: baseline;
  gap: 4px;
`

const Links = styled.span`
  text-decoration: none;
`
const Statuses = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: start;
`
const Title = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text} !important;
`
