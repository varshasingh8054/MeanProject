
import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
//import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
   private authService: AuthService,
   private router: Router,
    //private flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)) {
      //this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      alert("Please fill in all fields");
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
   // this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
   alert("Please use a valid email");
   return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        
        //this.flashMessage.show('You are now registered and can now login', {cssClass: 'alert-success', timeout: 3000});
        alert("You are now registered and can now login");
        this.router.navigate(['/login']);
       
      } else {
        console.log("cry");
        //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        alert("Something went wrong");
        this.router.navigate(['/register']);
     
      }
    });
    }
  }