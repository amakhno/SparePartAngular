import { Component, OnInit } from '@angular/core';
import { SparePartEditViewModel } from '../../model/sparepart-edit-view-model.1';
import { SparePartRest } from '../../model/sparepart.rest';
import { Http } from '@angular/http';
import { AppSettings } from '../../app.settings';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-spare-part-form',
  templateUrl: './spare-part-form.component.html',
  styleUrls: ['./spare-part-form.component.css']
})
export class SparePartFormComponent implements OnInit {

  sparePart: SparePartEditViewModel;
  marks: MarkForSelect;

  constructor(private http: Http, private settings: AppSettings, private activateRoute: ActivatedRoute,
    private markRepository: SparePartRest, private router: Router) {
    this.sparePart = new SparePartEditViewModel();
    console.log(this.sparePart);
    this.sparePart.id = activateRoute.snapshot.params['id'];
    if (this.sparePart.id != null) {
      this.markRepository.Get(this.sparePart.id).subscribe(x => {
        this.sparePart = x;
      });
    }
  }

  ngOnInit() {
    this.http.get(this.settings.ApiUrl + '/api/Mark/ListForSelect')
      .subscribe(data => { this.marks = data.json(); });
    if (this.sparePart.markId == null) {
      this.sparePart.markId = 0;
    }
  }

  fileChange(event: any) {
    const fileList: FileList = event.target.files;
    const file: File = fileList[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.sparePart.imageBase64 = reader.result;
      this.sparePart.imageName = file.name;
    };
    reader.readAsDataURL(file);
  }

  submit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (!(this.sparePart.price > 0) || !(this.sparePart.markId > 0)) {
      alert('Цена и марка не могут быть нулевыми');
      return;
    }
    if (this.sparePart.id != null) {
      this.markRepository.Put(this.sparePart).subscribe((data) => {
        console.log(data);
        this.router.navigateByUrl('/admin/sparepartlist');
      });
    } else {
      this.markRepository.Post(this.sparePart).subscribe((data) => {
        console.log(data);
        this.router.navigateByUrl('/admin/sparepartlist');
      });
    }
  }

  public get PathToImage(): string {
    if (this.sparePart.imageId == null || this.sparePart.imageId < 1) {
      return null;
    }
    return this.settings.ApiUrl + '/api/Images/' + this.sparePart.imageId;
  }
}

interface MarkForSelect {
  id: number;
  name: string;
}
