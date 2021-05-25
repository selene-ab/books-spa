import { Component, OnInit } from '@angular/core';
import { BooksService } from './services/books.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteBookComponent } from './dialogs/delete-book/delete-book.component';
import { CreateBookComponent } from './dialogs/create-book/create-book.component';
import { UpdateBookComponent } from './dialogs/update-book/update-book.component';
import { Book } from './interfaces/book';
import { ToastrService } from 'ngx-toastr';
import { SortableOptions } from 'sortablejs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'books-spa';
  public booksList = [];
  public options: SortableOptions;

  constructor(
    private booksService: BooksService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getBooks();
    this.options = {
      onUpdate: (event: any) => {
        console.log(event);
      },
    };
  }

  getBooks() {
    this.booksService.getBooks().subscribe((data: any) => {
      this.booksList = data;
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateBookComponent);
    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => {
        this.getBooks();
      }, 2000);
    });
  }

  openUpdateDialog(book: Book) {
    const dialogRef = this.dialog.open(UpdateBookComponent, {
      data: book,
    });
    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => {
        this.getBooks();
      }, 1000);
    });
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteBookComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.booksService.deleteBook(id).subscribe((result: any) => {
          this.getBooks();
          if (result.ok) {
            this.showSuccess();
          }
        });
      }
    });
  }

  showSuccess() {
    this.toastr.success('Libro borrado correctamente', '¡Exito!', {
      timeOut: 4000,
      closeButton: true,
    });
  }
}
