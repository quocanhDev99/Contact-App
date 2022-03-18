import { Component, OnInit } from '@angular/core';
import { MyContact } from 'src/app/models/myContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {
  public loading: boolean = false;
  public contacts: MyContact[] = [];
  public errMess: string | null = null;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.loading = true;
    this.contactService.getAllContacts().subscribe((data: MyContact[]) => {
      this.contacts = data;
      this.loading = false;
    }, error => {
      this.errMess = error;
      this.loading = false;
    })
  }

}
