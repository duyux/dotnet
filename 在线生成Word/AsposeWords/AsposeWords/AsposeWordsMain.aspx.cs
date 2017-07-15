using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Aspose.Words;
using Aspose.Words.Tables;

namespace AsposeWords
{
    public partial class AsposeWordsMain : System.Web.UI.Page
    {

        public AsposeWordsHelper awhelpter = new AsposeWordsHelper();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                //CreateDocData();
                //CreateTable();
            
                //CreateMergeTable();
                dddd();
            }
        }

        private void CreateDocData()
        {
            string tmppath = Server.MapPath("~/template/reporttemplate.doc"); 
            Document doc = new Document(tmppath); //载入模板 
            if (doc.Range.Bookmarks["客户名称"] != null) 
            { 

            
            Bookmark mark = doc.Range.Bookmarks["客户名称"]; 
            mark.Text = "efwsdsdsdsdds"; 
            }
            
            doc.Save(Response, "demo.doc", ContentDisposition.Inline,null);
            //doc.Save(Response, "demo.doc", ContentDisposition.Inline, null);
            //doc.Save("demo.doc", SaveFormat.Doc, SaveType.OpenInWord, Response); //保存为doc，并打开 


        }

        private void CreateTable()
        {
            string tmppath = Server.MapPath("~/template/reporttemplate.doc");
            Document doc = new Document(tmppath); //载入模板 
            DocumentBuilder builder = new DocumentBuilder(doc); 

            
                double width = builder.CellFormat.Width;//获取单元格宽度 
                builder.MoveToBookmark("table"); //开始添加值 

                //添加表头
                Aspose.Words.Tables.Table   pTable=builder.StartTable();
                
                awhelpter.CreateHeadCell(builder, "监测项目", 15);
                awhelpter.CreateHeadCell(builder, "采样分析方法", 19);
                awhelpter.CreateHeadCell(builder, "方法来源", 12);
                awhelpter.CreateHeadCell(builder, "仪器名称/型号", 12);
                awhelpter.CreateHeadCell(builder, "检出限", 12);
                builder.EndRow();

                string strCellText = "";
                for (var m = 0; m < 3; m++) 
                { 
                    for (var i = 0; i < 5; i++) 
                    {
                        if (i == 0)
                        {
                            strCellText = "烟尘";
                        }
                        if (i == 1)
                        {
                            strCellText = "固定污染源排气中固体颗粒物测定与气态污染物";
                        }
                        if (i == 2)
                        {
                            strCellText = "GB/T 16157-1996";
                        }
                        if (i == 3)
                        {
                            strCellText = "TH-880F型微电脑烟尘平行采样仪、MA110电子天平";
                        }
                        if (i == 4)
                        {
                            strCellText = "0.1 mg/m3";
                        }

                        awhelpter.CreateCell(builder, strCellText, width);
                    } 
                    builder.EndRow(); 
                 } 
                doc.Range.Bookmarks["table"].Text = ""; // 清掉标示 
           
                doc.Save(Response, "baojiadan.doc", ContentDisposition.Inline, null);

             }

        private void dddd()
        {
            string tmppath = Server.MapPath("~/template/reporttemplate.doc");
            Document doc = new Document(tmppath); //载入模板 
            DocumentBuilder builder = new DocumentBuilder(doc);

            Aspose.Words.Tables.Table pTable=builder.StartTable();
            builder.InsertCell();
           // builder.CellFormat.VerticalMerge = CellMerge.First;
            builder.Write("批测样品数");

            builder.InsertCell();
           // builder.CellFormat.HorizontalMerge = CellMerge.First;
            builder.Write("精密度控制");

            builder.InsertCell();
           // builder.CellFormat.HorizontalMerge = CellMerge.Previous;
           
            builder.EndRow();

            builder.InsertCell();
            // This cell is vertically merged to the cell above and should be empty.
           // builder.CellFormat.VerticalMerge = CellMerge.Previous;

            builder.InsertCell();
            //builder.CellFormat.HorizontalMerge = CellMerge.None;
            builder.Write("平行样百分比（%）");

            builder.InsertCell();
           // builder.CellFormat.HorizontalMerge = CellMerge.None;
            builder.Write("平行样合格率（%）");

            builder.EndRow();

            ///////////////////////////////////////合并
            Cell pStartCell=pTable.Rows[0].Cells[0];
            Cell pEndCell=pTable.Rows[1].Cells[0];
            awhelpter.MergeCells(pStartCell, pEndCell);


             pStartCell = pTable.Rows[0].Cells[1];
             pEndCell = pTable.Rows[0].Cells[2];
            awhelpter.MergeCells(pStartCell, pEndCell);

            doc.Save(Response, "baojiadan.doc", ContentDisposition.Inline, null);
        }

        /// <summary>
        /// 合并单元格
        /// </summary>
        private void CreateMergeTable()
        {
            string tmppath = Server.MapPath("~/template/reporttemplate.doc");
            Document doc = new Document(tmppath); //载入模板 
            DocumentBuilder builder = new DocumentBuilder(doc);


            double width = builder.CellFormat.Width;//获取单元格宽度 
            builder.MoveToBookmark("table"); //开始添加值 

            //添加表头
           // Aspose.Words.Tables.Table pTable = builder.StartTable();

          
            //awhelpter.CreateMergeCell(builder, "类别", 12, 0, Aspose.Words.Tables.CellMerge.First);
            //awhelpter.CreateMergeCell(builder, "分析项目", 12, 0, Aspose.Words.Tables.CellMerge.First);
            awhelpter.CreateMergeCell(ref builder, "批测样品数", 12, 0, Aspose.Words.Tables.CellMerge.First);
            awhelpter.CreateMergeCell(ref builder, "精密度控制", 12, 1, Aspose.Words.Tables.CellMerge.First);
            awhelpter.CreateMergeCell(ref builder, "", 12, 1, Aspose.Words.Tables.CellMerge.Previous);
            //awhelpter.CreateMergeCell(builder, "准确度控制", 12, 1, Aspose.Words.Tables.CellMerge.First);
            //awhelpter.CreateMergeCell(builder, "", 12, 1, Aspose.Words.Tables.CellMerge.Previous);
            //awhelpter.CreateMergeCell(builder, "", 12, 1, Aspose.Words.Tables.CellMerge.Previous);
            //awhelpter.CreateMergeCell(builder, "", 12, 1, Aspose.Words.Tables.CellMerge.Previous);
          
            builder.EndRow();

            //awhelpter.CreateMergeCell(builder, "", 12, 0, Aspose.Words.Tables.CellMerge.Previous);
            //awhelpter.CreateMergeCell(builder, "", 12, 0, Aspose.Words.Tables.CellMerge.Previous);
            awhelpter.CreateMergeCell(ref builder, "", 12, 0, Aspose.Words.Tables.CellMerge.Previous);
            awhelpter.CreateMergeCell(ref builder, "平行样百分比（%）", 12, 1, Aspose.Words.Tables.CellMerge.None);
            awhelpter.CreateMergeCell(ref builder, "平行样合格率（%）", 12, 1, Aspose.Words.Tables.CellMerge.None);
            //awhelpter.CreateMergeCell(builder, "带标百分比（%）", 12, 0, Aspose.Words.Tables.CellMerge.None);
            //awhelpter.CreateMergeCell(builder, "带标合格率（%）", 12, 0, Aspose.Words.Tables.CellMerge.None);
            //awhelpter.CreateMergeCell(builder, "加标百分数（%）", 12, 0, Aspose.Words.Tables.CellMerge.None);
            //awhelpter.CreateMergeCell(builder, "加标合格率（%）", 12, 0, Aspose.Words.Tables.CellMerge.None);
            
            builder.EndRow();


            //// We want to merge the range of cells found inbetween these two cells.
            //Cell cellStartRange = table.Rows[0].Cells[3];
            //Cell cellEndRange = table.Rows[0].Cells[4];

            //// Merge all the cells between the two specified cells into one.
            //awhelpter.MergeCells(cellStartRange, cellEndRange);


            //string strCellText = "";
            //for (var m = 0; m < 3; m++)
            //{
            //    for (var i = 0; i < 5; i++)
            //    {
            //        if (i == 0)
            //        {
            //            strCellText = "烟尘";
            //        }
            //        if (i == 1)
            //        {
            //            strCellText = "固定污染源排气中固体颗粒物测定与气态污染物";
            //        }
            //        if (i == 2)
            //        {
            //            strCellText = "GB/T 16157-1996";
            //        }
            //        if (i == 3)
            //        {
            //            strCellText = "TH-880F型微电脑烟尘平行采样仪、MA110电子天平";
            //        }
            //        if (i == 4)
            //        {
            //            strCellText = "0.1 mg/m3";
            //        }

            //        awhelpter.CreateCell(builder, strCellText, width);
            //    }
            //    builder.EndRow();
            //}
            //doc.Range.Bookmarks["table"].Text = ""; // 清掉标示 

            doc.Save(Response, "baojiadan.doc", ContentDisposition.Inline, null);

        }
        }
}