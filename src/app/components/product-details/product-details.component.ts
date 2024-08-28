import {Component, effect, input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {ProductsService} from "../../products.service";
import {Packets, Product, Variants, Versions} from "../../types/product";
import {map, Subscription, tap} from "rxjs";
import {DxAccordionModule, DxButtonModule, DxDataGridModule, DxListModule} from "devextreme-angular";
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {ProductsCardsComponent} from "../products-cards/products-cards.component";
import DataSource from "devextreme/data/data_source";


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
    RouterOutlet
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  procutSub: Subscription = new Subscription();
  selectedProduct: Product | null = null;
  listOfProducts : Product[] =  [];
  dataSource: DataSource | null = null;
  versionSource: DataSource | null = null;
  packetSource: DataSource | null = null;
  productId = input.required<string>();
  private loadingSubs = new Subscription();
  isLoading = false;
  productName: string[] = []


  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductsService) {
    effect(() => {
      const id = this.productId()
      this.loadData(id)
    })
  }


  ngOnInit() {
  }


  loadData(id: string){
    this.loadingSubs = this.productService.loadingStateChange.subscribe(isLoading =>
      this.isLoading = isLoading)
    this.procutSub = this.productService.getProduct(id).pipe(
      tap(data => console.log(data)),
      map(data => {
        this.selectedProduct = data,
          this.productName = data.productName.split(' ');
        if(data.packets) {
          this.packetSource = new DataSource({
            store: {
              type: "array",
              data: data.packets
            },
            group: "packets",

          })
        }
        this.dataSource = new DataSource({
          store: {
            type: "array",
            data: data.variants
          },
          group: "Variants",

        }),
          this.versionSource = new DataSource({
            store: {
              type: "array",
              data: data.versions
            },
            group: "versions",

          })

      }),
    )
      .subscribe()


    setTimeout(() => {

      this.getRequiredProducts(id);

    }, 1000)
  }
  back() {
    this.router.navigate([ '/product-list' ])

  }

  getRequiredProducts(index: string){
    const listOfProductsId:number[] = [];
    const listOfProducts: Product[] = [];
    this.productService.loadingStateChange.next(true);

    this.selectedProduct?.requiredProducts?.forEach((product) => {
       listOfProductsId.push(product.requiredProductId)
     })

    listOfProductsId.forEach((id) => {
      (this.productService.getProduct(id.toString()).subscribe((data) => listOfProducts.push(data)))
    })
    this.productService.loadingStateChange.next(false);
    this.listOfProducts = listOfProducts;
  }

}
