import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { ContractesData } from '../../types/contractes';
import { DespesesData } from '../../types/despeses';
import { ViatgesData } from '../../types/viatges';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnInit {
  @Input({ required: true }) data:
    | ContractesData[]
    | DespesesData[]
    | ViatgesData[] = [];
  @Input({ required: true }) columns: ColDef[] = [];

  pagination = true;
  paginationPageSize = 500;
  paginationPageSizeSelector = [200, 500, 1000];
  colDefs: ColDef<any, string>[] = [];
  themeClass = 'ag-theme-quartz-dark';

  ngOnInit(): void {}
}
