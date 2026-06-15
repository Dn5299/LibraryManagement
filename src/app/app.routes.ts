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

export const routes: Routes = [

  {
    path: 'home',
    component: Home
  },

  {
    path: 'books',
    component: Books
  },

  {
    path: 'borrow',
    component: Borrow
  },

  {
    path: 'statistical/overview',
    component: StatisticalOverview
  },

  {
    path: 'statistical/readers',
    component: StatisticalReaders
  },

  {
    path: 'statistical/borrowing',
    component: StatisticalBorrowing
  },

  {
    path: 'statistical/returned',
    component: StatisticalReturned
  },

  {
    path: 'statistical/top',
    component: StatisticalTop
  },

  {
    path: 'statistical/inventory',
    component: StatisticalInventory
  },

  {
    path: 'setting',
    component: Setting
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];