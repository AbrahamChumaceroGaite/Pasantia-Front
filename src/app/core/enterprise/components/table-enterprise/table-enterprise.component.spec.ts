import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEnterpriseComponent } from './table-enterprise.component';

describe('TableEnterpriseComponent', () => {
  let component: TableEnterpriseComponent;
  let fixture: ComponentFixture<TableEnterpriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableEnterpriseComponent]
    });
    fixture = TestBed.createComponent(TableEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
