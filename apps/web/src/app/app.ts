import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';

type ApiState = 'checking' | 'available' | 'unavailable';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);
  readonly apiState = signal<ApiState>('checking');

  ngOnInit(): void {
    this.http.get<{ status: string }>('/api/v1/health').subscribe({
      next: (response) => this.apiState.set(response.status === 'ok' ? 'available' : 'unavailable'),
      error: () => this.apiState.set('unavailable'),
    });
  }
}
