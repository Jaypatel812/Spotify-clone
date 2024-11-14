import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'


export default function Connect() {
    const redirect = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("token")) {
            redirect("/home");
        }
    }, [])
    const getAccess = () => {
        const clientId = "c0dbd50b142a42acba043dd81a80653e"
        // const redirectUrl = "http://localhost:3000/"
        const redirectUrl = "https://clone-spotify-web-app.netlify.app/"
        const apiUrl = "https://accounts.spotify.com/authorize"
        const scope = [
            "user-read-email",
            "user-read-private",
            "user-modify-playback-state",
            "user-read-playback-state",
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-read-playback-position",
            "user-top-read",
        ];

        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_daialog=true`;
        const hash = window.location.hash
        console.log(hash);
        if (hash) {
            const token = hash.substring(1).split("&")[0].split("=")[1]
            localStorage.setItem("token", token);
        }
    }

    return (
        <div>
            <div className="App bg-black text-white vh-100 d-flex align-items-center flex-column justify-content-center">
                <div className='d-flex align-items-center gap-2'>
                    <div>
                        <img src={assets.spotify_logo} width={60} alt="Spotify" />
                    </div>
                    <div>
                        <p className='fw-bold fs-5'>Spotify </p>
                        <p>Music for Everyone </p>
                    </div>

                </div>
                <div className='mt-3 mb-5'>
                    <button onClick={getAccess} type='button' className='btn bg-success text-white px-5 rounded-pill'>Connect</button>
                </div>
            </div>
        </div>
    )
}
