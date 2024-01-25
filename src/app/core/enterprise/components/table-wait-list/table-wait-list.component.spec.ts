import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWaitListComponent } from './table-wait-list.component';

describe('TableWaitListComponent', () => {
  let component: TableWaitListComponent;
  let fixture: ComponentFixture<TableWaitListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableWaitListComponent]
    });
    fixture = TestBed.createComponent(TableWaitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
