import {
  Component,
  input
} from "@angular/core";

@Component({
  selector: "app-bounds",
  imports: [],
  templateUrl: "./bounds.html",
  styleUrl: "./bounds.scss"
})

export class Bounds {

  readonly style =
    input.required<any>();

  readonly highlighted =
    input.required<boolean>();
}