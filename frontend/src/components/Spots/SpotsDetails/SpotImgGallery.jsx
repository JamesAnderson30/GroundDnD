import './SpotImage.css'

function SpotImgGallery({imgs}){
    /*
      Is it okay to spend so much time to normalize data
      just so it's easier to plug into the jsx?

      TODO: This only really impliments a maximum of four images in the gallery
      TODO: Image gallery loop uses a single digit iterator integer as a key, make more unique
    */

    const GALLERY_SIZE = 4;

    let gallery = Array(GALLERY_SIZE).fill(false);
    let preview = false;

    if(!imgs){
      return (
        <div>No images</div>
      )
    }

    //This sorts the imgs props into the preview and gallery

    for(let i = 0; i < imgs.length; i++){
      //console.log("img: ", imgs[i]);
      console.log("imgs: ", imgs);

      let img = imgs[i];
      console.log("img: ",img);
      if(img.preview){
        preview = img;
      } else {
        gallery[i] = img
      }
    }

    return (
      <div id={"SpotImages"}>
        <div>
          <img id="previewImage" src={preview.url}/>
        </div>
        <div id="imgGallery">
          {gallery.map((img, i)=>{
            if(img){
              return (
                <div key={i} className='imgGalleryItemSize'><img src={img.url} key={i}/></div>
              )
            } else {
              return (
                <div key={i} className="imgGalleryItemSize">&nbsp;</div>
              )
            }
          })}
        </div>
      </div>
    )
}

export default SpotImgGallery;
