import { Component,ViewChild,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';

import { AngularFire, FirebaseApp } from 'angularfire2';


@Component({
 
  
  selector: 'my-about',
  templateUrl: './about.component.html',
  styleUrls:['./about.component.css']
  
})
export class AboutComponent {
  public tempimg;
  @ViewChild('images') public images:ModalDirective;

  imgclicked(imgs:string){
    if(imgs == 'img1'){
      this.tempimg = 'img1';
      this.images.show();
    }
    if(imgs == 'img2'){
      this.tempimg = 'img2';
      this.images.show();
    }
    if(imgs == 'img3'){
      this.tempimg = 'img3';
      this.images.show();
    }
    if(imgs == 'img4'){
      this.tempimg = 'img4';
      this.images.show();
    }
  }
}