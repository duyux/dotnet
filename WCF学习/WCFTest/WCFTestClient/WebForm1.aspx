﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="WCFTestClient.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
     <asp:TextBox ID="txtName" runat="server"></asp:TextBox><br />
     <asp:Button ID="btnSubmit" runat="server" Text="测试WCF服务" OnClick="btnClick" />
 

    </div>
    </form>
</body>
</html>
