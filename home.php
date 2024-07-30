<?php
// first thing is to start session 
session_start();
// now to check if variable is true
$_SESSION["tab"] = "Home";
if(!$_SESSION['anything'])
{
    header('location:login.php');
}

include('header.php');
?>
<h3 class="text-center text-danger" > Your Donations matter </h3>
<br>We gave blood to many people  from our stock in case of emergency<br>
	We are glad to say that we have made a successful service to the society</p>


   <span style="margin-left:25%"> <img src="blood.png" alt="blood drop" style="width:200px;height:200px; " class="center"></span>
<br><br><br>
<p style="margin-left:6%; font-size: 30px;"><b>“One pint can save three lives.”</p>
 

 <?php include('foot.php');
 ?>