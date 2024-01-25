import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(
    private MessagesService: MessageService
  ) { }

  showConfirmPost(): void {
    this.MessagesService.add({ severity: 'success', summary: 'Revise la tabla', detail: 'Registro Exitoso :)' });
  }

  showConfirmEdit(): void {
    this.MessagesService.add({ severity: 'info', summary: 'Revise los cambios', detail: 'Edicion Exitosa :)' });
  };

  showConfirmDelete(): void {
    this.MessagesService.add({ severity: 'danger', summary: 'Revise los cambios', detail: 'Eliminación Exitosa :)' });
  };

  showConfirmAprobe(): void {
    this.MessagesService.add({ severity: 'info', summary: 'Lista Enviada', detail: 'Revise en la tabla :)' });
  }

  showError(): void {
    this.MessagesService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema :(' });
  }

  showSuccessLogin(): void {
    this.MessagesService.add({ severity: 'success', summary: 'Bienvenido', detail: '' });
  }

  showFailedLogin(): void {
    this.MessagesService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo iniciar su sesión' });
  }

  showFailedAccess(): void {
    this.MessagesService.add({ severity: 'error', summary: 'Error', detail: 'No dispone de permisos' });
  }

  showMsjError(msj: string): void {
    this.MessagesService.add({ severity: 'error', summary: 'Error', detail: msj });
  }
}
