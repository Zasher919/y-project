<?php

namespace app\common\controller;

use think\facade\Config;

class Base
{
  /**
   * @param int $code code码
   * @param array $data 参数信息
   * @return '\think\response\Json'
   */

  public static function returnInfo($code,$data=[])
  {
    $msg = Config::get('code.'.$code);
    $rs = [
      'code' => $code,
      'msg'  => $msg,
      'data' => $data
    ];

    return json($rs);
  }

}
