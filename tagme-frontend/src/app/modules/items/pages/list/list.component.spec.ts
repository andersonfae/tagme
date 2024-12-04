import { TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatTableModule,
        MatButtonModule,
        NoopAnimationsModule,
        ListComponent, // Componente standalone
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
    const fixture = TestBed.createComponent(ListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
