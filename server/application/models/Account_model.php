<?php
/**
 * Created by Ambrus Tóth.
 * Date: 2019. 03. 24.
 * Time: 10:50
 */

class Account_model extends CI_Model
{
    public static $TABLE_NAME = "users";
    public static $username = "";
    public static $user_id = 0;
    public static $logged_in = FALSE;

    public function __construct()
    {
        parent::__construct();

        $this->session->sess_expiration = $this->config->item("session_time");// expires in 4 hours

        $username = $this->session->userdata('username');
        $password_hash = $this->session->userdata('password_hash');
        $this->login($username, $password_hash);
    }

    function login($username, $password_hash, $print_error = FALSE)
    {
        $this->db->select("id");
        $this->db->where("username", $username);
        $this->db->where("password_hash", $password_hash);
        $this->db->limit(1);
        $query = $this->db->get(self::$TABLE_NAME);
        $row = $query->row();
        if ($row) {
            self::$user_id = $row->id;
            self::$username = $username;
            self::$logged_in = TRUE;
            return TRUE;
        } else {
            if ($print_error) {
                die("Login error");
            }
            return FALSE;
        }
    }

    function login_user($username, $password_hash)
    {
        if (self::login($username, $password_hash)) {
            $this->session->set_userdata("username", $username);
            $this->session->set_userdata("password_hash", $password_hash);
            self::$logged_in = TRUE;

            return TRUE;
        } else {
            return FALSE;
        }
    }

    function log_out()
    {
        self::$logged_in = FALSE;
        $this->session->set_userdata("username", "");
        $this->session->set_userdata("password_hash", "");
    }

    function get_username_by_id($id)
    {
        $this->db->select("username");
        $this->db->where("id", $id);
        $this->db->limit(1);
        $row = $this->db->get(self::$TABLE_NAME)->row();
        if ($row != NULL) {
            return $row->username;
        } else {
            return NULL;
        }
    }

    function is_available_username($username)
    {
        $this->db->select("id");
        $this->db->where("username", $username);
        $query = $this->db->get(self::$TABLE_NAME);
        return $query->num_rows() == 0;
    }

    function register_user($username, $password, $email)
    {
        //todo Andris nem engedi a speciális karaktereket regisztálásnál

        if (!$this->is_available_username($username)) {
            throw new Exception("unavailable_username");
        } else if (!$this->is_available_email($email)) {
            throw new Exception("unavailable_email");
        } else {
            $this->db->insert(self::$TABLE_NAME, array(
                "username" => $username,
                "password_hash" => Validator::encrypt($password),
                "email" => $email
            ));
            return ($this->db->affected_rows() == 1) ? TRUE : FALSE;
        }

    }

    public function get_user_field($col, $user_id)
    {
        $this->db->select($col);
        $row = $this->db->get_where(self::$TABLE_NAME, array("id" => $user_id))->row();
        return $row->$col;
    }

    public function set_user_field($col, $user_id, $value)
    {
        $this->db->where("id", $user_id);
        $this->db->update(self::$TABLE_NAME, array($col => $value));
    }

    public function increase_field($field, $user_id, $delta)
    {
        $this->set_user_field($field, $user_id, $this->get_user_field($field, $user_id) + $delta);
    }

    public function decrease_field($field, $user_id, $delta)
    {
        $this->set_user_field($field, $user_id, $this->get_user_field($field, $user_id) - $delta);
    }

    public function is_available_email($email)
    {
        $this->db->select("id");
        $this->db->where("email", $email);
        $query = $this->db->get(self::$TABLE_NAME);
        return $query->num_rows() == 0;
    }

    public function get_users($fields)
    {

        $this->db->select($fields);
        $query = $this->db->get(self::$TABLE_NAME);
        return $query->result_array();
    }

}
