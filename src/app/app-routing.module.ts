import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/auth/login/login.component';
import {ProductsComponent} from './components/products/products.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {CheckOutComponent} from './components/check-out/check-out.component';
import {OrderSuccessComponent} from './components/order-success/order-success.component';
import {AdminProductsComponent} from './components/admin/admin-products/admin-products.component';
import {AdminOrdersComponent} from './components/admin/admin-orders/admin-orders.component';
import {MyOrdersComponent} from './components/my-orders/my-orders.component';
import {AuthGuard} from './services/auth/auth-guard.service';
import {AdminAuthGuard} from './services/auth/admin-auth-guard.service';
import {ProductFormComponent} from './components/admin/product-form/product-form.component';


const routes: Routes = [
  // guest
  { path: '', component: ProductsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent},

  // user Authenticated
  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
  { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard]},
  { path: 'user/my-orders', component: MyOrdersComponent, canActivate: [AuthGuard]},

  // admin
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
