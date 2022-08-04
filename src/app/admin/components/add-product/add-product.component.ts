import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastStateEnum } from 'src/app/core/models/toast-state.enum';
import { ProductService } from 'src/app/core/services/product.service';
import { ToastService } from 'src/app/services/toast.service';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  categories: Category[];
  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private toastService: ToastService,
    private router: Router) { }
  ngOnInit(): void {
    this.setCategories();
  }
  setCategories() {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      this.initForm();
    });
  }
  private initForm() {
    this.addProductForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      categoryId: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      price: ['', [Validators.required, Validators.min(1)]],
    });
  }

  get formControls() {
    return this.addProductForm.controls;
  }
  onSubmit() {
    if (!this.addProductForm.valid) {
      this.addProductForm.markAsUntouched();
      this.addProductForm.updateValueAndValidity();
      return;
    }
    this.productService.addNewProduct(this.addProductForm.value).subscribe((res) => {
      this.toastService.showToastMessage("Add Product", "New product add successfully", ToastStateEnum.Success);
      this.router.navigate(['/products'])
    }, err => this.toastService.showToastMessage("Add Product", "Error happened when adding new product", ToastStateEnum.Error))
  }
}