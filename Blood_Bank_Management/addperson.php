<?php 
session_start();
$_SESSION["tab"] = "Add Person";

if(!$_SESSION['anything'])
{
    header('location:login.php');
}

else{
    include_once('header.php');
 $fname = $_POST['fname'];
 $lname = $_POST['lname'];
 $phone = $_POST['phone'];  
 $gender = $_POST['gender'];
 $dob = $_POST['dob'];
 $blood_group = $_POST['blood_group'];
 $address = $_POST['address'];
 $med_issues = $_POST['med_issues'];

 $sql = "INSERT INTO `patient` (`p_fname`,`p_lname`, `p_phone`, `p_dob`, `p_address`, `p_gender`, `p_bgroup`, `p_medissue`) VALUES ('$fname','$lname', '$phone', '$dob', '$address', '$gender', '$blood_group', '$med_issues');";

 if ($conn->query($sql) === TRUE) {
     $sql = "select `p_id` from `patient` where `p_fname` ='$fname' and `p_lname` ='$lname' and `p_phone` = '$phone' and `p_gender` = '$gender' and `p_dob` = '$dob' and `p_bgroup` = '$blood_group' and `p_address` = '$address'";  
     $result = mysqli_query($conn, $sql);  
     $row = mysqli_fetch_array($result);  
     $count = mysqli_num_rows($result);  
     $pid = $row['p_id'];  
 }
 else 
     echo "Error: " . $sql . "<br>" . $conn->error;
     ###########contents of div goes here###########
 if($count == 1){  
     echo'<h2>' .$fname.' '.$lname.'</h2><br><br>';
     echo 'Your registration is succesful..<br><br>';
     echo'Personal Id : '.$pid .'<br><br>';
     echo'Name : '.$fname.' '.$lname.'<br><br>';
     echo 'Phone Number: ' .$phone .'<br><br>';
     echo 'DOB : ' .$dob .'<br><br>';
     echo 'Blood Group : ' .$blood_group .'<br><br>';

     echo 'Gender : ';
     if ($gender === 'm')
         echo 'Male<br><br>'; 
     if ($gender === 'f')
         echo 'Female<br><br>'; 
     if ($gender === 'o')
         echo 'Others<br><br>'; 
     echo 'Address : ' .$address .'<br><br>';
     echo 'Medical Issues : ';
     if ($med_issues === "")
         echo 'None<br><br>';
     echo '<div style ="color:red;">NB:Please keep your Personal Id for future reference!!!';
 }
 include_once('foot.php');
}
?>