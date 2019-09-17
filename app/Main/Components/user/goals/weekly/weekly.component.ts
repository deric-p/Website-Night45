import { Component,ViewChild,Inject } from '@angular/core';

import { AngularFire, FirebaseApp,FirebaseListObservable } from 'angularfire2';


@Component({
 
  
  selector: 'my-week',
  templateUrl: './weekly.component.html',
  styleUrls:['./weekly.component.css']
  
})
export class WeeklyComponent {
// initialize varibles
public userid;
public weekobject;
public user;
public goal1object;
public goal2object;
public goal3object;
public goal1;
public goal2;
public goal3;
public complete1;
public complete2;
public complete3;
public thisweek = null;
public goal1check = null;
public goal2check = null;
public goal3check = null;
public joineddate;
public joindate;
public addgoaldone = true;
public variable = "goal1currentweek";


// date calculations
today: number = Date.now();
datestring = "January 1, 2017 12:00 AM";
referencedate: number = Date.parse(this.datestring);

weeks = Math.floor((this.today - this.referencedate)/604800000);
startweek = this.referencedate + (this.weeks*604800000);
endweek = this.referencedate + (this.weeks*604800000) + 604800000 - 86400000;
previousweek = this.startweek;
nextweek = this.endweek;

// set up
constructor(private af: AngularFire) {
    // this.af.auth.subscribe(auth => console.log(auth));
  if(this.af.auth != null){
    this.af.auth.subscribe(auth => {
          this.userid = auth;
        });
    // checks the start week
    this.weekobject = this.userid.uid + "/weekly/"+ this.startweek;
    //check join date
    this.joineddate = af.database.object(this.userid.uid+'/personnel/joined');
    this.joineddate.subscribe((obj) =>{
      // set the join date
      this.joindate = obj['$value'];
      
    })
    // finds the week object
    this.user = af.database.object(this.weekobject);
  
    //check if the object exists
    this.user.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
     this.thisweek = false;
     this.goal1check = false;
     this.goal2check = false;
     this.goal3check = false;
     this.goal1object = af.database.object(this.weekobject+'/goal 1');
     this.goal2object = af.database.object(this.weekobject+'/goal 2');
     this.goal3object = af.database.object(this.weekobject+'/goal 3');

    } else {
    // object exists.
    this.thisweek = true;
    this.goal1object = af.database.object(this.weekobject+'/goal 1');
    this.goal2object = af.database.object(this.weekobject+'/goal 2');
    this.goal3object = af.database.object(this.weekobject+'/goal 3');
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
      }
    });
   }
  }
     
    
    //scrolls to the previous week
    previousweekly() {
     
      
      this.previousweek = this.previousweek- 604800000;
      this.nextweek = this.nextweek- 604800000;
      
      this.weekobject = this.userid.uid + "/weekly/"+ this.previousweek;
      this.user = this.af.database.object(this.weekobject);

      //check if the object exists
    this.user.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
      
      this.thisweek = false;
      this.goal1check = false;
      this.goal2check = false;
      this.goal3check = false;
      

    } else {
    // object exists.
        this.thisweek = true;
        this.goal1object = this.af.database.object(this.weekobject+'/goal 1');
        this.goal2object = this.af.database.object(this.weekobject+'/goal 2');
        this.goal3object = this.af.database.object(this.weekobject+'/goal 3');
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
      }
    });
   
    }
    //scrolls to the next week
    nextweekly(){
      this.previousweek = this.previousweek + 604800000;
      this.nextweek = this.nextweek + 604800000;
      this.weekobject = this.userid.uid + "/weekly/"+ this.previousweek;
      this.user = this.af.database.object(this.weekobject);

      //check if the object exists
    this.user.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
      
      this.thisweek = false;
      this.goal1check = false;
      this.goal2check = false;
      this.goal3check = false;
      this.goal1object = this.af.database.object(this.weekobject+'/goal 1');
      this.goal2object = this.af.database.object(this.weekobject+'/goal 2');
      this.goal3object = this.af.database.object(this.weekobject+'/goal 3');

    } else {
    // object exists.
        this.thisweek = true;
        this.goal1object = this.af.database.object(this.weekobject+'/goal 1');
        this.goal2object = this.af.database.object(this.weekobject+'/goal 2');
        this.goal3object = this.af.database.object(this.weekobject+'/goal 3');
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
      }
    });
    }
    // adds a brandnew goal to the database
    addGoal(addinggoal){
     this.addgoaldone = false;
     if((!this.addgoaldone)&&
     (!this.goal1check)){
        this.goal1object.set({goal:addinggoal,complete:"q"});
        this.thisweek = true;
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

    }
    onSubmit(formData,goals:string){

      this.completed(formData.value.prog,goals);
      
    }
    onSubmitGoal(formData){
    
      this.addGoal(formData.value.weeklygoal);
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
  public currentweekgoalmodals = [
    {value: "goal1currentweek",goaldate:"goal1",formName:"formGoal4"},
    {value: "goal2currentweek",goaldate:"goal2",formName:"formGoal5"},
    {value: "goal3currentweek",goaldate:"goal3",formName:"formGoal6"}
  ];
 
 }