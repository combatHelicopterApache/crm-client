import React from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { toggleMenu } from '../../../../store/ui/UISlice'
import { MainLogo } from 'images/icons'
import { useAppSelector, useAppDispatch } from 'store/store'
import styled from 'styled-components'

const Logo = () => {
  const dispatch = useAppDispatch()

  const isOpen = useAppSelector(state => state.ui.isOpen)

  const HandleClick = () => {
    dispatch(toggleMenu())
  }

  return (
    <Wrapper className={isOpen ?? 'close'}>
      {!isOpen && (
        <div className='logo-wrapper'>
          <MainLogo />
        </div>
      )}
      <button onClick={HandleClick} className={'btnSplit'}>
        {' '}
        {isOpen ? <RightOutlined /> : <LeftOutlined />}{' '}
      </button>
    </Wrapper>
  )
}

export default Logo

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  height: 55px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid grey;

  &.close {
    width: 100%;
    position: relative;
    height: 55px;
    padding: 1rem;
    margin-left: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }

  & img {
    width: 100%;
    height: 100%;
    max-width: 120px;
    object-fit: contain;
  }

  .btnSplit {
    color: #fff;
    background: transparent;
    border: none;
    outline: none;
  }

  .btnSplit svg {
    width: 20px;
    height: 20px;
    fill: ${({ theme }) => theme.colors.text};
  }

  & .logo-wrapper svg {
    fill: ${({ theme }) => theme.colors.text};
    width: 100px;
    height: 55px;
  }
`
