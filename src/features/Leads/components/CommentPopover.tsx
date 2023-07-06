import React, { FC } from 'react'
import { Popover, Button } from 'antd'
import styled from 'styled-components'
import { P } from 'molecules/P/P'

interface IProps {
  comments_list: {
    commentary_list: []
    elem_id: string
    id: string
    path: string
  }
  onOpen: () => void
  title: string
}

export const CommentPopover: FC<IProps> = ({
  comments_list,
  onOpen,
  title,
}) => {
  const lastElement = comments_list?.commentary_list?.length - 1 || 0
  const content = (
    <div>
      <p>{comments_list?.commentary_list?.[lastElement]?.description}</p>
      <Button style={{ marginLeft: 'auto' }} onClick={onOpen} type='primary'>
        View all
      </Button>
    </div>
  )
  return (
    <Wrapper>
      {!!comments_list?.commentary_list?.length ? (
        <Popover content={content} title={title}>
          <Row>
            <P
              style={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {comments_list?.commentary_list?.[lastElement]?.description > 10
                ? comments_list?.commentary_list?.[
                    lastElement
                  ]?.description?.slice(0, 10) + '...'
                : comments_list?.commentary_list?.[lastElement]
                    ?.description}{' '}
            </P>
            {!!lastElement > 1 && <Count>+{lastElement - 1}</Count>}
          </Row>
        </Popover>
      ) : (
        '-'
      )}
    </Wrapper>
  )
}
const Wrapper = styled.div``
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: nowrap;
`
const Count = styled.div`
  padding: 3px;
  border: 1px solid #1976d2;
  border-radius: 4px;
  width: 35px;
  height: 30px;
  background-color: #1f1f1f;
  font-size: 12px;
  display: flex;
  align-items: center;
`
