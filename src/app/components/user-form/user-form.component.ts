import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  usuarioForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagen: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.usuarioForm.valid) {
      console.log('Formulario enviado:', this.usuarioForm.value);
      alert('Usuario registrado con éxito');
      this.usuarioForm.reset();
      this.submitted = false;
    }
  }
}
