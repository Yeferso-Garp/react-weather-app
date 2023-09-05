
const Images = ( { images } ) => {

    // console.log(images)

  return (
    <div className="images__pixabay">
      <img src={images?.hits[0].userImageURL} alt="" />
    </div>
  )
}

export default Images
