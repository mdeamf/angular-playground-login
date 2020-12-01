import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { fadeInAnimation } from '../../../assets/animations';
import { CONSTANTS } from '../../../assets/constants';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
  animations: [
    fadeInAnimation
  ]
})
export class SignUpPageComponent implements OnInit {
  CONSTANTS = CONSTANTS;
  signUpForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  showButtons = true;
  showLoading = false;
  isDoingSignUp = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /** Cria a conta, utilizando a rotina do service. */
  doSignUp(): void {
    this.showButtons = false;
    this.isDoingSignUp = true;

    this.loginService.signUp()
      .subscribe(() => {
        this.isDoingSignUp = false;
        this.showLoading = false;
        this.showButtons = true;
        this.snackBar.open(CONSTANTS.SIGN_UP_SUCCESS, CONSTANTS.SNACK_BAR_CLOSE, { duration: 3000 });
        this.goToLogin();
      })
  }

  /** Direciona o usuário para a rota de login. */
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Obter o erro de validação do formulário conforme o campo.
   * Declarado de forma pública para funcionar como Input no FormComponent.
   */
  public getFieldError = (field: String): String => {
    let control = this.loginService.getControl(this.signUpForm, field);
    if (!control.errors) {
      return '';
    }

    if (control.errors.required) {
      return CONSTANTS.FORM_VALID_MANDATORY;
    }

    if (control.errors.minlength && control.touched) {
      return CONSTANTS.FORM_VALID_SIZE(control.errors.minlength.requiredLength);
    }

    return '';
  }

  /**
   * Exibir o erro de validação do formulário conforme o campo.
   * Declarado de forma pública para funcionar como Input no FormComponent.
   */
  public showFieldError = (field: String): Boolean => {
    let control = this.loginService.getControl(this.signUpForm, field);
    return !control.valid && control.touched;
  }

}
