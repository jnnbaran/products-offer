import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Product} from "../../../types/product";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-product-title',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './product-title.component.html',
  styleUrl: './product-title.component.css'
})
export class ProductTitleComponent implements OnChanges{
  @Input() selectedProduct?: Product | null;
  productName: string[] = []
  getProductName(product: Product) {
      this.productName = product.productName.split(' ');
  }

  ngOnChanges(): void {
    if(this.selectedProduct) {
      this.getProductName(this.selectedProduct)
    }
  }
}
