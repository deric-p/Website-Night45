import { Component,Inject} from '@angular/core';

import { ModalDirective } from 'ng2-bootstrap';

import { AngularFire, FirebaseApp } from 'angularfire2';


@Component({
 
  
  selector: 'my-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./login.component.css']


})
export class ForgotPasswordComponent { 
    public success = false;
    public emailerror = "";
    public emailicon = "glyphicon glyphicon-envelope";
    auth: any;
  constructor(private af: AngularFire, @Inject(FirebaseApp) firebaseApp: any) {
    this.auth = firebaseApp.auth()
    
  }

  onSubmit(formData) {
      
     if(formData.valid) {
       console.log('Submission worked');
       this.success = false;
       this.emailerror = "";
       this.emailicon = "glyphicon glyphicon-envelope";
        this.auth.sendPasswordResetEmail(formData.value.email)
         .then( (response) => {
           console.log('Sent successfully');
           this.success = true;
           
         })
         .catch( (error) => {
           console.log(error.message);
            if(error.message == "There is no user record corresponding to this identifier. The user may have been deleted." ){
                this.emailicon = "glyphicon glyphicon-remove";
                this.emailerror = "- There is no user record corresponding to this email";
            }
            if(error.message == "The email address is badly formatted."){
                    this.emailicon = "glyphicon glyphicon-remove";
                    this.emailerror = "- The email address is badly formatted";
             }
            })
     }
  }
}