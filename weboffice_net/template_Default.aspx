<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="template_Default.aspx.cs" Inherits="_Default" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>WebOffice ASP.Net演示</title>
</head>
<body style="text-align: left"> 
    <form name="form2" action="template_Edit.aspx" method="post"> 
    
    <TABLE cellSpacing=0 cellPadding=0 width="100%" border=0>
          <TR> 
            <TD bgColor=#3366cc><IMG height=1 alt="" width=1></TD>
          </TR>
    </TABLE>

   <table style="width: 100%" border = "0" cellpadding="0" cellspacing="0">
       <tr>
           <td valign="top" bgColor="#e5ecf9" style="height: 21px;"><p align="left"><b><strong>WebOffice演示程序</strong></b>
    </p></td>
       </tr>
   </table>
          <br />
            <asp:Label ID="Label1" runat="server" Text="模板格式:"></asp:Label>
            <select id="Select1" style="width: 111px" name="DocType">
            <option selected="selected" value="doc">Word</option>
            <option value="xls" >Excel</option>
           
        </select>
        <input id="Submit1" type="submit" value="创建模板" />
           <asp:Label ID="Label2" runat="server"></asp:Label> 
        </form>
       <br />
    <form id="form1" runat="server">
    <div style="color: red">
         <center>
             <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" DataKeyNames="id"
            DataSourceID="AccessDataSource1" Height="47px" Width="100%" OnRowDeleted="GridView1_RowDeleted" CellPadding="4" AllowPaging="True" ForeColor="#333333" GridLines="None">
            <Columns>
                <asp:BoundField DataField="id" HeaderText="记录号" InsertVisible="False" ReadOnly="True"
                    SortExpression="id" />
                <asp:BoundField DataField="template_id" HeaderText="模板号" SortExpression="template_id" />
                <asp:BoundField DataField="template_title" HeaderText="模板标题" SortExpression="template_title" />
                <asp:BoundField DataField="template_type" HeaderText="模板格式" SortExpression="template_type" />
                <asp:BoundField DataField="template_date" HeaderText="创建时间" SortExpression="template_date" />
                <asp:HyperLinkField DataNavigateUrlFields="id,template_title,template_type" DataNavigateUrlFormatString="template_Edit.aspx?ID={0}&amp;DocTitle={1}&amp;DocType={2}"
                    HeaderText="操作" Text="修改" />
                              <asp:CommandField HeaderText="操作" ShowDeleteButton="True" />
            </Columns>
            <FooterStyle BackColor="#507CD1" ForeColor="White" Font-Bold="True" />
            <RowStyle BackColor="#EFF3FB" />
            <SelectedRowStyle BackColor="#D1DDF1" Font-Bold="True" ForeColor="#333333" />
            <PagerStyle BackColor="#2461BF" ForeColor="White" HorizontalAlign="Center" />
            <HeaderStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
            <EditRowStyle BackColor="#2461BF" />
            <AlternatingRowStyle BackColor="White" />
        </asp:GridView>
             </center>
         <asp:AccessDataSource ID="AccessDataSource1" runat="server" DataFile="~/des.mdb"
            SelectCommand="SELECT   [id], [template_id], [template_title], [template_type], [template_date] FROM [template] order by id desc" DeleteCommand="delete * from template where id=0">
        </asp:AccessDataSource>
       </div>
       <br />
       <br />
       
          <table style="width: 100%" border = "0" cellpadding="0" cellspacing="0">
               <tr>
                   <td valign="top" bgColor="#e5ecf9" ><span style="color: red">服务器路径:<%=this.Session["URL"].ToString() %> </span>
                </td>
               </tr>
           </table>
          <TABLE cellSpacing=0 cellPadding=0 width="100%" border=0>
          <TR> 
            <TD bgColor=#3366cc><IMG height=1 alt="" width=1></TD>
          </TR>
    </TABLE>
   </form>   
</body>
</html>
