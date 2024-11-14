import React, { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Home from '../Pages/Home'

export default function HeroSec() {
    const albumRef = useRef();
    const location = useLocation();

    return (
        <div ref={albumRef} className='hero-section overflow-auto my-2' >
            <Home />
        </div>
    )
}
