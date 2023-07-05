import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { LeadStatusForm } from './components/LeadStatusForm'
import { P } from 'molecules/P/P'
import { Add } from '@mui/icons-material'
import { notification } from 'components/Notification/Notification'
import { getStatus, deleteStatus, postStatus, putStatus } from 'api/LeadStatus'
import moment from 'moment-timezone'

const initialState = {
  color: '#626ed4',
  title: '',
  default_status: false,
  order: 1,
}

export const LeadStatus = () => {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState(initialState)
  const [status, setStatus] = useState([])

  const fetchStatusList = async () => {
    try {
      const res = await getStatus()
      setStatus(res.data)
    } catch (error) {
      notification('error', error.message)
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setState(prev => ({ ...prev, [name]: value }))
  }

  const handleCancel = () => {
    setOpen(false)
    setState(initialState)
  }

  const handleAddStatus = () => {
    setOpen(true)
    setState(initialState)
  }

  const handleUpdateStatus = statusObj => {
    if (statusObj?.default_status) {
      return notification('error', 'You can not change default lead status! ')
    }
    setOpen(true)
    setState(statusObj)
  }

  const onSave = async () => {
    try {
      if (!state?.id) {
        await postStatus(state)
      }
      if (state?.id) {
        await putStatus(state.id, state)
      }
      await fetchStatusList()
      setOpen(false)
      setState(initialState)
    } catch (error) {
      notification('error', error.message)
    }
  }

  const onDelete = async (id: string) => {
    try {
      await deleteStatus(id)
      await fetchStatusList()
      setOpen(false)
      setState(initialState)
    } catch (error) {
      notification('error', error.message)
    }
  }

  useEffect(() => {
    fetchStatusList()
  }, [])

  return (
    <Wrapper>
      <StatusWrapper>
        {status.map((item, idx) => (
          <Status onClick={() => handleUpdateStatus(item)} key={idx}>
            <ColorBlock
              style={{
                backgroundColor: item?.color,
              }}
            ></ColorBlock>
            <P>{item?.title}</P>
            <P
              style={{
                fontSize: '10px',
                opacity: '0.5',
              }}
            >{`Created at ${moment(item.created_at).format(
              'DD/MM/YYYY HH:mm',
            )}`}</P>
          </Status>
        ))}
        <Status onClick={handleAddStatus}>
          <Add />
          <P>Add new</P>
        </Status>
      </StatusWrapper>

      <LeadStatusForm
        open={open}
        onClose={handleCancel}
        onChange={handleChange}
        state={state}
        onSave={onSave}
        onDelete={onDelete}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div``

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`

const Status = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: ${({ theme }) => `1px dashed ${theme.colors.text}`};
  border-radius: 6px;
  cursor: pointer;
`
const ColorBlock = styled.div`
  width: 30px;
  height: 30px;
  borderradius: 6px;
`
