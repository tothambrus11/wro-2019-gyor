<?php
/**
 * Created by Ambrus Tóth.
 * Date: 2019. 04. 18.
 * Time: 18:25
 * @property ThingCoin_model ThingCoin_model
 * @property Command_model Command_model
 */

class Order extends CI_Controller
{
	public function index(){
		require_login();

		$this->load->view("_templates/header");
		$this->load->view("_templates/menu");
		$this->load->view("order/order_form");
		$this->load->view("_templates/footer");
	}

	public function do_order($thing_id, $pos_x, $pos_y){
		require_login();

		try{
			$thing = $this->ThingCoin_model->get_things($thing_id);
			if(Account_model::$user_id == $thing["supplier_id"]){
				js_alert("This item is offered by you. You can't order it!");
			}
			else if($thing["recipient_id"] != -1){
				js_alert("This item has been already ordered.");
			}
			else if($thing["status"] != "WAREHOUSE" && $thing["status"] != "SUPPLIER"){
				js_alert("You can't order this item now.");
			}
			else{
				$this->ThingCoin_model->do_order($thing_id, Account_model::$user_id, $pos_x, $pos_y);
				//$this->load->model("Command_model");
				//$this->Command_model->update_status("pick_up_from_warehouse", true);

                // TODO IDE ÍRNI A CUCCOT
                
				js_alert("Successful order! Please wait for the car to come!", base_url("order"));
			}
		}
		catch (Exception $exception){
			js_alert($exception->getMessage());
		}
	}

	public function get_others_offers(){
		require_login(true);
		$order = $this->input->post("order");
		$order_by = $this->input->post("order_by");

		$offers = $this->ThingCoin_model->get_others_offers_for_order($order, $order_by);
		json_output($offers);
	}

	public function my_orders(){

		$this->load->view("_templates/header");
		$this->load->view("_templates/menu");
		$this->load->view("order/my_orders");
		$this->load->view("_templates/footer");
	}

	public function get_my_orders(){
		require_login(true);

	}
}
