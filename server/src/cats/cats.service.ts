import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { ResultData } from 'src/libs/result'
import axios from 'axios'

@Injectable()
export class CatsService {
  constructor(private HttpService: HttpService) {}

  // findAll(): Observable<AxiosResponse<Cat[]>> {
  //   return this.httpService.get('http://localhost:3000/cats');
  // }

  async wxlogin(data:any): Promise<any>{
    console.log(data,'data');

    // let res = this.httpService.post('https://example.com/onLogin',{code: data.code});
    
   
  

    let url = `https://api.weixin.qq.com/sns/jscode2session?appid=wxd4c6356695a9c536&secret=4c57f69e64ab18dfc671be961a602b00&js_code=${data.code}&grant_type=authorization_code";`


    
    let res3 =await axios.get(url)
    // let res3 = await axios.post('https://example.com/onLogin',code)
    // let res =   this.HttpService.get('http://127.0.0.1:5051/aaa');
    console.log(res3.data,'res3');
    // console.log(res3.data,'res3');
    
    
    return ResultData.ok(res3.data)
    // return await this.httpService.get('http://localhost:3000/cats');
    // return 'wxlogin'
  }
}