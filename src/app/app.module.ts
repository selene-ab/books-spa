import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateBookComponent } from './dialogs/create-book/create-book.component';
import { DeleteBookComponent } from './dialogs/delete-book/delete-book.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateBookComponent } from './dialogs/update-book/update-book.component';
import { ToastrModule } from 'ngx-toastr';
import { SortablejsModule } from 'ngx-sortablejs';

@NgModule({
  declarations: [
    AppComponent,
    CreateBookComponent,
    DeleteBookComponent,
    UpdateBookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    SortablejsModule.forRoot({}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
