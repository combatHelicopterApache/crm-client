import { QuestionCircleOutlined } from '@ant-design/icons'
import { Popover } from 'antd'
import styled from 'styled-components'

interface Props {
  children: React.ReactNode
  error?: string
  title: string
  description?: string | React.ReactNode
  withInfoIcon?: boolean
  required?: boolean
  width?: number
  paddingLeft?: number
}

export const Row = ({
  children,
  title,
  description,
  withInfoIcon,
  required,
  width,
  padding = 10,
}: Props) => {
  const content = <Description>{description}</Description>

  return (
    <SettingsRowStyled
      width={width}
      paddingLeft={padding}
      data-testid='settings-row'
    >
      <Title>
        {required ? `${title}*` : `${title}`}
        {/* {title}
        {required && ' *'} */}
        {!!description && withInfoIcon && (
          <Popover
            title={title}
            content={content}
            placement='right'
            trigger={'click'}
          >
            <span
              style={{
                marginLeft: 5,
                cursor: 'help',
              }}
            >
              <QuestionCircleOutlined />
            </span>
          </Popover>
        )}
      </Title>

      <div>
        {children}
        {!!description && !withInfoIcon && (
          <Description>{description}</Description>
        )}
      </div>
    </SettingsRowStyled>
  )
}

const SettingsRowStyled = styled.div<{ width?: number; padding: number }>(
  ({ width, padding, theme }) => ({
    display: 'grid',
    gridTemplateColumns: `${width || 200}px 1fr`,
    padding: '12px 0',
    borderBottom: `1px solid  rgba(255, 255, 255, 0.3)`,
    paddingLeft: padding || 0,
    alignItems: 'center',
  }),
)

const Title = styled.p`
  color: #707683;
  margin: 0;
`
const Description = styled.div`
  font-size: 0.8rem;
  font-style: italic;
  color: #707683;
  white-space: break-spaces;

  p {
    margin-bottom: 5px;

    span {
      font-weight: 600;
    }
  }
`
