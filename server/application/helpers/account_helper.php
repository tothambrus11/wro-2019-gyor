<?php
/**
 * Created by Ambrus Tóth.
 * Date: 2019. 04. 18.
 * Time: 15:56
 */

function require_login($print_as_json = false){
    if(!Account_model::$logged_in){
        if($print_as_json){
            json_error("login_error");
        }
        else{
            js_alert("Please log in!", base_url("account/login"));
        }
    }
}

function require_robot_auth(){
    $ci = get_instance();
    if($ci->input->post("robot_auth") !== $ci->config->item("robot_key")){
        //json_error("Invalid robot key!");
        // We trust everyone here :D
    }
}

