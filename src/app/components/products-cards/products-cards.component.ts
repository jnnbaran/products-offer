import {Component, Input, OnInit} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {Product} from "../../types/product";
import {CurrencyPipe, DatePipe, NgClass, NgForOf} from "@angular/common";
import { env } from "../../../env/env";

@Component({
  selector: 'app-products-cards',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe,
    DatePipe,
    NgClass,
    RouterOutlet
  ],
  templateUrl: './products-cards.component.html',
  styleUrl: './products-cards.component.css'
})
export class ProductsCardsComponent {
  @Input() products: Product[] = [];
  constructor(private router: Router) {}

  openProduct(productId:number) {
    this.router.navigate([ `/product/${productId}` ])
  }

  setClass(index: number) {
  return this.products[index].basePrice > 500
    ? 'product__price'
    : 'eloszkoa'
  }

  protected readonly env = env;
}
