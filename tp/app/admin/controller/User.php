<?php

namespace app\admin\controller;

use think\facade\Db;
//use think\Db;
use app\admin\model\User as Model;
use think\facade\Request;

class User
{
  public function index()
  {
//      return '123';

//    $user = Db::name('user')->select();

    return Model::select();
  }

  public function login()
  {
    return 'admin add user';
  }

  public function add()
  {
    $data = Request::param();
    $res = Model::create($data);
    return json($res);
    return 'admin add user';
  }

  public function delete()
  {
    return 'admin add user';
  }

  public function update()
  {
    return 'admin add user';
  }

  public function find()
  {
    return 'admin add user';
  }
}
