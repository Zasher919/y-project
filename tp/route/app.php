<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------
use think\facade\Route;

//Route::get('think', function () {
//    return 'hello,ThinkPHP6!';
//});
//
//Route::get('hello/:name', 'index/hello');

Route::group(function(){
  Route::get('token', 'index/hello1');
});

Route::group(function(){
  Route::get('login', 'index/hello2');
})->middleware(\app\middleware\JWT1::class);
