import { Component, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire, FirebaseListObservable, AngularFireModule } from 'angularfire2';
import "rxjs/add/operator/map";

@Component({
 
  
  selector: 'my-vision',
  templateUrl: './vision.component.html',
  styleUrls:['./vision.component.css']
  
})
export class VisionComponent {
    storageref;
    storage;
    path;
    constructor(){

        this.storage =firebase.storage().ref();
    }
    filebuttoni(event){
        let files = event.srcElement.files[0];
        let uploader=document.getElementById("uploader");
        this.path="images/"+files.name;
        this.storageref=this.storage.child(this.path);
        let task=this.storageref.put(files);
    }
}