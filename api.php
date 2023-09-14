<?php
$servername = "localhost";
$username = "u286033143_fb_sas";
$password = "*H^EGD4G;L9b";
$dbname = "u286033143_fb_sas";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$name = $_POST['name'];
$phoneNum = $_POST['phone'];
$address = $_POST['address'];
$myIp = $_SERVER['REMOTE_ADDR'];
$time_now = mktime(date('h') + 5, date('i') + 30, date('s'));
$date = date('d-m-Y H:i', $time_now);
//Get the current page URL
$directoryName = basename(dirname(__FILE__));

// ip extraction
$apiEndpoint = "https://ipinfo.io/{$myIp}/json";
$ipInfo = json_decode(file_get_contents($apiEndpoint));

$country = $ipInfo->country ?? '';
$region = $ipInfo->region ?? '';
$city = $ipInfo->city ?? '';

if ($address) {
    // Check if the record already exists
    $checkQuery = "SELECT * FROM `enmmg1` WHERE name = '$name' AND ip = '$myIp' AND phone = '$phoneNum'";
    $result = mysqli_query($conn, $checkQuery);

    if (mysqli_num_rows($result) > 0) {
        // Update the existing record
        $updateQuery = "UPDATE `enmmg1` SET `address` = '$address' WHERE name = '$name' AND ip = '$myIp'";

        if (mysqli_query($conn, $updateQuery)) {
            mysqli_close($conn);
            unset($_SESSION['directory_name']);
            header("Location: ../thanks");
            exit;
        } else {
            echo "Error updating record: " . mysqli_error($conn);
        }
    } else {
        echo "Record not found.";
    }
}
$checkForIPQuery = mysqli_query($conn, "select * from `enmmg1` WHERE ip='" . $myIp . "'");
if (mysqli_num_rows($checkForIPQuery) < 2) {
    $sql = "INSERT INTO `enmmg1` (`name`, `phone`, `ip`, `created at`) VALUES ('$name', '$phoneNum', '$myIp', '$date')";
    if (mysqli_query($conn, $sql) == true) {

        //  Send Leads To Lead vertex
        $apiUrl = "https://terraleads1.leadvertex.ru/api/webmaster/v2/addOrder.html?webmasterID=14&token=Myiphone90";
        $productId = '182365';
        // Order data
        $orderData = [
            'country' => 'India',
            'region' => $region,
            'city' => $city,
            'fio' => $name,
            'phone' => $phoneNum,
            'ip'    => $myIp,
            'additional1' => 'Man Maxx Gold',
            'goods' => [
                [
                    'goodID' => $productId,
                    'quantity' => '',
                    'price' => '',
                ],
            ]

        ];

        // Initialize cURL session
        $ch = curl_init($apiUrl);

        // Set cURL options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($orderData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded']);

        // Execute the cURL request
        $response = curl_exec($ch);

        // Check for cURL errors
        if (curl_errno($ch)) {
            header("Location: ../order-processing");
        } else {
            // Print the API response
            session_start();
            $_SESSION['directory_name'] = $directoryName;
            $_SESSION['name'] = $name;
            $_SESSION['phone'] = $phoneNum;
            header("Location: ../order-processing");
        }

        // Close cURL session
        curl_close($ch);
    }
} else {
    session_start();
    $_SESSION['name'] = $name;
    header("Location:../thanks");
    unset($_SESSION['directory_name']);
}

$conn->close();
