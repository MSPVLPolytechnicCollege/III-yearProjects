<%@ Page Language="C#" AutoEventWireup="true" CodeFile="bus_tracking.aspx.cs" Inherits="bus_tracking" %>

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

/* main Section */
/* Reset default margins and padding */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/*
    body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    padding: 20px;
}
*/
.department-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Makes the grid responsive */
    gap: 60px;
    padding:50px;
    
}

.department {
    background-color: white;
    padding: 20px;
    border-radius: 2px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border:1px solid;
    margin:0;
}
.img{
    height:50%;
    border-image-width:100%;
    width:70%;
    
}

.department h2 {
    font-size: 1.5em;
    margin-bottom: 10px;
}

.department p {
    font-size: 1em;
    color: #555;
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
            <li><a href="stu_register.aspx">STUDENT REGISTERARION</a></li>
        </ul>
    </nav>
    <div class="department-grid">
        <div class="department">
            <a href=""><h2>BUS NO 1</h2></a>
            <p>Tirunelveli</p>
            <img src="images/bus.jpg" class="img" />
        </div>
        <div class="department">
            <a href=""><h2>BUS NO 2</h2></a>
            <p>Mukoodal</p>
            <img src="images/bus.jpg" class="img" />
        </div>
        <div class="department">
            <a href=""><h2>BUS NO 3</h2></a>
            <p>Ambasamudram</p>
            <img src="images/bus.jpg" class="img" />
        </div><br />
        <div class="department">
            <a href=""><h2>BUS NO 4</h2></a>
            <p>Sankarankovil</p>
            <img src="images/bus.jpg" class="img" />
        </div>
        <div class="department">
            <a href=""><h2>BUS NO 5</h2></a>
            <p>Senkottai</p>
            <img src="images/bus.jpg" class="img" />
        </div>
        <div class="department">
            <a href=""><h2>BUS NO 6</h2></a>
            <p>Alangulam</p>
            <img src="images/bus.jpg" class="img" />
        </div>
    </div>
    <footer>
        <p>&copy; 2025 College Bus Management System | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
    </footer>
    </form>
</body>
</html>
