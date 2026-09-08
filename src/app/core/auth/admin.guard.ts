import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

export const adminGuard: CanActivateFn = async () => {
  const profileService = inject(ProfileService);
  const router = inject(Router);

  if (profileService.isAdmin()) {
    return true;
  }

  return router.createUrlTree(['/acceso/panel']);
};
