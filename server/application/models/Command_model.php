<?php


class Command_model extends CI_Model
{
	public static $TABLE_NAME = "commands";


	/**
	 * @param $status boolean
	 * @param $command_name string
	 */
	public function update_status($command_name, $status){
		$this->db->update(self::$TABLE_NAME, array("should_start" => $status), array("command_name" => $command_name));
	}

	/**
	 * @param $command_name string
	 */
	public function get_status($command_name){
		$ra = $this->db->get_where(self::$TABLE_NAME, array("command_name" => $command_name), 1)->result_array();
		if(sizeof($ra) == 1){
			return $ra[0]["should_start"];
		}
		else{
			return "error";
		}
	}

    public function insertCommand($topic, $message)
    {
        $this->db->insert(self::$TABLE_NAME, array("topic" => $topic, "message" => $message));

    }

    public function getLastCommand()
    {
        $this->db->order_by("id", "DESC");
        $result = $this->db->get(self::$TABLE_NAME, 1);
        if($result->num_rows() < 1) return null;
        $array = $result->result_array();
        return $array[0];
    }
}
