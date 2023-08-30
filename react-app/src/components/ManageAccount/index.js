import { Link, useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../store/session";
import './ManageAccount.css';
import LandingPageCard from './landingPageCard';
import CurrentUserRestaurants from '../Restaurants/userRestaurants';
import RestaurantFormCreate from '../RestaurantFormCreate';
import PastOrdersPage from '../PastOrdersPage';

export default function ManageAccount() {
  const dispatch = useDispatch();
  const history = useHistory();


  const sessionUser = useSelector(state => state.session.user);
  // const userRestState = useSelector(state => state.restaurant.usersRestaurants)

  // useEffect(() => {
  //   setManageRestaurantsToggle(true);
  // })

  // TO EDIT:
  // ONLY DISPLAY 'ORDERS' BTN IF USER HAS 1+ ORDERS
  // ONLY DISPLAY 'MANAGE RESTS' BTN IF USER OWNS 1+ RESTS
  // OR -- could have simple landing pages, like:
  // "You don't have any orders yet! button:[Explore Restaurants]"
  // "You don't have any restaurants yet! button:[Create Restaurant]"

  // CONSIDER REFACTORING TO NOT DISPLAY FOOTER ON ALL PAGES
  // (SINCE REAL WEBSITE HAS NO FOOTER ON ACCOUNT PAGE)



  const [accountDetailsToggle, setAccountDetailsToggle] = useState(true)
  const [pastOrderToggle, setPastOrderToggle] = useState(false)
  const [createRestaurantToggle, setRreateRestaurantToggle] = useState(false)
  const [manageRestaurantsToggle, setManageRestaurantsToggle] = useState(false)
  const [currentView, setCurrentView] = useState('account')


  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push(`/`);
  };

  const setViewClass = () => {
    return 'active'
  }

  const pastOrders = (e) => {
    setAccountDetailsToggle(false);
    setPastOrderToggle(true);
    setRreateRestaurantToggle(false);
    setManageRestaurantsToggle(false);
    setCurrentView('orders')
  }

  const createRestaurant = (e) => {
    setAccountDetailsToggle(false);
    setPastOrderToggle(false);
    setRreateRestaurantToggle(true);
    setManageRestaurantsToggle(false);
    setCurrentView('create')
  }

  const manageRestaurants = (e) => {
    setAccountDetailsToggle(false);
    setPastOrderToggle(false);
    setRreateRestaurantToggle(false);
    setManageRestaurantsToggle(true);
    setCurrentView('manage')
  }

  const accountDetails = (e) => {
    setAccountDetailsToggle(true);
    setPastOrderToggle(false);
    setRreateRestaurantToggle(false);
    setManageRestaurantsToggle(false);
    setCurrentView('account')
  }

  useEffect(() => {
  }, [accountDetailsToggle, pastOrderToggle, createRestaurantToggle, manageRestaurantsToggle])

  return (
    <div className='account-page'>
      <div id='account-landing-outermost-box'>
        <div id='account-landing-left-sidebar'>
          <button className={currentView === 'account' ? "active" : ""} onClick={accountDetails}>Account Details</button>
          <button className={currentView === 'orders' ? "active" : ""} onClick={pastOrders}>Orders</button>
          <button className={currentView === 'create' ? "active" : ""} onClick={createRestaurant}>Create Restaurant</button>
          <button className={currentView === 'manage' ? "active" : ""} onClick={manageRestaurants}>Manage Restaurants</button>
          <button id='account-landing-sign-out-btn' onClick={handleLogout}>Sign out</button>
        </div>


        <div id='account-landing-right-content'>
          {accountDetailsToggle ? <LandingPageCard /> : null}
          {pastOrderToggle ? <PastOrdersPage parent="account" /> : null}
          {createRestaurantToggle ? <RestaurantFormCreate /> : null}
          {manageRestaurantsToggle ? <CurrentUserRestaurants /> : null}
        </div>
      </div>
    </div>
  )
};