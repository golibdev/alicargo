import {useEffect} from 'react';
import './main.css';
import Sidebar from '../Sidebar/Sidebar';
import { isAuthenticated } from '../../handlers/authHandlers';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

function MainApp() {
  const role = localStorage.getItem('role');
  const pathName = useLocation().pathname;
  const navigate = useNavigate();
  useEffect(() => {
    if((pathName === '/home/employe' || pathName === '/home/airoport') && role !== '100') {
      navigate('/home')
    }
    if(isAuthenticated() === false) {
      navigate('/');
    }
  }, [navigate, pathName, role]);
  return (
    <div className="d-flex justify-content-between">
      <Sidebar/>
      <Outlet/>
    </div>
  );
}

export default MainApp;