import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss'],
})
export class DeleteBookComponent implements OnInit {
  constructor(private booksService: BooksService) {}

  ngOnInit(): void {}
}
