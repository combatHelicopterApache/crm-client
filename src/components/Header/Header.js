import React from 'react';
import s from './Header.module.css'
import LoggedUser from "../LoggedUser/LoggedUser";

const Header = () => {
    return (
        <div className={s.container}>
            <LoggedUser />
        </div>
    );
};

export default Header;