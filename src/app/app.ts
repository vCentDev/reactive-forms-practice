import { Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { noSpacesValidator } from './utils/validators-functions';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Formularios Reactivos');
  private readonly fb = inject(FormBuilder);

  protected readonly userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
    }),
    phones: this.fb.array([this.createPhoneGroup()]),
    username: ['', [Validators.required, noSpacesValidator]],
  });

  constructor() {
    this.userForm.controls.email.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((value) => {
        console.log(value);
      });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    console.log(this.userForm.value);
    this.userForm.reset();
  }

  protected isInvalid(control: AbstractControl): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  loadUser(): void {
    this.userForm.setValue({
      name: 'Vicente',
      email: 'vicente@example.com',
      address: {
        street: 'Vicente Baldoví',
        city: 'Valencia',
        zipCode: '46012',
      },
      phones: [
        {
          type: 'home',
          number: '653968141',
        },
      ],
      username: 'vCentDev',
    });
  }

  changeEmail(): void {
    this.userForm.patchValue({
      email: 'nuevo@example.com',
    });
  }

  get address() {
    return this.userForm.controls.address;
  }

  get phones() {
    return this.userForm.controls.phones;
  }

  createPhoneGroup() {
    return this.fb.group({
      type: ['mobile'],
      number: ['', Validators.required],
    });
  }

  addPhone(): void {
    this.userForm.controls.phones.push(this.createPhoneGroup());
  }

  removePhone(index: number): void {
    this.userForm.controls.phones.removeAt(index);
  }
}
