import { Component,ViewChild,Inject } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { AngularFire, FirebaseApp,FirebaseListObservable } from 'angularfire2';
import {Observable} from 'rxjs/Rx';


@Component({
 
  
  selector: 'my-longterm',
  templateUrl: './longterm.component.html',
  styleUrls:['./longterm.component.css']
  
})
export class LongTermComponent {

  public longtermgoal;
  public daterequired;
  public how;
  public timeleft;
  public datecreated;
  public datetoedit;
  public status;
  public projectname = 1;
  public userid;
  public user;
  public goalobject;
  public longtermobject;
  public newuser = false;
  public existinguser = false;
  public currentuser = false;
  public projectcounter;
  public datenow : number = Date.now();
  public currentlongtermgoal = "Current Goal";
  public unixtime;
  public dateerror ="";
  public tempnumber;
  public templongterm;
  public tempuser;
  public tempstatus;
  

  @ViewChild('addgoal') public addgoal:ModalDirective;
   @ViewChild('currentgoal') public currentgoal:ModalDirective;
   @ViewChild('confirmscreen') public comfirmscreen:ModalDirective;
@ViewChild('congrad') public congrad:ModalDirective;
@ViewChild('oldgoal') public oldgoal:ModalDirective;
  constructor(private af: AngularFire) {
      // this.af.auth.subscribe(auth => console.log(auth));
      
    if(this.af.auth != null){
      this.af.auth.subscribe(auth => {
          this.userid = auth;
        });
      }
      this.longtermobject = this.userid.uid + "/longterm/"+ this.projectname;
      // finds the week object
      this.user = af.database.object(this.longtermobject);
      //check if the object exists
      if(!this.existinguser){
        this.user.subscribe((obj) => {
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        // object doesnt exist
        this.newuser = true;
        this.projectcounter = this.projectname;
      }
      else{
        //object exists
        if((this.newuser == false)&&(!this.existinguser)){
          this.longtermgoalexists();
        
        }
        
      }
      });
    }
    
