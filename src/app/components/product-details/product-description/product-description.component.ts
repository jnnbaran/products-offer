import {Component, Input, OnChanges} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {DxAccordionModule, DxTemplateModule} from "devextreme-angular";
import {Product} from "../../../types/product";
import DataSource from "devextreme/data/data_source";

@Component({
  selector: 'app-product-description',
  standalone: true,
  imports: [
    DatePipe,
    DxAccordionModule,
    DxTemplateModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './product-description.component.html',
  styleUrl: './product-description.component.css'
})
export class ProductDescriptionComponent implements OnChanges {

  dataSource: DataSource | null = null;
  versionSource: DataSource | null = null;
  packetSource: DataSource | null = null;


  @Input() selectedProduct?: Product | null;

  ngOnChanges(): void {
    if (this.selectedProduct) {
      if (this.selectedProduct.packets) {
        this.packetSource = new DataSource({
          store: {
            type: "array",
            data: this.selectedProduct.packets
          },
          group: "packets",

        })
      }
      this.dataSource = new DataSource({
        store: {
          type: "array",
          data: this.selectedProduct.variants
        },
        group: "Variants",

      });
      this.versionSource = new DataSource({
        store: {
          type: "array",
          data: this.selectedProduct.versions
        },
        group: "versions",

      });
    }
  }
}
