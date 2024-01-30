import { Link } from 'react-router-dom';
import LoginFormRedirectToOrdersModal from '../LoginFormRedirectToOrdersModal';
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from '../OpenModalButton';
import { useSelector } from 'react-redux';
import './Footer.css';

export default function Footer() {

  const sessionUser = useSelector(state => state.session.user)

  return (
    <>
      <div id="footer">
        {/* <h1>footer</h1> */}
        <div id='footer-col-1'>
          <Link exact to="/">
            <div id='footer-logo-text'>
              Wingman<span id='logo-eats-text'></span>
            </div>
          </Link>
        </div>
        <div className='footer-right'>
          <div id='footer-col'>
            <div className='footer-right-header'>Features</div>
            <div className='footer-list'>
              <Link exact to="/restaurants">
                <div>Restaurants</div>
              </Link>
              <Link exact to="/restaurants/1/menu">
                <div>Menu Items</div>
              </Link>
              <Link exact to="/restaurants/1/menu">
                <div>Reviews</div>
              </Link>
              {sessionUser ?
                <Link exact to="/past-orders">
                  <div>Orders</div>
                </Link>
                :
                <div id='footerModal'>
                  <OpenModalButton
                    buttonText='Orders'
                    modalComponent={<LoginFormRedirectToOrdersModal />}
                  />
                </div>
              }
              {!sessionUser && (<div id='footerModal'><OpenModalButton
                buttonText='Create an Account'
                modalComponent={<SignupFormModal />} />
              </div>)}
            </div>
          </div>
          <div id='footer-col'>
            <div className='footer-right-header'>Contact Us</div>
            <div className='footer-list'>
              <div className='footer-name'>
                <a href="" target="_blank" rel="noopener noreferrer">
                  <div>Madhur Jain</div>
                </a>
                <div className='footer-links'>
                  <a href="https://www.linkedin.com/in/madhur-jain-37a243218/" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/immortalcodes" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-github"></i>
                  </a>
                </div>
              </div>
              <div className='footer-name'>
                <a href="" target="_blank" rel="noopener noreferrer">
                  <div>Aneesh Tickoo</div>
                </a>
                <div className='footer-links'>
                  <a href="https://www.linkedin.com/in/aneeshtickoo/" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/Aneesh02" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-github"></i>
                  </a>
                </div>
              </div>
              <div className='footer-name'>
                <a href="" target="_blank" rel="noopener noreferrer">
                  <div>Aman Vishnoi</div>
                </a>
                <div className='footer-links'>
                  <a href="https://www.linkedin.com/in/amanvishnoi777/" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/VishnoiAman777" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-github"></i>
                  </a>
                </div>
              </div>
              <div className='footer-name'>
                <div>Ankit Soni</div>
                <div className='footer-links'>
                  <a href="https://www.linkedin.com/in/ankit-soni-889906112/" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/3Ankit3" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='footer-copyright'>
        @ 2024 Wingman
      </div>
    </>
  )
};
