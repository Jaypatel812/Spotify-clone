import React, { useContext } from 'react'
import { PlayContext } from '../Context/PlayerContext'
import { useNavigate } from 'react-router-dom'

export default function Podcasts({ image, name, publisher, id }) {
    const { getPodcast, setPodcast } = useContext(PlayContext);
    const redirect = useNavigate();
    const handleClick = (id) => {
        setPodcast([])
        redirect(`/podcasts/${id}`);
        getPodcast(id);
    }

    return (
        <div onClick={() => handleClick(id)} className='p-2 px-3 rounded text-white song-cards'>
            <img className='rounded' src={image} style={{ width: "100%" }} crossOrigin="anonymous" />
            <p className='fw-bold mt-2 mb-1'>{name}</p>
            <p style={{ fontSize: "13px" }} className='opacity-75 playlist-desc'>{publisher}</p>
        </div>
    )
}

