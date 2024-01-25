import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { MessagesService } from 'src/app/services/dialog/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;
  error: boolean = false;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private MessagesService: MessagesService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.loadform();
  }

  loadform() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required],
    })
  }

  onSubmit(): void { 
    this.loading = true;
    this.authService.login(this.form.value).subscribe(
      (res: any) => {      
        this.loading = false;
        this.router.navigate(['/home']);
      },
      (err: any) => {
        this.loading = false;
        this.MessagesService.showFailedLogin();
        this.error = true;

      }
    );
  }

}
