import React from 'react'
import './Posts.css'
import './Results.css'
import VideoCard from './VideoCard'
import FlipMove from 'react-flip-move'

const Posts = ({ currentPosts }) => {
    return (
        <FlipMove className="results">
            {currentPosts.map(movie =>
                <>
                    <VideoCard key={movie.id} videoId={movie.id} movie={movie} />
                </>
            )}

            {/* <Paginate /> */}
        </FlipMove>
    )
}

export default Posts
