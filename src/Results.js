import React, { useEffect, useState } from 'react'
import './Results.css'
import axios from './axios'
// import Paginate from './Paginate'
import Pagination from './Paginate'
import Posts from './Posts'


const Results = ({ selectedOption }) => {
    const [movies, setMovies] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(8)

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(selectedOption)
                .then(({ data }) => setMovies(data.results))
            return request
        }
        fetchData()
    }, [selectedOption])

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = movies.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    // console.log('current posts are :', currentPosts);
    return (
        <div className="results">
            <Posts currentPosts={currentPosts} />
            <Pagination postsPerPage={postsPerPage} totalPosts={movies.length} paginate={paginate} />


        </div>
    )
}

export default Results
