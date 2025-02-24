import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

 formLogin : FormGroup;

  // username: string;
  // password: string;

  constructor(
    private authService: AuthService,
    private formBuilder : FormBuilder,
    private route : Router ) { }

  ngOnInit(){
    this.initForm();
  }

  onSubmit() {
    console.log('>>>>>>>>',this.formLogin.get('usernameId')?.value);
    this.authService.login(this.formLogin.get('usernameId')?.value, this.formLogin.get('passwordId')?.value)
      .subscribe(
        () => {
          console.log('Login successful');
          this.route.navigate(['dashboard']);
      } ,
        error => console.error('Login failed', error)
      );
  }

  initForm(){
    this.formLogin = this.formBuilder.group({
      usernameId:['',Validators.required],
      passwordId:['',Validators.required],
    });
  }

// constructor(private userservice:UserService, private route: Router,private _snackBar: MatSnackBar) { }


//   reactiveForm = new FormGroup({
//     username : new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(4)]),
//     password : new FormControl('', [Validators.required, Validators.minLength(8)])
//   });
//   ngOnInit(): void {
//     localStorage.clear();
//   }
//   resdata:any;
//   proceedLogin(data:any){
//     console.log(data.valid);
//     if(data.value){
//      this.userservice.authenticate(data.value).subscribe(item =>{
//         this.resdata =item;
//         if(this.resdata != null){
//           console.log(this.resdata);
//           this.openSnackBar("you are successfully authenticated.","Okay !!");
//             localStorage.setItem('token', this.resdata.access_token);
//             localStorage.setItem('mnemonic', this.resdata.mnemonic);
//             this.route.navigate(['add']);
//         }else{
//          // this.openSnackBar("An error has occurred. Try it again!","Okay!!");
//           console.log("login failure")
//         }
//       });

//     }else{
//         console.log("gshdf");
//     }


//   }
  // openSnackBar(message: string, action: string) {
  //   this._snackBar.open(message, action,{
  //     duration: 3000,
  //   });
  // }
  // redirectRegister(){
  //   this.route.navigate(['register']);
  // }
  // forgetPassword(){

  // }

}
