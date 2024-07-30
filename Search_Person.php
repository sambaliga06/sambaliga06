<?php
// first thing is to start session 
session_start();
// now to check if variable is true
$_SESSION["tab"] = "Search Person";
if(!$_SESSION['anything'])
{
    header('location:login.php');
}
else{
    include_once('header.php');
	echo '
	<form name="searchPerson" action = "searchperson.php"  method = "POST">
	<h2>Search Person</h2>
	<br>

	<p>  
	<label>Personal ID: </label>  
	<br>
	<input type = "text" name  = "pid" class="input" required/>  
	</p>  

	<p>
	<button >Submit</button>
	</p>
	</form>';

	include('foot.php');

}
 ?>