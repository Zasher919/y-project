<?php
namespace app\admin\controller;

use app\common\controller\Base;
use app\BaseController;

class Index extends BaseController
{
  public function index()
  {
//    return '管理后台';

    return Base::returnInfo(10000,['name'=>'张三']);
  }

  public function hello1()
  {
    $id = $this->request->param("id",'','htmlspecialchars');

    $token = signToken($id);


    checkToken($token);

    return checkToken($token);
//    return ' ' . signToken($id);
  }

  public function hello2()
  {
    return '通过jwt token验证';
  }
}
