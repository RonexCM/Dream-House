import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./../components/Layout/Layout";

const HomePage = () => {
  const navigate = useNavigate();
  const img1 =
    "https://images.unsplash.com/photo-1645449441925-6092207be97d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=857&q=80"
  const img2 =
    "https://images.unsplash.com/photo-1626178793926-22b28830aa30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvcGVydHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";
  return (
    <Layout>
      <div className="container mt-3">
        <div className="row">
          <h1>Category</h1>
          <div className="col-md-5">
            <div className="Imagecontainer">
              <img src={img1} alt="Rent" style={{ width: "100%" }} />
              <button
                className="btn"
                onClick={() => navigate("/category/rent")}
              >
                FOR RENT
              </button>
            </div>
          </div>
          <div className="col-md-5">
            <div className="Imagecontainer">
              <img src={img2} alt="Rent" style={{ width: "100%" }} />
              <button
                className="btn"
                onClick={() => navigate("/category/sale")}
              >
                FOR SALE
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;