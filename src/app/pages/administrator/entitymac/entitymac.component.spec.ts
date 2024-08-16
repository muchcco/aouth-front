import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitymacComponent } from './entitymac.component';

describe('EntitymacComponent', () => {
  let component: EntitymacComponent;
  let fixture: ComponentFixture<EntitymacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntitymacComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntitymacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
