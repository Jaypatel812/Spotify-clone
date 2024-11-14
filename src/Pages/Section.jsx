import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { assets } from '../assets/assets'
import Loader from '../Components/Loader'
import { PlayContext } from '../Context/PlayerContext'
import { useParams } from 'react-router-dom'

export default function Section() {
    const { playListData, msToMinute, playPlayListTrack, playListTracks, setPlayListTracks } = useContext(PlayContext);
    const { id } = useParams()


    useEffect(() => {
        if (id && playListData) {
            setPlayListTracks(playListData?.filter((track) => track.id == id));
        }
    }, [id, playListData]);

    return (
        <Container>
            {
                playListTracks.length < 1 ?
                    <div className='d-flex align-items-center h-100 justify-content-center'>
                        <Loader />
                    </div>
                    :
                    <div className='text-white'>
                        <div className='p-sm-3 playlist-head d-sm-flex gap-2'>
                            <div className='music-logo mx-auto mx-sm-0 text-center align-content-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-music-note-beamed" viewBox="0 0 16 16">
                                    <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2" />
                                    <path fillRule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z" />
                                    <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z" />
                                </svg>
                            </div>
                            <div className='d-flex justify-content-end flex-column mt-2 ms-2'>
                                <p className='fw-bold'>Playlist</p>
                                <p className='playlist-name fw-bold' >{playListTracks[0]?.name}</p>
                                {/* <p>{playListTracks[0]?.desc}</p> */}
                            </div>
                        </div>
                        <div className='d-flex mt-2 px-2 ps-5 d-sm-flex d-none opacity-75'>
                            <div className="col-7">
                                <p><b>#</b> Title</p>
                            </div>
                            <div className="col-5 gap-2 d-flex">
                                <p className='col-7'>Album</p>
                                <p className='col-5'>
                                    <img src={assets.clock_icon} width={15} height={15} alt="Clock" />
                                </p>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <div className='d-flex flex-column gap-2 songlist'>
                                {
                                    playListTracks[0]?.track && playListTracks[0]?.track.map((item, index) => (
                                        <div className='d-flex p-2 px-2 ps-sm-5' key={index} onClick={() => playPlayListTrack(item.id, item.name, item.artists, item.image, item.context_uri, item.track_number, index, item.imgForPlayer)}>
                                            <div className='col-12 d-flex align-items-center song-container'>
                                                <div className='d-flex col-sm-7 col-12 align-items-center' >
                                                    <p className='d-sm-block d-none me-3'>{index + 1}</p>
                                                    <img src={item.image.url} className='rounded me-3' width={35} />
                                                    <div className='col-sm-7 song-detail-box'>
                                                        <p className='song-name text-truncate fw-semibold'>{item.name}</p>
                                                        <p className='song-artist text-truncate'>{item.artists.join(", ")}</p>
                                                    </div>
                                                </div>
                                                <div className='col-5 song-duration gap-2 d-flex align-items-center'>
                                                    <p className='col-7 d-sm-block text-truncate d-none song-artist '>{item.album}</p>
                                                    <p className='col-2 d-sm-block d-none text-white-50'>{msToMinute(item.duration)}</p>
                                                    {/* <div className='col-2  dropstart' data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className="bi bi-three-dots add-to-playlist"></i>
                                                        <ul className="dropdown-menu dropdown-menu-dark">
                                                            {
                                                                playListData && playListData.map((obj) => (
                                                                    <li key={obj.id} onClick={() => addToPlayList(item.id, item.name, item.artists, item.image, item.imgForPlayer, item.context_uri, item.track_number, obj.id)} ><a className="dropdown-item" href="#">{obj.name}</a></li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
            }
        </Container>
    )
}




const Container = styled.div`
    color: white;
    .songlist{
        line-height: 1.3;
    }
    .music-logo{
        width: 180px;
        height: 180px;
        background: linear-gradient(180deg, #383838 0%, #252525 100%);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-radius: 4px;
        svg{
            color: #e2e2e2;
            margin-left: -15px;
            /* filter: drop-shadow(8px 8px 30px white) */
        }
    }
    .playlist-head{
        background: linear-gradient(180deg, rgba(84,84,84,1) 0%, rgba(18,18,18,1) 100%);
        padding-top: 70px !important;
        margin-top: -67px;

    }
    .playlist-name{
        font-size: clamp(1.875rem, 0.8882rem + 5.2632vw, 5.625rem);
    }
`