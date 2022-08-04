import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  productIds: number[];
  cartHaveProducts: boolean;
  cartProducts: any[];
  orderItems: any[] = [];
  total: any = 0;

  constructor(private cartService: CartService,
    private authService: AuthService,
    private router: Router) {
    this.productIds = JSON.parse(localStorage.getItem('cart') || '');
    if (this.productIds) {
      this.cartHaveProducts = true;
      const orders = localStorage.getItem("order-items");
      if (orders)
        this.orderItems = JSON.parse(orders);
      else {
        for (let index = 0; index < this.productIds.length; index++) {
          const orderItem = { productId: this.productIds[index], quantity: 1 }
          this.orderItems.push(orderItem);
        }
      }
    }
  }

  ngOnInit(): void {
    this.cartService.getCartProducts(this.productIds).subscribe((products: any) => {
      this.cartProducts = products.map((prod: any) => ({
        id: prod.id,
        name: prod.name,
        description: prod.description,
        price: prod.price,
        hasDiscount: false
      }));
      this.calculateTotal();
    }, err => alert("Something went worng"));
  }

  changeQuantity(event: any, carProduct: any) {
    let orderItem = this.orderItems.find(orderItem => orderItem.productId === carProduct.id);
    orderItem.quantity = event.target.value;
    this.cartService.getDiscountByProductId(carProduct.id).subscribe((discount: any) => {
      if (discount && orderItem.quantity >= discount.numberOfPieces) {
        carProduct.hasDiscount = true;
        const discountAmount = ((carProduct.price * orderItem.quantity) * discount.discountPercentage) / 100;
        carProduct.amountAfterDiscount = (carProduct.price * orderItem.quantity) - discountAmount;
      }
      else {
        carProduct.hasDiscount = false;
        delete carProduct.amountAfterDiscount;
      }
      this.calculateTotal();
    })
  }
  calculateTotal() {
    this.total = 0;
    this.cartProducts.forEach(cp => {
      if (cp?.amountAfterDiscount) {
        this.total += cp.amountAfterDiscount;
      }
      else {
        let orderItem = this.orderItems.find(oi => oi.productId === cp.id);
        this.total += (cp.price * orderItem.quantity);
      }
    });
  }

  onSubmit() {
    if (!this.authService.isLoggedIn()) {
      localStorage.setItem("order-items", JSON.stringify(this.orderItems));
      this.router.navigate(['/login']);
    }
    else {
      const orrder = { userId: localStorage.getItem('uid'), orderItems: this.orderItems };
      this.cartService.placeOrder(orrder).subscribe((res) => {
        localStorage.removeItem('cart');
        localStorage.removeItem('order-items');
        alert("created");
      })
    }
  }

}
