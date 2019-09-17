import { Component,ViewChild,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';

import { AngularFire, FirebaseApp } from 'angularfire2';


@Component({
 
  
  selector: 'my-navbar',
  templateUrl: './navbar.component.html',
  styleUrls:['./navbar.component.css']
  
})
export class NavBarComponent {
  public goals = false;
  public lgoals = false;
  public nightlytasks = true;
  public achievements = false;
  public calender = false;
  public profiles = false;
  public feedback = false;
  public name;
  public firstname
  public userid;
  @ViewChild('login') public login:ModalDirective;
 constructor(private af: AngularFire) {
    // this.af.auth.subscribe(auth => console.log(auth));
     
  }
  ngOnInit(){
     if(this.af.auth != null){
      this.af.auth.subscribe(auth => {
          this.userid = auth;
          if(auth!=null){
               this.firstname = this.af.database.object(auth.uid + "/personnel/first name");
                this.firstname.subscribe((obj) =>{
               
                this.name = obj['$value'];
             });
             
          }
        });
      
    
      }
      
  }
  goal(){
    this.goals = true;
    this.nightlytasks = false;
    this.achievements = false;
    this.calender = false;
    this.lgoals = false;
    this.profiles = false;
    this.feedback = false;
  }
  nighttask(){
    
    this.goals = false;
    this.nightlytasks = true;
    this.achievements = false;
    this.calender = false;
    this.lgoals = false;
    this.profiles = false;
    this.feedback = false;
  }
  achievement(){
    this.goals = false;
    this.nightlytasks = false;
    this.achievements = true;
    this.calender = false;
    this.lgoals = false;
    this.profiles = false;
    this.feedback = false;
  }
  calend(){
    this.goals = false;
    this.nightlytasks = false;
    this.achievements = false;
    this.calender = true;
    this.lgoals = false;
    this.profiles = false;
    this.feedback = false;
  }
  lgoal(){
    this.goals = false;
    this.nightlytasks = false;
    this.achievements = false;
    this.calender = false;
    this.lgoals = true;
    this.profiles = false;
    this.feedback = false;
  }
  logout() {
    
    this.af.auth.logout();
    location.reload();
    
  }
  profile(){
    this.goals = false;
    this.nightlytasks = false;
    this.achievements = false;
    this.calender = false;
    this.lgoals = false;
    this.profiles = true;
    this.feedback = false;
  }
  feedbacks(){
    this.goals = false;
    this.nightlytasks = false;
    this.achievements = false;
    this.calender = false;
    this.lgoals = false;
    this.profiles = false;
    this.feedback = true;
  }
   loginsuccess = false;
    
    loginfailure = false;
    passworderror = "";
    emailerror = "";
    emailicon = "glyphicon glyphicon-envelope";
    passwordicon = "glyphicon glyphicon-asterisk";
   public error: any;
  
 
  onSubmit(formData) {
    if(formData.valid) {
      
      this.emailicon = "glyphicon glyphicon-envelope";
      this.passwordicon = "glyphicon glyphicon-asterisk";
      this.emailerror = "";
      this.passworderror = "";
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
          
        this.loginsuccess = true;
        this.login.hide();
        
      }).catch(
        (err) => {
        
        
        this.loginfailure = true;
      
        if(err.message == "There is no user record corresponding to this identifier. The user may have been deleted." ){
          this.emailicon = "glyphicon glyphicon-remove";
          this.emailerror = "- There is no user record corresponding to this email";
        }
        if(err.message == "The email address is badly formatted."){
            this.emailicon = "glyphicon glyphicon-remove";
            this.emailerror = "- The email address is badly formatted";
        }
        if(err.message == "The password is invalid or the user does not have a password."){
          this.passwordicon = "glyphicon glyphicon-remove";
          this.passworderror = "- The password is incorrect. please try again";
        }
      })
    } else {
      this.error = 'Your form is invalid';
    }
  }
 }
