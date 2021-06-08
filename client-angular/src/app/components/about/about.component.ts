import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  constructor(private _snackBar: MatSnackBar) { }

  onSendClick() {
    this._snackBar.open("Thanks! Your query has been sent.", "Dismiss")
  }

}
