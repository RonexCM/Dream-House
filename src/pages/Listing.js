import React,{useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import {getDoc,doc} from 'firebase/firestore'
import { db } from '../firebase.config'
import { getAuth } from 'firebase/auth'
import { useNavigate, Link, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import SwipeCore,{EffectCoverflow,Navigation,Pagination} from 'swiper'
import {Swiper,SwiperSlide} from 'swiper/react'
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

//config
SwipeCore.use([EffectCoverflow])

const Listing = () => {
   const [listing,setListing] = useState("")
   const [loading, setLoading] = useState(false)
   const navigate = useNavigate()
   const params = useParams()
   const auth = getAuth()

   useEffect(() =>{
    const fetchListing = async () => {
        const docRef = doc(db, "listings", params.listingId)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
            console.log(docSnap.data())
            setListing(docSnap.data())
            setLoading(false)
        }
    }
    fetchListing()
   },[params.listingId])

   if(loading){
    return <Spinner/>
   }

  return (
    <Layout>
    <div className="container d-flex align-items-center justify-content-center mt-4">
     <div className="card" style={{ width: "600px" }}>
     {/* <div className="card-header">
        {listing.imgUrls === undefined ? (<Spinner/>) : (
            <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
            }}
            className="mySwiper"
            >
                {listing.imgUrls.map((url,index) => (
                    <SwiperSlide key={index}>
                        <img src={listing.imgUrls[index]}
                        height={400}
                        width={800}
                        alt={listing.name}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        )}
     </div> */}
     <div className="card-header">
     <img src={listing.imgUrls} 
        className="img-thumbnail"
        alt={listing.name} height={400} width={800}/>
     </div>
      <div className="card-body">
        <h3>{listing.name}</h3>
        <h3>Location : {listing.address}</h3>
        <h6>
            Price : RS { " "}
            {listing.offer ? listing.discountedPrice : listing.regularPrice}
        </h6>
        <p>Property For:  {listing.type === "rent" ? "Rent" : "Sale"}</p>
        <p>
            {listing.offer && (
                <span>
                    RS {listing.regularPrice - listing.discountedPrice} Discount
                </span>
            )}
        </p>
        <p>
            {listing.bedrooms > 1 
            ? `${listing.bedrooms} Bedrooms` : "1 Bedroom"
            }
        </p>
        <p>
            {listing.bathrooms > 1
            ? `${listing.bathrooms} bathrooms`
            : "1 Bathroom"}
        </p>
        <p>{listing.parking ? `Parking Spot Available` : "no spot for parking"}</p>
        <p>{listing.furnished ? `furnished house` : "not furnished"}</p>
        <Link
        className="btn btn-success"
        to = {`/contact/${listing.useRef}?listingName=${listing.name}`}>
        Contact Landlord
        </Link>
      </div>
     </div>
    </div>
    </Layout>
  )
}

export default Listing