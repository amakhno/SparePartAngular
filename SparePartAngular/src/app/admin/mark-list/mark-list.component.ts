import { Component, OnInit, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { MarkRest } from '../../model/marl.rest';
import { MarkList } from '../../model/Mark/mark-list';
import { MarkFilter } from '../../model/Mark/mark-filter';
import { AppSettings } from '../../app.settings';

@Component({
  selector: 'app-mark-list',
  templateUrl: './mark-list.component.html',
  styleUrls: ['./mark-list.component.css']
})
export class MarkListComponent implements OnInit {
  markList = new MarkList();
  filter: MarkFilter;
  ready = false;

  pageSizes = [3, 5, 10];

  pages: number[];

  constructor(private markRepo: MarkRest, private settings: AppSettings) { }

  ngOnInit() {
    this.filter = new MarkFilter();
    this.filter.nameFilter = '';
    this.filter.pageNumber = 1;
    this.filter.pageSize = this.pageSizes[0];
    this.ready = true;
    this.UpdateTable();
  }

  UpdateTable() {
    if (this.ready) {
      this.ready = false;
      this.markRepo.GetList(this.filter).subscribe(data => {
        this.markList = data;
        this.UpdatePages();
        this.ready = true;
      });
    }
  }

  UpdatePages() {
    this.pages = [];
    for (let i = 0; i < this.markList.pagesCount; i++) {
      this.pages.push(i + 1);
    }
  }

  public PathToImage(id: number): string {
    if (id == null || id < 1) {
      return null;
    }
    return this.settings.ApiUrl + '/api/Images/' + id;
  }

  DeleteMark(id: number) {
    this.markRepo.Delete(id).subscribe(data => 
      { 
        alert('Удалено!'); 
        this.UpdateTable();
      }
    );
  }
}
