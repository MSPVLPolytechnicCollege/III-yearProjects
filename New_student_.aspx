<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="New_student_.aspx.cs" Inherits="AUTOMATED_ATTADANCE_SYSTEM.New_student_" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Student Creation Page</title>
    <style>
        /* Basic styles */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
        }

        .container { 
            width: 50%;
            margin: 0 auto;
            padding: 40px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
            margin-top: 50px;
        }

        h1 {
            font-size: 32px;
            color: #333;
            text-align: center;
            margin-bottom: 30px;
        }

        .form-group {
            margin-bottom: 20px;
        }

            .form-group label {
                display: block;
                font-size: 16px;
                color: #333;
                margin-bottom: 8px;
            }

            .form-group input {
                width: 100%;
                padding: 10px;
                font-size: 16px;
                border-radius: 5px;
                border: 1px solid #ccc;
                box-sizing: border-box;
            }

            .form-group button {
                width: 100%;
                padding: 12px;
                font-size: 16px;
                color: white;
                background-color: #007bff;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }

                .form-group button:hover {
                    background-color: #0056b3;
                }
    </style>
</head>
<body>

    <div class="container">
        <!-- Page Title -->
        <h1>New  Student Creation Page</h1>

        <!--  Student ID -->
        <div class="form-group">
            <label for=" Student_id"> Student ID</label>
            <input type="text" id="Text1" runat="server" placeholder="Enter  Student ID" />
        </div>

        <!--  Student Name -->
        <div class="form-group">
            <label for=" Student_Name"> Student Name</label>
            <input type="text" id="Text2" runat="server" placeholder="Enter Student Name" />
        </div>

        <!-- Username -->
        <div class="form-group">
            <label for="Username">Username</label>
            <input type="text" id="Username" runat="server" placeholder="Enter Username" />
        </div>

        <!-- Password -->
        <div class="form-group">
            <label for="Password">Password</label>
            <input type="password" id="Password" runat="server" placeholder="Enter Password" />
        </div>

        <!-- Department TextBox -->
        <div class="form-group">
            <label for="Department">Department</label>
            <input type="text" id="Department" runat="server" placeholder="Enter Department" />
        </div>

        <!-- Capture Finger Button -->
        <div class="form-group">
            <button id="btnCaptureFinger" runat="server" onclick="CaptureFinger_Click">Capture Finger</button>
        </div>

        <!-- Submit Button -->
        <div class="form-group">
            <button id="btnSubmit" runat="server" onclick="SubmitForm_Click">Submit</button>
        </div>
    </div>

</body>
</html>

