import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  // Obtener listado de libros

  getBooks() {
    return this.http.get<Book>(environment.api + 'books');
  }

  // Crear nuevo libro

  createNewBook(book: Book) {
    return this.http.post(environment.api + 'new', book);
  }

  // Actualizar libro

  updateBook(book: Book) {
    return this.http.post(environment.api + 'update', book);
  }

  // Borrar libro con el id

  deleteBook(id: number) {
    return this.http.post(environment.api + 'delete', { ID: id });
  }

  // Enviar nuevo orden de los libros

  orderBooks(booksOrder: Array<number>) {
    return this.http.post(environment.api + 'sort', { Order: booksOrder });
  }
}
