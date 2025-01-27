<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="register.aspx.cs" Inherits="college_event_media.register" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 314px;
            height: 364px;
        }
        .auto-style2 {
            width: 256px;
            height: 364px;
        }
        .txt{
            box-shadow:rgb(16, 14, 14)0px 10px 10px; 
            border-radius:3px 4px;
        }
        .btn{
            box-shadow:rgb(16, 14, 14)0px 10px 10px;
            border-radius:3px 4px;
        }
        .div{
             box-shadow:rgb(16, 14, 14)0px 10px 25px;
             box-decoration-break:slice;
             border-radius:3px 4px;
             background-color:wheat;
        }
    </style>
</head>
<body style="height: 538px; background-color:wheat">
    <form id="form1" runat="server">
    <div style="height: 371px; width: 501px; margin-left: 336px; margin-top: 87px" class="div">
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
        <table>
            <tr>
                <td class="auto-style2">
                    <asp:Image ID="Image1" runat="server" Height="352px" Width="252px" ImageUrl="~/OIP.jfif" />
                </td>
                <td class="auto-style1">
                    <asp:Label ID="Label1" runat="server" Text="username"></asp:Label>
                    <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                    <asp:TextBox ID="txt_name" runat="server" BackColor="#CCCCCC" BorderStyle="None" Class="txt" BorderColor="Black" CssClass="txt"></asp:TextBox>
                    <br />
                    <br />
                    <asp:Label ID="Label2" runat="server" Text="password"></asp:Label>
                    <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <asp:TextBox ID="txt_password" runat="server" BorderStyle="None" Class="txt" BorderColor="Black" CssClass="txt" BackColor="#CCCCCC"></asp:TextBox>
                    <br />
                    <br />
&nbsp;e-mail<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:TextBox ID="txt_email" runat="server" BackColor="#CCCCCC" BorderStyle="None" CssClass="txt"></asp:TextBox>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ControlToValidate="txt_email" ErrorMessage="Please enter the correct email" ForeColor="Red" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"></asp:RegularExpressionValidator>
                    <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <asp:Button ID="btn_reg" runat="server" Text="Register" BorderColor="" BorderStyle="None" Class="btn" CssClass="btn" BackColor="#99FF66" OnClick="btn_reg_Click" />
                    <br />
                    <br />
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<asp:Label ID="err_msg" runat="server" Visible="False"></asp:Label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             back to <a href="login.aspx">home</a></td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
