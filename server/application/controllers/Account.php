<?php
/**
 * Created by Ambrus Tóth.
 * Date: 2019. 03. 24.
 * Time: 11:00
 * @property Account_model Account_model
 */

class Account extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		if (Account_model::$logged_in) {
			redirect("/account/profile");
		} else {
			redirect("/account/login");
		}
	}

	public function profile()
	{
		echo "profile"; // TODO profile
	}


	public function login()
	{
		$username = $this->input->post("username");
		$password = $this->input->post("password");

		if (!$username || !$password) {
			// Load login form
			$this->load->view("_templates/header", array("title" => "Login"));
			$this->load->view("account/login_form");
			$this->load->view("_templates/footer");
		} else {
			// Login user
			if (!Validator::is_alphanumeric($username) || !Validator::is_alphanumeric($password)) {
				js_alert("Please enter valid username!", base_url("account/login"));
			}
			if ($this->Account_model->login_user($username, Validator::encrypt($password))) {
				js_alert("Successfully logged in!", base_url("home"));
			} else {
				js_alert("Wrong username or password!", base_url("account/login/"));
			}
		}
	}

	public function register()
	{
		if ($this->input->post("username") &&
			($this->input->post("password") &&
				$this->input->post("email"))) {
			if (Validator::is_valid_username($this->input->post("username")) &&
				Validator::is_valid_email($this->input->post("email"))) {

				try {
					$this->Account_model->register_user(
						$this->input->post("username"),
						$this->input->post("password"),
						$this->input->post("email")
					);
				} catch (Exception $exception) {
					switch ($exception->getMessage()) {
						case "unavailable_username":
							js_alert("This username\'s already registered.", base_url("account/register"));
							break;
						case "unavailable_email":
							js_alert("This email address\'s already registered.", base_url("account/register"));
							break;

					}
				}
				js_alert("Successful registration. Please log in to continue!", base_url("account/login"));
			} else {
				js_alert("Please enter valid data!", base_url("account/register"));
			}
		} else {
			// Load register form
			$this->load->view("_templates/header", array("title" => "Registration"));
			$this->load->view("account/registration_form");
			$this->load->view("_templates/footer");
		}

	}

	function dashboard()
	{
		require_login();

		$this->load->view("_templates/header");
		$this->load->view("_templates/menu");
		$this->load->view("account/dashboard");
		$this->load->view("_templates/footer");
	}

	function logout()
	{
		$this->Account_model->log_out();
		redirect("/");
	}
}
