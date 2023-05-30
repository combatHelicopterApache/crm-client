import React from 'react';
import logo from '../../images/logo.png'
import s from './Logo.module.css'
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {toggleMenu} from "../../store/menu/menu.slice";


const Logo = () => {
    const dispatch = useDispatch()

    const isOpen = useSelector((state) => state.MenuToggle.isOpen);

    const HandleClick = () => {
        dispatch(toggleMenu())
    }

    return (
        <div className={ isOpen ? s.container + ' ' + s.close : s.container }>
            { isOpen ? null : <img src={logo} alt="logo"/> }
           <button onClick={HandleClick} className={s.btnSplit}> { isOpen ? <RightOutlined />: <LeftOutlined /> } </button>
        </div>
    );
};

export default Logo;