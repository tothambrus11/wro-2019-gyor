<?php
/**
 * Created by Ambrus Tóth.
 * Date: 2019.02.26.
 * Time: 15:51
 * @property ThingCoin_model ThingCoin_model
 */

/**
 * Class Warehouse
 * "robot_auth" post key is required for all methods
 * @property ThingCoin_model ThingCoin_model
 */
/*class Warehouse extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        require_robot_auth();
    }

    public function index()
    {
        echo "hello";
    }

    public function hello()
    {
        echo "HelloWorld";
        $this->ThingCoin_model->offer(array("hello" => "world"));
    }

    public function get_things_in_front_of_warehouse(){
        json_output($this->ThingCoin_model->get_things_in_front_of_warehouse());
    }

}*/