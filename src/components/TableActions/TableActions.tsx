import React from 'react'
import { Button } from './Button'

import styled from 'styled-components'

const initialTodos = ['delete', 'edit', 'view']
const initialCallBacks = [() => null, () => null, () => null]
const initialPreloaders = [false, false, false, false]
const initialTooltips = ['', '', '']
const initialPopConfirms = ['', '', '']
const initialPopConfirmsPositions = ['', '', '']

export const TableActions = ({
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
      className={`common-table-actions${className ? ` ${className}` : ''}`}
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
  gap: 5px;
  .ant-popover-disabled-compatible-wrapper button {
    margin: 0 !important;
  }
  .ant-popover-disabled-compatible-wrapper {
    padding: 0.2rem !important;
  }
  &.common-table-actions {
    display: flex;
    align-items: center;

    & .btn-light {
      background-color: ${({ theme }) => theme.colors.secondary} !important;
      border-color: ${({ theme }) => theme.colors.secondary} !important;
      background-color: black;
      border: none;
      box-shadow: none;
      padding: 0.25rem;
      &:hover,
      &:active,
      &:visited,
      &:disabled,
      &.disabled {
        background-color: unset !important;
        border-color: unset !important;
        border: none !important;
        box-shadow: none !important;
        button {
          background-color: ${({ theme }) =>
            theme.colors.background} !important;
          border-color: ${({ theme }) => theme.colors.background} !important;
          border: none !important;
          box-shadow: none !important;
        }
      }
    }
    button:hover {
      path {
        fill: #4285f4;
      }
    }

    .delete,
    .detach,
    .close {
      &:hover {
        path {
          fill: #f5222d;
        }
      }
    }
    .confirm,
    .confirm2 {
      &:hover {
        path {
          fill: rgb(28, 206, 28);
        }
      }
    }

    .btn-light {
      &.disabled {
        transform: translateX(-16%);
        opacity: 0.5;
        button {
          path {
            fill: #191919;
          }
        }
      }
      &:disabled:hover {
        path {
          fill: none;
        }
      }
    }

    @media (max-width: 499px) {
      svg {
        width: 12px;
      }
    }
  }

  div.ant-popover-inner > div > div > div.ant-popover-buttons {
    & > button.ant-btn.ant-btn-primary {
      background-color: #4285f4;
      border-color: #4285f4;
    }

    & > button.ant-btn-primary:active,
    & > button.ant-btn-primary.active {
      background-color: #444bd8;
      border-color: #444bd8;
    }

    & > button.ant-btn-primary:hover,
    & > button.ant-btn-primary:focus,
    & > button.ant-btn-primary:disabled,
    & > button.ant-btn-primary.disabled {
      background-color: #626afd;
      border-color: #626afd;
    }
  }
`