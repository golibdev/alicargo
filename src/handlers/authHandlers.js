export const isAuthenticated = () => {
   const expireTime = localStorage.getItem('expire_time')
   const sliceDate = expireTime !== null && expireTime.slice(0, 10).split('.')
   const expireTimeDate = new Date(`${sliceDate[2]}-${sliceDate[1]}-${sliceDate[0]}`);
   const dateNow = new Date();
   const token = localStorage.getItem('token');
   if (token && expireTimeDate > dateNow) {
      return true;
   } else if(token && expireTimeDate < dateNow) {
      localStorage.removeItem('token');
      localStorage.removeItem('expire_time');
   }
   return false;
}

export const logout = (navigate) => {
   localStorage.removeItem('token');
   localStorage.removeItem('user');
   localStorage.removeItem('role');
   navigate('/')
}