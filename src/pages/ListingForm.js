import React,{useState, useEffect, useRef} from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import Spinner from '../components/Spinner'
import { AiOutlineFileAdd } from "react-icons/ai"
import {toast} from 'react-toastify'
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import { db } from '../firebase.config'
import { v4 as uuidv4 } from "uuid";
import {addDoc,collection,serverTimestamp} from 'firebase/firestore'
// used ListingForm instead of CreateListing
const ListingForm = () => {
    const [loading, setLoading] = useState(false)
    const [geoLocationEnable, setGeoLocationEnable] = useState(false)
    const [formData, setFormData] = useState({
        type : 'rent',
        name : '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: '',
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        latitude:0,
        longitude: 0,
    })

    const {
        type,
        name,
        bedrooms,
        bathrooms,
        parking,
        furnished,
        address,
        offer,
        regularPrice,
        discountedPrice,
        images,
        latitude,
        longitude,
    } = formData

    const auth = getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true)

    useEffect(()=> {
        if(isMounted){
            onAuthStateChanged(auth, (user)=> {
                setFormData({
                    ...formData,
                    useRef: user.uid,
                })
            })
        }else{
            navigate("/signin")
        }
        // eslint-disable-next-line
    }, [])

    if (loading) {
        return <Spinner/>
    }

    //mutate func
  const onChangeHandler = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    //files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }))
    }
    //text/booleans/number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }
//4.00.00
   //form submit
   const onSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    if(discountedPrice >= regularPrice){
      setLoading(false)
      toast.error('Discount should be less than regular price')
      return
    }
    if(images > 6){
      setLoading(false)
      toast.error('You can only upload six images')
      return
    }
    //4.25.32
    //store images to firebase storage
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, "images/" + fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("uplloas is" + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("upload is paused");
                break;
              case "running":
                console.log("upload is runnning");
            }
          },
          (error) => {
            reject(error);
          },
          //success
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false)
      toast.error("Images not uploaded")
      return
    })
    console.log(imgUrls)
