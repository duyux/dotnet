using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Aspose.Words;
using Aspose.Words.Tables;
using System.Drawing;


public class AsposeWordsHelper
{

    public AsposeWordsHelper()
    { 
    }
    /// <summary>
    /// 表格Head Cell
    /// author:du
    /// date:20120721
    /// </summary>
    /// <param name="builder"></param>
    /// <param name="strCellValue"></param>
    /// <param name="cellwidth"></param>
    public void CreateHeadCell(DocumentBuilder builder, string strCellValue, double cellwidth)
    {
        builder.InsertCell(); // 添加一个单元格 
        builder.CellFormat.Borders.LineStyle = LineStyle.Single;
        builder.CellFormat.Borders.Color = System.Drawing.Color.Black;
        builder.CellFormat.WrapText=true;
        
        builder.Font.Name = "宋体";
        builder.Font.Size = 10.5;
        // builder.CellFormat.Width = cellwidth;
        builder.CellFormat.VerticalMerge = Aspose.Words.Tables.CellMerge.None;
        builder.Write(strCellValue);


    }

    /// <summary>
    /// 表格Merge Head Cell
    /// author:du
    /// date:20120721
    /// </summary>
    /// <param name="builder"></param>
    /// <param name="strCellValue"></param>
    /// <param name="cellwidth"></param>
    public void CreateMergeCell(ref DocumentBuilder builder, string strCellValue, double cellwidth,int iMergeDirection
            ,CellMerge cm)
    {
        builder.InsertCell(); // 添加一个单元格 
        builder.CellFormat.Borders.LineStyle = LineStyle.Single;
        builder.CellFormat.Borders.Color = System.Drawing.Color.Black;
        builder.CellFormat.WrapText = true;
        if (iMergeDirection == 0)
        {
            builder.CellFormat.VerticalMerge = cm;
        }
        else if (iMergeDirection == 1)
        {
            builder.CellFormat.HorizontalMerge = cm;

        }
       
       
        builder.Font.Name = "宋体";
        builder.Font.Size = 10.5;
        // builder.CellFormat.Width = cellwidth;
       // builder.CellFormat.VerticalMerge = Aspose.Words.Tables.CellMerge.None;
        if (cm!=Aspose.Words.Tables.CellMerge.Previous)
        {
            builder.Write(strCellValue);
        }

    }


    /// <summary>
    /// 表格数据Cell
    /// author:du
    /// date:20120721
    /// </summary>
    /// <param name="builder"></param>
    /// <param name="strCellValue"></param>
    /// <param name="cellwidth"></param>
    public void CreateCell(DocumentBuilder builder,string strCellValue,double cellwidth)
    {
            builder.InsertCell(); // 添加一个单元格 
            builder.CellFormat.Borders.LineStyle = LineStyle.Single;
            builder.CellFormat.Borders.Color = System.Drawing.Color.Black;
            builder.Font.Name = "宋体";
            builder.Font.Size = 10.5;
            builder.Bold = false;
           // builder.CellFormat.Width = cellwidth;
            builder.CellFormat.VerticalMerge = Aspose.Words.Tables.CellMerge.None;
            builder.Write(strCellValue);
             
           
    }

    /// <summary>
    /// Merges the range of cells found between the two specified cells both horizontally and vertically. Can span over multiple rows.
    /// </summary>
    public  void MergeCells(Cell startCell, Cell endCell)
    {
        Table parentTable = startCell.ParentRow.ParentTable;

        // Find the row and cell indices for the start and end cell.
        Point startCellPos = new Point(startCell.ParentRow.IndexOf(startCell), parentTable.IndexOf(startCell.ParentRow));
        Point endCellPos = new Point(endCell.ParentRow.IndexOf(endCell), parentTable.IndexOf(endCell.ParentRow));
        // Create the range of cells to be merged based off these indices. Inverse each index if the end cell if before the start cell. 
        Rectangle mergeRange = new Rectangle(Math.Min(startCellPos.X, endCellPos.X), Math.Min(startCellPos.Y, endCellPos.Y),
            Math.Abs(endCellPos.X - startCellPos.X) + 1, Math.Abs(endCellPos.Y - startCellPos.Y) + 1);

        foreach (Row row in parentTable.Rows)
        {
            foreach (Cell cell in row.Cells)
            {
                Point currentPos = new Point(row.IndexOf(cell), parentTable.IndexOf(row));

                // Check if the current cell is inside our merge range then merge it.
                if (mergeRange.Contains(currentPos))
                {
                    if (currentPos.X == mergeRange.X)
                        cell.CellFormat.HorizontalMerge = CellMerge.First;
                    else
                        cell.CellFormat.HorizontalMerge = CellMerge.Previous;

                    if (currentPos.Y == mergeRange.Y)
                        cell.CellFormat.VerticalMerge = CellMerge.First;
                    else
                        cell.CellFormat.VerticalMerge = CellMerge.Previous;
                }
            }
        }
    }

}

