import moment from "moment";

export const isAuthenticated = () => {
   const expireTime = localStorage.getItem('expire_time');
   const dateNow = moment(Date.now()).format('DD.MM.YYYY HH:mm:ss');
   const token = localStorage.getItem('token');
   if(!token || (dateNow > expireTime)) return false;
}

export const logout = (navigate) => {
   localStorage.removeItem('token');
   localStorage.removeItem('user');
   localStorage.removeItem('role');
   navigate('/')
}