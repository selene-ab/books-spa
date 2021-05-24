import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/interfaces/book';
import { BooksService } from 'src/app/services/books.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss'],
})
export class CreateBookComponent implements OnInit {
  public createBookForm: FormGroup;
  constructor(
    private booksService: BooksService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.createBookForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      author: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      year: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.maxLength(255)]),
      sinopsis: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
      ]),
    });
  }

  createBook() {
    let time = moment(this.createBookForm.get('year').value).format(
      'DD/MM/YYYY'
    );
    const json: Book = {
      Title: this.createBookForm.get('title').value,
      Author: this.createBookForm.get('author').value,
      Year: time.toString(),
      Image: this.createBookForm.get('image').value,
      Sinopsis: this.createBookForm.get('sinopsis').value,
    };

    this.booksService.createNewBook(json).subscribe((result: any) => {
      console.log(result);
      if (result.ok) {
        this.showSuccess();
      }
    });
  }

  showSuccess() {
    this.toastr.success('Libro creado correctamente', '¡Exito!', {
      timeOut: 4000,
      closeButton: true,
    });
  }
}
