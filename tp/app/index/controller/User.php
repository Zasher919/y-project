<?php

namespace app\controller;
use app\BaseController;
use think\facade\Db;
use app\model\UserModel;


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