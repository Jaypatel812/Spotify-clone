import React, { useContext, useEffect } from 'react'
import Sidebar from './Sidebar'
import HeroSec from './HeroSec'
import Player from './Player'
import { PlayContext } from '../Context/PlayerContext'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ViewAlbum from '../Pages/ViewAlbum'

export default function Main() {
    const { audioRef, track } = useContext(PlayContext)
    const redirect = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            redirect("/");
        }
    })

    return (
        <div>
        </div>
    )
}
