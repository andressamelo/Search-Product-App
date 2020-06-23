import React from 'react';
import './Spinner.scss';

const Spinner = props => <div {...props} className='__spinner__wrapper'>
    <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>


export default Spinner;