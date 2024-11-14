import React, { useContext, useEffect, useRef } from 'react'
import { PlayContext } from '../Context/PlayerContext';
import { assets } from '../assets/assets';
import Loader from '../Components/Loader';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Color from "color-thief-react";


const Loading = () => <div>Loading...</div>;
export default function View_Playlist() {
    const { playList, getMusic, msToMinute, playTrack, playListData, addToPlayList } = useContext(PlayContext);
    const { id } = useParams();
    const bgRef = useRef();
    useEffect(() => {
        getMusic(id)
    }, [])

    const imgSrc = playList[0]?.image;

    return (
        <Container>
            <Color src={imgSrc} crossOrigin="anonymous" format="hex">
                {({ data, loading }) => {
                    if (loading) return <Loading />;
                    if (bgRef.current) {
                        bgRef.current.style.background = `linear-gradient(${data}, #121212)`
                    }
                    // setNavbarBg(data);
                }}
            </Color>


            {
                playList.length < 1 ?
                    <div className='d-flex align-items-center h-100 justify-content-center'>
                        <Loader />
                    </div>
                    :
                    <div className='text-white'>
                        <div ref={bgRef} className='p-sm-3 playlist-head d-flex gap-2'>
                            <img src={playList[0]?.image} width={200} className='rounded' alt="" />
                            <div className='d-flex flex-column mt-2 ms-2'>
                                <p className='d-sm-block d-none'>Playlist</p>
                                <p className='fs-1 fw-bold' >{playList[0]?.name}</p>
                                <p>{playList[0]?.desc}</p>
                                <p className='fs-6 d-sm-block d-none'>
                                    <img src={assets.spotify_logo} width={20} alt="" /> <b>spotify</b> &#9679; <b>50 Songs,</b> about 2 hr 30 min
                                </p>
                                <p className='fs-6 d-sm-none'>
                                    <img src={assets.spotify_logo} width={20} alt="" /> <b>spotify</b>
                                </p>
                            </div>
                        </div>
                        <div className='d-flex px-2 ps-5 d-sm-flex d-none opacity-75'>
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
                                    playList[0]?.tracks && playList[0]?.tracks.map((item, index) => (
                                        <div key={index}>
                                            {item.album !== "" &&
                                                <div className='d-flex p-2 px-2 ps-sm-5' >
                                                    <div className='col-12 d-flex align-items-center song-container'>
                                                        <div className='d-flex col-sm-7 col-12 align-items-center' onClick={() => playTrack(item.id, item.name, item.artists, item.image, item.context_uri, item.track_number, index, item.imgForPlayer)}>
                                                            <p className='d-sm-block d-none me-3'>{index + 1}</p>
                                                            <img src={item?.image.url} className='rounded me-3' width={35} />
                                                            <div className='col-sm-7 song-detail-box'>
                                                                <p className='song-name text-truncate fw-semibold'>{item.name}</p>
                                                                <p className='song-artist text-truncate'>{item.artists.join(", ")}</p>
                                                            </div>
                                                        </div>
                                                        <div className='col-5 song-duration gap-2 d-flex align-items-center'>
                                                            <p className='col-7 d-sm-block text-truncate d-none song-artist '>{item.album}</p>
                                                            <p className='col-2 d-sm-block d-none text-white-50'>{msToMinute(item.duration)}</p>
                                                            <div className='col-2  dropstart' data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className="bi bi-three-dots add-to-playlist"></i>
                                                                <ul className="dropdown-menu dropdown-menu-dark">
                                                                    {
                                                                        playListData && playListData.map((obj) => (
                                                                            <li key={obj.id} onClick={() => addToPlayList(item.id, item.name, item.artists, item.image, item.imgForPlayer, item.context_uri, item.track_number, obj.id, item.duration, item.album)} ><a className="dropdown-item" href="#">{obj.name}</a>
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
            }
        </Container >
    )
}

const Container = styled.div`
.songlist{
    line-height: 1.3;
}
.playlist-head{
    padding-top: 67px !important;
    margin-top: -67px;
}
.add-to-playlist{
    display: none;
}

.song-container > :first-child,.add-to-playlist:hover{
    cursor: pointer;
}

.dropdown-menu .dropdown-item:active,
.dropdown-menu .dropdown-item:focus {
    background-color: #434343 !important;
}

.dropdown-menu > li {
    margin-inline: 5px;
}


@media (max-width:500px){
    .playlist-head{
        flex-direction: column;
        padding: 5px;
        > img{
            margin-inline: auto;
        }
    }
    .song-container{    
        overflow: hidden;
    }
    .song-detail-box{
        width: 100%;
        overflow: hidden;
    }

}
`