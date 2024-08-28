import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DxButtonModule} from "devextreme-angular";
import {ProductListComponent} from "./components/product-list/product-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DxButtonModule, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'products-offer';
  handleButton() {
    console.log("siemanko")
  };
}
