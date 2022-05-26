export const isAuthenticated = () => {
   const expireTime = localStorage.getItem('expire_time')
   const dateNow = new Date();
   const token = localStorage.getItem('token');

   const matches = expireTime?.match(/^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2}):(\d{2})$/);

   if(!matches) return false;

   const year = parseInt(matches[3], 10);
   const month = parseInt(matches[2], 10) - 1;
   const day = parseInt(matches[1], 10);
   const hour = parseInt(matches[4], 10);
   const minute = parseInt(matches[5], 10);
   const second = parseInt(matches[6], 10);
   const date = new Date(year, month, day, hour, minute, second);

   if((dateNow.getTime() > date.getTime() && token) || !token) {
      localStorage.clear();
      return false;
   }

   return true;
}

export const logout = (navigate) => {
   localStorage.removeItem('token');
   localStorage.removeItem('expire_time');
   localStorage.removeItem('role');
   localStorage.removeItem('user');
   navigate('/')
}