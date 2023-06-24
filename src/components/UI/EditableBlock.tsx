import useOnClickOutside from 'hooks/useOnClickOutside'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'

import { CustomButton } from 'components/Button/CustomButton'
import { Edit as EditIcon } from '@mui/icons-material'
import { P } from 'molecules/P/P'

interface Props {
  children: React.ReactNode
  value: string | number | JSX.Element
  onSave: () => void
  onCancel?: () => void
  disabled?: boolean
  editMode?: boolean
  closeOnBlur?: boolean
}

export const EditableBlock = ({
  children,
  value,
  onSave,
  onCancel,
  disabled,
  editMode,
  closeOnBlur,
}: Props) => {
  const [loading, setLoading] = useState(false)
  const contentRef = useRef(null)

  const [isEdit, setIsEdit] = useState(editMode)

  const handleTextClick = () => {
    setIsEdit(true)
  }

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      await onSave?.()
      setIsEdit(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  const handleCancel = () => {
    onCancel?.()
    setIsEdit(false)
  }

  useOnClickOutside(contentRef, () => {
    if (closeOnBlur) handleCancel()
  })

  return (
    <Wrapper>
      {isEdit ? (
        <Content
          ref={contentRef}
          className='editable-content'
          data-testid='content'
        >
          {children}

          {!editMode && (
            <Buttons>
              <CustomButton onClick={handleSave}>
                <P>Save</P>
              </CustomButton>
              <CustomButton buttonType='remove' onClick={handleCancel}>
                <P>Cancel</P>
              </CustomButton>
            </Buttons>
          )}
        </Content>
      ) : (
        <>
          <Value>{value || '--'}</Value>
          {!disabled && (
            <Edit onClick={handleTextClick} data-testid='edit-icon'>
              <EditIcon />
            </Edit>
          )}
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const Buttons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const Content = styled.div`
  display: flex;
  width: 100%;
  gap: 30px;
  align-items: center;
`
const Value = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`
const Edit = styled.span`
  position: 'relative';
  top: -2px;
  cursor: pointer;
  & svg {
    width: 20px;
    fill: ${({ theme }) => theme.colors.text};
    &:hover {
      fill: blue;
    }
  }
`
