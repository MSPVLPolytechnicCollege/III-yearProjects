<%@ Page Language="C#" AutoEventWireup="true" CodeFile="login.aspx.cs" Inherits="login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    
    <style>
        body, h1, h2, h3, p, ul, li {
                                        margin: 0;
                                        padding: 0;
                                        font-family: Arial, sans-serif;
                                    }

/* Body and Layout */
       body {
                background-color: #f9f9f9;
                color: #333;
                margin: 0;
            }

        /* Header Section */
        header {
                 background-color: #4CAF50;
                 padding: 20px 0;
                 text-align: center;
                 color: white;
                }

    header h1 {
        font-size: 36px;
        margin-bottom: 10px;
    }

    header p {
        font-size: 18px;
    }
    /* Navigation Menu */
nav {
    background-color: #333;
    padding: 10px 0;
    text-align: center;
}

    nav ul {
        list-style-type: none;
    }

        nav ul li {
            display: inline;
            margin: 0 20px;
        }

            nav ul li a {
                color: white;
                text-decoration: none;
                font-size: 18px;
            }

                nav ul li a:hover {
                    text-decoration: underline;
                }
                .main{
                    padding:40px;
                    text-align: center;
                    justify-content: center;
                    display: flex;
                    height: 100%;
                    font-family: Arial, sans-serif;
                    width:90%;
                }
                .login-container {
    background-color: #fff;
    padding: 40px;
    border-spacing:70px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    
}

h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
}

/* Input styles */
input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 16px;
}

/* Submit button styles */
input[type="submit"] {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}

    input[type="submit"]:hover {
        background-color: #45a049;
    }

/* Error message style */
.error-message {
    color: red;
    font-size: 14px;
    margin-top: 10px;
}

.link-container {
    margin-top: 20px;

}

    .link-container a {
        text-decoration: none;
        color: #4CAF50;
    }

        .link-container a:hover {
            text-decoration: underline;
        }
/* Footer Section */
footer {
    background-color: #333;
    color: white;
    padding: 20px 0;
    text-align: center;
    margin-top: 40px;
}

    footer p {
        font-size: 14px;
    }

    footer a {
        color: #4CAF50;
        text-decoration: none;
    }

        footer a:hover {
            text-decoration: underline;
        }
    </style>
    
</head>
<body>
    <!-- Login Form -->
    <form id="form1" runat="server">
    <header> 
        <h1>M.S.P.V.L.POLYTECHNIC COLLEGE</h1>
        <p>BUS MANAGEMENT AND TRACKING</p>
    </header>
    <nav>
        <ul>
            <li><a href="home.aspx">HOME</a></li>
            <li><a href="#">About</a></li>
            <li><a href="bus_tracking.aspx">Bus Routes</a></li>
            <li><a href="login.aspx">LOGIN</a></li>
            <li><a href="stu_register.aspx">STUDENT REGISTERATION</a></li>
        </ul>
    </nav>
    <div class="main">
        <div class="login-container">
            <h2>Login</h2>
            <input type="text" id="username" name="username" placeholder="Username" required />
            <input type="password" id="password" name="password" placeholder="Password" required />

            <!-- Error message placeholder -->
            <div id="errorMessage" class="error-message"></div>

                <input type="submit" value="Login" onclick="return validateForm()" />

                 <div class="link-container">
                    <a href="#">Forgot Password?</a><br>
                    <a href="#">Sign Up</a>
                </div>
         </div>

     </div>

     
    
    <!-- Footer -->
    <footer>
        <p>&copy; 2025 College Bus Management System | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
    </footer>

    </form>
</body>
</html>
