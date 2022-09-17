<?php
namespace app\index\controller;
use app\index\model\User;

class DataModel
{
    public function index()
    {
//        return 'datamodel';
        return User::select();
    }
}
