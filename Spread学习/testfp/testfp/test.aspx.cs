using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace testfp
{
    public partial class test : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            //????????//设置样式
            FarPoint.Web.Spread.GeneralCellType mycelltype = new FarPoint.Web.Spread.GeneralCellType();
            mycelltype.CssClass = "gv_header2";

            FpSpread1.ColumnHeader.Cells[0, 0].CellType = mycelltype;
        }
    }
}