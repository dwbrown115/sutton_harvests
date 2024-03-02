import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";

import { firebase_app } from "../../../firebase";

export default function ListingPage() {
  const url = window.location.href;
  const db = getFirestore(firebase_app);

  const [listing, setListing] = useState<any>([]);
  const [images, setImages] = useState<any>([]);
  // const [imageIndex, setImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  async function getListing() {
    const listingId = url.split("/listing/");
    console.log(listingId[1]);
    const docRef = doc(db, "listings", listingId[1]);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data());
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setListing(docSnap.data());
      setImages(docSnap.data().images);
      // console.log(listing);
      // console.log(listing.title);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  // useEffect(() => {
  //   // console.log(listing.images);
  //   // console.log(images[0]);
  //   // console.log(images.length);
  //   // const imagesLength = images.length - 1;
  //   // console.log(imagesLength);
  //   // for (let i = 0; i < images.length; i++) {
  //   //   console.log(images[i]);
  //   // }
  //   // console.log(images[3]);
  // }, [images]);

  useEffect(() => {
    getListing();
  }, []);

  // useEffect(() => {
  //   console.log(selectedImage);
  //   console.log(images);
  //   console.log(images.length);
  // }, [selectedImage]);

  function handleImageForward() {
    if (selectedImage <= images.length - 2) {
      console.log("forward");
      setSelectedImage(selectedImage + 1);
    }
  }

  function handleImageBackward() {
    if (selectedImage >= 1 && images.length > 0) {
      console.log("backward");
      setSelectedImage(selectedImage - 1);
    }
  }

  return (
    // console.log(listing.title),
    <div className="px-10 pt-2">
      <div className="">
        {images.map((image: any, index: any) => {
          return (
            <div key={index}>
              <img
                className="w-40 hover:cursor-pointer"
                src={image}
                alt={listing.title}
                onClick={() => {
                  setSelectedImage(index), console.log(selectedImage);
                }}
              />
              {/* <div>Index: {index}</div> */}
            </div>
          );
        })}
        <div className="flex">
          <div className="cursor-pointer" onClick={handleImageForward}>
            Forward
          </div>
          <img
            className="h-48 w-auto"
            src={images[selectedImage]}
            alt={listing.title}
          />
          <div className="cursor-pointer" onClick={handleImageBackward}>
            Backward
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-semibold">{listing.title}</h1>
          <p className="text-lg">{listing.description}</p>
        </div>
        {/* <div><img src={listing.images} alt={listing.title} /></div> */}
      </div>
    </div>
  );
}
