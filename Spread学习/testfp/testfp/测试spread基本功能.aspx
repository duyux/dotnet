<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="测试spread基本功能.aspx.cs" Inherits="testfp.测试spread基本功能" %>

<%@ Register assembly="FarPoint.Web.Spread" namespace="FarPoint.Web.Spread" tagprefix="FarPoint" %>




<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
    
        <FarPoint:FpSpread ID="FpSpread1" runat="server" BorderColor="Black" 
            BorderStyle="Solid" BorderWidth="1px" Height="200" Width="400">
            <CommandBar BackColor="Control" ButtonFaceColor="Control" 
                ButtonHighlightColor="ControlLightLight" ButtonShadowColor="ControlDark">
            </CommandBar>
            <Sheets>
                <FarPoint:SheetView SheetName="Sheet1">
                </FarPoint:SheetView>
            </Sheets>
        </FarPoint:FpSpread>
    
    </div>
    </form>
</body>
</html>
