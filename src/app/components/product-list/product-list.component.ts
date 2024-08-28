import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../products.service";
import {Subscription, map, async, scan, tap} from "rxjs";
import {DxDataGridModule, DxListModule, DxSwitchModule} from "devextreme-angular";
import {Product} from "../../types/product";
import {CurrencyPipe, DatePipe, NgClass, NgFor, NgIf} from "@angular/common";
import {DxDataGridTypes} from "devextreme-angular/ui/data-grid";
import {Router} from "@angular/router";
import notify from "devextreme/ui/notify";
import {ProductsCardsComponent} from "../products-cards/products-cards.component";
import { env } from "../../../env/env";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    DxListModule,
    DxDataGridModule,
    NgFor,
    DxSwitchModule,
    NgIf,
    NgClass,
    CurrencyPipe,
    ProductsCardsComponent,
    DatePipe
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  productSub: Subscription = new Subscription();
  products: Product[] = [];
  columns = ['productName', 'productNameDescription'];
  hintMessage: string = "";
  displayListView: boolean = true;

  constructor(private router: Router, private productService: ProductsService) {}

  ngOnInit(){
    this.productSub = this.productService.getProducts()
      .subscribe(data => this.products = data);
  }

  onFocusedRowChanged(event: DxDataGridTypes.FocusedRowChangedEvent){
    const id = event.row?.key;
    this.router.navigate([ `/product/${id}` ])
  }

  onValueChanged(e: boolean) {
    this.hintMessage = e ? "LIST" : "CARDS";
    this.displayListView = e;
    notify(`selected view: ${this.hintMessage}`);
  }

  protected readonly env = env;
}
