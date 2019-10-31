<?php
/**
 * Created by Ambrus Tóth.
 * Date: 2019.02.26.
 * Time: 16:10
 */

class ThingCoin_model extends CI_Model
{

	public static $TABLE_NAME = "offered_things";

	public function offer($thing)
	{
		$this->db->insert(self::$TABLE_NAME, $thing);
		return ($this->db->affected_rows() != 1) ? false : true;
	}

	/**
	 * @param string $order
	 * @param string $order_by
	 * @return array Result array(
	 */
	public function get_my_offers($order = null, $order_by = null)
	{
		if ($order == null) $order = "ASC";
		if ($order_by == null) $order = "id";

		$this->db->order_by($order_by, $order);
		return $this->db->get_where(self::$TABLE_NAME, array("supplier_id" => Account_model::$user_id))->result_array();
	}

	public function get_orders()
	{
		return $this->db->get_where(self::$TABLE_NAME, array("status !=" => "delivered"))->result_array();
	}

	public function get_things_in_front_of_warehouse()
	{
		$this->db->where("status", "front_of_warehouse_1");
		$this->db->or_where("status", "front_of_warehouse_2");
		return $this->db->get(self::$TABLE_NAME)->result_array();
	}

	public function get_others_offers_for_order($order, $order_by)
	{
		$this->db->where_in('status', array("SUPPLIER", "WAREHOUSE"));
		$this->db->where("supplier_id !=", Account_model::$user_id);
		$this->db->where("recipient_id", "-1");

		$this->db->order_by($order_by, $order);
		return $this->db->get(self::$TABLE_NAME)->result_array();
	}

	public function update_status($id, $status)
	{
		$this->db->update(self::$TABLE_NAME, array("status" => $status), array("id" => $id));
	}

	public function update_delivery_date($id, $delivery_date)
	{
		$this->db->update(self::$TABLE_NAME, array("delivery_date" => $delivery_date), array("id" => $id));
	}

	/**
	 * @param $thing_id
	 * @return mixed
	 * @throws Exception
	 */
	public function get_things($thing_id)
	{
		$r = $this->db->get_where(self::$TABLE_NAME, array("id" => $thing_id), 1)->result_array();
		if(sizeof($r) == 1) {
			return $r[0];
		}
		else{
			throw new Exception("Thing not found");
		}
	}

	public function do_order($thing_id, $user_id, $user_x, $user_y)
	{
		$this->db->update(self::$TABLE_NAME, array("dest_x" => $user_x, "dest_y" => $user_y, "order_date" => $this->get_date(), "recipient_id" => $user_id), array("id" => $thing_id), 1);
	}

	private function get_date()
	{
		return date('Y-m-d H:i:s');
	}

	public function get_my_orders(){
		return $this->db->get_where(self::$TABLE_NAME, array("recipient_id" => Account_model::$user_id))->result_array();
	}
}
