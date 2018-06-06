import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { AppSettings } from '../../app.settings';
import { MarkEditViewModel } from '../../model/mark-edit-view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkRepository } from '../../model/mark.repository';
import { map } from 'rxjs/Operator/map';
import { Location } from '@angular/common';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'mainpage',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
    file: File;
    mark: MarkEditViewModel = new MarkEditViewModel();
    result: string;

    constructor(private http: Http, private settings: AppSettings, private activateRoute: ActivatedRoute,
        private markRepository: MarkRepository, private locator: Location) {
        this.mark = new MarkEditViewModel();
        console.log(this.mark);
        this.mark.id = activateRoute.snapshot.params['id'];
        if (this.mark.id != null) {
            this.markRepository.Get(this.mark.id).subscribe(x => {
                this.mark = x;
                console.log(this.mark);
            }
            );
        }
    }

    ngOnInit(): void { }

    fileChange(event: any) {
        console.log(this.mark);
        const fileList: FileList = event.target.files;
        this.file = fileList[0];
    }

    submit(form: NgForm) {
        if (form.valid) {
            this.markRepository.Post(this.mark, this.file).subscribe(x => {
                console.log(x);
            });
        }
    }

    IsNew(): boolean {
        return this.mark.id == null;
    }

    public get PathToImage(): string {
        if (this.mark.imageId == null) {
            return null;
        }
        return this.settings.ApiUrl + '/api/Images/' + this.mark.imageId;
    }

    public back() {
        this.locator.back();
    }
}