//4.59.00
    //save form data
    const formDataCopy = {...formData,imgUrls, timestamp: serverTimestamp()}
    delete formDataCopy.images
    !formDataCopy.offer && delete formDataCopy.discountedPrice
    const docRef = await addDoc(collection(db,"listings"),formDataCopy)
    toast.success("Listing Created")
    navigate(`/category/${formDataCopy.type}/${docRef.id}`)
  };

  return (
    <Layout>
    <div className="container d-flex flex-column align-items-center justify-content-center mb-4">
        <h3 className="mt-3 w-50 bg-dark text-light p-2 text-center">
            Create Listing &nbsp;
            <AiOutlineFileAdd />
        </h3>
        {/* Sell rent button */}
        <form className="w-50 bg-light p-4" onSubmit={onSubmit}>
         <div className="d-flex flex-row mt-4">
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    value="rent"
                    onChange={onChangeHandler}
                    defaultChecked
                    name="type"
                    id="type"
                />
                <label className="form-check-label" htmlFor="rent">
                    Rent
                </label>
            </div>
            <div className="form-check ms-3">
                <input
                    className="form-check-input"
                    type="radio"
                    value="sale"
                    onChange={onChangeHandler}
                    name="type"
                    id="type"
                />
                <label className="form-check-label" htmlFor="rent">
                    Sale
                </label>
            </div>
         </div>
         {/* name */}
         <div className="mb-3 mt-4">
            <label htmlFor="name" className="form-label">
                Name
            </label>
            <input
                type="text"
                className="form-control"
                id="name"
                onChange={onChangeHandler}
                value={name}
                required
            />
         </div>
         {/* bedrooms */}
         <div className="mb-3 mt-4">
         <label htmlFor="bedrooms" className="form-label">
              Bedrooms
            </label>
            <input
              type="number"
              className="form-control"
              id="bedrooms"
              value={bedrooms}
              onChange={onChangeHandler}
              required
            />
          </div>
          {/* bathrooms */}
          <div className="mb-3 mt-4">
          <label htmlFor="bathrooms" className="form-label">
              Bathrooms
            </label>
            <input
              type="number"
              className="form-control"
              id="bathrooms"
              value={bathrooms}
              onChange={onChangeHandler}
              required
            />
          </div>
          {/* parking */}
          <div className="mb-3 ">
            <label htmlFor="parking" className="form-label">
                Parking
            </label>
            <div className="d-flex flex-row ">
                <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value={true}
                  onChange={onChangeHandler}
                  name="parking"
                  id="parking"
                    />
                    <label className="form-check-label" htmlFor="yes">
                  Yes
                </label>
                </div>
                <div className="form-check ms-3">
                <input
                    className="form-check-input"
                  type="radio"
                  name="parking"
                  value={false}
                  defaultChecked
                  onChange={onChangeHandler}
                  id="parking"
                />
                <label className="form-check-label" htmlFor="no">
                  No
                </label>
                </div>
            </div>
          </div>
          {/* furnished */}
          <div className="mb-3 ">
            <label htmlFor="furnished" className="form-label">
              Furnished :
            </label>
            <div className="d-flex flex-row ">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value={true}
                  onChange={onChangeHandler}
                  name="furnished"
                  id="furnished"
                />
                <label className="form-check-label" htmlFor="yes">
                  Yes
                </label>
              </div>
              <div className="form-check ms-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="furnished"
                  value={false}
                  defaultChecked
                  onChange={onChangeHandler}
                  id="furnished"
                />
                <label className="form-check-label" htmlFor="no">
                  No
                </label>
              </div>
            </div>
          </div>
          {/* address */}
          <div className=" mb-3">
          <label htmlFor="address">Address </label>
            <textarea
              className="form-control"
              placeholder="Enter Your Address"
              id="address"
              value={address}
              onChange={onChangeHandler}
              required
            />
          </div>
          {/* geoLocation */}
          <div className="mb-3 ">
              <div className="d-flex flex-row ">
                <div className="form-check">
                  <label className="form-check-label" htmlFor="yes">
                    Latitude
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    value={latitude}
                    onChange={onChangeHandler}
                    name="latitude"
                    id="latitude"
                  />
                </div>
                <div className="form-check ms-3">
                  <label className="form-check-label" htmlFor="no">
                    Longitude
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    name="longitude"
                    value={longitude}
                    onChange={onChangeHandler}
                    id="longitude"
                  />
                </div>
              </div>
            </div>
            {/* Offers */}
            <div className="mb-3 ">
            <label htmlFor="offer" className="form-label">
              Offer 
            </label>
            <div className="d-flex flex-row ">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value={true}
                  onChange={onChangeHandler}
                  name="offer"
                  id="offer"
                />
                <label className="form-check-label" htmlFor="yes">
                  Yes
                </label>
              </div>
              <div className="form-check ms-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="offer"
                  value={false}
                  defaultChecked
                  onChange={onChangeHandler}
                  id="offer"
                />
                <label className="form-check-label" htmlFor="no">
                  No
                </label>
              </div>
            </div>
          </div>
          {/* regularPrice */}
          <div className="mb-3 mt-4">
          <label htmlFor="name" className="form-label">
              Regular Price 
            </label>
            <div className=" d-flex flex-row ">
              <input
                type="number"
                className="form-control w-50 "
                id="regularPrice"
                name="regularPrice"
                value={regularPrice}
                onChange={onChangeHandler}
                required
              />
              {type === "rent" && <p className="ms-4 mt-2">Rs. / Month</p>}
            </div>
          </div>
          {/* discountedPrice */}
          {offer &&(
            <div className="mb-3 mt-4">
              <label htmlFor="discountedPrice" className="form-label">
                Discounted Price
              </label>

              <input
                type="number"
                className="form-control w-50 "
                id="discountedPrice"
                name="discountedPrice"
                value={discountedPrice}
                onChange={onChangeHandler}
                required
              />
            </div>
          )}
          {/* images */}
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
                Select images
            </label>
            <input
                className="form-control"
                type="file"
                id="images"
                name="images"
                onChange={onChangeHandler}
                max="6"
                accept=".jpg, .png, .jpeg, .webp"
                multiple
                required
            />
          </div>
          {/* submit button */}
          <div className="mb-3">
            <input
              disabled={!name || !address || !regularPrice || !images}
              className="btn btn-primary w-100"
              type="submit"
              value="Create Listing"
            />
          </div>
        </form>
    </div>
    </Layout>
  )
}

export default ListingForm