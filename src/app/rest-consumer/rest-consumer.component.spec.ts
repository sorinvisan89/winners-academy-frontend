import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestConsumerComponent } from './rest-consumer.component';

describe('RestConsumerComponent', () => {
  let component: RestConsumerComponent;
  let fixture: ComponentFixture<RestConsumerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestConsumerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestConsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
