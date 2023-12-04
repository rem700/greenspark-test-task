import React, { FC } from 'react';
import './styles/WrapperComponent.css';

interface IWrapper {
    children: React.ReactNode;
    title: string;
    shortList?: boolean;
}

export const WrapperComponent: FC<IWrapper> = ({ children, title, shortList}) => {

    const wrapperContainerClass = !shortList ? "wrapper-container" : "wrapper-container wrapper-container-start";

    return (
        <div className="wrapper-canvas">
            <h3 className="wrapper-title">{title}</h3>
            <hr className="wrapper-divider"/>
            <div className={wrapperContainerClass}>
                {children}
            </div>
        </div>
    );
};
