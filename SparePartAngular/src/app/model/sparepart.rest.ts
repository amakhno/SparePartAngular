import { Http, RequestOptions, Response } from '@angular/http';
import { AppSettings } from '../app.settings';
import { MarkEditViewModel } from './mark-edit-view-model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { MarkFilter } from './Mark/mark-filter';
import { MarkList } from './Mark/mark-list';
import { CustomHttp } from '../custom-http.service';
import { SparePartEditViewModel } from './sparepart-edit-view-model.1';
import { SparePartFilter } from './SparePart/spare-part-filter';
import { SparePartList } from './SparePart/spare-part-list';
import { SparePartListForUsers } from './SparePart/spare-part-list-for-users';

@Injectable()
export class SparePartRest {
    /**
     *
     */
    constructor(private http: CustomHttp, private appSettings: AppSettings) {
    }
    /**
     * Save
     */
    public Post(model: SparePartEditViewModel): Observable<SparePartEditViewModel> {
        return this.http.post(this.appSettings.ApiUrl + '/api/SparePart', model).map(data => {
            return data.json() as SparePartEditViewModel;
        });
    }

    public Put(model: SparePartEditViewModel): Observable<SparePartEditViewModel> {
        console.log(this.appSettings.ApiUrl + '/api/SparePart/' + model.id);
        return this.http.put(this.appSettings.ApiUrl + '/api/SparePart/' + model.id, model).map(data => {
                return data.json();
            });
    }

    public Delete(id: number): Observable<SparePartEditViewModel> {
        return this.http.delete(this.appSettings.ApiUrl + '/api/SparePart/' + id).map(data => {
                return data.json();
            });
    }

    public Get(Id: number): Observable<SparePartEditViewModel> {
        return this.http.get(this.appSettings.ApiUrl + '/api/SparePart/' + Id.toString()).map(data => {
            return data.json() as SparePartEditViewModel;
        });
    }

    public GetList(filter: SparePartFilter): Observable<SparePartList> {
        return this.http.post(this.appSettings.ApiUrl + '/api/SparePart/List', filter).map(data => {
            return data.json() as SparePartList;
        });
    }

    public GetListForUsers(filter: SparePartFilter): Observable<SparePartListForUsers> {
        return this.http.post(this.appSettings.ApiUrl + '/api/SparePart/ListForUsers', filter).map(data => {
            return data.json() as SparePartListForUsers;
        });
    }
}
