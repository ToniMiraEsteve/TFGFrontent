import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { InfoComponent } from './info/info.component';
import { ToolbarComponent } from './general/toolbar/toolbar.component';
import { UserDialogComponent } from './general/dialogs/user-dialog/user-dialog.component';
import { NinyosComponent } from './ninyos/ninyos.component';
import { TabViewNinyoComponent } from './ninyos/tab-view-ninyo/tab-view-ninyo.component';
import { TabEditNinyoComponent } from './ninyos/tab-edit-ninyo/tab-edit-ninyo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorValDialogComponent } from './general/dialogs/error-val-dialog/error-val-dialog.component';
import { PdfsComponent } from './pdfs/pdfs.component';
import { SafeUrlPipe } from './general/pipe/safe-url.pipe';
import { CalendarioComponent } from './calendario/calendario.component';
import { EventDialogComponent } from './general/dialogs/event-dialog/event-dialog.component';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InfoComponent,
    ToolbarComponent,
    UserDialogComponent,
    NinyosComponent,
    TabViewNinyoComponent,
    TabEditNinyoComponent,
    ErrorValDialogComponent,
    PdfsComponent,
    SafeUrlPipe,
    CalendarioComponent,
    EventDialogComponent,
    PostsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
