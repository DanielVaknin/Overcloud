import {Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatDialog} from "@angular/material/dialog";
import {RecommendationDetailsComponent} from "../recommendations/recommendation-details/recommendation-details.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MatTableComponent implements OnInit, OnChanges {

  tableDataSrc: any;
  // tslint:disable-next-line: no-input-rename
  @Input('tableColumns') tableCols: string[] = [];
  @Input() tableData: {}[] = [];
  @Input('tableColumnsToHide') tableColsToHide: string[] = [];

  @ViewChild(MatSort, {static: true}) sort: MatSort | undefined;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;

  expandedElement: any | null;

  columnsToDisplay: string[] = [];

  innerTableCols: string[] = [];
  innerTableData: {}[] = [];

  constructor(public dialog: MatDialog,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.tableDataSrc = new MatTableDataSource(this.tableData);
    this.tableDataSrc.sort = this.sort;
    this.tableDataSrc.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.tableDataSrc = new MatTableDataSource(this.tableData);
    this.tableDataSrc.sort = this.sort;
    this.tableDataSrc.paginator = this.paginator;
    this.getColumnsToDisplay();
  }

  getColumnsToDisplay(): void {
    this.columnsToDisplay = this.tableCols.filter(el => !this.tableColsToHide.includes(el))
  }

  onRecommendationClick(accountId: string, recType: string) {
    // @ts-ignore
    const currentRec = this.tableData.find(({type}) => type === recType);
    // @ts-ignore
    if (currentRec !== undefined && currentRec.hasOwnProperty("data") && currentRec["data"].length > 0) {
      // @ts-ignore
      this.innerTableCols = Object.keys(currentRec["data"][0])
      // @ts-ignore
      this.innerTableData = currentRec["data"];

      const dialogRef = this.dialog.open(RecommendationDetailsComponent, {
        restoreFocus: false,
        autoFocus: false,
        width: "1500px",
        data: {
          cloudAccountId: accountId,
          recType: recType,
          tableCols: this.innerTableCols,
          tableData: this.innerTableData
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    else {
      this._snackBar.open("There are no items for this recommendation", "Dismiss")
    }
  }
}
