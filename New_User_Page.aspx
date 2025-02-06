<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="New_User_Page.aspx.cs" Inherits="AUTOMATED_ATTADANCE_SYSTEM.New_User_Page" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New User Registration Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f4f4f9;
        }
        .container {
            text-align: center;
            padding: 50px;
            background-color: #ffffff;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }
        h1 {
            font-size: 36px;
            color: #333;
            margin-bottom: 30px;
        }
        .btn {
            background-color: #007bff;
            color: white;
            font-size: 18px;
            padding: 15px 30px;
            margin: 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            width: 200px;
            transition: background-color 0.3s ease;
        }
        .btn:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>New User Registration Page</h1>
        <button class="btn" onclick="location.href='New_Staff_CreationPage.aspx'">Staff</button>
        <button class="btn" onclick="location.href='New_Student_CreationPage.aspx'">Student</button>
    </div>

</body>
</html>

