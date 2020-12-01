import { CONSTANTS } from 'src/assets/constants';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  CONSTANTS = CONSTANTS;

  @Input() formGroup: FormGroup;
  @Output() finalFunction: EventEmitter<void> = new EventEmitter();

  @Input() showFieldError: Function;
  @Input() getFieldError: Function;

  showPassword = false;

  constructor() { }

  ngOnInit(): void {
  }

  tryShowFieldError(field: String) {
    return this.showFieldError(field);
  }

  tryGetFieldError(field: String) {
    return this.getFieldError(field);
  }

  tryFinalFunction() {
    this.finalFunction.emit();
  }

}
