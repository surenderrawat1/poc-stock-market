import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { App } from './app';

describe('App', () => {
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('renders a scaffold without financial data and checks API health', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No market data is connected');
    expect(fixture.nativeElement.textContent).not.toContain('₹');

    httpTesting.expectOne('/api/v1/health').flush({ status: 'ok' });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Local API connected');
  });
});
