import React from 'react';
import Header from './Header';
import Header1 from './Header1';
import { useLocation } from 'react-router-dom';

const HeaderFinal = () => {
    const loc = useLocation();
    const location = loc.pathname === "/";

    return (
        <div className='bg-blue-950' >
            {location ? <Header /> : <Header1 />}
        </div>
    );
}
export default HeaderFinal;
