<?php
// first thing is to start session 
session_start();
// now to check if variable is true
$_SESSION["tab"] = "Donation History";
if(!$_SESSION['anything'])
{
    header('location:login.php');
}
else{
    include_once('header.php');

    $sql = "select d.`d_date`, d.`d_time`, d.`d_quantity`, p.`p_id`, p.`p_fname`,p.`p_lname`, `p_phone`, p.`p_bgroup` from `patient` p,`donation` d where p.`p_id` = d.`p_id` ";  
    $result = mysqli_query($conn, $sql);  
        ###########contents of div goes here###########

    echo "<h2>Donation History</h2><br>";            

    if ($result->num_rows > 0) {
        echo "<table>
        <tr>
        <th>Personal ID</th>
        <th>First Name</th>
        <th>Last Name &emsp;</th>
        <th>Phone &emsp;</th>
        <th>Blood Group &emsp;</th>
        <th>Date &emsp;</th>
        <th>Time &emsp;</th>
        <th>Units of Blood &emsp;</th>
        </tr>";
        while($row = $result->fetch_assoc()) {
            echo "
            <tr>
            <td>" . $row["p_id"]. "</td>
            <td>" . $row["p_fname"]."</td>
            <td>" . $row["p_lname"]."</td>
            <td>" .$row["p_phone"] ."</td>
            <td>" . $row["p_bgroup"]. "</td>
            <td>" . $row["d_date"]. "</td>
            <td>" . $row["d_time"]. "</td>
            <td>" . $row["d_quantity"]. "</td>
            </tr>";
        }
        echo "</table> <br><br>";
    }
    else
        echo "No record found ";
    include_once('foot.php');
}
?> 