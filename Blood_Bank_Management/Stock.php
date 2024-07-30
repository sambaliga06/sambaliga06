<?php
// first thing is to start session 
session_start();
// now to check if variable is true
$_SESSION["tab"] = "Check Stock";
if(!$_SESSION['anything'])
{
    header('location:login.php');
}

include('header.php');

$sql = "select * from Stock";  
    
$result = $conn->query($sql);


if ($result->num_rows > 0) {

    echo "<h2>Stock</h2><br>";    
    echo "<table><tr><th> Blood Group  &emsp;</th><th>  Units of blood &emsp;</th></tr>";

        // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<tr><td> " . $row["s_bgroup"]. " </td><td> " . $row["s_qty"]." </td></tr>";
    }
    echo "</table>";
}
?>



 <?php include('foot.php');
 ?>