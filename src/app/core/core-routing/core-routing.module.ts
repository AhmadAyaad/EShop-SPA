import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { ProductListComponent } from 'src/app/shared/components/product-list/product-list.component';
import { CartComponent } from 'src/app/shared/components/cart/cart.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'cart', component: CartComponent }
];



@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
