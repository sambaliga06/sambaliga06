<?php      
include('config.php');

echo '
<!doctype html>
<html lang="en">

<head>
  <title>home page</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS v5.2.1 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
    <style>
    table {
      border-collapse: collapse;
      font-size: 0.9em;
      font-family: sans-serif;
      min-width: 400px;
      
    
    }
    tr {
      border: 1px solid white;
      color: #fff;
      text-align: left;
    }
    th{
      padding: 12px 15px;
      border: 2px solid white;
      color: red;
      text-align: left;
    }
    td{
      border: 2px solid white;
      padding: 12px 15px;
    }
</style>

</head>

<body class="bg-dark text-white">
  <header>
    <!-- place navbar here -->
    <nav class="navbar bg-danger  p-3 border border-4">
  <div class="container-fluid">
    <span class="navbar-brand text-white mb-0 h1 ">Blood bank management system</span>
    <a href="logout.php"> <button type="button" class="btn btn-outline-light" >Logout</button></a>

</ul>
  </div>
  
</nav>
  </header><br>
  <div class="d-flex justify-content-evenly " style="height: 650px; margin-right: 10%;">
  <nav class="nav flex-column bg-danger text-center w-50 p-3 fs-3 --bs-danger-text-emphasis">';
  if  ($_SESSION["tab"] == "Home")
	echo'<span class="border border-white bg-dark">
<a class="nav-link active" aria-current="page" href="home.php">Home</a></span>';
else
	echo'<span class="border border-white "><a href="home.php">Home</a></span>';

  if  ($_SESSION["tab"] == "Add Person")
	echo'<span class="border border-white bg-dark "> <a href="Add_Person.php" class = "nav-link active" aria-current="page">Add Person</a></span>';
else
	echo'<span class="border border-white"><a href="Add_Person.php">Add Person</a></span>';

  if  ($_SESSION["tab"] == "Search Person")
	echo'<span class="border border-white bg-dark"><a href="Search_Person.php" class = "nav-link active" aria-current="page">Search Person</a></span>';
else
	echo'<span class="border border-white"><a href="Search_Person.php">Search Person</a></span>';

  if  ($_SESSION["tab"] == "Donation")
	echo'<span class="border border-white bg-dark"><a href="Donation.php" class = "nav-link active" aria-current="page">Donation</a></span>';
else
	echo'<span class="border border-white"><a href="Donation.php">Donation</a></span>';

  if  ($_SESSION["tab"] == "Receive")
	echo'<span class="border border-white bg-dark"><a href="Receive.php" class = "nav-link active" aria-current="page">Receive</a></span>';
else
	echo'<span class="border border-white"><a href="Receive.php">Receive</a></span>';

  if  ($_SESSION["tab"] == "Check Stock")
	echo'<span class="border border-white bg-dark"><a href="Stock.php" class = "nav-link active" aria-current="page">Check Stock</a></span>';
else
	echo'<span class="border border-white"><a href="Stock.php">Check Stock</a></span>';


  if  ($_SESSION["tab"] == "Donation History")
	echo'<span class="border border-white bg-dark"><a href="DonateHistory.php" class = "nav-link active" aria-current="page">Donation History</a></span>';
else
	echo'<span class="border border-white"><a href="DonateHistory.php">Donation History</a></span>';

  if  ($_SESSION["tab"] == "Receive History")
	echo'<span class="border border-white bg-dark"><a href="ReceiveHistory.php" class = "nav-link active" aria-current="page">Receive History</a></span>';
else
	echo'<span class="border border-white"><a href="ReceiveHistory.php">Receive History</a></span>';
echo '</nav>';
 
 
  


?>
<div class="flex-column w-50" style="margin-left: 10%;">