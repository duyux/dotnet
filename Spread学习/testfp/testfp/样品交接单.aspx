<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="样品交接单.aspx.cs" Inherits="testfp.样品交接单" %>
<%@ Register assembly="FarPoint.Web.Spread" namespace="FarPoint.Web.Spread" tagprefix="FarPoint" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
   
</head>
<body>
    <form id="form1" runat="server">
    
    
    <div style="text-align:center; vertical-align:middle;">
        <FarPoint:FpSpread ID="FpSpread1" runat="server" 
            BorderStyle="Solid" BorderWidth="1px" Height="200" Width="400">
            <CommandBar BackColor="Control" ButtonFaceColor="Control" 
                ButtonHighlightColor="ControlLightLight" ButtonShadowColor="ControlDark">
            </CommandBar>
            <Sheets>
                <FarPoint:SheetView SheetName="Sheet1"  AllowInsert="True" AllowSort="True" >
                </FarPoint:SheetView>
            </Sheets>
        </FarPoint:FpSpread>
    </div>
    </form>
</body>
</html>
