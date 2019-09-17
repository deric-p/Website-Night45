import { Component,ViewChild,Inject } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { AngularFire, FirebaseApp,FirebaseListObservable } from 'angularfire2';
import {Observable} from 'rxjs/Rx';


@Component({
 
  
  selector: 'my-calender',
  templateUrl: './calender.component.html',
  styleUrls:['./calender.component.css']
  
})
export class CalenderComponent {
    public montharray = [31,28,31,30,31,30,31,31,30,31,30,31];
    public datestring = "January 1, 2018 12:00 AM";
    public referencedate: number = Date.parse(this.datestring);
    public referencemonth = Date.parse(this.datestring);
    public dayconstant = 24*60*60*1000;
    public monthcounter = 0;
    public yearcounter = 1;
    public currentmonth;
    public todaydate;
    public leapyear;
    public datecounter;
    public endcounter;
    public today = Date.now();
    public endmonth =0;
    public startmonth =0;
    public joineddate;
    public joindate;
    public userid;
    public prevmonth;
    // today calculations
    day = Math.floor((this.today - this.referencedate)/this.dayconstant);
    currentday = this.referencemonth + (this.day*this.dayconstant);
    
    
    // calender 
    previousmonth(){
     
        if(this.monthcounter <= 0){
        this.monthcounter = 11;
        this.endcounter= this.datecounter  - (24*60*60*1000);
        this.datecounter  = this.datecounter - (this.montharray[this.monthcounter]*this.dayconstant);
         // picks months
           this.endmonth = this.startmonth;
           this.startmonth = 7 - this.startmonth;
           this.prevmonth = Math.floor((this.montharray[this.monthcounter]+this.startmonth)/7);
          
           this.startmonth = (this.startmonth+this.montharray[this.monthcounter]) - (this.prevmonth*7);
          
           this.startmonth = 7 - this.startmonth;
           if(this.startmonth >= 7){
             this.startmonth = 0;
           }
   
      
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
          this.endcounter= this.datecounter  - (24*60*60*1000);
          this.datecounter  = this.datecounter - (this.montharray[this.monthcounter]*this.dayconstant) - (1000*24*60*60);
           // picks months
           this.endmonth = this.startmonth;
           this.startmonth = 7 - this.startmonth;
           this.prevmonth = Math.floor((this.montharray[this.monthcounter]+this.startmonth+1)/7);
          
           this.startmonth = (this.startmonth+this.montharray[this.monthcounter]+1) - (this.prevmonth*7);
          
           this.startmonth = 7 - this.startmonth;
           if(this.startmonth >= 7){
             this.startmonth = 0;
           }
          
        }else{
          this.monthcounter = this.monthcounter - 1;
          this.endcounter= this.datecounter - (24*60*60*1000);
          this.datecounter  = this.datecounter - (this.montharray[this.monthcounter]*this.dayconstant);
           // picks months
           this.endmonth = this.startmonth;
           this.startmonth = 7 - this.startmonth;
           this.prevmonth = Math.floor((this.montharray[this.monthcounter]+this.startmonth)/7);
          
           this.startmonth = (this.startmonth+this.montharray[this.monthcounter]) - (this.prevmonth*7);
          
           this.startmonth = 7 - this.startmonth;
           if(this.startmonth >= 7){
             this.startmonth = 0;
           }
          
          
        }
        
      }
    }
    nextmonth(){
    
       if(this.monthcounter >= 11){
      
      this.datecounter  = this.datecounter + (this.montharray[this.monthcounter]*this.dayconstant);
      this.monthcounter = 0;
      // picks months
        this.endcounter = this.datecounter + (this.montharray[this.monthcounter]*this.dayconstant) - (24*60*60*1000);

         this.startmonth = this.endmonth;
         // add extra days
         this.endmonth = this.endmonth + Math.round(((this.montharray[this.monthcounter]/7)-(Math.floor((this.montharray[this.monthcounter]/7))))*7);
        if(this.endmonth >= 7){
          this.endmonth = this.endmonth - 7;
        }

      if(this.yearcounter >= 4){
        this.yearcounter =0;
      }
      else{
        this.yearcounter = this.yearcounter + 1;
      }
    }
    else{
      if((this.yearcounter == 4)&&(this.monthcounter == 1)){
        
        this.datecounter  = this.datecounter + (this.montharray[this.monthcounter]*this.dayconstant) + (1000*24*60*60);
        this.monthcounter = this.monthcounter + 1;
        this.endcounter = this.datecounter + (this.montharray[this.monthcounter]*this.dayconstant) - (24*60*60*1000);
        this.startmonth = this.endmonth;
        this.endmonth = this.endmonth + Math.round((((this.montharray[this.monthcounter]+1)/7)-(Math.floor(((this.montharray[this.monthcounter]+1)/7))))*7);
        if(this.endmonth >= 7){
          this.endmonth = this.endmonth - 7;
        }
         // picks months
       
         
       
      }else{
        
        this.datecounter  = this.datecounter + (this.montharray[this.monthcounter]*this.dayconstant);
        this.monthcounter = this.monthcounter + 1;
         // picks months
         this.endcounter = this.datecounter + (this.montharray[this.monthcounter]*this.dayconstant) - (24*60*60*1000);
          // add extra days
          this.startmonth = this.endmonth;
         this.endmonth = this.endmonth + Math.round(((this.montharray[this.monthcounter]/7)-(Math.floor((this.montharray[this.monthcounter]/7))))*7);


         
        if(this.endmonth >= 7){
          this.endmonth = this.endmonth - 7;
        }
      }
     
    }
 

    }
    monthcal(){
 
      this.todaydate = false;

     while(!this.todaydate){
       if(this.monthcounter >= 11){
          this.monthcounter = 0;
          this.yearcounter = this.yearcounter + 1;
          
       }
      else if((this.referencedate +(this.montharray[this.monthcounter]*this.dayconstant))<this.today){
        this.referencedate = this.referencedate +(this.montharray[this.monthcounter]*this.dayconstant);
   
        this.endmonth = this.endmonth + Math.round(((this.montharray[this.monthcounter]/7)-(Math.floor((this.montharray[this.monthcounter]/7))))*7);
       this.startmonth = this.endmonth;
        if(this.endmonth >= 7){
          this.endmonth = this.endmonth - 7;
        }
      
         this.monthcounter = this.monthcounter + 1;
         // picks months
        


         if((this.monthcounter == 1)&&(this.yearcounter == 4)){
           this.leapyear = true;
           this.yearcounter  = 0;
           this.referencedate = this.referencedate + (1000*24*60*60);
            // picks months
        
          this.endmonth = this.endmonth + 1;
           if(this.endmonth >= 7){
          this.endmonth = this.endmonth - 7;
           }
         }
       }
       else if(((this.referencedate +(this.montharray[this.monthcounter]*this.dayconstant))>=this.today)&&(!this.leapyear)){
         this.todaydate = true;
         this.currentmonth = this.referencedate;
         this.datecounter = this.currentmonth;
         this.endcounter = this.datecounter + (this.montharray[this.monthcounter]*this.dayconstant) - (24*60*60*1000);
         // picks months
         
        
       }
      else if(((this.referencedate +(this.montharray[this.monthcounter]*this.dayconstant))>=this.today)&&(this.leapyear)){
         this.todaydate = true;
         this.currentmonth = this.referencedate;
         this.referencedate = this.referencedate;
         this.datecounter = this.currentmonth;
         this.endcounter = this.datecounter + (this.montharray[this.monthcounter]*this.dayconstant) - (24*60*60*1000);
         this.leapyear = false;
         // picks months
 
      } 
     }
    }
    //Monthly Weekly and Yearly Goals

    public monthlygoalarray=[];
    public monthlyobject;
    public weeklygoalarray = [];
    public weeklyobject;
    public dailygoalarray =[];
    public dailyobject;
    public happinessarray =[];
    public happinessobject;
    public yearlygoalarray = [];
    public yearlyobject;
    public oneyear = 24*60*60*7*365*1000;
    public items;
    public x = 5;
 
    // goals in calender
    constructor(private af: AngularFire){
      this.monthcal();

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
    this.weeklyobject = af.database.list(this.userid.uid+'/weekly');
    this.dailyobject = af.database.list(this.userid.uid+'/nightly');
    this.monthlyobject = af.database.list(this.userid.uid+'/monthly');
    this.yearlyobject = af.database.list(this.userid.uid+'/yearly');
    this.happinessobject = af.database.list(this.userid.uid+'/accomplishments');

   this.weekly();
   this.yearly();
   this.monthly();
   this.daily();
   this.accomplishment();
   
  }
  weekly(){
      this.weeklyobject.subscribe(weekly => {
       
      // items is an array
      weekly.forEach(week => {
         var goals = [];
      
          for(var i=0;i<=this.x;i++){
            var s = 'goal ' + i;
            if(week[s]===undefined){
            
            }else{
          
              goals[i] = {goal:week[s].goal,status:week[s].complete};
            
          }

        }
    
          this.weeklygoalarray[week.$key] = {goals:goals};
        
      });

  });
     
  }
 
  yearly(){
        this.yearlyobject.subscribe(yearly => {
        
      // items is an array
      yearly.forEach(year => {
        var goals = [];
      
          for(var i=0;i<=this.x;i++){
            var s = 'goal ' + i;
            if(year[s]===undefined){
            
            }else{
          
              goals[i] = {goal:year[s].goal,status:year[s].complete};
            
          }

        }
          this.yearlygoalarray[year.$key] = {goals:goals};
        
      });
      
  });

  }
  daily(){
      this.dailyobject.subscribe(daily => {
        
      // items is an array
      daily.forEach(dai => {
      var goals = [];
      
          for(var i=0;i<=this.x;i++){
            var s = 'goal ' + i;
            if(dai[s]===undefined){
            
            }else{
          
              goals[i] = {goal:dai[s].goal,status:dai[s].complete};
           
          } 

        }
          this.dailygoalarray[dai.$key] = {goals:goals};
        
      });

  });

  }
  monthly(){
          this.monthlyobject.subscribe(monthly => {
       
      // items is an array
      monthly.forEach(month => {
       var goals = [];
      
          for(var i=0;i<=this.x;i++){
            var s = 'goal ' + i;
            if(month[s]===undefined){
            
            }else{
          
              goals[i] = {goal:month[s].goal,status:month[s].complete};
            
          }

        }
          this.monthlygoalarray[month.$key] = {goals:goals};
       
      });
 
  });

}
  accomplishment(){
      this.happinessobject.subscribe(happiness => {
        
      // items is an array
      happiness.forEach(hap => {
      var accomplish = [];
      
          for(var i=0;i<=this.x;i++){
            var s = 'accomplish ' + i;
            if(hap[s]===undefined){
            
            }else{
          
              accomplish[i] = {accomplish:hap[s].accomplish};
           
          } 

        }
          this.happinessarray[hap.$key] = {accomplishments:accomplish};
        
      });

  });

  }
  
}