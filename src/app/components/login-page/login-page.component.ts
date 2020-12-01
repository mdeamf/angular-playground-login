import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { fadeInAnimation } from '../../../assets/animations';
import { CONSTANTS } from '../../../assets/constants';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  animations: [
    fadeInAnimation
  ]
})
export class LoginPageComponent implements OnInit {
  CONSTANTS = CONSTANTS;

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  showButtons = true;
  showLoading = false;
  isDoingLogin = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /** Realiza o login, utilizando a rotina do service. */
  doLogin(): void {
    this.showButtons = false;
    this.isDoingLogin = true;

    this.loginService.login(
      this.loginService.getControl(this.loginForm, 'username').value,
      this.loginService.getControl(this.loginForm, 'password').value
    )
      .subscribe((statusCode) => {
        this.isDoingLogin = false;
        this.showLoading = false;
        this.showButtons = true;

        if (statusCode === 200) {
          this.snackBar.open(CONSTANTS.LOGIN_SUCCESS, CONSTANTS.SNACK_BAR_CLOSE, { duration: 3000 });
        } else {
          this.snackBar.open(CONSTANTS.LOGIN_FAILURE, CONSTANTS.SNACK_BAR_CLOSE, { duration: 3000 });
        }
      })
  }

  /** Direciona o usuário para a rota de criação de conta. */
  goToSignUp(): void {
    this.router.navigate(['/signup']);
  }

  /**
   * Obter o erro de validação do formulário conforme o campo.
   * Declarado de forma pública para funcionar como Input no FormComponent.
   */
  public getFieldError = (field: String): String => {
    let control = this.loginService.getControl(this.loginForm, field);
    if (!control.errors) {
      return '';
    }

    if (control.errors.required) {
      return CONSTANTS.FORM_VALID_MANDATORY;
    }

    return '';
  }

  /**
   * Exibir o erro de validação do formulário conforme o campo.
   * Declarado de forma pública para funcionar como Input no FormComponent.
   */
  public showFieldError = (field: String): Boolean => {
    let control = this.loginService.getControl(this.loginForm, field);
    return !control.valid && control.touched;
  }

}
