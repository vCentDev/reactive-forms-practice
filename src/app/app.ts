import { Component, inject, signal } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, NgStyle],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Formularios Reactivos');
  private readonly fb = inject(FormBuilder);

  protected readonly userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor() {
    this.userForm.controls.email.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((value) => {
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
