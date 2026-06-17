import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Books } from './books/books';
import { Borrow } from './borrow/borrow';
import { Setting } from './setting/setting';
import { StatisticalOverview } from './statistical-overview/statistical-overview';
import { StatisticalReaders } from './statistical-readers/statistical-readers';
import { StatisticalBorrowing } from './statistical-borrowing/statistical-borrowing';
import { StatisticalReturned } from './statistical-returned/statistical-returned';
import { StatisticalTop } from './statistical-top/statistical-top';
import { StatisticalInventory } from './statistical-inventory/statistical-inventory';
import { SettingSystem } from './setting-system/setting-system';
import { SettingDeveloper } from './setting-developer/setting-developer';
import { Login } from './login/login';
import { authGuard } from './auth-guard';

export const routes: Routes = [

  {
    path: 'home',
    component: Home,
    canActivate: [authGuard]
  },

  {
    path: 'books',
    component: Books,
    canActivate: [authGuard]
  },

  {
    path: 'borrow',
    component: Borrow,
    canActivate: [authGuard]
  },

  {
    path: 'statistical/overview',
    component: StatisticalOverview,
     canActivate: [authGuard]
  },

  {
    path: 'statistical/readers',
    component: StatisticalReaders,
     canActivate: [authGuard]
  },

  {
    path: 'statistical/borrowing',
    component: StatisticalBorrowing,
     canActivate: [authGuard]
  },

  {
    path: 'statistical/returned',
    component: StatisticalReturned,
     canActivate: [authGuard]
  },

  {
    path: 'statistical/top',
    component: StatisticalTop,
     canActivate: [authGuard]
  },

  {
    path: 'statistical/inventory',
    component: StatisticalInventory,
     canActivate: [authGuard]
  },

  {
    path: 'setting',
    component: Setting,
     canActivate: [authGuard]
  },

  {
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
},

{
  path: 'setting/system',
  component: SettingSystem
},

{
  path: 'setting/developer',
  component: SettingDeveloper
},

{
  path: 'login',
  component: Login
},

];