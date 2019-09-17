import { Component,ViewChild,Inject } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { AngularFire, FirebaseApp,FirebaseListObservable } from 'angularfire2';
import {Observable} from 'rxjs/Rx';


@Component({
 
  
  selector: 'my-task',
  templateUrl: './task.component.html',
  styleUrls:['./task.component.css']
  
})
export class NightlyComponent {
  public joineddate;
  public joindate;
  public userid;
  public day1object;
  public day2object;
  public day3object;
  public user1;
  public user2;
  public user3;
  public goal1object;
  public goal2object;
  public goal3object;
  public goal4object;
  public goal5object;
  public goal6object;
  public goal7object;
  public goal8object;
  public goal9object;
  public goal10object;
  public goal11object;
  public goal12object;
  public goal13object;
  public goal14object;
  public goal15object;
  public goal1;
  public goal2;
  public goal3;
  public goal4;
  public goal5;
  public goal6;
  public goal7;
  public goal8;
  public goal9;
  public goal10;
  public goal11;
  public goal12;
  public goal13;
  public goal14;
  public goal15;
  public complete1;
  public complete2;
  public complete3;
  public complete4;
  public complete5;
  public complete6;
  public complete7;
  public complete8;
  public complete9;
  public complete10;
  public complete11;
  public complete12;
  public complete13;
  public complete14;
  public complete15;
  public thisday1 = null;
  public thisday2= null;
  public thisday3 = null;
  public goal1check = null;
  public goal2check = null;
  public goal3check = null;
  public goal4check = null;
  public goal5check = null;
  public goal6check = null;
  public goal7check = null;
  public goal8check = null;
  public goal9check = null;
  public goal10check = null;
  public goal11check = null;
  public goal12check = null;
  public goal13check = null;
  public goal14check = null;
  public goal15check = null;
  public goalday1 = true;
  public goalday2 = true;
  public tempday;
  public addgoaldone = true;
  public currentgoals1;
  public currentgoals2;
  public currentgoals3;
  public datestring = "January 1, 2017 12:00 AM";
  public today: number = Date.now();
  public referencedate: number = Date.parse(this.datestring);
  public daynumber = 60*24*60*1000;
  day = Math.floor((this.today - this.referencedate)/this.daynumber);
  currentday = this.referencedate + (this.day*this.daynumber);
  daycounter = this.currentday;
  public progession = [
    { value: 'y', display: 'Complete' },
    { value: 'n', display: 'Not Complete' }
  ];
  public currentprog = [
    { value: 'q', display: 'In Progress' },
    { value: 'y', display: 'Complete' },
    { value: 'n', display: 'Not Complete' }
  ];
  public nextprog = [
    { value: 'q', display: 'In Progress' }
  ];

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
    this.day1object = this.userid.uid + "/nightly/"+ this.currentday;
    this.user1 = af.database.object(this.day1object);

    this.day2object = this.userid.uid + "/nightly/"+ (this.currentday+this.daynumber);
    this.user2 = af.database.object(this.day2object);

    this.day3object = this.userid.uid + "/nightly/"+ (this.currentday-this.daynumber);
    this.user3 = af.database.object(this.day3object);
    //check if the object exists for Day 1 Current Day
  
