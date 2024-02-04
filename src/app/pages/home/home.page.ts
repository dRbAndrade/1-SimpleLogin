import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ReceiptService } from '../../services/receipt.service';
import { ColumnChartData } from '../../types/column-chart-data';
import { HelpDocs } from '../../types/help-docs';
import { Rejected } from '../../types/rejected';
import { MenuModule } from '../../types/menu-modules';

@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public helpDocs!: HelpDocs[];
  public statusData!: Map<string,number>
  public processedData!: ColumnChartData;
  public rejectedData!: Rejected;
  public total!: number;
  public selectedDate!: string;
  public displayedDate!: string;
  public pickerColumns!: any[];
  public pickerButtons!: any[];
  public months!: any[];
  public years!: any[];
  public menuStatus!: boolean;
  public modules!: MenuModule[];

  constructor(
    private receiptService: ReceiptService
  ){}
    
  ngOnInit() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    this.years = [];
    for (let i = currentYear;i>(currentYear-10);i--){
      this.years.push({text:i.toString(),value:i.toString()});
    }
    this.months = [
      {
        text: 'Enero',
        value: '01',
      },
      {
        text: 'Febrero',
        value: '02',
      },
      {
        text: 'Marzo',
        value: '03',
      },
      {
        text: 'Abril',
        value: '04',
      },
      {
        text: 'Mayo',
        value: '05',
      },
      {
        text: 'Junio',
        value: '06',
      },
      {
        text: 'Julio',
        value: '07',
      },
      {
        text: 'Agosto',
        value: '08',
      },
      {
        text: 'Setiembre',
        value: '09',
      },
      {
        text: 'Octubre',
        value: '10',
      },
      {
        text: 'Noviembre',
        value: '11',
      },
      {
        text: 'Diciembre',
        value: '12',
      },
    ];
    const selectedYear = currentYear.toString();
    const selectedMonth = this.months[currentMonth].value;
    this.menuStatus = false;
    this.selectedDate = `${selectedYear}-${selectedMonth}`;
    this.displayedDate = `${this.months[currentMonth].text} de ${selectedYear}`;
    this.helpDocs = [
      {title:"Manual Envío por E-mail", updatedDate:"22 Set 2023",url:'https://factura-core.com/manual/envio-correos.pdf'},
      {title:"Manual Comunicación Bajas", updatedDate:"22 Set 2023",url:'https://factura-core.com/manual/comunicacion-bajas.pdf'},
      {title:"Catálogo de Códigos SUNAT", updatedDate:"26 Ene 2024",url:'https://factura-core.com/manual/catalogo-SUNAT.pdf'}
    ];
    // this.reloadData();
    this.pickerColumns = [
      {
        name: 'month',
        options: this.months
      },
      {
        name: 'year',
        options: this.years
      }
    ];
    this.pickerButtons = [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Confirm',
        handler: (selected:any) => {
          this.selectedDate = `${selected.year.value}-${selected.month.value}`;
          this.displayedDate = `${selected.month.text} de ${selected.year.text}`;
          this.reloadData();
        },
      },
    ];
    this.modules = [
      {title: 'inicio', icon: 'home', url: 'home'},
      {title: 'accesos', icon: 'user', submodules: [{title: 'usuarios', url:'users'}]},
      {title: 'registro', icon: 'briefcase', submodules: [{title: 'empresas', url:'companies'}]},
      {title: 'auditoria', icon: 'file-text', submodules: [{title: 'cuadratura', url:'admin/audit/quadrature'},{title: 'registro ventas electronico (rvie)', url: 'admin/audit/quadrature'}]},
      {title: 'emision', icon: 'plus-circle', submodules: [
        {title: 'individual', submodules: [{title: 'gre remitente', url: 'emision/single/gre/sender'}, {title: 'retención', url: 'emision/single/retention'}]},
        {title: 'masivo', submodules: [{title: 'cpe emisor', url: 'emision/mass/cpe/sender'}, {title: 'cpe receptor', url: 'emision/mass/cpe/receiver'}, {title: 'gre remitente', url: 'emision/mass/gre/sender'}, {title: 'ordenes carga', url: 'emision/mass/load-order'}]}
      ]},
      {title: 'consulta', icon: 'file-text', submodules: [{title: 'comprobantes de pago', url:'invoices'},{title: 'notas de crédito/debit', url:'notes'},{title: 'comprobantes de pago', url:'invoices'},{title:'percepción/retención', url:'perception-retention'},{title: 'guia remitente', url: 'sender'}, {title: 'guia transportista', url: 'carrier'}, {title: 'cumunicación de bajas', url: 'voider'}, {title: 'dae', url: 'dae'}, {title: 'cpe masivo', url: 'mass-cpe'}]},
    ];

  }

  reloadData(){
    forkJoin({
      status: this.receiptService.getStatus(this.selectedDate.split('-')),
      rejected: this.receiptService.getRejected(this.selectedDate.split('-')),
      processed: this.receiptService.getProcessed(this.selectedDate.split('-'))
    }).subscribe(response => {
      console.log(146, "RESPONSE HEEEEEERREEERERE");
      console.log(147, response)
      const processedMap = new Map<string,number>();
      processedMap.set("Facturas",response.processed.data.info[0].data[0]);
      processedMap.set("Boletas",response.processed.data.info[0].data[1]);
      processedMap.set("Notas Credito",response.processed.data.info[0].data[2]);
      processedMap.set("Notas Debito",response.processed.data.info[0].data[3]);
      processedMap.set("Retencion",response.processed.data.info[0].data[4]);
      processedMap.set("Percepcion",response.processed.data.info[0].data[5]);
      processedMap.set("Guias Remitente",response.processed.data.info[0].data[6]);
      processedMap.set("Guias Transportista",response.processed.data.info[0].data[7]);

      this.statusData = new Map<string,number>();
      this.statusData.set("Aprobados",response.status.data.info[0]);
      this.statusData.set("Rechazados",response.status.data.info[1]);
      this.statusData.set("Anulado",response.status.data.info[2]);
      this.statusData.set("Excepcion",response.status.data.info[3]);
      this.statusData.set("En Proceso",response.status.data.info[4]);
      this.total = response.status.data.info.reduce((acc:number,curr:number)=>acc+curr);

      this.rejectedData = response.rejected.data;

      this.processedData = {
        title: response.processed.data.title,
        name: response.processed.data.info[0].name,
        data: processedMap
      }

    });
  }

  toggleMenuIcon(){
    this.menuStatus = !this.menuStatus;
  }

  downloadReport(type:number){
    this.receiptService.downloadReport(type,this.selectedDate.split('-'));
  }

}