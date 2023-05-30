import React, {FC, ReactNode} from 'react';
import s from './ControlPanel.module.css'

interface IControl{
    children: ReactNode
}
const ControlPanel:FC<IControl> = ({children}) => {
    return (
        <div className={s.container}>
            {children}
        </div>
    )
}

export default ControlPanel;