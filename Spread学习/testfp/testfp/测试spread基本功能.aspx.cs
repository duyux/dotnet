using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace testfp
{
    public partial class 测试spread基本功能 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            FpSpread1.Height = Unit.Pixel(300);
            FpSpread1.Width = Unit.Pixel(763);
            FpSpread1.Sheets[0].ColumnCount = 8;
            FpSpread1.Sheets[0].RowCount = 100;

            //set colunm head
            FpSpread1.ColumnHeader.Cells[0, 0].Text = "Check #";
            FpSpread1.ColumnHeader.Cells[0, 1].Text = "Date";
            FpSpread1.ColumnHeader.Cells[0, 2].Text = "Description";
            FpSpread1.ColumnHeader.Cells[0, 3].Text = "Tax?";
            FpSpread1.ColumnHeader.Cells[0, 4].Text = "Cleared";
            FpSpread1.ColumnHeader.Cells[0, 5].Text = "Debit";
            FpSpread1.ColumnHeader.Cells[0, 6].Text = "Credit";
            FpSpread1.ColumnHeader.Cells[0, 7].Text = "Balance";

            //set up the column width
            FpSpread1.Sheets[0].Columns[0].Width = 50;
            FpSpread1.Sheets[0].Columns[1].Width = 50;
            FpSpread1.Sheets[0].Columns[2].Width = 200;
            FpSpread1.Sheets[0].Columns[3].Width = 40;
            FpSpread1.Sheets[0].Columns[4].Width = 65;
            FpSpread1.Sheets[0].Columns[5].Width = 100;
            FpSpread1.Sheets[0].Columns[6].Width = 100;
            FpSpread1.Sheets[0].Columns[7].Width = 125;

            FpSpread1.Sheets[0].DataAutoCellTypes = false;

            //set cell types -CheckBox
            FarPoint.Web.Spread.CheckBoxCellType objIntCell = new FarPoint.Web.Spread.CheckBoxCellType();
            FpSpread1.Sheets[0].Columns[0].CellType = objIntCell;

            //datetime celltype
            FarPoint.Web.Spread.DateTimeCellType objDateCell = new FarPoint.Web.Spread.DateTimeCellType();
            objDateCell.FormatString = "M/dd/yyyy";
            FpSpread1.Sheets[0].Columns[1].CellType = objDateCell;
            FpSpread1.ActiveSheetView.Cells[0, 1].Value = DateTime.Now;

            // Create Description column of general cells.
            FarPoint.Web.Spread.GeneralCellType objGenCell = new FarPoint.Web.Spread.GeneralCellType();
            FpSpread1.Sheets[0].Columns[2].CellType = objGenCell;


            // Create Tax? and Cleared? columns of check box cells.

            FarPoint.Web.Spread.CheckBoxCellType objCheckCell = new FarPoint.Web.Spread.CheckBoxCellType();
            FpSpread1.Sheets[0].Columns[3].CellType = objCheckCell;
            FpSpread1.Sheets[0].Columns[4].CellType = objCheckCell;


            //////////////////////////////////////
         FarPoint.Web.Spread.Extender.DateCalendarCellType objDDDcell=new FarPoint.Web.Spread.Extender.DateCalendarCellType();
         objDDDcell.Animated = true;
         objDDDcell.DateFormat = "MM/dd/yyyy";
         objDDDcell.EnableOnClient = true;
        // objDDDcell.ShowEditor = true;
        //dc.Animated = True

        //dc.DateFormat = "MM/dd/yyyy"

        //dc.EnableOnClient = True

        //Dim mee As New AjaxControlToolkit.MaskedEditExtender

        //mee.Mask = "99/99/9999"

        //mee.MaskType = AjaxControlToolkit.MaskedEditType.Date

        //dc.Extenders.Add(mee)

        //dc.ShowEditor = True

         FpSpread1.Sheets[0].Columns[5].CellType = objDDDcell;




            

        }
    }
}