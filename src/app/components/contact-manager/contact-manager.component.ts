import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyContact } from 'src/app/models/myContact';
import { ContactService } from 'src/app/services/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {
  public loading: boolean = false;
  public contacts: MyContact[] = [];
  public errMess: string | null = null;
  public contactId: string | null = null;
  public searchForm!: FormGroup;
  public key!: string;

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getForm();
    this.getContacts();
  }

  // Form Value
  get f() { return this.searchForm.controls; }

  private getForm() {
    this.searchForm = this.formBuilder.group({ search: [''] })
  }

  // API
  getContacts() {
    this.contactService.getAllContacts().subscribe((data: MyContact[]) => {
      this.contacts = data;
      this.loading = false;
    }, error => {
      this.errMess = error;
      this.loading = false;
    })
  }

  onDelete(contact: any) {
    this.contactService.deleteContact(contact.id)
      .subscribe(res => {
        this.toastr.success('Xóa thành công', 'Thông báo');
        this.getContacts();
      })
  }

  onSearch() {
    this.loading = true;
    this.getContacts();
  }
}
