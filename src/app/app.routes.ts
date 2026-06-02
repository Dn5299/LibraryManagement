import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Books} from './books/books';
import { Borrow } from './borrow/borrow';
import { Statistical } from './statistical/statistical';
import { Setting } from './setting/setting';
import { AddBook } from './books/add-book/add-book';

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
        path: 'statistical',
        component: Statistical
    },

    {
        path: 'setting',
        component: Setting
    },
    {
        path: 'add-book',
        component: AddBook
    }
];
