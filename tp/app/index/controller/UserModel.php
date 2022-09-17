<?php
namespace app\index\controller;
use app\index\model\User;

class UserModel
{
    public function index()
    {
        return User::select();
    }

    public function add()
    {
      $data = [
          'id' => '1',
          'openid'=> '', // 微信身份标识
          'password'=> '123456',    // 32位小写MD5密码
          'phone'=> '13511111111', // 手机号
          'username'=> '小白', // 用户名
          'is_enabled'=> 1, // 是否启用
          'nickname'=> '小白', // 用户昵称
          'img'=> '', // 头像URL
          'sex'=> 1, // 性别标志：0，其他；1，男；2，女
          'balance'=> '100', // 账户余额
          'birth'=> '', // 生日
          'money'=> '200', // 账户总金额
      ];

      $add = User::create($data);


    }

  public function delete()
  {

  }

  public function update()
  {

  }

  public function query()
  {

  }


}
