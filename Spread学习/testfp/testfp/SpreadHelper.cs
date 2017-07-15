using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FarPoint.Web.Spread;
using System.Drawing;

namespace com.lijoy
{
    public class SpreadHelper
    {
        public FpSpread _spread;
        public SpreadHelper(ref FpSpread spread,int iSpreadWidth,int iSpreadHeight)
        {
            _spread = spread;
             _spread.Width = iSpreadWidth;
            _spread.Height = iSpreadHeight;
            
         
        }
       
        /// <summary>
        /// 打开Excel模板
        /// </summary>
        /// <param name="strTemplPath"></param>
         public void OpenExcelTemplate(string strTemplPath)
        {
            _spread.OpenExcel(strTemplPath);
            SetInitStyle();
        }

         /// <summary>
         /// 设置FpSpread初始化样式
         /// </summary>
         private void SetInitStyle()
         {
             //_spread.BorderColor = Color.RoyalBlue;
             _spread.BorderWidth = 0;
             _spread.ActiveSheetView.PageSize = _spread.Rows.Count;
             _spread.EnableAjaxCall = true;

             _spread.HorizontalScrollBarPolicy = ScrollBarPolicy.Never;
             _spread.ColumnHeader.Visible = false;
             _spread.RowHeader.Visible = false;
            // _spread.ActiveSheetView.GridLineColor = Color.Red;
             _spread.CommandBar.Visible = false;
             
         }

         public void setDateTimeCellType(int iRow, int iCol)
         {

             DateTimeCellType dc = new DateTimeCellType();
             
             _spread.ActiveSheetView.Cells[iRow, iCol].CellType = dc;

         }

         public void setComboxCellType(int iRow, int iCol)
         {
             FarPoint.Web.Spread.ComboBoxCellType combcel = new ComboBoxCellType();
             String[] cbstrstts = new String[] { "样品类型1", "样品类型2", "样品类型3" };
             combcel.Items = cbstrstts;
             _spread.ActiveSheetView.Cells[iRow,iCol].CellType = combcel;
         }
    }
}
