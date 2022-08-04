import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { forkJoin } from 'rxjs';
import { AddDiscountComponent } from 'src/app/admin/components/add-discount/add-discount.component';
import { Category } from 'src/app/admin/models/category.model';
import { CategoryService } from 'src/app/admin/services/category.service';
import { Product } from 'src/app/core/models/product.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  isAdmin: boolean = false;
  totalCount: number;
  paginationConfig: any = {
    pageIndex: 0,
    pageSize: 5
  }
  categories: Category[];
  filteredCategoriesIds: number[] = [];
  constructor(private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private dialogService: DialogService,
    private categoryService: CategoryService) {
    this.isAdmin = this.authService.isAdmin;
  }

  ngOnInit(): void {
    forkJoin([this.categoryService.getCategories(),
    this.productService.getProducts(this.paginationConfig.pageIndex, this.paginationConfig.pageSize)])
      .subscribe((results: any) => {
        this.categories = results[0];
        this.products = results[1]?.items;
      });
  }
  getCategories() {
    return this.categoryService.getCategories();
  }
  getProducts(pageIndex: any, pageSize: any) {
    this.productService.getProducts(pageIndex, pageSize)
      .subscribe((products: any) => {
        this.products = products.items;
        this.totalCount = products.rowCount;
      }, err => alert("Something went wrong while retriving the products."));
  }
  onPageChange(paginateEventData: any) {
    const pageIndex = paginateEventData.first / paginateEventData.rows;
    this.paginationConfig.pageIndex = pageIndex;
    this.getProducts(this.paginationConfig.pageIndex, paginateEventData.rows);
  }
  onCreateNewDiscount(product: Product) {
    const ref = this.dialogService.open(AddDiscountComponent, {
      data: {
        product
      }
    })
    ref.onClose.subscribe((sa) => {
      this.getProducts(this.paginationConfig.pageIndex, this.paginationConfig.pageSize);
    })
  }
  navigateToaddNewProductpage(): void {
    this.router.navigate(['/admin/add-product']);
  }
  onFilterCategory(event: any) {
    this.filteredCategoriesIds = event.value.map((val: any) => val.id);
    this.productService.getFilterdProducts({
      categoriesIds:
        this.filteredCategoriesIds, pageIndex: this.paginationConfig.pageIndex, pageSize: this.paginationConfig.pageSize
    })
      .subscribe((res: any) => {
        this.products = res?.items;
        this.totalCount = res?.rowCount;
      }, err => alert("Someting went wrong"));
  }
  addToCart(product: Product) {
    if (!localStorage.getItem('cart'))
      localStorage.setItem("cart", JSON.stringify([product.id]))
    else {
      let res: any = localStorage.getItem('cart');
      let productsIds: Array<any> = JSON.parse(res);
      if (!productsIds.includes(product.id)) {
        productsIds.push(product.id)
        localStorage.removeItem('cart')
        localStorage.setItem("cart", JSON.stringify(productsIds));
      }
    }
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }
}
