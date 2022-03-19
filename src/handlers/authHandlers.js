export const isAuthenticated = () => {
   const expireTime = localStorage.getItem('expire_time')
   const dateNow = new Date();
   const token = localStorage.getItem('token');

   const expireTimeDate = expireTime !== null ? 
      new Date(
         expireTime.split('.')
         .join('-')
         .split(' ')[0]
         .split('-')
         .reverse()
         .join('-')
      ) : null;
   if(token && expireTimeDate > dateNow) {
      return true;
   } else {
      localStorage.clear();
      return false;
   }
}

export const logout = (navigate) => {
   localStorage.removeItem('token');
   localStorage.removeItem('expire_time');
   localStorage.removeItem('role');
   localStorage.removeItem('user');
   navigate('/')
}