import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DataTableComponent } from '../data-table/data-table.component';
import { ChartComponent } from '../chart/chart.component';
import { ContractesData } from '../../types/contractes';
import { ColDef } from 'ag-grid-community';
import { DespesesData } from '../../types/despeses';
import { ViatgesData } from '../../types/viatges';

@Component({
  selector: 'app-dades-item',
  standalone: true,
  imports: [ChartComponent, DataTableComponent],
  templateUrl: './dades-item.component.html',
  styleUrl: './dades-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DadesItemComponent {
  @Input({ required: true }) data:
    | ContractesData[]
    | DespesesData[]
    | ViatgesData[] = [];
  @Input({ required: true }) columns: ColDef[] = [];
  @Input({ required: true }) series: any[] = [];
  @Input() moreInfo = 'https://catalegdades.caib.cat/';
}
