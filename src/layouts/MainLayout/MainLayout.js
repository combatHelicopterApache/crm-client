import React from 'react';
import s from './MainLayout.module.css'
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

const MainLayout = ( { children } ) => {
    return (
        <div className={s.container}>
            <Sidebar />
            <div className={s.inside}>
                <Header />
                <div className={s.content}>
                    { children }
                </div>
            </div>

        </div>
    );
};

export default MainLayout;