import { TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
        FormComponent, // Componente standalone
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => 'exampleId' }), // Mock do ActivatedRoute
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FormComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
