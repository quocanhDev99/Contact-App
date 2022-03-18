import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ContactManagerComponent } from './components/contact-manager/contact-manager.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ViewContactComponent } from './view-contact/view-contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/contacts/admin', pathMatch: 'full' },
  { path: 'contacts/admin', component: ContactManagerComponent },
  { path: 'contacts/add', component: AddContactComponent },
  { path: 'contacts/edit/:contactId', component: EditContactComponent },
  { path: 'contacts/view/:contactId', component: ViewContactComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
