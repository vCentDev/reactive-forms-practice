import { Component, signal } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, NgStyle],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Formularios Reactivos');
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor() {
    this.userForm.controls.email.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      console.log(value);
    });
  }

  onSubmit(): void {
    console.log(this.userForm.value);
    this.userForm.reset();
  }

  loadUser(): void {
    this.userForm.setValue({
      name: 'Vicente',
      email: 'vicente@example.com',
    });
  }

  changeEmail(): void {
    this.userForm.patchValue({
      email: 'nuevo@example.com',
    });
  }
}
