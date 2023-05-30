import React from 'react';
import s from './EmptyLayout.module.css'

const EmptyLayout = ({children}) => {
    return (
        <div className={s.container}>
            {children}
        </div>
    );
};

export default EmptyLayout;