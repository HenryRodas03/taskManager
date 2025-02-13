import { CanActivateFn, Router  } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('accessToken'); 
  console.log("🚀 ~ token:", token)

  if (token) {
    return true; 
  } else {
    const router = new Router();
    router.navigate(['/login']);
    return false;
  }
};
