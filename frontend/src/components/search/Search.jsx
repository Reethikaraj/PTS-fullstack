import { Button, Box } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../MetaData'
import './Search.css'

const Search = ({ history }) => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const searchSubmitHandler = (e) => {
    // e.preventDefault()
    if (keyword.trim()) {
      navigate(`/products/${keyword}`)
    } else {
      navigate('/products')
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 2,
        width: '100%',
        position: 'relative',
        top: '11vh',
      }}
    >
      <MetaData title='Search -- PTS' />
      <form className='searchBox' onSubmit={searchSubmitHandler}>
        <input
          type='text'
          placeholder='Search...'
          onChange={(e) => (setKeyword(e.target.value), searchSubmitHandler)}
        />
      </form>
      <Button variant='fill'>Search</Button>
    </Box>
  )
}

export default Search
