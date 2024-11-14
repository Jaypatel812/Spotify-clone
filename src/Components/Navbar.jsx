import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { PlayContext } from '../Context/PlayerContext'
import styled from 'styled-components'

export default function Navbar() {
    const { userData, navbarBg, setNavbarBg, playList } = useContext(PlayContext)
    const navigate = useNavigate()


    const logOut = () => {
        localStorage.removeItem("token")
    }
    // const { pathname } = useLocation();
    // const [isNavBg, setIsNavBg] = useState(false);
    // useEffect(() => {
    //     if (!pathname.includes("playlist")) {
    //         setIsNavBg(true)
    //     }
    //     else {
    //         setIsNavBg(false);
    //     }
    // }, [pathname]);
    // let checkBg = isNavBg ? '#343434' : navbarBg;





    return (
        <Container className='navbar'  >
            <div className='d-flex  w-100 align-items-center fw-semibold p-2'>
                <div className="navigation-icon d-flex align-items-center gap-2">
                    <img onClick={() => navigate(-1)} src={assets.arrow_left} className='p-2 rounded-circle' alt="" />
                    <img onClick={() => navigate(1)} src={assets.arrow_right} className='p-2 rounded-circle' alt="" />
                </div>
                {/* <div className='text-white'>{playList[0]?.name ? playList[0]?.name : ""}</div> */}
                <div className='text-white  ms-auto d-flex align-items-center gap-2'>
                    <div className='d-none d-sm-block'>
                        <Link to="/premium" className='btn fw-bold btn-sm bg-white text-black me-2 rounded-pill px-3'>Explore Premium</Link>
                        <a target='_blank' href='https://www.spotify.com/in-en/download/windows/' className='btn fw-bold btn-sm bg-black text-white rounded-pill px-3'><span className='bi bi-arrow-down-circle'></span>&nbsp;Install App</a>
                    </div>
                    <img src={assets.bell_icon} className='my-auto d-sm-block d-none rounded-circle bell-icon' alt="Bell" />
                    <Link to='/home' className='d-md-none d-block'>
                        <img src={assets.home_icon} className='my-auto rounded-circle bell-icon' alt="Home" />
                    </Link>
                    <div className='profile-icon-bg rounded-circle text-center' data-bs-toggle="dropdown">
                        <div className='profile-icon rounded-circle text-center'>
                            {
                                userData == "" ? "S" :
                                    userData?.images?.length > 0
                                        ?
                                        <img src={userData?.images[1]?.url} className='' width={30} height={30} alt="Profile" />
                                        : `${userData?.display_name?.slice(0, 1)}`
                            }
                        </div>
                    </div>
                    <ul className="dropdown-menu dropdown-menu-dark ms-auto">
                        <li><button className="dropdown-item" type="button">Account</button></li>
                        <li><Link to="/profile" className="dropdown-item" type="button">Profile</Link></li>
                        <li><Link to='/premium' className="dropdown-item" type="button">Upgrade to Premium</Link></li>
                        <li>
                            {
                                localStorage.getItem("token")
                                    ?
                                    < Link to='/' onClick={logOut} className="dropdown-item" type="button">Log Out</Link>
                                    :
                                    < Link to='/' className="dropdown-item" type="button">Log in</Link>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </Container >
    )
}



const Container = styled.div`
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  width: 100%;
  z-index: 2;
  animation: navScroll linear;
  animation-timeline: scroll();
    .toggle {
      position: relative;
    }
    .menu-icon{
        width: 30px;
        text-align: center;
        background-color: #242424;
        padding-inline: 10px;
        padding-block: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
    }
    .dropdown-menu > li {
        margin-inline: 5px !important;
    }
    .dropdown-menu{
        background-color: #282828;
        border-radius: 4px;
    }


@keyframes navScroll {
  0% {
    background: none;
  }
  15%,
  100% {
    background: #343434;
  }
}  

`