import React, { FC, useState, useEffect } from 'react'
import { getLeadStatusById } from 'api/Status'
import styled from 'styled-components'
import { notification } from 'components/Notification/Notification'
import { Spin } from 'antd'

interface IProps {
  leadId: string
}

export const LeadStatusBlock: FC<IProps> = ({ leadId, statusList }) => {
  const [status, setStatus] = useState({})
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   const fetchStatusList = async () => {
  //     try {
  //       setLoading(true)
  //       const res = await getLeadStatusById(leadId)
  //       setStatus(res.data)
  //     } catch (error) {
  //       notification('error', error.message)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   if (leadId) fetchStatusList()
  // }, [leadId])

  return (
    <Wrapper>
      <Spin spinning={loading}></Spin>
    </Wrapper>
  )
}

const Wrapper = styled.div``
