import { Component, OnInit } from '@angular/core';
import Axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent implements OnInit {
  fileToUpload: File=null;
  constructor() { }

  ngOnInit(): void {
  }
  handleFileInput(files:FileList){
    this.fileToUpload=files.item(0);
    let formData= new FormData();
    formData.append('fileKey',this.fileToUpload);
    // Axios.post('https://www.tiktok.com/api/v1/item/create/?_signature=mPeaZgAAAABXFjfvBKpkEZj3mnAAMdt&cookie_enabled=true&screen_width=1536&screen_height=864&browser_language=en-US&browser_platform=Win32&browser_name=Mozilla&browser_version=5.0+(Windows+NT+10.0%3B+Win64%3B+x64)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F86.0.4240.111+Safari%2F537.36&browser_online=true&timezone_name=Asia%2FSaigon',formData,{
    //   withCredentials: true,
    //   headers:{
    //     'Content-Type': 'multipart/form-data',
    //     'accept':'application/json, text/plain, */*',
    //     'accept-encoding':'gzip, deflate, br',
    //     'accept-language':'en-US,en;q=0.9,vi;q=0.8',
    //     'content-type':'application/x-www-form-urlencoded;charset=UTF-8',
    //     'Authorization': 'Basic '+btoa('username:password'),
    //     'Access-Control-Allow-Origin': '*',
    //     'cookie':'tt_webid=6886478503065126402;tt_webid_v2=6886478503065126402;_ga=GA1.2.849703431.1603383235;passport_csrf_token=94fa5faa79f77f8e61f7699af97917cf;odin_tt=d019645a9b1ce801cdf3692f33c7b24120d0e079155f1d8f15c5789c0692e7515fb957b41abc229381f9907656bace8396591e80fcf6a9e3da63dd504fbb477d;passport_auth_status=6ae083f17bbc90f7aaeb8ba8a1b407d4%2C;sid_guard=1a082ef2a6a135dfa5c4b26ee1cb9eba%7C1603436091%7C5184000%7CTue%2C+22-Dec-2020+06%3A54%3A51+GMT;uid_tt=bc692c64de7f7af248b838d042cc675aa0929bb69b4c8b5bfa1a81a2891ae8d6;uid_tt_ss=bc692c64de7f7af248b838d042cc675aa0929bb69b4c8b5bfa1a81a2891ae8d6;sid_tt=1a082ef2a6a135dfa5c4b26ee1cb9eba;sessionid=1a082ef2a6a135dfa5c4b26ee1cb9eba;sessionid_ss=1a082ef2a6a135dfa5c4b26ee1cb9eba;store-idc=alisg;store-country-code=vn;s_v_web_id=verify_kgpw6m9u_QDielbJZ_3J37_4fmb_9H1T_My8enmAuzYuh;MONITOR_WEB_ID=60f39fd8-6b57-4fef-aeb3-2a9828d41b15;|Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
    //   },
    //   mode: 'no-cors',
    // })

    fetch("https://www.tiktok.com/api/v1/item/create/?_signature=ptnXlQAAAABpOHocU6Eut6bZ14AAPle&cookie_enabled=true&screen_width=1536&screen_height=864&browser_language=en-US&browser_platform=Win32&browser_name=Mozilla&browser_version=5.0+(Windows+NT+10.0%3B+Win64%3B+x64)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F86.0.4240.111+Safari%2F537.36&browser_online=true&timezone_name=Asia%2FSaigon",{
      method: 'POST',
      headers: {
          'Content-Type': 'multipart/form-data',
          'accept':'application/json, text/plain, */*',
          'accept-encoding':'gzip, deflate, br',
          'accept-language':'en-US,en;q=0.9,vi;q=0.8',
          'content-type':'application/x-www-form-urlencoded;charset=UTF-8',
          'Authorization': 'Basic '+btoa('huunghia1023@gmail.com:PassWordTest&1'),
          'Access-Control-Allow-Origin': '*',
          'cookie':'tt_webid=6886478503065126402;tt_webid_v2=6886478503065126402;_ga=GA1.2.849703431.1603383235;passport_csrf_token=94fa5faa79f77f8e61f7699af97917cf;store-idc=alisg;store-country-code=vn;s_v_web_id=verify_kgpw6m9u_QDielbJZ_3J37_4fmb_9H1T_My8enmAuzYuh;passport_auth_status=ad9a42c04cfe68a5409cc194ee6551bf%2C6ae083f17bbc90f7aaeb8ba8a1b407d4;odin_tt=ef763ff8461a3b67f0a3d15c5f8007a681f5b58d9f5f01cd526f771c9096a331128f3f2efe6c14d84fc358f915cc9175c77834a0ccd4140e204b995baaa653df;uid_tt=3d0df94b75ab55506f5fce0527bf5e4c96a456d705792048c840dddd565bf5df;uid_tt_ss=3d0df94b75ab55506f5fce0527bf5e4c96a456d705792048c840dddd565bf5df;sid_tt=2a9fa7ba2fa882051a30551387bfd6dc;sessionid=2a9fa7ba2fa882051a30551387bfd6dc;sessionid_ss=2a9fa7ba2fa882051a30551387bfd6dc;sid_guard=2a9fa7ba2fa882051a30551387bfd6dc%7C1603690248%7C5184000%7CFri%2C+25-Dec-2020+05%3A30%3A48+GMT;MONITOR_WEB_ID=60f39fd8-6b57-4fef-aeb3-2a9828d41b15;|Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
        },
      mode:'no-cors',
      body: formData,

    })
    .then(re=>re.json())
    .then(res=>{
      res['data']=formData;
      console.log(res);
      // if(res.status===200){
      //   Swal.fire({
      //     position: 'top-end',
      //     icon: 'success',
      //     title: "Success",
      //     showConfirmButton: false,
      //     timer: 2000
      //   })
      //   console.log(res);
      // }
      // else
      // console.log("error to upload");
    })
  }
}
