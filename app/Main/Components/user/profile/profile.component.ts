import { Component,ViewChild,Inject } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { AngularFire, FirebaseApp,FirebaseListObservable } from 'angularfire2';
import {Observable} from 'rxjs/Rx';


@Component({
 
  
  selector: 'my-profile',
  templateUrl: './profile.component.html',
  styleUrls:['./profile.component.css']
  
})
export class ProfileComponent {

  // Doughnut Weekly,Monthly and Daily
  public doughnutChartLabels:string[] = ['Not Completed', 'In-Store Sales', 'Mail-Order Sales','In Progress','Completed'];
  public DailyData:number[];
  public WeeklyData:number[];
  public MonthlyData:number[];
  public doughnutChartType:string = 'doughnut';
  public legends = false;

  goal1 = 'goal 1';
  goal2 = 'goal 2';
  goal3 = 'goal 3';
  goal4 = 'goal 4';
  goal5 = 'goal 5';
  weeklyposcounter = 0;
  weeklynegcounter = 0;
  weeklyprocounter = 0;
  monthlyposcounter = 0;
  monthlynegcounter = 0;
  monthlyprocounter = 0;
  dailyposcounter = 0;
  dailynegcounter = 0;
  dailyprocounter = 0;
  y=5;
  public userid;
  public firstname;
  public lastname;
  public first;
  public last;
  public tempweeklyuser;
  public tempmonthlyuser;
  public tempdailyuser;
  public joineddate;
  public joindate;
  public weeklybool = false;
  public dailybool = false;
  public monthlybool = false;
  // pure month calculations
  public montharray = [31,28,31,30,31,30,31,31,30,31,30,31];
  public monthcounter = 0;;
  public yearcounter = 1;
  public currentmonth;
  public datecounter;
  public leapyear = false;
  public yearreset = false;
  public todaydate;
  //day calculations
  public daynumber = 60*24*60*1000;


  //weekly calculations
  today: number = Date.now();
  datestring = "January 1, 2017 12:00 AM";
  referenceweek: number = Date.parse(this.datestring);
  
  weeks = Math.floor((this.today - this.referenceweek)/604800000);
  startweek = this.referenceweek + (this.weeks*604800000);
  previousweek = this.startweek;
  //Monthly Calculations
  referencedate = this.referenceweek;
  //Daily Calculations
  day = Math.floor((this.today - this.referenceweek)/this.daynumber);
  currentday = this.referenceweek + (this.day*this.daynumber);
  daycounter = this.currentday;

  constructor(private af: AngularFire) {
      // this.af.auth.subscribe(auth => console.log(auth));
      //check join date
      if(this.af.auth != null){
      this.af.auth.subscribe(auth => {
            this.userid = auth;
            
          });
          this.firstname = af.database.object(this.userid.uid+'/personnel/first name')
          this.firstname.subscribe((obj) =>{
        // set the join date
        this.first = obj['$value'];
      });
          this.lastname = af.database.object(this.userid.uid+'/personnel/last name')
          this.lastname.subscribe((obj) =>{
        // set the join date
        this.last = obj['$value'];
      });
      this.joineddate = af.database.object(this.userid.uid+'/personnel/joined');
        this.joineddate.subscribe((obj) =>{
        // set the join date
        this.joindate = obj['$value'];
      });
    }
    this.weekly();
    this.monthcalculations();
    this.monthly();
    this.daily();
    
    
    
  }

  weekly(){

    while(!this.weeklybool){
     
      for(var x = 0;x <= this.y;x++){
        this.tempweeklyuser = this.af.database.object(this.userid.uid+'/weekly/'+this.previousweek+'/goal '+ x);
        this.tempweeklyuser.subscribe((obj) => {
          if (obj.hasOwnProperty('$value') && !obj['$value']) {
            // object doesnt exist
          }else{
            
            if(obj.complete == 'q'){
              
              this.weeklyprocounter++;

            }
            if(obj.complete == 'y'){
             
              this.weeklyposcounter++;
              
            }
            if(obj.complete == 'n'){
              
              this.weeklynegcounter++;
            }
            this.WeeklyData = [this.weeklynegcounter, 0, 0,this.weeklyprocounter,this.weeklyposcounter];
          }
          
        
       });
      
       if(x==this.y){
          
         this.previousweek = this.previousweek - 604800000;
         if(this.previousweek < this.referenceweek){
           this.weeklybool = true;
            
         }
       }
    }
    }
  }
  monthly(){
     while(!this.monthlybool){
     
      for(var x = 0;x <= this.y;x++){
        this.tempmonthlyuser = this.af.database.object(this.userid.uid+'/monthly/'+this.datecounter+'/goal '+ x);
        this.tempmonthlyuser.subscribe((obj) => {
          if (obj.hasOwnProperty('$value') && !obj['$value']) {
            // object doesnt exist
         
          }else{
             
            if(obj.complete == 'q'){
              
              this.monthlyprocounter++;

            }
            if(obj.complete == 'y'){
             
              this.monthlyposcounter++;
             
            }
            if(obj.complete == 'n'){
              
              this.monthlynegcounter++;
            }
            this.MonthlyData = [this.monthlynegcounter, 0, 0,this.monthlyprocounter,this.monthlyposcounter];
          }
        
         
       });
       if(x==this.y){
           
        this.monthsubtraction();
         if(this.datecounter < this.referenceweek){
           this.monthlybool = true;
           
         }
       }
    }
    }
  }
  daily(){
     while(!this.dailybool){
     
      for(var x = 0;x <= this.y;x++){
        this.tempdailyuser = this.af.database.object(this.userid.uid+'/nightly/'+this.daycounter+'/goal '+ x);
        this.tempdailyuser.subscribe((obj) => {
          if (obj.hasOwnProperty('$value') && !obj['$value']) {
            // object doesnt exist
          }else{
            
            if(obj.complete == 'q'){
              
              this.dailyprocounter++;

            }
            if(obj.complete == 'y'){
             
              this.dailyposcounter++;
              
            }
            if(obj.complete == 'n'){
              
              this.dailynegcounter++;
            }
            this.DailyData = [this.dailynegcounter, 0, 0,this.dailyprocounter,this.dailyposcounter];
          }
         
         
       });
       if(x==this.y){
          
         this.daycounter = this.daycounter - this.daynumber;
         if(this.daycounter < this.referenceweek){
           this.dailybool = true;
          
         }
       }
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
  monthsubtraction(){
     if(this.monthcounter <= 0){
      this.monthcounter = 11;
      this.datecounter  = this.datecounter - (this.montharray[this.monthcounter]*24*60*60*1000);
      
      
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
        
        
      }else{
        this.monthcounter = this.monthcounter - 1;
        this.datecounter  = this.datecounter - (this.montharray[this.monthcounter]*24*60*60*1000);
        
       
      }
      
    }
  }
 
}