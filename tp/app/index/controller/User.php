<?php

namespace app\index\controller;
use app\BaseController;
use app\model\UserModel;
use think\facade\Db;


class User extends BaseController{

    public  function index()
    {
        return 'user idnex';
    }

    public function getUser()
    {

        $user = Db::name('user')->select();

//        return Db::getLastSql();
        return json($user);

    }

    public function getModelUser()
    {
        $user = new UserModel();

        return $user::select();
    }



}
