import React, { ChangeEvent } from 'react'
import { Checkbox } from 'components/Checkbox/Checkbox'
import { modulesList } from 'features/Settings/Users/utils/const'
import styled from 'styled-components'
import { Span } from 'molecules/Span/Span'
import { H2 } from 'molecules/H2/H2'
import { User } from 'features/Settings/Users/types'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

interface IProps {
  data: User['permissions']
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
}

export const Permissions = ({
  data,
  onChange,
  disabled,
}: IProps): React.ReactNode => {
  const handleChangeModules = (e: CheckboxChangeEvent) => {
    const { name, checked } = e.target
    if (!name) return
    onChange({
      target: {
        name: 'permissions',
        value: {
          ...data,
          [name]: checked,
        },
      },
    })
  }
  return (
    <>
      <H2 style={{ marginBottom: '20px' }}>Permissions</H2>
      <Wrapper>
        {modulesList.map(module => (
          <Row key={module.name}>
            <Span>{module.label}</Span>
            <Checkbox
              disabled={disabled}
              checked={data[module.name]}
              onChange={handleChangeModules}
              name={module.name}
            />
          </Row>
        ))}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  padding: 20px;
`
const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  align-items: center;
  gap: 5px;
`
