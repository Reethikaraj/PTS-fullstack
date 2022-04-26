import { Rating } from '@material-ui/lab'
import React from 'react'
import './ReviewCard.css'

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
    size: 'small',
  }

  return (
    <div className='reviewCard'>
      <img src='/assets/profile.png' alt='User' />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className='reviewCardComment'>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
