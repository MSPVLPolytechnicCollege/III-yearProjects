<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="StaffMarkAttendancePage.aspx.cs" Inherits="AUTOMATED_ATTADANCE_SYSTEM.StaffMarkAttendancePage" %>

<!DOCTYPE html>
<html>
<head runat="server">
    <title>Staff Attendance</title>
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
            max-width: 600px;
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

        .form-group input[type="radio"] {
            width: auto;
            margin-right: 5px;
        }

        .form-group .radio-label {
            display: inline-block;
            margin-right: 15px;
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

        .btn-secondary {
            background-color: #6c757d;
            color: white;
        }

        .btn-secondary:hover {
            background-color: #5a6268;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="container">
            <h2>Staff Attendance</h2>

            <!-- Staff ID -->
            <div class="form-group">
                <label for="txtStaffID">Staff ID</label>
                <input type="text" id="txtStaffID" runat="server" />
            </div>

            <!-- Department -->
            <div class="form-group">
                <label for="txtDepartment">Department</label>
                <input type="text" id="txtDepartment" runat="server" />
            </div>

            <!-- Staff Name -->
            <div class="form-group">
                <label for="txtStaffName">Staff Name</label>
                <input type="text" id="txtStaffName" runat="server" />
            </div>

            <!-- Date -->
            <div class="form-group">
                <label for="txtDate">Date</label>
                <input type="date" id="txtDate" runat="server" />
            </div>

            <!-- Session -->
            <div class="form-group">
                <label>Session</label>
                <div>
                    <label class="radio-label">
                        <input type="radio" id="rbtnMorning" runat="server" name="session" /> Morning
                    </label>
                    <label class="radio-label">
                        <input type="radio" id="rbtnAfternoon" runat="server" runat="server" name="session" /> Afternoon
                    </label>
                </div>
            </div>

            <!-- Attendance Table -->
            <table>
                <thead>
                    <tr>
                        <th rowspan="2">Date</th>
                        <th colspan="2">Present</th>
                        <th colspan="2">Absent</th>
                    </tr>
                    <tr>
                        <th>Morning</th>
                        <th>Afternoon</th>
                        <th>Morning</th>
                        <th>Afternoon</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="date" id="txtAttendanceDate" runat="server" /></td>
                        <td><input type="checkbox" id="chkPresentMorning" runat="server" /></td>
                        <td><input type="checkbox" id="chkPresentAfternoon" runat="server" /></td>
                        <td><input type="checkbox" id="chkAbsentMorning" runat="server" /></td>
                        <td><input type="checkbox" id="chkAbsentAfternoon" runat="server" /></td>
                    </tr>
                </tbody>
            </table>

            <!-- Buttons -->
            <div class="form-group">
                <button type="button" class="btn btn-primary" id="btnScan" runat="server" OnClick="btnScan_Click">Scan</button>
                <button type="submit" class="btn btn-primary" id="btnSubmit" runat="server" OnClick="btnSubmit_Click">Submit</button>
                <button type="button" class="btn btn-secondary" id="btnGenerateExcel" runat="server" OnClick="btnGenerateExcel_Click">Generate Excel</button>
            </div>
        </div>
    </form>
</body>
</html>

