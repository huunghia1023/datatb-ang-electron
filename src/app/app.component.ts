import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Axios from 'axios';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  title = 'electron-angular-app';
  formdata;
  datas;

  dtOptions: DataTables.Settings={};
  openPopup(){
    $("#addUserModal").modal("show");
  }
  ngOnInit(){

    this.datas=[];
    $.noConflict();
    this.formdata=new FormGroup({
      Fname: new FormControl("", [Validators.required]),
      Flocation: new FormControl("", [Validators.required]),
      Ffollow: new FormControl("", [Validators.required, Validators.min(0)]),
      Ffollower: new FormControl("", [Validators.required, Validators.min(0)]),
    });

    Axios.get('https://api.mocki.io/v1/cc6f4542')
    .then(res=>res)
    .then(r=>{
      this.datas=r.data;
      this.dtTrigger.next();
      //console.log(this.datas);
      this.dtOptions={
        paging: true,
        columns:[
          {
            "data":"",
            "defaultContent":""
          },
          {
            "data":"city"
          },
          {
            "data":"name"
          },
          {
            "data":"follow"
          },
          {
            "data":"follower"
          },
          {
            "data":"",
            "defaultContent":"<i>Not set</i>"
          }
        ]
      }
      // var t=$('#table_id').Datatable({

      // });
      // t.column(0,{
      //   search:'applied',
      //   order:'applied'
      // }).node().each(function(cell,i){
      //   cell.innerHTML=i+1;
      // });
    })

    

  }
  onSubmit(fordata){
    if(this.formdata.invalid){
      Object.keys(this.formdata.controls).forEach(key=>{
        this.formdata.get(key).markAsTouched();
      });
    }
  }
  commited(Ilocation: string, Iname: string, Ifollow: number, Ifollower: number) {
    $("#addUserModal").modal("hide");
    //console.log(Ilocation+ "\t"+Iname+"\t"+Ifollow+"\t"+Ifollower);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Data: '+Ilocation+ "\t"+Iname+"\t"+Ifollow+"\t"+Ifollower,
      showConfirmButton: false,
      timer: 3000
    })
  }
}
