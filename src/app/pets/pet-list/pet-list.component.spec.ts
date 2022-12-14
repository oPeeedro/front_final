import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PetListComponent } from './pet-list.component';
import { FormsModule } from '@angular/forms';
import { PetService } from '../pet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub, RouterStub } from '../../testing/router-stubs';
import { Pet } from '../pet';
import { Observable, of } from 'rxjs';
import Spy = jasmine.Spy;

class PetServiceStub {
  deletePet(petId: string): Observable<number> {
    return of();
  }
}

describe('PetListComponent', () => {
  let component: PetListComponent;
  let fixture: ComponentFixture<PetListComponent>;
  let inputPet: Pet;
  let petService: PetService;
  let spy: Spy;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PetListComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [FormsModule],
        providers: [
          { provide: PetService, useClass: PetServiceStub },
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PetListComponent);
    component = fixture.componentInstance;

    component.pet = inputPet;
    petService = fixture.debugElement.injector.get(PetService);
    spy = spyOn(petService, 'deletePet').and.returnValue(of(1));

    fixture.detectChanges();
  });

  it('should create PetListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call deletePet() method', () => {
    fixture.detectChanges();
    component.deletePet(component.pet);
    expect(spy.calls.any()).toBe(true, 'deletePet called');
  });
});
