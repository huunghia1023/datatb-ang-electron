import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Axios from 'axios';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

declare var $: any;
const regex = /<script id="__NEXT_DATA__" type="application\/json" crossorigin="anonymous">(.*)<\/script><script\ crossorigin="anonymous"/gm;

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
  datatiktok;
  str;
  m;
  dtOptions: DataTables.Settings={};
  openPopup(){
    $("#addUserModal").modal("show");
  }
  ngOnInit(){
    this.str='';
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

    Axios.get('https://www.tiktok.com/@cuongjin08?lang=vi')
    .then(res=>res)
    .then(rs=>{
      this.str=rs.data;
      while ((this.m = regex.exec(this.str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (this.m.index === regex.lastIndex) {
          regex.lastIndex++;
        }
        //console.log(this.m);
        this.datatiktok=JSON.parse(this.m[1]);
        console.log(this.datatiktok);
        //console.log(typeof(this.datatiktok.listVideos[0].createTime));
          // The result can be accessed through the `m`-variable.
          // m.forEach((match, groupIndex) => {
          //   //console.log(`Found match, group ${groupIndex}: ${match}`);
          //   if(groupIndex===1){
          //     this.datatiktok=match;
          //   }
          // });
      }

      });


    Axios.get('https://t.tiktok.com/api/item_list/?aid=1988&app_name=tiktok_web&device_platform=web&referer=&user_agent=Mozilla%2F5.0+(Windows+NT+10.0%3B+Win64%3B+x64)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F86.0.4240.111+Safari%2F537.36&cookie_enabled=true&screen_width=1536&screen_height=864&browser_language=en-US&browser_platform=Win32&browser_name=Mozilla&browser_version=5.0+(Windows+NT+10.0%3B+Win64%3B+x64)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F86.0.4240.111+Safari%2F537.36&browser_online=true&ac=4g&timezone_name=Asia%2FSaigon&priority_region=&appId=1180&region=VN&appType=t&isAndroid=false&isMobile=false&isIOS=false&OS=windows&did=6886478503065126402&count=30&id=66456128862&type=1&secUid=MS4wLjABAAAASk_wzIrADn4Ut41HbpXqFF_9VOqkJyCXvj9G5wpd2t0&maxCursor=0&minCursor=0&sourceType=8&language=vi&verifyFp=verify_kgl0za2g_wSbDQGJF_q5wM_42Ax_9pGe_H2S46COIEmt5&_signature=_02B4Z6wo00d0143hCYQAAICBU-h4NFavqM-N4A0AALz146')
    .then(res=>{
      //console.log(res.data.items);
      this.datatiktok['listVideos']=res.data.items;


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
