import React, { useEffect, useState } from 'react'
import './Results.css'
import VideoCard from './VideoCard'
import axios from './axios'
import FlipMove from 'react-flip-move'


const Results = ({ selectedOption }) => {
    const [movies, setMovies] = useState([])
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(selectedOption)
                .then(({ data }) => setMovies(data.results))
            return request
        }
        fetchData()
    }, [selectedOption])
    return (
        <div className="results">
            <FlipMove className="results">
                {movies
                    .map(movie =>

                        <VideoCard key={movie.id} videoId={movie.id} movie={movie} />
                    )}
            </FlipMove>

        </div>
    )
}

export default Results
