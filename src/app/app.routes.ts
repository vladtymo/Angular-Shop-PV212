import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { AboutComponent } from './about/about.component';
import { ProductFormComponent } from './product-form/product-form.component';

export const routes: Routes = [
    { path: 'products', component: ProductListComponent },
    { path: 'create', component: ProductFormComponent },
    { path: 'about', component: AboutComponent },
];
