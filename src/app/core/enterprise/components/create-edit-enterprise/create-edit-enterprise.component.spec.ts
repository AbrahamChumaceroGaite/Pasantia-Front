import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditEnterpriseComponent } from './create-edit-enterprise.component';

describe('CreateEditEnterpriseComponent', () => {
  let component: CreateEditEnterpriseComponent;
  let fixture: ComponentFixture<CreateEditEnterpriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditEnterpriseComponent]
    });
    fixture = TestBed.createComponent(CreateEditEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
