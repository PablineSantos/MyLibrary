import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {form} from '@angular/forms/signals';
import {CategoriaService} from '../../../core/services/categoria.service';

@Component({
  selector: 'app-form-categoria',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './form-categoria.component.html'
})
export class FormCategoriaComponent {
  @Output() salvo = new EventEmitter<void>();
  form: FormGroup;

  constructor(private fb: FormBuilder, private service: CategoriaService) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['']
    });
  }

  salvar() {
    if (this.form.valid) {
      this.service.criar(this.form.value).subscribe({
        next: () => this.salvo.emit(),
        error: (err) => console.error("Erro ao salvar categoria", err)
      });
    }
  }
}
