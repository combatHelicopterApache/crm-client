import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import { getLeadById } from 'api/Leads'
import { notification } from 'components/Notification/Notification'
import styled from 'styled-components'
import { P } from 'molecules/P/P'

export const Lead = () => {
  const { id } = useParams<{ id: string }>()
  const [lead, setLead] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchLeadInfo = async () => {
      try {
        setLoading(true)
        const res = await getLeadById(id)
        setLead(res.data)
      } catch (error) {
        notification('error', error?.mesaage || 'Something went wrong!')
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchLeadInfo()
  }, [id])

  console.log(lead)

  return (
    <Wrapper>
      <Spin spinning={loading}>
        <P>{lead?.first_name}</P>
      </Spin>
    </Wrapper>
  )
}

const Wrapper = styled.div``
