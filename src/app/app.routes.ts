import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'InvenTech S.A.S. — Inventario, POS y lector de códigos de barras',
  },
  {
    path: 'inventech',
    loadComponent: () => import('./features/company/company.component').then((m) => m.CompanyComponent),
    title: 'InvenTech — Identidad y conformación empresarial',
  },
  {
    path: 'productos',
    loadComponent: () => import('./features/catalog/catalog.component').then((m) => m.CatalogComponent),
    title: 'Productos y servicios — InvenTech',
  },
  {
    path: 'normatividad',
    loadComponent: () => import('./features/regulations/regulations.component').then((m) => m.RegulationsComponent),
    title: 'Normatividad — InvenTech',
  },
  {
    path: 'aplicativos',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/aplicativos/aplicativos.component').then((m) => m.AplicativosComponent),
        title: 'Aplicativos — InvenTech',
      },
      {
        path: 'inventario',
        canActivate: [authGuard],
        loadComponent: () => import('./features/inventory/inventory.component').then((m) => m.InventoryComponent),
        title: 'Inventario — InvenTech',
      },
      {
        path: 'pos',
        canActivate: [authGuard],
        loadComponent: () => import('./features/pos/pos.component').then((m) => m.PosComponent),
        title: 'Punto de venta — InvenTech',
      },
      {
        path: 'scanner',
        canActivate: [authGuard],
        loadComponent: () => import('./features/scanner/scanner.component').then((m) => m.ScannerComponent),
        title: 'Lector de códigos — InvenTech',
      },
    ],
  },
  {
    path: 'acceso',
    children: [
      {
        path: 'login',
        canActivate: [guestGuard],
        loadComponent: () => import('./features/auth/login/login.component').then((m) => m.LoginComponent),
        title: 'Iniciar sesión — InvenTech',
      },
      {
        path: 'registro',
        canActivate: [guestGuard],
        loadComponent: () => import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
        title: 'Crear cuenta — InvenTech',
      },
      {
        path: 'recuperar',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./features/auth/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
        title: 'Recuperar contraseña — InvenTech',
      },
      {
        path: 'restablecer',
        loadComponent: () =>
          import('./features/auth/reset-password/reset-password.component').then((m) => m.ResetPasswordComponent),
        title: 'Restablecer contraseña — InvenTech',
      },
      {
        path: 'panel',
        canActivate: [authGuard],
        loadComponent: () => import('./features/auth/dashboard/dashboard.component').then((m) => m.DashboardComponent),
        title: 'Panel — InvenTech',
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'Página no encontrada — InvenTech',
  },
];
