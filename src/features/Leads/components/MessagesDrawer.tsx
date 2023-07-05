import React, { FC, useState, useEffect } from 'react'
import { Drawer } from 'components/Drawer/Drawer'
import styled from 'styled-components'
import { TextArea } from 'components/TextArea/TextArea'
import { getComments, postComments } from 'api/Comments'
import { notification } from 'components/Notification/Notification'
import { Spin, Empty } from 'antd'
import { P } from 'molecules/P/P'
import moment from 'moment-timezone'
import { Button as MiuButton } from '@mui/material'
import { Add } from '@mui/icons-material'

interface IComment {
  commentary_list: []
  elem_id: string
  id: string
  path: string
}

interface IProps {
  open: boolean
  onClose: () => void
  callback: () => void
  comments: IComment
}

const CommentUnit = ({ comment }: IComment) => {
  const {
    deleted_at,
    description,
    id,
    created_at,
    updated_at,
    user_id,
    user_name,
  } = comment
  return (
    <CommentWrapper>
      <P>{description}</P>
      <InfoBlock>
        {!!deleted_at ? (
          <P className='info'>{`Deleted at ${moment(
            deleted_at || moment(),
          ).format('MM/DD/YYYY HH:mm')} by ${user_name}`}</P>
        ) : (
          <P className='info'>{`Created at ${moment(
            created_at || moment(),
          ).format('MM/DD/YYYY HH:mm')} by ${user_name}`}</P>
        )}
      </InfoBlock>
    </CommentWrapper>
  )
}

export const MessagesDrawer: FC<IProps> = ({ onClose, open, comments }) => {
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    try {
      setLoading(true)
      const res = await postComments(comments.elem_id, comments.path, {
        description: value,
        attached_files: null,
      })
      setMessages(res.data)
      setValue('')
    } catch (error) {
      notification('error', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchCommentsList = async () => {
      setLoading(true)
      try {
        const res = await getComments(comments.elem_id, comments.path)
        setMessages(res.data)
      } catch (error) {
        notification('error', error.message)
      } finally {
        setLoading(false)
      }
    }
    if ((comments?.elem_id, comments?.path)) fetchCommentsList()
  }, [comments])

  return (
    <Spin spinning={loading}>
      <Drawer title='Comments' open={open} onClose={onClose}>
        <Wrapper>
          <CommentsList>
            {!!messages?.comments?.length ? (
              messages?.comments?.map((item, idx) => (
                <CommentUnit key={idx} comment={item} />
              ))
            ) : (
              <Empty description='No comment yet' />
            )}
          </CommentsList>
          <InputWrapper>
            <TextArea
              placeholder='Type comment...'
              style={{ width: '100%', marginBottom: '10px' }}
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            <MiuButton
              onClick={handleCreate}
              disabled={!value}
              variant='outlined'
              startIcon={<Add />}
              fullWidth
            >
              Add comment
            </MiuButton>
          </InputWrapper>
        </Wrapper>
      </Drawer>
    </Spin>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
`
const InputWrapper = styled.div`
  width: 100%;
  padding-top: 10px;
`
const CommentsList = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  /* max-height: 500px;
  overflow: scroll; */
`
const CommentWrapper = styled.div`
  border: ${({ theme }) => `1px solid ${theme.colors.text}`};
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary} !important;
`
const InfoBlock = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding-top: 10px;

  & .info {
    font-size: 10px;
    opacity: 0.6;
  }
`
