import React, { Fragment, useCallback, useEffect, useState, FC } from 'react'

import {
  getEntityComments,
  postEntityComments,
  deleteEntityComments,
  putEntityComments,
} from 'api/Comments'

import moment from 'moment-timezone'

import { Popconfirm, Tooltip } from 'antd'

import { IComment } from './types'

import styled from 'styled-components'
import { CustomInput } from 'components/Input/CustomInput'
import { Button } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { Info } from '@mui/icons-material'
import { formatTimeByMoment, isValueEmpty } from './helpers'
import { useAppSelector } from 'store/store'
import { authSelector } from 'features/Login/authSlice'
import { ExpandCircleDown } from '@mui/icons-material'
import { Add, Save } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export const Comments: FC<INotesProps> = props => {
  const {
    route = '',
    forPrint = false,
    setEdited,
    canEdit = true,
    label = '',
    entity,
    entityId,
  } = props

  const user = useAppSelector(authSelector)

  const isAdmin = true

  const [showAll, setShowAll] = useState(false)
  const [notes, setNotes] = useState<IComment>([])
  const [currentNote, setCurrentNote] = useState('')
  const [editedNote, setEditedNote] = useState({
    id: 0,
    value: '',
    isEdit: false,
  })
  const [isFetching, setIsFetching] = useState(false)
  const [isEditedItemFetching, setIsEditedItemFetching] = useState(false)
  const [showNoteInput, setShowNoteInput] = useState(false)
  const [expandedNotes, setExpandedNotes] = useState<number[]>([])

  useEffect(() => {
    if (route && entityId) {
      getEntityComments(`${route}/${entityId}`)
        .then(r => {
          setNotes(r?.comments || [])
        })
        .catch(e => console.error(e))
    }
  }, [route, entityId])

  const createNote = useCallback(
    (text: string) => {
      setIsFetching(true)
      postEntityComments(`${route}/${entityId}`, {
        description: text,
        attached_files: null,
      })
        .then(r => {
          setNotes(p => [r?.data, ...p])
        })
        .then(() => {
          setCurrentNote('')
          setShowNoteInput(false)
          setEdited?.(true)
        })
        .catch(e => console.error(e))
        .finally(() => setIsFetching(false))
    },
    [route, entityId],
  )

  const deleteNote = useCallback(
    (item, index) => {
      deleteEntityComments(`${route}/${item?.id}`)
        .then(() => {
          setNotes(old => {
            old[index] = {
              ...item,
              deleted_by: user?.auth_user?.full_name,
              deleted_at: moment.utc(),
            }
            return [...old]
          })
          setEdited?.(true)
          setEditedNote({ id: 0, value: '', isEdit: false })
        })
        .catch(e => console.error(e))
    },
    [route],
  )

  const editNote = useCallback((text, item, index) => {
    setIsEditedItemFetching(true)

    putEntityComments(`${route}/${item?.id}`, { description: text })
      .then(r => {
        setNotes(p => {
          p[index] = r
          return [...p]
        })
      })
      .then(() => {
        setEdited?.(true)
        setEditedNote({ isEdit: false, id: 0, value: '' })
      })

      .catch(e => console.error(e))
      .finally(() => setIsEditedItemFetching(false))
  }, [])
  const handleChangeNotesInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentNote(e.target.value)
  }

  const handleSubmitCreateNote = () => {
    if (isValueEmpty(currentNote)) createNote(currentNote)
  }

  const handleCreateOrSaveNote = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()

    currentNote?.length > 0 ? handleSubmitCreateNote() : setShowNoteInput(true)
  }

  const handleClickNote = (id: number) => {
    if (expandedNotes.includes(id)) {
      setExpandedNotes(prev => prev.filter(noteID => noteID !== id))
    } else {
      setExpandedNotes(prev => [...prev, id])
    }
  }

  return (
    <Wrapper className='notes-wrapper'>
      {label && !!notes?.length && (
        <p className='notes-label'>
          <strong>{label}</strong>
        </p>
      )}
      <div className='notes-input-row'>
        {showNoteInput && (
          <CustomInput
            className='notes-input'
            placeholder='Add Comment'
            fullWidth={true}
            value={currentNote}
            onChange={handleChangeNotesInput}
            // onBlur={handleBlurInput}
            disabled={isFetching}
            multiline
            inputProps={{ maxLength: 3000 }}
            error={
              currentNote?.length === 3000 && {
                notes: ['Max length is 3000 characters'],
              }
            }
            name='notes'
          />
        )}
        <Button
          className='input-button'
          onClick={handleCreateOrSaveNote}
          disabled={!canEdit}
          startIcon={currentNote?.length > 0 ? <Save /> : <Add />}
        >
          {`${currentNote?.length > 0 ? 'Save' : 'Add'} ${
            entity ?? ''
          } Comment`}
        </Button>
      </div>
      <div
        className={`notes-list-wrapper ${notes?.length === 0 ? 'empty' : ''} ${
          (showAll || expandedNotes?.length || editedNote.isEdit) &&
          'fitContent'
        }`}
      >
        {notes &&
          notes.map?.(
            (item, idx) =>
              (showAll || idx < 3) && (
                <Fragment key={idx}>
                  <div
                    className={`note-container ${
                      editedNote.isEdit && editedNote.id === item?.id
                        ? 'show'
                        : 'hide'
                    }`}
                  >
                    <div className='note-top__block'>
                      {editedNote?.id === item?.id && editedNote?.isEdit ? (
                        <>
                          <CustomInput
                            className='edit-note-input'
                            value={editedNote.value}
                            onChange={e =>
                              setEditedNote(p => ({
                                ...p,
                                value: e.target.value,
                              }))
                            }
                            disabled={isEditedItemFetching}
                            multiline
                            inputProps={{ maxLength: 3000 }}
                            error={
                              editedNote.value?.length === 3000 && {
                                editNote: ['Max length is 3000 characters'],
                              }
                            }
                            name='editNote'
                          />
                          <Button
                            disabled={!canEdit}
                            color='success'
                            onClick={() =>
                              editNote(editedNote.value, item, idx)
                            }
                          >
                            Save
                          </Button>
                          <Button
                            title='Cancel'
                            color='error'
                            onClick={() => {
                              setEditedNote({ isEdit: false, id: 0, value: '' })
                            }}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Tooltip
                          title={
                            item?.text?.length > 100
                              ? `Click to ${
                                  expandedNotes.includes(item?.id)
                                    ? 'close'
                                    : 'expand'
                                }`
                              : null
                          }
                        >
                          <span
                            className={`note-text ${
                              expandedNotes.includes(item?.id) || forPrint
                                ? ''
                                : !showAll
                                ? 'cut'
                                : ''
                            }`}
                            onClick={() => handleClickNote(item.id)}
                          >
                            {item?.deleted_at ? (
                              <i>Deleted</i>
                            ) : (
                              item?.description
                            )}
                          </span>
                        </Tooltip>
                      )}
                      {!item?.deleted_at &&
                        canEdit &&
                        (isAdmin ||
                          user?.auth_user?.id === item?.created_by_user_id) && (
                          <div className='note-icons'>
                            <IconButton
                              color='info'
                              onClick={() =>
                                setEditedNote({
                                  id: item?.id,
                                  value: item?.description,
                                  isEdit: true,
                                })
                              }
                            >
                              <Edit />
                            </IconButton>
                            <Popconfirm
                              title='Are you sure you want to delete this comment?'
                              onConfirm={() => deleteNote(item, idx)}
                            >
                              <IconButton color='error'>
                                <Delete />
                              </IconButton>
                            </Popconfirm>
                          </div>
                        )}
                    </div>
                    <div className='note-bottom__block'>
                      {item?.deleted_at && (
                        <p className='deleted-text'>
                          <i>
                            Deleted by {item?.user_name} at{' '}
                            {formatTimeByMoment(item?.deleted_at)}
                          </i>
                          <Tooltip title={item?.description || ''}>
                            <Info
                              className='deleted-text__tooltip'
                              style={{
                                marginLeft: 'auto',
                                marginRight: '5px',
                                fontSize: '20px',
                                color: '#4c53ef',
                                opacity: '1',
                              }}
                            />
                          </Tooltip>
                        </p>
                      )}
                      {!item?.deleted_at && item?.updated_by && (
                        <p className='updated-text'>
                          <i>
                            Updated by {item?.updated_by} at{' '}
                            {formatTimeByMoment(item?.updated_at)}
                          </i>
                        </p>
                      )}
                      <p className='created-text'>
                        <i>
                          Created by {item?.created_by} at{' '}
                          {formatTimeByMoment(item?.created_at)}
                        </i>
                      </p>
                    </div>
                  </div>
                  {notes?.length !== 0 && notes?.length - 1 !== idx && (
                    <div className='note-separator' />
                  )}
                </Fragment>
              ),
          )}
        {notes?.length > 3 && (
          <div className={`arrow__wrapper ${showAll ? 'up' : 'down'}`}>
            <div
              onClick={() => setShowAll(!showAll)}
              className='arrow__container'
            >
              <ExpandCircleDown
                style={{
                  transform: `rotate(${showAll ? '180deg' : '0deg'})`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  .notes-input-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;

    .input-button {
      min-width: 125px;
      max-width: 160px;
      /* color: ${({ theme }) => theme.colors.text}; */
    }
  }
  & .MuiInputBase-root {
    color: ${({ theme }) => theme.colors.text} !important;
  }

  .notes-list-wrapper {
    display: flex;
    flex-direction: column;
    margin: 0.2rem 0;
    border: 1px solid #d6d6d6;
    border-radius: 8px;
    max-height: 400px;

    &.fitContent {
      max-height: fit-content;
    }

    &.empty {
      border: none;
    }

    .note-container {
      padding: 0.5rem 0 0 0.5rem;

      &.show {
        height: auto;
      }

      &.hide {
        //max-height: 120px;
        //overflow: scroll;
      }

      .note-top__block {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 0.5rem;

        .note-text {
          color: ${({ theme }) => theme.colors.text};
          text-align: start;
          word-break: break-all;
          white-space: break-spaces;
          cursor: pointer;

          @media (min-width: 320px) and (max-width: 425px) {
            font-size: 12px;
          }

          &.cut {
            width: 100%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
        }

        .edit-note-input {
          flex: 1;
          color: ${({ theme }) => theme.colors.text} !important;
        }

        .edited-note-save-btn {
          //margin-left: 10px;
          //margin-right: auto;
        }

        .note-icons {
          /* min-width: 70px; */
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          /* & svg {
            fill: ${({ theme }) => theme.colors.text} !important;
          } */
          /* & > :first-child {
            margin-right: 5px;
            cursor: pointer;
            display: inline-block;
          }

          & > :last-child {
            margin-left: 5px;
            cursor: pointer;
            display: inline-block;
          } */
        }
      }

      .note-bottom__block {
        .deleted-text,
        .updated-text,
        .created-text {
          display: flex;
          justify-content: space-between;
          height: 15px;
          i {
            font-size: 10px;
            color: ${({ theme }) => theme.colors.text};
            opacity: 0.5;
          }
          .deleted-text__tooltip {
            cursor: pointer;
          }
        }
      }
    }
    .note-separator {
      border-bottom: 1px solid #d6d6d6;
      height: 1px;
      margin: 0 auto;
      width: 80%;
    }
    .show-all-notes-btn {
      width: 350px;
    }
  }

  .arrow__wrapper {
    &.up {
      bottom: -15px;
    }

    &.down {
      bottom: -5px;
    }
    position: absolute;
    width: 100%;
    margin-top: -30px;
    @media (min-width: 320px) and (max-width: 425px) {
      margin-top: -20px;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    .arrow__container {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      width: 30px;
      min-width: 30px;
      max-width: 30px;
      height: 30px;
      background-color: #4285f4;
      border: 1px solid #4285f4;
      color: #ffffff;
      cursor: pointer;
      font-size: 20px;
    }
  }

  @media (min-width: 320px) and (max-width: 425px) {
    .notes-wrapper {
      //width: 290px;

      & > .notes-input-row > .notes-input > div {
        padding: 0;
        height: 26px;
      }
      & > .notes-list-wrapper > .show-all-notes-btn {
        width: 290px;
      }

      & > .notes-list-wrapper > .note-container > .note-top-block {
        flex-wrap: wrap;
        gap: 1rem;
        & > .edit-note-input {
          width: 100%;
          flex: none;

          div {
            padding: 0;
          }
        }

        & > .edited-note-save-btn {
          width: 75px;
        }
      }
    }
  }
`
