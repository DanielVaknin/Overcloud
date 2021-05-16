import {Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit, OnChanges {

  tableDataSrc: any;
  // tslint:disable-next-line: no-input-rename
  @Input('tableColumns') tableCols: string[] = [];
  @Input() tableData: {}[] = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;


  constructor() { }

  ngOnInit() {
    this.tableDataSrc = new MatTableDataSource(this.tableData);
    this.tableDataSrc.sort = this.sort;
    this.tableDataSrc.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.tableDataSrc = new MatTableDataSource(this.tableData);
  }

  onSearchInput(ev: any) {
    const searchTarget = ev.target.value;
    this.tableDataSrc.filter = searchTarget.trim().toLowerCase();
  }
}
