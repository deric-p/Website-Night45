import { Component,ViewChild,Inject } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { AngularFire, FirebaseApp,FirebaseListObservable } from 'angularfire2';
import {Observable} from 'rxjs/Rx';


@Component({
 
  
  selector: 'my-monthly',
  templateUrl: './monthly.component.html',
  styleUrls:['./monthly.component.css']
  
})
export class MonthlyComponent {
  public joineddate;
  public joindate;
  public userid;
  public monthobject;
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
  public thismonth = null;
  public goal1check = null;
  public goal2check = null;
  public goal3check = null;
  public goal4check = null;
  public goal5check = null;
  public tempmonth;
  public todaydate;
  public addgoaldone = true;
  public currentgoals;
  public montharray = [31,28,31,30,31,30,31,31,30,31,30,31];
  public datestring = "January 1, 2018 12:00 AM";
  public today: number = Date.now();
  public referencedate: number = Date.parse(this.datestring);
  public monthcounter = 0;;
  public yearcounter = 1;
  public currentmonth;
  public datecounter;
  public leapyear = false;
  public yearreset = false;
  public sixmonth;
  public daynumber = 24*60*60*1000;

   constructor(private af: AngularFire) {
      // this.af.auth.subscribe(auth => console.log(auth));
      //check join date
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
    this.monthcalculations();
    this.sixmonthmark();
    
     this.monthobject = this.userid.uid + "/monthly/"+ this.currentmonth;
    this.user = af.database.object(this.monthobject);
    //check if the object exists
    this.user.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
     this.thismonth = false;
     this.goal1check = false;
     this.goal2check = false;
     this.goal3check = false;
     this.goal4check = false;
     this.goal5check = false;
     this.goal1object = af.database.object(this.monthobject+'/goal 1');
     this.goal2object = af.database.object(this.monthobject+'/goal 2');
     this.goal3object = af.database.object(this.monthobject+'/goal 3');
     this.goal4object = af.database.object(this.monthobject+'/goal 4');
     this.goal5object = af.database.object(this.monthobject+'/goal 5');
      this.currentgoals = [
    {goal:this.goal1,status:this.complete1,show:this.goal1check,name:'goal1'},
    {goal:this.goal2,status:this.complete2,show:this.goal2check,name:'goal2'},
    {goal:this.goal3,status:this.complete3,show:this.goal3check,name:'goal3'},
    {goal:this.goal4,status:this.complete4,show:this.goal4check,name:'goal4'},
    {goal:this.goal5,status:this.complete5,show:this.goal5check,name:'goal5'},
  ];

    }else{
      // object does exist
    this.thismonth = true;
    this.goal1object = af.database.object(this.monthobject+'/goal 1');
     this.goal2object = af.database.object(this.monthobject+'/goal 2');
     this.goal3object = af.database.object(this.monthobject+'/goal 3');
     this.goal4object = af.database.object(this.monthobject+'/goal 4');
     this.goal5object = af.database.object(this.monthobject+'/goal 5');

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
   sixmonthmark(){
     this.sixmonth = this.currentmonth;
     for(var i=0;i<7;i++){
       
        if((this.monthcounter + i)> 11){
          this.sixmonth = this.sixmonth + (this.montharray[this.monthcounter + i - 11]*this.daynumber);
        }
        else{
          this.sixmonth = this.sixmonth + (this.montharray[this.monthcounter + i]*this.daynumber);
        
        }
     }
   }
   monthcalculations(){
     this.todaydate = false;

     while(!this.todaydate){
       if(this.monthcounter >= 11){
          this.monthcounter = 0;
          this.yearcounter = this.yearcounter + 1;
          
       }
      else if((this.referencedate +(this.montharray[this.monthcounter]*24*60*60*1000))<this.today){
        this.referencedate = this.referencedate +(this.montharray[this.monthcounter]*24*60*60*1000);
         this.monthcounter = this.monthcounter + 1;

         if((this.monthcounter == 1)&&(this.yearcounter == 4)){
           this.leapyear = true;
           this.yearcounter  = 0;
           this.referencedate = this.referencedate + (1000*24*60*60);
         }
       }
       else if(((this.referencedate +(this.montharray[this.monthcounter]*24*60*60*1000))>=this.today)&&(!this.leapyear)){
         this.todaydate = true;
         this.currentmonth = this.referencedate;
         this.datecounter = this.currentmonth;
        
       }
      else if(((this.referencedate +(this.montharray[this.monthcounter]*24*60*60*1000))>=this.today)&&(this.leapyear)){
         this.todaydate = true;
         this.currentmonth = this.referencedate;
         this.referencedate = this.referencedate;
         this.datecounter = this.currentmonth;
         this.leapyear = false;
      } 
     }
   }
   previousmonth(){

    if(this.monthcounter <= 0){
      this.monthcounter = 11;
      this.datecounter  = this.datecounter - (this.montharray[this.monthcounter]*24*60*60*1000);
      
      this.monthobject = this.userid.uid + "/monthly/"+ this.datecounter;
      this.user = this.af.database.object(this.monthobject);
      if(this.yearcounter <= 0){
        this.yearcounter =4;
      }
      else{
        this.yearcounter = this.yearcounter - 1;
      }
    }
    else{
      if((this.yearcounter == 4)&&(this.monthcounter == 1)){
        this.monthcounter = this.monthcounter - 1;
        this.datecounter  = this.datecounter - (this.montharray[this.monthcounter]*24*60*60*1000) - (1000*24*60*60);
        
        this.monthobject = this.userid.uid + "/monthly/"+ this.datecounter;
        this.user = this.af.database.object(this.monthobject);
      }else{
        this.monthcounter = this.monthcounter - 1;
        this.datecounter  = this.datecounter - (this.montharray[this.monthcounter]*24*60*60*1000);
        
        this.monthobject = this.userid.uid + "/monthly/"+ this.datecounter;
        this.user = this.af.database.object(this.monthobject);
      }
      
    }
   
    
    this.user.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
      this.thismonth = false;
     this.goal1check = false;
     this.goal2check = false;
     this.goal3check = false;
     this.goal4check = false;
     this.goal5check = false;
     this.goal1object = this.af.database.object(this.monthobject+'/goal 1');
     this.goal2object = this.af.database.object(this.monthobject+'/goal 2');
     this.goal3object = this.af.database.object(this.monthobject+'/goal 3');
     this.goal4object = this.af.database.object(this.monthobject+'/goal 4');
     this.goal5object = this.af.database.object(this.monthobject+'/goal 5');
      
    }else{
      // object does exist
          this.thismonth = true;
    this.goal1object = this.af.database.object(this.monthobject+'/goal 1');
     this.goal2object = this.af.database.object(this.monthobject+'/goal 2');
     this.goal3object = this.af.database.object(this.monthobject+'/goal 3');
     this.goal4object = this.af.database.object(this.monthobject+'/goal 4');
     this.goal5object = this.af.database.object(this.monthobject+'/goal 5');

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
   nextmonth(){
      if(this.monthcounter >= 11){
      
      this.datecounter  = this.datecounter + (this.montharray[this.monthcounter]*24*60*60*1000);
      this.monthcounter = 0;
      this.monthobject = this.userid.uid + "/monthly/"+ this.datecounter;
      this.user = this.af.database.object(this.monthobject);
      if(this.yearcounter >= 4){
        this.yearcounter =0;
      }
      else{
        this.yearcounter = this.yearcounter + 1;
      }
    }
    else{
      if((this.yearcounter == 4)&&(this.monthcounter == 1)){
        
        this.datecounter  = this.datecounter + (this.montharray[this.monthcounter]*24*60*60*1000) + (1000*24*60*60);
        this.monthcounter = this.monthcounter + 1;
        this.monthobject = this.userid.uid + "/monthly/"+ this.datecounter;
        this.user = this.af.database.object(this.monthobject);
      }else{
        
        this.datecounter  = this.datecounter + (this.montharray[this.monthcounter]*24*60*60*1000);
        this.monthcounter = this.monthcounter + 1;
        this.monthobject = this.userid.uid + "/monthly/"+ this.datecounter;
        this.user = this.af.database.object(this.monthobject);
      }
     
    }
   

    this.user.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
      this.thismonth = false;
     this.goal1check = false;
     this.goal2check = false;
     this.goal3check = false;
     this.goal4check = false;
     this.goal5check = false;
     this.goal1object = this.af.database.object(this.monthobject+'/goal 1');
     this.goal2object = this.af.database.object(this.monthobject+'/goal 2');
     this.goal3object = this.af.database.object(this.monthobject+'/goal 3');
     this.goal4object = this.af.database.object(this.monthobject+'/goal 4');
     this.goal5object = this.af.database.object(this.monthobject+'/goal 5');
      
    }else{
      // object does exist
          this.thismonth = true;
    this.goal1object = this.af.database.object(this.monthobject+'/goal 1');
     this.goal2object = this.af.database.object(this.monthobject+'/goal 2');
     this.goal3object = this.af.database.object(this.monthobject+'/goal 3');
     this.goal5object = this.af.database.object(this.monthobject+'/goal 4');
     this.goal5object = this.af.database.object(this.monthobject+'/goal 5');

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
        this.thismonth = true;
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
    // for html purposes
   monthpicker(years:string){
     if(years == 'goal1'){
       this.tempmonth = 'goal1';
     }
     if(years == 'goal2'){
       this.tempmonth = 'goal2';
     }
     if(years == 'goal3'){
       this.tempmonth = 'goal3';
     }
     if(years == 'goal4'){
       this.tempmonth = 'goal4';
     }
     if(years == 'goal5'){
       this.tempmonth = 'goal5';
     }
   }
  
}