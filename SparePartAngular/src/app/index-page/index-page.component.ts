import { Component, OnInit } from '@angular/core';
import { SparePartListForUsers } from '../model/SparePart/spare-part-list-for-users';
import { SparePartRest } from '../model/sparepart.rest';
import { SparePartFilter, FilterSort } from '../model/SparePart/spare-part-filter';
import { AppSettings } from '../app.settings';
import { Router } from '@angular/router';
import { Cart } from '../cart.service';
import { MarkRepository } from '../model/mark.repository';
import { Http } from '@angular/http';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {

  sparePartList = new SparePartListForUsers();
  filter: SparePartFilter;
  ready = false;
  nameSort = FilterSort.NameUp;
  priceSort = FilterSort.PriceUp;

  pageSizes = [3, 5, 10];

  pages: number[];

  marksForFilter: MarkForSelect;

  constructor(private spareRepo: SparePartRest, 
    private markRepo: MarkRepository, 
    private settings: AppSettings,
    private router: Router, 
    private cart: Cart,
    private http: Http
  ) { 
    this.filter = new SparePartFilter();
    this.filter.nameFilter = '';
    this.filter.pageNumber = 1;
    this.filter.pageSize = this.pageSizes[0];
    this.filter.sort = FilterSort.Empty;
    this.filter.markIds = [];
  }

  ngOnInit() {    
    this.ready = true;
    this.UpdateTable();
    this.http.get(this.settings.ApiUrl + '/api/Mark/ListForSelect')
      .subscribe(data => { this.marksForFilter = data.json(); });
  }

  UpdateTable() {
    if (this.ready) {
      this.ready = false;
      this.spareRepo.GetListForUsers(this.filter).subscribe(data => {
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

  addToCart(id: number) {
    this.cart.addToCart(id);
  }

  removeFromCart(id: number) {
    this.cart.removeFromCart(id);
  }

  isInCart(id: number): boolean {
    if (this.cart.cartPositions.filter(x => x.sparePartId === id).length > 0) {
      return true;
    }
    return false;
  }

  changeFilterMark(markId : number) {
    if (this.filter.markIds.includes(markId)) {
      this.filter.markIds = this.filter.markIds.filter(x=>x != markId);
    }
    else {
      this.filter.markIds.push(markId);
    }
    this.filter.pageNumber = 1;
    this.UpdateTable();
  }

  isMarkInFilter(id: number) : boolean {
    return this.filter.markIds.includes(id);
  }
}

interface MarkForSelect {
  id: number;
  name: string;
}