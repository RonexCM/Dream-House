import React from 'react'
import HomePage from './pages/HomePage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Offers from './pages/Offers';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import Category from './pages/Category';
import ListingForm from './pages/ListingForm';
import Listing from './pages/Listing';
import Contact from './pages/Contact';


function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage/>}/> 
        <Route path="/offers" element={<Offers/>}/>
        <Route path="/category/:categoryName" element={<Category/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/profile" element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/contact/:landlordId" element={<Contact/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/create-listing" element={<ListingForm/>}/>
        <Route path="/offers" element={<Offers/>}/>
        <Route path="/category/:categoryName/:listingId" element={<Listing/>}/>
      </Routes>
    </BrowserRouter>  
    );
}

export default App;
