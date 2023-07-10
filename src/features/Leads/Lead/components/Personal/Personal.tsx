import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getLeadById } from 'api/Leads'
import { notification } from 'components/Notification/Notification'
import { Spin, Tooltip } from 'antd'
import { Row } from 'components/UI/Row'
import { EditableBlock } from 'components/UI/EditableBlock'
import moment from 'moment-timezone'
import { CustomInput } from 'components/Input/CustomInput'
import { Select } from 'components/Select/Select'
import { H2 } from 'molecules/H2/H2'
import { Button, IconButton } from '@mui/material'
import {
  TelegramIcon,
  ViberIcon,
  WhatsAppIcon,
  SendEmailIcon,
  LoginIcon,
} from 'images/icons'
import { Add } from '@mui/icons-material'
import { Comments } from 'components/Comments/Comments'
import { useBrands } from 'hooks/useBrands'
import { useUsers } from 'hooks/useUsers'
import { useStatus } from 'hooks/useStatus'
import { LeadStatus } from 'features/Leads/components/LeadStatus'
import { countries, countryByCode } from 'utils/countryList'
import { renderCopyableText } from 'utils/renderCopyableText'
import { LeadStatusBlock } from 'features/Leads/components/LeadStatusBlock'

export const Personal = () => {
  const { id: leadId } = useParams<{ id: string }>()
  const { brands } = useBrands()
  const { users } = useUsers()
  const { status } = useStatus()
  const [lead, setLead] = useState({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchLead = async () => {
      setLoading(true)
      try {
        const res = await getLeadById(leadId)
        setLead(res.data)
      } catch (error) {
        notification('error', error?.message)
      } finally {
        setLoading(false)
      }
    }
    if (leadId) fetchLead()
  }, [leadId])

  const phoneNumber = '1234567890'

  const redirectToWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}`
    window.open(url, '_blank')
  }
  const redirectToViber = () => {
    const url = `https://viber.com/send?phone=${phoneNumber}`
    window.open(url, '_blank')
  }
  const redirectToTelegram = () => {
    const url = `https://t.me/share/url?url=&text=&phone=${phoneNumber}`
    window.open(url, '_blank')
  }

  const redirectToEmail = () => {
    const recipientEmail = 'example@example.com'
    const subject = encodeURIComponent('Email Subject')
    const body = encodeURIComponent('Email body')

    const url = `mailto:${recipientEmail}?subject=${subject}&body=${body}`
    window.open(url, '_blank')
  }

  return (
    <Spin spinning={loading}>
      <Container>
        <ContainerInner>
          <Wrapper>
            <H2>Personal Information</H2>
            <IconsWrapper>
              <Tooltip title='Send message to WhatsApp'>
                <IconButton onClick={redirectToWhatsApp}>
                  <WhatsAppIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Send message to Telegram'>
                <IconButton onClick={redirectToTelegram}>
                  <TelegramIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Send message to Viber'>
                <IconButton onClick={redirectToViber}>
                  <ViberIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Send message to Email'>
                <IconButton onClick={redirectToEmail}>
                  <SendEmailIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Login'>
                <IconButton>
                  <LoginIcon />
                </IconButton>
              </Tooltip>
            </IconsWrapper>
            <Row title='Lead ID'>
              <EditableBlock disabled value={renderCopyableText(lead?.uid)}>
                <CustomInput value={lead?.uid} />
              </EditableBlock>
            </Row>
            <Row title='First Name'>
              <EditableBlock value={lead?.first_name}>
                <CustomInput value={lead?.first_name} />
              </EditableBlock>
            </Row>
            <Row title='Last Name'>
              <EditableBlock value={lead?.last_name}>
                <CustomInput value={lead?.last_name} />
              </EditableBlock>
            </Row>
            <Row title='Country'>
              <EditableBlock
                value={
                  <p
                    style={{
                      display: 'flex',
                      gap: '10px',
                      margin: '0',
                      alignItems: 'center',
                    }}
                  >
                    <span>{lead?.geo}</span>
                    <img
                      style={{ width: '30px' }}
                      src={countryByCode[lead?.geo]?.image}
                      alt=''
                    />
                  </p>
                }
              >
                <Select
                  value={lead?.geo}
                  options={countries?.map(item => ({
                    value: item.code,
                    label: item.name,
                  }))}
                />
              </EditableBlock>
            </Row>
            <Row title='Email'>
              <EditableBlock value={lead?.email}>
                <CustomInput value={lead?.email} />
              </EditableBlock>
            </Row>
            <Row title='Phone'>
              <EditableBlock value={lead?.phone}>
                <CustomInput value={lead?.phone} />
              </EditableBlock>
            </Row>
            <Row title='Created at'>
              <EditableBlock
                disabled
                value={moment(lead?.created_at || moment()).format(
                  'MM/DD/YYYY HH:mm',
                )}
              >
                <CustomInput
                  value={moment(lead?.created_at || moment()).format(
                    'MM/DD/YYYY HH:mm',
                  )}
                />
              </EditableBlock>
            </Row>
            <Row title='Updated at'>
              <EditableBlock
                disabled
                value={moment(lead?.updated_at || moment()).format(
                  'MM/DD/YYYY HH:mm',
                )}
              >
                <CustomInput
                  value={moment(lead?.updated_at || moment()).format(
                    'MM/DD/YYYY HH:mm',
                  )}
                />
              </EditableBlock>
            </Row>
            <Row title='Created by'>
              <EditableBlock disabled value={lead?.created_by}>
                <CustomInput value={lead?.created_by} />
              </EditableBlock>
            </Row>
          </Wrapper>
          <Wrapper>
            <H2>Change Password</H2>
            <CustomInput type='password' fullWidth label='New Password' />
            <Button
              style={{
                margin: '10px 0',
              }}
              startIcon={<Add />}
            >
              Change Password
            </Button>
          </Wrapper>
          <Wrapper>
            <H2>Comments</H2>
            <Comments entityId={lead?.id} route={`comment/lead`} />
          </Wrapper>
        </ContainerInner>
        <ContainerInner>
          <Wrapper>
            <H2>Sales</H2>
            <Row title='Brand'>
              <EditableBlock
                value={brands?.find(item => item?.id === lead?.brand_id)?.title}
              >
                <Select
                  label='Brand'
                  options={brands?.map(item => ({
                    label: item.title,
                    value: item.id,
                  }))}
                  value={lead?.brand_id}
                />
              </EditableBlock>
            </Row>
            <Row title='Status'>
              <EditableBlock
                value={
                  <LeadStatus
                    status={lead?.status?.title}
                    color={lead?.status?.color}
                  />
                }
              >
                <Select
                  label='Status'
                  options={status?.map(item => ({
                    label: item.title,
                    value: item.id,
                  }))}
                  value={lead?.status_id}
                />
              </EditableBlock>
            </Row>
            <Row title='Assigned to'>
              <EditableBlock
                value={
                  users?.find(item => item?.id === lead?.assigned_to)?.full_name
                }
              >
                <Select
                  value={lead?.assigned_to}
                  size='small'
                  options={users?.map(item => ({
                    label: item.full_name,
                    value: item.id,
                  }))}
                />
              </EditableBlock>
            </Row>
            <Row title='Role'>
              <EditableBlock disabled value={'Lead'}>
                <CustomInput value={null} />
              </EditableBlock>
            </Row>
            <Row title='Source'>
              <EditableBlock disabled value={lead?.source}>
                <CustomInput value={lead?.source} />
              </EditableBlock>
            </Row>
            <Row title='Funnel Name'>
              <EditableBlock disabled value={lead?.funnel_name}>
                <CustomInput value={lead?.funnel_name} />
              </EditableBlock>
            </Row>
            <Row title='Affiliate Data'>
              <EditableBlock
                disabled
                value={moment(lead?.created_at).format('MM/DD/YYYY HH:mm')}
              >
                <CustomInput
                  value={moment(lead?.created_at).format('MM/DD/YYYY HH:mm')}
                />
              </EditableBlock>
            </Row>
            <Row title='Affiliate Name'>
              <EditableBlock disabled value={lead?.affiliate}>
                <CustomInput value={lead?.affiliate} />
              </EditableBlock>
            </Row>
          </Wrapper>
          <Wrapper>
            <H2>Events</H2>
            <Button
              style={{
                margin: '10px 0',
              }}
              startIcon={<Add />}
            >
              Add Event
            </Button>
          </Wrapper>
          <Wrapper>
            <H2>Status Logs</H2>
            <LeadStatusBlock
              statusList={lead?.status_log_list?.status_list}
              leadId={leadId}
            />
          </Wrapper>
        </ContainerInner>
      </Container>
    </Spin>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`
const ContainerInner = styled.div``
const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
`
const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
