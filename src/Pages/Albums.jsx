import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlayContext } from '../Context/PlayerContext';

export default function Albums({ image, name, desc, id }) {
    const { getAlbum, setAlbum } = useContext(PlayContext)
    const navigate = useNavigate();
    const handleClick = () => {
        setAlbum([]);
        getAlbum(id);
        navigate(`/album/${id}`)

    }
    return (
        <div onClick={handleClick} className='p-2 px-3 rounded song-cards'>
            <img className='rounded' src={image} style={{ width: "100%" }} alt="" />
            <p className='fw-bold truncate mt-2 mb-1'>{name}</p>
            <p style={{ fontSize: "13px" }} className='opacity-75 text-truncate'>{desc}</p>
        </div>
    )
}
