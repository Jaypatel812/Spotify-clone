import React, { useContext } from 'react'
import { PlayContext } from '../Context/PlayerContext'
import styled from 'styled-components'
import Loader from '../Components/Loader';



export default function Profile() {
    const { userData, usersTopTrack, playTrack, msToMinute } = useContext(PlayContext);

    return (
        <Container>
            <div className='profile-banner'>
                <div className='d-flex align-items-center gap-3'>
                    <div className='profile-logo ms-3 mb-3 d-flex justify-content-center align-items-center'>
                        <div className="hover-logo ">
                            {userData?.images?.length > 0 ?
                                <img src={userData?.images[1]?.url} className='' width={180} height={180} alt="Profile" />
                                : <div className='text-secondary'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                    </svg>

                                </div>
                            }
                        </div>
                    </div>
                    <div className='mb-3'>
                        <div className='fw-semibold txt-profile'>Profile</div>
                        <div className='display-name'>{userData?.display_name ? userData.display_name : "User"}</div>
                    </div>
                </div>
            </div>


            <div className='mt-5 mb-3 px-3'>
                <p className='top-track-txt fw-bold'>Top Tracks this Month</p>
                <p className='top-track-subtxt fw-semibold mt-2'>Only Visible to you</p>
            </div>

            {usersTopTrack.length < 1 ?
                <div className='d-flex align-items-center h-100 justify-content-center'>
                    <Loader />
                </div>
                :
                <div className='text-white'>
                    <div className='d-flex flex-column gap-2 songlist'>
                        {
                            usersTopTrack?.items && usersTopTrack?.items.map((item, index) => (
                                <div className='d-flex px-2 p-2 ps-sm-5' key={index} onClick={() => playTrack(item.id, item.name, item.artists, item.image, item.context_uri, item.track_number, index, item.imgForPlayer)}>
                                    <div className='col-12 d-flex align-items-center song-container'>
                                        <div className='d-flex col-sm-7 col-12 align-items-center'>
                                            <p className='d-sm-block d-none me-3'>{index + 1}</p>
                                            <img src={item.image.url} className='rounded me-3' width={35} />
                                            <div className='col-sm-7 song-detail-box'>
                                                <p className='song-name text-truncate fw-semibold'>{item.name}</p>
                                                <p className='song-artist text-truncate'>{item.artists.join(", ")}</p>
                                            </div>
                                        </div>
                                        <div className='col-sm-5 gap-2 d-flex align-items-center justify-content-center'>
                                            <p className='col-9 d-sm-block text-truncate d-none song-artist '>{item.album_name}</p>
                                            <p className='col-3 d-sm-block d-none text-white-50'>{msToMinute(item.duration)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </Container >
    )
}

const Container = styled.div`
color: white;
line-height: 1.3;
    .profile-banner{
        background: rgb(86,86,86);
        background: linear-gradient(180deg, rgba(86,86,86,1) 0%, #181818 100%);
        height: 250px;
        margin-top: -65px;
        align-content: end;
    }
    .profile-logo{
        background-color: #282828;
        height: 160px;
        width: 160px;
        margin-top: auto;
        border-radius: 50%;
        overflow  :hidden ;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        box-shadow: inset rgba(0, 0, 0, 0.24) 0px 3px 8px;
    } 
    .profile-logo img {
        object-fit: cover;
    }
    .txt-profile{
        font-size: 14px;
    }
    .display-name{
        font-size: clamp(1.875rem, 0.8882rem + 5.2632vw, 5.625rem);
        font-weight: bold;
    }
    
    .top-track-txt{
        font-size: 25px;
    }
    .top-track-subtxt{
        font-size: 14px;
        color: #b3b3b3;
    }
    @media (max-width: 769px){
        .profile-banner{
            margin-inline: -5px;
            margin-top: -68px;
        }
    }
    @media (max-width: 501px) {
        .profile-banner{
            margin-top: -120px;
            margin-inline: -5px;
        }
        .profile-logo{
            height: 100px;
            width: 100px;
        }
        .profile-logo img {
            height: 100px;
            width: 100px;
        }
        .song-detail-box{
            width: 100%;
            overflow: hidden;
        }
    }

    
`
