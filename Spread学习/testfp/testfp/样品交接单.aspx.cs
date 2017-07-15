using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;
using FarPoint.Web.Spread;
using com.lijoy;
namespace testfp
{
    public partial class 样品交接单 : System.Web.UI.Page
    {

        public SpreadHelper spreadhelper;
        protected void Page_Load(object sender, EventArgs e)
        {


            spreadhelper = new SpreadHelper(ref FpSpread1, 880, 600);
            spreadhelper.OpenExcelTemplate(Request.PhysicalApplicationPath + "模板\\样品交接单.xls");
            spreadhelper.setDateTimeCellType(5, 1);
            spreadhelper.setComboxCellType(3, 6);

            FpSpread1.Sheets.Count = 1;

           // //设置相应单元格类型
           // //spreadhelper.setDateTimeCellType(6,2);

           //FarPoint.Web.Spread.DateTimeCellType dt = new FarPoint.Web.Spread.DateTimeCellType();
           // System.Globalization.DateTimeFormatInfo dtf = new System.Globalization.DateTimeFormatInfo();
           // dtf.LongDatePattern = "D";
           // dtf.ShortDatePattern = "M/d/yyyy";
           // dt.DateTimeFormat = dtf;
           // dt.MaximumValue = new DateTime(2020, 12, 31);
           // dt.MinimumValue = new DateTime(1950, 1, 1);
           // FpSpread1.ActiveSheetView.Cells[0, 0].CellType = dt;
           // FpSpread1.ActiveSheetView.Cells[0, 0].Value = DateTime.Now;
            //FpSpread1.ActiveSheetView.Cells[6, 2].CellType = dc;
           
           // OpenExcelTemplate();
        }



        //private void OpenExcelTemplate()
        //{
        //    //FpSpread1.OpenExcel("c:\\excelfile.xls", 2);

        //    FpSpread1.OpenExcel(Request.PhysicalApplicationPath + "模板\\样品交接单.xls");

        //    FpSpread1.BorderColor = Color.RoyalBlue;
        //    FpSpread1.ActiveSheetView.PageSize = FpSpread1.Rows.Count;
        //    FpSpread1.Width = 800;
        //    FpSpread1.Height = 600;

        //    FpSpread1.CommandBar.Visible = false;

        //    FpSpread1.ColumnHeader.Visible = false;
        //    FpSpread1.RowHeader.Visible = false;
        //    FpSpread1.ActiveSheetView.GridLineColor = Color.Red;


        //}
    }
}