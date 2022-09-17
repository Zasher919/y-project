<?php
namespace app\admin\controller;

use app\common\controller\Base;
class Index
{
  public function index()
  {
//    return '管理后台';

    return Base::returnInfo(10000,['name'=>'张三']);
  }
}
