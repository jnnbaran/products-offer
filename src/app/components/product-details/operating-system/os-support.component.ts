import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {OperatingSystem} from "../model/OperatingSystem";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-operating-system-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './os-support.component.html',
  styleUrl: './os-support.component.css'
})
export class OsSupportComponent implements OnChanges {

  protected readonly OperatingSystem = OperatingSystem;

  @Input() operatingSystem: string | undefined;

  supportedOperatingSystem: OperatingSystem | undefined;

  ngOnChanges(): void {
    if(this.isSupported(this.operatingSystem)) {
      this.supportedOperatingSystem = this.operatingSystem;
    }
  }

  isSupported(os: string | undefined): os is OperatingSystem {
    switch (os) {
      case OperatingSystem.WINDOWS:
      case OperatingSystem.LINUX:
      case OperatingSystem.MACOS: {
        return true;
      }
      default:
        return false;
    }
  }
}
