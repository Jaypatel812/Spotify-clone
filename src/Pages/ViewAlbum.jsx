import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { albumsData, assets, songsData } from '../assets/assets';
import { PlayContext } from '../Context/PlayerContext';
import Loader from '../Components/Loader';
import styled from 'styled-components';



export default function ViewAlbum() {
    const { id } = useParams();
    const { playWithId, getAlbum, album, msToMinute } = useContext(PlayContext)
    useEffect(() => {
        getAlbum(id)
    }, [])

    return (
        <Container>
            {
                album.length < 1 ?
                    <div className='d-flex align-items-center h-100 justify-content-center'>
                        <Loader />
                    </div>
                    :
                    <div className='text-white'>
                        <div className='p-3  d-flex gap-2'>
                            <img src={album.image} width={200} className='rounded' alt="" />
                            <div className='d-flex flex-column mt-2 ms-2'>
                                <p>Album</p>
                                <p className='fs-1 fw-bold' ></p>
                                <p>{album.name}</p>
                                <p>{album.desc.join(', ')}</p>
                            </div>
                        </div>
                        <div className='d-flex gap-4 px-2 ps-5 opacity-75'>
                            <p><b>#</b></p>
                            <p className='col-8'>Title</p>
                            <p className='col-3'>
                                <img src={assets.clock_icon} width={15} height={15} alt="Clock" />
                            </p>
                        </div>
                        <hr />
                        <div className='d-flex flex-column gap-2  songlist'>
                            {
                                album.tracks && album.tracks.map((item, index) => (
                                    <div onClick={() => playWithId(item.id)} key={index} className='d-flex gap-4 align-items-center px-2 p-2 ps-5 '>
                                        <p><b>{index + 1}</b></p>
                                        <div className='col-8'>
                                            <p className='song-name'>{item.name}</p>
                                            <p className='song-artist'>{item.artists.join(', ')}</p>
                                        </div>
                                        <p className='col-3 text-white-50'>{msToMinute(item.duration)}</p>

                                    </div>
                                ))
                            }
                        </div>
                    </div>
            }
        </Container>
    )
}


const Container = styled.div`
    .songlist{
    line-height: 1.3;
}
`