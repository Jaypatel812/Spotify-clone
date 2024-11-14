import React, { useContext } from 'react'
import { PlayContext } from '../Context/PlayerContext'

export default function Songs ({ image, name, desc, id }) {
    const { playWithId } = useContext(PlayContext)
    return (
        <div onClick={() => playWithId(id)} className='p-2 px-3 rounded song-cards'>
            <img className='rounded' src={image} style={{ width: "100%" }} alt="" />
            <p className='fw-bold mt-2 mb-1'>{name}</p>
            <p style={{ fontSize: "13px" }} className='opacity-75'>{desc}</p>
        </div>
    )
}
