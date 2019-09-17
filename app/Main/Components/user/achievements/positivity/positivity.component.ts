import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';

import { AngularFire, FirebaseApp } from 'angularfire2';


@Component({
 
  
  selector: 'my-positivity',
  templateUrl: './positivity.component.html',
  styleUrls:['./positivity.component.css']
  
})
export class PositivityComponent {

    public pos1;
    public pos1check;
    public pos1object;
    public pos2;
    public pos2check;
    public pos2object;
    public pos3;
    public pos3check;
    public pos3object;
    public pos4;
    public pos4check;
    public pos4object;
    public pos5;
    public pos5check;
    public pos5object;
    public positiveobject;
    public user;
    public userid;
    public temppos;
    public isdone = true;
    public currentpos;
    public positivity;
    // set up
    constructor(private af: AngularFire) {
    // this.af.auth.subscribe(auth => console.log(auth));
        if(this.af.auth != null){
            this.af.auth.subscribe(auth => {
                this.userid = auth;
                });
        }
        // checks the start week
        this.positiveobject = this.userid.uid + "/positivity";
        this.user = af.database.object(this.positiveobject);
        //check if the object exists
        this.user.subscribe((obj) => {
        if (obj.hasOwnProperty('$value') && !obj['$value']) {
        // object doesnt exist

            this.positivity = true;
            this.pos1check = false;
            this.pos2check = false;
            this.pos3check = false;
            this.pos4check = false;
            this.pos5check = false;
            this.pos1object = af.database.object(this.positiveobject+'/1');
            this.pos2object = af.database.object(this.positiveobject+'/2');
            this.pos3object = af.database.object(this.positiveobject+'/3');
            this.pos4object = af.database.object(this.positiveobject+'/4');
            this.pos5object = af.database.object(this.positiveobject+'/5');

        } else {

            this.positivity = false;
            this.pos1object = af.database.object(this.positiveobject+'/1');
            this.pos2object = af.database.object(this.positiveobject+'/2');
            this.pos3object = af.database.object(this.positiveobject+'/3');
            this.pos4object = af.database.object(this.positiveobject+'/4');
            this.pos5object = af.database.object(this.positiveobject+'/5');

            this.pos1object.subscribe((obj) =>{
                if (obj.hasOwnProperty('$value') && !obj['$value']) {
                    //object doesnt exist
                    this.pos1check = false;
                }
                else{
                    // object does exist
                    this.pos1check = true;
                    this.pos1 = obj.pos;
                } 
                });
            this.pos2object.subscribe((obj) =>{
                if (obj.hasOwnProperty('$value') && !obj['$value']) {
                    //object doesnt exist
                    this.pos2check = false;
                }
                else{
                    // object does exist
                    this.pos2check = true;
                    this.pos2 = obj.pos;
                } 
                });
            this.pos3object.subscribe((obj) =>{
                if (obj.hasOwnProperty('$value') && !obj['$value']) {
                    //object doesnt exist
                    this.pos3check = false;
                }
                else{
                    // object does exist
                    this.pos3check = true;
                    this.pos3 = obj.pos;
                } 
                });
            this.pos4object.subscribe((obj) =>{
                if (obj.hasOwnProperty('$value') && !obj['$value']) {
                    //object doesnt exist
                    this.pos4check = false;
                }
                else{
                    // object does exist
                    this.pos4check = true;
                    this.pos4 = obj.pos;
                } 
                });
            this.pos5object.subscribe((obj) =>{
                if (obj.hasOwnProperty('$value') && !obj['$value']) {
                    //object doesnt exist
                    this.pos5check = false;
                    this.currentpos = [
                    {pos:this.pos1,show:this.pos1check,name:'pos1'},
                    {pos:this.pos2,show:this.pos2check,name:'pos2'},
                    {pos:this.pos3,show:this.pos3check,name:'pos3'},
                    {pos:this.pos4,show:this.pos4check,name:'pos4'},
                    {pos:this.pos5,show:this.pos5check,name:'pos5'}
                    ];
                }
                else{
                    // object does exist
                    this.pos5check = true;
                    this.pos5 = obj.pos;
                    this.currentpos = [
                    {pos:this.pos1,show:this.pos1check,name:'pos1'},
                    {pos:this.pos2,show:this.pos2check,name:'pos2'},
                    {pos:this.pos3,show:this.pos3check,name:'pos3'},
                    {pos:this.pos4,show:this.pos4check,name:'pos4'},
                    {pos:this.pos5,show:this.pos5check,name:'pos5'}
                    ];
                } 
                });
        } 
        });
    }
    addPositivity(pos:string){
        this.isdone = false;
        if((!this.isdone)&&
        (!this.pos1check)){
            this.isdone = true;
            this.pos1object.set({pos:pos});
            this.pos1check = true;
            this.positivity = false;
        }
        if((!this.isdone)&&
        (!this.pos2check)){
            this.isdone = true;
            this.pos2object.set({pos:pos});
            this.pos2check = true;
        }
        if((!this.isdone)&&
        (!this.pos3check)){
            this.isdone = true;
            this.pos3object.set({pos:pos});
            this.pos3check = true;
        }
        if((!this.isdone)&&
        (!this.pos4check)){
            this.isdone = true;
            this.pos4object.set({pos:pos});
            this.pos4check = true;
        }
        if((!this.isdone)&&
        (!this.pos5check)){
            this.isdone = true;
            this.pos5object.set({pos:pos});
            this.pos5check = true;
        }
    }
    editPositivity(pos:string,thinking:string){
        if(pos== "pos1"){
            this.pos1object.update({pos:thinking});
        }
        if(pos== "pos2"){
            this.pos2object.update({pos:thinking});
        }
        if(pos== "pos3"){
            this.pos3object.update({pos:thinking});
        }
        if(pos== "pos4"){
            this.pos4object.update({pos:thinking});
        }
        if(pos== "pos5"){
            this.pos5object.update({pos:thinking});
        }
        

    }
    removePositivity(pos:string){
        if(pos == "pos1"){
            this.pos1object.remove();
        }
        if(pos == "pos2"){
            this.pos2object.remove();
        }
        if(pos == "pos3"){
            this.pos3object.remove();
        }
        if(pos == "pos4"){
            this.pos4object.remove();
        }
        if(pos == "pos5"){
            this.pos5object.remove();
        }

    }
    posPicker(positivitynumber:string){
        if(positivitynumber == 'pos1'){
            this.temppos = 'pos1';
        }
        if(positivitynumber == 'pos2'){
            this.temppos = 'pos2';
        }
        if(positivitynumber == 'pos3'){
            this.temppos = 'pos3';
        }
        if(positivitynumber == 'pos4'){
            this.temppos = 'pos4';
        }
        if(positivitynumber == 'pos5'){
            this.temppos = 'pos5';
        }
    }
   
    onSubmitGoal(formData){
    
      this.addPositivity(formData.value.pos);
    }
     onEditSubmitGoal(formData,goals:string){
    
      this.editPositivity(goals,formData.value.pos);
    }
}