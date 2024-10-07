import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: 'products', component: ProductListComponent },
    { path: 'about', component: AboutComponent },
];
