<?php
if($_POST)
{
    include 'config.php';
    $username=$_POST['username'];
    $password=$_POST['password'];
    /*$nameerror=" ";
    $passerror=" ";
    $noconn=" ";
    if(isset($_POST["login"])){
      if(empty($username)){
        $nameerror="name is required";
        header('location:login.php');
      }
      if(empty($password)){
        $passerror="enter the password";
        header('location:login.php');
      }
    */
    $sUser=mysqli_real_escape_string($conn,$username);
    $sPass=mysqli_real_escape_string($conn,$password);
    // For Security 
    $query="SELECT * From login where username='$sUser' and password='$sPass'";
    $result=mysqli_query($conn,$query);
    if(mysqli_num_rows($result)==1)
    {
        session_start();
        $_SESSION['anything']='true';
        header('location:home.php');
    }
    /*else{
      $noconn="Login failed";
      //header('location:login.php');
    }
}*/
}
?>

<!doctype html>
<html lang="en">

<head>

    
  <title>Title</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS v5.2.1 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">

</head>
 
<body class="bg-dark text-white">
 
  <main>
  <div class="d-flex justify-content-center position-absolute top-50 start-50 translate-middle" >
  <span class="border border-3 rounded-4" style="padding: 75px;">

  <form method="POST" id="logform" >
 <h2> Welcome </h2><br>
Username:<br>
    <input type="text" name="username" id="username" required><br><br>
    
    Password:<br>
    <input type="password" name="password" id="password" required><br><br>
     
    <input type="submit" value="login" ><br>
</span>
    </div>
</form>


  </main>
  <footer>
    <!-- place footer here -->
  </footer>
  <!-- Bootstrap JavaScript Libraries -->
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
    integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous">
  </script>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js"
    integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
  </script>
</body>

</html>