import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddBook from './components/AddBook';
import AddUser from './components/AddUser';
import Profile from './components/Profile';
import Chain from './components/Chain';
import BookPurchase from './components/BookPurchase';
import ShopOwner from './components/ShopOwner';
import { Auth0Provider } from "@auth0/auth0-react";
import AddBookData from './components/AddBookData';
import CheckPlag from './components/CheckPlag';

function App() {
  return (
    <Auth0Provider
    domain="dev-tunpnb2c.us.auth0.com"
    clientId="auE3xve3249zBrUO6vckcfWEaay4ZPSq"
    redirectUri={window.location.origin}
    useRefreshTokens={ true }
    cacheLocation="memory"
    >
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="addbook" element={<AddBook/>} />
          <Route path="adduser" element={<AddUser/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="purchase" element= {<BookPurchase/>}/>
          <Route path="addbookdata" element = {<AddBookData/>}/>
          <Route path="checkplag" element = {<CheckPlag/>}/>
          <Route path="shopowner/:id" element = {<ShopOwner/>}/>
          <Route path="chain" element = {<Chain/>}/>
        </Routes>
    </BrowserRouter>
    </div>
    </Auth0Provider>
  );
}

export default App;
