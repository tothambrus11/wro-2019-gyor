<?php
/**
 * Created by Ambrus Tóth.
 * Date: 2019. 03. 24.
 * Time: 11:19
 */

class Home extends CI_Controller
{
    public function index(){
        // TODO home page
        if(Account_model::$logged_in){
            $this->logged_in_home();
        }
        else{
            $this->landing();
        }
    }

    public function landing(){
        // TODO landing page
        $this->load->view("_templates/header");
        $this->load->view("landing");
        $this->load->view("_templates/footer");

    }

    private function logged_in_home()
    {
        $this->load->view("_templates/header");
        $this->load->view("_templates/menu");
        $this->load->view("_templates/footer");
        // TODO Logged in page
    }

}
