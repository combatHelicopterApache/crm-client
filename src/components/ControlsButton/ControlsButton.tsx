import React, { FC } from 'react'
import styled from 'styled-components'

import { Button, ActionType } from './Button'

const initialTodos = ['delete', 'edit', 'view']
const initialCallBacks = [() => null, () => null, () => null]
const initialPreloaders = [false, false, false, false]
const initialTooltips = ['', '', '']
const initialPopConfirms = ['', '', '']
const initialPopConfirmsPositions = ['', '', '']

interface IProps {
  todos: ActionType[]
  callbacks: () => void[]
  tooltips: string[]
  preloaders: boolean[]
  popConfirms: string
  disabled: boolean[]
  className: string
  style: object
  getPopupContainer: () => void
  tooltipPlacement: string
  popConfirmPositions: string[]
}

export const ControlsButton: FC<IProps> = ({
  todos = initialTodos,
  callbacks = initialCallBacks,
  preloaders = initialPreloaders,
  tooltips = initialTooltips,
  popConfirms = initialPopConfirms,
  popConfirmPositions = initialPopConfirmsPositions,
  className = '',
  disabled = initialPreloaders,
  getPopupContainer,
  tooltipPlacement,
  style = {},
  ...props
}) => {
  const disableDefaultActionsAndBubbling = e => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
  }
  return (
    <Wrapper
      className={`${className ? ` ${className}` : ''}`}
      style={style}
      {...props}
      onClick={disableDefaultActionsAndBubbling}
    >
      {todos.map((todo, idx) => (
        <Button
          key={todo + idx}
          type={todo}
          action={callbacks[idx]}
          preloader={preloaders[idx]}
          tooltip={tooltips[idx] ? tooltips[idx] : ''}
          popConfirm={popConfirms[idx] ? popConfirms[idx] : ''}
          popConfirmPosition={popConfirmPositions[idx]}
          isLast={idx === todos.length - 1}
          disabled={disabled[idx]}
          getPopupContainer={getPopupContainer}
          tooltipPlacement={tooltipPlacement}
        />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  padding: 10px;
`
