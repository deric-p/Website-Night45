import { Component } from '@angular/core';
import { AngularFire, FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './Main/main.component.html'
})
export class AppComponent {

  constructor(private af: AngularFire) {
    // this.af.auth.subscribe(auth => console.log(auth));
  }
}
