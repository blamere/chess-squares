import React from 'react';
import './Clock.css';

const clock = (props) => {
    return (
        <div className="Clock">
            {props.time}
        </div>
    )
}

export default clock;