<?php


/**
 * @property Command_model Command_model
 */
class Command extends CI_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->load->model("Command_model");
	}

	public function update_status($command_name, $status){
		$this->Command_model->update_status($command_name, $status);
	}

	public function get_status($command_name){
		header("Content-Type: text/plain");
		echo $this->Command_model->get_status($command_name);
	}

}
