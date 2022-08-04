import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AddProductComponent } from '../components/add-product/add-product.component';
import { ProductListComponent } from 'src/app/shared/components/product-list/product-list.component';
import { AuthGuradService } from 'src/app/gurads/auth-gurad.service';
const routes: Routes = [
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuradService] },
  { path: 'products', component: ProductListComponent }
];


@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
