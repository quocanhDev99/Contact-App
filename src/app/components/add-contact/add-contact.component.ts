import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyContact } from 'src/app/models/myContact';
import { MyGroup } from 'src/app/models/myGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  public loading: boolean = false;
  public contact: MyContact = {} as MyContact;
  public errMess: string | null = null;
  public groups: MyGroup[] = [] as MyGroup[];

  constructor(
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getGroups();
  }

  // Get API
  private async getGroups() {
    this.contactService.getAllGroups()
      .subscribe((data: MyGroup[]) => {
        this.groups = data;
      }, error => {
        this.errMess = error;
      })
  }

  // Execute
  public onCreate() {
    this.contactService.createContact(this.contact)
      .subscribe((data: MyContact) => {
        this.router.navigate(['/']).then();
      }, error => {
        this.errMess = error;
        this.router.navigate(['/contacts/add']).then();
      });
  }

}
