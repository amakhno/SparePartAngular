import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { AppSettings } from '../../app.settings';
import { MarkEditViewModel } from '../../model/mark-edit-view-model';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { MarkRepository } from '../../model/mark.repository';
import { map } from 'rxjs/Operator/map';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'markedit',
    templateUrl: './mark-form.component.html',
    styleUrls: ['./mark-form.component.css']
})
export class MarkFormComponent implements OnInit {
    file: File;
    mark: MarkEditViewModel = new MarkEditViewModel();
    result: string;

    constructor(private http: Http, private settings: AppSettings, private activateRoute: ActivatedRoute,
        private markRepository: MarkRepository, private router: Router) {
        this.mark = new MarkEditViewModel();
        console.log(this.mark);
        this.mark.id = activateRoute.snapshot.params['id'];
        if (this.mark.id != null) {
            this.markRepository.Get(this.mark.id).subscribe(x => {
                this.mark = x;
                console.log(this.mark);
            });
        }
    }

    ngOnInit(): void { }

    public image: string;

    changeImage() {

    }

    fileChange(event: any) {
        console.log(this.mark);
        const fileList: FileList = event.target.files;
        this.file = fileList[0];
        /*let reader = new FileReader();
        reader.onloadend = () => {
          //console.log('RESULT', reader.result); 
          this.image = reader.result;
          console.log(this.settings.ApiUrl + '/api/images/PostImage');
          this.http.post(this.settings.ApiUrl + '/api/images/PostImage', {base64String: reader.result}).subscribe(x=>console.log('success'));         
        }
        reader.readAsDataURL(this.file);*/
    }

    submit(form: NgForm) {
        if (form.valid) {
            this.markRepository.Post(this.mark, this.file).subscribe(x => {
                console.log(x);
                this.router.navigateByUrl('/admin/marklist');
            });
        }
    }

    IsNew(): boolean {
        return this.mark.id == null;
    }

    public get PathToImage(): string {
        if (this.mark.imageId == null || this.mark.imageId < 1) {
            return null;
        }
        return this.settings.ApiUrl + '/api/Images/' + this.mark.imageId;
    }

}
