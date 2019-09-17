import {Component, OnInit} from '@angular/core';
import {Http}    from '@angular/http';
import {FeedbackService}    from './feedback.service';
import {Email}             from './Email';


@Component({
 
  
  selector: 'my-feedback',
  templateUrl: './feedback.component.html',
  styleUrls:['./feedback.component.css'],
  providers: [FeedbackComponent]
  
  
})

export class FeedbackComponent{

    
    public send = false;
    public m: string;
    public r: string = 'dericpooran@gmail.com';
    public s: string = 'Night45 Feedback';
    
    

    onSubmit(formData){
        this.m = "1) Would you use Night45 on a regular basis? and why?: "+ formData.value.regular
         + " 2) What features would make Night45 better?: " + formData.value.feature
        + " 3) Does Night45 help you keep track and complete your goals?: "+ formData.value.track+' 4) Suggestions or Comments?: '+ formData.value.suggestion;
        
        this.message= {name: 'Deric', email: this.r, message: this.m};
        this._contactService.postEmail(this.message).subscribe(
        response => this.handleResponse(response),
        error => this.handleResponse(error)
      );
      this.send = true;
    }
   constructor(private _contactService : FeedbackService) { }
    ngOnInit() { }
 
    public message: Email = {name: '', email: '', message: ''};
 
    
 
    handleResponse(response){
      // console.log(`msg is: {response.status}`);
 
      if(response.status =='success'){
        this.message = {name: '', email: '', message: ''};
        console.log(response.status);
      }
 
      if(response.status =='error'){
        console.log(response.status);
      }
    }

 




    
}