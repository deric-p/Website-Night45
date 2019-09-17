import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';

import { AngularFire, FirebaseApp } from 'angularfire2';


@Component({
 
  
  selector: 'my-accomplishments',
  templateUrl: './accomplishments.component.html',
  styleUrls:['./accomplishments.component.css']
  
})
export class AccomplishmentsComponent {
   public joineddate;
  public joindate;
  public userid;
  public monthobject;
  public user;
  public accomplish1object;
  public accomplish2object;
  public accomplish3object;
  public accomplish4object;
  public accomplish5object;
  public accomplish1;
  public accomplish2;
  public accomplish3;
  public accomplish4;
  public accomplish5;
  public thismonth = null;
  public accomplish1check = null;
  public accomplish2check = null;
  public accomplish3check = null;
  public accomplish4check = null;
  public accomplish5check = null;
  public tempmonth;
  public todaydate;
  public addaccomplishdone = true;
  public currentaccomplishs;
  
  public datestring = "January 1, 2017 12:00 AM";
  public today: number = Date.now();
  public referencedate: number = Date.parse(this.datestring);
  
  
  
  public leapyear = false;
  public yearreset = false;
  public daynumber = 60*24*60*1000;
  day = Math.floor((this.today - this.referencedate)/this.daynumber);
  currentday = this.referencedate + (this.day*this.daynumber);
  public currentmonth = this.currentday;
  public datecounter = this.currentday;
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
   
    
     this.monthobject = this.userid.uid + "/accomplishments/"+ this.currentmonth;
    this.user = af.database.object(this.monthobject);
    //check if the object exists
    this.user.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
     this.thismonth = false;
     this.accomplish1check = false;
     this.accomplish2check = false;
     this.accomplish3check = false;
     this.accomplish4check = false;
     this.accomplish5check = false;
     this.accomplish1object = af.database.object(this.monthobject+'/accomplish 1');
     this.accomplish2object = af.database.object(this.monthobject+'/accomplish 2');
     this.accomplish3object = af.database.object(this.monthobject+'/accomplish 3');
     this.accomplish4object = af.database.object(this.monthobject+'/accomplish 4');
     this.accomplish5object = af.database.object(this.monthobject+'/accomplish 5');
      this.currentaccomplishs = [
    {accomplish:this.accomplish1,show:this.accomplish1check,name:'accomplish1'},
    {accomplish:this.accomplish2,show:this.accomplish2check,name:'accomplish2'},
    {accomplish:this.accomplish3,show:this.accomplish3check,name:'accomplish3'},
    {accomplish:this.accomplish4,show:this.accomplish4check,name:'accomplish4'},
    {accomplish:this.accomplish5,show:this.accomplish5check,name:'accomplish5'},
  ];

    }else{
      // object does exist
    this.thismonth = true;
    this.accomplish1object = af.database.object(this.monthobject+'/accomplish 1');
     this.accomplish2object = af.database.object(this.monthobject+'/accomplish 2');
     this.accomplish3object = af.database.object(this.monthobject+'/accomplish 3');
     this.accomplish4object = af.database.object(this.monthobject+'/accomplish 4');
     this.accomplish5object = af.database.object(this.monthobject+'/accomplish 5');

    this.accomplish1object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.accomplish1check = false;
      }
      else{
        // object does exist
        this.accomplish1check = true;
        this.accomplish1 = obj.accomplish;
        
        
      } 
    });
      this.accomplish2object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.accomplish2check = false;
        this.accomplish2 = "";
        
        
      }
      else{
        // object does exist
        this.accomplish2 = obj.accomplish;
        this.accomplish2check = true;
        
      } 
   });
      this.accomplish3object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.accomplish3check = false;
        this.accomplish3 = "";
        
      }
      else{
        // object does exist
        this.accomplish3 = obj.accomplish;
        this.accomplish3check = true;
        
          } 
        });

        this.accomplish4object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.accomplish4check = false;
        this.accomplish4 = "";
       
      }
      else{
        // object does exist
        this.accomplish4 = obj.accomplish;
        this.accomplish4check = true;
        
          } 
        });
        this.accomplish5object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.accomplish5check = false;
        this.accomplish5 = "";
        
        this.currentaccomplishs = [
          {accomplish:this.accomplish1,show:this.accomplish1check,name:'accomplish1'},
          {accomplish:this.accomplish2,show:this.accomplish2check,name:'accomplish2'},
          {accomplish:this.accomplish3,show:this.accomplish3check,name:'accomplish3'}
          //{accomplish:this.accomplish4,status:this.complete4,show:this.accomplish4check,name:'accomplish4'},
          //{accomplish:this.accomplish5,status:this.complete5,show:this.accomplish5check,name:'accomplish5'},
        ];
        
      }
      else{
        // object does exist
        this.accomplish5 = obj.accomplish;
        this.accomplish5check = true;
        
        this.currentaccomplishs = [
          {accomplish:this.accomplish1,show:this.accomplish1check,name:'accomplish1'},
          {accomplish:this.accomplish2,show:this.accomplish2check,name:'accomplish2'},
          {accomplish:this.accomplish3,show:this.accomplish3check,name:'accomplish3'}
          //{accomplish:this.accomplish4,status:this.complete4,show:this.accomplish4check,name:'accomplish4'},
          //{accomplish:this.accomplish5,status:this.complete5,show:this.accomplish5check,name:'accomplish5'},
        ];
          } 
        });
    }
     
   
    });
   }

  
   previousmonth(){
    this.datecounter = this.datecounter - this.daynumber;
    this.monthobject = this.userid.uid + "/accomplishments/"+ this.datecounter;

   
    this.user = this.af.database.object(this.monthobject);
    this.user.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
      this.thismonth = false;
     this.accomplish1check = false;
     this.accomplish2check = false;
     this.accomplish3check = false;
     this.accomplish4check = false;
     this.accomplish5check = false;
     this.accomplish1object = this.af.database.object(this.monthobject+'/accomplish 1');
     this.accomplish2object = this.af.database.object(this.monthobject+'/accomplish 2');
     this.accomplish3object = this.af.database.object(this.monthobject+'/accomplish 3');
     this.accomplish4object = this.af.database.object(this.monthobject+'/accomplish 4');
     this.accomplish5object = this.af.database.object(this.monthobject+'/accomplish 5');
      
    }else{
      // object does exist
          this.thismonth = true;
    this.accomplish1object = this.af.database.object(this.monthobject+'/accomplish 1');
     this.accomplish2object = this.af.database.object(this.monthobject+'/accomplish 2');
     this.accomplish3object = this.af.database.object(this.monthobject+'/accomplish 3');
     this.accomplish4object = this.af.database.object(this.monthobject+'/accomplish 4');
     this.accomplish5object = this.af.database.object(this.monthobject+'/accomplish 5');

    this.accomplish1object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.accomplish1check = false;
      }
      else{
        // object does exist
        this.accomplish1check = true;
        this.accomplish1 = obj.accomplish;
        
      } 
    });
      this.accomplish2object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.accomplish2check = false;
        this.accomplish2 = "";
       
      }
      else{
        // object does exist
        this.accomplish2 = obj.accomplish;
        this.accomplish2check = true;
      
      } 
   });
      this.accomplish3object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.accomplish3check = false;
        this.accomplish3 = "";
       
      }
      else{
        // object does exist
        this.accomplish3 = obj.accomplish;
        this.accomplish3check = true;
       
          } 
        });
        this.accomplish4object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.accomplish4check = false;
        this.accomplish4 = "";
        
      }
      else{
        // object does exist
        this.accomplish4 = obj.accomplish;
        this.accomplish4check = true;
        
          } 
        });
        this.accomplish5object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.accomplish5check = false;
        this.accomplish5 = "";
       
         this.currentaccomplishs = [
          {accomplish:this.accomplish1,show:this.accomplish1check,name:'accomplish1'},
          {accomplish:this.accomplish2,show:this.accomplish2check,name:'accomplish2'},
          {accomplish:this.accomplish3,show:this.accomplish3check,name:'accomplish3'}
          //{accomplish:this.accomplish4,status:this.complete4,show:this.accomplish4check,name:'accomplish4'},
          //{accomplish:this.accomplish5,status:this.complete5,show:this.accomplish5check,name:'accomplish5'},
        ];
      }
      else{
        // object does exist
        this.accomplish5 = obj.accomplish;
        this.accomplish5check = true;
       
         this.currentaccomplishs = [
          {accomplish:this.accomplish1,show:this.accomplish1check,name:'accomplish1'},
          {accomplish:this.accomplish2,show:this.accomplish2check,name:'accomplish2'},
          {accomplish:this.accomplish3,show:this.accomplish3check,name:'accomplish3'}
          //{accomplish:this.accomplish4,status:this.complete4,show:this.accomplish4check,name:'accomplish4'},
          //{accomplish:this.accomplish5,status:this.complete5,show:this.accomplish5check,name:'accomplish5'},
        ];
          } 
        });
    }
    });
   }
   nextmonth(){
  
   this.datecounter = this.datecounter + this.daynumber;
    this.monthobject = this.userid.uid + "/accomplishments/"+ this.datecounter;

   
    this.user = this.af.database.object(this.monthobject);

    this.user.subscribe((obj) => {
    if (obj.hasOwnProperty('$value') && !obj['$value']) {
      // object doesnt exist
      this.thismonth = false;
     this.accomplish1check = false;
     this.accomplish2check = false;
     this.accomplish3check = false;
     this.accomplish4check = false;
     this.accomplish5check = false;
     this.accomplish1object = this.af.database.object(this.monthobject+'/accomplish 1');
     this.accomplish2object = this.af.database.object(this.monthobject+'/accomplish 2');
     this.accomplish3object = this.af.database.object(this.monthobject+'/accomplish 3');
     this.accomplish4object = this.af.database.object(this.monthobject+'/accomplish 4');
     this.accomplish5object = this.af.database.object(this.monthobject+'/accomplish 5');
      
    }else{
      // object does exist
          this.thismonth = true;
    this.accomplish1object = this.af.database.object(this.monthobject+'/accomplish 1');
     this.accomplish2object = this.af.database.object(this.monthobject+'/accomplish 2');
     this.accomplish3object = this.af.database.object(this.monthobject+'/accomplish 3');
     this.accomplish5object = this.af.database.object(this.monthobject+'/accomplish 4');
     this.accomplish5object = this.af.database.object(this.monthobject+'/accomplish 5');

    this.accomplish1object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.accomplish1check = false;
      }
      else{
        // object does exist
        this.accomplish1check = true;
        this.accomplish1 = obj.accomplish;
      
      } 
    });
      this.accomplish2object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.accomplish2check = false;
        this.accomplish2 = "";
        
      }
      else{
        // object does exist
        this.accomplish2 = obj.accomplish;
        this.accomplish2check = true;
      
      } 
   });
      this.accomplish3object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.accomplish3check = false;
        this.accomplish3 = "";
        
      }
      else{
        // object does exist
        this.accomplish3 = obj.accomplish;
        this.accomplish3check = true;
       
          } 
        });
        this.accomplish4object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.accomplish4check = false;
        this.accomplish4 = "";
        
      }
      else{
        // object does exist
        this.accomplish4 = obj.accomplish;
        this.accomplish4check = true;
        
          } 
        });
        this.accomplish5object.subscribe((obj) =>{
      if (obj.hasOwnProperty('$value') && !obj['$value']) {
        //object doesnt exist
        this.accomplish5check = false;
        this.accomplish5 = "";
       
         this.currentaccomplishs = [
          {accomplish:this.accomplish1,show:this.accomplish1check,name:'accomplish1'},
          {accomplish:this.accomplish2,show:this.accomplish2check,name:'accomplish2'},
          {accomplish:this.accomplish3,show:this.accomplish3check,name:'accomplish3'}
          //{accomplish:this.accomplish4,status:this.complete4,show:this.accomplish4check,name:'accomplish4'},
          //{accomplish:this.accomplish5,status:this.complete5,show:this.accomplish5check,name:'accomplish5'},
        ];
      }
      else{
        // object does exist
        this.accomplish5 = obj.accomplish;
        this.accomplish5check = true;
     
         this.currentaccomplishs = [
          {accomplish:this.accomplish1,show:this.accomplish1check,name:'accomplish1'},
          {accomplish:this.accomplish2,show:this.accomplish2check,name:'accomplish2'},
          {accomplish:this.accomplish3,show:this.accomplish3check,name:'accomplish3'}
          //{accomplish:this.accomplish4,status:this.complete4,show:this.accomplish4check,name:'accomplish4'},
          //{accomplish:this.accomplish5,status:this.complete5,show:this.accomplish5check,name:'accomplish5'},
        ];
          } 
        });
    }
    });
   }
   addaccomplish(addingaccomplish:string){
      this.addaccomplishdone = false;
     if((!this.addaccomplishdone)&&
     (!this.accomplish1check)){
        this.accomplish1object.set({accomplish:addingaccomplish});
        this.thismonth = true;
        this.accomplish1check = true;
        this.addaccomplishdone = true;
     }
      if((!this.addaccomplishdone)&&
     (!this.accomplish2check)&&
     (this.accomplish1check)){
        this.accomplish2object.set({accomplish:addingaccomplish});
        this.accomplish2check = true;
        this.addaccomplishdone = true;
     }
      if((!this.addaccomplishdone)&&
     (!this.accomplish3check)&&
     (this.accomplish1check)&&
     (this.accomplish2check)){
        this.accomplish3object.set({accomplish:addingaccomplish});
        this.accomplish3check = true;
        this.addaccomplishdone = true;
     }
      if((!this.addaccomplishdone)&&
     (this.accomplish3check)&&
     (this.accomplish1check)&&
     (this.accomplish2check)&&
     (!this.accomplish4check)){
        this.accomplish4object.set({accomplish:addingaccomplish});
        this.accomplish4check = true;
        this.addaccomplishdone = true;
     }
      if((!this.addaccomplishdone)&&
     (this.accomplish3check)&&
     (this.accomplish1check)&&
     (this.accomplish2check)&&
     (this.accomplish4check)&&
     (!this.accomplish5check)){
        this.accomplish5object.set({accomplish:addingaccomplish});
        this.accomplish5check = true;
        this.addaccomplishdone = true;
     }
   }
   //update existing accomplish with new accomplish
    addupdate(accomplishs:string,accomplishupdated:string){
      if(accomplishs == "accomplish1"){
        this.accomplish1object.update({accomplish:accomplishupdated});
      }
      if(accomplishs == "accomplish2"){
        this.accomplish2object.update({accomplish:accomplishupdated});
      }
      if(accomplishs == "accomplish3"){
        this.accomplish3object.update({accomplish:accomplishupdated});
      }
      if(accomplishs == "accomplish4"){
        this.accomplish4object.update({accomplish:accomplishupdated});
      }
      if(accomplishs == "accomplish5"){
        this.accomplish5object.update({accomplish:accomplishupdated});
      }
    }
    
      removeaccomplish(accomplishs:string){
         if(accomplishs == "accomplish1"){
        this.accomplish1object.remove();
      }
      if(accomplishs == "accomplish2"){
        this.accomplish2object.remove();
      }
      if(accomplishs == "accomplish3"){
        this.accomplish3object.remove();
      }
      if(accomplishs == "accomplish4"){
        this.accomplish4object.remove();
      }
      if(accomplishs == "accomplish5"){
        this.accomplish5object.remove();
      }
    }
 
    onSubmitaccomplish(formData){
  
     this.addaccomplish(formData.value.accomplishment);

    }
     onEditSubmitaccomplish(formData,accomplishs:string){
    
      this.addupdate(accomplishs,formData.value.accomplishment);
      
    }
    
  
  
    // for html purposes
   monthpicker(years:string){
     if(years == 'accomplish1'){
       this.tempmonth = 'accomplish1';
     }
     if(years == 'accomplish2'){
       this.tempmonth = 'accomplish2';
     }
     if(years == 'accomplish3'){
       this.tempmonth = 'accomplish3';
     }
     if(years == 'accomplish4'){
       this.tempmonth = 'accomplish4';
     }
     if(years == 'accomplish5'){
       this.tempmonth = 'accomplish5';
     }
   }
}