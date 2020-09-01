import React, { forwardRef } from 'react'
import './VideoCard.css'
import TextTruncate from 'react-text-truncate'
import ThumbUpSharpIcon from '@material-ui/icons/ThumbUpSharp';
import { Modal } from '@material-ui/core';
import { useEffect } from 'react';
import axios from './axios';

import PlayVideo from './PlayVideo';
const VideoCard = forwardRef(({ movie, videoId }, ref) => {
    const base_url = "https://image.tmdb.org/t/p/original/"
    const [open, setOpen] = React.useState(false);
    const [currentVideo, setCurrentVideo] = React.useState(null);

    const [video, setVideo] = React.useState(null)
    useEffect(() => {
        if (videoId) {
            const fetchData = async () => {
                const request = await axios.get(`https://api.themoviedb.org/3/movie/${videoId}/videos?api_key=${process.env.REACT_APP_HULU_API}&language=en-US`)
                    .then((res) => setVideo(res.data.results[0].key))
                    .catch(err => console.log(err))
                return request
            }
            fetchData()
            return () => {
                fetchData()
            }
        }
    }, [videoId])

    const handleOpen = () => {
        setOpen(true);
        setCurrentVideo(videoId)
    };


    const handleClose = () => {
        setOpen(false);
        setCurrentVideo(null)
    };
    console.log(video)

    return (
        <div ref={ref} className="videoCard" >
            <img src={`${base_url}${movie.backdrop_path || movie.poster_path}`} alt="" onClick={handleOpen} />
            <TextTruncate
                line={1}
                element="p"
                truncateText="..."
                text={movie.overview}
            />
            <h2>{movie.original_name || movie.title}</h2>
            <p className="videoCard__stats">
                {movie.media_type && `${movie.media_type}`}
                &#8226;
                {movie.release_date || movie.first_air_date} &#8226;
                <ThumbUpSharpIcon />
                {movie.vote_count}
                {movie.vote_average}</p>
            <Modal
                style={{ display: 'grid', placeItems: "center" }}
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >

                {
                    video !== null &&
                    <iframe id="existing-iframe-example"
                        width="640" height="360"
                        // src={`https://www.youtube.com/embed/${video.key}?autoplay=1&enablejsapi=1`}
                        src={`https://www.youtube.com/embed/${video}?autoplay=1&enablejsapi=1`}
                        frameBorder="0"

                    ></iframe>
                }
                {/* <h1>{video.key}</h1> */}
            </Modal>
        </div>
    )
})

export default VideoCard
