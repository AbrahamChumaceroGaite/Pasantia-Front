import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

export function buildFormEnterprise(fb: FormBuilder): FormGroup {
  return fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúñÁÉÍÓÚ0-9\s]*$/)]],
    numero: ['', Validators.required],
    nit: ['', [Validators.required, Validators.pattern(/^[0-9a-zA-Z\-]+$/)]],
    correo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    id_tipo: ['', Validators.required],
    razon: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúñÁÉÍÓÚ0-9\s]*$/)]],
    id_rubro: ['', Validators.required],
    legal: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúñÁÉÍÓÚ0-9\s]*$/)]],
    legal_ci: ['', [Validators.required, Validators.pattern(/^[0-9a-zA-Z\-]+$/)]],
    matricula: ['', [Validators.required, Validators.pattern(/^[0-9a-zA-Z\-]+$/)]],
    id_dep: ['', Validators.required],
    desc: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^[a-zA-ZáéíóúñÁÉÍÓÚ0-9\s]*$/)]],
    direccion: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúñÁÉÍÓÚ0-9\s./,°-]*$/)]],
    links: fb.array([]),
    logo64: [''],
  });
}

export function populateFormValues(form: FormGroup, data: any, dept: any, rubr: any, type: any, fb: FormBuilder): void {
  for (let i of data) {
    form.patchValue({
      nombre: i.nombre,
      numero: i.numero,
      nit: i.nit,
      correo: i.correo,
      desc: i.descr,
      razon: i.razon,
      legal: i.legal,
      legal_ci: i.legal_ci,
      matricula: i.matricula,
      direccion: i.direccion
    });

    const dep = dept.find((x: any) => x.id === i.id_dep);
    if (dep) {
      form.controls['id_dep'].setValue(dep);
    }
  
    const rub = rubr.find((x: any) => x.id === i.id_rubro);
    if (rub) {
      form.controls['id_rubro'].setValue(rub);
    }
  
    const typ = type.find((x: any) => x.id === i.id_tipo);
    if (typ) {
      form.controls['id_tipo'].setValue(typ);
    }

    const enlacesArray = JSON.parse(i.enlaces);
    if (enlacesArray && Array.isArray(enlacesArray)) {
      const linksFormArray = form.get('links') as FormArray;
      linksFormArray.clear();

      enlacesArray.forEach((link: any) => {
        linksFormArray.push(fb.group({
          url: [link.url, Validators.required],
        }));
      });
    }
  }


}



