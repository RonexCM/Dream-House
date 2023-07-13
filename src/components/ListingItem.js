import React from 'react'
import { Link } from 'react-router-dom'
import {FaBath, FaBed} from 'react-icons/fa'

const ListingItem = ({listing, id, onDelete, onEdit}) => {
  return (
    <>
    <div className="d-flex align-items-center justify-content-center">
      <div className="card category-link mb-4" style={{width: "800px"}}>
      <Link to={`/category/${listing.type}/${id}`}>
        <div className="row container p-2">
            <div className="col-md-5">
                <img src={listing.imgUrls[0]} 
                className="img-thumbnail"
                alt={listing.name} height={200} width={300}/>
            </div>
            <div className="col-md-5">
                <h4>{listing.name}</h4>
                <p>Location: {listing.address}</p>
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
                {onDelete && (
                  <button className="btn btn-danger" 
                  onClick={() => {
                    onDelete(listing.id, listing.name)
                  }}>
                  Delete Listing
                  </button>
                )}
                {onEdit && (
                  <button className="btn btn-info ms-3" 
                  onClick={() => {
                    onEdit(listing.id, listing.name)
                  }}>
                  Edit Listing
                  </button>
                )}
            </div>
        </div>
        </Link>
      </div>
      </div>
    </>
  )
}

export default ListingItem
