<?php
// 应用公共文件

use Firebase\JWT\JWT;

//生成验证

function signToken($uid)
{
  $key = '!@#$%^&*'; // 这里是自定义的一个随机字符串, 应该写在config 文件中的, 解密时也会用 , 相当于加密中常用的盐 salt

  $token = array(
    "iss" => $key,      // 签发者, 可以为空
    "aud" => '' ,       // 面像的用户,可以为空
    "iat" => time(),    // 签发时间
    "nbf" => time()+3,  // 在什么时候jwt开始生效, 这里表示生成100 秒后才生效
    "exp" => time()+60, // token 过期时间 , 这里只是演示设置的分钟
    "data"=> [
      'uid' => $uid, // 记录的uid信息, 这里是自己添加上去的,如果有其他信息,可以再添加键值对
    ]
  );

  // print_r($token);
  $jwt = JWT::encode($token, $key, "HS256"); // 根据参数生成token
  return $jwt;
}

// 验证token
function checkToken($token)
{
  $key = '!@#$%^&*';
  $status = array("code"=>2);
  try {
    JWT::$leeway = 60; // 当前时间减去60, 把时间留点余地
    $decoded = JWT::decode($token, $key, array("HS256")); // HS256方式, 这里要和签发的时候对应
    $arr = (array)$decoded;
    $res['code'] = 1;
    $res['data'] = $arr['data'];
    return $res;
  }catch (\Firebase\JWT\SignatureInvalidException $e){ // 签名不正确
    $status['msg'] = '签名不正确';
    return $status;
  }catch (\Firebase\JWT\BeforeValidException $e){ // 签名在某个时间之后才能用
    $status['msg'] = 'token 失效';
    return $status;
  }catch (\Firebase\JWT\ExpiredException $e){ // token过期
    $status['msg'] = 'token 失效';
    return $status;
  }catch (ErrorException $e){
    $status['msg'] = '未知错误';
    return $status;
  }
}


