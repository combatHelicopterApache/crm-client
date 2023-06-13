import React from 'react'
import { useAppSelector } from 'store/store'
import logo from '../../../../images/logo.png'
import s from './Logo.module.css'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../../../../store/ui/UISlice'
import { MainLogo } from 'images/icons'

const Logo = () => {
  const dispatch = useDispatch()

  const isOpen = useAppSelector(state => state.ui.isOpen)

  const HandleClick = () => {
    dispatch(toggleMenu())
  }

  return (
    <div className={isOpen ? s.container + ' ' + s.close : s.container}>
      {isOpen ? null : <MainLogo  color={'white'} />}
      <button onClick={HandleClick} className={s.btnSplit}>
        {' '}
        {isOpen ? <RightOutlined /> : <LeftOutlined />}{' '}
      </button>
    </div>
  )
}

export default Logo
