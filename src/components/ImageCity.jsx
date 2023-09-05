import React from 'react'

const ImageCity = ( { image } ) => {
  return (
    <div className='images__pixabay'>
      <img src={image?.hits[0].userImageURL} alt="" />
    </div>
  )
}

export default ImageCity
