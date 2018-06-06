import { Http, RequestOptions, Response } from '@angular/http';
import { AppSettings } from '../app.settings';
import { MarkEditViewModel } from './mark-edit-view-model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { MarkFilter } from './Mark/mark-filter';
import { MarkList } from './Mark/mark-list';
import { CustomHttp } from '../custom-http.service';

@Injectable()
export class MarkRest {
    /**
     *
     */
    constructor(private http: CustomHttp, private appSettings: AppSettings) {
    }
    /**
     * Save
     */
    public Post(model: MarkEditViewModel, image: any): Observable<MarkEditViewModel> {
        const formData = new FormData();
        if (model.id > 0) {
            formData.append('Id', model.id.toString());
        }
        formData.append('Name', model.name);
        if (image != null) {
            formData.append('uploadFile', image, image.name);
        }
        return this.http.post(this.appSettings.ApiUrl + '/api/Mark', formData).map(data => {
            const model1: MarkEditViewModel = new MarkEditViewModel().deserialize(data.json());
            return model1;
        });
    }

    public Get(Id: number): Observable<MarkEditViewModel> {
        return this.http.get(this.appSettings.ApiUrl + '/api/Mark/' + Id.toString()).map(data => {
            const model: MarkEditViewModel = new MarkEditViewModel().deserialize(data.json());
            return model;
        });
    }

    public Delete(Id: number): Observable<boolean> {
        return this.http.delete(this.appSettings.ApiUrl + '/api/Mark/' + Id.toString()).map(data => {
            return data.json() as boolean;
        });
    }

    public GetList(filter: MarkFilter): Observable<MarkList> {
        return this.http.post(this.appSettings.ApiUrl + '/api/Mark/List', filter).map(data => {
            return data.json() as MarkList;
        });
    }
}
