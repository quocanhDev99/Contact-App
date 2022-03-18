import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  public contactId: string | null = null;
  public loading: boolean = false;
  public contact: MyContact = {} as MyContact;
  public errMess: string | null = null;
  public group: MyGroup = {} as MyGroup;

  constructor(private activedRoute: ActivatedRoute, private contactService: ContactService) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    });
    if (this.contactId) {
      this.loading = true;
      this.contactService.getContact(this.contactId).subscribe((data: MyContact) => {
        this.contact = data;
        this.loading = false;

        // Get data of group
        this.contactService.getGroup(data).subscribe((data: MyGroup) => {
          this.group = data;
        });
      }, error => {
        this.errMess = error;
        this.loading = false
      });
    }
  }

  public isNotEmpty() {
    return Object.keys(this.contact).length > 0;
  }

}
