import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import './component.css'
import { Link } from 'react-router-dom'
import { PlayContext } from '../Context/PlayerContext'
import styled from 'styled-components'
import { Check } from '../Pages/Premium'

export default function Sidebar() {
    const { isCollapse, collapse, playListData, playlistsOnsidebar, deleteUserPlayList } = useContext(PlayContext)


    const [create, setCreate] = useState(false);
    const [playListName, setplayListName] = useState({
        id: "",
        name: "",
        track: []
    })

    const handleDelete = (id) => {
        console.log(id);
    }

    const createPlaylist = () => {
        const playlists = JSON.parse(localStorage.getItem("userPlayLists")) || [];
        playlists.push(playListName)
        localStorage.setItem("userPlayLists", JSON.stringify(playlists));
        setCreate(false);
        setplayListName({
            id: "",
            name: "",
            track: []
        })
        playlistsOnsidebar()
    }


    const handleChange = (e) => {
        if (!e.target.value == "") {
            setplayListName({ ...playListName, id: new Date().getTime().toString(), name: e.target.value });
        }
    }

    return (
        <>
            {
                collapse
                    ?
                    <div className='text-white side-bar-container d-flex flex-column p-2'>
                        <div className='inner-container'>
                            <div className='home-search-section d-flex flex-column p-3 gap-3'>
                                <Link to="/home" className='d-flex gap-3 align-items-center nav-link'>
                                    <img src={assets.home_icon} width={25} alt="Home" />
                                </Link>
                                <Link to="/search" className='d-flex nav-link gap-3 align-items-center' style={{ cursor: 'pointer' }}>
                                    <img src={assets.search_icon} width={25} alt="Search" />
                                </Link>
                            </div>
                            <div className='library-playlist-section mt-2'>
                                <div className='d-flex flex-column align-items-center gap-3 p-3'>
                                    {/* <img  src={assets.stack_icon} width={25} alt="Stack" />*/}
                                    <svg onClick={isCollapse} data-encore-id="icon" fill='white' role="img" aria-hidden="true" viewBox="0 0 24 24" className="Svg-sc-ytk21e-0 bneLcE"><path d="M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zm6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1z"></path></svg>
                                    <img src={assets.plus_icon} width={15} alt="Plus" />
                                </div>
                            </div>
                        </div>

                    </div>

                    : <Container className='col-2 side-bar-container text-white d-flex w-25 flex-column p-2'>
                        <div className='inner-container'>
                            <div className='home-search-section d-flex flex-column p-3 gap-3'>
                                <Link to="/home" className='d-flex gap-3 align-items-center nav-link'>
                                    <img src={assets.home_icon} width={25} alt="Home" />
                                    <p className='fw-bold'>Home</p>
                                </Link>
                                <Link to="/search" className='d-flex gap-3 nav-link align-items-center' style={{ cursor: 'pointer' }}>
                                    <img src={assets.search_icon} width={25} alt="Search" />
                                    <p className='fw-bold'>Search</p>
                                </Link>
                            </div>
                            <div className='library-playlist-section mt-2'>
                                <div className='d-flex p-3 gap-3 justify-content-between'>
                                    <div onClick={isCollapse} className='d-flex gap-3 align-items-center'>
                                        <img src={assets.stack_icon} className='filt' width={25} alt="Stack" />
                                        <p className='fw-semibold'>Your Library</p>
                                    </div>
                                    <div className='d-flex gap-3 align-items-center '>
                                        <img src={assets.plus_icon} className={`plus-icon ${create ? `rotate` : ''}`} width={15} alt="Plus" onClick={() => setCreate(!create)} />
                                        <img src={assets.arrow_icon} width={15} alt="Arrow" />
                                    </div>
                                </div>

                                {
                                    playListData?.length > 0
                                        ?
                                        <div className='playList-section'>
                                            {
                                                playListData && playListData.map((obj, index) => (
                                                    <div className='create-playlist-card d-flex align-items-center p-2 px-3 mx-2 mt-2' key={obj.id}>
                                                        <Link to={`section/${obj.id}`} className=' nav-link d-flex gap-2  '>
                                                            <div className='playlist-icon text-center align-content-center'>
                                                                <i className="bi bi-music-note-beamed"></i>
                                                            </div>
                                                            <div>
                                                                <p className='fw-semibold'>{obj.name}</p>
                                                                <p className='txt-playlist'>Playlist</p>
                                                            </div>
                                                        </Link>
                                                        <div onClick={() => deleteUserPlayList(obj.id)} className='delete-playlist ms-auto'><i className="bi bi-x-square"></i></div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        :
                                        <>
                                            <div className='create-playlist-card p-3 mx-2 mt-3'>
                                                <p className='fw-bold mb-1'>Create your first playlist</p>
                                                <p className='fw-semibold mb-1'>It's easy, we'll help you</p>
                                                <button onClick={() => setCreate(!create)} className='btn fw-semibold btn-sm bg-white text-black rounded-pill px-3 mt-2'>Create playlist</button>
                                            </div>
                                            {/* <div className={`user-playlist-input ${create ? 'show' : ''}`}>
                                                <div className='mx-2 mt-2 d-flex gap-2 align-items-center'>
                                                    <PlayListName onChange={handleChange} value={playListName.name} placeholder='Enter Playlist Name' />
                                                    <Check onClick={createPlaylist}><i className="bi bi-check2"></i></Check>
                                                </div>
                                            </div> */}
                                        </>

                                }
                                <div className={`user-playlist-input ${create ? 'show' : ''}`}>
                                    <div className='mx-2 mt-2 d-flex gap-2 align-items-center'>
                                        <PlayListName onChange={handleChange} value={playListName.name} placeholder='Enter Playlist Name' />
                                        <Check onClick={createPlaylist}><i className="bi bi-check2"></i></Check>
                                    </div>
                                </div>
                                <div className={`create-playlist-card  podcast p-3 ${create ? 'show' : ''} mx-2 mt-4`}>
                                    <p className='fw-bold mb-1'>Let's find some podcasts to follow</p>
                                    <p className='fw-semibold mb-1'>We'll keep you updated on new episodes</p>
                                    <Link to='/podcasts' className='btn fw-semibold btn-sm bg-white text-black rounded-pill px-3 mt-2'>Browse Podcasts</Link>
                                </div>
                            </div>
                        </div>
                    </Container>
            }
        </>

    )
}


const PlayListName = styled.input`
  font-weight: 500;
  color: #fff;
  background-color: rgb(28,28,30);
  box-shadow: 0 0 .4vw rgba(0,0,0,0.5), 0 0 0 .15vw transparent;
  border-radius: 0.4vw;
  border: none;
  outline: none;
  padding: 0.4vw;
  max-width: 160px;
  transition: .4s;
    &:hover {
        box-shadow: 0 0 0 .15vw rgba(135, 207, 235, 0.186);
    }

    &:focus {
        box-shadow: 0 0 0 .15vw skyblue;
    }
`

const Container = styled.div`
    .create-playlist-card{
        z-index: 6 !important;
        position: relative;
    }
    .user-playlist-input{
        opacity: 0;
    }
    .user-playlist-input , .create-playlist-card.podcast  {
        transition: 0.3s all ease;
        transform: translateY(-50px); 
    }
    .user-playlist-input.show ,.create-playlist-card.podcast.show {
        transition: 0.3s all ease;
        transform: translateY(0px);
        z-index: 1; 
        opacity : 1;
    }

    .playlist-icon{
        width: 50px;
        height: 50px;
        font-size: 25px;
        background: linear-gradient(180deg, #9a9a9a 0%, #353535 100%);
        border-radius: 5px;
    }
    .txt-playlist{
        opacity: 0.75;
        font-size: 14px;
    }

    .playList-section{
        max-height: 200px;
        overflow: auto;
    }
    .plus-icon.rotate{
        rotate: 45deg;
    }
    .plus-icon {
        transition: 0.3s all;
    }
    .delete-playlist{
        display: none;
    }
    .create-playlist-card:hover{
        .delete-playlist{
            display: block;
        }
    }
`