import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from './../services/userservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css'],
})
export class UserformComponent implements OnInit {
  userData: any;
  createForm!: FormGroup;
  editForm!: FormGroup;
  client_id: any;
  delete_client_data: any;
  clientName: any;

  flag: any = 1;
  imageUrl: any='no';

  constructor(
    private UserserviceService: UserserviceService,
    
  ) {}

  ngOnInit(): void {
    this.showUserData();
    this.formData();
  }
  showUserData() {
    this.UserserviceService.displayUserData().subscribe((res) => {
      this.userData = res;

       console.log(this.userData);
    });
  }

  formData() {
    this.createForm = new FormGroup({
      create_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.required,
        Validators.maxLength(15),
        // Validators.pattern(this.name_regex),
      ]),
      create_company: new FormControl(),
      create_email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      create_number: new FormControl(),
      create_date: new FormControl(),
      create_gender: new FormControl(),
      create_address: new FormControl(),
      profile: new FormControl(),
    });

    this.editForm = new FormGroup({
      edit_name: new FormControl(),
      edit_email: new FormControl(),
      edit_company: new FormControl(),
      edit_gender: new FormControl(),
      edit_address: new FormControl(),
      edit_date: new FormControl(),
      edit_number: new FormControl(),
      profile: new FormControl(),
    });
  }

  patchUserData(data: any) {
    // console.log(data);
    this.editForm.reset();
    this.client_id = data.id;
    this.editForm.patchValue({
      edit_name: data.name,
      edit_email: data.email,
      edit_company: data.company.name,
      edit_gender: data.gender,
      edit_date: data.date,
      edit_number: data.number,
      edit_address: data.address,
    });
  }

  updateUser() {
    let clientInfo = {
      id: this.client_id,
      name: this.editForm.value.edit_name,
      email: this.editForm.value.edit_email,
      company: { name: this.editForm.value.edit_company },
      gender: this.editForm.value.edit_gender,
      address: this.editForm.value.edit_address,
      date: this.editForm.value.edit_date,
      number: this.editForm.value.edit_number,
      profile: this.imageUrl,
    };
    // console.log(clientInfo);

    this.UserserviceService.updatUserData(clientInfo).subscribe({
      next: (res: any) => {
        // console.log(res);
        let ref = document.getElementById('exampleModal');
        ref?.click();
        this.showUserData();
      },
      error(err: any) {
        console.log(err);
      },
    });
  }

  openDeleteModel(data: any) {
    this.delete_client_data = data;
    this.clientName = this.delete_client_data.name;
  }

  deleteClient() {
    this.UserserviceService.deleteClient(this.delete_client_data).subscribe();
    let ref = document.getElementById('deleteModal');
    ref?.click();
    this.showUserData();
    // console.log(this.clientName);
  }

  createUser() {
    // const formData = new FormData;
    // let company:any = {name: this.createForm.value.create_company}
    // formData.append('name',this.createForm.value.create_name)
    // formData.append('email',this.createForm.value.create_email)
    // formData.append('company',company)
    // formData.append('number',this.createForm.value.create_number)
    // formData.append('date',this.createForm.value.create_date)
    // formData.append('address',this.createForm.value.create_address)
    // formData.append('gender',this.createForm.value.create_gender)
    // formData.append('profile',this.imageUrl)
    // console.log(formData);

    let clientData = {
      name: this.createForm.value.create_name,
      email: this.createForm.value.create_email,
      company: { name: this.createForm.value.create_company },
      number: this.createForm.value.create_number,
      date: this.createForm.value.create_date,
      address: this.createForm.value.create_address,
      gender: this.createForm.value.create_gender,
      profile: this.imageUrl,
    };
    console.log(clientData);
    
    this.UserserviceService.createUserData(clientData).subscribe(
      (res: any) => {
        console.log(res);

        let ref = document.getElementById('createUserModel');
        ref?.click();
      },
      (error) => {
        // console.log(error);
      }
    );

    this.showUserData();
  }
  resetForm() {
    this.createForm.reset();
  }

  processFile(event: any) {
    // console.log(event.target.files[0].name);
    // base 64
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];

      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event: any) => {
        this.imageUrl = reader.result as string;
        console.log(this.imageUrl);
      };
    }
    console.error('not Found');

    // FormData

    const formData = new FormData();

    // console.log(event.target.files[0]);

    // formData.append('File',event.target.files[0]);
    // formData.append('name',thusoprij likjg1);
    // const body = {content: formData};
  }
}
