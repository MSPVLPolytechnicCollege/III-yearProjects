<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Staff_Choice.aspx.cs" Inherits="AUTOMATED_ATTADANCE_SYSTEM.Staff_Choice" %>

<!DOCTYPE html>
<html>
<head runat="server">
    <title>Staff_Choice</title>
    <style>
        /* styles.css */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .container {
            text-align: center;
            padding: 30px;
            border-radius: 10px;
            background-color: #fff;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
        }

        h2 {
            color: #333;
            margin-bottom: 20px;
        }

        .form-group {
            margin: 10px 0;
        }

        button {
            width: 100%;
            padding: 10px;
            font-size: 16px;
        }

        .btn-primary {
            background-color: #007bff;
            color: white;
            border: none;
        }

        .btn-primary:hover {
            background-color: #0056b3;
        }

        .btn-secondary {
            background-color: #6c757d;
            color: white;
            border: none;
        }

        .btn-secondary:hover {
            background-color: #5a6268;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="container">
            <h2>Staff_Choice Page</h2>

            <!-- Mark Attendance Button -->
            <div class="form-group">
                <asp:Button 
                    ID="btnMarkAttendance" 
                    runat="server" 
                    Text="Mark Attendance" 
                    CssClass="btn btn-primary" 
                    OnClick="btnMarkAttendance_Click" />
            </div>

            <!-- View Student Attendance Button -->
            <div class="form-group">
                <asp:Button 
                    ID="btnViewAttendance" 
                    runat="server" 
                    Text="View Student Attendance" 
                    CssClass="btn btn-secondary" 
                    OnClick="btnViewAttendance_Click" />
            </div>
        </div>
    </form>
</body>
</html>
