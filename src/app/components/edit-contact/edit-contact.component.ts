import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyContact } from 'src/app/models/myContact';
import { MyGroup } from 'src/app/models/myGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  // Initial State
  public contactId: string | null = null;
  public loading: boolean = false;
  public contact: MyContact = {} as MyContact;
  public group: MyGroup = {} as MyGroup;
  public errMess: string | null = null;
  public form!: FormGroup;
  public groups: MyGroup[] = [] as MyGroup[];

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    });
    if (this.contactId) {
      this.contactService.getContact(this.contactId)
        .subscribe((data: MyContact) => {
          this.contact = data;

          // Get data of group
          this.contactService.getGroup(data).subscribe((data: MyGroup) => {
            this.group = data;
          });

          this.f["name"].setValue(this.contact.name);
          this.f["photo"].setValue(this.contact.photo);
          this.f["email"].setValue(this.contact.email);
          this.f["mobile"].setValue(this.contact.mobile);
          this.f["company"].setValue(this.contact.company);
          this.f["title"].setValue(this.contact.title);
          this.f["groupId"].setValue(this.contact.groupId);
        });
    }
    this.getGroups();
    this.form = this.formBuilder.group({
      name: [{ value: this.contact.name, disabled: false }],
      photo: [{ value: this.contact.photo, disabled: false }],
      email: [{ value: this.contact.email, disabled: false }],
      mobile: [{ value: this.contact.mobile, disabled: false }],
      company: [{ value: this.contact.company, disabled: false }],
      title: [{ value: this.contact.title, disabled: false }],
      groupId: [{ value: this.contact.groupId, disabled: false }],
    });
  }

  get f() { return this.form.controls; }

  // API
  private async getGroups() {
    await this.contactService.getAllGroups()
      .subscribe((data: MyGroup[]) => {
        this.groups = data;
      }, error => {
        this.errMess = error;
      })
  }

  // Execute
  public onUpdate() {
    this.contactService.updateContact(this.form.value, this.contactId)
      .subscribe(res => {
        this.router.navigate(['/']).then();
        console.log('ok');
      }, error => {
        this.errMess = error;
        this.router.navigate(['/contacts/edit']).then();
      });
  }
}
