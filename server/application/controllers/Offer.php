<?php
/**
 * Created by Ambrus Tóth.
 * Date: 2019. 03. 24.
 * Time: 16:35
 * @property ThingCoin_model ThingCoin_model
 */

class Offer extends CI_Controller
{
    public function index()
    {
        require_login();

        $this->load->view("_templates/header");
        $this->load->view("_templates/menu");
        $this->load->view("offer/offer_form");
        $this->load->view("_templates/footer");
    }

    /**
     * It does the offer
     */
    public function do_offer()
    {
        require_login();
        $required_fields = array("pos_x", "pos_y", "thing_name", "details", "dir");
        foreach ($required_fields as $field) {
            if ($this->input->post($field) == null) {
                invalid_field_error($field, false, base_url("offer"));
            }
        }

        $number_fields = array("pos_x", "pos_y");
        foreach ($number_fields as $number_field) {
            if (!Validator::is_numeric($this->input->post($number_field))) {
                invalid_field_error($number_field, false, base_url("offer"));
            }
        }

        if ($this->input->post("dir") != "horizontal" && $this->input->post("dir") != "vertical") {
            invalid_field_error("dir", false, base_url("offer"));
        }

        if ($this->ThingCoin_model->offer(array(
            "thing_name" => $this->input->post("thing_name"),
            "details" => $this->input->post("details"),
            "supplier_id" => Account_model::$user_id,
            "start_x" => $this->input->post("pos_x"),
            "start_y" => $this->input->post("pos_y"),
            "start_dir" => $this->input->post("dir"),
            "status" => "SUPPLIER",
            "offer_date" => date('Y-m-d G:i:s', time())
        ))) {
			//$this->load->model("Command_model");
			//$this->Command_model->update_status("pick_up_from_supplier", true);

			js_alert("Thank you for your offer!", base_url("offer/my_offers"));
        } else {
            js_error("Something went wrong during the offer. Please try again!");
        }
    }

    public function my_offers()
    {
        require_login();

        $order = $this->input->post("order");
        $order_by = $this->input->post("order_by");

        $this->load->view("_templates/header", array("title" => "My offers"));
        $this->load->view("_templates/menu");
        $this->load->view("offer/my_offers");
        $this->load->view("_templates/footer");
    }

    public function get_my_offers(){
        require_login(true);
        $order = $this->input->post("order");
        $order_by = $this->input->post("order_by");


        json_output($this->ThingCoin_model->get_my_offers($order, $order_by));
    }

}
