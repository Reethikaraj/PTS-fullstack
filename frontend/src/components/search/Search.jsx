import { Container } from '@mui/material'
import React, { useState, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../MetaData'
import './Search.css'

const Search = ({ history }) => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')

  const searchSubmitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/products/${keyword}`)
    } else {
      navigate('/products')
    }
  }

  return (
    <Fragment>
      <Container>
        <MetaData title='Search for a Product -- PTS' />
        <form className='searchBox' onSubmit={searchSubmitHandler}>
          <input
            type='text'
            placeholder='Search a Product ...'
            onChange={(e) => setKeyword(e.target.value)}
          />
          <input type='submit' value='Search' />
        </form>
      </Container>
    </Fragment>
  )
}

export default Search
