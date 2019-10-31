<?php

/**
 * @param string $text The text to alert
 * @param string $redirect_url The browser will redirect the user after clicking the ok button
 */
function js_alert($text = "", $redirect_url = false, $die = true)
{
    $script = 'alert("' . htmlspecialchars($text) . '");';
    if($redirect_url)
    {
        $script .= "window.location.href = '" . $redirect_url . "'";
    }
    js_output($script, $die);
}

function json_output($message)
{
    header('Content-Type: application/json');
    die(json_encode($message));
}

function json_error($message)
{
    json_output(array("error" => $message));
}

/**
 * @param string $message
 * @param string $redirect_url
 */
function js_error($message, $redirect_url = false)
{
    js_alert("Error: " . $message, $redirect_url, true);
}

function js_output($script = false, $die = true)
{
    if ($script) {
        echo "<script>" . $script . "</script>";
    }
    if ($die) die();
}

function invalid_field_error($field_name, $print_as_json = false, $redirect_url = false)
{
    if($print_as_json){
        json_error("Invalid field: " . $field_name);
    }
    else{
        js_error("Invalid field: ". $field_name, $redirect_url);
    }
}