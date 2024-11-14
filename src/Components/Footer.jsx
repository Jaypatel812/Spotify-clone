import React from 'react'
import styled from 'styled-components'

export default function Footer() {

    return (
        <>
            <Container className='mt-5'>
                <div>
                    <li className='active'>Compny</li>
                    <li>About</li>
                    <li>Jobs</li>
                    <li>For the Record</li>
                </div>
                <div>
                    <li className='active'>Communities</li>
                    <li> For Artists</li>
                    <li>Developers</li>
                    <li>Advertising</li>
                    <li>Investors</li>
                    <li>Vendors</li>
                </div>
                <div>
                    <li className='active'>Useful links</li>
                    <li>Support</li>
                    <li>Free Mobile App</li>
                </div>
                <div>
                    <li className='active'>Spotify Plans</li>
                    <li>Premium Individual</li>
                    <li>Premium Duo</li>
                    <li>Premium Family</li>
                    <li>Premium Student</li>
                    <li>Spotify Free</li>
                </div>
                <div className='d-flex'>
                    <span><i className="bi bi-instagram"></i></span>
                    <span><i className="bi bi-twitter"></i></span>
                    <span><i className="bi bi-facebook"></i></span>
                </div>
            </Container>
            <hr className='opacity-100 mx-sm-5 text-secondary' />
            <FooterEndBar>
                <div className='footerTexts d-flex gap-3 ms-5 mt-5'>
                    <p>Legal</p>
                    <p>Safety & Privacy Center</p>
                    <p>Privacy Policy</p>
                    <p>Cookies</p>
                    <p>About Ads</p>
                    <p>Accessibility</p>
                    <p className='ms-sm-auto me-sm-5'>© 2024 Spotify AB</p>
                </div>
            </FooterEndBar>
        </>
    )
}

const Container = styled.div`
    display: flex;
    color: #b6b6b6;
    list-style: none;
    justify-content: space-between;
    margin-inline: 30px;
    font-size: 14px;
    .active{
        font-weight: bold;
        color: white;
    }
    li{
        margin: 5px;
        &:hover{
        text-decoration: underline;
        cursor: pointer;
        color: white;
    }
    }
    span i {
        background-color: #242424;
        padding: 10px 13px;
        margin: 5px;
        border-radius: 50%;
        color: white;
        font-size: 15px;
        &:hover{
            background-color: #484848;
        }
    }
    @media (max-width: 769px) {
        flex-wrap: wrap;
        gap: 20px;
        margin-inline: 5px;
    }
    @media (max-width: 376px) {
        flex-direction: column;
        gap: 20px;
        margin-inline: 5px;
    }
    `
const FooterEndBar = styled.div`
        font-size: 14px;
        margin-bottom: 80px;
        color: #B3B3B3;
        font-weight: 600;
        p {
            &:hover{
            color: white;
            cursor: pointer;
        }
    }
    @media (max-width: 500px) {
        margin-bottom: 50px;
        .footerTexts{
            flex-wrap: wrap;
            margin-left: 0.25rem !important;
        }
    }
    `