import { Component, OnInit } from '@angular/core';
import Axios from 'axios';

const regex = /<script id="__NEXT_DATA__" type="application\/json" crossorigin="anonymous">(.*)<\/script><script\ crossorigin="anonymous"/gm;


@Component({
  selector: 'app-get-tik-tok',
  templateUrl: './get-tik-tok.component.html',
  styleUrls: ['./get-tik-tok.component.css']
})
export class GetTikTokComponent implements OnInit {
  datatiktok;
  str;
  m;

  constructor() { }

  ngOnInit(): void {
    this.str='';
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

}
