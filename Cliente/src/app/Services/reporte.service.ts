import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private apiUrl = 'http://localhost:3000/tables/Prestamo';

  constructor(private http: HttpClient) {}

  // Método para obtener los préstamos con manejo de errores
  getPrestamos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
      (
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Ocurrió un error:', error.error.message);
    } else {
      // Error del lado del servidor
      console.error(
        `Código del error: ${error.status}, ` +
        `Mensaje: ${error.message}`);
    }
    // Retornar un observable con un mensaje de error para el usuario
    return throwError(
      'Algo salió mal; por favor, intenta de nuevo más tarde.');
  }
}
