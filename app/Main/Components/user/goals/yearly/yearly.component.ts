import { Component,ViewChild,Inject } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { AngularFire, FirebaseApp,FirebaseListObservable } from 'angularfire2';
import {Observable} from 'rxjs/Rx';


@Component({
 
  
  selector: 'my-yearly',
  templateUrl: './yearly.component.html',
  styleUrls:['./yearly.component.css']
  
})
export class YearlyComponent {
  //variables
  public joineddate;
  public joindate;
  public userid;
  public yearnumber = 31536000000;
  public daynumber = 24*60*60*1000;
  public yearobject;
  public user;
  public goal1object;
  public goal2object;
  public goal3object;
  public goal4object;
  public goal5object;
  public goal1;
  public goal2;
  public goal3;
  public goal4;
  public goal5;
  public complete1;
  public complete2;
  public complete3;
  public complete4;
  public complete5;
  public thisyear = null;
  public goal1check = null;
  public goal2check = null;
  public goal3check = null;
  public goal4check = null;
  public goal5check = null;
  public tempyear;
  public addgoaldone = true;
  public currentgoals;
  public year;
  public yearcount;
  public currentyear;
  public yearcounter;
  public maxnumber = 10;
  public yearcomplete = false;
  //Year Calculations
  datestring = "January 1, 2017 12:00 AM";
  today: number = Date.now();
  referencedate: number = Date.parse(this.datestring);

  

