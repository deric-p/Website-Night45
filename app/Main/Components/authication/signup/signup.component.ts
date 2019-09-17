import { Component,Inject} from '@angular/core';

import { ModalDirective } from 'ng2-bootstrap';

import { AngularFire, FirebaseApp } from 'angularfire2';


@Component({
 
  
  selector: 'my-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']


})
export class SignupComponent {
    public error: any;
    public loginfailure;
    public emailerror ="";
    public passworderror="";
    public user;
  constructor(private af: AngularFire) {  }

  onSubmit(formData) {
    this.emailerror = "";
    this.passworderror = "";
    this.user = null;

    if(formData.valid) {
        if(formData.value.password == formData.value.repassword){

            this.af.auth.createUser({
                    email: formData.value.email,
                    password: formData.value.password
                }).then(
                    (success) => {
                    console.log(success.uid);
                    this.user= this.af.database.object(success.uid + "/personnel");
                    this.user.set({
                    'first name':formData.value.firstname,
                    'last name':formData.value.lastname,
                    joined:Date.now(),
                    premium:'n'

                });

                }).catch(
                    (err) => {
                    
                    this.loginfailure = true;
                
                    if(err.message == "The email address is already in use by another account." ){
                
                    this.emailerror = " The email address is already in use by another account.";
                    }
                    if(err.message == "The email address is badly formatted."){
                
                        this.emailerror = " The email address is badly formatted";
                    }
                    if(err.message == "Password should be at least 6 characters"){
                
                        this.passworderror = " Password should be at least 6 characters";
                    }
                
                    
                })
        }else{
            this.passworderror = " The passwords dont match";
        }
      
    } else {
      this.error = 'Your form is invalid';
    }
  }
}