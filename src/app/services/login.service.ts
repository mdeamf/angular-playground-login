import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  /** Efetuar o login de forma mockada, criando um delay de 2 segundos. */
  login(username: String, password: String): Observable<Number> {
    return new Observable(observer => {
      setTimeout(() => {
        if (username === 'teste' && password === "teste123") {
          observer.next(200);
        } else {
          observer.next(401);
        }
      }, 2000)
    })
  }

  /** Efetuar a criação de conta de forma mockada, criando um delay de 2 segundos. */
  signUp(): Observable<Boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(true);
      }, 2000)
    })
  }

  /** Obter o objeto de controle de formulário conforme o nome do campo. */
  getControl(formGroup: FormGroup, field: String): AbstractControl {
    return formGroup.controls[`${field}`];
  }
}
