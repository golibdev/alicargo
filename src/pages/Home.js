import {useEffect, useState} from 'react';
import { isAuthenticated } from '../handlers/authHandlers';
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import authApi from '../api/authApi';

function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(isAuthenticated() === false) {
      navigate('/');
    } else {
      navigate('/home');
    }
  }, [navigate]);

  const loginSubmit = async () => {
    const check = {
      username: username.trim().length === 0,
      password: password.trim().length === 0
    }

    if(check.username || check.password) {
      toast.error('Barcha maydonlar to\'ldirilishi shart!');
      return;
    }

    const params = {
      username,
      password
    }

    try {
      const res = await authApi.login(params);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', res.data.user.full_name)
      localStorage.setItem('role', res.data.user.role)
      localStorage.setItem('expire_time', res.data.expire_time)
      navigate('/home');
    } catch (err) {
      toast.error(err.response.data.non_field_errors[0]);
      console.log(err);
    }
  }
  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-12 col-lg-4 col-md-12 col-sm-12 main-side  bg-light">

          <div className="container">
            <div className="row  text-center">
              <div className="col-10 mx-auto useForm">

                <h3 className="text-center mt-3">CABINET.ALICARGO.UZ</h3>
                <input type="text" className="form-control mt-3" placeholder="Loginingizni kiriting" value={username} onChange = {e => setUsername(e.target.value)} />
                <input type="password" className="form-control mt-3" placeholder="Parolingizni kiriting" value={password} onChange={e => setPassword(e.target.value)} />

                <button className="btn btn-primary w-100 mt-3" onClick={loginSubmit}> <i className="bi bi-box-arrow-right"></i> Kirish</button>
              </div>
            </div>
          </div>

        </div>

        <div className="col-8 col-lg-8 col-md-12 col-sm-12 d-xl-block d-lg-block d-none main-content ">

        </div>

      </div>
      <ToastContainer/>
    </div>

  );
}

export default Home;