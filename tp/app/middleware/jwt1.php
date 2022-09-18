<?php

namespace app\middleware;

use Firebase\JWT\JWT;
use think\facade\Request;

class jwt1
{
    /**
     * 处理请求
     *
     * @param \think\Request $requestd
     * @param \Closure       $next
     * @return Response
     */
    public function handle($request, \Closure $next)
    {
        //

      $token = $request->param()['id'];
      $data = checkToken($token);
      if($data['code'] != 1){
        return json(['status'=>500,'msg'=>'请先登录']);
      }

      return $next($request);
    }
}