   constructor(private af: AngularFire) {
      // this.af.auth.subscribe(auth => console.log(auth));
      //check join date
    this.yearcalc();
      if(this.af.auth != null){
      this.af.auth.subscribe(auth => {
            this.userid = auth;
          });
      this.joineddate = af.database.object(this.userid.uid+'/personnel/joined');
        this.joineddate.subscribe((obj) =>{
        // set the join date
        this.joindate = obj['$value'];
      });
    }
    this.yearobject = this.userid.uid + "/yearly/"+ this.currentyear;
    this.user = af.database.object(this.yearobject);
    //check if the object exists
    this.user.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
     this.thisyear = false;
     this.goal1check = false;
     this.goal2check = false;
     this.goal3check = false;
     this.goal4check = false;
     this.goal5check = false;
     this.goal1object = af.database.object(this.yearobject+'/goal 1');
     this.goal2object = af.database.object(this.yearobject+'/goal 2');
     this.goal3object = af.database.object(this.yearobject+'/goal 3');
     this.goal4object = af.database.object(this.yearobject+'/goal 4');
     this.goal5object = af.database.object(this.yearobject+'/goal 5');
      this.currentgoals = [
    {goal:this.goal1,status:this.complete1,show:this.goal1check,name:'goal1'},
    {goal:this.goal2,status:this.complete2,show:this.goal2check,name:'goal2'},
    {goal:this.goal3,status:this.complete3,show:this.goal3check,name:'goal3'},
    {goal:this.goal4,status:this.complete4,show:this.goal4check,name:'goal4'},
    {goal:this.goal5,status:this.complete5,show:this.goal5check,name:'goal5'},
  ];

    }else{
      // object does exist
    this.thisyear = true;
    this.goal1object = af.database.object(this.yearobject+'/goal 1');
     this.goal2object = af.database.object(this.yearobject+'/goal 2');
     this.goal3object = af.database.object(this.yearobject+'/goal 3');
     this.goal4object = af.database.object(this.yearobject+'/goal 4');
     this.goal5object = af.database.object(this.yearobject+'/goal 5');

    this.goal1object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal1check = false;
      }
      else{
        // object does exist
        this.goal1check = true;
        this.goal1 = obj.goal;
        this.complete1 = obj.complete
        
      } 
    });
      this.goal2object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal2check = false;
        this.goal2 = "";
        this.complete2 = "q";
        
      }
      else{
        // object does exist
        this.goal2 = obj.goal;
        this.goal2check = true;
        this.complete2 = obj.complete
      } 
   });
      this.goal3object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal3check = false;
        this.goal3 = "";
        this.complete3 = "q";
      }
      else{
        // object does exist
        this.goal3 = obj.goal;
        this.goal3check = true;
        this.complete3 = obj.complete
          } 
        });

        this.goal4object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal4check = false;
        this.goal4 = "";
        this.complete4 = "q";
      }
      else{
        // object does exist
        this.goal4 = obj.goal;
        this.goal4check = true;
        this.complete4 = obj.complete
          } 
        });
        this.goal5object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal5check = false;
        this.goal5 = "";
        this.complete5 = "q";
        this.currentgoals = [
          {goal:this.goal1,status:this.complete1,show:this.goal1check,name:'goal1'},
          {goal:this.goal2,status:this.complete2,show:this.goal2check,name:'goal2'},
          {goal:this.goal3,status:this.complete3,show:this.goal3check,name:'goal3'}
          //{goal:this.goal4,status:this.complete4,show:this.goal4check,name:'goal4'},
          //{goal:this.goal5,status:this.complete5,show:this.goal5check,name:'goal5'},
        ];
        
      }
      else{
        // object does exist
        this.goal5 = obj.goal;
        this.goal5check = true;
        this.complete5 = obj.complete
        this.currentgoals = [
          {goal:this.goal1,status:this.complete1,show:this.goal1check,name:'goal1'},
          {goal:this.goal2,status:this.complete2,show:this.goal2check,name:'goal2'},
          {goal:this.goal3,status:this.complete3,show:this.goal3check,name:'goal3'}
          //{goal:this.goal4,status:this.complete4,show:this.goal4check,name:'goal4'},
          //{goal:this.goal5,status:this.complete5,show:this.goal5check,name:'goal5'},
        ];
          } 
        });
    }
     
   
    });
 
   }
   //year Calculations
   yearcalc(){
     this.yearcount = 0;
    this.year = Math.floor((this.today - this.referencedate)/this.yearnumber);
    if(this.year >= 4){
      this.yearcount = Math.floor(this.year/4)
    }
    
    this.currentyear = this.referencedate + (this.year*this.yearnumber) + (this.yearcount*this.daynumber);
    this.yearcounter = this.currentyear;
    this.year = this.year+1;
   }
   // for html purposes
   yearpicker(years:string){
     if(years == 'goal1'){
       this.tempyear = 'goal1';
     }
     if(years == 'goal2'){
       this.tempyear = 'goal2';
     }
     if(years == 'goal3'){
       this.tempyear = 'goal3';
     }
     if(years == 'goal4'){
       this.tempyear = 'goal4';
     }
     if(years == 'goal5'){
       this.tempyear = 'goal5';
     }
   }
   // search through previous year
   previousyear(){
     this.yearcomplete = false;
     if(this.year >= 4){
       this.year = this.year - 1;
        for(var i=0;i<this.maxnumber;i++){
          if((this.year/4) == i){
            this.yearcounter = this.yearcounter - this.yearnumber - this.daynumber;
            
            this.yearcomplete = true;
          }
          if((!this.yearcomplete)&&(i == (this.maxnumber-1))){
          this.yearcounter = this.yearcounter - this.yearnumber;
            
            this.yearcomplete = true;
            
         }
        }
      

     }
     else{
      this.yearcounter = this.yearcounter - this.yearnumber;
      this.year  = this.year - 1;
     }
     
      this.yearobject = this.userid.uid + "/yearly/"+ this.yearcounter;
    this.user = this.af.database.object(this.yearobject);
    //check if the object exists
    this.user.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
      this.thisyear = false;
     this.goal1check = false;
     this.goal2check = false;
     this.goal3check = false;
     this.goal4check = false;
     this.goal5check = false;
     this.goal1object = this.af.database.object(this.yearobject+'/goal 1');
     this.goal2object = this.af.database.object(this.yearobject+'/goal 2');
     this.goal3object = this.af.database.object(this.yearobject+'/goal 3');
     this.goal4object = this.af.database.object(this.yearobject+'/goal 4');
     this.goal5object = this.af.database.object(this.yearobject+'/goal 5');
      
    }else{
      // object does exist
          this.thisyear = true;
    this.goal1object = this.af.database.object(this.yearobject+'/goal 1');
     this.goal2object = this.af.database.object(this.yearobject+'/goal 2');
     this.goal3object = this.af.database.object(this.yearobject+'/goal 3');
     this.goal4object = this.af.database.object(this.yearobject+'/goal 4');
     this.goal5object = this.af.database.object(this.yearobject+'/goal 5');

    this.goal1object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal1check = false;
      }
      else{
        // object does exist
        this.goal1check = true;
        this.goal1 = obj.goal;
        this.complete1 = obj.complete
      } 
    });
      this.goal2object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal2check = false;
        this.goal2 = "";
        this.complete2 = "q";
      }
      else{
        // object does exist
        this.goal2 = obj.goal;
        this.goal2check = true;
        this.complete2 = obj.complete
      } 
   });
      this.goal3object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal3check = false;
        this.goal3 = "";
        this.complete3 = "q";
      }
      else{
        // object does exist
        this.goal3 = obj.goal;
        this.goal3check = true;
        this.complete3 = obj.complete
          } 
        });
        this.goal4object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal4check = false;
        this.goal4 = "";
        this.complete4 = "q";
      }
      else{
        // object does exist
        this.goal4 = obj.goal;
        this.goal4check = true;
        this.complete4 = obj.complete
          } 
        });
        this.goal5object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal5check = false;
        this.goal5 = "";
        this.complete5 = "q";
        this.currentgoals = [
          {goal:this.goal1,status:this.complete1,show:this.goal1check,name:'goal1'},
          {goal:this.goal2,status:this.complete2,show:this.goal2check,name:'goal2'},
          {goal:this.goal3,status:this.complete3,show:this.goal3check,name:'goal3'}
          //{goal:this.goal4,status:this.complete4,show:this.goal4check,name:'goal4'},
          //{goal:this.goal5,status:this.complete5,show:this.goal5check,name:'goal5'},
        ];
      }
      else{
        // object does exist
        this.goal5 = obj.goal;
        this.goal5check = true;
        this.complete5 = obj.complete
        this.currentgoals = [
          {goal:this.goal1,status:this.complete1,show:this.goal1check,name:'goal1'},
          {goal:this.goal2,status:this.complete2,show:this.goal2check,name:'goal2'},
          {goal:this.goal3,status:this.complete3,show:this.goal3check,name:'goal3'}
          //{goal:this.goal4,status:this.complete4,show:this.goal4check,name:'goal4'},
          //{goal:this.goal5,status:this.complete5,show:this.goal5check,name:'goal5'},
        ];
          } 
        });
    }
    });

   }
   // go to next year
   nextyear(){
     this.yearcomplete = false;
     
     if(this.year >= 4){
        for(var i=0;i<this.maxnumber;i++){
          if((this.year/4) == i){
            this.yearcounter = this.yearcounter + this.yearnumber + this.daynumber;
            this.year = this.year + 1;
            this.yearcomplete = true;
            
          }

        if((!this.yearcomplete)&&(i == (this.maxnumber-1))){
          this.yearcounter = this.yearcounter + this.yearnumber;
            this.year = this.year + 1;
            
            this.yearcomplete = true;
         }
        }
       
       

     }
     else{
      this.yearcounter = this.yearcounter + this.yearnumber;
      this.year = this.year + 1;
       
     }
   
    this.yearobject = this.userid.uid + "/yearly/"+ this.yearcounter;
    this.user = this.af.database.object(this.yearobject);
    //check if the object exists
    this.user.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
     this.thisyear = false;
     this.goal1check = false;
     this.goal2check = false;
     this.goal3check = false;
     this.goal4check = false;
     this.goal5check = false;
     this.goal1object = this.af.database.object(this.yearobject+'/goal 1');
     this.goal2object = this.af.database.object(this.yearobject+'/goal 2');
     this.goal3object = this.af.database.object(this.yearobject+'/goal 3');
     this.goal4object = this.af.database.object(this.yearobject+'/goal 4');
     this.goal5object = this.af.database.object(this.yearobject+'/goal 5');
     
    }else{
      // object does exist
          this.thisyear = true;
    this.goal1object = this.af.database.object(this.yearobject+'/goal 1');
     this.goal2object = this.af.database.object(this.yearobject+'/goal 2');
     this.goal3object = this.af.database.object(this.yearobject+'/goal 3');
     this.goal4object = this.af.database.object(this.yearobject+'/goal 4');
     this.goal5object = this.af.database.object(this.yearobject+'/goal 5');

    this.goal1object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal1check = false;
      }
      else{
        // object does exist
        this.goal1check = true;
        this.goal1 = obj.goal;
        this.complete1 = obj.complete
      } 
    });
      this.goal2object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal2check = false;
        this.goal2 = "";
        this.complete2 = "q";
      }
      else{
        // object does exist
        this.goal2 = obj.goal;
        this.goal2check = true;
        this.complete2 = obj.complete
      } 
   });
      this.goal3object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal3check = false;
        this.goal3 = "";
        this.complete3 = "q";
      }
      else{
        // object does exist
        this.goal3 = obj.goal;
        this.goal3check = true;
        this.complete3 = obj.complete
          } 
        });
        this.goal4object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal4check = false;
        this.goal4 = "";
        this.complete4 = "q";
      }
      else{
        // object does exist
        this.goal4 = obj.goal;
        this.goal4check = true;
        this.complete4 = obj.complete
          } 
        });
        this.goal5object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal5check = false;
        this.goal5 = "";
        this.complete5 = "q";
        this.currentgoals = [
          {goal:this.goal1,status:this.complete1,show:this.goal1check,name:'goal1'},
          {goal:this.goal2,status:this.complete2,show:this.goal2check,name:'goal2'},
          {goal:this.goal3,status:this.complete3,show:this.goal3check,name:'goal3'}
          //{goal:this.goal4,status:this.complete4,show:this.goal4check,name:'goal4'},
          //{goal:this.goal5,status:this.complete5,show:this.goal5check,name:'goal5'},
        ];
      }
      else{
        // object does exist
        this.goal5 = obj.goal;
        this.goal5check = true;
        this.complete5 = obj.complete

        this.currentgoals = [
          {goal:this.goal1,status:this.complete1,show:this.goal1check,name:'goal1'},
          {goal:this.goal2,status:this.complete2,show:this.goal2check,name:'goal2'},
          {goal:this.goal3,status:this.complete3,show:this.goal3check,name:'goal3'}
          //{goal:this.goal4,status:this.complete4,show:this.goal4check,name:'goal4'},
          //{goal:this.goal5,status:this.complete5,show:this.goal5check,name:'goal5'},
        ];
          } 
        });
    }
    });

   }
   addgoal(addinggoal:string){
      this.addgoaldone = false;
     if((!this.addgoaldone)&&
     (!this.goal1check)){
        this.goal1object.set({goal:addinggoal,complete:"q"});
        this.thisyear = true;
        this.goal1check = true;
        this.addgoaldone = true;
     }
      if((!this.addgoaldone)&&
     (!this.goal2check)&&
     (this.goal1check)){
        this.goal2object.set({goal:addinggoal,complete:"q"});
        this.goal2check = true;
        this.addgoaldone = true;
     }
      if((!this.addgoaldone)&&
     (!this.goal3check)&&
     (this.goal1check)&&
     (this.goal2check)){
        this.goal3object.set({goal:addinggoal,complete:"q"});
        this.goal3check = true;
        this.addgoaldone = true;
     }
      if((!this.addgoaldone)&&
     (this.goal3check)&&
     (this.goal1check)&&
     (this.goal2check)&&
     (!this.goal4check)){
        this.goal4object.set({goal:addinggoal,complete:"q"});
        this.goal4check = true;
        this.addgoaldone = true;
     }
      if((!this.addgoaldone)&&
     (this.goal3check)&&
     (this.goal1check)&&
     (this.goal2check)&&
     (this.goal4check)&&
     (!this.goal5check)){
        this.goal5object.set({goal:addinggoal,complete:"q"});
        this.goal5check = true;
        this.addgoaldone = true;
     }
   }
   //update existing goal with new goal
    addupdate(goals:string,goalupdated:string){
      if(goals == "goal1"){
        this.goal1object.update({goal:goalupdated});
      }
      if(goals == "goal2"){
        this.goal2object.update({goal:goalupdated});
      }
      if(goals == "goal3"){
        this.goal3object.update({goal:goalupdated});
      }
      if(goals == "goal4"){
        this.goal4object.update({goal:goalupdated});
      }
      if(goals == "goal5"){
        this.goal5object.update({goal:goalupdated});
      }
    }
     // mark as complete or incomplete for the goal
    completed(status:string,goals:string){
        if(goals == "goal1"){
        this.goal1object.update({complete:status});
      }
      if(goals == "goal2"){
        this.goal2object.update({complete:status});
      }
      if(goals == "goal3"){
        this.goal3object.update({complete:status});
      }
      if(goals == "goal4"){
        this.goal4object.update({complete:status});
      }
      if(goals == "goal5"){
        this.goal5object.update({complete:status});
      }
    }
      removegoal(goals:string){
         if(goals == "goal1"){
        this.goal1object.remove();
      }
      if(goals == "goal2"){
        this.goal2object.remove();
      }
      if(goals == "goal3"){
        this.goal3object.remove();
      }
      if(goals == "goal4"){
        this.goal4object.remove();
      }
      if(goals == "goal5"){
        this.goal5object.remove();
      }
    }
        onSubmit(formData,goals:string){

      this.completed(formData.value.prog,goals);
      
    }
    onSubmitGoal(formData){
  
     this.addgoal(formData.value.weeklygoal);
    }
     onEditSubmitGoal(formData,goals:string){
    
      this.addupdate(goals,formData.value.weeklygoal);
    }
    
  
    public progession = [

    { value: 'y', display: 'Complete' },
    { value: 'n', display: 'Not Complete' }
  ];
  public currentprogession = [
    { value: 'q', display: 'In Progress' },
    { value: 'y', display: 'Complete' }
  ];
  public nextprogession = [
    { value: 'q', display: 'In Progress' }
  ];

}