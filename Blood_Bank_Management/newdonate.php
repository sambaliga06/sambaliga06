<?php
session_start();
$_SESSION["tab"] = "Donation";
if(!$_SESSION['anything'])
{
    header('location:login.php');
}


else{
    include_once('header.php'); 
    $pid = $_POST['pid'];  
    $units = $_POST['units']; 
    date_default_timezone_set("Asia/Calcutta"); 
    $date = date('y-m-d');
    $time = date('h:i');

    $sql_1 = "insert into `donation` (`p_id`, `d_date`, `d_time`, `d_quantity`) values('$pid', '$date', '$time', '$units')";  
    $sql_2 = "update  `stock` SET `s_qty` = `s_qty`+ '$units' where `stock`.`s_bgroup` = (select `p_bgroup` FROM `patient` where `p_id` = '$pid')";

    if (($conn->query($sql_1) === TRUE) and ($conn->query($sql_2) === TRUE)) {
###########contents of div goes here###########
        echo 'your donation is succesful';
###############################################
    }
    else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    include_once('foot.php');
}
?>