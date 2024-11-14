import React, { useContext } from 'react'
import Podcasts from './Podcasts'
import { PlayContext } from '../Context/PlayerContext'
import styled from 'styled-components'

export default function Browse_podcast() {
    const { podcastList } = useContext(PlayContext)
    return (
        <Container>
            <div className='podcast-header ps-3'>Podcast Charts</div>
            <div className='mt-3 px-3 fs-3 fw-bold'>All Shows</div>
            <div className='d-flex d-flex flex-wrap mt-3'>
                {
                    podcastList && podcastList.map((item, index) => (
                        <div className='podcast-card' key={index}>
                            <Podcasts image={item.images} name={item.name} publisher={item.publisher} id={item.id} />
                        </div>
                    ))
                }
            </div>
        </Container>

    )
}


const Container = styled.div`
    color: white;
    .podcast-header{
        margin-top: -68px;
        padding-top: 87px;
        font-size: clamp(1.875rem, 0.8882rem + 5.2632vw, 5.625rem);
        font-weight: bold;
        background : linear-gradient(180deg , #2C866D , #5b7870);
    }
    .podcast-card{
        width: 180px;
    }

    @media (max-width:769px){
        .podcast-header{
            margin-inline: -5px;
        }
    }
`