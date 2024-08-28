import { Component } from '@angular/core';
import {DxButtonModule} from "devextreme-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    DxButtonModule,
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {
  constructor( private router: Router ) { }
back() {
  this.router.navigate([ '/product-list' ])

}
}
