import {
  Component,
  input,
  output
} from "@angular/core";

import {
  MatIconModule
} from "@angular/material/icon";

import {
  MatButtonModule
} from "@angular/material/button";

@Component({

  selector: "app-split-controls",

  imports: [

    MatButtonModule,
    MatIconModule

  ],

  templateUrl: "./split-controls.html",

  styleUrl: "./split-controls.scss"

})

export class SplitControls {

  readonly collapseLeft =
    output<void>();

  readonly collapseRight =
    output<void>();

  readonly reset =
    output<void>();

}