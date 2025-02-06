<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="adminview.aspx.cs" Inherits="AUTOMATED_ATTADANCE_SYSTEM.adminview" %>

<!DOCTYPE html>
<html>
<head runat="server">
    <title>Admin View</title>
    <style>
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
            max-width: 900px;
        }

        h2 {
            color: #333;
            margin-bottom: 20px;
        }

        .form-group {
            margin: 10px 0;
        }

        .form-group label {
            display: block;
            text-align: left;
            margin-bottom: 5px;
        }

        .form-group select,
        .form-group input {
            width: 100%;
            padding: 8px;
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        table {
            width: 100%;
            margin-top: 20px;
            border-collapse: collapse;
        }

        th, td {
            padding: 8px;
            text-align: center;
            border: 1px solid #ccc;
        }

        th {
            background-color: #f2f2f2;
        }

        .btn {
            padding: 10px 20px;
            font-size: 14px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin: 5px;
        }

        .btn-primary {
            background-color: #007bff;
            color: white;
        }

        .btn-primary:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="container">
            <h2>Admin View</h2>

            <!-- Department Dropdown -->
            <div class="form-group">
                <label for="ddlDepartment">Department</label>
                <select id="ddlDepartment" runat="server">
                    <option value="Computer">Computer</option>
                    <option value="Info Tech">Info Tech</option>
                    <option value="Mech Engg">Mech Engg</option>
                    <option value="Auto Engg">Auto Engg</option>
                </select>
            </div>

            <!-- Date Picker -->
            <div class="form-group">
                <label for="txtDate">Date</label>
                <input type="date" id="txtDate" runat="server" />
            </div>

            <!-- Generate Report Button -->
            <div class="form-group">
                <button type="button" class="btn btn-primary" id="btnGenerateReport" runat="server" OnClick="btnGenerateReport_Click">Generate Report</button>
            </div>

            <!-- Attendance Table -->
            <table>
                <thead>
                    <tr>
                        <th>Staff Name</th>
                        <th>Date</th>
                        <th colspan="2">Present</th>
                        <th colspan="2">Absent</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Morning</th>
                        <th>Afternoon</th>
                        <th>Morning</th>
                        <th>Afternoon</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Example Row -->
                    <tr>
                        <td><input type="text" id="txtStaffName" runat="server" /></td>
                        <td><input type="date" id="attendanceDate" runat="server" /></td>
                        <td><input type="checkbox" id="chkPresentMorning" runat="server" /></td>
                        <td><input type="checkbox" id="chkPresentAfternoon" runat="server" /></td>
                        <td><input type="checkbox" id="chkAbsentMorning" runat="server" /></td>
                        <td><input type="checkbox" id="chkAbsentAfternoon" runat="server" /></td>
                    </tr>
                    <!-- Additional rows can be added dynamically -->
                </tbody>
            </table>
        </div>
    </form>
</body>
</html>
