<?php
/**
 * Created by Ambrus Tóth.
 * Date: 2019. 04. 18.
 * Time: 18:26
 * @property ThingCoin_model ThingCoin_model
 */

class Car extends CI_Controller
{
    function get_orders(){
        //require_robot_auth();
        json_output($this->ThingCoin_model->get_orders());
    }

    /**
     * For testing the connection
     */
    function test(){
        json_output(array("message" => "ok"));
    }
}
