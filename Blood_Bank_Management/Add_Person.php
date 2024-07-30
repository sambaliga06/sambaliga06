<?php
session_start();
$_SESSION["tab"] = "Add Person";

if(!$_SESSION['anything'])
{
    header('location:login.php');
}

include('header.php');
?>
<form name="addPerson" action = "addperson.php"  method = "POST">
	<h2>New Registration</h2>
	<br>

	<?php
	if(isset($_SESSION["entry_error"])){
		echo "<p class='error'>" .$_SESSION["entry_error"]. "</p>";
		unset($_SESSION["entry_error"]);
	}
	?>
	
	<p>  
	<label>First Name: </label>  &emsp;
	
	<input type = "text" name  = "fname" class="input" />  
	</p>  

		
	<p>  
	<label>Last Name: </label>  &emsp;
	
	<input type = "text" name  = "lname" class="input" />  
	</p>  


	<p>  
	<label>Phone Number: </label>  &emsp;
	
	<input type = "Number" name  = "phone" maxlength=10 class="input" required />  
	</p>  

	<p>  
	<label>Gender:</label><br>&emsp;
	<input type="radio" id="male" name="gender" value="m" required>
	<label for="male">Male</label> &emsp;

	<input type="radio" id="female" name="gender" value="f" required>
	<label for="female" >Female</label> &emsp;

	<input type="radio" id="other" name="gender" value="o" required>
	<label for="other" >Other</label>
	</p>  

	<p>
	<label>Date of birth: </label>  &emsp;
	
	<input type = "date" name  = "dob" class="input" required/>  
	</p>  

	<p>
	<label>Blood Group:</label>&emsp;
	
	<select name="blood_group" class="input" required>
	<option value="A+">A+</option>
	<option value="A-">A-</option>
	<option value="B+">B+</option>
	<option value="B-">B-</option>
	<option value="O+">O+</option>
	<option value="O-">O-</option>
	<option value="AB+">AB+</option>
	<option value="AB-">AB-</option>

	</select>
	</p>

	<p>
	<label>Address:&emsp;</label><br>
	<textarea rows="3" cols="50" name="address" class="input area" required></textarea>
	</p>

	<p>
	<label>Medical Issues(if any)&emsp;:</label>
	<br>
	<textarea rows="1" cols="50" name="med_issues" class="input area"></textarea>

	</p>
	<p>
	<button type="submit" name="submit">Register</button>
	</p>
	</form>
</div>



<?php include('foot.php');
 ?>