    this.projectcounter = this.projectname;
   
  }
  longtermgoalexists(){
    this.projectname = this.projectname +1;
    this.longtermobject = this.userid.uid + "/longterm/"+ this.projectname;
    // finds the week object
    this.user = this.af.database.object(this.longtermobject);
    //check if the object exists
    this.user.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
      
      
      this.checkuser();
      
      
    }
    else{
      //object exists
      if((this.newuser == false)&&(!this.existinguser)){
        this.longtermgoalexists();
      } 
    }
    });
  }
  //checkuser
  checkuser(){
    this.tempnumber = this.projectname - 1;
    this.templongterm = this.userid.uid + "/longterm/"+ this.tempnumber;
    this.tempuser = this.af.database.object(this.templongterm);
    this.tempuser.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist wont happen
        
      }
      else{
        // object does exist
        this.longtermgoal = obj.goal;
        this.status = obj.status;
        this.daterequired = obj.daterequired;
        this.how = obj.how;
        this.datecreated = obj.datecreated;
        this.datetoedit = this.datecreated + 3888000000;
        this.timeleft = this.daterequired - this.datenow;
        
      if((this.timeleft < 1)||(this.status=='y')){
        if(this.existinguser){
          
          
        }
        else{
          
          this.newuser = true;
          this.existinguser = false;
          this.currentuser = false;
          this.projectcounter = this.projectname; 
          this.currentlongtermgoal = "Current Goal";  
        }
          
        }
      else{
        if(this.existinguser){
        
         
        }else{
         
           this.currentuser = true;
          this.existinguser = false;
         this.projectcounter = this.tempnumber;  
          this.projectname = this.tempnumber;  
          this.currentlongtermgoal = "Current Goal"; 
        }
       
      }
      
      } 
    });
  }
  //previous goal
  previousgoal(){
    
    this.projectcounter = this.projectcounter-1;
    this.longtermobject = this.userid.uid + "/longterm/"+ this.projectcounter;
    this.user = this.af.database.object(this.longtermobject);
    this.currentlongtermgoal = "Previous Goal";
    this.existinguser = true;
    this.currentuser = false;
    this.goalde();
  }
  //next goal
  nextgoal(){
    this.projectcounter = this.projectcounter+1;
    this.longtermobject = this.userid.uid + "/longterm/"+ this.projectcounter;
    this.user = this.af.database.object(this.longtermobject);
    this.goalde();
    if(this.projectcounter == this.projectname){
      this.currentlongtermgoal = "Current Goal";
      this.existinguser = false;
      if(this.newuser == false){
        this.currentuser = true;
      }
      
    }
  }

  // update goal
  updategoal(goal:string){
   this.longtermobject = this.userid.uid + "/longterm/"+ this.projectcounter;
      // finds the week object
   this.user = this.af.database.object(this.longtermobject);
    this.user.update({
      goal:goal
    });
  }
  // update status
  updatestatus(stat:string){

    this.longtermobject = this.userid.uid + "/longterm/"+ this.projectcounter;
      // finds the week object
    this.user = this.af.database.object(this.longtermobject);
    
    this.user.update({
      status:stat
    });
  }
  // update goalobject
  updategoalobject(){
    this.longtermobject = this.userid.uid + "/longterm/"+ this.projectname;
    this.user = this.af.database.object(this.longtermobject);
  }
  //goal exists
  goalde(){
    this.user.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist wont happen
        this.newuser = true;
      }
      else{
        // object does exist
        this.newuser = false;
        this.longtermgoal = obj.goal;
        this.status = obj.status;
        this.daterequired = obj.daterequired;
        this.how = obj.how;
        this.datecreated = obj.datecreated;
         this.datetoedit = this.datecreated + 3888000000;
        this.timeleft = this.daterequired - this.datenow;
        
      } 
    });
  }

  // on submit edit goal
  onEditSubmit(formData){
    
   
    this.updategoal(formData.value.goal);
  }
  // on submit edit status goal
  onStatusSubmit(formData){

    
    if(formData.value.status == 'q'){
      this.currentgoal.hide();
    }
    if((formData.value.status == 'y')||(formData.value.status == 'n')){
      this.tempstatus = formData.value.status;
      this.currentgoal.hide();
      this.oldgoal.hide();
      this.comfirmscreen.show();
    }
   
  }
  // confirms the users is ok with the submission
  onConfirmSubmit(formData,changingstat:string){
    
    if(formData.value.status == 'y'){
      this.updatestatus(changingstat);
      this.comfirmscreen.hide();
      this.congrad.show();
    }
    if(formData.value.status=='n'){
      this.comfirmscreen.hide();
    }
  }
  // on submit new goal
  onSubmit(formData){
    this.dateerror = "";
    this.unixtime = Date.parse(formData.value.dt);
    this.datenow = Date.now();
    //checks if the goal added over a year
    if(((this.datenow+31536000000)<this.unixtime)&&(this.unixtime < (Date.parse('January 1, 2040 12:00 AM')))){
      this.longtermobject = this.userid.uid + "/longterm/"+ this.projectname;
      this.datenow = Date.now();
      this.unixtime = this.unixtime + 86400000;
      this.goalobject = this.af.database.object(this.longtermobject);
   // add goal to Database
    this.goalobject.set({
      goal:formData.value.goal,
      status:'q',
      daterequired:this.unixtime,
      how:formData.value.how,
      datecreated:this.datenow
    });
    //Updated Variables
    this.user = this.goalobject;
    this.newuser = false;
    this.longtermgoal = formData.value.goal;
    this.status = 'q';
    this.daterequired = this.unixtime;
    this.how = formData.value.how;
    this.datecreated = this.datenow;
     this.datetoedit = this.datecreated + 3888000000;
    this.currentuser = true;
    this.existinguser = false;
      this.addgoal.hide();
    }
    //sends error if goal not set over a year
    else{
     
      this.dateerror = "Date Should Be Set Longterm (Atleast Over 1 Year From Today)";
      if(this.unixtime > (Date.parse('January 1, 2040 12:00 AM'))){
        this.dateerror = 'Date Should Not Be Set So Far Into The Future';
      }
    }
    
  
  }
  
  ngOnInit(){
   
      let timer = Observable.timer(1000,1000);
     timer.subscribe(t=> {
       if(this.currentuser){
         this.datenow = Date.now();
        this.daterequired;
        this.countdown(this.daterequired - this.datenow);
       } 
    });
   
   
  }
  public days;
  public floordays;
  public hours;
  public floorhours
  public minutes;
  public floorminutes;
  public seconds;
  public floorseconds;
  public timelefts;
  public minutesleft;
  //count down
  countdown(t:number){
    
    this.days = ((((t/1000)/60)/60)/24);
    this.floordays=Math.floor(this.days);
    
    this.hours = this.days - this.floordays;
    this.hours = this.hours*24;
    this.floorhours = Math.floor(this.hours);

    this.minutes = this.hours - this.floorhours;
    this.minutes = this.minutes*60;
    this.floorminutes = Math.floor(this.minutes);

    this.seconds = this.minutes - this.floorminutes;
    this.seconds = this.seconds * 60;
    this.floorseconds = Math.floor(this.seconds);
   
    this.timelefts = this.floordays+' Days '+this.floorhours+' Hours ';
    this.minutesleft = this.floorminutes + ' minutes ' + this.floorseconds + ' seconds';
    
  }
   public currentprogession = [

     { value: 'q', display: 'In Progress' },
    { value: 'y', display: 'Complete' }
    
  ];
  public progession = [
    
    { value: 'y', display: 'Complete' },
    { value: 'n', display: 'Not Complete' }
  ];
   public comfirm = [
    
    { value: 'y', display: 'Yes' },
    { value: 'n', display: 'No' }
  ];
  removegoal(){
    this.longtermobject = this.userid.uid + "/longterm/"+ this.projectcounter;
      // finds the week object
    this.user = this.af.database.object(this.longtermobject);
   
    this.user.remove();
    this.newuser = true;
    this.currentuser = false;
  }
}