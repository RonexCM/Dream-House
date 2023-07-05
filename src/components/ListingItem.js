import React from 'react'
import { Link } from 'react-router-dom'
import {FaBath, FaBed} from 'react-icons/fa'

const ListingItem = ({listing, id}) => {
  return (
    <>
    <div className="d-flex align-items-center justify-content-center">
      <div className="card category-link" style={{width: "800px"}}>
      <Link to={`/category/${listing.type}/${id}`}>
        <div className="row container p-2">
            <div className="col-md-5">
                <img src={listing.imgUrls[0]} 
                className="img-thumbnail"
                alt={listing.name} height={200} width={300}/>
            </div>
            <div className="col-md-5">
                <p>{listing.location}</p>
                <h4>{listing.name}</h4>
                <p>
                    RS: {" "}
                    {
                        listing.offer
                        ? listing.discountedPrice
                        : listing.regularPrice}
                        {listing.type === "rent" && "/Month"}
                </p>
                <p>
                    <FaBed/> &nbsp;
                    {listing.bedrooms > 1
                    ? `${listing.bedrooms} Bedrooms`
                    : "1 Bedroom"}
                </p>
                <p>
                    <FaBath/> &nbsp;
                    {listing.bethrooms > 1
                    ? `${listing.bathrooms} Bathrooms`
                    : "1 Bathroom"}
                </p>
            </div>
        </div>
        </Link>
      </div>
      </div>
    </>
  )
}

export default ListingItem
