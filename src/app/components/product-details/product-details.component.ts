import {Component, effect, input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {ProductsService} from "../../products.service";
import {Product, RequiredProducts} from "../../types/product";
import {DxAccordionModule, DxButtonModule, DxDataGridModule, DxListModule} from "devextreme-angular";
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {ProductsCardsComponent} from "../products-cards/products-cards.component";
import {OsSupportComponent} from "./operating-system/os-support.component";
import {ProductDescriptionComponent} from "./product-description/product-description.component";
import {ProductTitleComponent} from "./product-title/product-title.component";


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    DxButtonModule,
    DxAccordionModule,
    DxListModule,
    CurrencyPipe,
    DatePipe,
    NgForOf,
    ProductsCardsComponent,
    DxDataGridModule,
    RouterLink,
    NgIf,
    RouterOutlet,
    OsSupportComponent,
    ProductDescriptionComponent,
    ProductTitleComponent
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  selectedProduct: Product | null = null;
  listOfProducts: Product[] = [];
  productId = input.required<string>();

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductsService) {
    effect(() => {
      const id = this.productId()
      this.loadData(id)
    })
  }

  loadData(id: string) {
    this.productService.getProduct(id)
      .subscribe(data => {
        this.selectedProduct = data
        this.getRequiredProducts(this.selectedProduct?.requiredProducts);
      });
  }

  getRequiredProducts(requiredProducts: RequiredProducts[] = []) {
    const listOfProducts: Product[] = [];

    requiredProducts
      .map((product) => product.requiredProductId)
      .forEach(id => this.productService.getProduct(id.toString())
        .subscribe((data) => listOfProducts.push(data)))

    this.listOfProducts = listOfProducts;
  }

  back() {
    this.router.navigate(['/product-list'])
  }

}
