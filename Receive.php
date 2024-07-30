<?php
// first thing is to start session 
session_start();
// now to check if variable is true
$_SESSION["tab"] = "Receive";
if(!$_SESSION['anything'])
{
    header('location:login.php');
}

include('header.php');

echo '<form name="addPerson" action = "newreceive.php"  method = "POST">
	<h2>New Receive</h2>
	<br>

	<p>  
	<label>Personal Id:</label>  
	<br>
	<input type = "Number" name  = "pid" class="input" required/>  
	</p>  

	<p>  
	<label>Units of blood Received:</label>  
	<br>
	<input type = "Number" maxlength="1" name  = "units" class="input" required/>  
	</p>  

	<p>  
	<label>Admitted Hospital:</label>  
	<br>
	<input type = "text" name  = "hospital" class="input" required/>  
	</p>  

	<p>
	<button >Submit</button>
	</p>



	</form>';

?>



 <?php include('foot.php');
 ?>