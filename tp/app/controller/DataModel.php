<?php
namespace app\controller;
use app\model\User;
class DataModel
{
    public function index()
    {
//        return 'datamodel';
        return User::select();
    }
}