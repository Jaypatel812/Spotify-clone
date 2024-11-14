import React, { useContext, useEffect } from 'react'
import { albumsData } from '../assets/assets'
import Albums from './Albums'
import { PlayContext } from '../Context/PlayerContext'
import Playlist from './Playlist'
import Podcasts from './Podcasts';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode } from 'swiper/modules';
import { Link } from 'react-router-dom'



export default function Home() {
    const { featuredPlaylist, podcastList, gujaratiHits } = useContext(PlayContext);

    return (
        <div className='text-white'>
            <div className='px-2 filter-btn py-2 d-flex gap-2'>
                <button className='btn btn-sm px-3 bg-white text-black rounded-pill'>All</button>
                <button className='btn-music btn btn-sm bg-black px-3 text-white rounded-pill'>Music</button>
                <button className='btn-podcasts btn btn-sm px-3 text-white rounded-pill'>Podcasts</button>
            </div>
            <div>
                <h1 className='header-text mt-2'>Welcome</h1>
            </div>
            {
                localStorage.getItem("token") ?
                    featuredPlaylist && gujaratiHits ?
                        <>
                            <div className='mb-4 text-white'>
                                <p className='px-2 fw-bold fs-3'>Featured PlayLists</p>
                                <Swiper modules={[FreeMode]} slidesPerView={'auto'} freeMode={true} className='d-flex' >
                                    {
                                        featuredPlaylist && featuredPlaylist.map((item, index) => (
                                            <SwiperSlide key={index}>
                                                <Playlist image={item.image} name={item.name} desc={item.desc} id={item.id} />
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </div>
                            <div className='mb-4 text-white'>
                                <div className='px-2 d-flex align-items-center'>
                                    <p className='fw-bold fs-3'>Popular Shows</p>
                                    <Link to='/podcasts' className='px-3 py-1 rounded-pill ms-auto nav-link show-all'>Show all </Link>
                                </div>

                                <div className='d-flex overflow-auto invisible-scrollbar'>
                                    {
                                        podcastList && podcastList.map((item, index) => (
                                            <Podcasts key={index} image={item.images} name={item.name} publisher={item.publisher} id={item.id} />
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='mb-4 text-white'>
                                <p className='px-2 fw-bold fs-3'>Gujarati Special</p>
                                <Swiper modules={[FreeMode]} slidesPerView={'auto'} freeMode={true} className='d-flex' >
                                    {
                                        gujaratiHits && gujaratiHits.map((item, index) => (
                                            <SwiperSlide key={index}>
                                                <Playlist image={item.image} name={item.name} desc={item.desc} id={item.id} />
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </div>
                        </>
                        : ""
                    : <h1 className='text-center my-5'>Login To Play Music</h1>
            }
        </div >
    )
}

