import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { PlayContext } from '../Context/PlayerContext';


export default function Playlist({ image, name, desc, id }) {
    const { getMusic, setPlayList } = useContext(PlayContext)
    const navigate = useNavigate();
    const handleClick = () => {
        setPlayList([]);
        getMusic(id);
        navigate(`/playlist/${id}`)

    }

    return (
        <div onClick={handleClick} className='p-2 px-3 rounded song-cards'>
            <img className='rounded' src={image} style={{ width: "100%" }} crossOrigin="anonymous" />
            <p className='fw-bold truncate mt-2 mb-1'>{name}</p>
            <p style={{ fontSize: "13px" }} className='opacity-75 playlist-desc'>{desc}</p>
        </div>
    )
}

