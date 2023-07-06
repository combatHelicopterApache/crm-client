import styled from 'styled-components'
import { Typography } from 'antd'

const { Paragraph } = Typography

export const renderCopyableText = (text: string) => {
  return (
    <CopyWrapper>
      <Paragraph copyable={{ tooltips: false }}>{text}</Paragraph>
    </CopyWrapper>
  )
}

const CopyWrapper = styled.div`
  & .ant-typography {
    color: ${({ theme }) => theme.colors.text} !important;
    margin-bottom: 0;
  }
`
