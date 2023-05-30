import React, {FC} from 'react';
import {Spin} from "antd";
import s from './Spinner.module.css'


export const Spinner:FC = () => {
    return (
        <div className={s.container}>
            <Spin></Spin>
        </div>
    )
}