    this.user1.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
     this.thisday1 = false;
     this.goal1check = false;
     this.goal2check = false;
     this.goal3check = false;
     this.goal4check = false;
     this.goal5check = false;
     this.goal1object = af.database.object(this.day1object+'/goal 1');
     this.goal2object = af.database.object(this.day1object+'/goal 2');
     this.goal3object = af.database.object(this.day1object+'/goal 3');
     this.goal4object = af.database.object(this.day1object+'/goal 4');
     this.goal5object = af.database.object(this.day1object+'/goal 5');
      this.currentgoals1 = [
    {goal:this.goal1,status:this.complete1,show:this.goal1check,name:'goal1'},
    {goal:this.goal2,status:this.complete2,show:this.goal2check,name:'goal2'},
    {goal:this.goal3,status:this.complete3,show:this.goal3check,name:'goal3'},
    {goal:this.goal4,status:this.complete4,show:this.goal4check,name:'goal4'},
    {goal:this.goal5,status:this.complete5,show:this.goal5check,name:'goal5'},
  ];

    }else{
      // object does exist
    this.thisday1 = true;
    this.goal1object = af.database.object(this.day1object+'/goal 1');
     this.goal2object = af.database.object(this.day1object+'/goal 2');
     this.goal3object = af.database.object(this.day1object+'/goal 3');
     this.goal4object = af.database.object(this.day1object+'/goal 4');
     this.goal5object = af.database.object(this.day1object+'/goal 5');

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
        this.currentgoals1 = [
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
        this.currentgoals1 = [
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

    this.user2.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
     this.thisday2 = false;
     this.goal6check = false;
     this.goal7check = false;
     this.goal8check = false;
     this.goal9check = false;
     this.goal10check = false;
     this.goal6object = af.database.object(this.day2object+'/goal 1');
     this.goal7object = af.database.object(this.day2object+'/goal 2');
     this.goal8object = af.database.object(this.day2object+'/goal 3');
     this.goal9object = af.database.object(this.day2object+'/goal 4');
     this.goal10object = af.database.object(this.day2object+'/goal 5');
      this.currentgoals2 = [
    {goal:this.goal6,status:this.complete6,show:this.goal6check,name:'goal6'},
    {goal:this.goal7,status:this.complete7,show:this.goal7check,name:'goal7'},
    {goal:this.goal8,status:this.complete8,show:this.goal8check,name:'goal8'},
    {goal:this.goal9,status:this.complete9,show:this.goal9check,name:'goal9'},
    {goal:this.goal10,status:this.complete10,show:this.goal10check,name:'goal10'},
  ];

    }else{
      // object does exist
    this.thisday2 = true;
    this.goal6object = af.database.object(this.day2object+'/goal 1');
     this.goal7object = af.database.object(this.day2object+'/goal 2');
     this.goal8object = af.database.object(this.day2object+'/goal 3');
     this.goal9object = af.database.object(this.day2object+'/goal 4');
     this.goal10object = af.database.object(this.day2object+'/goal 5');

    this.goal6object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal6check = false;
      }
      else{
        // object does exist
        this.goal6check = true;
        this.goal6 = obj.goal;
        this.complete6 = obj.complete
        
      } 
    });
      this.goal7object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal7check = false;
        this.goal7 = "";
        this.complete7 = "q";
        
      }
      else{
        // object does exist
        this.goal7 = obj.goal;
        this.goal7check = true;
        this.complete7 = obj.complete
      } 
   });
      this.goal8object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal8check = false;
        this.goal8 = "";
        this.complete8 = "q";
      }
      else{
        // object does exist
        this.goal8 = obj.goal;
        this.goal8check = true;
        this.complete8 = obj.complete
          } 
        });

        this.goal9object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal9check = false;
        this.goal9 = "";
        this.complete9 = "q";
      }
      else{
        // object does exist
        this.goal9 = obj.goal;
        this.goal9check = true;
        this.complete9 = obj.complete
          } 
        });
        this.goal10object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal10check = false;
        this.goal10 = "";
        this.complete10 = "q";
        this.currentgoals2 = [
          {goal:this.goal6,status:this.complete6,show:this.goal6check,name:'goal6'},
          {goal:this.goal7,status:this.complete7,show:this.goal7check,name:'goal7'},
          {goal:this.goal8,status:this.complete8,show:this.goal8check,name:'goal8'}
          //{goal:this.goal9,status:this.complete9,show:this.goal9check,name:'goal9'},
          //{goal:this.goal10,status:this.complete10,show:this.goal10check,name:'goal10'},
        ];
        
      }
      else{
        // object does exist
        this.goal10 = obj.goal;
        this.goal10check = true;
        this.complete10 = obj.complete
        this.currentgoals2 = [
          {goal:this.goal6,status:this.complete6,show:this.goal6check,name:'goal6'},
          {goal:this.goal7,status:this.complete7,show:this.goal7check,name:'goal7'},
          {goal:this.goal8,status:this.complete8,show:this.goal8check,name:'goal8'}
          //{goal:this.goal9,status:this.complete9,show:this.goal9check,name:'goal9'},
          //{goal:this.goal10,status:this.complete10,show:this.goal10check,name:'goal10'},
        ];
          } 
        });
    }
     
   
    });

        this.user3.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
     this.thisday3 = false;
     this.goal11check = false;
     this.goal12check = false;
     this.goal13check = false;
     this.goal14check = false;
     this.goal15check = false;
     this.goal11object = af.database.object(this.day3object+'/goal 1');
     this.goal12object = af.database.object(this.day3object+'/goal 2');
     this.goal13object = af.database.object(this.day3object+'/goal 3');
     this.goal14object = af.database.object(this.day3object+'/goal 4');
     this.goal15object = af.database.object(this.day3object+'/goal 5');
      this.currentgoals3 = [
    {goal:this.goal11,status:this.complete11,show:this.goal11check,name:'goal11'},
    {goal:this.goal12,status:this.complete12,show:this.goal12check,name:'goal12'},
    {goal:this.goal13,status:this.complete13,show:this.goal13check,name:'goal13'},
    {goal:this.goal14,status:this.complete14,show:this.goal14check,name:'goal14'},
    {goal:this.goal15,status:this.complete15,show:this.goal15check,name:'goal15'},
  ];

    }else{
      // object does exist
    this.thisday3 = true;
    this.goal11object = af.database.object(this.day3object+'/goal 1');
     this.goal12object = af.database.object(this.day3object+'/goal 2');
     this.goal13object = af.database.object(this.day3object+'/goal 3');
     this.goal14object = af.database.object(this.day3object+'/goal 4');
     this.goal15object = af.database.object(this.day3object+'/goal 5');

    this.goal11object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal11check = false;
      }
      else{
        // object does exist
        this.goal11check = true;
        this.goal11 = obj.goal;
        this.complete11 = obj.complete
        
      } 
    });
      this.goal12object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal12check = false;
        this.goal12 = "";
        this.complete12 = "q";
        
      }
      else{
        // object does exist
        this.goal12 = obj.goal;
        this.goal12check = true;
        this.complete12 = obj.complete
      } 
   });
      this.goal13object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal13check = false;
        this.goal13 = "";
        this.complete13 = "q";
      }
      else{
        // object does exist
        this.goal13 = obj.goal;
        this.goal13check = true;
        this.complete13 = obj.complete
          } 
        });

        this.goal14object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal14check = false;
        this.goal14 = "";
        this.complete14 = "q";
      }
      else{
        // object does exist
        this.goal14 = obj.goal;
        this.goal14check = true;
        this.complete14 = obj.complete
          } 
        });
        this.goal15object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal15check = false;
        this.goal15 = "";
        this.complete15 = "q";
        this.currentgoals3 = [
         {goal:this.goal11,status:this.complete11,show:this.goal11check,name:'goal11'},
          {goal:this.goal12,status:this.complete12,show:this.goal12check,name:'goal12'},
          {goal:this.goal13,status:this.complete13,show:this.goal13check,name:'goal13'}
          //{goal:this.goal14,status:this.complete14,show:this.goal14check,name:'goal14'},
          //{goal:this.goal15,status:this.complete15,show:this.goal15check,name:'goal115'}, 
        ];
        
      }
      else{
        // object does exist
        this.goal15 = obj.goal;
        this.goal15check = true;
        this.complete15 = obj.complete
        this.currentgoals3 = [
          {goal:this.goal11,status:this.complete11,show:this.goal11check,name:'goal11'},
          {goal:this.goal12,status:this.complete12,show:this.goal12check,name:'goal12'},
          {goal:this.goal13,status:this.complete13,show:this.goal13check,name:'goal13'}
          //{goal:this.goal14,status:this.complete14,show:this.goal14check,name:'goal14'},
          //{goal:this.goal15,status:this.complete15,show:this.goal15check,name:'goal115'},
        ];
          } 
        });
    }
     
   
    });
  }
  daypicker(years:string){
     if(years == 'goal1'){
       this.tempday = 'goal1';
     }
     if(years == 'goal2'){
       this.tempday = 'goal2';
     }
     if(years == 'goal3'){
       this.tempday = 'goal3';
     }
     if(years == 'goal4'){
       this.tempday = 'goal4';
     }
     if(years == 'goal5'){
       this.tempday = 'goal5';
     }
     if(years == 'goal6'){
       this.tempday = 'goal6';
     }
     if(years == 'goal7'){
       this.tempday = 'goal7';
     }
     if(years == 'goal8'){
       this.tempday = 'goal8';
     }
     if(years == 'goal9'){
       this.tempday = 'goal9';
     }
     if(years == 'goal10'){
       this.tempday = 'goal10';
     }
     if(years == 'goal11'){
       this.tempday = 'goal11';
     }
     if(years == 'goal12'){
       this.tempday = 'goal12';
     }
     if(years == 'goal13'){
       this.tempday = 'goal13';
     }
     if(years == 'goal14'){
       this.tempday = 'goal14';
     }
     if(years == 'goal15'){
       this.tempday = 'goal15';
     }

   }
   previousday(){
    this.daycounter = this.daycounter - this.daynumber;
    this.day1object = this.userid.uid + "/nightly/"+ this.daycounter;
    this.user1 = this.af.database.object(this.day1object);
    
    this.day2object = this.userid.uid + "/nightly/"+ (this.daycounter+this.daynumber);
    this.user2 = this.af.database.object(this.day2object);

    this.day3object = this.userid.uid + "/nightly/"+ (this.daycounter-this.daynumber);
    this.user3 = this.af.database.object(this.day3object);
    
    this.user1.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
     this.thisday1 = false;
     this.goal1check = false;
     this.goal2check = false;
     this.goal3check = false;
     this.goal4check = false;
     this.goal5check = false;
     this.goal1object = this.af.database.object(this.day1object+'/goal 1');
     this.goal2object = this.af.database.object(this.day1object+'/goal 2');
     this.goal3object = this.af.database.object(this.day1object+'/goal 3');
     this.goal4object = this.af.database.object(this.day1object+'/goal 4');
     this.goal5object = this.af.database.object(this.day1object+'/goal 5');
      this.currentgoals1 = [
    {goal:this.goal1,status:this.complete1,show:this.goal1check,name:'goal1'},
    {goal:this.goal2,status:this.complete2,show:this.goal2check,name:'goal2'},
    {goal:this.goal3,status:this.complete3,show:this.goal3check,name:'goal3'},
    {goal:this.goal4,status:this.complete4,show:this.goal4check,name:'goal4'},
    {goal:this.goal5,status:this.complete5,show:this.goal5check,name:'goal5'},
  ];

    }else{
      // object does exist
    this.thisday1 = true;
    this.goal1object = this.af.database.object(this.day1object+'/goal 1');
     this.goal2object = this.af.database.object(this.day1object+'/goal 2');
     this.goal3object = this.af.database.object(this.day1object+'/goal 3');
     this.goal4object = this.af.database.object(this.day1object+'/goal 4');
     this.goal5object = this.af.database.object(this.day1object+'/goal 5');

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
        this.currentgoals1 = [
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
        this.currentgoals1 = [
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

    this.user2.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
     this.thisday2 = false;
     this.goal6check = false;
     this.goal7check = false;
     this.goal8check = false;
     this.goal9check = false;
     this.goal10check = false;
     this.goal6object = this.af.database.object(this.day2object+'/goal 1');
     this.goal7object = this.af.database.object(this.day2object+'/goal 2');
     this.goal8object = this.af.database.object(this.day2object+'/goal 3');
     this.goal9object = this.af.database.object(this.day2object+'/goal 4');
     this.goal10object = this.af.database.object(this.day2object+'/goal 5');
      this.currentgoals2 = [
    {goal:this.goal6,status:this.complete6,show:this.goal6check,name:'goal6'},
    {goal:this.goal7,status:this.complete7,show:this.goal7check,name:'goal7'},
    {goal:this.goal8,status:this.complete8,show:this.goal8check,name:'goal8'},
    {goal:this.goal9,status:this.complete9,show:this.goal9check,name:'goal9'},
    {goal:this.goal10,status:this.complete10,show:this.goal10check,name:'goal10'},
  ];

    }else{
      // object does exist
    this.thisday2 = true;
    this.goal6object = this.af.database.object(this.day2object+'/goal 1');
     this.goal7object = this.af.database.object(this.day2object+'/goal 2');
     this.goal8object = this.af.database.object(this.day2object+'/goal 3');
     this.goal9object = this.af.database.object(this.day2object+'/goal 4');
     this.goal10object = this.af.database.object(this.day2object+'/goal 5');

    this.goal6object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal6check = false;
      }
      else{
        // object does exist
        this.goal6check = true;
        this.goal6 = obj.goal;
        this.complete6 = obj.complete
        
      } 
    });
      this.goal7object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal7check = false;
        this.goal7 = "";
        this.complete7 = "q";
        
      }
      else{
        // object does exist
        this.goal7 = obj.goal;
        this.goal7check = true;
        this.complete7 = obj.complete
      } 
   });
      this.goal8object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal8check = false;
        this.goal8 = "";
        this.complete8 = "q";
      }
      else{
        // object does exist
        this.goal8 = obj.goal;
        this.goal8check = true;
        this.complete8 = obj.complete
          } 
        });

        this.goal9object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal9check = false;
        this.goal9 = "";
        this.complete9 = "q";
      }
      else{
        // object does exist
        this.goal9 = obj.goal;
        this.goal9check = true;
        this.complete9 = obj.complete
          } 
        });
        this.goal10object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal10check = false;
        this.goal10 = "";
        this.complete10 = "q";
        this.currentgoals2 = [
          {goal:this.goal6,status:this.complete6,show:this.goal6check,name:'goal6'},
          {goal:this.goal7,status:this.complete7,show:this.goal7check,name:'goal7'},
          {goal:this.goal8,status:this.complete8,show:this.goal8check,name:'goal8'}
          //{goal:this.goal9,status:this.complete9,show:this.goal9check,name:'goal9'},
          //{goal:this.goal10,status:this.complete10,show:this.goal10check,name:'goal10'},
        ];
        
      }
      else{
        // object does exist
        this.goal10 = obj.goal;
        this.goal10check = true;
        this.complete10 = obj.complete
        this.currentgoals2 = [
          {goal:this.goal6,status:this.complete6,show:this.goal6check,name:'goal6'},
          {goal:this.goal7,status:this.complete7,show:this.goal7check,name:'goal7'},
          {goal:this.goal8,status:this.complete8,show:this.goal8check,name:'goal8'}
          //{goal:this.goal9,status:this.complete9,show:this.goal9check,name:'goal9'},
          //{goal:this.goal10,status:this.complete10,show:this.goal10check,name:'goal10'},
        ];
          } 
        });
    }
     
   
    });

        this.user3.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
     this.thisday3 = false;
     this.goal11check = false;
     this.goal12check = false;
     this.goal13check = false;
     this.goal14check = false;
     this.goal15check = false;
     this.goal11object = this.af.database.object(this.day3object+'/goal 1');
     this.goal12object = this.af.database.object(this.day3object+'/goal 2');
     this.goal13object = this.af.database.object(this.day3object+'/goal 3');
     this.goal14object = this.af.database.object(this.day3object+'/goal 4');
     this.goal15object = this.af.database.object(this.day3object+'/goal 5');
      this.currentgoals3 = [
    {goal:this.goal11,status:this.complete11,show:this.goal11check,name:'goal11'},
    {goal:this.goal12,status:this.complete12,show:this.goal12check,name:'goal12'},
    {goal:this.goal13,status:this.complete13,show:this.goal13check,name:'goal13'},
    {goal:this.goal14,status:this.complete14,show:this.goal14check,name:'goal14'},
    {goal:this.goal15,status:this.complete15,show:this.goal15check,name:'goal15'},
  ];

    }else{
      // object does exist
    this.thisday3 = true;
    this.goal11object = this.af.database.object(this.day3object+'/goal 1');
     this.goal12object = this.af.database.object(this.day3object+'/goal 2');
     this.goal13object = this.af.database.object(this.day3object+'/goal 3');
     this.goal14object = this.af.database.object(this.day3object+'/goal 4');
     this.goal15object = this.af.database.object(this.day3object+'/goal 5');

    this.goal11object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal11check = false;
      }
      else{
        // object does exist
        this.goal11check = true;
        this.goal11 = obj.goal;
        this.complete11 = obj.complete
        
      } 
    });
      this.goal12object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal12check = false;
        this.goal12 = "";
        this.complete12 = "q";
        
      }
      else{
        // object does exist
        this.goal12 = obj.goal;
        this.goal12check = true;
        this.complete12 = obj.complete
      } 
   });
      this.goal13object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal13check = false;
        this.goal13 = "";
        this.complete13 = "q";
      }
      else{
        // object does exist
        this.goal13 = obj.goal;
        this.goal13check = true;
        this.complete13 = obj.complete
          } 
        });

        this.goal14object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal14check = false;
        this.goal14 = "";
        this.complete14 = "q";
      }
      else{
        // object does exist
        this.goal14 = obj.goal;
        this.goal14check = true;
        this.complete14 = obj.complete
          } 
        });
        this.goal15object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal15check = false;
        this.goal15 = "";
        this.complete15 = "q";
        this.currentgoals3 = [
         {goal:this.goal11,status:this.complete11,show:this.goal11check,name:'goal11'},
          {goal:this.goal12,status:this.complete12,show:this.goal12check,name:'goal12'},
          {goal:this.goal13,status:this.complete13,show:this.goal13check,name:'goal13'}
          //{goal:this.goal14,status:this.complete14,show:this.goal14check,name:'goal14'},
          //{goal:this.goal15,status:this.complete15,show:this.goal15check,name:'goal115'}, 
        ];
        
      }
      else{
        // object does exist
        this.goal15 = obj.goal;
        this.goal15check = true;
        this.complete15 = obj.complete
        this.currentgoals3 = [
          {goal:this.goal11,status:this.complete11,show:this.goal11check,name:'goal11'},
          {goal:this.goal12,status:this.complete12,show:this.goal12check,name:'goal12'},
          {goal:this.goal13,status:this.complete13,show:this.goal13check,name:'goal13'}
          //{goal:this.goal14,status:this.complete14,show:this.goal14check,name:'goal14'},
          //{goal:this.goal15,status:this.complete15,show:this.goal15check,name:'goal115'},
        ];
          } 
        });
    }
     
   
    });
   }
   nextday(){
    this.daycounter = this.daycounter + this.daynumber;
    this.day1object = this.userid.uid + "/nightly/"+ this.daycounter;
    this.user1 = this.af.database.object(this.day1object);
    
    this.day2object = this.userid.uid + "/nightly/"+ (this.daycounter+this.daynumber);
    this.user2 = this.af.database.object(this.day2object);

    this.day3object = this.userid.uid + "/nightly/"+ (this.daycounter-this.daynumber);
    this.user3 = this.af.database.object(this.day3object);
   
    this.user1.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
     this.thisday1 = false;
     this.goal1check = false;
     this.goal2check = false;
     this.goal3check = false;
     this.goal4check = false;
     this.goal5check = false;
     this.goal1object = this.af.database.object(this.day1object+'/goal 1');
     this.goal2object = this.af.database.object(this.day1object+'/goal 2');
     this.goal3object = this.af.database.object(this.day1object+'/goal 3');
     this.goal4object = this.af.database.object(this.day1object+'/goal 4');
     this.goal5object = this.af.database.object(this.day1object+'/goal 5');
      this.currentgoals1 = [
    {goal:this.goal1,status:this.complete1,show:this.goal1check,name:'goal1'},
    {goal:this.goal2,status:this.complete2,show:this.goal2check,name:'goal2'},
    {goal:this.goal3,status:this.complete3,show:this.goal3check,name:'goal3'},
    {goal:this.goal4,status:this.complete4,show:this.goal4check,name:'goal4'},
    {goal:this.goal5,status:this.complete5,show:this.goal5check,name:'goal5'},
  ];

    }else{
      // object does exist
    this.thisday1 = true;
    this.goal1object = this.af.database.object(this.day1object+'/goal 1');
     this.goal2object = this.af.database.object(this.day1object+'/goal 2');
     this.goal3object = this.af.database.object(this.day1object+'/goal 3');
     this.goal4object = this.af.database.object(this.day1object+'/goal 4');
     this.goal5object = this.af.database.object(this.day1object+'/goal 5');

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
        this.currentgoals1 = [
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
        this.currentgoals1 = [
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

    this.user2.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
     this.thisday2 = false;
     this.goal6check = false;
     this.goal7check = false;
     this.goal8check = false;
     this.goal9check = false;
     this.goal10check = false;
     this.goal6object = this.af.database.object(this.day2object+'/goal 1');
     this.goal7object = this.af.database.object(this.day2object+'/goal 2');
     this.goal8object = this.af.database.object(this.day2object+'/goal 3');
     this.goal9object = this.af.database.object(this.day2object+'/goal 4');
     this.goal10object = this.af.database.object(this.day2object+'/goal 5');
      this.currentgoals2 = [
    {goal:this.goal6,status:this.complete6,show:this.goal6check,name:'goal6'},
    {goal:this.goal7,status:this.complete7,show:this.goal7check,name:'goal7'},
    {goal:this.goal8,status:this.complete8,show:this.goal8check,name:'goal8'},
    {goal:this.goal9,status:this.complete9,show:this.goal9check,name:'goal9'},
    {goal:this.goal10,status:this.complete10,show:this.goal10check,name:'goal10'},
  ];

    }else{
      // object does exist
      
    this.thisday2 = true;
    this.goal6object = this.af.database.object(this.day2object+'/goal 1');
     this.goal7object = this.af.database.object(this.day2object+'/goal 2');
     this.goal8object = this.af.database.object(this.day2object+'/goal 3');
     this.goal9object = this.af.database.object(this.day2object+'/goal 4');
     this.goal10object = this.af.database.object(this.day2object+'/goal 5');

    this.goal6object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal6check = false;
      }
      else{
        // object does exist
        this.goal6check = true;
        this.goal6 = obj.goal;
        this.complete6 = obj.complete
        
      } 
    });
      this.goal7object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal7check = false;
        this.goal7 = "";
        this.complete7 = "q";
        
      }
      else{
        // object does exist
        this.goal7 = obj.goal;
        this.goal7check = true;
        this.complete7 = obj.complete
      } 
   });
      this.goal8object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal8check = false;
        this.goal8 = "";
        this.complete8 = "q";
      }
      else{
        // object does exist
        this.goal8 = obj.goal;
        this.goal8check = true;
        this.complete8 = obj.complete
          } 
        });

        this.goal9object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal9check = false;
        this.goal9 = "";
        this.complete9 = "q";
      }
      else{
        // object does exist
        this.goal9 = obj.goal;
        this.goal9check = true;
        this.complete9 = obj.complete
          } 
        });
        this.goal10object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal10check = false;
        this.goal10 = "";
        this.complete10 = "q";
        this.currentgoals2 = [
          {goal:this.goal6,status:this.complete6,show:this.goal6check,name:'goal6'},
          {goal:this.goal7,status:this.complete7,show:this.goal7check,name:'goal7'},
          {goal:this.goal8,status:this.complete8,show:this.goal8check,name:'goal8'}
          //{goal:this.goal9,status:this.complete9,show:this.goal9check,name:'goal9'},
          //{goal:this.goal10,status:this.complete10,show:this.goal10check,name:'goal10'},
        ];
        
      }
      else{
        // object does exist
        this.goal10 = obj.goal;
        this.goal10check = true;
        this.complete10 = obj.complete
        this.currentgoals2 = [
          {goal:this.goal6,status:this.complete6,show:this.goal6check,name:'goal6'},
          {goal:this.goal7,status:this.complete7,show:this.goal7check,name:'goal7'},
          {goal:this.goal8,status:this.complete8,show:this.goal8check,name:'goal8'}
          //{goal:this.goal9,status:this.complete9,show:this.goal9check,name:'goal9'},
          //{goal:this.goal10,status:this.complete10,show:this.goal10check,name:'goal10'},
        ];
          } 
        });
    }
     
   
    });

        this.user3.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
     this.thisday3 = false;
     this.goal11check = false;
     this.goal12check = false;
     this.goal13check = false;
     this.goal14check = false;
     this.goal15check = false;
     this.goal11object = this.af.database.object(this.day3object+'/goal 1');
     this.goal12object = this.af.database.object(this.day3object+'/goal 2');
     this.goal13object = this.af.database.object(this.day3object+'/goal 3');
     this.goal14object = this.af.database.object(this.day3object+'/goal 4');
     this.goal15object = this.af.database.object(this.day3object+'/goal 5');
      this.currentgoals3 = [
    {goal:this.goal11,status:this.complete11,show:this.goal11check,name:'goal11'},
    {goal:this.goal12,status:this.complete12,show:this.goal12check,name:'goal12'},
    {goal:this.goal13,status:this.complete13,show:this.goal13check,name:'goal13'},
    {goal:this.goal14,status:this.complete14,show:this.goal14check,name:'goal14'},
    {goal:this.goal15,status:this.complete15,show:this.goal15check,name:'goal15'},
  ];

    }else{
      // object does exist
    this.thisday3 = true;
    this.goal11object = this.af.database.object(this.day3object+'/goal 1');
     this.goal12object = this.af.database.object(this.day3object+'/goal 2');
     this.goal13object = this.af.database.object(this.day3object+'/goal 3');
     this.goal14object = this.af.database.object(this.day3object+'/goal 4');
     this.goal15object = this.af.database.object(this.day3object+'/goal 5');

    this.goal11object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal11check = false;
      }
      else{
        // object does exist
        this.goal11check = true;
        this.goal11 = obj.goal;
        this.complete11 = obj.complete
        
      } 
    });
      this.goal12object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal12check = false;
        this.goal12 = "";
        this.complete12 = "q";
        
      }
      else{
        // object does exist
        this.goal12 = obj.goal;
        this.goal12check = true;
        this.complete12 = obj.complete
      } 
   });
      this.goal13object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal13check = false;
        this.goal13 = "";
        this.complete13 = "q";
      }
      else{
        // object does exist
        this.goal13 = obj.goal;
        this.goal13check = true;
        this.complete13 = obj.complete
          } 
        });

        this.goal14object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal14check = false;
        this.goal14 = "";
        this.complete14 = "q";
      }
      else{
        // object does exist
        this.goal14 = obj.goal;
        this.goal14check = true;
        this.complete14 = obj.complete
          } 
        });
        this.goal15object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal15check = false;
        this.goal15 = "";
        this.complete15 = "q";
        this.currentgoals3 = [
         {goal:this.goal11,status:this.complete11,show:this.goal11check,name:'goal11'},
          {goal:this.goal12,status:this.complete12,show:this.goal12check,name:'goal12'},
          {goal:this.goal13,status:this.complete13,show:this.goal13check,name:'goal13'}
          //{goal:this.goal14,status:this.complete14,show:this.goal14check,name:'goal14'},
          //{goal:this.goal15,status:this.complete15,show:this.goal15check,name:'goal115'}, 
        ];
        
      }
      else{
        // object does exist
        this.goal15 = obj.goal;
        this.goal15check = true;
        this.complete15 = obj.complete
        this.currentgoals3 = [
          {goal:this.goal11,status:this.complete11,show:this.goal11check,name:'goal11'},
          {goal:this.goal12,status:this.complete12,show:this.goal12check,name:'goal12'},
          {goal:this.goal13,status:this.complete13,show:this.goal13check,name:'goal13'}
          //{goal:this.goal14,status:this.complete14,show:this.goal14check,name:'goal14'},
          //{goal:this.goal15,status:this.complete15,show:this.goal15check,name:'goal115'},
        ];
          } 
        });
    }
     
   
    });
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
      if(goals == "goal6"){
        this.goal6object.update({goal:goalupdated});
      }
      if(goals == "goal7"){
        this.goal7object.update({goal:goalupdated});
      }
      if(goals == "goal8"){
        this.goal8object.update({goal:goalupdated});
      }
      if(goals == "goal9"){
        this.goal9object.update({goal:goalupdated});
      }
      if(goals == "goal10"){
        this.goal10object.update({goal:goalupdated});
      }
      if(goals == "goal11"){
        this.goal11object.update({goal:goalupdated});
      }
      if(goals == "goal12"){
        this.goal12object.update({goal:goalupdated});
      }
      if(goals == "goal13"){
        this.goal13object.update({goal:goalupdated});
      }
      if(goals == "goal14"){
        this.goal14object.update({goal:goalupdated});
      }
      if(goals == "goal15"){
        this.goal15object.update({goal:goalupdated});
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
      if(goals == "goal6"){
        this.goal6object.update({complete:status});
      }
      if(goals == "goal7"){
        this.goal7object.update({complete:status});
      }
      if(goals == "goal8"){
        this.goal8object.update({complete:status});
      }
      if(goals == "goal9"){
        this.goal9object.update({complete:status});
      }
      if(goals == "goal10"){
        this.goal10object.update({complete:status});
      }
      if(goals == "goal11"){
        this.goal11object.update({complete:status});
      }
      if(goals == "goal12"){
        this.goal12object.update({complete:status});
      }
      if(goals == "goal13"){
        this.goal13object.update({complete:status});
      }
      if(goals == "goal14"){
        this.goal14object.update({complete:status});
      }
      if(goals == "goal15"){
        this.goal15object.update({complete:status});
      }
      this.resetoneandtwo();
    }
      removegoal(goals:string){
      
         if(goals == "goal1"){
        this.goal1object.remove();
        this.resetoneandtwo();
        
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
      if(goals == "goal6"){
        this.goal6object.remove();
        this.day1object = this.userid.uid + "/nightly/"+ this.daycounter;
         this.resetoneandtwo();
      }
      if(goals == "goal7"){
        this.goal7object.remove();
      }
      if(goals == "goal8"){
        this.goal8object.remove();
      }
      if(goals == "goal9"){
        this.goal9object.remove();
      }
      if(goals == "goal10"){
        this.goal10object.remove();
      }
      if(goals == "goal11"){
        this.goal11object.remove();
        this.resetoneandtwo();
      }
      if(goals == "goal12"){
        this.goal12object.remove();
      }
      if(goals == "goal13"){
        this.goal13object.remove();
      }
      if(goals == "goal14"){
        this.goal14object.remove();
      }
      if(goals == "goal15"){
        this.goal15object.remove();
      }

      
      
    }
        onSubmit(formData,goals:string){

      this.completed(formData.value.prog,goals);
      
    }
    onSubmitGoal(formData){
  
     this.addgoal(formData.value.weeklygoal,this.tempday);
    }
     onEditSubmitGoal(formData,goals:string){
    
      this.addupdate(goals,formData.value.weeklygoal);
    }
    
    addgoal(goal:string,goalday:string){
        if(goalday == 'goal1'){
            this.goal1object.set({goal:goal,complete:"q"});
            this.thisday1 = true;
            this.goal1check = true;
         this.resetoneandtwo();
            
        }
         if(goalday == 'goal2'){
            this.goal2object.set({goal:goal,complete:"q"});
            
            this.goal2check = true;
        }
         if(goalday == 'goal3'){
            this.goal3object.set({goal:goal,complete:"q"});
           
            this.goal3check = true;
        }
         if(goalday == 'goal4'){
            this.goal4object.set({goal:goal,complete:"q"});
           
            this.goal4check = true;
        }
         if(goalday == 'goal5'){
            this.goal5object.set({goal:goal,complete:"q"});
            
            this.goal5check = true;
        }
         if(goalday == 'goal6'){
            this.goal6object.set({goal:goal,complete:"q"});
            this.thisday2 = true;
            this.goal6check = true;
        this.resetoneandtwo();
           
        }
          if(goalday == 'goal7'){
            this.goal7object.set({goal:goal,complete:"q"});
            
            this.goal7check = true;
        }
          if(goalday == 'goal8'){
            this.goal8object.set({goal:goal,complete:"q"});
            
            this.goal8check = true;
        }
          if(goalday == 'goal9'){
            this.goal9object.set({goal:goal,complete:"q"});
            
            this.goal9check = true;
        }
          if(goalday == 'goal10'){
            this.goal10object.set({goal:goal,complete:"q"});
            this.goal10check = true;
        }
          if(goalday == 'goal11'){
            this.goal11object.set({goal:goal,complete:"q"});
            this.goal11check = true;
            this.resetoneandtwo();
        }
          if(goalday == 'goal12'){
            this.goal12object.set({goal:goal,complete:"q"});
            this.goal12check = true;
        }
          if(goalday == 'goal13'){
            this.goal13object.set({goal:goal,complete:"q"});
            this.goal13check = true;
        }
          if(goalday == 'goal14'){
            this.goal14object.set({goal:goal,complete:"q"});
            this.goal14check = true;
        }
          if(goalday == 'goal15'){
            this.goal15object.set({goal:goal,complete:"q"});
            this.goal15check = true;
        }
    }
   
  
  checkgoalday1(){
    this.goalday1 = false
    if((!this.goalday1)&&
    (!this.goal1check)){
      this.daypicker('goal1');
      this.goalday1 = true;
    }

    if((!this.goalday1)&&
    (this.goal1check)&&
    (!this.goal2check)){
      this.daypicker('goal2');
      this.goalday1 = true;
    }
     if((!this.goalday1)&&
    (this.goal1check)&&
    (this.goal2check)&&
    (!this.goal3check)){
      this.daypicker('goal3');
      this.goalday1 = true;
    }
  }
  checkgoalday2(){
    this.goalday2 = false;

      if((!this.goalday2)&&
    (!this.goal6check)){
      this.daypicker('goal6');
      this.goalday2 = true;
    }
     if((!this.goalday2)&&
    (this.goal6check)&&
    (!this.goal7check)){
      this.daypicker('goal7');
      this.goalday2 = true;
    }
     if((!this.goalday2)&&
    (this.goal6check)&&
    (this.goal7check)&&
    (!this.goal8check)){
      this.daypicker('goal8');
      this.goalday2 = true;
    }
  }
  checkgoalday3(){
    this.goalday2 = false;

      if((!this.goalday2)&&
    (!this.goal11check)){
      this.daypicker('goal11');
      this.goalday2 = true;
    }
     if((!this.goalday2)&&
    (this.goal11check)&&
    (!this.goal12check)){
      this.daypicker('goal12');
      this.goalday2 = true;
    }
     if((!this.goalday2)&&
    (this.goal11check)&&
    (this.goal12check)&&
    (!this.goal13check)){
      this.daypicker('goal13');
      this.goalday2 = true;
    }
  }

  resetoneandtwo(){

    this.day1object = this.userid.uid + "/nightly/"+ this.daycounter;
        this.user1 = this.af.database.object(this.day1object);

        this.day2object = this.userid.uid + "/nightly/"+ (this.daycounter+this.daynumber);
        this.user2 = this.af.database.object(this.day2object);

        this.user2.subscribe((obj) => {
        if (obj.hasOwnProperty('$value') && !obj['$value']) {
          // object doesnt exist
        this.thisday2 = false;
        this.goal6check = false;
        this.goal7check = false;
        this.goal8check = false;
        this.goal9check = false;
        this.goal10check = false;
        this.goal6object = this.af.database.object(this.day2object+'/goal 1');
        this.goal7object = this.af.database.object(this.day2object+'/goal 2');
        this.goal8object = this.af.database.object(this.day2object+'/goal 3');
        this.goal9object = this.af.database.object(this.day2object+'/goal 4');
        this.goal10object = this.af.database.object(this.day2object+'/goal 5');
          this.currentgoals2 = [
        {goal:this.goal6,status:this.complete6,show:this.goal6check,name:'goal6'},
        {goal:this.goal7,status:this.complete7,show:this.goal7check,name:'goal7'},
        {goal:this.goal8,status:this.complete8,show:this.goal8check,name:'goal8'},
        {goal:this.goal9,status:this.complete9,show:this.goal9check,name:'goal9'},
        {goal:this.goal10,status:this.complete10,show:this.goal10check,name:'goal10'},
      ];

        }else{
          // object does exist
          
        this.thisday2 = true;
        this.goal6object = this.af.database.object(this.day2object+'/goal 1');
        this.goal7object = this.af.database.object(this.day2object+'/goal 2');
        this.goal8object = this.af.database.object(this.day2object+'/goal 3');
        this.goal9object = this.af.database.object(this.day2object+'/goal 4');
        this.goal10object = this.af.database.object(this.day2object+'/goal 5');

        this.goal6object.subscribe((obj) =>{
          if (obj.hasOwnProperty('$value') && !obj['$value']) {
            //object doesnt exist
            this.goal6check = false;
          }
          else{
            // object does exist
            this.goal6check = true;
            this.goal6 = obj.goal;
            this.complete6 = obj.complete
            
          } 
        });
          this.goal7object.subscribe((obj) =>{
          if (obj.hasOwnProperty('$value') && !obj['$value']) {
            //object doesnt exist
            this.goal7check = false;
            this.goal7 = "";
            this.complete7 = "q";
            
          }
          else{
            // object does exist
            this.goal7 = obj.goal;
            this.goal7check = true;
            this.complete7 = obj.complete
          } 
      });
          this.goal8object.subscribe((obj) =>{
          if (obj.hasOwnProperty('$value') && !obj['$value']) {
            //object doesnt exist
            this.goal8check = false;
            this.goal8 = "";
            this.complete8 = "q";
          }
          else{
            // object does exist
            this.goal8 = obj.goal;
            this.goal8check = true;
            this.complete8 = obj.complete
              } 
            });

            this.goal9object.subscribe((obj) =>{
          if (obj.hasOwnProperty('$value') && !obj['$value']) {
            //object doesnt exist
            this.goal9check = false;
            this.goal9 = "";
            this.complete9 = "q";
          }
          else{
            // object does exist
            this.goal9 = obj.goal;
            this.goal9check = true;
            this.complete9 = obj.complete
              } 
            });
            this.goal10object.subscribe((obj) =>{
          if (obj.hasOwnProperty('$value') && !obj['$value']) {
            //object doesnt exist
            this.goal10check = false;
            this.goal10 = "";
            this.complete10 = "q";
            this.currentgoals2 = [
              {goal:this.goal6,status:this.complete6,show:this.goal6check,name:'goal6'},
              {goal:this.goal7,status:this.complete7,show:this.goal7check,name:'goal7'},
              {goal:this.goal8,status:this.complete8,show:this.goal8check,name:'goal8'}
              //{goal:this.goal9,status:this.complete9,show:this.goal9check,name:'goal9'},
              //{goal:this.goal10,status:this.complete10,show:this.goal10check,name:'goal10'},
            ];
            
          }
          else{
            // object does exist
            this.goal10 = obj.goal;
            this.goal10check = true;
            this.complete10 = obj.complete
            this.currentgoals2 = [
              {goal:this.goal6,status:this.complete6,show:this.goal6check,name:'goal6'},
              {goal:this.goal7,status:this.complete7,show:this.goal7check,name:'goal7'},
              {goal:this.goal8,status:this.complete8,show:this.goal8check,name:'goal8'}
              //{goal:this.goal9,status:this.complete9,show:this.goal9check,name:'goal9'},
              //{goal:this.goal10,status:this.complete10,show:this.goal10check,name:'goal10'},
            ];
              } 
            });
        }
        
      
        });
     this.user1.subscribe((obj) => {
            if (obj.hasOwnProperty('$value') && !obj['$value']) {
              // object doesnt exist
            this.thisday1 = false;
            this.goal1check = false;
            this.goal2check = false;
            this.goal3check = false;
            this.goal4check = false;
            this.goal5check = false;
            this.goal1object = this.af.database.object(this.day1object+'/goal 1');
            this.goal2object = this.af.database.object(this.day1object+'/goal 2');
            this.goal3object = this.af.database.object(this.day1object+'/goal 3');
            this.goal4object = this.af.database.object(this.day1object+'/goal 4');
            this.goal5object = this.af.database.object(this.day1object+'/goal 5');
              this.currentgoals1 = [
            {goal:this.goal1,status:this.complete1,show:this.goal1check,name:'goal1'},
            {goal:this.goal2,status:this.complete2,show:this.goal2check,name:'goal2'},
            {goal:this.goal3,status:this.complete3,show:this.goal3check,name:'goal3'},
            {goal:this.goal4,status:this.complete4,show:this.goal4check,name:'goal4'},
            {goal:this.goal5,status:this.complete5,show:this.goal5check,name:'goal5'},
          ];

            }else{
              // object does exist
            this.thisday1 = true;
            this.goal1object = this.af.database.object(this.day1object+'/goal 1');
            this.goal2object = this.af.database.object(this.day1object+'/goal 2');
            this.goal3object = this.af.database.object(this.day1object+'/goal 3');
            this.goal4object = this.af.database.object(this.day1object+'/goal 4');
            this.goal5object = this.af.database.object(this.day1object+'/goal 5');

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
                this.currentgoals1 = [
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
                this.currentgoals1 = [
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
                this.user3.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
     this.thisday3 = false;
     this.goal11check = false;
     this.goal12check = false;
     this.goal13check = false;
     this.goal14check = false;
     this.goal15check = false;
     this.goal11object = this.af.database.object(this.day3object+'/goal 1');
     this.goal12object = this.af.database.object(this.day3object+'/goal 2');
     this.goal13object = this.af.database.object(this.day3object+'/goal 3');
     this.goal14object = this.af.database.object(this.day3object+'/goal 4');
     this.goal15object = this.af.database.object(this.day3object+'/goal 5');
      this.currentgoals3 = [
    {goal:this.goal11,status:this.complete11,show:this.goal11check,name:'goal11'},
    {goal:this.goal12,status:this.complete12,show:this.goal12check,name:'goal12'},
    {goal:this.goal13,status:this.complete13,show:this.goal13check,name:'goal13'},
    {goal:this.goal14,status:this.complete14,show:this.goal14check,name:'goal14'},
    {goal:this.goal15,status:this.complete15,show:this.goal15check,name:'goal15'},
  ];

    }else{
      // object does exist
    this.thisday3 = true;
    this.goal11object = this.af.database.object(this.day3object+'/goal 1');
     this.goal12object = this.af.database.object(this.day3object+'/goal 2');
     this.goal13object = this.af.database.object(this.day3object+'/goal 3');
     this.goal14object = this.af.database.object(this.day3object+'/goal 4');
     this.goal15object = this.af.database.object(this.day3object+'/goal 5');

    this.goal11object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal11check = false;
      }
      else{
        // object does exist
        this.goal11check = true;
        this.goal11 = obj.goal;
        this.complete11 = obj.complete
        
      } 
    });
      this.goal12object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal12check = false;
        this.goal12 = "";
        this.complete12 = "q";
        
      }
      else{
        // object does exist
        this.goal12 = obj.goal;
        this.goal12check = true;
        this.complete12 = obj.complete
      } 
   });
      this.goal13object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal13check = false;
        this.goal13 = "";
        this.complete13 = "q";
      }
      else{
        // object does exist
        this.goal13 = obj.goal;
        this.goal13check = true;
        this.complete13 = obj.complete
          } 
        });

        this.goal14object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal14check = false;
        this.goal14 = "";
        this.complete14 = "q";
      }
      else{
        // object does exist
        this.goal14 = obj.goal;
        this.goal14check = true;
        this.complete14 = obj.complete
          } 
        });
        this.goal15object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.goal15check = false;
        this.goal15 = "";
        this.complete15 = "q";
        this.currentgoals3 = [
         {goal:this.goal11,status:this.complete11,show:this.goal11check,name:'goal11'},
          {goal:this.goal12,status:this.complete12,show:this.goal12check,name:'goal12'},
          {goal:this.goal13,status:this.complete13,show:this.goal13check,name:'goal13'}
          //{goal:this.goal14,status:this.complete14,show:this.goal14check,name:'goal14'},
          //{goal:this.goal15,status:this.complete15,show:this.goal15check,name:'goal115'}, 
        ];
        
      }
      else{
        // object does exist
        this.goal15 = obj.goal;
        this.goal15check = true;
        this.complete15 = obj.complete
        this.currentgoals3 = [
          {goal:this.goal11,status:this.complete11,show:this.goal11check,name:'goal11'},
          {goal:this.goal12,status:this.complete12,show:this.goal12check,name:'goal12'},
          {goal:this.goal13,status:this.complete13,show:this.goal13check,name:'goal13'}
          //{goal:this.goal14,status:this.complete14,show:this.goal14check,name:'goal14'},
          //{goal:this.goal15,status:this.complete15,show:this.goal15check,name:'goal115'},
        ];
          } 
        });
    }
     
   
    });
  }
}