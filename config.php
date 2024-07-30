

<?php
// Here change variables with your own settings
$mysqlhost='localhost';
$mysqlusername='root';
$mysqlpassword=''; 
$mysqldb='bbank';
if(!$conn=mysqli_connect($mysqlhost,$mysqlusername,$mysqlpassword,$mysqldb)){
    die("failed to connect");
}

?>
