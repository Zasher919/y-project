<?php

namespace app\controller;
use app\model\Test;
//use think\Request;

//use think\Request;
//使用 Facade 方式应用于没有进行依赖注入时使用 Request 对象的场合；
use think\facade\Request;
class TestModel
{
//  public function index(Request $request)
  public function index()
  {
    header('Access-Control-Allow-Origin: *');
//    return input('sex');
    $test = Request::param();

    return json($test);
//    $data = [
//      'url'=> Request::url(),
//    ];
//    return $request->param(['name','age']);

//      Request::post($data);
//    return Test::select();
  }


  public function add()
  {
    $data = Request::param();
    // 方式一
       Test::create($data);
       return 'add ok';
    // 方式二
//    $test = new Test();
//    $test->save($data);
//    return $test->id;
  }

  public function del()
  {
    // 方式一
    // Test::find(2)->delete();
    // 方式二  可传数组批量删除
    // Test::destroy(4);
    // 方式三
     Test::where('id','=',5)->delete();

    return 'del ok';
  }

  public function update()
  {
    // 方式一
//    $data = [
////      'id' => 1, // 方式一修改无需id
//      'name' => '二号',
//      'sex' => 0,
//      'addr' => '广东',
//    ];

    $data = Request::param();

//    return json($data['id']);
    Test::update($data,['id'=>$data['id']]);
//    Test::create($data);
//     方式二
//    $update = Test::find(1);
//    $update->saveAll($data);

    return 'update ok';
  }

  public function get()
  {
    // 方式一  指定数据
    // return Test::find(1);

    // 方式二  条件筛选
    // return Test::where('id',1)->find();
    // return Test::where('addr','上海')->find();

    // 3
//    $test = Test::select([7,8,9]);
//    foreach ($test as $key=>$obj){
//      echo $obj;
//    }

    // 4
//    $test = Test::where('id','>',1)->limit(3)->order('id','desc')->select();

    // 取某个字段的值
//    $test = Test::where('id',7)->column('name');
//    $test = Test::whereIn('id',[7,8,9])->column('name');
    // 模型支持聚合查询：max、min、sum、count、avg 等；
    $test = Test::sum('money');

    return json($test);

    return 'get ok';
  }

}
