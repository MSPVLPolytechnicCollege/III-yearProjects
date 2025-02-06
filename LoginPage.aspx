<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="LoginPage.aspx.cs" Inherits="AUTOMATED_ATTADANCE_SYSTEM.LoginPage" %>

<!DOCTYPE html>
<html>
<head>
    <title>Login Page</title>
    <style>
        /* Global styles */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f7f6;
            color: #333;
            padding: 20px;
        }

        .container {
            width: 40%;
            margin: auto;
            background-color: #fff;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            text-align: center;
        }

        h2 {
            margin-bottom: 20px;
        }

        /* Image styling */
        .login-image {
            width: 100%;
            height: auto;
            margin-bottom: 20px;
        }

        /* Form styling */
        .form-group {
            margin-bottom: 15px;
            text-align: left;
        }

        label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .form-control {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        .form-control:focus {
            border-color: #007bff;
            outline: none;
        }

        .btn {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 20px;
        }

        .btn-primary {
            background-color: #007bff;
            color: white;
        }

        .error-message {
            color: red;
            font-size: 14px;
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Login Page</h2>
        
        <!-- Top Image -->
        <img src="C:\AUTOMATED_ATTADANCE_SYSTEM_PROJECT\APPLICATION\AUTOMATED ATTADANCE SYSTEM\AUTOMATED ATTADANCE SYSTEM" alt="Login Image" class="login-image" />
        
        <form id="form1" runat="server">
            <div class="form-group">
                <label for="txtUsername">Username:</label>
                <asp:TextBox ID="txtUsername" runat="server" CssClass="form-control"></asp:TextBox>
            </div>

            <div class="form-group">
                <label for="txtPassword">Password:</label>
                <asp:TextBox ID="txtPassword" runat="server" TextMode="Password" CssClass="form-control"></asp:TextBox>
            </div>

            <div class="form-group">
                <asp:Button ID="btnLogin" runat="server" Text="Login" CssClass="btn btn-primary" OnClick="btnLogin_Click" />
            </div>

            <div class="form-group">
                <asp:Label ID="lblError" runat="server" CssClass="error-message"></asp:Label>
            </div>
        </form>
    </div>
</body>
</html>
