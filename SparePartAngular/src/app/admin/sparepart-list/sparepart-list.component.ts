import { Component, OnInit } from '@angular/core';
import { MarkList } from '../../model/Mark/mark-list';
import { MarkFilter } from '../../model/Mark/mark-filter';
import { MarkRest } from '../../model/marl.rest';
import { AppSettings } from '../../app.settings';
import { SparePartFilter, FilterSort } from '../../model/SparePart/spare-part-filter';
import { SparePartRest } from '../../model/sparepart.rest';
import { SparePartList } from '../../model/SparePart/spare-part-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sparepart-list',
  templateUrl: './sparepart-list.component.html',
  styleUrls: ['./sparepart-list.component.css']
})
export class SparePartListComponent implements OnInit {
  sparePartList = new SparePartList();
  filter: SparePartFilter;
  ready = false;

  pageSizes = [3, 5, 10];

  pages: number[];

  constructor(private spareRepo: SparePartRest, private settings: AppSettings, private router: Router) { }

  ngOnInit() {
    this.filter = new SparePartFilter();
    this.filter.nameFilter = '';
    this.filter.pageNumber = 1;
    this.filter.pageSize = this.pageSizes[0];
    this.filter.sort = FilterSort.Empty;
    this.ready = true;
    this.UpdateTable();
  }

  UpdateTable() {
    if (this.ready) {
      this.ready = false;
      this.spareRepo.GetList(this.filter).subscribe(data => {
        this.sparePartList = data;
        this.UpdatePages();
        this.ready = true;
      });
    }
  }

  UpdatePages() {
    this.pages = [];
    for (let i = 0; i < this.sparePartList.pagesCount; i++) {
      this.pages.push(i + 1);
    }
  }

  public PathToImage(id: number): string {
    if (id == null || id < 1) {
      return null;
    }
    return this.settings.ApiUrl + '/api/Images/' + id;
  }

  changeSort(index: number) {
    if (this.filter.sort === 0) {
      this.filter.sort = index;
    } else if (this.filter.sort % 2 > 0) {
      if (this.filter.sort === index) {
        this.filter.sort = this.filter.sort + 1;
      } else {
        this.filter.sort = index;
      }
    } else if (this.filter.sort === index + 1) {
      this.filter.sort = this.filter.sort - 1;
    } else {
      this.filter.sort = index;
    }
    this.UpdateTable();
  }

  delete(id: number) {
    this.spareRepo.Delete(id).subscribe(
      success => {
        this.UpdateTable();
        alert('Успешно удалено');
      },
      error => {
        alert('Ошибка ${error}');
      }
    );
  }
}
