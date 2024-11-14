import React, { useContext, useEffect, useRef } from "react";
import { PlayContext } from "./Context/PlayerContext";
import Connect from "./Components/Connect";
import { Route, Routes, useLocation } from "react-router-dom";
import ViewAlbum from "./Pages/ViewAlbum";
import Sidebar from "./Components/Sidebar";
import Player from "./Components/Player";
import HeroSec from "./Components/HeroSec";
import View_Playlist from "./Pages/View_Playlist";
import Footer from "./Components/Footer";
import Premium from "./Pages/Premium";
import Navbar from "./Components/Navbar";
import Profile from "./Pages/Profile";

import View_Podcast from "./Pages/View_Podcast";
import Browse_podcast from "./Pages/Browse_podcast";
import Section from "./Pages/Section";
import Search from "./Pages/Search";

function App() {
  const { audioRef, track, getUserProfile, getFeaturedPlaylists, getGujaratiHits, getPodcastList, playlistsOnsidebar } = useContext(PlayContext)
  const token = localStorage.getItem("token")
  const albumRef = useRef();
  const { pathname } = useLocation();
  useEffect(() => {
    document.getElementById("hero_body").scrollTo(0, 0);
  }, [pathname])

  useEffect(() => {
    if (token) {
      getUserProfile();
      getFeaturedPlaylists();
      getPodcastList();
      playlistsOnsidebar();
      getGujaratiHits();
    }
  }, [token])

  return (
    <>
      <div className="App bg-black overflow-auto vh-100">
        <div className="d-flex w-100" style={{ height: "90vh" }}>
          <Sidebar />

          <div ref={albumRef} id="hero_body" className='hero-section overflow-auto my-2 me-2' >
            <Navbar />
            <Routes>
              <Route path="/" element={<Connect />} />
              <Route path="/home" element={<HeroSec />} />
              <Route path="/album/:id" element={<ViewAlbum />} />
              <Route path="/playlist/:id" element={<View_Playlist />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/podcasts" element={<Browse_podcast />} />
              <Route path="/search" element={<Search />} />
              <Route path="/podcasts/:id" element={<View_Podcast />} />
              <Route path="/section/:id" element={<Section />} />
            </Routes>
            <Footer />
          </div>
        </div>
        <Player />
        <audio ref={audioRef} src={track?.context_uri} preload='auto' autoPlay></audio>
      </div>
    </>
  );
}

export default App;
