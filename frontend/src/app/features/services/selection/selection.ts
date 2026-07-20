import {
  Injectable,
  signal
} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class SelectionService {

  readonly clickedId =
    signal<string | null>(null);
}