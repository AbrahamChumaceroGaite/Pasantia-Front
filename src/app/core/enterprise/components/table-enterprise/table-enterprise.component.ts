import { EnterpriseService } from './../../services/enterprise.service';
import { Component, ViewChild } from '@angular/core';
import { MessagesService } from 'src/app/services/dialog/message.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ConfirmService } from 'src/app/services/dialog/confirm.service';
import { EventsService } from 'src/app/services/shared/events.service';
import { Table } from 'primeng/table';
import { Enterprise } from 'src/app/models/enterprise';
import { LazyLoadEvent } from 'primeng/api';
import { tooltips } from '../../utils/tooltips';

@Component({
  selector: 'app-table-enterprise',
  templateUrl: './table-enterprise.component.html',
  styleUrls: ['./table-enterprise.component.scss']
})
export class TableEnterpriseComponent {
  @ViewChild('dt') dt!: Table;
  filas: Enterprise[] = [];
  selectedItems: any[] = [];
  totalFilas = 0;
  loading: boolean = true;
  display: any;
  filterValue: string = '';
  startDate!: Date;
  endDate!: Date;
  title: any;
  icon: any;
  help = tooltips;

  constructor(
    private enterpriseService: EnterpriseService,
    private messageService: MessagesService,
    private sharedService: SharedService,
    private confirmService: ConfirmService,
    private eventsService: EventsService,
  ) {
    eventsService.enterpriseSubmitted.subscribe(() => {
      this.display = false;
      this.refreshTable();
    });

    eventsService.enterpriseUpdated.subscribe(() => {
      this.display = false;
      this.refreshTable();
    });
  }

  getData(event: LazyLoadEvent): void {
    const startDateFormatted = this.startDate;
    const endDateFormatted = this.endDate;
    setTimeout(() => {
      this.enterpriseService.getEnterprises(event, startDateFormatted, endDateFormatted).subscribe((data) => {
        this.filas = data.filas;
        this.totalFilas = data.totalFilas;
        this.loading = false;
      }, (error) => {
        this.loading = false;
        this.messageService.showMsjError(error.error.message)
      });
    }, 1000);
  }

  onFilterInputChange(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterByName();
  }

  filterByName() {
    this.loading = true;
    if (this.filterValue) {
      this.dt.filterGlobal(this.filterValue, 'contains');
    } else {
      this.dt.filterGlobal(null, 'contains');
    }
  }

  dialog(id?: any) {
    this.display = true;
    if (id) {
      const name = this.filas.find(x => x.id === id)?.nombre;
      this.title = 'Editar Empresa: ' + name;
      this.icon = 'pi pi-pencil';
      this.sharedService.setselectedEnterprise(id);
    } else {
      this.title = 'Añadir Empresas';
      this.icon = 'pi pi-plus';
      this.sharedService.setselectedEnterprise(null);
    }
  }

  dialogDelete(id: number) {
    this.confirmService.deleteDialog(id).then(result => {
      if (result === 'Confirmed') {
        this.enterpriseService.delete(id).subscribe(res => {
          this.loading = true;
          this.messageService.showConfirmDelete();
          this.refreshTable();
        }, (err) => {
          this.messageService.showError();
        })
      }
    })

  }

  refreshTable() {
    this.loading = true;
    this.filterValue = '';
    this.dt.filterGlobal('', 'contains');
    const lazyLoadEvent: LazyLoadEvent = {
      first: 0,
      rows: 10,
    };
    this.getData(lazyLoadEvent);
  }

  onStartDateChange() {
    this.refreshTable()
  }

  onEndDateChange() {
    this.refreshTable()
  }

  onRowSelect(event: any) {
    this.selectedItems = event.data.map((item: any) => ({
      id: item.id
    }));
  }

  onRowUnselect(event: any) {
    this.selectedItems = this.selectedItems.filter(item => item.id !== event.data.id);
    this.showAprobe();
  }

  showAprobe(): boolean {
    if (this.selectedItems.length.toString() === '0') {
      return false;
    }
    for (const item of this.dt.selection) {
      if (item.activo == '0') {
        return false;
      }
    }
    return true;
  }

  sendtoReview() {
    this.confirmService.aprobeDialog().then(result => {
      if (result === 'Confirmed') {
        this.loading = true;
        this.enterpriseService.sendToReview(this.selectedItems).subscribe(res => {          
          this.messageService.showConfirmAprobe();
          this.selectedItems = [];	
          this.refreshTable();
        }, (err) => {
          this.refreshTable();
          this.messageService.showError();
        })
      }
    })
  }

}
