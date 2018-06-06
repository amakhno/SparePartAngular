import { MarkRest } from './marl.rest';
import { MarkEditViewModel } from './mark-edit-view-model';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { MarkFilter } from './Mark/mark-filter';
import { MarkList } from './Mark/mark-list';

@Injectable()
export class MarkRepository {
    constructor (private markRepo: MarkRest) {
    }

    /**
     * Post
model: Model     */
    public Post(model: MarkEditViewModel, file: any): Observable<MarkEditViewModel> {
        return this.markRepo.Post(model, file);
    }

    public Get(id: number): Observable<MarkEditViewModel> {
        return this.markRepo.Get(id);
    }

    public GetList(filter: MarkFilter): Observable<MarkList> {
        return this.markRepo.GetList(filter);
    }

    public Delete(id: number) : Observable<boolean> {
        return this.markRepo.Delete(id);
    }
}
