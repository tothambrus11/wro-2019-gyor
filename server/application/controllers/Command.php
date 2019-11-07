<?php

use Bluerhinos\phpMQTT;

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

    public function sendCommand($topic, $message)
    {

        $topic = str_replace("(PER)", "/", urldecode($topic));
        $message = str_replace("(PER)", "/", urldecode($message));

        $this->Command_model->insertCommand($topic, $message);

        $server = $this->config->item("ip_address");     // change if necessary
        $username = "";                   // set your username
        $password = "";                   // set your password

        $mqtt = new phpMQTT($server, $this->config->item("mqtt_port"), "php_mqtt_client");

        if ($mqtt->connect(true, NULL, $username, $password)) {
            $mqtt->publish($topic, $message, 0);
            $mqtt->close();
        } else {
            die("Mqtt connection error");
        }

        text_output();
        echo "ok";
    }

    function sendCommandWithoutMqtt($topic, $message){

        $topic = str_replace("(PER)", "/", urldecode($topic));
        $message = str_replace("(PER)", "/", urldecode($message));

        $this->Command_model->insertCommand($topic, $message);

        text_output();
        echo "ok";
    }

    public function getLastCommand()
    {
        text_output();
        $command = $this->Command_model->getLastCommand();
        if (!$command) {
            die("-");
        }
        echo
            $command["id"] . "\n" .
            $command["topic"] . "\n" .
            $command["message"] . "\n";
    }

}
