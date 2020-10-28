import {
  Component,
  OnInit
} from '@angular/core';
import Axios from 'axios';

const regex = /<script id="__NEXT_DATA__" type="application\/json" crossorigin="anonymous">(.*)<\/script><script crossorigin="anonymous"/gm;
const regex2 = /<script id="__NEXT_DATA__" type="application\/json" crossorigin="anonymous">(.*)<\/script><script crossorigin="anonymous" nomodule=""/gm;

@Component({
  selector: 'app-get-tik-tok',
  templateUrl: './get-tik-tok.component.html',
  styleUrls: ['./get-tik-tok.component.css']
})
export class GetTikTokComponent implements OnInit {
  datatiktok;
  cmttitok;
  str;
  strtt;
  m;
  mtt;
  tturlh = 'https://www.tiktok.com/@cuongjin08';
  tturlt = '?lang=vi';
  tturlparam = '/video/';
  tturl = this.tturlh.concat(this.tturlparam, this.tturlt);
  constructor() {}

  ngOnInit(): void {
    this.str = '';
    Axios.get(this.tturlh + this.tturlt)
      .then(res => res)
      .then(rs => {
        this.str = rs.data;
        //console.log(rs.data);
        while ((this.m = regex.exec(this.str)) !== null) {
          // This is necessary to avoid infinite loops with zero-width matches
          if (this.m.index === regex.lastIndex) {
            regex.lastIndex++;
          }
          //console.log(this.m);
          this.datatiktok = JSON.parse(this.m[1]);
          //console.log(this.datatiktok);
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
      .then(res => {
        //console.log(res.data.items);
        this.datatiktok['listVideos'] = res.data.items;
        this.tturlparam = this.tturlparam + this.datatiktok.listVideos[0].id.toString();

        //this.tturl=this.tturlh+this.tturlparam+this.tturlt;
        console.log(this.tturlh + this.tturlparam + this.tturlt);
        Axios.get(this.tturlh + this.tturlparam + this.tturlt)
          .then(res => {
            this.strtt = res.data;
            //console.log(res.data);
            while ((this.mtt = regex.exec(this.strtt)) !== null) {
              // This is necessary to avoid infinite loops with zero-width matches
              if (this.mtt.index === regex.lastIndex) {
                regex.lastIndex++;
              }
              //lấy được trang video
              this.cmttitok = JSON.parse(this.mtt[1]);
              console.log(this.cmttitok);
              // The result can be accessed through the `m`-variable.
              // this.m.forEach((match, groupIndex) => {
              //     console.log(`Found match, group ${groupIndex}: ${match}`);
              // });
            }
            //lấy cmt trong trang video đó
            // Axios.get('https://www.tiktok.com/api/comment/list/?aid=1988&app_name=tiktok_web&device_platform=web_pc&referer=&user_agent=Mozilla%2F5.0+(Windows+NT+10.0%3B+Win64%3B+x64)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F86.0.4240.111+Safari%2F537.36&cookie_enabled=true&screen_width=1536&screen_height=864&browser_language=en-US&browser_platform=Win32&browser_name=Mozilla&browser_version=5.0+(Windows+NT+10.0%3B+Win64%3B+x64)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F86.0.4240.111+Safari%2F537.36&browser_online=true&ac=4g&timezone_name=Asia%2FSaigon&page_referer=https:%2F%2Fwww.tiktok.com%2F@cuongjin08%2Fvideo%3Flang%3Dvi&priority_region=&appId=1180&region=VN&appType=t&isAndroid=false&isMobile=false&isIOS=false&OS=windows&did=6886478503065126402&aweme_id=6886678312672972034&cursor=0&count=20&app_language=vi&current_region=VN&fromWeb=1&channel_id=0&verifyFp=verify_kglmgqkg_zqpCQkzf_uzZB_4bSx_AlFV_cnVuEExA6S3y&_signature=_02B4Z6wo00f01QQZKFAAAICD2hBZ4NWk0sUEGCzAAB6Wf2', {
            //     withCredentials: true,
            //     headers: {
            //       'accept': 'application/json, text/plain, */*',
            //       'accept-encoding': 'gzip, deflate, br',
            //       'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
            //       'cookie': 'tt_webid=6886478503065126402; tt_webid_v2=6886478503065126402; _ga=GA1.2.849703431.1603383235; _gid=GA1.2.624802195.1603383235; s_v_web_id=verify_kglmgqkg_zqpCQkzf_uzZB_4bSx_AlFV_cnVuEExA6S3y; passport_csrf_token=94fa5faa79f77f8e61f7699af97917cf; odin_tt=d019645a9b1ce801cdf3692f33c7b24120d0e079155f1d8f15c5789c0692e7515fb957b41abc229381f9907656bace8396591e80fcf6a9e3da63dd504fbb477d; passport_auth_status=6ae083f17bbc90f7aaeb8ba8a1b407d4%2C; sid_guard=1a082ef2a6a135dfa5c4b26ee1cb9eba%7C1603436091%7C5184000%7CTue%2C+22-Dec-2020+06%3A54%3A51+GMT; uid_tt=bc692c64de7f7af248b838d042cc675aa0929bb69b4c8b5bfa1a81a2891ae8d6; uid_tt_ss=bc692c64de7f7af248b838d042cc675aa0929bb69b4c8b5bfa1a81a2891ae8d6; sid_tt=1a082ef2a6a135dfa5c4b26ee1cb9eba; sessionid=1a082ef2a6a135dfa5c4b26ee1cb9eba; sessionid_ss=1a082ef2a6a135dfa5c4b26ee1cb9eba; store-idc=alisg; store-country-code=vn; MONITOR_WEB_ID=60f39fd8-6b57-4fef-aeb3-2a9828d41b15; _gat_gtag_UA_144727112_1=1',
            //       'referer': 'https://www.tiktok.com/@cuongjin08/video/6886678312672972034?lang=vi',
            //       'sec-fetch-dest': 'empty',
            //       'sec-fetch-site': 'same-origin',
            //       'suser-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
            //     }
            //   })
            //   .then(res => {
            //     console.log(res);
            //   });

            // fetch('https://www.tiktok.com/api/comment/list/?aid=1988&app_name=tiktok_web&device_platform=web_pc&referer=&user_agent=Mozilla%2F5.0+(Windows+NT+10.0%3B+Win64%3B+x64)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F86.0.4240.111+Safari%2F537.36&cookie_enabled=true&screen_width=1536&screen_height=864&browser_language=en-US&browser_platform=Win32&browser_name=Mozilla&browser_version=5.0+(Windows+NT+10.0%3B+Win64%3B+x64)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F86.0.4240.111+Safari%2F537.36&browser_online=true&ac=4g&timezone_name=Asia%2FSaigon&page_referer=https:%2F%2Fwww.tiktok.com%2F@cuongjin08%2Fvideo%3Flang%3Dvi&priority_region=&appId=1180&region=VN&appType=t&isAndroid=false&isMobile=false&isIOS=false&OS=windows&did=6886478503065126402&aweme_id=6886678312672972034&cursor=0&count=20&app_language=vi&current_region=VN&fromWeb=1&channel_id=0&verifyFp=verify_kglmgqkg_zqpCQkzf_uzZB_4bSx_AlFV_cnVuEExA6S3y&_signature=_02B4Z6wo00f01QQZKFAAAICD2hBZ4NWk0sUEGCzAAB6Wf2',{
            //   method:'GET',
            //   headers:{
            //     'accept':'application/json, text/plain, */*',
            //     'accept-encoding':'gzip, deflate, br',
            //     'accept-language':'en-US,en;q=0.9,vi;q=0.8',
            //     'content-type':'application/x-www-form-urlencoded;charset=UTF-8',
            //     'Authorization': 'Basic '+btoa('huunghia1023@gmail.com:PassWordTest&1'),
            //     'Access-Control-Allow-Origin': '*',
            //     'cookie':'tt_webid=6886478503065126402; tt_webid_v2=6886478503065126402; _ga=GA1.2.849703431.1603383235; _gid=GA1.2.624802195.1603383235; s_v_web_id=verify_kglmgqkg_zqpCQkzf_uzZB_4bSx_AlFV_cnVuEExA6S3y; passport_csrf_token=94fa5faa79f77f8e61f7699af97917cf; odin_tt=d019645a9b1ce801cdf3692f33c7b24120d0e079155f1d8f15c5789c0692e7515fb957b41abc229381f9907656bace8396591e80fcf6a9e3da63dd504fbb477d; passport_auth_status=6ae083f17bbc90f7aaeb8ba8a1b407d4%2C; sid_guard=1a082ef2a6a135dfa5c4b26ee1cb9eba%7C1603436091%7C5184000%7CTue%2C+22-Dec-2020+06%3A54%3A51+GMT; uid_tt=bc692c64de7f7af248b838d042cc675aa0929bb69b4c8b5bfa1a81a2891ae8d6; uid_tt_ss=bc692c64de7f7af248b838d042cc675aa0929bb69b4c8b5bfa1a81a2891ae8d6; sid_tt=1a082ef2a6a135dfa5c4b26ee1cb9eba; sessionid=1a082ef2a6a135dfa5c4b26ee1cb9eba; sessionid_ss=1a082ef2a6a135dfa5c4b26ee1cb9eba; store-idc=alisg; store-country-code=vn; MONITOR_WEB_ID=60f39fd8-6b57-4fef-aeb3-2a9828d41b15; _gat_gtag_UA_144727112_1=1',

            //   },
            //   mode:'no-cors',
            // })
            // .then(re=>re.json())
            // .then(re=>{
            //   console.log(re);
            // });


            // var request = require('request');
            // request.get({
            //   url: 'https://www.tiktok.com/api/comment/list/?aid=1988&app_name=tiktok_web&device_platform=web_pc&referer=https:%2F%2Fwww.tiktok.com%2F@cuongjin08%3Flang%3Dvi&user_agent=Mozilla%2F5.0+(Windows+NT+10.0%3B+Win64%3B+x64)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F86.0.4240.111+Safari%2F537.36&cookie_enabled=true&screen_width=1536&screen_height=864&browser_language=en-US&browser_platform=Win32&browser_name=Mozilla&browser_version=5.0+(Windows+NT+10.0%3B+Win64%3B+x64)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F86.0.4240.111+Safari%2F537.36&browser_online=true&ac=4g&timezone_name=Asia%2FSaigon&page_referer=https:%2F%2Fwww.tiktok.com%2F@test_thoi_ma%2Fvideo%2F6887797706345958658%3Flang%3Dvi&priority_region=VN&appId=1180&region=VN&appType=t&isAndroid=false&isMobile=false&isIOS=false&OS=windows&did=6886478503065126402&tt-web-region=VN&uid=6887788948962804737&aweme_id=6886005006001032450&cursor=0&count=20&app_language=vi&current_region=VN&fromWeb=1&channel_id=0&verifyFp=verify_kgpw6m9u_QDielbJZ_3J37_4fmb_9H1T_My8enmAuzYuh&_signature=_02B4Z6wo00901uxscYAAAICAMmUAM9hqBMrsbXUAAOSba5',
            //   timeout: 30000,
            //   method: 'GET',
            //   headers: {
            //     'accept': 'application/json, text/plain, */*',
            //     'accept-encoding': 'gzip, deflate, br',
            //     'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
            //     'cookie': 'tt_webid=6886478503065126402; tt_webid_v2=6886478503065126402; _ga=GA1.2.849703431.1603383235; passport_csrf_token=94fa5faa79f77f8e61f7699af97917cf; store-idc=alisg; store-country-code=vn; s_v_web_id=verify_kgpw6m9u_QDielbJZ_3J37_4fmb_9H1T_My8enmAuzYuh; passport_auth_status=ad9a42c04cfe68a5409cc194ee6551bf%2C6ae083f17bbc90f7aaeb8ba8a1b407d4; odin_tt=ef763ff8461a3b67f0a3d15c5f8007a681f5b58d9f5f01cd526f771c9096a331128f3f2efe6c14d84fc358f915cc9175c77834a0ccd4140e204b995baaa653df; sid_guard=2fd3a5eb11abbf57116941805ffcf3cf%7C1603698101%7C5184000%7CFri%2C+25-Dec-2020+07%3A41%3A41+GMT; uid_tt=73c2ba701a2bcec69ad621b4632f74579c812a60085dfce5715e515be1eb388c; uid_tt_ss=73c2ba701a2bcec69ad621b4632f74579c812a60085dfce5715e515be1eb388c; sid_tt=2fd3a5eb11abbf57116941805ffcf3cf; sessionid=2fd3a5eb11abbf57116941805ffcf3cf; sessionid_ss=2fd3a5eb11abbf57116941805ffcf3cf; MONITOR_WEB_ID=60f39fd8-6b57-4fef-aeb3-2a9828d41b15',
            //     'sec-fetch-mode': 'no-cors',
            //     'sec-fetch-site': '*',
            //     'suser-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
            //   }
            // }, function (error, response, body) {
            //   console.log(body);
            //   // if (error) {
            //   //   console.log(error);
            //   //   event.sender.send("uploadFileResponseError" + idRender, error);
            //   // } else {
            //   //   response['data'] = body;
            //   //   console.log(response);
            //   //   event.sender.send("uploadFileResponseSuccess" + idRender, response);
            //   // }
            //})

            var request = require('request');
            request.get({
              url: 'https://www.tiktok.com/api/comment/list/?aid=1988&app_name=tiktok_web&device_platform=web_pc&referer=&user_agent=Mozilla%2F5.0+(Windows+NT+10.0%3B+Win64%3B+x64)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F86.0.4240.111+Safari%2F537.36&cookie_enabled=true&screen_width=1536&screen_height=864&browser_language=en-US&browser_platform=Win32&browser_name=Mozilla&browser_version=5.0+(Windows+NT+10.0%3B+Win64%3B+x64)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F86.0.4240.111+Safari%2F537.36&browser_online=true&ac=4g&timezone_name=Asia%2FSaigon&page_referer=https:%2F%2Fwww.tiktok.com%2F@cuongjin08%2Fvideo%3Flang%3Dvi&priority_region=&appId=1180&region=VN&appType=t&isAndroid=false&isMobile=false&isIOS=false&OS=windows&did=6886478503065126402&aweme_id=6886678312672972034&cursor=0&count=20&app_language=vi&current_region=VN&fromWeb=1&channel_id=0&verifyFp=verify_kglmgqkg_zqpCQkzf_uzZB_4bSx_AlFV_cnVuEExA6S3y&_signature=_02B4Z6wo00f01QQZKFAAAICD2hBZ4NWk0sUEGCzAAB6Wf2',
              timeout: 30000,
              method: 'GET',
              headers: {
                'accept': 'application/json, text/plain, */*',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
                'cookie': 'tt_webid=6886478503065126402; tt_webid_v2=6886478503065126402; _ga=GA1.2.849703431.1603383235; _gid=GA1.2.624802195.1603383235; s_v_web_id=verify_kglmgqkg_zqpCQkzf_uzZB_4bSx_AlFV_cnVuEExA6S3y; passport_csrf_token=94fa5faa79f77f8e61f7699af97917cf; odin_tt=d019645a9b1ce801cdf3692f33c7b24120d0e079155f1d8f15c5789c0692e7515fb957b41abc229381f9907656bace8396591e80fcf6a9e3da63dd504fbb477d; passport_auth_status=6ae083f17bbc90f7aaeb8ba8a1b407d4%2C; sid_guard=1a082ef2a6a135dfa5c4b26ee1cb9eba%7C1603436091%7C5184000%7CTue%2C+22-Dec-2020+06%3A54%3A51+GMT; uid_tt=bc692c64de7f7af248b838d042cc675aa0929bb69b4c8b5bfa1a81a2891ae8d6; uid_tt_ss=bc692c64de7f7af248b838d042cc675aa0929bb69b4c8b5bfa1a81a2891ae8d6; sid_tt=1a082ef2a6a135dfa5c4b26ee1cb9eba; sessionid=1a082ef2a6a135dfa5c4b26ee1cb9eba; sessionid_ss=1a082ef2a6a135dfa5c4b26ee1cb9eba; store-idc=alisg; store-country-code=vn; MONITOR_WEB_ID=60f39fd8-6b57-4fef-aeb3-2a9828d41b15; _gat_gtag_UA_144727112_1=1',
                'sec-fetch-mode': 'no-cors',
                'sec-fetch-site': '*',
                'suser-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
              }
            }, function (error, response, body) {
              console.log(body);
              if (error) {
                console.log(error);
                event.sender.send("uploadFileResponseError" + idRender, error);
              } else {
                response['data'] = body;
                console.log(response);
                event.sender.send("uploadFileResponseSuccess" + idRender, response);
              }
            })

            
          })
      })
  }

}
