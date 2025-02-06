<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="StudentMarkAttendancePage.aspx.cs" Inherits="AUTOMATED_ATTADANCE_SYSTEM.StudentMarkAttendancePage" %>

<!DOCTYPE html>
<html>
<head runat="server">
    <title>Student Mark Attendance</title>
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
            max-width: 800px;
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

        .form-group input,
        .form-group select {
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
            <h2>Student Mark Attendance</h2>

            <!-- Student ID -->
            <div class="form-group">
                <label for="txtStudentID">Student ID</label>
                <input type="text" id="txtStudentID" runat="server" />
            </div>

            <!-- Department -->
            <div class="form-group">
                <label for="txtDepartment">Department</label>
                <input type="text" id="txtDepartment" runat="server" />
            </div>

            <!-- Date -->
            <div class="form-group">
                <label for="txtDate">Date</label>
                <input type="date" id="txtDate" runat="server" />
            </div>

            <!-- Buttons -->
            <div class="form-group">
                <button type="button" class="btn btn-primary" id="btnScan" runat="server" OnClick="btnScan_Click">Scan</button>
                <button type="button" class="btn btn-primary" id="btnSubmit" runat="server" OnClick="btnSubmit_Click">Submit</button>
                <button type="button" class="btn btn-primary" id="btnGenerateExcel" runat="server" OnClick="btnGenerateExcel_Click">Generate Excel</button>
            </div>

            <!-- Attendance Table -->
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Present</th>
                        <th>Absent</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="date" id="attendanceDate" runat="server" /></td>
                        <td><input type="checkbox" id="chkPresent" runat="server" /></td>
                        <td><input type="checkbox" id="chkAbsent" runat="server" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </form>
</body>
</html>

