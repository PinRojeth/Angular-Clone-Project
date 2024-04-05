import { Routes } from '@angular/router';
import { ProductComponent } from './Product/product-list/product.component';
import { ProductDetailComponent } from './Product/product-detail/product-detail.component';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductComponent,
  },
  {
    path: 'products/:productId',
    component: ProductDetailComponent,
  },
];
