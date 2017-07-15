using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using FarPoint.Web.Spread;

namespace testfp
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            
           
            LoadCombox1();
           

        }

        private void LoadExCombox22()
        {
            //FarPoint.Web.Spread.Extender.AjaxComboBoxCellType combo = new FarPoint.Web.Spread.Extender.AjaxComboBoxCellType();
            //FarPoint.Web.Spread.Extender.a
            //combo.BackColor = System.Drawing.Color.Aquamarine;
            //combo.AutoCompleteMode = AjaxControlToolkit.ComboBoxAutoCompleteMode.Append;
            //combo.ShowEditor = true;
            //combo.DropDownStyle = AjaxControlToolkit.ComboBoxStyle.DropDown;
            //combo.ItemInsertLocation = AjaxControlToolkit.ComboBoxItemInsertLocation.OrdinalText;
            //combo.Items.Add("test");
            //combo.Items.Add("second");
            //combo.CaseSensitive = true;
 
        }
        private void LoadCombox1()
        {
           
            string[] cbstr;
            string[] strval;
            cbstr = new String[] { "One", "Two", "Three" };

            strval = new String[] { "1", "2", "3" };

            FarPoint.Web.Spread.ComboBoxCellType cb = new FarPoint.Web.Spread.ComboBoxCellType();

            cb.Items = cbstr;
            FarPoint.Web.Spread.ListItem[] items = cb.ListItems;


            cb.ShowButton = true;
            cb.AutoPostBack = true;

            FpSpread1.ActiveSheetView.Cells[0, 1].CellType = cb;

           // FpSpread1.ActiveSheetView.DataModel.SetValue(0, 0, 1);
        }

        private void LoadCombox2()
        {

            string[] cbstr;
            string[] strval;
            cbstr = new String[] { "测试1", "测试2", "测试3" };

            strval = new String[] { "11", "22", "32" };

            FarPoint.Web.Spread.ComboBoxCellType cb = new FarPoint.Web.Spread.ComboBoxCellType();

            cb.Items = cbstr;
            FarPoint.Web.Spread.ListItem[] items = cb.ListItems;


            //cb.ShowButton = true;
            //cb.AutoPostBack = true;

            FpSpread1.ActiveSheetView.Cells[0, 5].CellType = cb;

            // FpSpread1.ActiveSheetView.DataModel.SetValue(0, 0, 1);
        }


        protected void mnuMain_MenuItemClick(object sender, MenuEventArgs e)
        {
            try
            {
                switch (e.Item.Value)
                {
                    case "保存":
                        ExecScript();
                        break;
                    case "提交":
                        mnuAddROW();
                        break;
                    case "增加行":
                        mnuAddROW();
                        break;
                    case "删除行":
                        //this.mnuMainDelRow();
                        break;
                    default:
                        break;
                }
            }
            catch (System.Threading.ThreadAbortException ex)
            {
                //Response.End()引起的异常，不用处理
            }

        }

        //保存方法
        protected void mnuMainSave()
        {
            try
            {

                //this.RegisterClientScriptBlock("test","<script>alert('哈哈保存成功！')</script>");
               
            }
            catch (Exception ex)
            {
               

            }
        }

        //增加行方法
        protected void mnuAddROW()
        {
            try
            {
                
                FpSpread1.Rows.Add(8, 12);
                FpSpread1.Sheets[0].AllowPage = false;

            }
            catch (Exception ex)
            {


            }
        }

        protected void FpSpread1_ButtonCommand(object sender, SpreadCommandEventArgs e)
        {

            //ClientScript.RegisterStartupScript(this.GetType(), "newwin", "<script type ='text/javascript'> alert('UpdateCommand Test')</script>");


            if (e.CommandName == "ChildClick")
            {
                if (e.SheetView.ActiveRow == 0 && e.SheetView.ActiveColumn == 1)
                {
                    this.LoadCombox2();
                }
                else if (e.SheetView.ActiveRow == 0 && e.SheetView.ActiveColumn == 5)
                {
                    //this.LoadddlSiteNo();
                }
                else if (e.SheetView.ActiveRow == 0 && e.SheetView.ActiveColumn == 10)
                {

                }
                else if (e.SheetView.ActiveRow > 3 && e.SheetView.ActiveColumn == 0)
                {
                    //this.LoadDllSiteNo(e.SheetView.ActiveRow);
                }
            }
            //else
            //{
            //    switch (e.CommandName)
            //    {
            //        case "保存":
            //            //this.mnuMainSave();
            //            ExecScript();
            //            break;
            //        case "提交":

            //            break;
            //        case "增加行":

            //            break;
            //        case "删除行":

            //            break;
                   
            //        default:
            //            break;
            //    }

            //}
        }

        private void ExecScript()
        {
            //Response.Write("成果");
           Response.Write( " <script   language=javascript>   alert('数据更新成功!'); </script> ");
            //string myScript = @"function AlertHello() { alert(‘Hello ASP.NET’); }";
            //Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "MyScript", myScript, true);

        }
    }
}