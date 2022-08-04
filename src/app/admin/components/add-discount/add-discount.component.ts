import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from 'src/app/core/models/product.model';
import { Discount } from '../../models/discount.model';
import { DiscountService } from '../../services/discount.service';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.scss']
})
export class AddDiscountComponent implements OnInit {
  addNewDiscount: FormGroup;
  constructor(private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private discountService: DiscountService) { }

  ngOnInit(): void {
    this.initForm(this.config.data?.product)
  }
  initForm(product: Product) {
    this.addNewDiscount = this.formBuilder.group({
      name: [{ value: product.name, disabled: true }],
      numberOfPieces: ['', [Validators.required, Validators.min(1)]],
      discountPercentage: ['', [Validators.required, Validators.min(1)]],
    })
  }

  get formControls() {
    return this.addNewDiscount.controls;
  }

  onSubmit() {
    if (!this.addNewDiscount.valid) {
      this.addNewDiscount.markAllAsTouched();
      this.addNewDiscount.updateValueAndValidity();
      return;
    }
    const discount: Discount = {
      productId: this.config?.data?.product?.id,
      numberOfPieces: this.addNewDiscount.controls.numberOfPieces.value,
      discountPercentage: this.addNewDiscount.controls.discountPercentage.value
    };
    this.discountService.addNewDiscount(discount).subscribe((res) => {
      this.ref.close();
      alert("Discount Created successfully")
    }, err => alert("Something went wrong"));
  }

}
