import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { PlayContext } from '../Context/PlayerContext'
import styled from 'styled-components'

export default function Player() {
    const { track, seekBg, seekBarMobile, seekBgMobile,
        seekMobilePlayer, seekBarPlayer, seekBgPlayer,
        volumeBar, volumeRef, seekBar, seekSongMobile, playStatus,
        play, pause, time, previous, next, seekSong, volumeControl } = useContext(PlayContext)
    useEffect(() => {

    }, [track])


    return (
        <>
            <Container className='d-flex align-items-center mx-3' style={{ height: "10vh" }}>

                {
                    track.length < 1 ? <h4 className='text-white my-auto text-center'> Play some Music...</h4 >
                        :
                        <>
                            <div className='d-flex gap-2 align-items-center col-sm-4' >
                                <img src={track?.image?.url} className='rounded object-fit-contain' height={50} alt="" />
                                <div className='song-name-desc text-white'>
                                    <p className='track-name'>{track?.name}</p>
                                    <p className='track-name'>
                                        {
                                            Array.isArray(track?.artists)
                                                ? track?.artists?.join(", ")
                                                : track?.artists
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className='align-items-center justify-content-center d-flex flex-column col-sm-4 gap-2' >
                                <div className='d-flex align-items-center player-btn-group gap-4'>
                                    <img src={assets.shuffle_icon} alt="Shuffle" className='object-fit-contain' height={15} />
                                    <img onClick={previous} src={assets.prev_icon} alt="Previous" height={15} />
                                    <div className='bg-white rounded-circle play-pause'>
                                        {
                                            playStatus
                                                ? <img onClick={pause} src={assets.pause_icon} alt="Pause" height={15} />
                                                : <img onClick={play} src={assets.play_icon} alt="Play" height={15} />
                                        }
                                    </div>
                                    <img onClick={next} src={assets.next_icon} alt="Next" height={15} />
                                    <img src={assets.loop_icon} alt="Loop" height={15} />
                                </div>
                                <div className='d-flex w-100 gap-3 text-white align-items-center'>
                                    <p>{time.currentTime.minute}:{time.currentTime.second}</p>
                                    <div onClick={seekSong} ref={seekBg} className='rounded seek-bar'>
                                        <hr ref={seekBar} className='rounded m-0' />
                                    </div>
                                    <p>{time.totalTime.minute}:{time.totalTime.second}</p>
                                </div>
                            </div>

                            <div className=' align-items-end d-flex  col-sm-4'>
                                <div className='d-flex w-100 px-2 justify-content-end align-items-center gap-3 opacity-75'>
                                    <img src={assets.volume_icon} alt="Loop" height={15} />
                                    <div onClick={volumeControl} ref={volumeRef} className='bg-white volume-bar rounded'>
                                        <hr ref={volumeBar} className='rounded m-0' />
                                    </div>
                                    <img src={assets.plays_icon} alt="Shuffle" className='object-fit-contain' height={15} />
                                </div>
                            </div>

                        </>
                }
            </Container>

            <MusicPlayer>
                <div className='d-flex gap-2 flex-column mx-1' style={{ height: "10vh" }}>
                    {
                        track.length < 1 ? <h4 className='text-white my-auto text-center'> Start Playing...</h4 >
                            :
                            <>
                                <div onClick={seekSongMobile} ref={seekBgMobile} className='mobile-seek-bar seek-bar'>
                                    <hr ref={seekBarMobile} className='rounded m-0' />
                                </div>
                                <div className='d-flex align-items-center mx-2 gap-2'>
                                    <img src={track?.image?.url} className='rounded object-fit-contain' height={40} alt="" />
                                    <div className='song-name-desc text-white' data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom">
                                        <p className='track-name'>{track?.name}</p>
                                        <p className='track-name'>
                                            {
                                                Array.isArray(track?.artists)
                                                    ? track?.artists?.join(", ")
                                                    : track?.artists
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        {
                                            playStatus
                                                ? <img onClick={pause} src={assets.pause_icon} alt="Pause" height={15} />
                                                : <img onClick={play} src={assets.play_icon} alt="Play" height={15} />
                                        }
                                    </div>
                                </div>
                            </>
                    }
                </div>

            </MusicPlayer>


            <MobilePlayer className="offcanvas offcanvas-bottom h-100 text-bg-dark" tabIndex={-1} id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasBottomLabel">Currently Playing</h5>
                    <span type="button" className="bi bi-chevron-down ms-auto text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
                </div>
                <div className="offcanvas-body">
                    <div>
                        <div className='d-flex player-banner'>
                            <img src={track.imgForPlayer?.url} className='mx-auto' alt="" />
                        </div>
                        <div className='mx-3 mt-2'>
                            <p className='track-name'>{track?.name}</p>
                            <p className='track-artists'>
                                {
                                    Array.isArray(track?.artists)
                                        ? track?.artists?.join(", ")
                                        : track?.artists
                                }
                            </p>
                        </div>
                        <div className="mt-2">
                            <div className='d-flex flex-column mx-2 gap-3' >
                                <div className='d-flex gap-3 text-white align-items-center'>
                                    <p>{time.currentTime.minute}:{time.currentTime.second}</p>
                                    <div onClick={seekMobilePlayer} ref={seekBgPlayer} className='rounded mobile-player-seekbar seek-bar'>
                                        <hr ref={seekBarPlayer} className='rounded m-0' />
                                    </div>
                                    <p>{time.totalTime.minute}:{time.totalTime.second}</p>
                                </div>
                                <div className='d-flex mx-3 player-btn-group align-items-center justify-content-around'>
                                    <img src={assets.shuffle_icon} alt="Shuffle" className='object-fit-contain' height={15} />
                                    <img onClick={previous} src={assets.prev_icon} alt="Previous" height={15} />
                                    <div className='bg-white rounded-circle play-pause'>
                                        {
                                            playStatus
                                                ? <img onClick={pause} src={assets.pause_icon} alt="Pause" height={20} />
                                                : <img onClick={play} src={assets.play_icon} alt="Play" height={20} />
                                        }
                                    </div>
                                    <img onClick={() => next()} src={assets.next_icon} alt="Next" height={15} />
                                    <img src={assets.loop_icon} alt="Loop" height={15} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MobilePlayer>
        </>
    )
}


const Container = styled.div`
    .track-name{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .song-name-desc{
        width: 50%;
    }
    .play-pause{
        height: 30px;
        width: 30px;
        align-content: center;
        text-align: center;
    }
    .play-pause > img{
        margin: auto;
        margin-top: -3px;
        filter: brightness(-100%);
    }
    @media (max-width: 769px) {
        display: none !important;
    }

`

const MusicPlayer = styled.div`
    display: none;
    .mobile-seek-bar{
        width: 100%;
    }
    .track-name{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .song-name-desc{
        width: calc(75%);
    }
    @media (max-width: 769px) {
        display: block;
        background-color: #242424;
    }
    
`

const MobilePlayer = styled.div`
    .player-banner > img{
        max-width: 100%;
        object-fit: contain;
        border-radius: 10px;
    }
    .track-name{
        font-size: clamp(1.125rem, 0.7519rem + 1.99vw, 1.375rem);
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .track-artists{
        font-size: clamp(0.875rem, 0.6884rem + 0.995vw, 1rem);
        color: #a8a8a8;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .mobile-player-seekbar{
        width: 100%;
    }
    .play-pause{
        height: 50px;
        width: 50px;
        align-content: center;
        text-align: center;
    }
    .play-pause > img{
        margin: auto;
        margin-top: -4px;
        filter: brightness(-100%);
    }
`