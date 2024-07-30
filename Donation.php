<?php
// first thing is to start session 
session_start();
// now to check if variable is true
$_SESSION["tab"] = "Donation";
if(!$_SESSION['anything'])
{
    header('location:login.php');
}

include('header.php');

echo '
	<form name="newDonation" action = "newdonate.php"  method = "POST">
	<h2>New Donation</h2>
	<br>

	<p>  
	<label>Personal Id:</label>  
	<br>
	<input type = "Number" name  = "pid" class="input" required/>  
	</p>  

	<p>  
	<label>Units of blood donated:</label>  
	<br>
	<input type = "Number" maxlength="1" name  = "units" class="input" required/>  
	</p>  

	<p>
	<button >Submit</button>
	</p>
	</form>';

?>



 <?php include('foot.php');
 ?>