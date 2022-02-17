import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { logout } from '../../handlers/authHandlers';
import './navbar.css'

const Navbar = () => {
   const navigate = useNavigate();
   const user = localStorage.getItem('user');
   const pathName = useLocation().pathname;
   const [navbarHeader, setNavbarHeader] = useState('');

   useEffect(() => {
      if(pathName === '/home') {
        setNavbarHeader('Boshqaruv Paneli');
      } else if(pathName === '/home/new-order' || pathName === '/home/new-id-order') {
        setNavbarHeader('Yangi zakaz ochish');
      } else if(pathName === '/home/send-order') {
        setNavbarHeader('Jo\'natish');
      } else if(pathName === '/home/recive') {
        setNavbarHeader('Qabul qilish');
      } else if(pathName === '/home/submit-order') {
        setNavbarHeader('Topshirish');
      } else if(pathName === '/home/clients') {
        setNavbarHeader('Mijozlar');
      } else if(pathName === '/home/flights') {
        setNavbarHeader('Reyslar');
      } else if(pathName === '/home/employe') {
        setNavbarHeader('Xodimlar');
      } else if(pathName === '/home/warehouse') {
        setNavbarHeader('Omborxonalar');
      } else if(pathName === '/home/airoport') {
        setNavbarHeader('Airoportlar');
      }
    }, [pathName, setNavbarHeader]);
   return (
      <div className="col-12 d-flex">
         { pathName !== '/home' ? (
               <Link to='/home' className="back btn btn-primary">
                  <i className="bi bi-backspace"></i> <span> orqaga</span>
               </Link>
            ) : (
               <></>
            )}

         <h3>{navbarHeader}</h3>
         <ul className='d-flex ms-auto' style={{ listStyleType: 'none' }}>
            <li className='nav-item'>
               <p className='nav-link text-dark fw-bold'>{user}</p>
            </li>
            <li className='nav-item'>
               <p className='nav-link text-dark fw-bold' style={{ cursor: 'pointer' }} herf='/' onClick={() => {
                  logout(navigate);
               }}><i className="bi bi-box-arrow-left"></i> Chiqish</p>
            </li>
         </ul>
      </div>
   );
};

export default Navbar;
