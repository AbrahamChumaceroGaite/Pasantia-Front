import { EventsService } from 'src/app/services/shared/events.service';
import { EnterpriseService } from '../../services/enterprise.service';
import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { Departamentos } from 'src/app/templates/deparments';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { buildFormEnterprise, populateFormValues } from '../../utils/form.buider';

@Component({
  selector: 'app-create-edit-enterprise',
  templateUrl: './create-edit-enterprise.component.html',
  styleUrls: ['./create-edit-enterprise.component.scss']
})
export class CreateEditEnterpriseComponent {
  id: any;
  form!: FormGroup;
  loading = false;
  dept: any;
  rubr: any;
  type: any;
  selectedDept: any;
  selectedRubr: any;
  selectedType: any;
  buttonText: string = '';
  base64image: any;
  uploadedFiles: File[] = [];
  logoBase64: SafeUrl | undefined;

  constructor(
    private enterpriseService: EnterpriseService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private messageService: MessagesService,
    private eventsService: EventsService,
  ) {
    sharedService.selectedEnterprise$.subscribe((value) => {
      this.id = value;
      if (this.id !== null) {
        this.checkForm();
      } else {
        this.buttonText = 'Registrar';
        this.form.reset();
      }
    });
  }

  ngOnInit(): void {
    this.loadForm();
    this.loadMisc();
  }

  loadForm() {
    this.form = buildFormEnterprise(this.fb)
    this.addLink();
  }

  loadMisc(){
    this.enterpriseService.getMisc().subscribe((data: any) => {
      this.dept = data.dept;
      this.rubr = data.rubr;
      this.type = data.type;
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }

  newLink(): FormGroup {
    return this.fb.group({
      url: '',
    })
  }

  get links(): FormArray {
    return this.form.get('links') as FormArray;
  }

  addLink() {
    this.links.push(this.newLink());
  }

  removeLink(index: number) {
    this.links.removeAt(index);
  }

  checkForm() {
    this.form.reset();
    this.enterpriseService.getById(this.id).subscribe((data: any) => {
      this.buttonText = 'Actualizar';
      this.loading = false;    
      populateFormValues(this.form, data, this.dept, this.rubr, this.type, this.fb);
    }, (error) => {
      this.messageService.showError();
    });
  }
  
  submitForm() {
    if (this.form.valid) {
      this.loading = true
      const linksArray = this.form?.get('links')?.value;
      const linksJson = JSON.stringify(linksArray);
      const formData = { ...this.form.value, links: linksJson, logo64: this.base64image };
      this.saveForm(formData);
    } else {
      this.form.markAllAsTouched();
    }
  }

  saveForm(formValue: any) {
    if (this.id !== null) {
      this.enterpriseService.update(this.id, formValue).subscribe((data) => {
        this.emitAndUpdate()
        this.messageService.showConfirmEdit();
      }, (error) => {
        this.emitAndUpdate()
        this.messageService.showError();
      });
    } else {
      this.enterpriseService.save(formValue).subscribe((data) => {
        this.emitAndClean()
        this.messageService.showConfirmPost();
      }, (error) => {
        this.emitAndClean()
        this.messageService.showError();
      });
    }
  }

  emitAndClean() {
    this.loading = false;
    this.form.reset()
    this.eventsService.emitEnterpriseSubmitted();
  }

  emitAndUpdate() {
    this.loading = false;
    this.form.reset();
    this.eventsService.emitEnterpriseUpdated();
  }

  isInvalid(fieldName: string) {
    const control = this.form?.get(fieldName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];  
    if (file) {
      this.convertToBase64(file).then((base64String: string) => {        
        this.base64image = base64String;
        this.form.patchValue({
          logo64: this.base64image
        });
      });
    }
  }
  
  convertToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();  
      reader.onload = () => {
        const base64String = reader.result as string; 
        resolve(base64String);
      };  
      reader.readAsDataURL(file);
    });
  }

}
