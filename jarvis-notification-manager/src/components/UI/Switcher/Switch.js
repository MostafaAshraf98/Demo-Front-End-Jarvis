import React from 'react';
import classes from './Switch.module.css';


const Switch = ({ isOn, handleToggle, groupName,Type,className }) => {
    return (
        <div className={className}>
            <input
                checked={isOn}

                onChange={() => handleToggle(groupName,Type, isOn)}
                className={classes["react-switch-checkbox"]}
                id={groupName + Type}
                type="checkbox"
            />
            <label
                style={{ background: isOn && '#111163' }}
                className={classes["react-switch-label"]}
                htmlFor={groupName + Type}
            >
                <span className={classes[`react-switch-button`]} />
            </label>
        </div>
    );
};

export default Switch;