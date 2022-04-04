import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl: string = 'http://localhost:3000';
  // public contactId = '';

  constructor(private http: HttpClient) { }

  // get all contacts
  public getAllContacts(): Observable<MyContact[]> {
    const dataUrl: string = `${this.baseUrl}/contacts`;
    return this.http.get<MyContact[]>(dataUrl).pipe(catchError(this.handleError));
  }

  // get single contact
  public getContact(contactId: string | null = null): Observable<MyContact> {
    const dataUrl: string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.get<MyContact>(dataUrl).pipe(catchError(this.handleError));
  }

  // create contact
  public createContact(contact: MyContact): Observable<MyContact> {
    const dataUrl: string = `${this.baseUrl}/contacts`;
    return this.http.post<MyContact>(dataUrl, contact).pipe(catchError(this.handleError));
  }

  // update contact
  public updateContact(contact: MyContact, contactId: string | null = null): Observable<MyContact> {
    const dataUrl: string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.put<MyContact>(dataUrl, contact).pipe(catchError(this.handleError));
  }

  // delete contact
  public deleteContact(contactId: string): Observable<MyContact> {
    const dataUrl: string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.delete<MyContact>(dataUrl).pipe(catchError(this.handleError));
  }

  // get all groups
  public getAllGroups(): Observable<MyGroup[]> {
    const dataUrl: string = `${this.baseUrl}/groups`;
    return this.http.get<MyGroup[]>(dataUrl).pipe(catchError(this.handleError));
  }

  // get single group
  public getGroup(contact: MyContact): Observable<MyGroup> {
    const dataUrl: string = `${this.baseUrl}/groups/${contact.groupId}`;
    return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError));
  }

  //Error Service
  public handleError(error: HttpErrorResponse) {
    let errMess: string = '';
    if (error.error instanceof ErrorEvent) {
      // client Error
      errMess = `Error: ${error.error.message}`
    } else {
      // sever side error
      errMess = `Status: ${error.status} \ n Message: ${error.message}`;
    }
    return throwError(errMess);
  }
}



