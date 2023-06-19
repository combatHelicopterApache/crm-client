import React from 'react'
import styled from 'styled-components'
import { PlusOutlined } from '@ant-design/icons'

export const DashedButton = ({
  title,
  onClick,
}: {
  title: string
  onClick: () => void
}) => {
  return (
    <Wrapper onClick={onClick}>
      {' '}
      <UploadBtnWrapper>
        <PlusOutlined />
        <UploadBtnTitle>{title}</UploadBtnTitle>
      </UploadBtnWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  min-height: 100px;
  width: 70px;
  border: ${({ theme }) => `1px dashed ${theme.colors.text} `};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`

const UploadBtnWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
const UploadBtnTitle = styled.div`
  color: ${({ theme }) => theme.colors.text};
  margin-top: 8px;
  text-align: center;
`
