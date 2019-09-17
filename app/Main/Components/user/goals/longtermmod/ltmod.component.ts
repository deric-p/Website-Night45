import { Component,ViewChild,Inject } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { AngularFire, FirebaseApp,FirebaseListObservable } from 'angularfire2';
import {Observable} from 'rxjs/Rx';


@Component({
 
  
  selector: 'my-longtermMod',
  templateUrl: './ltmod.component.html',
  styleUrls:['./ltmod.component.css']
  
})
export class ltmodComponent {}