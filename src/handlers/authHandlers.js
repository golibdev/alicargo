export const isAuthenticated = () => {
   const expireTime = localStorage.getItem('expire_time').slice(0,10).split('.');
   const expireTimeDate = new Date(`${expireTime[2]}-${expireTime[1]}-${expireTime[0]}`);
   const dateNow = new Date();
   const token = localStorage.getItem('token');
   if(token && (dateNow.getTime() < expireTimeDate.getTime())) {
      return true
   }
   else {
      return false
   }
}

export const logout = (navigate) => {
   localStorage.removeItem('token');
   localStorage.removeItem('user');
   localStorage.removeItem('role');
   navigate('/')
}