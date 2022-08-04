import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdminRoutingModule } from './../admin/admin-routing/admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddDiscountComponent } from './components/add-discount/add-discount.component';



@NgModule({
  declarations: [
    AddProductComponent,
    AddDiscountComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
