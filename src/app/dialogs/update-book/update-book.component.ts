import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/interfaces/book';
import { BooksService } from 'src/app/services/books.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss'],
})
export class UpdateBookComponent implements OnInit {
  public updateBookForm: FormGroup;

  constructor(
    private booksService: BooksService,
    @Inject(MAT_DIALOG_DATA) public data: Book
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  formatStringToDate(text) {
    let myDate = text.split('/');
    return new Date(myDate[2], myDate[1] - 1, myDate[0]);
  }

  initForm() {
    this.updateBookForm = new FormGroup({
      title: new FormControl(this.data.Title, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      author: new FormControl(this.data.Author, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      year: new FormControl(this.formatStringToDate(this.data.Year), [
        Validators.required,
      ]),
      image: new FormControl(this.data.Image, [Validators.maxLength(255)]),
      sinopsis: new FormControl(this.data.Sinopsis, [
        Validators.required,
        Validators.maxLength(500),
      ]),
    });
  }

  updateBook() {
    let time = moment(this.updateBookForm.get('year').value).format(
      'DD/MM/YYYY'
    );
    const json: Book = {
      ID: this.data.ID,
      Title: this.updateBookForm.get('title').value,
      Author: this.updateBookForm.get('author').value,
      Year: time.toString(),
      Image: this.updateBookForm.get('image').value,
      Sinopsis: this.updateBookForm.get('sinopsis').value,
    };
    this.booksService.updateBook(json).subscribe((result) => {
      console.log(result);
    });
  }
}
