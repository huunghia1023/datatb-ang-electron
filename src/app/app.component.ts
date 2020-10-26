import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Axios from 'axios';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { param } from 'jquery';

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
      //console.log(JSON.stringify(this.datas));
      this.dtOptions={
        paging: true,
        responsive:true,
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
    let param={
      city: Ilocation,
      name: Iname,
      follow: Ifollow,
      follower: Ifollower
    }
    Axios.post('https://api.mocki.io/v1/cc6f4542',param)
    .then(res=>{
      if(res.status===200){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: "Success",
          showConfirmButton: false,
          timer: 2000
        })
        this.datas.push(JSON.parse(res.config.data));
        //console.log(this.datas);
      }
      else{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: "Ops...",
          showConfirmButton: true,
          timer: 2000
        })
      }
    })

  }
}
