import React, { createContext, useEffect, useRef, useState } from 'react'
import { songsData } from '../assets/assets';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export const PlayContext = createContext();

export default function PlayerContext(props) {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const seekBgMobile = useRef();
    const seekBarMobile = useRef();
    const seekBgPlayer = useRef();
    const seekBarPlayer = useRef();
    const volumeRef = useRef();
    const volumeBar = useRef();
    const [currentPlaying, setCurrentPlaying] = useState("song")
    const [collapse, setCollapse] = useState(false);
    const [playList, setPlayList] = useState([]);
    const isCollapse = () => {
        setCollapse(!collapse);
    }
    const [navbarBg, setNavbarBg] = useState("#343434")
    const [usersTopTrack, setUsersTopTrack] = useState([]);
    const [userData, setUserData] = useState([]);
    const [track, setTrack] = useState([]);
    const [searchedList, setSearchedList] = useState([])
    const [featuredPlaylist, setFeaturedPlaylist] = useState([]);
    const [gujaratiHits, setGujaratiHits] = useState([]);
    const [playStatus, setPlayStatus] = useState(false);
    const [album, setAlbum] = useState([]);
    const [podcastList, setPodcastList] = useState([]);
    const [podcast, setPodcast] = useState([]);
    const [time, setTime] = useState({
        currentTime: {
            second: "00",
            minute: "00"
        },
        totalTime: {
            second: "00",
            minute: "00"
        }
    })
    const [playListData, setPlayListdata] = useState([]);
    const [playListTracks, setPlayListTracks] = useState([]);

    const playlistsOnsidebar = () => {
        const data = JSON.parse(localStorage.getItem("userPlayLists"))
        setPlayListdata(data)
    }

    const deleteUserPlayList = (playListId) => {
        const updatePlayList = playListData.filter((id) => id.id !== playListId)
        localStorage.setItem("userPlayLists", JSON.stringify(updatePlayList))
        playlistsOnsidebar()
    }



    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playWithId = async (id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true)
    }

    const msToMinute = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000).toFixed(0);

        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }



    const previous = async () => {
        if (currentPlaying == "song") {
            if (track.index > 0) {
                await setTrack(playList[0]?.tracks[track?.index - 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        }
        else if (currentPlaying == "podcast") {
            if (track.index > 0) {
                await setTrack(podcast?.episodes[track?.index - 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        }
    }

    const next = async () => {
        if (currentPlaying == "song") {
            if (track.index < playList[0]?.tracks.length - 1) {
                await setTrack(playList[0]?.tracks[track?.index + 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        }
        else if (currentPlaying == "podcast") {
            if (track.index < podcast?.episodes.length - 1) {
                await setTrack(podcast?.episodes[track?.index + 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        }
        else if (currentPlaying == "userPlayList") {
            if (track.index < playListTracks[0]?.track.length - 1) {
                await setTrack(playListTracks[0]?.track[track?.index + 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        }

    }

    if (audioRef.current) {
        audioRef.current.onended = () => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setTimeout(() => {
                next();
            }, 150);
        }
    }



    const volumeControl = (e) => {
        audioRef.current.volume = (e.nativeEvent.offsetX / 100);
        volumeBar.current.style.width = (e.nativeEvent.offsetX) + "px"
    }

    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
    }
    const seekSongMobile = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBgMobile.current.offsetWidth) * audioRef.current.duration)
    }
    const seekMobilePlayer = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBgPlayer.current.offsetWidth) * audioRef.current.duration)
    }
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const token = localStorage.getItem("token")

    const getMusic = async (id) => {
        const res = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            }
        })

        const madeForYou = {
            id: res.data.id,
            name: res.data.name,
            desc: res.data.description,
            image: res.data.images[0].url,
            tracks: res.data.tracks.items?.map(({ track }, index) => {
                return (
                    {
                        id: track.id,
                        index: index,
                        name: track.name,
                        artists: track.artists.map((artist) => artist.name),
                        image: track.album.images[2],
                        imgForPlayer: track.album.images[1],
                        duration: track.duration_ms,
                        album: track.album.name,
                        context_uri: track.preview_url,
                        track_number: track.track_number
                    }
                )
            })
        }
        let playListData = []
        playListData.push(madeForYou)
        setPlayList(playListData);
    }

    const addToPlayList = (songID, songName, songArtists, songImage, playerImage, songLink, songNumber, userPlayListId, duration_ms, albumName) => {
        const data = JSON.parse(localStorage.getItem("userPlayLists"))
        let filterdData = data.filter((id) => id.id == userPlayListId);
        let allData = data.filter((id) => id.id !== userPlayListId);

        let songIndex = filterdData[0].track.length
        const selectedPlayList = {
            id: songID,
            index: songIndex,
            name: songName,
            artists: songArtists,
            image: songImage,
            imgForPlayer: playerImage,
            context_uri: songLink,
            track_number: songNumber,
            duration: duration_ms,
            album: albumName,
        }
        if (filterdData[0].track.filter((id) => id.id == songID).length > 0) {
            alert("Na ho payega")
        }
        else {
            filterdData[0].track.push(selectedPlayList);
            const newData = allData.concat(filterdData);
            localStorage.setItem("userPlayLists", JSON.stringify(newData));
            handleClick()
        }
        playlistsOnsidebar()
    }

    const getUserProfile = async () => {
        const res = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            }
        });
        setUserData(res.data);

        const userTracks = await axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5', {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            }
        });
        const userTopTracks = {
            items: userTracks.data.items.map((item) => ({
                id: item.id,
                name: item.name,
                artists: item.artists.map((artist) => artist.name),
                duration: item.duration_ms,
                image: item.album.images[2],
                imgForPlayer: item.album.images[1],
                album_name: item.album.name,
                context_uri: item.preview_url,
                track_number: item.track_number
            }))
        }
        setUsersTopTrack(userTopTracks);
    }

    const searchList = async (query) => {
        if (query !== "") {

            const res = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=album%2Cplaylist&limit=5&include_external=audio`, {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                }
            });
            // console.log(res.data);

            const searchedAlbums = {
                items: res.data.albums.items.map((obj) => ({
                    id: obj.id,
                    name: obj.name,
                    release_date: obj.release_date,
                    artists: obj.artists.map((artist) => artist.name),
                    images: obj.images[0].url
                }))
            }
            const searchedPlaylists = {
                items: res.data.playlists.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    desc: item.description,
                    image: item.images[0].url,
                }))
            }

            setSearchedList({
                albums: searchedAlbums,
                playlists: searchedPlaylists
            })
        }
        else if (query == "") {
            setSearchedList([])
        }
    }


    const getFeaturedPlaylists = async () => {
        const res = await axios.get(`https://api.spotify.com/v1/browse/featured-playlists`, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            }
        })
        const featuredPlaylists = res.data.playlists.items.map((item) => {
            return ({
                id: item.id,
                name: item.name,
                desc: item.description,
                image: item.images[0].url,
            })
        })
        setFeaturedPlaylist(featuredPlaylists);
    }
    const getGujaratiHits = async () => {
        const res = await axios.get(`https://api.spotify.com/v1/search?q=gujrati&type=playlist&include_external=audio`, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            }
        })

        const gujaratiPlaylists = res.data.playlists.items.map((item) => {
            return ({
                id: item.id,
                name: item.name,
                desc: item.description,
                image: item.images[0].url,
            })
        })
        setGujaratiHits(gujaratiPlaylists);
    }
    const getAlbum = async (id) => {
        const res = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            }
        })

        const viewAlbum = {
            id: res.data.id,
            name: res.data.name,
            desc: res.data.artists.map((artist) => artist.name),
            image: res.data.images[0].url,
            imgForPlayer: res.data.images[1],
            tracks: res.data.tracks.items?.map((track, index) => {
                return (
                    {
                        id: track.id,
                        index: index,
                        name: track.name,
                        artists: track.artists.map((artist) => artist.name),
                        duration: track.duration_ms,
                        context_uri: track.preview_url,
                        track_number: track.track_number
                    }
                )
            })
        }
        setAlbum(viewAlbum)
    }

    const getPodcastList = async () => {
        const res = await axios.get(`https://api.spotify.com/v1/shows?ids=736rhmW7vilNgkFFo8aDz4%2C6ZcvVBPQ2ToLXEWVbaw59P%2C5EqqB52m2bsr4k1Ii7sStc%2C4IRmcxkSPkYQcWUleBh71A%2C0TcsI1YxWMIUpXR6ARY3dO%2C01TLX7NRtS7T4NZmLpuwdt`, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            }
        })

        const showList = res.data.shows.map((item) => (
            {
                id: item.id,
                name: item.name,
                images: item.images[1]?.url,
                publisher: item.publisher
            }
        ))
        setPodcastList(showList);
    }

    const getPodcast = async (id) => {

        const show = await axios.get(`https://api.spotify.com/v1/shows/${id}`, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            }
        })

        const res = await axios.get(`https://api.spotify.com/v1/shows/${id}/episodes?limit=4`, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            }
        })
        const shows = {
            id: show.data.id,
            name: show.data.name,
            images: show.data.images[1]?.url,
            publisher: show.data.publisher,
            episodes: res.data.items.map((item, index) => ({
                id: item.id,
                index: index,
                name: item.name,
                artists: show.data.name,
                context_uri: item.audio_preview_url,
                description: item.description,
                image: item.images[2],
                imgForPlayer: item.images[1],
                duration: item.duration_ms
            }))
        }
        setPodcast(shows);
    }

    const playTrack = async (songID, songName, songArtists, songImage, songLink, songNumber, songIndex, playerImage) => {
        const currentSong = {
            id: songID,
            name: songName,
            index: songIndex,
            artists: songArtists,
            image: songImage,
            imgForPlayer: playerImage,
            context_uri: songLink,
            track_number: songNumber
        }
        setCurrentPlaying("song")
        await setTrack(currentSong);
        await audioRef.current.play();
        setPlayStatus(true);
    }
    const playPlayListTrack = async (songID, songName, songArtists, songImage, songLink, songNumber, songIndex, playerImage) => {
        const currentSong = {
            id: songID,
            name: songName,
            index: songIndex,
            artists: songArtists,
            image: songImage,
            imgForPlayer: playerImage,
            context_uri: songLink,
            track_number: songNumber
        }
        setCurrentPlaying("userPlayList")
        await setTrack(currentSong);
        await audioRef.current.play();
        setPlayStatus(true);
    }

    const playPodcast = async (podIndex, podId, podName, podLink, podImage, podPlayerImage, podDesc) => {
        const currentPodcast = {
            id: podId,
            name: podName,
            index: podIndex,
            artists: podDesc,
            image: podImage,
            imgForPlayer: podPlayerImage,
            context_uri: podLink,
        }
        setCurrentPlaying("podcast")
        await setTrack(currentPodcast);
        await audioRef.current.play();
        setPlayStatus(true);
    }

    useEffect(() => {
        if (audioRef.current) {
            setTimeout(() => {
                audioRef.current.ontimeupdate = () => {
                    seekBarMobile.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%"
                    seekBarPlayer.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%"
                    seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%"
                    setTime({
                        currentTime: {
                            second: (Math.floor(audioRef.current.currentTime % 60) < 10 ? "0" : "") + Math.floor(audioRef.current.currentTime % 60),
                            minute: Math.floor(audioRef.current.currentTime / 60)
                        },
                        totalTime: {
                            second: (Math.floor(audioRef.current.duration % 60) < 10 ? "0" : "") + Math.floor(audioRef.current.duration % 60),
                            minute: (Math.floor(audioRef.current.duration / 60))
                        }
                    })
                }
            }, 1000);
        }
    }, [audioRef])


    const contextValue = {
        audioRef, seekBg, seekBar, volumeRef, volumeBar, seekBarMobile, seekBgMobile,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        token,
        playList, setPlayList,
        navbarBg, setNavbarBg,
        collapse,
        userData,
        podcastList,
        podcast, setPodcast,
        usersTopTrack,
        featuredPlaylist,
        gujaratiHits,
        open,
        album, setAlbum,
        searchedList,
        playListData, setPlayListdata,
        playListTracks, setPlayListTracks,
        play, pause, playWithId, previous, next, seekSong, volumeControl, isCollapse, getMusic, msToMinute,
        playTrack, getUserProfile, getFeaturedPlaylists, seekSongMobile, seekMobilePlayer, seekBgPlayer, seekBarPlayer,
        getPodcastList, getPodcast, playPodcast, playlistsOnsidebar, addToPlayList, handleClose, action,
        playPlayListTrack, getGujaratiHits, searchList, getAlbum, deleteUserPlayList
    }
    return (
        <PlayContext.Provider value={contextValue}>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Track Added to Playlist!"
                action={action}
            />
            {props.children}
        </PlayContext.Provider>
    )
}
