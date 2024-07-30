<?php
session_start();
$_SESSION["tab"] = "Search Person";
if(!$_SESSION['anything'])
{
    header('location:login.php');
}
else{
    include_once('header.php');

    $pid = $_POST['pid'];  
    $sql = "select * from `patient` where `p_id` = '$pid'";  
    $result = mysqli_query($conn, $sql);  
    $row = mysqli_fetch_array($result);  
    $count = mysqli_num_rows($result);  

    if($count == 1){  
        $pfname = $row['p_fname'];
        $plname = $row['p_lname'];
        $gender = $row['p_gender'];
        $phone = $row['p_phone'];
        $dob = $row['p_dob'];
        $blood_group = $row['p_bgroup'];
        $address = $row['p_address'];
        $med_issues = $row['p_medissue'];


###########contents of div goes here###########


        echo'<h2>' .$pfname.' '.$plname .'</h2><br><br>';
        echo'Personal Id : '.$pid .'<br><br>';
    
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
            echo 'None<br><br><br>';



        echo'<h3>Donation History</h3><br>';

        $sql = "select * from `donation` where `p_id` = '$pid'";  

        $result = mysqli_query($conn, $sql);  


        if ($result->num_rows > 0) {
            echo "<table><tr><th>Date of Donation</th><th>Time of Donation</th><th>Units of blood</th></tr>";
            while($row = $result->fetch_assoc()) {
                echo "<tr><td>" . $row['d_date']. "</td><td>" . $row['d_time']."</td><td>" .$row['d_quantity'] ."</td></tr>";
            }
            echo "</table> <br><br>";
        }

        else
            echo "No donations Yet";

        echo'<h3>Receiving History</h3><br>';

        $sql = "select * from `receive` where `p_id` = '$pid'";  

        $result = mysqli_query($conn, $sql);  


        if ($result->num_rows > 0) {
            echo "
            <table>
            <tr>
            <th>Date of Receive</th>
            <th>Time of Receive</th>
            <th>Units of blood</th>
            <th>Hospital</th>
            </tr>";

            while($row = $result->fetch_assoc()) {
                echo "
                <tr>
                <td>" . $row["r_date"]. "</td>
                <td>" . $row["r_time"]."</td>
                <td>" .$row["r_quantity"] ."</td>
                <td>" .$row["r_hospital"] ."</td>
                </tr>";
            }
            echo "</table> <br>";
        }

        else
            echo "No Receives Yet";

    }  
    else{
        echo 'Person with pid: ' .$pid .' not found!
        <br>Please provide a valid personal id';
    }
	include('foot.php');
}
?>  



	