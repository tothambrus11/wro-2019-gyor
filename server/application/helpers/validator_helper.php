<?php

class Validator
{
    public static function is_valid_date($date)
    {
        $tempDate = explode('-', $date);
        // checkdate(month, day, year)
        return checkdate($tempDate[1], $tempDate[2], $tempDate[0]);
    }

    public static function is_alphanumeric($string)
    {
        return !preg_match('/[^a-z_\-0-9\á\í\ű\ő\ü\ö\ú\ó\é\Á\Í\Ű\Ő\Ü\Ö\Ú\Ó\É ]/i', $string);
    }

    public static function is_alphanumeric_or_percentage($string)
    {
        return !preg_match('/[^a-zA-Z_\-0-9\á\í\ű\ő\ü\ö\ú\ó\é\Á\Í\Ű\Ő\Ü\Ö\Ú\Ó\É %]/i', $string);
    }

    public static function encrypt($text)
    {
        return hash("sha256", $text);
    }

    public static function is_valid_email($email)
    {
        if (trim($email) === "") return false;
        return (filter_var($email, FILTER_VALIDATE_EMAIL));
    }

    public static function is_numeric($id)
    {
        return is_numeric($id);
    }

    public static function is_valid_username($string)
    {
        return !preg_match('/[^a-zA-Z_\-0-9\á\í\ű\ő\ü\ö\ú\ó\é\Á\Í\Ű\Ő\Ü\Ö\Ú\Ó\É\.\,\- %]/i', $string);

    }
}
