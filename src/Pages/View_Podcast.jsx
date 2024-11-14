import React, { useContext, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { PlayContext } from '../Context/PlayerContext';
import styled from 'styled-components';
import Loader from '../Components/Loader';
import Color from "color-thief-react";
import { assets } from '../assets/assets';

const Loading = () => <div>Loading...</div>;

export default function View_Podcast() {
    const { getPodcast, podcast, playPodcast } = useContext(PlayContext)
    const { id } = useParams();
    const bgRef = useRef();
    useEffect(() => {
        getPodcast(id);

    }, [])
    const imgSrc = podcast?.images;
    const msToMinutePodcast = (ms) => {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor((ms % 60000) / 1000).toFixed(0);

        if (hours > 0) {
            return hours + " hr " + (minutes < 10 ? "0" : "") + minutes + " min ";
        } else {
            return minutes + " min " + (seconds < 10 ? "0" : "") + seconds + " sec ";
        }
    };


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
                podcast.length < 1 ?
                    <div className='d-flex align-items-center h-100 justify-content-center'>
                        <Loader />
                    </div>
                    :
                    <>
                        <div ref={bgRef} className='d-sm-flex col-12 px-sm-3 px-2 pb-3 gap-sm-3 align-items-end podcast-head'>
                            <div className='text-center'>
                                <img src={podcast?.images} className='rounded' width={150} height={150} alt="podcast" />
                            </div>
                            <div className='col-sm-9 mt-3 mt-sm-0'>
                                <p className='fw-semibold'>Podcast</p>
                                <p className='podcast-name text-truncate' data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Tooltip on top">{podcast?.name}</p>
                                <p className='podcast-publisher'>{podcast?.publisher}</p>
                            </div>
                        </div>
                        <div className='px-3 my-3 fs-3 fw-bold'>
                            All Episodes
                        </div>
                        <div className='px-md-3 px-2'>
                            {
                                podcast?.episodes && podcast?.episodes.map((item, index) => (
                                    <div key={item.id} className="podcast-card col-12 d-sm-flex  gap-sm-3 py-3 px-2" onClick={() => playPodcast(index, item.id, item.name, item.context_uri, item.image, item.imgForPlayer, podcast?.name)}>
                                        <div className='mb-3 mb-sm-0'>
                                            <img src={item.imgForPlayer.url} className='rounded' height={100} width={100} alt="" />
                                        </div>
                                        <div className='col-sm-9'>
                                            <div className='mb-3'>
                                                <p className='truncate podcast-title'>{item.name}</p>
                                                <p className='podcast-desc'>{podcast?.name}</p>
                                            </div>
                                            <div className='mb-3 podcast-desc truncate'>
                                                {item.description}
                                            </div>
                                            <div className='mb-2 d-flex align-items-center justify-content-between'>
                                                <div>
                                                    Apr 2023 {msToMinutePodcast(item.duration)}
                                                </div>
                                                <div className='rounded-circle play-pause me-3'>
                                                    <img src={assets.play_icon} alt="Play" height={15} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
            }
        </Container>
    )
}

const Container = styled.div`
    color: white;
    .podcast-head{
        line-height: 1.2;
        min-height: 250px;
        padding-top: 85px;
        margin-top: -68px;
    }
    .podcast-name{
        font-size: clamp(1.875rem, 1.3816rem + 2.6316vw, 3.75rem);
        font-weight: bold;
    }
    .podcast-publisher{
        font-size: clamp(1.25rem, 1.1842rem + 0.3509vw, 1.5rem);
        font-weight: bold;
    }
    .podcast-card{
        max-width: 550px;
        min-width: 280px;
        border-top: 2px solid #242424 ;
        line-height: normal;
        border-radius: 5px;
    &:hover{
        cursor: pointer;
        background-color: #242424;
        .play-pause {
            background-color: #00db00;
            }
        }
    }
    .truncate{
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .play-pause{
        height: 30px;
        width: 30px;
        align-content: center;
        text-align: center;
        background-color: white;
    }
    .play-pause > img{
        margin: auto;
        margin-top: -4px;
        filter: brightness(-100%);
    }
    .podcast-title{
        font-size: 16px;
        font-weight: 500;
        &:hover{
            text-decoration: underline;
        }
    }
    .podcast-desc{
        font-size: 14px;
        font-weight: 500;
        color: grey;
    }

    @media (max-width:769px){
        .podcast-name{
        white-space: normal !important;
    }
    }
        
`
