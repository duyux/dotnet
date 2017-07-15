//
//
//	Copyright?2005. FarPoint Technologies.	All rights reserved.
//
var the_fpSpread = new Fpoint_FPSpread();
function FpSpread_EventHandlers(){
var e4=the_fpSpread;
this.TranslateKey=function (event){
e4.TranslateKey(event);
}
this.SetActiveSpread=function (event){
e4.SetActiveSpread(event);
}
this.MouseDown=function (event){
e4.MouseDown(event);
}
this.MouseUp=function (event){
e4.MouseUp(event);
}
this.MouseMove=function (event){
e4.MouseMove(event);
}
this.DblClick=function (event){
e4.DblClick(event);
}
this.HandleFirstKey=function (event){
e4.HandleFirstKey(event);
}
this.DoPropertyChange=function (event){
e4.DoPropertyChange(event);
}
this.CmdbarMouseOver=function (event){
e4.CmdbarMouseOver(event);
}
this.CmdbarMouseOut=function (event){
e4.CmdbarMouseOut(event);
}
this.ScrollViewport=function (event){
e4.ScrollViewport(event);
}
this.Focus=function (event){
var e5=event.target;
e4.Focus(e5);
}
e4.AttachEvent(document,"keydown",this.TranslateKey,true);
e4.AttachEvent(document,"mousedown",this.SetActiveSpread,false);
e4.AttachEvent(document,"keyup",this.HandleFirstKey,true);
e4.AttachEvent(window,"resize",e4.DoResize,false);
this.AttachEvents=function (e5){
e4.AttachEvent(e5,"mousedown",this.MouseDown,false);
e4.AttachEvent(e5,"mouseup",this.MouseUp,false);
e4.AttachEvent(document,"mouseup",this.MouseUp,false);
e4.AttachEvent(e5,"mousemove",this.MouseMove,false);
e4.AttachEvent(e5,"dblclick",this.DblClick,false);
e4.AttachEvent(e5,"focus",this.Focus,false);
var e6=e4.GetViewport(e5);
if (e6!=null){
e4.AttachEvent(e4.GetViewport(e5).parentNode,"DOMAttrModified",this.DoPropertyChange,true);
e4.AttachEvent(e4.GetViewport(e5).parentNode,"scroll",this.ScrollViewport);
}
var e7=e4.GetCommandBar(e5);
if (e7!=null){
e4.AttachEvent(e7,"mouseover",this.CmdbarMouseOver,false);
e4.AttachEvent(e7,"mouseout",this.CmdbarMouseOut,false);
}
}
this.DetachEvents=function (e5){
e4.DetachEvent(e5,"mousedown",this.MouseDown,false);
e4.DetachEvent(e5,"mouseup",this.MouseUp,false);
e4.DetachEvent(document,"mouseup",this.MouseUp,false);
e4.DetachEvent(e5,"mousemove",this.MouseMove,false);
e4.DetachEvent(e5,"dblclick",this.DblClick,false);
e4.DetachEvent(e5,"focus",this.Focus,false);
var e6=e4.GetViewport(e5);
if (e6!=null){
e4.DetachEvent(e4.GetViewport(e5).parentNode,"DOMAttrModified",this.DoPropertyChange,true);
e4.DetachEvent(e4.GetViewport(e5).parentNode,"scroll",this.ScrollViewport);
}
var e7=e4.GetCommandBar(e5);
if (e7!=null){
e4.DetachEvent(e7,"mouseover",this.CmdbarMouseOver,false);
e4.DetachEvent(e7,"mouseout",this.CmdbarMouseOut,false);
}
}
}
function Fpoint_FPSpread(){
this.working=false;
this.editing=false;
this.a9=null;
this.b0=null;
this.b1=null;
this.renderAsEditor=-1;
this.validationMsg=null;
this.b4=null;
this.b5=null;
this.b6=null;
this.b7=-1;
this.b8=-1;
this.b9=null;
this.c0=null;
this.c1=new Array();
this.error=false;
this.left=37;
this.right=39;
this.up=38;
this.down=40;
this.tab=9;
this.enter=13;
this.shift=16;
this.space=32;
this.altkey=18;
this.home=36;
this.end=35;
this.pup=33;
this.pdn=34;
this.backspace=8;
this.InitFields=function (e5){
if (this.b4==null)
this.b4=new this.Margin();
e5.c9=null;
e5.groupBar=null;
e5.d0=null;
e5.d1=null;
e5.d2=null;
e5.d3=null;
e5.d4=null;
e5.d5=null;
e5.d6=null;
e5.d7=null;
e5.d8="";
e5.d9=null;
e5.e3=false;
e5.slideLeft=0;
e5.slideRight=0;
e5.setAttribute("rowCount",0);
e5.setAttribute("colCount",0);
e5.e0=new Array();
e5.e1=new Array();
e5.e2=new Array();
e5.footerSpanCells=new Array();
this.activePager=null;
this.dragSlideBar=false;
e5.allowColMove=(e5.getAttribute("colMove")=="true");
e5.allowGroup=(e5.getAttribute("allowGroup")=="true");
e5.selectedCols=[];
e5.msgList=new Array();
e5.mouseY=null;
}
this.RegisterSpread=function (e5){
var e8=this.GetTopSpread(e5);
if (e8!=e5)return ;
if (this.spreads==null){
this.spreads=new Array();
}
var e9=this.spreads.length;
for (var f0=0;f0<e9;f0++){
if (this.spreads[f0]==e5)return ;
}
this.spreads.length=e9+1;
this.spreads[e9]=e5;
}
this.Init=function (e5,cmd){
if (e5==null)alert("spread is not defined!");
e5.initialized=false;
this.validationMsg=null;
this.c1=new Array();
this.RegisterSpread(e5);
this.InitFields(e5);
this.InitMethods(e5);
e5.c2=document.getElementById(e5.id+"_XMLDATA");
if (e5.c2==null){
e5.c2=document.createElement("XML");
e5.c2.id=e5.id+"_XMLDATA";
e5.c2.style.display="none";
document.body.insertBefore(e5.c2,null);
}
var f1=document.getElementById(e5.id+"_data");
if (f1!=null&&f1.getAttribute("data")!=null){
e5.c2.innerHTML=f1.getAttribute("data");
f1.value="";
}
this.SaveData(e5);
e5.c3=document.getElementById(e5.id+"_viewport");
if (e5.c3!=null){
e5.c4=e5.c3.parentNode;
}
e5.c5=document.getElementById(e5.id+"_corner");
if (e5.c5!=null&&e5.c5.childNodes.length>0){
e5.c5=e5.c5.getElementsByTagName("TABLE")[0];
}
e5.c6=document.getElementById(e5.id+"_rowHeader");
if (e5.c6!=null)e5.c6=e5.c6.getElementsByTagName("TABLE")[0];
e5.c7=document.getElementById(e5.id+"_colHeader");
if (e5.c7!=null)e5.c7=e5.c7.getElementsByTagName("TABLE")[0];
e5.colFooter=document.getElementById(e5.id+"_colFooter");
if (e5.colFooter!=null)e5.colFooter=e5.colFooter.getElementsByTagName("TABLE")[0];
e5.footerCorner=document.getElementById(e5.id+"_footerCorner");
if (e5.footerCorner!=null&&e5.footerCorner.childNodes.length>0){
e5.footerCorner=e5.footerCorner.getElementsByTagName("TABLE")[0];
}
var c8=e5.c8=document.getElementById(e5.id+"_commandBar");
var f2=this.GetViewport(e5);
if (f2!=null){
e5.setAttribute("rowCount",f2.rows.length);
if (f2.rows.length==1)e5.setAttribute("rowCount",0);
e5.setAttribute("colCount",f2.getAttribute("cols"));
}
var e0=e5.e0;
var e2=e5.e2;
var e1=e5.e1;
var f3=e5.footerSpanCells;
this.InitSpan(e5,this.GetViewport(e5),e0);
this.InitSpan(e5,this.GetColHeader(e5),e2);
this.InitSpan(e5,this.GetRowHeader(e5),e1);
e5.style.overflow="hidden";
if (this.GetParentSpread(e5)==null){
this.LoadScrollbarState(e5);
var f4=this.GetData(e5);
if (f4!=null){
var f5=f4.getElementsByTagName("root")[0];
var f6=f5.getElementsByTagName("activespread")[0];
if (f6!=null&&f6.innerHTML!=""){
this.SetPageActiveSpread(document.getElementById(this.Trim(f6.innerHTML)));
}
}
}
this.InitLayout(e5);
e5.e3=true;
if (this.GetPageActiveSpread()==e5&&(e5.getAttribute("AllowInsert")=="false"||e5.getAttribute("IsNewRow")=="true")){
var f7=this.GetCmdBtn(e5,"Insert");
this.UpdateCmdBtnState(f7,true);
f7=this.GetCmdBtn(e5,"Add");
this.UpdateCmdBtnState(f7,true);
}
this.CreateTextbox(e5);
this.CreateFocusBorder(e5);
this.InitSelection(e5);
e5.initialized=true;
if (this.GetPageActiveSpread()==e5)
{
try {
if (document.b9==null||document.b9==e5||this.IsChild(document.b9,e5)){
if (cmd!="LoadOnDemand")this.Focus(e5);
}
}catch (e){}
}
this.SaveData(e5);
if (this.handlers==null)
this.handlers=new FpSpread_EventHandlers();
this.handlers.DetachEvents(e5);
this.handlers.AttachEvents(e5);
if (c8!=null&&e5.style.position==""){
c8.parentNode.style.backgroundColor=c8.style.backgroundColor;
c8.parentNode.style.borderTop=c8.style.borderTop;
}
this.SyncColSelection(e5);
}
this.Dispose=function (e5){
if (this.handlers==null)
this.handlers=new FpSpread_EventHandlers();
this.handlers.DetachEvents(e5);
}
this.CmdbarMouseOver=function (event){
var f8=this.GetTarget(event);
if (f8!=null&&f8.tagName=="IMG"&&f8.getAttribute("disabled")!="true"){
f8.style.backgroundColor="cyan";
}
}
this.CmdbarMouseOut=function (event){
var f8=this.GetTarget(event);
if (f8!=null&&f8.tagName=="IMG"){
f8.style.backgroundColor="";
}
}
this.DoPropertyChange=function (event){
if (event.attrName=="curpos"){
this.ScrollViewport(event);
}else if (this.b5==null&&this.b6==null&&event.attrName=="pageincrement"&&event.ctrlKey){
var e5=this.GetSpread(this.GetTarget(event));
if (e5!=null)
this.SizeAll(this.GetTopSpread(e5));
}
}
this.HandleFirstKey=function (){
var e5=this.GetPageActiveSpread();
if (e5==null)return ;
var e8=this.GetTopSpread(e5);
var f9=document.getElementById(e8.id+"_textBox");
if (f9!=null&&f9.value!=""){
f9.value="";
}
}
this.IsXHTML=function (e5){
var e8=this.GetTopSpread(e5);
if (e8==null)return false;
var g0=e8.getAttribute("strictMode");
return (g0!=null&&g0=="true");
}
this.GetData=function (e5){
return e5.c2;
}
this.AttachEvent=function (target,event,handler,useCapture){
if (target.addEventListener!=null){
target.addEventListener(event,handler,useCapture);
}else if (target.attachEvent!=null){
target.attachEvent("on"+event,handler);
}
}
this.DetachEvent=function (target,event,handler,useCapture){
if (target.removeEventListener!=null){
target.removeEventListener(event,handler,useCapture);
}else if (target.detachEvent!=null){
target.detachEvent("on"+event,handler);
}
}
this.CancelDefault=function (e){
if (e.preventDefault!=null){
e.preventDefault();
e.stopPropagation();
}else {
e.cancelBubble=false;
e.returnValue=false;
}
return false;
}
this.CreateEvent=function (name){
var g1=document.createEvent("Events")
g1.initEvent(name,true,true);
return g1;
}
this.Refresh=function (e5){
var f8=e5.style.display;
e5.style.display="none";
e5.style.display=f8;
}
this.InitMethods=function (e5){
var e4=this;
e5.Edit=function (){e4.Edit(this);}
e5.Update=function (){e4.Update(this);}
e5.Cancel=function (){e4.Cancel(this);}
e5.Clear=function (){e4.Clear(this);}
e5.Copy=function (){e4.Copy(this);}
e5.Paste=function (){e4.Paste(this);}
e5.Prev=function (){e4.Prev(this);}
e5.Next=function (){e4.Next(this);}
e5.Add=function (){e4.Add(this);}
e5.Insert=function (){e4.Insert(this);}
e5.Delete=function (){e4.Delete(this);}
e5.Print=function (){e4.Print(this);}
e5.StartEdit=function (cell){e4.StartEdit(this,cell);}
e5.EndEdit=function (){e4.EndEdit(this);}
e5.ClearSelection=function (){e4.ClearSelection(this);}
e5.GetSelectedRange=function (){return e4.GetSelectedRange(this);}
e5.SetSelectedRange=function (r,c,rc,cc){e4.SetSelectedRange(this,r,c,rc,cc);}
e5.GetSelectedRanges=function (){return e4.GetSelectedRanges(this);}
e5.AddSelection=function (r,c,rc,cc){e4.AddSelection(this,r,c,rc,cc);}
e5.AddSpan=function (r,c,rc,cc,spans){e4.AddSpan(this,r,c,rc,cc,spans);}
e5.RemoveSpan=function (r,c,spans){e4.RemoveSpan(this,r,c,spans);}
e5.GetActiveRow=function (){var f8=e4.GetRowFromCell(this,this.d2);if (f8<0)return f8;return e4.GetSheetIndex(this,f8);}
e5.GetActiveCol=function (){return e4.GetColFromCell(this,this.d2);}
e5.SetActiveCell=function (r,c){e4.SetActiveCell(this,r,c);}
e5.GetCellByRowCol=function (r,c){return e4.GetCellByRowCol(this,r,c);}
e5.GetValue=function (r,c){return e4.GetValue(this,r,c);}
e5.SetValue=function (r,c,v,noEvent,recalc){e4.SetValue(this,r,c,v,noEvent,recalc);}
e5.GetFormula=function (r,c){return e4.GetFormula(this,r,c);}
e5.SetFormula=function (r,c,f,recalc,clientOnly){e4.SetFormula(this,r,c,f,recalc,clientOnly);}
e5.GetHiddenValue=function (r,colName){return e4.GetHiddenValue(this,r,colName);}
e5.GetSheetRowIndex=function (r){return e4.GetSheetRowIndex(this,r);}
e5.GetSheetColIndex=function (c){return e4.GetSheetColIndex(this,c);}
e5.GetRowCount=function (){return e4.GetRowCount(this);}
e5.GetColCount=function (){return e4.GetColCount(this);}
e5.GetRowByKey=function (key){return e4.GetRowByKey(this,key);}
e5.GetColByKey=function (key){return e4.GetColByKey(this,key);}
e5.GetRowKeyFromRow=function (r){return e4.GetRowKeyFromRow(this,r);}
e5.GetColKeyFromCol=function (c){return e4.GetColKeyFromCol(this,c);}
e5.GetTotalRowCount=function (){return e4.GetTotalRowCount(this);}
e5.GetPageCount=function (){return e4.GetPageCount(this);}
e5.GetParentSpread=function (){return e4.GetParentSpread(this);}
e5.GetChildSpread=function (r,ri){return e4.GetChildSpread(this,r,ri);}
e5.GetChildSpreads=function (){return e4.GetChildSpreads(this);}
e5.GetParentRowIndex=function (){return e4.GetParentRowIndex(this);}
e5.GetActiveChildSheetView=function (){return e4.GetActiveChildSheetView(this);}
e5.GetSpread=function (f8){return e4.GetSpread(f8);}
e5.UpdatePostbackData=function (){e4.UpdatePostbackData(this);}
e5.SizeToFit=function (c){e4.SizeToFit(this,c);}
e5.SetColWidth=function (c,w){e4.SetColWidth(this,c,w);}
e5.GetPreferredRowHeight=function (r){return e4.GetPreferredRowHeight(this,r);}
e5.SetRowHeight2=function (r,h){e4.SetRowHeight2(this,r,h);}
e5.CallBack=function (cmd,asyncCallBack){e4.SyncData(this.getAttribute("name"),cmd,this,asyncCallBack);}
e5.AddKeyMap=function (keyCode,ctrl,shift,alt,action){e4.AddKeyMap(this,keyCode,ctrl,shift,alt,action);}
e5.RemoveKeyMap=function (keyCode,ctrl,shift,alt){e4.RemoveKeyMap(this,keyCode,ctrl,shift,alt);}
e5.MoveToPrevCell=function (){e4.MoveToPrevCell(this);}
e5.MoveToNextCell=function (){e4.MoveToNextCell(this);}
e5.MoveToNextRow=function (){e4.MoveToNextRow(this);}
e5.MoveToPrevRow=function (){e4.MoveToPrevRow(this);}
e5.MoveToFirstColumn=function (){e4.MoveToFirstColumn(this);}
e5.MoveToLastColumn=function (){e4.MoveToLastColumn(this);}
e5.ScrollTo=function (r,c){e4.ScrollTo(this,r,c);}
e5.focus=function (){e4.Focus(this);}
e5.ShowMessage=function (msg,r,c,time){return e4.ShowMessage(this,msg,r,c,time);}
e5.HideMessage=function (r,c){return e4.HideMessage(this,r,c);}
e5.ProcessKeyMap=function (event){
if (this.keyMap!=null){
var e9=this.keyMap.length;
for (var f0=0;f0<e9;f0++){
var g2=this.keyMap[f0];
if (event.keyCode==g2.key&&event.ctrlKey==g2.ctrl&&event.shiftKey==g2.shift&&event.altKey==g2.alt){
var g3=false;
if (typeof(g2.action)=="function")
g3=g2.action();
else 
g3=eval(g2.action);
return g3;
}
}
}
return true;
}
e5.Cells=function (r,c){return e4.Cells(this,r,c);}
e5.Rows=function (r,c){return e4.Rows(this,r,c);}
e5.Columns=function (r,c){return e4.Columns(this,r,c);}
e5.GetTitleInfo=function (r,c){return e4.GetTitleInfo(this,r,c);}
e5.SizeSpread=function (e5){return e4.SizeSpread(e5);}
}
this.CreateTextbox=function (e5){
var e8=this.GetTopSpread(e5);
if (e8==null)return ;
var f9=document.getElementById(e8.id+"_textBox");
if (f9==null)
{
f9=document.createElement('INPUT');
f9.type="text";
f9.setAttribute("autocomplete","off");
f9.style.position="absolute";
f9.style.borderWidth=0;
f9.style.top="-10px";
f9.style.left="-100px";
f9.style.width="1px";
f9.style.height="1px";
if (e5.tabIndex!=null)
f9.tabIndex=e5.tabIndex;
f9.id=e5.id+"_textBox";
e5.insertBefore(f9,e5.firstChild);
}
}
this.CreateLineBorder=function (e5,id){
var g4=document.getElementById(id);
if (g4==null)
{
g4=document.createElement('div');
g4.style.position="absolute";
g4.style.left="-1000px";
g4.style.top="0px";
g4.style.overflow="hidden";
g4.style.border="1px solid black";
if (e5.getAttribute("FocusBorderColor")!=null)
g4.style.borderColor=e5.getAttribute("FocusBorderColor");
if (e5.getAttribute("FocusBorderStyle")!=null)
g4.style.borderStyle=e5.getAttribute("FocusBorderStyle");
g4.id=id;
var g5=this.GetViewport(e5).parentNode;
g5.insertBefore(g4,null);
}
return g4;
}
this.CreateFocusBorder=function (e5){
if (this.GetTopSpread(e5).getAttribute("hierView")=="true")return ;
if (this.GetTopSpread(e5).getAttribute("showFocusRect")=="false")return ;
if (this.GetViewport(e5)==null)return ;
var g4=this.CreateLineBorder(e5,e5.id+"_focusRectT");
g4.style.height=0;
g4=this.CreateLineBorder(e5,e5.id+"_focusRectB");
g4.style.height=0;
g4=this.CreateLineBorder(e5,e5.id+"_focusRectL");
g4.style.width=0;
g4=this.CreateLineBorder(e5,e5.id+"_focusRectR");
g4.style.width=0;
}
this.GetPosIndicator=function (e5){
var g6=e5.posIndicator;
if (g6==null)
g6=this.CreatePosIndicator(e5);
else if (g6.parentNode!=e5)
e5.insertBefore(g6,null);
return g6;
}
this.CreatePosIndicator=function (e5){
var g6=document.createElement("img");
g6.style.position="absolute";
g6.style.top="0px";
g6.style.left="-400px";
g6.style.width="10px";
g6.style.height="10px";
g6.style.zIndex=1000;
g6.id=e5.id+"_posIndicator";
if (e5.getAttribute("clienturl")!=null)
g6.src=e5.getAttribute("clienturl")+"down.gif";
else 
g6.src=e5.getAttribute("clienturlres");
e5.insertBefore(g6,null);
e5.posIndicator=g6;
return g6;
}
this.InitSpan=function (e5,e6,spans){
if (e6!=null){
var g7=0;
if (e6==this.GetViewport(e5))
g7=e6.rows.length;
var g8=e6.rows;
var g9=this.GetColCount(e5);
for (var h0=0;h0<g8.length;h0++){
if (this.IsChildSpreadRow(e5,e6,h0)){
if (e6==this.GetViewport(e5))g7--;
}else {
var h1=g8[h0].cells;
for (var h2=0;h2<h1.length;h2++){
var h3=h1[h2];
if (h3!=null&&((h3.rowSpan!=null&&h3.rowSpan>1)||(h3.colSpan!=null&&h3.colSpan>1))){
var h4=this.GetRowFromCell(e5,h3);
var h5=parseInt(h3.getAttribute("scol"));
if (h5<g9){
this.AddSpan(e5,h4,h5,h3.rowSpan,h3.colSpan,spans);
}
}
}
}
}
if (e6==this.GetViewport(e5))e5.setAttribute("rowCount",g7);
}
}
this.GetColWithSpan=function (e5,h0,spans,h2){
var h6=0;
var h7=0;
if (h2==0){
while (this.IsCovered(e5,h0,h7,spans))
{
h7++;
}
}
for (var f0=0;f0<spans.length;f0++){
if (spans[f0].rowCount>1&&(spans[f0].col<=h2||h2==0&&spans[f0].col<h7)&&h0>=spans[f0].row&&h0<spans[f0].row+spans[f0].rowCount)
h6+=spans[f0].colCount;
}
return h6;
}
this.AddSpan=function (e5,h0,h2,rc,g9,spans){
if (spans==null)spans=e5.e0;
var h8=new this.Range();
this.SetRange(h8,"Cell",h0,h2,rc,g9);
spans.push(h8);
this.PaintFocusRect(e5);
}
this.RemoveSpan=function (e5,h0,h2,spans){
if (spans==null)spans=e5.e0;
for (var f0=0;f0<spans.length;f0++){
var h8=spans[f0];
if (h8.row==h0&&h8.col==h2){
var h9=spans.length-1;
for (var i0=f0;i0<h9;i0++){
spans[i0]=spans[i0+1];
}
spans.length=spans.length-1;
break ;
}
}
this.PaintFocusRect(e5);
}
this.Focus=function (e5){
if (this.editing)return ;
this.SetPageActiveSpread(e5);
var i1=this.GetOperationMode(e5);
if (e5.d2==null&&i1!="MultiSelect"&&i1!="ExtendedSelect"&&e5.GetRowCount()>0&&e5.GetColCount()>0){
var i2=this.FireActiveCellChangingEvent(e5,0,0,0);
if (!i2){
e5.SetActiveCell(0,0);
var g1=this.CreateEvent("ActiveCellChanged");
g1.cmdID=e5.id;
g1.row=g1.Row=0;
g1.col=g1.Col=0;
if (e5.getAttribute("LayoutMode"))
g1.InnerRow=g1.innerRow=0;
this.FireEvent(e5,g1);
}
}
var e8=this.GetTopSpread(e5);
var f9=document.getElementById(e8.id+"_textBox");
if (e5.d2!=null){
var i3=this.GetEditor(e5.d2);
if (i3==null){
if (f9!=null){
if (this.b9!=f9){
try {f9.focus();}catch (g1){}
}
}
}else {
if (i3.tagName!="SELECT")i3.focus();
this.SetEditorFocus(i3);
}
}else {
if (f9!=null){
try {f9.focus();}catch (g1){}
}
}
this.EnableButtons(e5);
}
this.GetTotalRowCount=function (e5){
var f8=parseInt(e5.getAttribute("totalRowCount"));
if (isNaN(f8))f8=0;
return f8;
}
this.GetPageCount=function (e5){
var f8=parseInt(e5.getAttribute("pageCount"));
if (isNaN(f8))f8=0;
return f8;
}
this.GetColCount=function (e5){
var f8=parseInt(e5.getAttribute("colCount"));
if (isNaN(f8))f8=0;
return f8;
}
this.GetRowCount=function (e5){
var f8=parseInt(e5.getAttribute("rowCount"));
if (isNaN(f8))f8=0;
return f8;
}
this.GetRowCountInternal=function (e5){
var f8=parseInt(this.GetViewport(e5).rows.length);
if (isNaN(f8))f8=0;
return f8;
}
this.IsChildSpreadRow=function (e5,view,h0){
if (e5==null||view==null)return false;
if (h0>=1&&h0<view.rows.length){
if (view.rows[h0].cells.length>0&&view.rows[h0].cells[0]!=null&&view.rows[h0].cells[0].firstChild!=null){
var f8=view.rows[h0].cells[0].firstChild;
if (f8.nodeName!="#text"&&f8.getAttribute("FpSpread")=="Spread")return true;
}
}
return false;
}
this.GetChildSpread=function (e5,row,rindex){
var i4=this.GetViewport(e5);
if (i4!=null){
var h0=this.GetDisplayIndex(e5,row)+1;
if (typeof(rindex)=="number")h0+=rindex;
if (h0>=1&&h0<i4.rows.length){
if (i4.rows[h0].cells.length>0&&i4.rows[h0].cells[0]!=null&&i4.rows[h0].cells[0].firstChild!=null){
var f8=i4.rows[h0].cells[0].firstChild;
if (f8.nodeName!="#text"&&f8.getAttribute("FpSpread")=="Spread"){
return f8;
}
}
}
}
return null;
}
this.GetChildSpreads=function (e5){
var f0=0;
var g3=new Array();
var i4=this.GetViewport(e5);
if (i4!=null){
for (var h0=1;h0<i4.rows.length;h0++){
if (i4.rows[h0].cells.length>0&&i4.rows[h0].cells[0]!=null&&i4.rows[h0].cells[0].firstChild!=null){
var f8=i4.rows[h0].cells[0].firstChild;
if (f8.nodeName!="#text"&&f8.getAttribute("FpSpread")=="Spread"){
g3.length=f0+1;
g3[f0]=f8;
f0++;
}
}
}
}
return g3;
}
this.GetDisplayIndex=function (e5,row){
if (row<0)return -1;
var f0=0;
var h0=0;
var i4=this.GetViewport(e5);
if (i4!=null){
for (f0=0;f0<i4.rows.length;f0++){
if (this.IsChildSpreadRow(e5,i4,f0))continue ;
if (h0==row)break ;
h0++;
}
}
return f0;
}
this.GetSheetIndex=function (e5,row,c3){
var f0=0
var h0=0;
var i4=c3;
if (i4==null)i4=this.GetViewport(e5);
if (i4!=null){
if (row<0||row>=i4.rows.length)return -1;
for (f0=0;f0<row;f0++){
if (this.IsChildSpreadRow(e5,i4,f0))continue ;
h0++;
}
}
return h0;
}
this.GetParentRowIndex=function (e5){
var i5=this.GetParentSpread(e5);
if (i5==null)return -1;
var i4=this.GetViewport(i5);
if (i4==null)return -1;
var i6=e5.parentNode.parentNode;
var f0=i6.rowIndex-1;
for (;f0>0;f0--){
if (this.IsChildSpreadRow(i5,i4,f0))continue ;
else 
break ;
}
return this.GetSheetIndex(i5,f0,i4);
}
this.CreateTestBox=function (e5){
var i7=document.getElementById(e5.id+"_testBox");
if (i7==null)
{
i7=document.createElement("span");
i7.style.position="absolute";
i7.style.borderWidth=0;
i7.style.top="-500px";
i7.style.left="-100px";
i7.id=e5.id+"_testBox";
e5.insertBefore(i7,e5.firstChild);
}
return i7;
}
this.SizeToFit=function (e5,h2){
if (h2==null||h2<0)h2=0;
var e6=this.GetViewport(e5);
if (e6!=null){
var i7=this.CreateTestBox(e5);
var g8=e6.rows;
var i8=0;
for (var h0=0;h0<g8.length;h0++){
if (!this.IsChildSpreadRow(e5,e6,h0)){
var i9=this.GetCellFromRowCol(e5,h0,h2);
if (i9.colSpan>1)continue ;
var j0=this.GetPreferredCellWidth(e5,i9,i7);
if (j0>i8)i8=j0;
}
}
this.SetColWidth(e5,h2,i8);
}
}
this.GetPreferredCellWidth=function (e5,i9,i7){
if (i7==null)i7=this.CreateTestBox(e5);
var j1=this.GetRender(e5,i9);
var j2=this.GetCellType(i9);
var j3=this.GetEditor(i9);
if (j1!=null){
i7.style.fontFamily=j1.style.fontFamily;
i7.style.fontSize=j1.style.fontSize;
i7.style.fontWeight=j1.style.fontWeight;
i7.style.fontStyle=j1.style.fontStyle;
}
if (j1!=null&&j2=="MultiColumnComboBoxCellType"){
var j4=i9.getElementsByTagName("Table")[0];
if (j4!=null){
i7.innerHTML=this.GetEditorValue(j3)+"123";
}
}
else {
i7.innerHTML=i9.innerHTML;
}
var j0=i7.offsetWidth+8;
if (i9.style.paddingLeft!=null&&i9.style.paddingLeft.length>0)
j0+=parseInt(i9.style.paddingLeft);
if (i9.style.paddingRight!=null&&i9.style.paddingRight.length>0)
j0+=parseInt(i9.style.paddingRight);
return j0;
}
this.GetHierBar=function (e5){
if (e5.c9==null)e5.c9=document.getElementById(e5.id+"_hierBar");
return e5.c9;
}
this.GetGroupBar=function (e5){
if (e5.groupBar==null)e5.groupBar=document.getElementById(e5.id+"_groupBar");
return e5.groupBar;
}
this.GetPager1=function (e5){
if (e5.d0==null)e5.d0=document.getElementById(e5.id+"_pager1");
return e5.d0;
}
this.GetPager2=function (e5){
if (e5.d1==null)e5.d1=document.getElementById(e5.id+"_pager2");
return e5.d1;
}
this.SynRowHeight=function (e5,c6,e6,h0,updateParent,header,c5){
if (c6==null||e6==null)return ;
if (typeof(c6.rows[h0])!="undefined"&&
typeof(c6.rows[h0].cells[0])!="undefined")
{
if (c6.rows[h0].cells[0].style.posHeight==null||c6.rows[h0].cells[0].style.posHeight=="")
c6.rows[h0].cells[0].style.posHeight=c6.rows[h0].offsetHeight-1;
}
var j5=c6.rows[h0].offsetHeight;
var g5=e6.rows[h0].offsetHeight;
if (j5==g5&&(h0>0||c5))return ;
var j6=0;
if (e6.cellSpacing=="0"&&h0==0){
if (document.defaultView!=null&&document.defaultView.getComputedStyle!=null){
var j7=0;
for (var f0=0;f0<e6.rows[h0].cells.length;f0++){
j7=parseInt(document.defaultView.getComputedStyle(e6.rows[h0].cells[f0],'').getPropertyValue("border-top-width"));
if (j7>j6)j6=j7;
}
}
}
e6.rows[h0].style.height="";
var j8=Math.max(j5,g5);
j6=parseInt(j6/2);
var j9=this.IsXHTML(e5);
if (this.IsChildSpreadRow(e5,e6,h0)){
if (j9)j8-=1;
c6.rows[h0].cells[0].style.posHeight=j8-1;
return ;
}
if (j8==j5){
if (e6.rows[h0].cells[0]!=null){
if (e6.cellSpacing=="0"&&h0==0){
e6.rows[h0].cells[0].style.posHeight+=(j8-g5-j6);
}else {
e6.rows[h0].cells[0].style.posHeight+=(j8-g5);
}
}
}else {
if (c6.rows[h0].cells[0]!=null){
if (c6.cellSpacing=="0"&&h0==0){
c6.rows[h0].cells[0].style.posHeight+=(j8-j5+j6);
}else {
c6.rows[h0].cells[0].style.posHeight+=(j8-j5);
}
}
}
if (updateParent){
var i5=this.GetParentSpread(e5);
if (i5!=null)this.UpdateRowHeight(i5,e5);
}
}
this.SizeAll=function (e5){
var k0=this.GetChildSpreads(e5);
if (k0!=null&&k0.length>0){
for (var f0=0;f0<k0.length;f0++){
this.SizeAll(k0[f0]);
}
}
this.SizeSpread(e5);
if (this.GetParentSpread(e5)!=null)
this.Refresh(e5);
}
this.SizeSpread=function (e5){
if (e5.clientHeight==0||e5.clientWidth==0)return ;
var j9=this.IsXHTML(e5);
var c3=this.GetViewport(e5);
if (c3==null)return ;
this.SyncMsgs(e5);
var c6=this.GetRowHeader(e5);
if (c6!=null){
for (var f0=0;f0<c3.rows.length&&f0<c6.rows.length;f0++){
this.SynRowHeight(e5,c6,c3,f0,false,true);
this.SynRowHeight(e5,c6,c3,f0,false,true);
if (f0==0&&c6.rows[0].cells[0]&&c3.rows[0].cells[0]&&c3.rows[0].cells[0].getAttribute("CellType2")=="SlideShowCellType")
c6.rows[0].cells[0].style.posHeight=c3.rows[0].cells[0].offsetHeight-1;
}
}
var k1=this.GetColFooter(e5);
var c7=this.GetColHeader(e5);
var c5=this.GetCorner(e5);
if (c5!=null&&c7!=null&&c5.getAttribute("allowTableCorner")){
for (var f0=0;f0<c5.rows.length&&f0<c7.rows.length;f0++){
if (c7.rows[f0].cells.length){
if (c7.rows[0].cells.length>1)
this.SynRowHeight(e5,c7,c5,f0,true,true,false);
this.SynRowHeight(e5,c5,c7,f0,true,false,true);
}
}
}
var k2=this.GetColGroup(c3);
var k3=this.GetColGroup(c7);
if (k2!=null&&k2.childNodes.length>0&&k3!=null&&k3.childNodes.length>0){
var k4=-1;
if (this.b5!=null)k4=parseInt(this.b5.getAttribute("index"));
if (this.b5==null||k4==0)
{
var k5=parseInt(k2.childNodes[0].width);var k6=parseInt(k2.childNodes[0].offsetLeft);
k3.childNodes[0].width=""+(k5-k6)+"px";
k2.childNodes[0].width=""+k5+"px";
this.SetWidthFix(c7,0,(k5-k6));
this.SetWidthFix(c3,0,k5);
}
}
var i5=this.GetParentSpread(e5);
if (i5!=null)this.UpdateRowHeight(i5,e5);
var j8=e5.clientHeight;
var k7=this.GetCommandBar(e5);
if (k7!=null)
{
k7.style.width=""+e5.clientWidth+"px";
if (e5.style.position!="absolute"&&e5.style.position!="relative"){
k7.parentNode.style.borderTop="1px solid white";
k7.parentNode.style.backgroundColor=k7.style.backgroundColor;
}
var k8=this.GetElementById(k7,e5.id+"_cmdTable");
if (k8!=null){
if (e5.style.position!="absolute"&&e5.style.position!="relative"&&(k8.style.height==""||parseInt(k8.style.height)<27)){
k8.style.height=""+(k8.offsetHeight+3)+"px";
}
if (!j9&&parseInt(c3.cellSpacing)>0)
k8.parentNode.style.height=""+(k8.offsetHeight+3)+"px";
j8-=Math.max(k8.parentNode.offsetHeight,k8.offsetHeight);
}
if (e5.style.position!="absolute"&&e5.style.position!="relative")
k7.style.position="";
}
var c7=this.GetColHeader(e5);
if (c7!=null)
{
j8-=c7.offsetHeight;
c7.parentNode.style.height=""+(c7.offsetHeight-parseInt(c7.cellSpacing))+"px";
if (j9)
j8+=parseInt(c7.cellSpacing);
}
var k1=this.GetColFooter(e5);
if (k1!=null)
{
j8-=k1.offsetHeight;
k1.parentNode.style.height=""+(k1.offsetHeight)+"px";
}
var c9=this.GetHierBar(e5);
if (c9!=null)
{
j8-=c9.offsetHeight;
}
var k9=document.getElementById(e5.id+"_titleBar");
if (k9)j8-=k9.parentNode.parentNode.offsetHeight;
var l0=this.GetGroupBar(e5);
if (l0!=null){
j8-=l0.offsetHeight;
}
var d0=this.GetPager1(e5);
if (d0!=null)
{
j8-=d0.offsetHeight;
this.InitSlideBar(e5,d0);
}
var l1=(e5.getAttribute("cmdTop")=="true");
var d1=this.GetPager2(e5);
if (d1!=null)
{
d1.style.width=""+(e5.clientWidth-10)+"px";
j8-=Math.max(d1.offsetHeight,28);
this.InitSlideBar(e5,d1);
}
var l2=null;
if (c6!=null)l2=c6.parentNode;
var l3=null;
if (c7!=null)l3=c7.parentNode;
var l4=null;
if (k1!=null)l4=k1.parentNode;
var l5=this.GetFooterCorner(e5);
if (l4!=null)
{
l4.style.height=""+k1.offsetHeight-parseInt(c3.cellSpacing)+"px";
if (l5!=null){
l5.parentNode.style.height=l4.style.height;
}
}
if (l5!=null&&!j9)
l5.width=""+(l5.parentNode.offsetWidth+parseInt(c3.cellSpacing))+"px";
var l6=c3.parentNode;
var c5=this.GetCorner(e5);
if (j9&&l3!=null)
{
l3.style.height=""+c7.offsetHeight-parseInt(c3.cellSpacing)+"px";
if (c5!=null){
c5.parentNode.style.height=l3.style.height;
}
}
if (c5!=null&&!j9)
c5.width=""+(c5.parentNode.offsetWidth+parseInt(c3.cellSpacing))+"px";
if (l6!=null){
if (l2!=null){
l6.style.width=""+Math.max(e5.clientWidth-l2.offsetWidth+parseInt(c3.cellSpacing),1)+"px";
l6.style.height=""+Math.max(j8,1)+"px";
l6.style.width=""+Math.max(e5.clientWidth-l2.offsetWidth+parseInt(c3.cellSpacing),1)+"px";
}else {
l6.style.width=""+Math.max(e5.clientWidth,1)+"px";
l6.style.height=""+Math.max(j8,1)+"px";
l6.style.width=""+Math.max(e5.clientWidth,1)+"px";
}
}
var l7=0;
if (this.GetColFooter(e5)){
l7=this.GetColFooter(e5).offsetHeight;
}
if (k7!=null&&!l1){
if (d1!=null){
if (e5.style.position=="absolute"||e5.style.position=="relative"){
k7.style.position="absolute";
k7.style.top=""+(e5.clientHeight-Math.max(d1.offsetHeight,28)-k7.offsetHeight)+"px";
}else {
k7.style.position="absolute";
k7.style.top=""+(c3.parentNode.offsetTop+l7+c3.parentNode.offsetHeight)+"px";
}
}else {
if (e5.style.position=="absolute"||e5.style.position=="relative")
{
k7.style.position="absolute";
k7.style.top=""+(e5.clientHeight-k7.offsetHeight)+"px";
}else {
k7.style.position="absolute";
if (d1!=null)
k7.style.top=""+(this.GetOffsetTop(e5,e5,document.body)+e5.clientHeight-Math.max(d1.offsetHeight,28)-k7.offsetHeight)+"px";
else 
k7.style.top=""+(this.GetOffsetTop(e5,e5,document.body)+e5.clientHeight-k7.offsetHeight+1)+"px";
}
}
}
if (d1!=null)
{
if (e5.style.position=="absolute"||e5.style.position=="relative"){
d1.style.position="absolute";
d1.style.top=""+(e5.clientHeight-Math.max(d1.offsetHeight,28))+"px";
}else {
d1.style.position="absolute";
if (k7!=null&&!l1)
d1.style.top=""+(c3.parentNode.offsetTop+c3.parentNode.offsetHeight+k7.offsetHeight+l7)+"px";
else 
d1.style.top=""+(c3.parentNode.offsetTop+c3.parentNode.offsetHeight+l7)+"px";
}
}
if (l2!=null){
if (j9)l2.style.height=""+Math.max(l6.offsetHeight,1)+"px";
else l2.style.height=Math.max(l6.offsetHeight,1);
}
if (c3&&!c6){
c3.parentNode.parentNode.style.height=""+c3.parentNode.offsetHeight+"px";
}
return ;
if (this.GetParentSpread(e5)==null&&l3!=null){
var j0=0;
if (l2!=null){
j0=Math.max(e5.clientWidth-l2.offsetWidth,1);
}else {
j0=Math.max(e5.clientWidth,1);
}
l3.style.width=j0;
l3.parentNode.style.width=j0;
}
if (j9)
{
if (c3!=null){
c3.style.posTop=-c3.cellSpacing;
var l8=e5.clientWidth;
if (c6!=null)l8-=c6.parentNode.offsetWidth;
c3.parentNode.style.width=""+l8+"px";
}
if (c6!=null){
c6.style.position="relative";
c6.parentNode.style.position="relative";
c6.style.posTop=-c3.cellSpacing;
c6.width=""+(c6.parentNode.offsetWidth)+"px";
}
}else {
if (c3!=null){
var l8=e5.clientWidth;
if (c6!=null){
l8-=c6.parentNode.offsetWidth;
c6.width=""+(c6.parentNode.offsetWidth+parseInt(c3.cellSpacing))+"px";
}
c3.parentNode.style.width=""+l8+"px";
}
}
this.ScrollView(e5);
this.PaintFocusRect(e5);
}
this.InitSlideBar=function (e5,pager){
var l9=this.GetElementById(pager,e5.id+"_slideBar");
if (l9!=null){
var j9=this.IsXHTML(e5);
if (j9)
l9.style.height=Math.max(pager.offsetHeight,28)+"px";
else 
l9.style.height=(pager.offsetHeight-2)+"px";
var f8=pager.getElementsByTagName("TABLE");
if (f8!=null&&f8.length>0){
var m0=f8[0].rows[0];
var h5=m0.cells[0];
var m1=m0.cells[2];
e5.slideLeft=Math.max(107,h5.offsetWidth+1);
if (h5.style.paddingRight!="")e5.slideLeft+=parseInt(h5.style.paddingRight);
e5.slideRight=pager.offsetWidth-m1.offsetWidth-l9.offsetWidth-3;
if (m1.style.paddingRight!="")e5.slideRight-=parseInt(m1.style.paddingLeft);
var m2=parseInt(pager.getAttribute("curPage"));
var m3=parseInt(pager.getAttribute("totalPage"))-1;
if (m3==0)m3=1;
var m4=false;
var l8=Math.max(107,e5.slideLeft)+(m2/m3)*(e5.slideRight-e5.slideLeft);
if (pager.id.indexOf("pager1")>=0&&e5.style.position!="absolute"&&e5.style.position!="relative"){
l8+=this.GetOffsetLeft(e5,pager,document);
var m5=(this.GetOffsetTop(e5,h5,pager)+this.GetOffsetTop(e5,pager,document));
l9.style.top=m5+"px";
m4=true;
}
var k9=document.getElementById(e5.id+"_titleBar");
if (pager.id.indexOf("pager1")>=0&&!m4&&k9!=null){
var m5=k9.parentNode.parentNode.offsetHeight;
l9.style.top=m5+"px";
}
l9.style.left=l8+"px";
}
}
}
this.InitLayout=function (e5){
this.SizeSpread(e5);
this.SizeSpread(e5);
this.SizeSpread(e5);
}
this.GetRowByKey=function (e5,key){
if (key=="-1")
return -1;
var m6=this.GetViewport(e5);
if (m6!=null){
for (var i6=0;i6<m6.rows.length;i6++){
if (m6.rows[i6].getAttribute("FpKey")==key){
return i6;
}
}
}
if (m6!=null)
return 0;
else 
return -1;
}
this.GetColByKey=function (e5,key){
if (key=="-1")
return -1;
var m6=this.GetViewport(e5);
var m7=this.GetColGroup(m6);
if (m7==null||m7.childNodes.length==0)
m7=this.GetColGroup(this.GetColHeader(e5));
if (m7!=null){
for (var m8=0;m8<m7.childNodes.length;m8++){
var f8=m7.childNodes[m8];
if (f8.getAttribute("FpCol")==key){
return m8;
}
}
}
return 0;
}
this.IsRowSelected=function (e5,i6){
var m9=this.GetSelection(e5);
if (m9!=null){
var n0=m9.firstChild;
while (n0!=null){
var h0=parseInt(n0.getAttribute("rowIndex"));
var n1=parseInt(n0.getAttribute("rowcount"));
if (h0<=i6&&i6<h0+n1)
return true;
n0=n0.nextSibling;
}
}
}
this.InitSelection=function (e5){
var h0=0;
var h2=0;
var f4=this.GetData(e5);
if (f4==null)return ;
var f5=f4.getElementsByTagName("root")[0];
var n2=f5.getElementsByTagName("state")[0];
var m9=n2.getElementsByTagName("selection")[0];
var n3=n2.firstChild;
while (n3!=null&&n3.tagName!="activerow"&&n3.tagName!="ACTIVEROW"){
n3=n3.nextSibling;
}
if (n3!=null)
h0=this.GetRowByKey(e5,n3.innerHTML);
if (h0>=this.GetRowCount(e5))h0=0;
var n4=n2.firstChild;
while (n4!=null&&n4.tagName!="activecolumn"&&n4.tagName!="ACTIVECOLUMN"){
n4=n4.nextSibling;
}
if (n4!=null)
h2=this.GetColByKey(e5,n4.innerHTML);
if (h0<0)h0=0;
if (h0>=0||h2>=0){
var n5=f4;
if (this.GetParentSpread(e5)!=null){
var n6=this.GetTopSpread(e5);
if (n6.initialized)n5=this.GetData(n6);
f5=n5.getElementsByTagName("root")[0];
}
var n7=f5.getElementsByTagName("activechild")[0];
e5.d4=h0;e5.d5=h2;
if ((this.GetParentSpread(e5)==null&&(n7==null||n7.innerHTML==""))||(n7!=null&&e5.id==this.Trim(n7.innerHTML))){
this.UpdateAnchorCell(e5,h0,h2);
}else {
e5.d2=this.GetCellFromRowCol(e5,h0,h2);
}
}
var n0=m9.firstChild;
while (n0!=null){
var h0=this.GetRowByKey(e5,n0.getAttribute("row"));
var h2=this.GetColByKey(e5,n0.getAttribute("col"));
var n1=parseInt(n0.getAttribute("rowcount"));
var g9=parseInt(n0.getAttribute("colcount"));
n0.setAttribute("rowIndex",h0);
n0.setAttribute("colIndex",h2);
this.PaintSelection(e5,h0,h2,n1,g9,true);
n0=n0.nextSibling;
}
this.PaintFocusRect(e5);
}
this.TranslateKey=function (event){
event=this.GetEvent(event);
var n8=this.GetTarget(event);
try {
if (document.readyState!=null&&document.readyState!="complete")return ;
var e5=this.GetPageActiveSpread();
if (event.altKey&&event.keyCode==this.down&&typeof(n8.getAttribute("mccbparttype"))!="undefined"&&n8.getAttribute("mccbparttype")=="DropDownButton")return ;
if (typeof(e5.getAttribute("mcctCellType"))!="undefined"&&e5.getAttribute("mcctCellType")=="true")return ;
if (this.GetOperationMode(e5)=="RowMode"&&this.GetEnableRowEditTemplate(e5)=="true"&&this.IsInRowEditTemplate(e5,n8))return ;
if (e5!=null){
if (event.keyCode==229){
this.CancelDefault(event);
return ;
}
if (!this.IsChild(n8,this.GetTopSpread(e5)))return ;
this.KeyDown(e5,event);
var n9=false;
if (event.keyCode==this.tab){
var o0=this.GetProcessTab(e5);
n9=(o0=="true"||o0=="True");
}
if (n9)
this.CancelDefault(event);
}
}catch (g1){}
}
this.IsInRowEditTemplate=function (e5,n8){
while (n8&&n8.parentNode){
n8=n8.parentNode;
if (n8.tagName=="DIV"&&n8.id==e5.id+"_RowEditTemplateContainer")
return true;
}
return false;
}
this.KeyAction=function (key,ctrl,shift,alt,action){
this.key=key;
this.ctrl=ctrl;
this.shift=shift;
this.alt=alt;
this.action=action;
}
this.RemoveKeyMap=function (e5,keyCode,ctrl,shift,alt,action){
if (e5.keyMap==null)e5.keyMap=new Array();
var e9=e5.keyMap.length;
for (var f0=0;f0<e9;f0++){
var g2=e5.keyMap[f0];
if (g2!=null&&g2.key==keyCode&&g2.ctrl==ctrl&&g2.shift==shift&&g2.alt==alt){
for (var i0=f0+1;i0<e9;i0++){
e5.keyMap[i0-1]=e5.keyMap[i0];
}
e5.keyMap.length=e5.keyMap.length-1;
break ;
}
}
}
this.AddKeyMap=function (e5,keyCode,ctrl,shift,alt,action){
if (e5.keyMap==null)e5.keyMap=new Array();
var g2=this.GetKeyAction(e5,keyCode,ctrl,shift,alt);
if (g2!=null){
g2.action=action;
}else {
var e9=e5.keyMap.length;
e5.keyMap.length=e9+1;
e5.keyMap[e9]=new this.KeyAction(keyCode,ctrl,shift,alt,action);
}
}
this.GetKeyAction=function (e5,keyCode,ctrl,shift,alt){
if (e5.keyMap==null)e5.keyMap=new Array();
var e9=e5.keyMap.length;
for (var f0=0;f0<e9;f0++){
var g2=e5.keyMap[f0];
if (g2!=null&&g2.key==keyCode&&g2.ctrl==ctrl&&g2.shift==shift&&g2.alt==alt){
return g2;
}
}
return null;
}
this.MoveToPrevCell=function (e5){
var o1=this.EndEdit(e5);
if (!o1)return ;
var h0=e5.GetActiveRow();
var h2=e5.GetActiveCol();
this.MoveLeft(e5,h0,h2);
}
this.MoveToNextCell=function (e5){
var o1=this.EndEdit(e5);
if (!o1)return ;
var h0=e5.GetActiveRow();
var h2=e5.GetActiveCol();
this.MoveRight(e5,h0,h2);
}
this.MoveToNextRow=function (e5){
var o1=this.EndEdit(e5);
if (!o1)return ;
var h0=e5.GetActiveRow();
var h2=e5.GetActiveCol();
this.MoveDown(e5,h0,h2);
}
this.MoveToPrevRow=function (e5){
var o1=this.EndEdit(e5);
if (!o1)return ;
var h0=e5.GetActiveRow();
var h2=e5.GetActiveCol();
if (h0>0)
this.MoveUp(e5,h0,h2);
}
this.MoveToFirstColumn=function (e5){
var o1=this.EndEdit(e5);
if (!o1)return ;
var h0=e5.GetActiveRow();
if (e5.d2.parentNode.rowIndex>=0)
this.UpdateLeadingCell(e5,h0,0);
}
this.MoveToLastColumn=function (e5){
var o1=this.EndEdit(e5);
if (!o1)return ;
var h0=e5.GetActiveRow();
if (e5.d2.parentNode.rowIndex>=0){
h2=this.GetColCount(e5)-1;
this.UpdateLeadingCell(e5,h0,h2);
}
}
this.UpdatePostbackData=function (e5){
this.SaveData(e5);
}
this.PrepareData=function (n0){
var g3="";
if (n0!=null){
if (n0.nodeName=="#text")
g3=n0.nodeValue;
else {
g3=this.GetBeginData(n0);
var f8=n0.firstChild;
while (f8!=null){
var o2=this.PrepareData(f8);
if (o2!="")g3+=o2;
f8=f8.nextSibling;
}
g3+=this.GetEndData(n0);
}
}
return g3;
}
this.GetBeginData=function (n0){
var g3="<"+n0.nodeName.toLowerCase();
if (n0.attributes!=null){
for (var f0=0;f0<n0.attributes.length;f0++){
var o3=n0.attributes[f0];
if (o3.nodeName!=null&&o3.nodeName!=""&&o3.nodeName!="style"&&o3.nodeValue!=null&&o3.nodeValue!="")
g3+=(" "+o3.nodeName+"=\""+o3.nodeValue+"\"");
}
}
g3+=">";
return g3;
}
this.GetEndData=function (n0){
return "</"+n0.nodeName.toLowerCase()+">";
}
this.SaveData=function (e5){
if (e5==null)return ;
try {
var f4=this.GetData(e5);
var f5=f4.getElementsByTagName("root")[0];
var f8=this.PrepareData(f5);
var o4=document.getElementById(e5.id+"_data");
o4.value=encodeURIComponent(f8);
}catch (g1){
alert("e "+g1);
}
}
this.SetActiveSpread=function (event){
try {
event=this.GetEvent(event);
var n8=this.GetTarget(event);
var o5=this.GetSpread(n8,false);
var o6=this.GetPageActiveSpread();
if (this.editing&&(o5==null||(o5!=o6&&o5.getAttribute("mcctCellType")!="true"&&o6.getAttribute("mcctCellType")!="true"))){
if (n8!=this.a9&&this.a9!=null){
if (this.a9.blur!=null)this.a9.blur();
}
var o1=this.EndEdit();
if (!o1)return ;
}
var o7=false;
if (o5==null){
o5=this.GetSpread(n8,true);
o7=(o5!=null);
}
var h3=this.GetCell(n8,true);
if (h3==null&&o6!=null&&o6.e3){
this.SaveData(o6);
o6.e3=false;
}
if (o6!=null&&o6.e3&&(o5!=o6||o5==null||o7)){
this.SaveData(o6);
o6.e3=false;
}
if (o6!=null&&o6.e3&&o5==o6&&n8.tagName=="INPUT"&&(n8.type=="submit"||n8.type=="button"||n8.type=="image")){
this.SaveData(o6);
o6.e3=false;
}
if (o5!=null&&this.GetOperationMode(o5)=="ReadOnly")return ;
var n6=null;
if (o5==null){
if (o6==null)return ;
n6=this.GetTopSpread(o6);
this.SetActiveSpreadID(n6,"",null,false);
this.SetPageActiveSpread(null);
}else {
if (o5!=o6){
if (o6!=null){
n6=this.GetTopSpread(o6);
this.SetActiveSpreadID(n6,"",null,false);
}
if (o7){
n6=this.GetTopSpread(o5);
var j7=this.GetTopSpread(o6);
if (n6!=j7){
this.SetActiveSpreadID(n6,o5.id,o5.id,true);
this.SetPageActiveSpread(o5);
}else {
this.SetActiveSpreadID(n6,o6.id,o6.id,true);
this.SetPageActiveSpread(o6);
}
}else {
n6=this.GetTopSpread(o5);
this.SetPageActiveSpread(o5);
this.SetActiveSpreadID(n6,o5.id,o5.id,false);
}
}
}
}catch (g1){}
}
this.SetActiveSpreadID=function (e5,id,child,o7){
var f4=this.GetData(e5);
var f5=f4.getElementsByTagName("root")[0];
var f6=f5.getElementsByTagName("activespread")[0];
var o8=f5.getElementsByTagName("activechild")[0];
if (f6==null)return ;
if (o7&&o8!=null&&o8.nodeValue!=""){
f6.innerHTML=o8.innerHTML;
}else {
f6.innerHTML=id;
if (child!=null&&o8!=null)o8.innerHTML=child;
}
this.SaveData(e5);
e5.e3=false;
}
this.GetSpread=function (ele,incCmdBar){
var j0=ele;
while (j0!=null&&j0.tagName!="BODY"){
if (typeof(j0.getAttribute)!="function")break ;
var e5=j0.getAttribute("FpSpread");
if (e5==null)e5=j0.FpSpread;
if (e5=="Spread"){
if (!incCmdBar){
var f8=ele;
while (f8!=null&&f8!=j0){
if (f8.id==j0.id+"_commandBar"||f8.id==j0.id+"_pager1"||f8.id==j0.id+"_pager2")return null;
f8=f8.parentNode;
}
}
return j0;
}
j0=j0.parentNode;
}
return null;
}
this.ScrollViewport=function (event){
var f8=this.GetTarget(event);
var e5=this.GetTopSpread(f8);
if (e5!=null)this.ScrollView(e5);
}
this.GetActiveChildSheetView=function (e5){
var o6=this.GetPageActiveSheetView();
if (typeof(o6)=="undefined")return null;
var n6=this.GetTopSpread(e5);
var o9=this.GetTopSpread(o6);
if (o9!=n6)return null;
if (o6==o9)return null;
return o6;
}
this.ScrollTo=function (e5,i6,m8){
var h3=this.GetCellByRowCol(e5,i6,m8);
if (h3==null)return ;
var i4=this.GetViewport(e5).parentNode;
if (i4==null)return ;
i4.scrollTop=h3.offsetTop;
i4.scrollLeft=h3.offsetLeft;
}
this.ScrollView=function (e5){
var o5=this.GetTopSpread(e5);
var c6=this.GetParent(this.GetRowHeader(o5));
var c7=this.GetParent(this.GetColHeader(o5));
var k1=this.GetParent(this.GetColFooter(o5));
var i4=this.GetParent(this.GetViewport(o5));
var p0=false;
if (c6!=null){
p0=(c6.scrollTop!=i4.scrollTop);
c6.scrollTop=i4.scrollTop;
}
if (c7!=null){
if (!p0)p0=(c7.scrollLeft!=i4.scrollLeft);
c7.scrollLeft=i4.scrollLeft;
}
if (k1!=null){
if (!p0)p0=(k1.scrollLeft!=i4.scrollLeft);
k1.scrollLeft=i4.scrollLeft;
}
if (this.GetParentSpread(e5)==null)this.SaveScrollbarState(e5,i4.scrollTop,i4.scrollLeft);
if (p0){
var g1=this.CreateEvent("Scroll");
this.FireEvent(e5,g1);
if (e5.frzRows!=0||e5.frzCols!=0)this.SyncMsgs(e5);
}
if (i4.scrollTop>0&&i4.scrollTop+i4.offsetHeight>=this.GetViewport(o5).offsetHeight){
if (!this.editing&&e5.getAttribute("loadOnDemand")=="true"){
if (e5.LoadState!=null)return ;
e5.LoadState=true;
this.SaveData(e5);
e5.CallBack("LoadOnDemand",true);
}
}
}
this.SaveScrollbarState=function (e5,scrollTop,scrollLeft){
if (this.GetParentSpread(e5)!=null)return ;
var f4=this.GetData(e5);
var f5=f4.getElementsByTagName("root")[0];
var p1=f5.getElementsByTagName("scrollTop")[0];
var p2=f5.getElementsByTagName("scrollLeft")[0];
if (e5.getAttribute("scrollContent")=="true")
if (p1!=null&&p2!=null)
if (p1.innerHTML!=scrollTop||p2.innerHTML!=scrollLeft)
this.ShowScrollingContent(e5,p1.innerHTML==scrollTop);
if (p1!=null)p1.innerHTML=scrollTop;
if (p2!=null)p2.innerHTML=scrollLeft;
}
this.LoadScrollbarState=function (e5){
return ;
if (this.GetParentSpread(e5)!=null)return ;
var f4=this.GetData(e5);
var f5=f4.getElementsByTagName("root")[0];
var p1=f5.getElementsByTagName("scrollTop")[0];
var p2=f5.getElementsByTagName("scrollLeft")[0];
var p3=0;
if (p1!=null&&p1.innerHTML!=""){
p3=parseInt(p1.innerHTML);
}else {
p3=0;
}
var p4=0;
if (p2!=null&&p2.innerHTML!=""){
p4=parseInt(p2.innerHTML);
}else {
p4=0;
}
var i4=this.GetParent(this.GetViewport(e5));
if (i4!=null){
if (!isNaN(p3))i4.scrollTop=p3;
if (!isNaN(p4))i4.scrollLeft=p4;
var c6=this.GetParent(this.GetRowHeader(e5));
var c7=this.GetParent(this.GetColHeader(e5));
var k1=this.GetParent(this.GetColFooter(e5));
if (k1!=null){
k1.scrollLeft=i4.scrollLeft;
}
if (c6!=null){
c6.scrollTop=i4.scrollTop;
}
if (c7!=null){
c7.scrollLeft=i4.scrollLeft;
}
}
}
this.GetParent=function (g1){
if (g1==null)
return null;
else 
return g1.parentNode;
}
this.GetViewport=function (e5){
return e5.c3;
}
this.GetCommandBar=function (e5){
return e5.c8;
}
this.GetRowHeader=function (e5){
return e5.c6;
}
this.GetColHeader=function (e5){
return e5.c7;
}
this.GetColFooter=function (e5){
return e5.colFooter;
}
this.GetFooterCorner=function (e5){
return e5.footerCorner;
}
this.GetCmdBtn=function (e5,id){
var o5=this.GetTopSpread(e5);
var p5=this.GetCommandBar(o5);
if (p5!=null)
return this.GetElementById(p5,o5.id+"_"+id);
else 
return null;
}
this.Range=function (){
this.type="Cell";
this.row=-1;
this.col=-1;
this.rowCount=0;
this.colCount=0;
}
this.SetRange=function (h8,type,i6,m8,n1,g9){
h8.type=type;
h8.row=i6;
h8.col=m8;
h8.rowCount=n1;
h8.colCount=g9;
if (type=="Row"){
h8.col=h8.colCount=-1;
}else if (type=="Column"){
h8.row=h8.rowCount=-1;
}else if (type=="Table"){
h8.col=h8.colCount=-1;h8.row=h8.rowCount=-1;
}
}
this.Margin=function (left,top,right,bottom){
this.left;
this.top;
this.right;
this.bottom;
}
this.GetRender=function (h3){
var f8=h3;
if (f8.firstChild!=null&&f8.firstChild.tagName!=null&&f8.firstChild.tagName!="BR")
return f8.firstChild;
if (f8.firstChild!=null&&f8.firstChild.value!=null){
f8=f8.firstChild;
}
return f8;
}
this.GetPreferredRowHeight=function (e5,h0){
var i7=this.CreateTestBox(e5);
h0=this.GetDisplayIndex(e5,h0);
var i4=this.GetViewport(e5);
var i8=0;
var p6=i4.rows[h0].offsetHeight;
var e9=i4.rows[h0].cells.length;
for (var f0=0;f0<e9;f0++){
var i9=i4.rows[h0].cells[f0];
var j1=this.GetRender(i9);
if (j1!=null){
i7.style.fontFamily=j1.style.fontFamily;
i7.style.fontSize=j1.style.fontSize;
i7.style.fontWeight=j1.style.fontWeight;
i7.style.fontStyle=j1.style.fontStyle;
}
var m8=this.GetColFromCell(e5,i9);
i7.style.posWidth=this.GetColWidthFromCol(e5,m8);
if (j1!=null&&j1.tagName=="SELECT"){
var f8="";
for (var i0=0;i0<j1.childNodes.length;i0++){
var p7=j1.childNodes[i0];
if (p7.text!=null&&p7.text.length>f8.length)f8=p7.text;
}
i7.innerHTML=f8;
}
else if (j1!=null&&j1.tagName=="INPUT")
i7.innerHTML=j1.value;
else 
{
i7.innerHTML=i9.innerHTML;
}
p6=i7.offsetHeight;
if (p6>i8)i8=p6;
}
return Math.max(0,i8)+3;
}
this.SetRowHeight2=function (e5,h0,height){
if (height<1){
height=1;
}
h0=this.GetDisplayIndex(e5,h0);
var b6=null;
if (this.GetRowHeader(e5)!=null)b6=this.GetRowHeader(e5).rows[h0];
if (b6!=null){
b6.style.posHeight=height;
b6.cells[0].style.posHeight=height;
}
var i4=this.GetViewport(e5);
if (b6!=null){
i4.rows[b6.rowIndex].cells[0].style.posHeight=b6.style.posHeight;
}else if (i4!=null){
i4.rows[h0].cells[0].style.posHeight=height;
b6=i4.rows[h0];
}
var p8=this.AddRowInfo(e5,b6.FpKey);
if (p8!=null){
this.SetRowHeight(e5,p8,b6.style.posHeight);
}
var i5=this.GetParentSpread(e5);
if (i5!=null)i5.UpdateRowHeight(e5);
this.SizeSpread(e5);
}
this.GetRowHeightInternal=function (e5,h0){
var b6=null;
if (this.GetRowHeader(e5)!=null)
b6=this.GetRowHeader(e5).rows[h0];
else if (this.GetViewport(e5)!=null)
b6=this.GetViewport(e5).rows[h0];
if (b6!=null)
return b6.offsetHeight;
else 
return 0;
}
this.GetCell=function (ele,noHeader,event){
var f8=ele;
while (f8!=null){
if (noHeader){
if ((f8.tagName=="TD"||f8.tagName=="TH")&&(f8.parentNode.getAttribute("FpSpread")=="r")){
return f8;
}
}else {
if ((f8.tagName=="TD"||f8.tagName=="TH")&&(f8.parentNode.getAttribute("FpSpread")=="r"||f8.parentNode.getAttribute("FpSpread")=="ch"||f8.parentNode.getAttribute("FpSpread")=="rh")){
return f8;
}
}
f8=f8.parentNode;
}
return null;
}
this.InRowHeader=function (e5,h3){
return (this.IsChild(h3,this.GetRowHeader(e5)));
}
this.InColHeader=function (e5,h3){
return (this.IsChild(h3,this.GetColHeader(e5)));
}
this.InColFooter=function (e5,h3){
return (this.IsChild(h3,this.GetColFooter(e5)));
}
this.IsHeaderCell=function (e5,h3){
return (h3!=null&&(h3.tagName=="TD"||h3.tagName=="TH")&&(h3.parentNode.getAttribute("FpSpread")=="ch"||h3.parentNode.getAttribute("FpSpread")=="rh"));
}
this.GetSizeColumn=function (e5,ele,event){
if (ele.tagName!="TD"||(this.GetColHeader(e5)==null))return null;
var m8=-1;
var f8=ele;
var p4=this.GetViewport(this.GetTopSpread(e5)).parentNode.scrollLeft+window.scrollX;
while (f8!=null&&f8.parentNode!=null&&f8.parentNode!=document.documentElement){
if (f8.parentNode.getAttribute("FpSpread")=="ch"){
var p9=this.GetOffsetLeft(e5,f8);
var q0=p9+f8.offsetWidth;
if (event.clientX+p4<p9+3){
m8=this.GetColFromCell(e5,f8)-1;
}
else if (event.clientX+p4>q0-4){
m8=this.GetColFromCell(e5,f8);
var q1=this.GetSpanCell(f8.parentNode.rowIndex,m8,e5.e2);
if (q1!=null){
m8=q1.col+q1.colCount-1;
}
}else {
m8=this.GetColFromCell(e5,f8);
var q1=this.GetSpanCell(f8.parentNode.rowIndex,m8,e5.e2);
if (q1!=null){
var j0=p9;
m8=-1;
for (var f0=q1.col;f0<q1.col+q1.colCount&&f0<this.GetColCount(e5);f0++){
if (this.IsChild(f8,this.GetColHeader(e5)))
j0+=parseInt(this.GetElementById(this.GetColHeader(e5),e5.id+"col"+f0).width);
if (event.clientX>j0-3&&event.clientX<j0+3){
m8=f0;
break ;
}
}
}else {
m8=-1;
}
}
if (isNaN(m8)||m8<0)return null;
var q2=0;
var q3=this.GetColCount(e5);
var q4=true;
var e6=null;
var h2=m8+1;
while (h2<q3){
var m7=this.GetColGroup(this.GetColHeader(e5));
if (h2<m7.childNodes.length)
q2=parseInt(m7.childNodes[h2].width);
if (q2>1){
q4=false;
break ;
}
h2++;
}
if (q4){
h2=m8+1;
while (h2<q3){
if (this.GetSizable(e5,h2)){
m8=h2;
break ;
}
h2++;
}
}
if (!this.GetSizable(e5,m8))return null;
if (this.IsChild(f8,this.GetColHeader(e5))){
return this.GetElementById(this.GetColHeader(e5),e5.id+"col"+m8);
}
}
f8=f8.parentNode;
}
return null;
}
this.GetColGroup=function (f8){
if (f8==null)return null;
var m7=f8.getElementsByTagName("COLGROUP");
if (m7!=null&&m7.length>0){
if (f8.colgroup!=null)return f8.colgroup;
var j7=new Object();
j7.childNodes=new Array();
for (var f0=0;f0<m7[0].childNodes.length;f0++){
if (m7[0].childNodes[f0]!=null&&m7[0].childNodes[f0].tagName=="COL"){
var e9=j7.childNodes.length;
j7.childNodes.length++;
j7.childNodes[e9]=m7[0].childNodes[f0];
}
}
f8.colgroup=j7;
return j7;
}else {
return null;
}
}
this.GetSizeRow=function (e5,ele,event){
var n1=this.GetRowCount(e5);
if (n1==0)return null;
var h3=this.GetCell(ele);
if (h3==null){
if (ele.getAttribute("FpSpread")=="rowpadding"){
if (event.clientY<3){
var e9=ele.parentNode.rowIndex;
if (e9>1){
var i6=ele.parentNode.parentNode.rows[e9-1];
if (this.GetSizable(e5,i6))
return i6;
}
}
}
var c5=this.GetCorner(e5);
if (c5!=null&&this.IsChild(ele,c5)){
if (event.clientY>ele.offsetHeight-4){
var q5=null;
var e9=0;
q5=this.GetRowHeader(e5);
if (q5!=null){
while (e9<q5.rows.length&&q5.rows[e9].offsetHeight<2&&!this.GetSizable(e5,q5.rows[e9]))
e9++;
if (e9<q5.rows.length&&this.GetSizable(e5,q5.rows[e9])&&q5.rows[e9].offsetHeight<2)
return q5.rows[e9];
}
}else {
}
}
return null;
}
var e1=e5.e1;
var e0=e5.e0;
var f8=h3;
var p3=this.GetViewport(this.GetTopSpread(e5)).parentNode.scrollTop+window.scrollY;
while (f8!=null&&f8!=document.documentElement){
if (f8.getAttribute("FpSpread")=="rh"){
var e9=-1;
var q6=this.GetOffsetTop(e5,f8);
var q7=q6+f8.offsetHeight;
if (event.clientY+p3<q6+3){
if (f8.rowIndex>1)
e9=f8.rowIndex-1;
}
else if (event.clientY+p3>q7-4){
var q1=this.GetSpanCell(this.GetRowFromCell(e5,h3),this.GetColFromCell(e5,h3),e1);
if (q1!=null){
var j8=q6;
for (var f0=q1.row;f0<q1.row+q1.rowCount;f0++){
if (this.GetRowHeader(e5).rows[f0].cells.length>0)
j8+=parseInt(this.GetRowHeader(e5).rows[f0].cells[0].style.height);
if (event.clientY>j8-3&&event.clientY<j8+3){
e9=f0;
break ;
}
}
}else {
if (f8.rowIndex>=0)e9=f8.rowIndex;
}
}
else {
break ;
}
var j8=0;
var n1=this.GetRowHeader(e5).rows.length;
var q8=true;
var q5=null;
q5=this.GetRowHeader(e5);
var h0=e9+1;
while (h0<n1){
if (q5.rows[h0].style.height!=null)j8=parseInt(q5.rows[h0].style.height);
else j8=parseInt(q5.rows[h0].offsetHeight);
if (j8>1){
q8=false;
break ;
}
h0++;
}
if (q8){
h0=e9+1;
while (h0<n1){
if (this.GetSizable(e5,this.GetRowHeader(e5).rows[h0])){
e9=h0;
break ;
}
h0++;
}
}
if (e9>=0&&this.GetSizable(e5,q5.rows[e9])){
return q5.rows[e9];
}
else if (event.clientY<3){
while (e9>0&&q5.rows[e9].offsetHeight==0&&!this.GetSizable(e5,q5.rows[e9]))
e9--;
if (e9>=0&&this.GetSizable(e5,q5.rows[e9]))
return q5.rows[e9];
else 
return null;
}
}
f8=f8.parentNode;
}
return null;
}
this.GetElementById=function (i5,id){
if (i5==null)return null;
var f8=i5.firstChild;
while (f8!=null){
if (f8.id==id||(typeof(f8.getAttribute)=="function"&&f8.getAttribute("name")==id))return f8;
var j7=this.GetElementById(f8,id)
if (j7!=null)return j7;
f8=f8.nextSibling;
}
return null;
}
this.GetSizable=function (e5,ele){
if (typeof(ele)=="number"){
var h3=this.GetElementById(this.GetColHeader(e5),e5.id+"col"+ele);
return (h3!=null&&(h3.getAttribute("Sizable")==null||h3.getAttribute("Sizable")=="True"));
}
return (ele!=null&&(ele.getAttribute("Sizable")==null||ele.getAttribute("Sizable")=="True"));
}
this.GetSpanWidth=function (e5,m8,q3){
var j0=0;
var e6=this.GetViewport(e5);
if (e6!=null){
var m7=this.GetColGroup(e6);
if (m7!=null){
for (var f0=m8;f0<m8+q3;f0++){
j0+=parseInt(m7.childNodes[f0].width);
}
}
}
return j0;
}
this.GetCellType=function (h3){
if (h3!=null&&h3.getAttribute("FpCellType")!=null)return h3.getAttribute("FpCellType");
if (h3!=null&&h3.getAttribute("FpRef")!=null){
var f8=document.getElementById(h3.getAttribute("FpRef"));
return f8.getAttribute("FpCellType");
}
if (h3!=null&&h3.getAttribute("FpCellType")!=null)return h3.getAttribute("FpCellType");
return "text";
}
this.GetCellType2=function (h3){
if (h3!=null&&h3.getAttribute("FpRef")!=null){
h3=document.getElementById(h3.getAttribute("FpRef"));
}
var j2=null;
if (h3!=null){
j2=h3.getAttribute("FpCellType");
if (j2=="readonly")j2=h3.getAttribute("CellType");
if (j2==null&&h3.getAttribute("CellType2")=="TagCloudCellType")
j2=h3.getAttribute("CellType2");
}
if (j2!=null)return j2;
return "text";
}
this.GetCellEditorID=function (e5,h3){
if (h3!=null&&h3.getAttribute("FpRef")!=null){
var f8=document.getElementById(h3.getAttribute("FpRef"));
return f8.getAttribute("FpEditorID");
}
if (h3.getAttribute("FpEditorID")!=null)
return h3.getAttribute("FpEditorID");
return e5.getAttribute("FpDefaultEditorID");
}
this.EditorMap=function (editorID,a9){
this.id=editorID;
this.a9=a9;
}
this.ValidatorMap=function (validatorID,validator){
this.id=validatorID;
this.validator=validator;
}
this.GetCellEditor=function (e5,editorID,noClone){
var a9=null;
for (var f0=0;f0<this.c1.length;f0++){
var q9=this.c1[f0];
if (q9.id==editorID){
a9=q9.a9;
break ;
}
}
if (a9==null){
a9=document.getElementById(editorID);
this.c1[this.c1.length]=new this.EditorMap(editorID,a9);
}
if (noClone)
return a9;
return a9.cloneNode(true);
}
this.GetCellValidatorID=function (e5,h3){
return null;
}
this.GetCellValidator=function (e5,validatorID){
return null;
}
this.GetTableRow=function (e5,h0){
var f5=this.GetData(e5).getElementsByTagName("root")[0];
var f4=f5.getElementsByTagName("data")[0];
var f8=f4.firstChild;
while (f8!=null){
if (f8.getAttribute("key")==""+h0)return f8;
f8=f8.nextSibling;
}
return null;
}
this.GetTableCell=function (i6,h2){
if (i6==null)return null;
var f8=i6.firstChild;
while (f8!=null){
if (f8.getAttribute("key")==""+h2)return f8;
f8=f8.nextSibling;
}
return null;
}
this.AddTableRow=function (e5,h0){
if (h0==null)return null;
var n0=this.GetTableRow(e5,h0);
if (n0!=null)return n0;
var f5=this.GetData(e5).getElementsByTagName("root")[0];
var f4=f5.getElementsByTagName("data")[0];
if (document.all!=null){
n0=this.GetData(e5).createNode("element","row","");
}else {
n0=document.createElement("row");
n0.style.display="none";
}
n0.setAttribute("key",h0);
f4.appendChild(n0);
return n0;
}
this.AddTableCell=function (i6,h2){
if (i6==null)return null;
var n0=this.GetTableCell(i6,h2);
if (n0!=null)return n0;
if (document.all!=null){
n0=this.GetData(e5).createNode("element","cell","");
}else {
n0=document.createElement("cell");
n0.style.display="none";
}
n0.setAttribute("key",h2);
i6.appendChild(n0);
return n0;
}
this.GetCellValue=function (e5,h3){
if (h3==null)return null;
var h0=this.GetRowKeyFromCell(e5,h3);
var h2=this.GetColKeyFromCell(e5,h3);
var r0=this.AddTableCell(this.AddTableRow(e5,h0),h2);
return r0.innerHTML;
}
this.HTMLEncode=function (s){
var r1=new String(s);
var r2=new RegExp("&","g");
r1=r1.replace(r2,"&amp;");
r2=new RegExp("<","g");
r1=r1.replace(r2,"&lt;");
r2=new RegExp(">","g");
r1=r1.replace(r2,"&gt;");
r2=new RegExp("\"","g");
r1=r1.replace(r2,"&quot;");
return r1;
}
this.HTMLDecode=function (s){
var r1=new String(s);
var r2=new RegExp("&amp;","g");
r1=r1.replace(r2,"&");
r2=new RegExp("&lt;","g");
r1=r1.replace(r2,"<");
r2=new RegExp("&gt;","g");
r1=r1.replace(r2,">");
r2=new RegExp("&quot;","g");
r1=r1.replace(r2,'"');
return r1;
}
this.SetCellValue=function (e5,h3,val,noEvent,recalc){
if (h3==null)return ;
var r3=this.GetCellType(h3);
if (r3=="readonly")return ;
var h0=this.GetRowKeyFromCell(e5,h3);
var h2=this.GetColKeyFromCell(e5,h3);
var r0=this.AddTableCell(this.AddTableRow(e5,h0),h2);
val=this.HTMLEncode(val);
val=this.HTMLEncode(val);
r0.innerHTML=val;
if (!noEvent){
var g1=this.CreateEvent("DataChanged");
g1.cell=h3;
g1.cellValue=val;
g1.row=h0;
g1.col=h2;
this.FireEvent(e5,g1);
}
var f7=this.GetCmdBtn(e5,"Update");
if (f7!=null&&f7.getAttribute("disabled")!=null)
this.UpdateCmdBtnState(f7,false);
f7=this.GetCmdBtn(e5,"Cancel");
if (f7!=null&&f7.getAttribute("disabled")!=null)
this.UpdateCmdBtnState(f7,false);
e5.e3=true;
if (recalc){
this.UpdateValues(e5);
}
}
this.GetSelectedRanges=function (e5){
var m9=this.GetSelection(e5);
var g3=new Array();
var n0=m9.firstChild;
while (n0!=null){
var h8=new this.Range();
this.GetRangeFromNode(e5,n0,h8);
var f8=g3.length;
g3.length=f8+1;
g3[f8]=h8;
n0=n0.nextSibling;
}
return g3;
}
this.GetSelectedRange=function (e5){
var h8=new this.Range();
var m9=this.GetSelection(e5);
var n0=m9.lastChild;
if (n0!=null){
this.GetRangeFromNode(e5,n0,h8);
}
return h8;
}
this.GetRangeFromNode=function (e5,n0,h8){
if (n0==null||e5==null||h8==null)return ;
var h0=this.GetRowByKey(e5,n0.getAttribute("row"));
var h2=this.GetColByKey(e5,n0.getAttribute("col"));
var n1=parseInt(n0.getAttribute("rowcount"));
var g9=parseInt(n0.getAttribute("colcount"));
var i4=this.GetViewport(e5);
if (i4!=null){
var r4=this.GetDisplayIndex(e5,h0);
for (var f0=r4;f0<r4+n1;f0++){
if (this.IsChildSpreadRow(e5,i4,f0))n1--;
}
}
var r5=null;
if (h0<0&&h2<0&&n1!=0&&g9!=0)
r5="Table";
else if (h0<0&&h2>=0&&g9>0)
r5="Column";
else if (h2<0&&h0>=0&&n1>0)
r5="Row";
else 
r5="Cell";
this.SetRange(h8,r5,h0,h2,n1,g9);
}
this.GetSelection=function (e5){
var f4=this.GetData(e5);
var f5=f4.getElementsByTagName("root")[0];
var n2=f5.getElementsByTagName("state")[0];
var r6=n2.getElementsByTagName("selection")[0];
return r6;
}
this.GetRowKeyFromRow=function (e5,h0){
if (h0<0)return null;
var e6=null;
e6=this.GetViewport(e5);
return e6.rows[h0].getAttribute("FpKey");
}
this.GetColKeyFromCol=function (e5,h2){
if (h2<0)return null;
var e6=this.GetViewport(e5);
var m7=this.GetColGroup(e6);
if (m7==null||m7.childNodes.length==0)
m7=this.GetColGroup(this.GetColHeader(e5));
if (m7!=null&&h2>=0&&h2<m7.childNodes.length){
return m7.childNodes[h2].getAttribute("FpCol");
}
return null;
}
this.GetRowKeyFromCell=function (e5,h3){
var h0=h3.parentNode.getAttribute("FpKey");
return h0;
}
this.GetColKeyFromCell=function (e5,h3){
var m8=this.GetColFromCell(e5,h3);
var e6=this.GetViewport(e5);
var m7=this.GetColGroup(e6);
if (m7!=null&&m8>=0&&m8<m7.childNodes.length){
return m7.childNodes[m8].getAttribute("FpCol");
}
return null;
}
this.SetSelection=function (e5,i6,m8,rowcount,colcount,addSelection){
if (!e5.initialized)return ;
var r7=i6;
var r8=m8;
if (i6!=null&&parseInt(i6)>=0){
i6=this.GetRowKeyFromRow(e5,i6);
if (i6!="newRow")
i6=parseInt(i6);
}
if (m8!=null&&parseInt(m8)>=0){
m8=parseInt(this.GetColKeyFromCol(e5,m8));
}
var n0=this.GetSelection(e5);
if (n0==null)return ;
if (addSelection==null)
addSelection=(e5.getAttribute("multiRange")=="true"&&!this.working);
var r9=n0.lastChild;
if (r9==null||addSelection){
if (document.all!=null){
r9=this.GetData(e5).createNode("element","range","");
}else {
r9=document.createElement('range');
r9.style.display="none";
}
n0.appendChild(r9);
}
r9.setAttribute("row",i6);
r9.setAttribute("col",m8);
r9.setAttribute("rowcount",rowcount);
r9.setAttribute("colcount",colcount);
r9.setAttribute("rowIndex",r7);
r9.setAttribute("colIndex",r8);
e5.e3=true;
this.PaintFocusRect(e5);
var f7=this.GetCmdBtn(e5,"Update");
this.UpdateCmdBtnState(f7,false);
var g1=this.CreateEvent("SelectionChanged");
this.FireEvent(e5,g1);
}
this.CreateSelectionNode=function (e5,i6,m8,rowcount,colcount,r7,r8){
var r9=document.createElement('range');
r9.style.display="none";
r9.setAttribute("row",i6);
r9.setAttribute("col",m8);
r9.setAttribute("rowcount",rowcount);
r9.setAttribute("colcount",colcount);
r9.setAttribute("rowIndex",r7);
r9.setAttribute("colIndex",r8);
return r9;
}
this.AddRowToSelection=function (e5,n0,i6){
var r7=i6;
if (typeof(i6)!="undefined"&&parseInt(i6)>=0){
i6=this.GetRowKeyFromRow(e5,i6);
if (i6!="newRow")
i6=parseInt(i6);
}
if (!this.IsRowSelected(e5,i6)&&!isNaN(i6))
{
var r9=this.CreateSelectionNode(e5,i6,-1,1,-1,r7,-1);
n0.appendChild(r9);
}
}
this.RemoveSelection=function (e5,i6,m8,rowcount,colcount){
var n0=this.GetSelection(e5);
if (n0==null)return ;
var r9=n0.firstChild;
while (r9!=null){
var h0=parseInt(r9.getAttribute("rowIndex"));
var n1=parseInt(r9.getAttribute("rowcount"));
if (h0<=i6&&i6<h0+n1){
n0.removeChild(r9);
for (var f0=h0;f0<h0+n1;f0++){
if (f0!=i6){
this.AddRowToSelection(e5,n0,f0);
}
}
break ;
}
r9=r9.nextSibling;
}
e5.e3=true;
var f7=this.GetCmdBtn(e5,"Update");
this.UpdateCmdBtnState(f7,false);
var g1=this.CreateEvent("SelectionChanged");
this.FireEvent(e5,g1);
}
this.GetColInfo=function (e5,h2){
var f4=this.GetData(e5);
var f5=f4.getElementsByTagName("root")[0];
var n2=f5.getElementsByTagName("state")[0];
var m8=n2.getElementsByTagName("colinfo")[0];
var f8=m8.firstChild;
while (f8!=null){
if (f8.getAttribute("key")==""+h2)return f8;
f8=f8.nextSibling;
}
return null;
}
this.GetColWidthFromCol=function (e5,h2){
var m7=this.GetColGroup(this.GetViewport(e5));
return parseInt(m7.childNodes[h2].width);
}
this.GetColWidth=function (colInfo){
if (colInfo==null)return null;
var n0=colInfo.getElementsByTagName("width")[0];
if (n0!=null)return n0.innerHTML;
return 0;
}
this.AddColInfo=function (e5,h2){
var n0=this.GetColInfo(e5,h2);
if (n0!=null)return n0;
var f4=this.GetData(e5);
var f5=f4.getElementsByTagName("root")[0];
var n2=f5.getElementsByTagName("state")[0];
var m8=n2.getElementsByTagName("colinfo")[0];
if (document.all!=null){
n0=this.GetData(e5).createNode("element","col","");
}else {
n0=document.createElement('col');
n0.style.display="none";
}
n0.setAttribute("key",h2);
m8.appendChild(n0);
return n0;
}
this.SetColWidth=function (e5,m8,width){
if (m8==null)return ;
m8=parseInt(m8);
var j9=this.IsXHTML(e5);
var s0=null;
if (this.GetViewport(e5)!=null){
var m7=this.GetColGroup(this.GetViewport(e5));
if (m7==null||m7.childNodes.length==0){
m7=this.GetColGroup(this.GetColHeader(e5));
}
s0=this.AddColInfo(e5,m7.childNodes[m8].getAttribute("FpCol"));
if (this.GetViewport(e5).cellSpacing=="0"&&this.GetColCount(e5)>1&&this.GetViewport(e5).rules!="rows"){
if (m8==0)width-=1;
}
if (width==0)width=1;
if (m7!=null)
m7.childNodes[m8].width=width;
this.SetWidthFix(this.GetViewport(e5),m8,width);
}
if (this.GetColHeader(e5)!=null){
if (this.GetViewport(e5)!=null){
if (this.GetViewport(e5).cellSpacing=="0"&&this.GetColCount(e5)>1&&this.GetViewport(e5).rules!="rows"){
if (j9){
if (m8==this.colCount-1)width-=1;
}
}
}
if (width<=0)width=1;
document.getElementById(e5.id+"col"+m8).width=width;
this.SetWidthFix(this.GetColHeader(e5),m8,width);
if (this.GetViewport(e5)!=null){
if (this.GetViewport(e5).cellSpacing=="0"&&this.GetColCount(e5)>1&&this.GetViewport(e5).rules!="rows"){
if (m8==this.GetColCount(e5)-1)width+=1;
}
}
}
if (this.GetColFooter(e5)!=null){
var m7=this.GetColGroup(this.GetColFooter(e5));
if (m7==null||m7.childNodes.length==0){
m7=this.GetColGroup(this.GetColHeader(e5));
}
s0=this.AddColInfo(e5,m7.childNodes[m8].getAttribute("FpCol"));
if (this.GetColFooter(e5).cellSpacing=="0"&&this.GetColCount(e5)>1&&this.GetColFooter(e5).rules!="rows"){
if (m8==0)width-=1;
}
if (width==0)width=1;
if (m7!=null)
m7.childNodes[m8].width=width;
this.SetWidthFix(this.GetColFooter(e5),m8,width);
}
var e8=this.GetTopSpread(e5);
this.SizeAll(e8);
this.Refresh(e8);
if (s0!=null){
var n0=s0.getElementsByTagName("width");
if (n0!=null&&n0.length>0)
n0[0].innerHTML=width;
else {
if (document.all!=null){
n0=this.GetData(e5).createNode("element","width","");
}else {
n0=document.createElement('width');
n0.style.display="none";
}
s0.appendChild(n0);
n0.innerHTML=width;
}
}
var f7=this.GetCmdBtn(e5,"Update");
if (f7!=null)this.UpdateCmdBtnState(f7,false);
e5.e3=true;
}
this.SetWidthFix=function (e6,m8,width){
if (e6==null||e6.rows.length==0)return ;
var f0=0;
var s1=0;
var i9=e6.rows[0].cells[0];
var s2=i9.colSpan;
if (s2==null)s2=1;
while (m8>s1+s2){
f0++;
s1=s1+s2;
i9=e6.rows[0].cells[f0];
s2=i9.colSpan;
if (s2==null)s2=1;
}
i9.width=width;
}
this.GetRowInfo=function (e5,h0){
var f4=this.GetData(e5);
var f5=f4.getElementsByTagName("root")[0];
var n2=f5.getElementsByTagName("state")[0];
var i6=n2.getElementsByTagName("rowinfo")[0];
var f8=i6.firstChild;
while (f8!=null){
if (f8.getAttribute("key")==""+h0)return f8;
f8=f8.nextSibling;
}
return null;
}
this.GetRowHeight=function (p8){
if (p8==null)return null;
var s3=p8.getElementsByTagName("height");
if (s3!=null&&s3.length>0)return s3[0].innerHTML;
return 0;
}
this.AddRowInfo=function (e5,h0){
var n0=this.GetRowInfo(e5,h0);
if (n0!=null)return n0;
var f4=this.GetData(e5);
var f5=f4.getElementsByTagName("root")[0];
var n2=f5.getElementsByTagName("state")[0];
var i6=n2.getElementsByTagName("rowinfo")[0];
if (document.all!=null){
n0=this.GetData(e5).createNode("element","row","");
}else {
n0=document.createElement('row');
n0.style.display="none";
}
n0.setAttribute("key",h0);
i6.appendChild(n0);
return n0;
}
this.GetTopSpread=function (g1)
{
if (g1==null)return null;
var g3=this.GetSpread(g1);
if (g3==null)return null;
var f8=g3.parentNode;
while (f8!=null&&f8.tagName!="BODY")
{
if (f8.getAttribute&&f8.getAttribute("FpSpread")=="Spread"){
if (f8.getAttribute("hierView")=="true")
g3=f8;
else 
break ;
}
f8=f8.parentNode;
}
return g3;
}
this.GetParentSpread=function (e5)
{
try {
var f8=e5.parentNode;
while (f8!=null&&f8.getAttribute&&f8.getAttribute("FpSpread")!="Spread")f8=f8.parentNode;
if (f8!=null&&f8.getAttribute&&f8.getAttribute("hierView")=="true")
return f8;
else 
return null;
}catch (g1){
return null;
}
}
this.SetRowHeight=function (e5,p8,height){
if (p8==null)return ;
var n0=p8.getElementsByTagName("height");
if (n0!=null&&n0.length>0)
n0[0].innerHTML=height;
else {
if (document.all!=null){
n0=this.GetData(e5).createNode("element","height","");
}else {
n0=document.createElement('height');
n0.style.display="none";
}
p8.appendChild(n0);
n0.innerHTML=height;
}
var f7=this.GetCmdBtn(e5,"Update");
if (f7!=null)this.UpdateCmdBtnState(f7,false);
e5.e3=true;
}
this.SetActiveRow=function (e5,i6){
if (this.GetRowCount(e5)<1)return ;
if (i6==null)i6=-1;
var f4=this.GetData(e5);
var f5=f4.getElementsByTagName("root")[0];
var n2=f5.getElementsByTagName("state")[0];
var n3=n2.firstChild;
while (n3!=null&&n3.tagName!="activerow"&&n3.tagName!="ACTIVEROW"){
n3=n3.nextSibling;
}
if (n3!=null)
n3.innerHTML=""+i6;
if (i6!=null&&e5.getAttribute("IsNewRow")!="true"&&e5.getAttribute("AllowInsert")=="true"){
var f7=this.GetCmdBtn(e5,"Insert");
this.UpdateCmdBtnState(f7,false);
f7=this.GetCmdBtn(e5,"Add");
this.UpdateCmdBtnState(f7,false);
}else {
var f7=this.GetCmdBtn(e5,"Insert");
this.UpdateCmdBtnState(f7,true);
f7=this.GetCmdBtn(e5,"Add");
this.UpdateCmdBtnState(f7,true);
}
if (i6!=null&&e5.getAttribute("IsNewRow")!="true"&&(e5.getAttribute("AllowDelete")==null||e5.getAttribute("AllowDelete")=="true")){
var f7=this.GetCmdBtn(e5,"Delete");
this.UpdateCmdBtnState(f7,(i6==-1));
}else {
var f7=this.GetCmdBtn(e5,"Delete");
this.UpdateCmdBtnState(f7,true);
}
e5.e3=true;
}
this.SetActiveCol=function (e5,m8){
var f4=this.GetData(e5);
var f5=f4.getElementsByTagName("root")[0];
var n2=f5.getElementsByTagName("state")[0];
var n4=n2.firstChild;
while (n4!=null&&n4.tagName!="activecolumn"&&n4.tagName!="ACTIVECOLUMN"){
n4=n4.nextSibling;
}
if (n4!=null)
n4.innerHTML=""+parseInt(m8);
e5.e3=true;
}
this.GetEditor=function (h3){
if (h3==null)return null;
var r3=this.GetCellType(h3);
if (r3=="readonly")return null;
var i3=h3.getElementsByTagName("DIV");
if (r3=="MultiColumnComboBoxCellType"){
if (i3!=null&&i3.length>0){
var f8=i3[0];
f8.type="div";
return f8;
}
}
var i3=h3.getElementsByTagName("INPUT");
if (i3!=null&&i3.length>0){
var f8=i3[0];
while (f8!=null&&f8.getAttribute&&f8.getAttribute("FpEditor")==null)
f8=f8.parentNode;
if (!f8.getAttribute)f8=null;
return f8;
}
i3=h3.getElementsByTagName("SELECT");
if (i3!=null&&i3.length>0){
var f8=i3[0];
return f8;
}
return null;
}
this.GetPageActiveSpread=function (){
var s4=document.documentElement.getAttribute("FpActiveSpread");
var f8=null;
if (s4!=null)f8=document.getElementById(s4);
return f8;
}
this.GetPageActiveSheetView=function (){
var s4=document.documentElement.getAttribute("FpActiveSheetView");
var f8=null;
if (s4!=null)f8=document.getElementById(s4);
return f8;
}
this.SetPageActiveSpread=function (e5){
if (e5==null)
document.documentElement.setAttribute("FpActiveSpread",null);
else {
document.documentElement.setAttribute("FpActiveSpread",e5.id);
document.documentElement.setAttribute("FpActiveSheetView",e5.id);
}
}
this.DoResize=function (event){
if (the_fpSpread.spreads==null)return ;
var e9=the_fpSpread.spreads.length;
for (var f0=0;f0<e9;f0++){
if (the_fpSpread.spreads[f0]!=null)the_fpSpread.SizeSpread(the_fpSpread.spreads[f0]);
}
}
this.DblClick=function (event){
var h3=this.GetCell(this.GetTarget(event),true,event);
var e5=this.GetSpread(h3);
if (h3!=null&&!this.IsHeaderCell(h3)&&this.GetOperationMode(e5)=="RowMode"&&this.GetEnableRowEditTemplate(e5)=="true"){
var s5=h3.getElementsByTagName("DIV");
if (s5!=null&&s5.length>0&&s5[0].id==e5.id+"_RowEditTemplateContainer")return ;
this.Edit(e5,this.GetRowKeyFromCell(e5,h3));
var f7=this.GetCmdBtn(e5,"Cancel");
if (f7!=null)
this.UpdateCmdBtnState(f7,false);
return ;
}
if (h3!=null&&!this.IsHeaderCell(h3)&&h3==e5.d2)this.StartEdit(e5,h3);
}
this.GetEvent=function (g1){
if (g1!=null)return g1;
return window.event;
}
this.GetTarget=function (g1){
g1=this.GetEvent(g1);
if (g1.target==document){
if (g1.currentTarget!=null)return g1.currentTarget;
}
if (g1.target!=null)return g1.target;
return g1.srcElement;
}
this.StartEdit=function (e5,editCell){
var s6=this.GetOperationMode(e5);
if (s6=="SingleSelect"||s6=="ReadOnly"||this.editing)return ;
if (s6=="RowMode"&&this.GetEnableRowEditTemplate(e5)=="true")return ;
var h3=editCell;
if (h3==null)h3=e5.d2;
if (h3==null)return ;
this.renderAsEditor=-1;
var i3=this.GetEditor(h3);
if (i3!=null){
this.editing=true;
this.a9=i3;
this.renderAsEditor=1;
}
var j9=this.IsXHTML(e5);
if (h3!=null){
var h0=this.GetRowFromCell(e5,h3);
var h2=this.GetColFromCell(e5,h3);
var g1=this.CreateEvent("EditStart");
g1.cell=h3;
g1.row=this.GetSheetIndex(e5,h0);
g1.col=h2;
g1.cancel=false;
this.FireEvent(e5,g1);
if (g1.cancel)return ;
var r3=this.GetCellType(h3);
if (r3=="readonly")return ;
if (e5.d2!=h3){
e5.d2=h3;
this.SetActiveRow(e5,this.GetRowKeyFromCell(e5,h3));
this.SetActiveCol(e5,this.GetColKeyFromCell(e5,h3));
}
if (i3==null){
var j1=this.GetRender(h3);
var s7=this.GetValueFromRender(e5,j1);
if (s7==" ")s7="";
this.b0=s7;
this.b1=this.GetFormulaFromCell(h3);
if (this.b1!=null)s7=this.b1;
try {
if (j1!=h3){
j1.style.display="none";
}
else {
j1.innerHTML="";
}
}catch (g1){
return ;
}
var s8=this.GetCellEditorID(e5,h3);
if (s8!=null&&s8.length>0){
this.a9=this.GetCellEditor(e5,s8,true);
if (!this.a9.getAttribute("MccbId")&&!this.a9.getAttribute("Extenders"))
this.a9.style.display="inline";
else 
this.a9.style.display="block";
this.a9.id=s8+"Editor";
}else {
this.a9=document.createElement("INPUT");
this.a9.type="text";
}
this.a9.style.fontFamily=j1.style.fontFamily;
this.a9.style.fontSize=j1.style.fontSize;
this.a9.style.fontWeight=j1.style.fontWeight;
this.a9.style.fontStyle=j1.style.fontStyle;
this.a9.style.textDecoration=j1.style.textDecoration;
this.a9.style.position="";
if (j9){
var s9=h3.clientWidth-2;
var t0=parseInt(h3.style.paddingLeft);
if (!isNaN(t0))
s9-=t0;
t0=parseInt(h3.style.paddingRight);
if (!isNaN(t0))
s9-=t0;
this.a9.style.width=""+s9+"px";
}
else 
this.a9.style.width=h3.clientWidth-2;
this.SaveMargin(h3);
if (this.a9.tagName=="TEXTAREA")
this.a9.style.height=""+(h3.offsetHeight-4)+"px";
if ((this.a9.tagName=="INPUT"&&this.a9.type=="text")||this.a9.tagName=="TEXTAREA"){
if (this.a9.style.backgroundColor==""||this.a9.backColorSet!=null){
var t1="";
if (document.defaultView!=null&&document.defaultView.getComputedStyle!=null)t1=document.defaultView.getComputedStyle(h3,'').getPropertyValue("background-color");
if (t1!="")
this.a9.style.backgroundColor=t1;
else 
this.a9.style.backgroundColor=h3.bgColor;
this.a9.backColorSet=true;
}
if (this.a9.style.color==""||this.a9.colorSet!=null){
var t2="";
if (document.defaultView!=null&&document.defaultView.getComputedStyle!=null)t2=document.defaultView.getComputedStyle(h3,'').getPropertyValue("color");
this.a9.style.color=t2;
this.a9.colorSet=true;
}
this.a9.style.borderWidth="0px";
this.RestoreMargin(this.a9,false);
}
this.renderAsEditor=0;
h3.insertBefore(this.a9,h3.firstChild);
this.SetEditorValue(this.a9,s7,e5);
if (this.a9.offsetHeight<h3.clientHeight&&this.a9.tagName!="TEXTAREA"){
if (h3.vAlign=="middle")
this.a9.style.posTop+=(h3.clientHeight-this.a9.offsetHeight)/2;
else if (h3.vAlign=="bottom")
this.a9.style.posTop+=(h3.clientHeight-this.a9.offsetHeight);
}
this.SizeAll(this.GetTopSpread(e5));
}
this.SetEditorFocus(this.a9);
if (e5.getAttribute("EditMode")=="replace"){
if ((this.a9.tagName=="INPUT"&&this.a9.type=="text")||this.a9.tagName=="TEXTAREA")
this.a9.select();
}
this.editing=true;
var f7=this.GetCmdBtn(e5,"Update");
if (f7!=null&&f7.disabled)
this.UpdateCmdBtnState(f7,false);
f7=this.GetCmdBtn(e5,"Copy");
if (f7!=null&&!f7.disabled)
this.UpdateCmdBtnState(f7,true);
f7=this.GetCmdBtn(e5,"Paste");
if (f7!=null&&!f7.disabled)
this.UpdateCmdBtnState(f7,true);
f7=this.GetCmdBtn(e5,"Clear");
if (f7!=null&&!f7.disabled)
this.UpdateCmdBtnState(f7,true);
}
this.ScrollView(e5);
}
this.GetCurrency=function (validator){
var t3=validator.CurrencySymbol;
if (t3!=null)return t3;
var f8=document.getElementById(validator.id+"cs");
if (f8!=null){
return f8.innerText;
}
return "";
}
this.GetValueFromRender=function (e5,rd){
var j2=this.GetCellType2(this.GetCell(rd));
if (j2!=null){
if (j2=="text")j2="TextCellType";
var i2=null;
if (j2=="ExtenderCellType"){
i2=this.GetFunction(j2+"_getEditor")
if (i2!=null){
if (i2(rd)!=null)
i2=this.GetFunction(j2+"_getEditorValue");
else 
i2=null;
}
}else 
i2=this.GetFunction(j2+"_getValue");
if (i2!=null){
return i2(rd,e5);
}
}
var f8=rd;
while (f8.firstChild!=null&&f8.firstChild.nodeName!="#text")f8=f8.firstChild;
if (f8.innerHTML=="&nbsp;")return "";
var s7=f8.value;
if ((typeof(s7)=="undefined")&&j2=="readonly"&&f8.parentNode!=null&&f8.parentNode.getAttribute("CellType2")=="TagCloudCellType")
s7=f8.textContent;
if (s7==null){
s7=this.ReplaceAll(f8.innerHTML,"&nbsp;"," ");
s7=this.ReplaceAll(s7,"<br>"," ");
s7=this.HTMLDecode(s7);
}
return s7;
}
this.ReplaceAll=function (val,src,dest){
if (val==null)return val;
var t4=val.length;
while (true){
val=val.replace(src,dest);
if (val.length==t4)break ;
t4=val.length;
}
return val;
}
this.GetFormula=function (e5,h0,h2){
h0=this.GetDisplayIndex(e5,h0);
var h3=this.GetCellFromRowCol(e5,h0,h2);
var t5=this.GetFormulaFromCell(h3);
return t5;
}
this.SetFormula=function (e5,h0,h2,i2,recalc,clientOnly){
h0=this.GetDisplayIndex(e5,h0);
var h3=this.GetCellFromRowCol(e5,h0,h2);
h3.setAttribute("FpFormula",i2);
if (!clientOnly)
this.SetCellValue(e5,h3,i2,null,recalc);
}
this.GetFormulaFromCell=function (rd){
var s7=null;
if (rd.getAttribute("FpFormula")!=null){
s7=rd.getAttribute("FpFormula");
}
if (s7!=null)
s7=this.Trim(new String(s7));
return s7;
}
this.IsDouble=function (val,decimalchar,negsign,possign,minimumvalue,maximumvalue){
if (val==null||val.length==0)return true;
val=the_fpSpread.Trim(val);
if (val.length==0)return true;
if (negsign!=null)val=val.replace(negsign,"-");
if (possign!=null)val=val.replace(possign,"+");
if (val.charAt(val.length-1)=="-")val="-"+val.substring(0,val.length-1);
var t6=new RegExp("^\\s*([-\\+])?(\\d+)?(\\"+decimalchar+"(\\d+))?([eE]([-\\+])?(\\d+))?\\s*$");
var t7=val.match(t6);
if (t7==null)
return false;
if ((t7[2]==null||t7[2].length==0)&&(t7[4]==null||t7[4].length==0))return false;
var t8="";
if (t7[1]!=null&&t7[1].length>0)t8=t7[1];
if (t7[2]!=null&&t7[2].length>0)
t8+=t7[2];
else 
t8+="0";
if (t7[4]!=null&&t7[4].length>0)
t8+=("."+t7[4]);
if (t7[6]!=null&&t7[6].length>0){
t8+=("E"+t7[6]);
if (t7[7]!=null)
t8+=(t7[7]);
else 
t8+="0";
}
var t9=parseFloat(t8);
if (isNaN(t9))return false;
var f8=true;
if (minimumvalue!=null){
var u0=parseFloat(minimumvalue);
f8=(!isNaN(u0)&&t9>=u0);
}
if (f8&&maximumvalue!=null){
var i8=parseFloat(maximumvalue);
f8=(!isNaN(i8)&&t9<=i8);
}
return f8;
}
this.GetFunction=function (fn){
if (fn==null||fn=="")return null;
try {
var f8=eval(fn);
return f8;
}catch (g1){
return null;
}
}
this.SetValueToRender=function (rd,val,valueonly){
var i2=null;
var j2=this.GetCellType2(this.GetCell(rd));
if (j2!=null){
if (j2=="text")j2="TextCellType";
if (j2=="ExtenderCellType"){
i2=this.GetFunction(j2+"_getEditor")
if (i2!=null){
if (i2(rd)!=null)
i2=this.GetFunction(j2+"_setEditorValue");
else 
i2=null;
}
}else 
i2=this.GetFunction(j2+"_setValue");
}
if (i2!=null){
i2(rd,val);
}else {
if (typeof(rd.value)!="undefined"){
if (val==null)val="";
rd.value=val;
}else {
var f8=rd;
while (f8.firstChild!=null&&f8.firstChild.nodeName!="#text")f8=f8.firstChild;
f8.innerHTML=this.ReplaceAll(val," ","&nbsp;");
}
}
if ((valueonly==null||!valueonly)&&rd.getAttribute("FpFormula")!=null){
rd.setAttribute("FpFormula",val);
}
}
this.Trim=function (r4){
var t7=r4.match(new RegExp("^\\s*(\\S+(\\s+\\S+)*)\\s*$"));
return (t7==null)?"":t7[1];
}
this.GetOffsetLeft=function (e5,h3,i5){
var e6=i5;
if (e6==null)e6=this.GetViewportFromCell(e5,h3);
var p9=0;
var f8=h3;
while (f8!=null&&f8!=e6){
p9+=f8.offsetLeft;
f8=f8.offsetParent;
}
return p9;
}
this.GetOffsetTop=function (e5,h3,i5){
var e6=i5;
if (e6==null)e6=this.GetViewportFromCell(e5,h3);
var u1=0;
var f8=h3;
while (f8!=null&&f8!=e6){
u1+=f8.offsetTop;
f8=f8.offsetParent;
}
return u1;
}
this.SetEditorFocus=function (f8){
if (f8==null)return ;
var u2=true;
var h3=this.GetCell(f8,true);
var j2=this.GetCellType(h3);
if (j2!=null){
var i2=this.GetFunction(j2+"_setFocus");
if (i2!=null){
i2(f8);
u2=false;
}
}
if (u2){
try {
f8.focus();
}catch (g1){}
}
}
this.SetEditorValue=function (f8,val,e5){
var h3=this.GetCell(f8,true);
var j2=this.GetCellType(h3);
if (j2!=null){
var i2=this.GetFunction(j2+"_setEditorValue");
if (i2!=null){
i2(f8,val,e5);
return ;
}
}
j2=f8.getAttribute("FpEditor");
if (j2!=null){
var i2=this.GetFunction(j2+"_setEditorValue");
if (i2!=null){
i2(f8,val,e5);
return ;
}
}
f8.value=val;
}
this.GetEditorValue=function (f8){
var h3=this.GetCell(f8,true);
var j2=this.GetCellType(h3);
if (j2!=null){
var i2=this.GetFunction(j2+"_getEditorValue");
if (i2!=null){
return i2(f8);
}
}
j2=f8.getAttribute("FpEditor");
if (j2!=null){
var i2=this.GetFunction(j2+"_getEditorValue");
if (i2!=null){
return i2(f8);
}
}
if (f8.type=="checkbox"){
if (f8.checked)
return "True";
else 
return "False";
}
else 
{
return f8.value;
}
}
this.CreateMsg=function (){
if (this.validationMsg!=null)return ;
var f8=this.validationMsg=document.createElement("div");
f8.style.position="absolute";
f8.style.background="yellow";
f8.style.color="red";
f8.style.border="1px solid black";
f8.style.display="none";
f8.style.width="120px";
}
this.SetMsg=function (msg){
this.CreateMsg();
this.validationMsg.innerHTML=msg;
}
this.ShowMsg=function (show){
this.CreateMsg();
if (show){
this.validationMsg.style.display="block";
}
else 
this.validationMsg.style.display="none";
}
this.EndEdit=function (){
if (this.a9!=null&&this.a9.parentNode!=null){
var h3=this.GetCell(this.a9.parentNode);
var e5=this.GetSpread(h3,false);
if (e5==null)return true;
var u3=this.GetEditorValue(this.a9);
var u4=u3;
if (typeof(u3)=="string")u4=this.Trim(u3);
var u5=(e5.getAttribute("AcceptFormula")=="true"&&u4!=null&&u4.charAt(0)=='=');
var i3=(this.renderAsEditor!=0);
if (!u5&&!i3){
var u6=null;
var j2=this.GetCellType(h3);
if (j2!=null){
var i2=this.GetFunction(j2+"_isValid");
if (i2!=null){
u6=i2(h3,u3);
}
}
if (u6!=null&&u6!=""){
this.SetMsg(u6);
this.GetViewport(e5).parentNode.insertBefore(this.validationMsg,this.GetViewport(e5).parentNode.firstChild);
this.ShowMsg(true);
this.SetValidatorPos(e5);
this.a9.focus();
return false;
}else {
this.ShowMsg(false);
}
}
if (!i3){
h3.removeChild(this.a9);
var u7=this.GetRender(h3);
if (u7.style.display=="none")u7.style.display="block";
if (this.b1!=null&&this.b1==u3){
this.SetValueToRender(u7,this.b0,true);
}else {
this.SetValueToRender(u7,u3);
}
this.RestoreMargin(h3);
}
if ((this.b1!=null&&this.b1!=u3)||(this.b1==null&&this.b0!=u3)){
this.SetCellValue(e5,h3,u3);
if (u3!=null&&u3.length>0&&u3.indexOf("=")==0)h3.setAttribute("FpFormula",u3);
}
if (!i3)
this.SizeAll(this.GetTopSpread(e5));
this.a9=null;
this.editing=false;
var g1=this.CreateEvent("EditStopped");
g1.cell=h3;
this.FireEvent(e5,g1);
this.Focus(e5);
var u8=e5.getAttribute("autoCalc");
if (u8!="false"){
if ((this.b1!=null&&this.b1!=u3)||(this.b1==null&&this.b0!=u3)){
this.UpdateValues(e5);
}
}
}
this.renderAsEditor=-1;
return true;
}
this.SetValidatorPos=function (e5){
if (this.a9==null)return ;
var h3=this.GetCell(this.a9.parentNode);
if (h3==null)return ;
var f8=this.validationMsg;
if (f8!=null&&f8.style.display!="none"){
if (f8!=null){
f8.style.left=""+(h3.offsetLeft)+"px";
f8.style.top=""+(h3.offsetTop+h3.offsetHeight)+"px";
}
}
}
this.SaveMargin=function (editCell){
if (editCell.style.paddingLeft!=null&&editCell.style.paddingLeft!=""){
this.b4.left=editCell.style.paddingLeft;
editCell.style.paddingLeft=0;
}
if (editCell.style.paddingRight!=null&&editCell.style.paddingRight!=""){
this.b4.right=editCell.style.paddingRight;
editCell.style.paddingRight=0;
}
if (editCell.style.paddingTop!=null&&editCell.style.paddingTop!=""){
this.b4.top=editCell.style.paddingTop;
editCell.style.paddingTop=0;
}
if (editCell.style.paddingBottom!=null&&editCell.style.paddingBottom!=""){
this.b4.bottom=editCell.style.paddingBottom;
editCell.style.paddingBottom=0;
}
}
this.RestoreMargin=function (h3,reset){
if (this.b4.left!=null&&this.b4.left!=-1){
h3.style.paddingLeft=this.b4.left;
if (reset==null||reset)this.b4.left=-1;
}
if (this.b4.right!=null&&this.b4.right!=-1){
h3.style.paddingRight=this.b4.right;
if (reset==null||reset)this.b4.right=-1;
}
if (this.b4.top!=null&&this.b4.top!=-1){
h3.style.paddingTop=this.b4.top;
if (reset==null||reset)this.b4.top=-1;
}
if (this.b4.bottom!=null&&this.b4.bottom!=-1){
h3.style.paddingBottom=this.b4.bottom;
if (reset==null||reset)this.b4.bottom=-1;
}
}
this.PaintSelectedCell=function (e5,h3,select,anchor){
if (h3==null)return ;
var u9=anchor?e5.getAttribute("anchorBackColor"):e5.getAttribute("selectedBackColor");
if (select){
if (h3.getAttribute("bgColorBak")==null)
h3.setAttribute("bgColorBak",document.defaultView.getComputedStyle(h3,"").getPropertyValue("background-color"));
if (h3.bgColor1==null)
h3.bgColor1=h3.style.backgroundColor;
h3.style.backgroundColor=u9;
if (h3.getAttribute("bgSelImg"))
h3.style.backgroundImage=h3.getAttribute("bgSelImg");
}else {
if (h3.bgColor1!=null)
h3.style.backgroundColor="";
if (h3.bgColor1!=null&&h3.bgColor1!="")
h3.style.backgroundColor=h3.bgColor1;
h3.style.backgroundImage="";
if (h3.getAttribute("bgImg")!=null)
h3.style.backgroundImage=h3.getAttribute("bgImg");
}
}
this.PaintAnchorCell=function (e5){
var v0=this.GetOperationMode(e5);
if (e5.d2==null||(v0!="Normal"&&v0!="RowMode"))return ;
if (v0=="MultiSelect"||v0=="ExtendedSelect")return ;
if (!this.IsChild(e5.d2,e5))return ;
var v1=(this.GetTopSpread(e5).getAttribute("hierView")!="true");
if (e5.getAttribute("showFocusRect")=="false")v1=false;
if (v1){
this.PaintSelectedCell(e5,e5.d2,false);
this.PaintFocusRect(e5);
this.PaintAnchorCellHeader(e5,true);
return ;
}
var f8=e5.d2.parentNode.cells[0].firstChild;
if (f8!=null&&f8.nodeName!="#text"&&f8.getAttribute("FpSpread")=="Spread")return ;
this.PaintSelectedCell(e5,e5.d2,true,true);
this.PaintAnchorCellHeader(e5,true);
}
this.ClearSelection=function (e5,thisonly){
var v2=this.GetParentSpread(e5);
if (thisonly==null&&v2!=null&&v2.getAttribute("hierView")=="true"){
this.ClearSelection(v2);
return ;
}
var i4=this.GetViewport(e5);
var g7=this.GetRowCount(e5);
if (i4!=null&&i4.rows.length>g7){
for (var f0=0;f0<i4.rows.length;f0++){
if (i4.rows[f0].cells.length>0&&i4.rows[f0].cells[0]!=null&&i4.rows[f0].cells[0].firstChild!=null&&i4.rows[f0].cells[0].firstChild.nodeName!="#text"){
var f8=i4.rows[f0].cells[0].firstChild;
if (f8.getAttribute("FpSpread")=="Spread"){
this.ClearSelection(f8,true);
}
}
}
}
this.DoclearSelection(e5);
if (e5.d2!=null){
var s6=this.GetOperationMode(e5);
if (s6=="RowMode"||s6=="SingleSelect"||s6=="ExtendedSelect"||s6=="MultiSelect"){
var h4=this.GetRowFromCell(e5,e5.d2);
this.PaintSelection(e5,h4,-1,1,-1,false);
}
this.PaintSelectedCell(e5,e5.d2,false);
this.PaintAnchorCellHeader(e5,false);
}else {
var h3=this.GetCellFromRowCol(e5,1,0);
if (h3!=null)this.PaintSelectedCell(e5,h3,false);
}
this.PaintFocusRect(e5);
e5.selectedCols=[];
e5.e3=true;
}
this.SetSelectedRange=function (e5,h0,h2,n1,g9){
this.ClearSelection(e5);
var h0=this.GetDisplayIndex(e5,h0);
var v3=0;
var v4=n1;
var i4=this.GetViewport(e5);
if (i4!=null){
for (f0=h0;f0<i4.rows.length&&v3<v4;f0++){
if (this.IsChildSpreadRow(e5,i4,f0)){;
n1++;
}else {
v3++;
}
}
}
this.PaintSelection(e5,h0,h2,n1,g9,true);
this.SetSelection(e5,h0,h2,n1,g9);
}
this.AddSelection=function (e5,h0,h2,n1,g9){
var h0=this.GetDisplayIndex(e5,h0);
var v3=0;
var v4=n1;
var i4=this.GetViewport(e5);
if (i4!=null){
for (f0=h0;f0<i4.rows.length&&v3<v4;f0++){
if (this.IsChildSpreadRow(e5,i4,f0)){;
n1++;
}else {
v3++;
}
}
}
this.PaintSelection(e5,h0,h2,n1,g9,true);
this.SetSelection(e5,h0,h2,n1,g9,true);
}
this.SelectRow=function (e5,index,v3,select,ignoreAnchor){
e5.d6=index;
e5.d7=-1;
if (!ignoreAnchor)this.UpdateAnchorCell(e5,index,0,false);
e5.d8="r";
this.PaintSelection(e5,index,-1,v3,-1,select);
if (select)
{
this.SetSelection(e5,index,-1,v3,-1);
}else {
this.RemoveSelection(e5,index,-1,v3,-1);
this.PaintFocusRect(e5);
}
}
this.SelectColumn=function (e5,index,v3,select,ignoreAnchor){
e5.d6=-1;
e5.d7=index;
if (!ignoreAnchor)this.UpdateAnchorCell(e5,0,index,false);
e5.d8="c";
this.PaintSelection(e5,-1,index,-1,v3,select);
if (select)
{
this.SetSelection(e5,-1,index,-1,v3);
this.AddColSelection(e5,index);
}
}
this.AddColSelection=function (e5,index){
var v5=0;
for (var f0=0;f0<e5.selectedCols.length;f0++){
if (e5.selectedCols[f0]==index)return ;
if (index>e5.selectedCols[f0])v5=f0+1;
}
e5.selectedCols.length++;
for (var f0=e5.selectedCols.length-1;f0>v5;f0--)
e5.selectedCols[f0]=e5.selectedCols[f0-1];
e5.selectedCols[v5]=index;
}
this.IsColSelected=function (e5,r8){
for (var f0=0;f0<e5.selectedCols.length;f0++)
if (e5.selectedCols[f0]==r8)return true;
return false;
}
this.SyncColSelection=function (e5){
e5.selectedCols=[];
var v6=this.GetSelectedRanges(e5);
for (var f0=0;f0<v6.length;f0++){
var h8=v6[f0];
if (h8.type=="Column"){
for (var i0=h8.col;i0<h8.col+h8.colCount;i0++){
this.AddColSelection(e5,i0);
}
}
}
}
this.InitMovingCol=function (e5,r8,isGroupBar,n8){
if (e5.getAttribute("LayoutMode")&&r8==-1)return ;
if (this.GetOperationMode(e5)!="Normal"){
e5.selectedCols=[];
e5.selectedCols.push(r8);
}
if (isGroupBar){
this.dragCol=r8;
this.dragViewCol=this.GetColByKey(e5,r8);
}else {
this.dragCol=parseInt(this.GetSheetColIndex(e5,r8));
this.dragViewCol=r8;
}
var v7=this.GetMovingCol(e5);
if (isGroupBar){
this.ClearSelection(e5);
v7.innerHTML="";
var v8=document.createElement("DIV");
v8.innerHTML=n8.innerHTML;
v8.style.borderTop="0px solid";
v8.style.borderLeft="0px solid";
v8.style.borderRight="#808080 1px solid";
v8.style.borderBottom="#808080 1px solid";
v8.style.width=""+Math.max(this.GetPreferredCellWidth(e5,n8),80)+"px";
v7.appendChild(v8);
if (e5.getAttribute("DragColumnCssClass")==null){
v7.style.backgroundColor=n8.style.backgroundColor;
v7.style.paddingTop="1px";
v7.style.paddingBottom="1px";
}
v7.style.top="-50px";
v7.style.left="-100px";
}else {
var v9=0;
v7.style.top="0px";
v7.style.left="-1000px";
v7.style.display="";
v7.innerHTML="";
var w0=document.createElement("TABLE");
v7.appendChild(w0);
var i6=document.createElement("TR");
w0.appendChild(i6);
for (var f0=0;f0<e5.selectedCols.length;f0++){
var h3=document.createElement("TD");
i6.appendChild(h3);
var w1;
var w2;
if (e5.getAttribute("columnHeaderAutoTextIndex")!=null)
w1=parseInt(e5.getAttribute("columnHeaderAutoTextIndex"));
else 
w1=e5.getAttribute("ColHeaders")-1;
w2=e5.selectedCols[f0];
var w3=this.GetHeaderCellFromRowCol(e5,w1,w2,true);
if (w3.getAttribute("FpCellType")=="ExtenderCellType"&&w3.getElementsByTagName("DIV").length>0){
var w4=this.GetEditor(w3);
var w5=this.GetFunction("ExtenderCellType_getEditorValue");
if (w4!=null&&w5!=null){
h3.innerHTML=w5(w4);
}
}
else 
h3.innerHTML=w3.innerHTML;
h3.style.cssText=w3.style.cssText;
h3.style.borderTop="0px solid";
h3.style.borderLeft="0px solid";
h3.style.borderRight="#808080 1px solid";
h3.style.borderBottom="#808080 1px solid";
h3.style.whiteSpace="nowrap";
h3.setAttribute("align","center");
var j0=Math.max(this.GetPreferredCellWidth(e5,w3),80);
h3.style.width=""+j0+"px";
v9+=j0;
}
if (e5.getAttribute("DragColumnCssClass")==null){
v7.style.backgroundColor=e5.getAttribute("SelectedBackColor");
v7.style.tableLayout="fixed";
v7.style.width=""+v9+"px";
}
}
e5.selectedCols.context=[];
var w6=e5.selectedCols.context;
var p9=0;
m7=this.GetColGroup(this.GetColHeader(e5));
if (m7!=null){
for (var f0=0;f0<m7.childNodes.length;f0++){
var w7=m7.childNodes[f0].offsetWidth;
w6.push({left:p9,width:w7});
p9+=w7;
}
}
}
this.SelectTable=function (e5,select){
if (select)this.UpdateAnchorCell(e5,0,0,false);
e5.d8="t";
this.PaintSelection(e5,-1,-1,-1,-1,select);
if (select)
{
this.SetSelection(e5,-1,-1,-1,-1);
}
}
this.GetSpanCell=function (h0,h2,span){
if (span==null){
return null;
}
var v3=span.length;
for (var f0=0;f0<v3;f0++){
var q1=span[f0];
var w8=(q1.row<=h0&&h0<q1.row+q1.rowCount&&q1.col<=h2&&h2<q1.col+q1.colCount);
if (w8)return q1;
}
return null;
}
this.IsCovered=function (e5,h0,h2,span){
var q1=this.GetSpanCell(h0,h2,span);
if (q1==null){
return false;
}else {
if (q1.row==h0&&q1.col==h2)return false;
return true;
}
}
this.IsSpanCell=function (e5,h0,h2){
var e0=e5.e0;
var v3=e0.length;
for (var f0=0;f0<v3;f0++){
var q1=e0[f0];
var w8=(q1.row==h0&&q1.col==h2);
if (w8)return q1;
}
return null;
}
this.SelectRange=function (e5,h0,h2,n1,g9,select){
e5.d8="";
this.UpdateRangeSelection(e5,h0,h2,n1,g9,select);
if (select){
this.SetSelection(e5,h0,h2,n1,g9);
this.PaintAnchorCell(e5);
}
}
this.UpdateRangeSelection=function (e5,h0,h2,n1,g9,select){
var i4=this.GetViewport(e5);
this.UpdateRangeSelection(e5,h0,h2,n1,g9,select,i4);
}
this.GetSpanCells=function (e5,i4){
if (i4==this.GetViewport(e5))
return e5.e0;
else if (i4==this.GetColHeader(e5))
return e5.e2;
else if (i4==this.GetColFooter(e5))
return e5.footerSpanCells;
else if (i4==this.GetRowHeader(e5))
return e5.e1;
return null;
}
this.UpdateRangeSelection=function (e5,h0,h2,n1,g9,select,i4){
if (i4==null)return ;
for (var f0=h0;f0<h0+n1&&f0<i4.rows.length;f0++){
if (this.IsChildSpreadRow(e5,i4,f0))continue ;
var w9=this.GetCellIndex(e5,f0,h2,this.GetSpanCells(e5,i4));
for (var i0=0;i0<g9;i0++){
if (this.IsCovered(e5,f0,h2+i0,this.GetSpanCells(e5,i4)))continue ;
if (w9<i4.rows[f0].cells.length){
this.PaintSelectedCell(e5,i4.rows[f0].cells[w9],select);
}
w9++;
}
}
}
this.GetColFromCell=function (e5,h3){
if (h3==null)return -1;
var h0=this.GetRowFromCell(e5,h3);
return this.GetColIndex(e5,h0,h3.cellIndex,this.GetSpanCells(e5,h3.parentNode.parentNode.parentNode),false,this.IsChild(h3,this.GetRowHeader(e5)));
}
this.GetRowFromCell=function (e5,h3){
if (h3==null||h3.parentNode==null)return -1;
var h0=h3.parentNode.rowIndex;
return h0;
}
this.GetColIndex=function (e5,f0,cellIndex,span,frozArea,c6){
var x0=false;
var e6=this.GetViewport(e5);
if (e6!=null)x0=e6.parentNode.getAttribute("hiddenCells");
if (x0&&span==e5.e0){
return cellIndex;
}
var x1=0;
var v3=this.GetColCount(e5);
var x2=0;
if (c6){
x2=0;
var m7=null;
if (this.GetRowHeader(e5)!=null)
m7=this.GetColGroup(this.GetRowHeader(e5));
if (m7!=null)
v3=m7.childNodes.length;
}
for (var i0=x2;i0<v3;i0++){
if (this.IsCovered(e5,f0,i0,span))continue ;
if (x1==cellIndex){
return i0;
}
x1++;
}
return v3;
}
this.GetCellIndex=function (e5,f0,r8,span){
var x0=false;
var e6=this.GetViewport(e5);
if (e6!=null)x0=e6.parentNode.getAttribute("hiddenCells");
if (x0&&span==e5.e0){
return r8;
}else {
var x2=0;
var v3=r8;
var x1=0;
for (var i0=0;i0<v3;i0++){
if (this.IsCovered(e5,f0,x2+i0,span))continue ;
x1++;
}
return x1;
}
}
this.NextCell=function (e5,event,key){
if (event.altKey)return ;
var x3=this.GetParent(this.GetViewport(e5));
if (e5.d2==null){
var i2=this.FireActiveCellChangingEvent(e5,0,0);
if (!i2){
e5.SetActiveCell(0,0);
var g1=this.CreateEvent("ActiveCellChanged");
g1.cmdID=e5.id;
g1.row=g1.Row=0;
g1.col=g1.Col=0;
this.FireEvent(e5,g1);
}
return ;
}
if (event.shiftKey&&key!=this.tab){
var p7=this.GetOperationMode(e5);
if (p7=="RowMode"||p7=="SingleSelect"||p7=="MultiSelect"||(p7=="Normal"&&this.GetSelectionPolicy(e5)=="Single"))return ;
var q1=this.GetSpanCell(e5.d4,e5.d5,this.GetSpanCells(e5,this.GetViewportFromCell(e5,e5.d2)));
switch (key){
case this.right:
var h0=e5.d4;
var h2=e5.d5+1;
if (q1!=null){
h2=q1.col+q1.colCount;
}
if (h2>this.GetColCount(e5)-1)return ;
e5.d5=h2;
e5.d3=this.GetCellFromRowCol(e5,h0,h2);
this.Select(e5,e5.d2,e5.d3);
break ;
case this.left:
var h0=e5.d4;
var h2=e5.d5-1;
if (q1!=null){
h2=q1.col-1;
}
q1=this.GetSpanCell(h0,h2,this.GetSpanCells(e5,this.GetViewportFromCell(e5,e5.d2)));
if (q1!=null){
if (this.IsSpanCell(e5,h0,q1.col))h2=q1.col;
}
if (h2<0)return ;
e5.d5=h2;
e5.d3=this.GetCellFromRowCol(e5,h0,h2);
this.Select(e5,e5.d2,e5.d3);
break ;
case this.down:
var h0=e5.d4+1;
var h2=e5.d5;
if (q1!=null){
h0=q1.row+q1.rowCount;
}
h0=this.GetNextRow(e5,h0);
if (h0>this.GetRowCountInternal(e5)-1)return ;
e5.d4=h0;
e5.d3=this.GetCellFromRowCol(e5,h0,h2);
this.Select(e5,e5.d2,e5.d3);
break ;
case this.up:
var h0=e5.d4-1;
var h2=e5.d5;
if (q1!=null){
h0=q1.row-1;
}
h0=this.GetPrevRow(e5,h0);
q1=this.GetSpanCell(h0,h2,this.GetSpanCells(e5,this.GetViewportFromCell(e5,e5.d2)));
if (q1!=null){
if (this.IsSpanCell(e5,q1.row,h2))h0=q1.row;
}
if (h0<0)return ;
e5.d4=h0;
e5.d3=this.GetCellFromRowCol(e5,h0,h2);
this.Select(e5,e5.d2,e5.d3);
break ;
case this.home:
if (e5.d2.parentNode.rowIndex>=0){
e5.d5=0;
e5.d3=this.GetCellFromRowCol(e5,e5.d4,e5.d5);
this.Select(e5,e5.d2,e5.d3);
}
break ;
case this.end:
if (e5.d2.parentNode.rowIndex>=0){
e5.d5=this.GetColCount(e5)-1;
e5.d3=this.GetCellFromRowCol(e5,e5.d4,e5.d5);
this.Select(e5,e5.d2,e5.d3);
}
break ;
case this.pdn:
if (this.GetViewport(e5)!=null&&e5.d2.parentNode.rowIndex>=0){
h0=0;
for (h0=0;h0<this.GetViewport(e5).rows.length;h0++){
if (this.GetViewport(e5).rows[h0].offsetTop+this.GetViewport(e5).rows[h0].offsetHeight>this.GetViewport(e5).parentNode.offsetHeight+this.GetViewport(e5).parentNode.scrollTop){
break ;
}
}
h0=this.GetNextRow(e5,h0);
if (h0<this.GetViewport(e5).rows.length){
this.GetViewport(e5).parentNode.scrollTop=this.GetViewport(e5).rows[h0].offsetTop;
e5.d4=h0;
}else {
h0=this.GetRowCountInternal(e5)-1;
e5.d4=h0;
}
e5.d3=this.GetCellFromRowCol(e5,e5.d4,e5.d5);
this.Select(e5,e5.d2,e5.d3);
}
break ;
case this.pup:
if (this.GetViewport(e5)!=null&&e5.d2.parentNode.rowIndex>0){
h0=0;
for (h0=0;h0<this.GetViewport(e5).rows.length;h0++){
if (this.GetViewport(e5).rows[h0].offsetTop+this.GetViewport(e5).rows[h0].offsetHeight>this.GetViewport(e5).parentNode.scrollTop){
break ;
}
}
if (h0<this.GetViewport(e5).rows.length){
var j8=0;
while (h0>0){
j8+=this.GetViewport(e5).rows[h0].offsetHeight;
if (j8>this.GetViewport(e5).parentNode.offsetHeight){
break ;
}
h0--;
}
h0=this.GetPrevRow(e5,h0);
if (h0>=0){
this.GetViewport(e5).parentNode.scrollTop=this.GetViewport(e5).rows[h0].offsetTop;
e5.d4=h0;
e5.d3=this.GetCellFromRowCol(e5,e5.d4,e5.d5);
this.Select(e5,e5.d2,e5.d3);
}
}
}
break ;
}
this.SyncColSelection(e5);
}else {
if (key==this.tab){
if (event.shiftKey)key=this.left;
else key=this.right;
}
var x4=e5.d2;
var h0=e5.d4;
var h2=e5.d5;
switch (key){
case this.right:
if (event.keyCode==this.tab){
var x5=h0;
var x6=h2;
do {
this.MoveRight(e5,h0,h2);
h0=e5.d4;
h2=e5.d5;
}while (!(x5==h0&&x6==h2)&&this.GetCellFromRowCol(e5,h0,h2).getAttribute("TabStop")!=null&&this.GetCellFromRowCol(e5,h0,h2).getAttribute("TabStop")=="false")
}
else {
this.MoveRight(e5,h0,h2);
}
break ;
case this.left:
if (event.keyCode==this.tab){
var x5=h0;
var x6=h2;
do {
this.MoveLeft(e5,h0,h2);
h0=e5.d4;
h2=e5.d5;
}while (!(x5==h0&&x6==h2)&&this.GetCellFromRowCol(e5,h0,h2).getAttribute("TabStop")!=null&&this.GetCellFromRowCol(e5,h0,h2).getAttribute("TabStop")=="false")
}
else {
this.MoveLeft(e5,h0,h2);
}
break ;
case this.down:
this.MoveDown(e5,h0,h2);
break ;
case this.up:
this.MoveUp(e5,h0,h2);
break ;
case this.home:
if (e5.d2.parentNode.rowIndex>=0){
this.UpdateLeadingCell(e5,h0,0);
}
break ;
case this.end:
if (e5.d2.parentNode.rowIndex>=0){
h2=this.GetColCount(e5)-1;
this.UpdateLeadingCell(e5,h0,h2);
}
break ;
case this.pdn:
if (this.GetViewport(e5)!=null&&e5.d2.parentNode.rowIndex>=0){
h0=0;
for (h0=0;h0<this.GetViewport(e5).rows.length;h0++){
if (this.GetViewport(e5).rows[h0].offsetTop+this.GetViewport(e5).rows[h0].offsetHeight>this.GetViewport(e5).parentNode.offsetHeight+this.GetViewport(e5).parentNode.scrollTop){
break ;
}
}
h0=this.GetNextRow(e5,h0);
if (h0<this.GetViewport(e5).rows.length){
var f8=this.GetViewport(e5).rows[h0].offsetTop;
this.UpdateLeadingCell(e5,h0,e5.d5);
this.GetViewport(e5).parentNode.scrollTop=f8;
}else {
h0=this.GetPrevRow(e5,this.GetRowCount(e5)-1);
this.UpdateLeadingCell(e5,h0,e5.d5);
}
}
break ;
case this.pup:
if (this.GetViewport(e5)!=null&&e5.d2.parentNode.rowIndex>=0){
h0=0;
for (h0=0;h0<this.GetViewport(e5).rows.length;h0++){
if (this.GetViewport(e5).rows[h0].offsetTop+this.GetViewport(e5).rows[h0].offsetHeight>this.GetViewport(e5).parentNode.scrollTop){
break ;
}
}
if (h0<this.GetViewport(e5).rows.length){
var j8=0;
while (h0>=0){
j8+=this.GetViewport(e5).rows[h0].offsetHeight;
if (j8>this.GetViewport(e5).parentNode.offsetHeight){
break ;
}
h0--;
}
h0=this.GetPrevRow(e5,h0);
if (h0>=0){
var f8=this.GetViewport(e5).rows[h0].offsetTop;
this.UpdateLeadingCell(e5,h0,e5.d5);
this.GetViewport(e5).parentNode.scrollTop=f8;
}
}
}
break ;
}
if (x4!=e5.d2){
var g1=this.CreateEvent("ActiveCellChanged");
g1.cmdID=e5.id;
g1.Row=g1.row=this.GetSheetIndex(e5,this.GetRowFromCell(e5,e5.d2));
g1.Col=g1.col=this.GetColFromCell(e5,e5.d2);
if (e5.getAttribute("LayoutMode"))
g1.InnerRow=g1.innerRow=e5.d2.parentNode.getAttribute("row");
this.FireEvent(e5,g1);
}
}
var h3=this.GetCellFromRowCol(e5,e5.d4,e5.d5);
if (key==this.left&&h3.offsetLeft<x3.scrollLeft){
if (h3.cellIndex>0)
x3.scrollLeft=e5.d2.offsetLeft;
else 
x3.scrollLeft=0;
}else if (h3.cellIndex==0){
x3.scrollLeft=0;
}
if (key==this.right&&h3.offsetLeft+h3.offsetWidth>x3.scrollLeft+x3.offsetWidth-10){
x3.scrollLeft+=h3.offsetWidth;
}
if (key==this.up&&h3.parentNode.offsetTop<x3.scrollTop){
if (h3.parentNode.rowIndex>1)
x3.scrollTop=h3.parentNode.offsetTop;
else 
x3.scrollTop=0;
}else if (h3.parentNode.rowIndex==1){
x3.scrollTop=0;
}
var x7=this.GetParent(this.GetViewport(e5));
x3=this.GetParent(this.GetViewport(e5));
if (key==this.down&&this.IsChild(h3,x3)&&h3.offsetTop+h3.offsetHeight>x3.scrollTop+x3.clientHeight){
x7.scrollTop+=h3.offsetHeight;
}
if (h3!=null&&h3.offsetWidth<x3.clientWidth){
if (this.IsChild(h3,x3)&&h3.offsetLeft+h3.offsetWidth>x3.scrollLeft+x3.clientWidth){
x7.scrollLeft=h3.offsetLeft+h3.offsetWidth-x3.clientWidth;
}
}
if (this.IsChild(h3,x3)&&h3.offsetTop+h3.offsetHeight>x3.scrollTop+x3.clientHeight&&h3.offsetHeight<x3.clientHeight){
x7.scrollTop=h3.offsetTop+h3.offsetHeight-x3.clientHeight;
}
if (h3.offsetTop<x3.scrollTop){
x7.scrollTop=h3.offsetTop;
}
this.ScrollView(e5);
this.EnableButtons(e5);
this.SaveData(e5);
if (e5.d2!=null){
var i3=this.GetEditor(e5.d2);
if (i3!=null){
if (i3.tagName!="SELECT")
i3.focus();
if (!i3.disabled&&(i3.type==null||i3.type=="checkbox"||i3.type=="radio"||i3.type=="text"||i3.type=="password")){
this.editing=true;
this.a9=i3;
this.b0=this.GetEditorValue(i3);
}
}
}
this.Focus(e5);
}
this.MoveUp=function (e5,h0,h2){
var n1=this.GetRowCountInternal(e5);
var g9=this.GetColCount(e5);
h0--;
h0=this.GetPrevRow(e5,h0);
if (h0>=0){
e5.d4=h0;
this.UpdateLeadingCell(e5,e5.d4,e5.d5);
}
}
this.MoveDown=function (e5,h0,h2){
var n1=this.GetRowCountInternal(e5);
var g9=this.GetColCount(e5);
var q1=this.GetSpanCell(h0,h2,this.GetSpanCells(e5,this.GetViewportFromCell(e5,e5.d2)));
if (q1!=null){
h0=q1.row+q1.rowCount;
}else {
h0++;
}
h0=this.GetNextRow(e5,h0);
if (h0==n1)h0=n1-1;
if (h0<n1){
e5.d4=h0;
this.UpdateLeadingCell(e5,e5.d4,e5.d5);
}
}
this.MoveLeft=function (e5,h0,h2){
var x8=h0;
var n1=this.GetRowCountInternal(e5);
var g9=this.GetColCount(e5);
var q1=this.GetSpanCell(h0,h2,this.GetSpanCells(e5,this.GetViewportFromCell(e5,e5.d2)));
if (q1!=null){
h2=q1.col-1;
}else {
h2--;
}
if (h2<0){
h2=g9-1;
h0--;
if (h0<0){
h0=n1-1;
}
h0=this.GetPrevRow(e5,h0);
e5.d4=h0;
}
var x9=this.UpdateLeadingCell(e5,e5.d4,h2);
if (x9)e5.d4=x8;
}
this.MoveRight=function (e5,h0,h2){
var x8=h0;
var n1=this.GetRowCountInternal(e5);
var g9=this.GetColCount(e5);
var q1=this.GetSpanCell(h0,h2,this.GetSpanCells(e5,this.GetViewportFromCell(e5,e5.d2)));
if (q1!=null){
h2=q1.col+q1.colCount;
}else {
h2++;
}
if (h2>=g9){
h2=0;
h0++;
if (h0>=n1)h0=0;
e5.d4=this.GetNextRow(e5,h0);
}
var x9=this.UpdateLeadingCell(e5,e5.d4,h2);
if (x9)e5.d4=x8;
}
this.UpdateLeadingCell=function (e5,h0,h2){
var y0=0;
if (e5.getAttribute("LayoutMode")){
y0=this.GetRowFromViewPort(e5,h0,h2);
e5.d2=this.GetCellFromRowCol(e5,h0,h2);
var y1=this.GetCellFromRowCol(e5,y0,h2);
if (y1)y0=y1.parentNode.getAttribute("row");
}
var i2=this.FireActiveCellChangingEvent(e5,h0,h2,y0);
if (!i2){
var v0=this.GetOperationMode(e5);
if (v0!="MultiSelect")
this.ClearSelection(e5);
e5.d5=h2;
e5.d4=h0;
e5.d7=h2;
e5.d6=h0;
this.UpdateAnchorCell(e5,h0,h2);
}
return i2;
}
this.GetPrevRow=function (e5,h0){
if (h0<0)return 0;
var i4=this.GetViewport(e5);
if (i4!=null){
while (h0>0&&i4.rows[h0].cells.length>0){
if (this.IsChildSpreadRow(e5,i4,h0))
h0--;
else 
break ;
}
}
if (i4!=null&&h0>=0&&h0<i4.rows.length){
if (i4.rows[h0].getAttribute("previewrow")){
h0--;
}
}
return h0;
}
this.GetNextRow=function (e5,h0){
var i4=this.GetViewport(e5);
while (i4!=null&&h0<i4.rows.length){
if (this.IsChildSpreadRow(e5,i4,h0))h0++;
else 
break ;
}
if (i4!=null&&h0>=0&&h0<i4.rows.length){
if (i4.rows[h0].getAttribute("previewrow")){
h0++;
}
}
return h0;
}
this.FireActiveCellChangingEvent=function (e5,i6,m8,innerRow){
var g1=this.CreateEvent("ActiveCellChanging");
g1.cancel=false;
g1.cmdID=e5.id;
g1.row=this.GetSheetIndex(e5,i6);
g1.col=m8;
if (e5.getAttribute("LayoutMode"))
g1.innerRow=innerRow;
this.FireEvent(e5,g1);
return g1.cancel;
}
this.GetSheetRowIndex=function (e5,h0){
h0=this.GetDisplayIndex(e5,h0);
if (h0<0)return -1;
var m0=this.GetViewport(e5).rows[h0];
if (m0!=null){
return m0.getAttribute("FpKey");
}else {
return -1;
}
}
this.GetSheetColIndex=function (e5,h2){
var m8=-1;
var m7=null;
var y2=this.GetColHeader(e5);
if (y2!=null&&y2.rows.length>0){
m7=this.GetColGroup(y2);
}else {
var e6=this.GetViewport(e5);
if (e6!=null&&e6.rows.length>0){
m7=this.GetColGroup(e6);
}
}
if (m7!=null&&h2>=0&&h2<m7.childNodes.length){
m8=m7.childNodes[h2].getAttribute("FpCol");
}
return m8;
}
this.GetCellByRowCol=function (e5,h0,h2){
h0=this.GetDisplayIndex(e5,h0);
return this.GetCellFromRowCol(e5,h0,h2);
}
this.GetHeaderCellFromRowCol=function (e5,h0,h2,c7){
if (h0<0||h2<0)return null;
var e6=null;
if (c7){
e6=this.GetColHeader(e5);
}else {
e6=this.GetRowHeader(e5);
}
var q1=this.GetSpanCell(h0,h2,this.GetSpanCells(e5,e6));
if (q1!=null){
h0=q1.row;
h2=q1.col;
}
var y3=this.GetCellIndex(e5,h0,h2,this.GetSpanCells(e5,e6));
return e6.rows[h0].cells[y3];
}
this.GetCellFromRowCol=function (e5,h0,h2,prevCell){
if (h0<0||h2<0)return null;
var e6=null;
{
e6=this.GetViewport(e5);
}
var e0=e5.e0;
var q1=this.GetSpanCell(h0,h2,e0);
if (q1!=null){
h0=q1.row;
h2=q1.col;
}
var y3=0;
var x0=false;
if (e6!=null)x0=e6.parentNode.getAttribute("hiddenCells");
if (prevCell!=null&&!x0){
if (prevCell.cellIndex<prevCell.parentNode.cells.length-1)
y3=prevCell.cellIndex+1;
}
else 
{
y3=this.GetCellIndex(e5,h0,h2,e0);
}
if (h0>=0&&h0<e6.rows.length)
return e6.rows[h0].cells[y3];
else 
return null;
}
this.GetHiddenValue=function (e5,h0,colName){
if (colName==null)return ;
h0=this.GetDisplayIndex(e5,h0);
var s7=null;
var e6=null;
e6=this.GetViewport(e5);
if (e6!=null&&h0>=0&&h0<e6.rows.length){
var m0=e6.rows[h0];
s7=m0.getAttribute("hv"+colName);
}
return s7;
}
this.GetValue=function (e5,h0,h2){
h0=this.GetDisplayIndex(e5,h0);
var h3=this.GetCellFromRowCol(e5,h0,h2);
var j1=this.GetRender(h3);
var s7=this.GetValueFromRender(e5,j1);
if (s7!=null)s7=this.Trim(s7.toString());
return s7;
}
this.SetValue=function (e5,h0,h2,u3,noEvent,recalc){
h0=this.GetDisplayIndex(e5,h0);
if (u3!=null&&typeof(u3)!="string")u3=new String(u3);
var h3=this.GetCellFromRowCol(e5,h0,h2);
if (this.ValidateCell(e5,h3,u3)){
this.SetCellValueFromView(h3,u3);
if (u3!=null){
this.SetCellValue(e5,h3,""+u3,noEvent,recalc);
}else {
this.SetCellValue(e5,h3,"",noEvent,recalc);
}
this.SizeSpread(e5);
}else {
if (e5.getAttribute("lcidMsg")!=null)
alert(e5.getAttribute("lcidMsg"));
else 
alert("Can't set the data into the cell. The data type is not correct for the cell.");
}
}
this.SetActiveCell=function (e5,h0,h2){
this.ClearSelection(e5,true);
h0=this.GetDisplayIndex(e5,h0);
this.UpdateAnchorCell(e5,h0,h2);
this.ResetLeadingCell(e5);
}
this.GetOperationMode=function (e5){
var v0=e5.getAttribute("OperationMode");
return v0;
}
this.SetOperationMode=function (e5,v0){
e5.setAttribute("OperationMode",v0);
}
this.GetEnableRowEditTemplate=function (e5){
var y4=e5.getAttribute("EnableRowEditTemplate");
return y4;
}
this.GetSelectionPolicy=function (e5){
var y5=e5.getAttribute("SelectionPolicy");
return y5;
}
this.UpdateAnchorCell=function (e5,h0,h2,select){
if (h0<0||h2<0)return ;
e5.d2=this.GetCellFromRowCol(e5,h0,h2);
if (e5.d2==null)return ;
this.SetActiveRow(e5,this.GetRowKeyFromCell(e5,e5.d2));
this.SetActiveCol(e5,this.GetColKeyFromCell(e5,e5.d2));
if (select==null||select){
var v0=this.GetOperationMode(e5);
if (v0=="RowMode"||v0=="SingleSelect"||v0=="ExtendedSelect")
this.SelectRow(e5,h0,1,true,true);
else if (v0!="MultiSelect")
this.SelectRange(e5,h0,h2,1,1,true);
else 
this.PaintFocusRect(e5);
}
}
this.ResetLeadingCell=function (e5){
if (e5.d2==null||!this.IsChild(e5.d2,e5))return ;
e5.d4=this.GetRowFromCell(e5,e5.d2);
e5.d5=this.GetColFromCell(e5,e5.d2);
this.SelectRange(e5.d4,e5.d5,1,1,true);
}
this.Edit=function (e5,i6){
var v0=this.GetOperationMode(e5);
if (v0!="RowMode")return ;
var s4=e5.getAttribute("name");
var y6=(e5.getAttribute("ajax")!="false");
if (y6){
if (FarPoint&&FarPoint.System.WebControl.MultiColumnComboBoxCellTypeUtilitis)
FarPoint.System.WebControl.MultiColumnComboBoxCellTypeUtilitis.CloseAll();
this.SyncData(s4,"Edit,"+i6,e5);
}
else 
__doPostBack(s4,"Edit,"+i6);
}
this.Update=function (e5){
if (this.editing&&this.GetOperationMode(e5)!="RowMode"&&this.GetEnableRowEditTemplate(e5)!="true")return ;
this.SaveData(e5);
var s4=e5.getAttribute("name");
__doPostBack(s4,"Update");
}
this.Cancel=function (e5){
var f8=document.getElementById(e5.id+"_data");
f8.value="";
this.SaveData(e5);
var s4=e5.getAttribute("name");
var y6=(e5.getAttribute("ajax")!="false");
if (y6)
this.SyncData(s4,"Cancel",e5);
else 
__doPostBack(s4,"Cancel");
}
this.Add=function (e5){
if (this.editing)return ;
var s4=null;
var o6=this.GetPageActiveSpread();
if (o6!=null){
s4=o6.getAttribute("name");
}else {
s4=e5.getAttribute("name");
}
var y6=(e5.getAttribute("ajax")!="false");
if (y6)
this.SyncData(s4,"Add",e5);
else 
__doPostBack(s4,"Add");
}
this.Insert=function (e5){
if (this.editing)return ;
var s4=null;
var o6=this.GetPageActiveSpread();
if (o6!=null){
s4=o6.getAttribute("name");
}else {
s4=e5.getAttribute("name");
}
var y6=(e5.getAttribute("ajax")!="false");
if (y6)
this.SyncData(s4,"Insert",e5);
else 
__doPostBack(s4,"Insert");
}
this.Delete=function (e5){
if (this.editing)return ;
var s4=null;
var o6=this.GetPageActiveSpread();
if (o6!=null){
s4=o6.getAttribute("name");
}else {
s4=e5.getAttribute("name");
}
var y6=(e5.getAttribute("ajax")!="false");
if (y6)
this.SyncData(s4,"Delete",e5);
else 
__doPostBack(s4,"Delete");
}
this.Print=function (e5){
if (this.editing)return ;
this.SaveData(e5);
if (document.printSpread==null){
var f8=document.createElement("IFRAME");
f8.name="printSpread";
f8.style.position="absolute";
f8.style.left="-10px";
f8.style.width="0px";
f8.style.height="0px";
document.printSpread=f8;
document.body.insertBefore(f8,null);
f8.addEventListener("load",function (){the_fpSpread.PrintSpread();},false);
}
var y7=document.getElementsByTagName("FORM");
if (y7!=null&&y7.length>0){
var i2=y7[0];
i2.__EVENTTARGET.value=e5.getAttribute("name");
i2.__EVENTARGUMENT.value="Print";
var y8=i2.target;
i2.target="printSpread";
i2.submit();
i2.target=y8;
}
}
this.PrintSpread=function (){
document.printSpread.focus();
document.printSpread.print();
window.focus();
var o6=this.GetPageActiveSpread();
if (o6!=null)this.Focus(o6);
}
this.GotoPage=function (e5,e9){
if (this.editing)return ;
var s4=e5.getAttribute("name");
var y6=(e5.getAttribute("ajax")!="false");
if (y6)
this.SyncData(s4,"Page,"+e9,e5);
else 
__doPostBack(s4,"Page,"+e9);
}
this.Next=function (e5){
if (this.editing)return ;
var s4=e5.getAttribute("name");
var y6=(e5.getAttribute("ajax")!="false");
if (y6)
this.SyncData(s4,"Next",e5);
else 
__doPostBack(s4,"Next");
}
this.Prev=function (e5){
if (this.editing)return ;
var s4=e5.getAttribute("name");
var y6=(e5.getAttribute("ajax")!="false");
if (y6)
this.SyncData(s4,"Prev",e5);
else 
__doPostBack(s4,"Prev");
}
this.GetViewportFromCell=function (e5,i9){
if (i9!=null){
var f8=i9;
while (f8!=null){
if (f8.tagName=="TABLE")break ;
f8=f8.parentNode;
}
if (f8==this.GetViewport(e5))
return f8;
}
return null;
}
this.IsChild=function (h3,i5){
if (h3==null||i5==null)return false;
var f8=h3.parentNode;
while (f8!=null){
if (f8==i5)return true;
f8=f8.parentNode;
}
return false;
}
this.GetCorner=function (e5){
return e5.c5;
}
this.Select=function (e5,cl1,cl2){
if (this.GetSpread(cl1)!=e5||this.GetSpread(cl2)!=e5)return ;
var h4=e5.d6;
var h5=e5.d7;
var y9=this.GetRowFromCell(e5,cl2);
var m1=0;
if (e5.d8=="r"){
m1=-1;
if (this.IsChild(cl2,this.GetColHeader(e5)))
y9=0;
}else if (e5.d8=="c"){
if (this.IsChild(cl2,this.GetRowHeader(e5)))
m1=0;
else 
m1=this.GetColFromCell(e5,cl2);
y9=-1;
}
else {
if (this.IsChild(cl2,this.GetColHeader(e5))){
y9=0;m1=this.GetColFromCell(e5,cl2);
}else if (this.IsChild(cl2,this.GetRowHeader(e5))){
m1=0;
}else {
m1=this.GetColFromCell(e5,cl2);
}
}
if (e5.d8=="t"){
h5=m1=h4=y9=-1;
}
var f8=Math.max(h4,y9);
h4=Math.min(h4,y9);
y9=f8;
f8=Math.max(h5,m1);
h5=Math.min(h5,m1);
m1=f8;
var h8=null;
var m9=this.GetSelection(e5);
var n0=m9.lastChild;
if (n0!=null){
var h0=this.GetRowByKey(e5,n0.getAttribute("row"));
var h2=this.GetColByKey(e5,n0.getAttribute("col"));
var n1=parseInt(n0.getAttribute("rowcount"));
var g9=parseInt(n0.getAttribute("colcount"));
h8=new this.Range();
this.SetRange(h8,"cell",h0,h2,n1,g9);
}
if (h8!=null&&h8.col==-1&&h8.row==-1)return ;
if (h8!=null&&h8.col==-1&&h8.row>=0){
if (h8.row>y9||h8.row+h8.rowCount-1<h4){
this.PaintSelection(e5,h8.row,h8.col,h8.rowCount,h8.colCount,false);
this.PaintSelection(e5,h4,h5,y9-h4+1,m1-h5+1,true);
}else {
if (h4>h8.row){
var f8=h4-h8.row;
this.PaintSelection(e5,h8.row,h8.col,f8,h8.colCount,false);
if (y9<h8.row+h8.rowCount-1){
this.PaintSelection(e5,y9,h8.col,h8.row+h8.rowCount-y9,h8.colCount,false);
}else {
this.PaintSelection(e5,h8.row+h8.rowCount,h8.col,y9-h8.row-h8.rowCount+1,h8.colCount,true);
}
}else {
this.PaintSelection(e5,h4,h8.col,h8.row-h4,h8.colCount,true);
if (y9<h8.row+h8.rowCount-1){
this.PaintSelection(e5,y9+1,h8.col,h8.row+h8.rowCount-y9-1,h8.colCount,false);
}else {
this.PaintSelection(e5,h8.row+h8.rowCount,h8.col,y9-h8.row-h8.rowCount+1,h8.colCount,true);
}
}
}
}else if (h8!=null&&h8.row==-1&&h8.col>=0){
if (h8.col>m1||h8.col+h8.colCount-1<h5){
this.PaintSelection(e5,h8.row,h8.col,h8.rowCount,h8.colCount,false);
this.PaintSelection(e5,h4,h5,y9-h4+1,m1-h5+1,true);
}else {
if (h5>h8.col){
this.PaintSelection(e5,h8.row,h8.col,h8.rowCount,h5-h8.col,false);
if (m1<h8.col+h8.colCount-1){
this.PaintSelection(e5,h8.row,m1,h8.rowCount,h8.col+h8.colCount-m1,false);
}else {
this.PaintSelection(e5,h8.row,h8.col+h8.colCount,h8.rowCount,m1-h8.col-h8.colCount,true);
}
}else {
this.PaintSelection(e5,h8.row,h5,h8.rowCount,h8.col-h5,true);
if (m1<h8.col+h8.colCount-1){
this.PaintSelection(e5,h8.row,m1+1,h8.rowCount,h8.col+h8.colCount-m1-1,false);
}else {
this.PaintSelection(e5,h8.row,h8.col+h8.colCount,h8.rowCount,m1-h8.col-h8.colCount+1,true);
}
}
}
}else if (h8!=null&&h8.row>=0&&h8.col>=0){
this.ExtendSelection(e5,h8,h4,h5,y9-h4+1,m1-h5+1);
}else {
this.PaintSelection(e5,h4,h5,y9-h4+1,m1-h5+1,true);
}
this.SetSelection(e5,h4,h5,y9-h4+1,m1-h5+1,h8==null);
}
this.ExtendSelection=function (e5,h8,newRow,newCol,newRowCount,newColCount)
{
var p9=Math.max(h8.col,newCol);
var q0=Math.min(h8.col+h8.colCount-1,newCol+newColCount-1);
var u1=Math.max(h8.row,newRow);
var z0=Math.min(h8.row+h8.rowCount-1,newRow+newRowCount-1);
if (h8.row<u1){
this.PaintSelection(e5,h8.row,h8.col,u1-h8.row,h8.colCount,false);
}
if (h8.col<p9){
this.PaintSelection(e5,h8.row,h8.col,h8.rowCount,p9-h8.col,false);
}
if (h8.row+h8.rowCount-1>z0){
this.PaintSelection(e5,z0+1,h8.col,h8.row+h8.rowCount-z0-1,h8.colCount,false);
}
if (h8.col+h8.colCount-1>q0){
this.PaintSelection(e5,h8.row,q0+1,h8.rowCount,h8.col+h8.colCount-q0-1,false);
}
if (newRow<u1){
this.PaintSelection(e5,newRow,newCol,u1-newRow,newColCount,true);
}
if (newCol<p9){
this.PaintSelection(e5,newRow,newCol,newRowCount,p9-newCol,true);
}
if (newRow+newRowCount-1>z0){
this.PaintSelection(e5,z0+1,newCol,newRow+newRowCount-z0-1,newColCount,true);
}
if (newCol+newColCount-1>q0){
this.PaintSelection(e5,newRow,q0+1,newRowCount,newCol+newColCount-q0-1,true);
}
}
this.PaintAnchorCellHeader=function (e5,select){
var h0,h2;
h0=this.GetRowFromCell(e5,e5.d2);
h2=this.GetColFromCell(e5,e5.d2);
if (select&&e5.d2.getAttribute("group")!=null){
var q1=this.GetSpanCell(h0,h2,e5.e0);
if (q1!=null&&q1.colCount>1){
var z1=this.GetSelectedRange(e5);
if (h0<z1.row||h0>=z1.row+z1.rowCount||h2<z1.col||h2>=z1.col+z1.colCount)
return ;
}
}
if (this.GetColHeader(e5)!=null)this.PaintHeaderSelection(e5,h0,h2,1,1,select,true);
if (this.GetRowHeader(e5)!=null)this.PaintHeaderSelection(e5,h0,h2,1,1,select,false);
}
this.LineIntersection=function (s1,h5,s2,m1){
var r4,g1;
r4=Math.max(s1,s2);
g1=Math.min(s1+h5,s2+m1);
if (r4<g1)
return {s:r4,c:g1-r4};
return null;
}
this.RangeIntersection=function (h4,h5,v4,cc1,y9,m1,rc2,cc2){
var z2=this.LineIntersection(h4,v4,y9,rc2);
var z3=this.LineIntersection(h5,cc1,m1,cc2);
if (z2&&z3)
return {row:z2.s,col:z3.s,rowCount:z2.c,colCount:z3.c};
return null;
}
this.PaintSelection=function (e5,h0,h2,n1,g9,select){
if (h0<0&&h2<0){
this.PaintCornerSelection(e5,select);
}
var z4=false;
var z5=false;
if (h0<0){
h0=0;
n1=this.GetRowCountInternal(e5);
}
if (h2<0){
h2=0;
g9=this.GetColCount(e5);
}
this.PaintViewportSelection(e5,h0,h2,n1,g9,select);
var m9=this.GetSelection(e5);
var n0;
var y9;
var m1;
var z6;
var z7;
var h8;
var z8;
for (var f0=m9.childNodes.length-1;f0>=0;f0--){
n0=m9.childNodes[f0];
if (n0){
y9=parseInt(n0.getAttribute("rowIndex"));
m1=parseInt(n0.getAttribute("colIndex"));
z6=parseInt(n0.getAttribute("rowcount"));
z7=parseInt(n0.getAttribute("colcount"));
if (y9<0||z6<0){y9=0;z6=this.GetRowCountInternal(e5);}
if (m1<0||z7<0){m1=0;z7=this.GetColCount(e5);}
if (f0>=m9.childNodes.length-1){
if (h0<=y9&&n1>=z6){
if (this.GetColHeader(e5)!=null&&this.GetOperationMode(e5)=="Normal"){
this.PaintHeaderSelection(e5,h0,h2,n1,g9,select,true);
z4=true;
}
}
if (h2<=m1&&g9>=z7){
if (this.GetRowHeader(e5)!=null){
this.PaintHeaderSelection(e5,h0,h2,n1,g9,select,false);
z5=true;
}
}
if (!z4&&!z5){
if (this.GetColHeader(e5)!=null&&this.GetOperationMode(e5)=="Normal"){
this.PaintHeaderSelection(e5,h0,h2,n1,g9,select,true);
z4=true;
}
if (this.GetRowHeader(e5)!=null){
this.PaintHeaderSelection(e5,h0,h2,n1,g9,select,false);
z5=true;
}
}
}
else {
if (!select&&this.GetOperationMode(e5)=="Normal"){
h8=this.RangeIntersection(h0,h2,n1,g9,y9,m1,z6,z7);
if (h8){
this.PaintViewportSelection(e5,h8.row,h8.col,h8.rowCount,h8.colCount,true);
}
if (z4){
z8=this.LineIntersection(h2,g9,m1,z7);
if (z8)this.PaintHeaderSelection(e5,h0,z8.s,n1,z8.c,true,true);
}
if (z5){
z8=this.LineIntersection(h0,n1,y9,z6);
if (z8)this.PaintHeaderSelection(e5,z8.s,h2,z8.c,g9,true,false);
}
}
}
}
}
if (m9.childNodes.length<=0){
if (this.GetColHeader(e5)!=null&&this.GetOperationMode(e5)=="Normal")this.PaintHeaderSelection(e5,h0,h2,n1,g9,select,true);
if (this.GetRowHeader(e5)!=null)this.PaintHeaderSelection(e5,h0,h2,n1,g9,select,false);
}
this.PaintAnchorCell(e5);
}
this.PaintFocusRect=function (e5){
var g4=document.getElementById(e5.id+"_focusRectT");
if (g4==null)return ;
var z9=this.GetSelectedRange(e5);
if (e5.d2==null&&(z9==null||(z9.rowCount==0&&z9.colCount==0))){
g4.style.left="-1000px";
var s4=e5.id;
g4=document.getElementById(s4+"_focusRectB");
g4.style.left="-1000px";
g4=document.getElementById(s4+"_focusRectL");
g4.style.left="-1000px";
g4=document.getElementById(s4+"_focusRectR");
g4.style.left="-1000px";
return ;
}
var i1=this.GetOperationMode(e5);
if (i1=="RowMode"||i1=="SingleSelect"||i1=="MultiSelect"||i1=="ExtendedSelect"){
var h0=e5.GetActiveRow();
z9=new this.Range();
this.SetRange(z9,"Row",h0,-1,1,-1);
}else if (z9==null||(z9.rowCount==0&&z9.colCount==0)){
var h0=e5.GetActiveRow();
var h2=e5.GetActiveCol();
z9=new this.Range();
this.SetRange(z9,"Cell",h0,h2,e5.d2.rowSpan,e5.d2.colSpan);
}
if (z9.row<0){
z9.row=0;
z9.rowCount=this.GetRowCountInternal(e5);
}
if (z9.col<0){
z9.col=0;
z9.colCount=this.GetColCount(e5);
}
var h3=this.GetCellFromRowCol(e5,z9.row,z9.col);
if (h3==null)return ;
if (z9.rowCount==1&&z9.colCount==1){
z9.rowCount=h3.rowSpan;
z9.colCount=h3.colSpan;
if (h3.colSpan>1){
var aa0=parseInt(h3.getAttribute("col"));
if (aa0!=z9.col&&!isNaN(aa0))z9.col=aa0;
}
}
var f8=this.GetOffsetTop(e5,h3);
var aa1=this.GetOffsetLeft(e5,h3);
if (h3.rowSpan>1){
z9.row=h3.parentNode.rowIndex;
var h5=this.GetCellFromRowCol(e5,z9.row,z9.col+z9.colCount-1);
if (h5!=null&&h5.parentNode.rowIndex>h3.parentNode.rowIndex){
f8=this.GetOffsetTop(e5,h5);
}
}
if (h3.colSpan>1){
var h5=this.GetCellFromRowCol(e5,z9.row+z9.rowCount-1,z9.col);
var j7=this.GetOffsetLeft(e5,h5);
if (j7>aa1){
aa1=j7;
h3=h5;
}
}
var j8=0;
var g8=this.GetViewport(e5).rows;
for (var h0=z9.row;h0<z9.row+z9.rowCount&&h0<g8.length;h0++){
j8+=g8[h0].offsetHeight;
if (h0>z9.row)j8+=parseInt(this.GetViewport(e5).cellSpacing);
}
var j0=0;
var m7=this.GetColGroup(this.GetViewport(e5));
if (m7.childNodes==null||m7.childNodes.length==0)return ;
for (var h2=z9.col;h2<z9.col+z9.colCount&&h2<m7.childNodes.length;h2++){
j0+=m7.childNodes[h2].offsetWidth;
if (h2>z9.col)j0+=parseInt(this.GetViewport(e5).cellSpacing);
}
if (z9.col>h3.cellIndex&&z9.type=="Column"){
var m1=parseInt(h3.getAttribute("col"));
for (var h2=m1;h2<z9.col;h2++){
aa1+=m7.childNodes[h2].offsetWidth;
if (h2>m1)aa1+=parseInt(this.GetViewport(e5).cellSpacing);
}
}
if (z9.row>0)f8-=2;
else j8-=2;
if (z9.col>0)aa1-=2;
else j0-=2;
if (parseInt(this.GetViewport(e5).cellSpacing)>0){
f8+=1;aa1+=1;
}else {
j0+=1;
j8+=1;
}
if (j0<0)j0=0;
if (j8<0)j8=0;
g4.style.left=""+aa1+"px";
g4.style.top=""+f8+"px";
g4.style.width=""+j0+"px";
g4=document.getElementById(e5.id+"_focusRectB");
g4.style.left=""+aa1+"px";
g4.style.top=""+(f8+j8)+"px";
g4.style.width=""+j0+"px";
g4=document.getElementById(e5.id+"_focusRectL");
g4.style.left=""+aa1+"px";
g4.style.top=""+f8+"px";
g4.style.height=""+j8+"px";
g4=document.getElementById(e5.id+"_focusRectR");
g4.style.left=""+(aa1+j0)+"px";
g4.style.top=""+f8+"px";
g4.style.height=""+j8+"px";
}
this.PaintCornerSelection=function (e5,select){
var aa2=true;
if (e5.getAttribute("ShowHeaderSelection")=="false")aa2=false;
if (!aa2)return ;
var m6=this.GetCorner(e5);
if (m6!=null&&m6.rows.length>0){
for (var f0=0;f0<m6.rows.length;f0++){
for (var i0=0;i0<m6.rows[0].cells.length;i0++){
if (m6.rows[f0].cells[i0]!=null)
this.PaintSelectedCell(e5,m6.rows[f0].cells[i0],select);
}
}
}
}
this.PaintHeaderSelection=function (e5,h0,h2,n1,g9,select,c7){
var aa2=true;
if (e5.getAttribute("ShowHeaderSelection")=="false")aa2=false;
if (!aa2)return ;
var aa3=this.GetRowCountInternal(e5);
var aa4=this.GetColCount(e5);
if (c7){
if (this.GetColHeader(e5)==null)return ;
h0=0;
n1=aa3=this.GetColHeader(e5).rows.length;
}else {
if (this.GetRowHeader(e5)==null)return ;
h2=0;
g9=aa4=this.GetColGroup(this.GetRowHeader(e5)).childNodes.length;
}
var aa5=c7?e5.e2:e5.e1;
for (var f0=h0;f0<h0+n1&&f0<aa3;f0++){
if (!c7&&this.IsChildSpreadRow(e5,this.GetViewport(e5),f0))continue ;
for (var i0=h2;i0<h2+g9&&i0<aa4;i0++){
if (this.IsCovered(e5,f0,i0,aa5))continue ;
var h3=this.GetHeaderCellFromRowCol(e5,f0,i0,c7);
if (h3!=null)this.PaintSelectedCell(e5,h3,select);
}
}
}
this.PaintViewportSelection=function (e5,h0,h2,n1,g9,select){
var aa3=this.GetRowCountInternal(e5);
var aa4=this.GetColCount(e5);
for (var f0=h0;f0<h0+n1&&f0<aa3;f0++){
if (this.IsChildSpreadRow(e5,this.GetViewport(e5),f0))continue ;
var h3=null;
for (var i0=h2;i0<h2+g9&&i0<aa4;i0++){
if (this.IsCovered(e5,f0,i0,e5.e0))continue ;
h3=this.GetCellFromRowCol(e5,f0,i0,h3);
this.PaintSelectedCell(e5,h3,select);
}
}
}
this.Copy=function (e5){
var o6=this.GetPageActiveSpread();
if (o6!=null&&o6!=e5&&this.GetTopSpread(o6)==e5){
this.Copy(o6);
return ;
}
var m9=this.GetSelection(e5);
var n0=m9.lastChild;
if (n0!=null){
var h0=this.GetRowByKey(e5,n0.getAttribute("row"));
var h2=this.GetColByKey(e5,n0.getAttribute("col"));
var n1=parseInt(n0.getAttribute("rowcount"));
var g9=parseInt(n0.getAttribute("colcount"));
if (h0<0){
h0=0;
n1=this.GetRowCountInternal(e5);
}
if (h2<0){
h2=0;
g9=this.GetColCount(e5);
}
var f4="";
for (var f0=h0;f0<h0+n1;f0++){
if (this.IsChildSpreadRow(e5,this.GetViewport(e5),f0))continue ;
var h3=null;
for (var i0=h2;i0<h2+g9;i0++){
if (this.IsCovered(e5,f0,i0,e5.e0))
f4+="";
else 
{
h3=this.GetCellFromRowCol(e5,f0,i0,h3);
if (h3!=null&&h3.parentNode.getAttribute("previewrow")=="true")continue ;
var j2=this.GetCellType(h3);
if (j2=="TextCellType"&&h3.getAttribute("password")!=null)
f4+="";
else 
f4+=this.GetCellValueFromView(e5,h3);
}
if (i0+1<h2+g9)f4+="\t";
}
f4+="\r\n";
}
this.c0=f4;
}else {
if (e5.d2!=null){
var f4=this.GetCellValueFromView(e5,e5.d2);
this.c0=f4;
}
}
}
this.GetCellValueFromView=function (e5,h3){
var u3=null;
if (h3!=null){
var aa6=this.GetRender(h3);
u3=this.GetValueFromRender(e5,aa6);
if (u3==null||u3==" ")u3="";
}
return u3;
}
this.SetCellValueFromView=function (h3,u3,ignoreLock){
if (h3!=null){
var aa6=this.GetRender(h3);
var r3=this.GetCellType(h3);
if ((r3!="readonly"||ignoreLock)&&aa6!=null&&aa6.getAttribute("FpEditor")!="Button")
this.SetValueToRender(aa6,u3);
}
}
this.Paste=function (e5){
var o6=this.GetPageActiveSpread();
if (o6!=null&&o6!=e5&&this.GetTopSpread(o6)==e5){
this.Paste(o6);
return ;
}
if (e5.d2==null)return ;
var f4=this.c0;
if (f4==null)return ;
var e6=this.GetViewportFromCell(e5,e5.d2);
var h0=this.GetRowFromCell(e5,e5.d2);
var h2=this.GetColFromCell(e5,e5.d2);
var g9=this.GetColCount(e5);
var n1=this.GetRowCountInternal(e5);
var aa7=h0;
var w9=h2;
var aa8=new String(f4);
if (aa8.length==0)return ;
var e9=aa8.lastIndexOf("\r\n");
if (e9>=0&&e9==aa8.length-2)aa8=aa8.substring(0,e9);
var aa9=0;
var ab0=aa8.split("\r\n");
for (var f0=0;f0<ab0.length&&aa7<n1;f0++){
if (typeof(ab0[f0])=="string"){
ab0[f0]=ab0[f0].split("\t");
if (ab0[f0].length>aa9)aa9=ab0[f0].length;
}
aa7++;
}
aa7=this.GetSheetIndex(e5,h0);
for (var f0=0;f0<ab0.length&&aa7<n1;f0++){
var ab1=ab0[f0];
if (ab1!=null){
w9=h2;
var h3=null;
var y9=this.GetDisplayIndex(e5,aa7);
for (var i0=0;i0<ab1.length&&w9<g9;i0++){
if (!this.IsCovered(e5,y9,w9,e5.e0)){
h3=this.GetCellFromRowCol(e5,y9,w9,h3);
if (h3!=null&&h3.parentNode.getAttribute("previewrow")=="true")continue ;
if (h3==null)return ;
var ab2=ab1[i0];
if (!this.ValidateCell(e5,h3,ab2)){
if (e5.getAttribute("lcidMsg")!=null)
alert(e5.getAttribute("lcidMsg"));
else 
alert("Can't set the data into the cell. The data type is not correct for the cell.");
return ;
}
}
w9++;
}
}
aa7++;
}
if (ab0.length==0)return ;
aa7=this.GetSheetIndex(e5,h0);
for (var f0=0;f0<ab0.length&&aa7<n1;f0++){
w9=h2;
var ab1=ab0[f0];
var h3=null;
var y9=this.GetDisplayIndex(e5,aa7);
for (var i0=0;i0<aa9&&w9<g9;i0++){
if (!this.IsCovered(e5,y9,w9,e5.e0)){
h3=this.GetCellFromRowCol(e5,y9,w9,h3);
if (h3!=null&&h3.parentNode.getAttribute("previewrow")=="true")continue ;
var r3=this.GetCellType(h3);
var aa6=this.GetRender(h3);
if (r3!="readonly"&&aa6.getAttribute("FpEditor")!="Button"){
var ab2=null;
if (ab1!=null&&i0<ab1.length)ab2=ab1[i0];
this.SetCellValueFromView(h3,ab2);
if (ab2!=null){
this.SetCellValue(e5,h3,""+ab2);
}else {
this.SetCellValue(e5,h3,"");
}
}
}
w9++;
}
aa7++;
}
var u8=e5.getAttribute("autoCalc");
if (u8!="false"){
this.UpdateValues(e5);
}
var e8=this.GetTopSpread(e5);
var f9=document.getElementById(e8.id+"_textBox");
if (f9!=null){
f9.blur();
}
this.Focus(e5);
}
this.UpdateValues=function (e5){
if (e5.d9==null&&this.GetParentSpread(e5)==null&&e5.getAttribute("rowFilter")!="true"&&e5.getAttribute("hierView")!="true"&&e5.getAttribute("IsNewRow")!="true"){
this.SaveData(e5);
this.StorePostData(e5);
this.SyncData(e5.getAttribute("name"),"UpdateValues",e5);
}
}
this.ValidateCell=function (e5,h3,u3){
if (h3==null||u3==null||u3=="")return true;
var u6=null;
var j2=this.GetCellType(h3);
if (j2!=null){
var i2=this.GetFunction(j2+"_isValid");
if (i2!=null){
u6=i2(h3,u3);
}
}
return (u6==null||u6=="");
}
this.DoclearSelection=function (e5){
var m9=this.GetSelection(e5);
var n0=m9.lastChild;
while (n0!=null){
var h0=this.GetRowByKey(e5,n0.getAttribute("row"));
var h2=this.GetColByKey(e5,n0.getAttribute("col"));
var n1=parseInt(n0.getAttribute("rowcount"));
var g9=parseInt(n0.getAttribute("colcount"));
this.PaintSelection(e5,h0,h2,n1,g9,false);
m9.removeChild(n0);
n0=m9.lastChild;
}
}
this.Clear=function (e5){
var o6=this.GetPageActiveSpread();
if (o6!=null&&o6!=e5&&this.GetTopSpread(o6)==e5){
this.Clear(o6);
return ;
}
var r3=this.GetCellType(e5.d2);
if (r3=="readonly")return ;
var m9=this.GetSelection(e5);
var n0=m9.lastChild;
if (this.AnyReadOnlyCell(e5,n0)){
return ;
}
this.Copy(e5);
if (n0!=null){
var h0=this.GetRowByKey(e5,n0.getAttribute("row"));
var h2=this.GetColByKey(e5,n0.getAttribute("col"));
var n1=parseInt(n0.getAttribute("rowcount"));
var g9=parseInt(n0.getAttribute("colcount"));
if (h0<0){
h0=0;
n1=this.GetRowCountInternal(e5);
}
if (h2<0){
h2=0;
g9=this.GetColCount(e5);
}
for (var f0=h0;f0<h0+n1;f0++){
if (this.IsChildSpreadRow(e5,this.GetViewport(e5),f0))continue ;
var h3=null;
for (var i0=h2;i0<h2+g9;i0++){
if (!this.IsCovered(e5,f0,i0,e5.e0)){
h3=this.GetCellFromRowCol(e5,f0,i0,h3);
if (h3!=null&&h3.parentNode.getAttribute("previewrow")=="true")continue ;
var r3=this.GetCellType(h3);
if (r3!="readonly"){
var ab3=this.GetEditor(h3);
if (ab3!=null&&ab3.getAttribute("FpEditor")=="Button")continue ;
this.SetCellValueFromView(h3,null);
this.SetCellValue(e5,h3,"");
}
}
}
}
var u8=e5.getAttribute("autoCalc");
if (u8!="false"){
this.UpdateValues(e5);
}
}
}
this.AnyReadOnlyCell=function (e5,n0){
if (n0!=null){
var h0=this.GetRowByKey(e5,n0.getAttribute("row"));
var h2=this.GetColByKey(e5,n0.getAttribute("col"));
var n1=parseInt(n0.getAttribute("rowcount"));
var g9=parseInt(n0.getAttribute("colcount"));
if (h0<0){
h0=0;
n1=this.GetRowCountInternal(e5);
}
if (h2<0){
h2=0;
g9=this.GetColCount(e5);
}
for (var f0=h0;f0<h0+n1;f0++){
if (this.IsChildSpreadRow(e5,this.GetViewport(e5),f0))continue ;
var h3=null;
for (var i0=h2;i0<h2+g9;i0++){
if (!this.IsCovered(e5,f0,i0,e5.e0)){
h3=this.GetCellFromRowCol(e5,f0,i0,h3);
var r3=this.GetCellType(h3);
if (r3=="readonly"){
return true;
}
}
}
}
}
return false;
}
this.MoveSliderBar=function (e5,g1){
var l9=this.GetElementById(this.activePager,e5.id+"_slideBar");
var f8=(g1.clientX-this.GetOffsetLeft(e5,e5,document.body)+window.scrollX-8);
if (f8<e5.slideLeft)f8=e5.slideLeft;
if (f8>e5.slideRight)f8=e5.slideRight;
var m3=parseInt(this.activePager.getAttribute("totalPage"))-1;
var ab4=parseInt(((f8-e5.slideLeft)/(e5.slideRight-e5.slideLeft))*m3)+1;
if (e5.style.position!="absolute"&&e5.style.position!="relative")
f8+=this.GetOffsetLeft(e5,e5,document.body)
l9.style.left=f8+"px";
return ab4;
}
this.MouseMove=function (event){
if (window.fpPostOn!=null)return ;
event=this.GetEvent(event);
var n8=this.GetTarget(event);
if (n8!=null&&n8.tagName=="scrollbar")
return ;
var e5=this.GetSpread(n8,true);
if (e5!=null&&this.dragSlideBar)
{
if (this.activePager!=null){
var ab4=this.MoveSliderBar(e5,event);
var ab5=this.GetElementById(this.activePager,e5.id+"_posIndicator");
ab5.innerHTML=this.activePager.getAttribute("pageText")+ab4;
}
return ;
}
if (this.working)e5=this.GetSpread(this.b9);
if (e5==null||(!this.working&&this.HitCommandBar(n8)))return ;
if (e5.getAttribute("OperationMode")=="ReadOnly")return ;
var j9=this.IsXHTML(e5);
if (this.working){
if (this.dragCol!=null&&this.dragCol>=0){
var v7=this.GetMovingCol(e5);
if (v7!=null){
if (v7.style.display=="none")v7.style.display="";
if (e5.style.position!="absolute"&&e5.style.position!="relative"){
v7.style.top=""+(event.clientY+window.scrollY)+"px";
v7.style.left=""+(event.clientX+window.scrollX+5)+"px";
}else {
v7.style.top=""+(event.clientY-this.GetOffsetTop(e5,e5,document.body)+window.scrollY)+"px";
v7.style.left=""+(event.clientX-this.GetOffsetLeft(e5,e5,document.body)+window.scrollX+5)+"px";
}
}
var e6=this.GetViewport(e5);
var ab6=document.body;
var ab7=this.GetGroupBar(e5);
var f8=-1;
var l8=event.clientX;
var u1=0;
var p9=0;
if (e5.style.position!="absolute"&&e5.style.position!="relative"){
u1=this.GetOffsetTop(e5,e5,document.body)-e6.parentNode.scrollTop;
p9=this.GetOffsetLeft(e5,e5,document.body)-e6.parentNode.scrollLeft;
l8+=Math.max(document.body.scrollLeft,document.documentElement.scrollLeft);
}else {
l8-=(this.GetOffsetLeft(e5,e5,document.body)-Math.max(document.body.scrollLeft,document.documentElement.scrollLeft));
}
var ab8=false;
var j9=this.IsXHTML(e5);
var ab9=j9?document.body.parentNode.scrollTop:document.body.scrollTop;
var k9=document.getElementById(e5.id+"_titleBar");
if (k9)ab9-=k9.parentNode.parentNode.offsetHeight;
if (this.GetPager1(e5)!=null)ab9-=this.GetPager1(e5).offsetHeight;
if (ab7!=null&&event.clientY<this.GetOffsetTop(e5,e5,document.body)-e6.parentNode.scrollTop+ab7.offsetHeight-ab9){
if (e5.style.position!="absolute"&&e5.style.position!="relative")
p9=this.GetOffsetLeft(e5,e5,document.body);
u1+=10;
ab8=true;
var w0=ab7.getElementsByTagName("TABLE")[0];
if (w0!=null){
for (var f0=0;f0<w0.rows[0].cells[0].childNodes.length;f0++){
var j0=w0.rows[0].cells[0].childNodes[f0].offsetWidth;
if (j0==null)continue ;
if (p9<=l8&&l8<p9+j0){
f8=f0;
break ;
}
p9+=j0;
}
}
if (f8==-1&&l8>=p9)f8=-2;
e5.targetCol=f8;
}else {
if (e5.style.position=="absolute"||e5.style.position=="relative")
p9=-e6.parentNode.scrollLeft;
if (this.GetRowHeader(e5)!=null)p9+=this.GetRowHeader(e5).offsetWidth;
if (ab7!=null)u1+=ab7.offsetHeight;
if (l8<p9){
f8=0;
}else {
var m7=this.GetColGroup(this.GetColHeader(e5));
if (m7!=null){
for (var f0=0;f0<m7.childNodes.length;f0++){
var j0=parseInt(m7.childNodes[f0].width);
if (j0==null)continue ;
if (p9<=l8&&l8<p9+j0){
f8=f0;
break ;
}
p9+=j0;
}
}
}
if (f8>=0&&f8!=this.dragViewCol){
if (this.dragViewCol<f8){
f8++;
if (f8<m7.childNodes.length)
p9+=j0;
}
}
p9-=5;
var ac0=parseInt(this.GetSheetColIndex(e5,f8));
if (ac0<0)ac0=f8;
e5.targetCol=ac0;
}
if (k9)u1+=k9.parentNode.parentNode.offsetHeight;
if (this.GetPager1(e5)!=null)u1+=this.GetPager1(e5).offsetHeight;
var ab5=this.GetPosIndicator(e5);
ab5.style.left=""+p9+"px";
ab5.style.top=""+u1+"px";
if (ab7!=null&&ab8&&ab7.getElementsByTagName("TABLE").length==0){
ab5.style.display="none";
}else {
if (ab8||e5.allowColMove)
ab5.style.display="";
else 
ab5.style.display="none";
}
return ;
}
if (this.b5==null&&this.b6==null){
if (e5.d2!=null){
var i4=this.GetParent(this.GetViewport(e5));
if (i4!=null){
var r5=e5.offsetTop+i4.offsetTop+i4.offsetHeight-10;
if (event.clientY>r5){
i4.scrollTop=i4.scrollTop+10;
this.ScrollView(e5);
}else if (event.clientY<e5.offsetTop+i4.offsetTop+5){
i4.scrollTop=i4.scrollTop-10;
this.ScrollView(e5);
}
var ac1=e5.offsetLeft+i4.offsetLeft+i4.offsetWidth-20;
if (event.clientX>ac1){
i4.scrollLeft=i4.scrollLeft+10;
this.ScrollView(e5);
}else if (event.clientX<e5.offsetLeft+i4.offsetLeft+5){
i4.scrollLeft=i4.scrollLeft-10;
this.ScrollView(e5);
}
}
var h3=this.GetCell(n8,null,event);
if (h3!=null&&h3!=e5.d3){
var i1=this.GetOperationMode(e5);
if (i1!="MultiSelect"){
if (i1=="SingleSelect"||i1=="RowMode"){
this.ClearSelection(e5);
var h4=this.GetRowFromCell(e5,h3);
this.UpdateAnchorCell(e5,h4,0);
this.SelectRow(e5,h4,1,true,true);
}else {
if (!(i1=="Normal"&&this.GetSelectionPolicy(e5)=="Single")){
this.Select(e5,e5.d2,h3);
this.SyncColSelection(e5);
}
}
e5.d3=h3;
}
}
}
}else if (this.b5!=null){
var ac2=event.clientX-this.b7;
var w7=parseInt(this.b5.width)+ac2;
var u0=0;
var ac3=(w7>u0);
if (ac3){
this.b5.width=w7;
var k4=parseInt(this.b5.getAttribute("index"));
this.SetWidthFix(this.GetColHeader(e5),k4,w7);
this.b7=event.clientX;
}
}else if (this.b6!=null){
var ac2=event.clientY-this.b8;
var ac4=parseInt(this.b6.style.height)+ac2;
var u0=0;
var ac3=(u0<ac4);
if (ac3){
this.b6.cells[0].style.posHeight=this.b6.cells[1].style.posHeight=(this.b6.cells[0].style.posHeight+ac2);
this.b8=event.clientY;
}
}
}else {
this.b9=n8;
if (this.b9==null||this.GetSpread(this.b9)!=e5)return ;
var n8=this.GetSizeColumn(e5,this.b9,event);
if (n8!=null){
this.b5=n8;
this.b9.style.cursor=this.GetResizeCursor(false);
}else {
var n8=this.GetSizeRow(e5,this.b9,event);
if (n8!=null){
this.b6=n8;
if (this.b9!=null&&this.b9.style!=null)this.b9.style.cursor=this.GetResizeCursor(true);
}else {
if (this.b9!=null&&this.b9.style!=null){
var h3=this.GetCell(this.b9);
if (h3!=null&&this.IsHeaderCell(e5,h3))this.b9.style.cursor="default";
if (this.b9!=null&&(this.b9.getAttribute("FpSpread")=="rowpadding"||this.b9.getAttribute("ControlType")=="chgrayarea"))
this.b9.style.cursor=this.GetgrayAreaCursor(e5);
}
}
}
}
}
this.GetgrayAreaCursor=function (e5){
if (e5.c4!=null&&e5.c4.style.cursor!=null){
if (e5.c4.style.cursor=="auto")
e5.c4.style.cursor="default";
return e5.c4.style.cursor;
}
else return "default";
}
this.GetResizeCursor=function (i6){
if (i6){
return "n-resize";
}else {
return "w-resize";
}
}
this.HitCommandBar=function (n8){
var f8=n8;
var e5=this.GetTopSpread(this.GetSpread(f8,true));
if (e5==null)return false;
var p5=this.GetCommandBar(e5);
while (f8!=null&&f8!=e5){
if (f8==p5)return true;
f8=f8.parentNode;
}
return false;
}
this.OpenWaitMsg=function (e5){
var i2=document.getElementById(e5.id+"_waitmsg");
if (i2==null)return ;
var j0=e5.offsetWidth;
var j8=e5.offsetHeight;
var i7=this.CreateTestBox(e5);
i7.style.fontFamily=i2.style.fontFamily;
i7.style.fontSize=i2.style.fontSize;
i7.style.fontWeight=i2.style.fontWeight;
i7.style.fontStyle=i2.style.fontStyle;
i7.innerHTML=i2.innerHTML;
i2.style.width=""+(i7.offsetWidth+2)+"px";
var aa1=Math.max(10,(j0-parseInt(i2.style.width))/2);
var f8=Math.max(10,(j8-parseInt(i2.style.height))/2);
if (e5.style.position!="absolute"&&e5.style.position!="relative"){
aa1+=e5.offsetLeft;
f8+=e5.offsetTop;
}
i2.style.top=""+f8+"px";
i2.style.left=""+aa1+"px";
i2.style.display="block";
}
this.CloseWaitMsg=function (e5){
var i2=document.getElementById(e5.id+"_waitmsg");
if (i2==null)return ;
i2.style.display="none";
this.Focus(e5);
}
this.MouseDown=function (event){
if (window.fpPostOn!=null)return ;
event=this.GetEvent(event);
var n8=this.GetTarget(event);
var e5=this.GetSpread(n8,true);
e5.mouseY=event.clientY;
var ac5=this.GetPageActiveSpread();
if (this.GetViewport(e5)==null)return ;
if (e5!=null&&n8.parentNode!=null&&n8.parentNode.getAttribute("name")==e5.id+"_slideBar"){
if (this.IsChild(n8,this.GetPager1(e5)))
this.activePager=this.GetPager1(e5);
else if (this.IsChild(n8,this.GetPager2(e5)))
this.activePager=this.GetPager2(e5);
if (this.activePager!=null){
var o1=true;
if (this.editing)o1=this.EndEdit(e5);
if (o1){
this.UpdatePostbackData(e5);
this.dragSlideBar=true;
}
}
return this.CancelDefault(event);
}
if (this.GetOperationMode(e5)=="ReadOnly")return ;
var j9=false;
if (e5!=null)j9=this.IsXHTML(e5);
if (this.editing&&e5.getAttribute("mcctCellType")!="true"){
var f8=this.GetCell(n8);
if (f8!=e5.d2){
var o1=this.EndEdit();
if (!o1)return ;
}else 
return ;
}
if (n8==this.GetParent(this.GetViewport(e5))){
if (this.GetTopSpread(ac5)!=e5){
this.SetActiveSpread(event);
}
return ;
}
var ac6=(ac5==e5);
this.SetActiveSpread(event);
ac5=this.GetPageActiveSpread();
if (this.HitCommandBar(n8))return ;
if (event.button==2)return ;
if (this.IsChild(n8,this.GetGroupBar(e5))){
var h5=parseInt(n8.id.replace(e5.id+"_group",""));
if (!isNaN(h5)){
this.dragCol=h5;
this.dragViewCol=this.GetColByKey(e5,h5);
var v7=this.GetMovingCol(e5);
v7.innerHTML=n8.innerHTML;
v7.style.width=""+Math.max(this.GetPreferredCellWidth(e5,n8),80)+"px";
if (e5.getAttribute("DragColumnCssClass")==null)
v7.style.backgroundColor=n8.style.backgroundColor;
v7.style.top="-50px";
v7.style.left="-100px";
this.working=true;
e5.dragFromGroupbar=true;
this.CancelDefault(event);
return ;
}
}
this.b5=this.GetSizeColumn(e5,n8,event);
if (this.b5!=null){
this.working=true;
this.b7=this.b8=event.clientX;
if (this.b5.style!=null)this.b5.style.cursor=this.GetResizeCursor(false);
this.b9=n8;
}else {
this.b6=this.GetSizeRow(e5,n8,event);
if (this.b6!=null){
this.working=true;
this.b7=this.b8=event.clientY;
this.b6.style.cursor=this.GetResizeCursor(true);
this.b9=n8;
}else {
var ac7=this.GetCell(n8,null,event);
if (ac7==null){
var c5=this.GetCorner(e5);
if (c5!=null&&this.IsChild(n8,c5)){
if (this.GetOperationMode(e5)=="Normal")
this.SelectTable(e5,true);
}
return ;
}
var ac8=this.GetColFromCell(e5,ac7);
if (ac7.parentNode.getAttribute("FpSpread")=="ch"&&this.GetColFromCell(e5,ac7)>=this.GetColCount(e5))return ;
if (ac7.parentNode.getAttribute("FpSpread")=="rh"&&this.IsChildSpreadRow(e5,this.GetViewport(e5),ac7.parentNode.rowIndex))return ;
if (ac7.parentNode.getAttribute("FpSpread")=="ch"&&(this.GetOperationMode(e5)=="RowMode"||this.GetOperationMode(e5)=="SingleSelect"||this.GetOperationMode(e5)=="ExtendedSelect")){
if (!e5.allowColMove&&!e5.allowGroup)
return ;
}else {
var n9=this.FireActiveCellChangingEvent(e5,this.GetRowFromCell(e5,ac7),this.GetColFromCell(e5,ac7),ac7.parentNode.getAttribute("row"));
if (n9)return ;
var v0=this.GetOperationMode(e5);
var e8=this.GetTopSpread(e5);
if (!event.ctrlKey||e5.getAttribute("multiRange")!="true"){
if (v0!="MultiSelect"){
if (!(
(e5.allowColMove||e5.allowGroup)&&ac7.parentNode.getAttribute("FpSpread")=="ch"&&
v0=="Normal"&&(e5.getAttribute("SelectionPolicy")=="Range"||e5.getAttribute("SelectionPolicy")=="MultiRange")&&
e5.selectedCols.length!=0&&this.IsColSelected(e5,ac8)
))
this.ClearSelection(e5);
}
}else {
if (v0!="ExtendedSelect"&&v0!="MultiSelect"){
if (e5.d2!=null)this.PaintSelectedCell(e5,e5.d2,true);
}
}
}
e5.d2=ac7;
var h3=e5.d2;
var x3=this.GetParent(this.GetViewport(e5));
if (x3!=null&&!this.IsControl(n8)&&(n8!=null&&n8.tagName!="scrollbar")){
if (this.IsChild(h3,x3)&&h3.offsetLeft+h3.offsetWidth>x3.scrollLeft+x3.clientWidth){
x3.scrollLeft=h3.offsetLeft+h3.offsetWidth-x3.clientWidth;
}
if (this.IsChild(h3,x3)&&h3.offsetTop+h3.offsetHeight>x3.scrollTop+x3.clientHeight&&h3.offsetHeight<x3.clientHeight){
x3.scrollTop=h3.offsetTop+h3.offsetHeight-x3.clientHeight;
}
if (h3.offsetTop<x3.scrollTop){
x3.scrollTop=h3.offsetTop;
}
if (h3.offsetLeft<x3.scrollLeft){
x3.scrollLeft=h3.offsetLeft;
}
this.ScrollView(e5);
}
if (ac7.parentNode.getAttribute("FpSpread")!="ch")this.SetActiveRow(e5,this.GetRowKeyFromCell(e5,e5.d2));
if (ac7.parentNode.getAttribute("FpSpread")=="rh")
this.SetActiveCol(e5,0);
else {
this.SetActiveCol(e5,this.GetColKeyFromCell(e5,e5.d2));
}
var v0=this.GetOperationMode(e5);
if (e5.d2.parentNode.getAttribute("FpSpread")=="r"){
if (v0=="ExtendedSelect"||v0=="MultiSelect"){
var ac9=this.IsRowSelected(e5,this.GetRowFromCell(e5,e5.d2));
if (ac9)
this.SelectRow(e5,this.GetRowFromCell(e5,e5.d2),1,false,true);
else 
this.SelectRow(e5,this.GetRowFromCell(e5,e5.d2),1,true,true);
}
else if (v0=="RowMode"||v0=="SingleSelect")
this.SelectRow(e5,this.GetRowFromCell(e5,e5.d2),1,true,true);
else {
this.SelectRange(e5,this.GetRowFromCell(e5,e5.d2),this.GetColFromCell(e5,e5.d2),1,1,true);
}
e5.d6=this.GetRowFromCell(e5,e5.d2);
e5.d7=this.GetColFromCell(e5,e5.d2);
}else if (e5.d2.parentNode.getAttribute("FpSpread")=="ch"){
if (n8.tagName=="INPUT"||n8.tagName=="TEXTAREA"||n8.tagName=="SELECT")
return ;
var r8=this.GetColFromCell(e5,e5.d2);
if (e5.allowColMove||e5.allowGroup)
{
if (v0=="Normal"&&(e5.getAttribute("SelectionPolicy")=="Range"||e5.getAttribute("SelectionPolicy")=="MultiRange")){
if (this.IsColSelected(e5,r8)){
this.InitMovingCol(e5,r8);
}else 
this.SelectColumn(e5,r8,1,true);
}
}else {
if (v0=="Normal"||v0=="ReadOnly"){
this.SelectColumn(e5,r8,1,true);
}
else 
return ;
}
}else if (e5.d2.parentNode.getAttribute("FpSpread")=="rh"){
if (n8.tagName=="INPUT"||n8.tagName=="TEXTAREA"||n8.tagName=="SELECT")
return ;
if (v0=="ExtendedSelect"||v0=="MultiSelect"){
if (this.IsRowSelected(e5,this.GetRowFromCell(e5,e5.d2)))
this.SelectRow(e5,this.GetRowFromCell(e5,e5.d2),1,false,true);
else 
this.SelectRow(e5,this.GetRowFromCell(e5,e5.d2),1,true,true);
}else {
this.SelectRow(e5,this.GetRowFromCell(e5,e5.d2),1,true);
}
}
if (e5.d2!=null){
var g1=this.CreateEvent("ActiveCellChanged");
g1.cmdID=e5.id;
g1.Row=g1.row=this.GetSheetIndex(e5,this.GetRowFromCell(e5,e5.d2));
g1.Col=g1.col=this.GetColFromCell(e5,e5.d2);
if (e5.getAttribute("LayoutMode"))
g1.InnerRow=g1.innerRow=e5.d2.parentNode.getAttribute("row");
this.FireEvent(e5,g1);
}
e5.d3=e5.d2;
if (e5.d2!=null){
e5.d4=this.GetRowFromCell(e5,e5.d2);
e5.d5=this.GetColFromCell(e5,e5.d2);
}
this.b9=n8;
this.working=true;
}
}
this.EnableButtons(e5);
if (!this.editing&&this.b6==null&&this.b5==null){
if (e5.d2!=null&&this.IsChild(e5.d2,e5)&&!this.IsHeaderCell(this.GetCell(n8))){
var i3=this.GetEditor(e5.d2);
if (i3!=null){
if (i3.type=="submit")this.SaveData(e5);
this.editing=(i3.type!="button"&&i3.type!="submit");
this.a9=i3;
this.b0=this.GetEditorValue(i3);
i3.focus();
}
}
}
if (!this.IsControl(n8)){
if (e5!=null)this.UpdatePostbackData(e5);
return this.CancelDefault(event);
}
}
this.GetMovingCol=function (e5){
var v7=document.getElementById(e5.id+"movingCol");
if (v7==null){
v7=document.createElement("DIV");
v7.style.display="none";
v7.style.position="absolute";
v7.style.top="0px";
v7.style.left="0px";
v7.id=e5.id+"movingCol";
v7.align="center";
e5.insertBefore(v7,null);
if (e5.getAttribute("DragColumnCssClass")!=null)
v7.className=e5.getAttribute("DragColumnCssClass");
else 
v7.style.border="1px solid black";
v7.style.MozOpacity=0.50;
}
return v7;
}
this.IsControl=function (f8){
return (f8!=null&&(f8.tagName=="INPUT"||f8.tagName=="TEXTAREA"||f8.tagName=="SELECT"||f8.tagName=="OPTION"));
}
this.EnableButtons=function (e5){
var r3=this.GetCellType(e5.d2);
var m9=this.GetSelection(e5);
var n0=m9.lastChild;
var s6=e5.getAttribute("OperationMode");
var ad0=s6=="ReadOnly"||s6=="SingleSelect"||r3=="readonly";
if (!ad0){
ad0=this.AnyReadOnlyCell(e5,n0);
}
if (ad0){
var f7=this.GetCmdBtn(e5,"Copy");
this.UpdateCmdBtnState(f7,n0==null);
var f4=this.c0;
f7=this.GetCmdBtn(e5,"Paste");
this.UpdateCmdBtnState(f7,(n0==null||f4==null));
f7=this.GetCmdBtn(e5,"Clear");
this.UpdateCmdBtnState(f7,true);
}else {
var f7=this.GetCmdBtn(e5,"Copy");
this.UpdateCmdBtnState(f7,n0==null);
var f4=this.c0;
f7=this.GetCmdBtn(e5,"Paste");
this.UpdateCmdBtnState(f7,(n0==null||f4==null));
f7=this.GetCmdBtn(e5,"Clear");
this.UpdateCmdBtnState(f7,n0==null);
}
}
this.CellClicked=function (h3){
var e5=this.GetSpread(h3);
if (e5!=null){
this.SaveData(e5);
}
}
this.UpdateCmdBtnState=function (f7,disabled){
if (f7==null)return ;
if (f7.tagName=="INPUT"){
var f8=f7.disabled;
if (f8==disabled)return ;
f7.disabled=disabled;
}else {
var f8=f7.getAttribute("disabled");
if (f8==disabled)return ;
f7.setAttribute("disabled",disabled);
}
if (f7.tagName=="IMG"){
var ad1=f7.getAttribute("disabledImg");
if (disabled&&ad1!=null&&ad1!=""){
if (f7.src.indexOf(ad1)<0)f7.src=ad1;
}else {
var ad2=f7.getAttribute("enabledImg");
if (f7.src.indexOf(ad2)<0)f7.src=ad2;
}
}
}
this.MouseUp=function (event){
if (window.fpPostOn!=null)return ;
event=this.GetEvent(event);
var n8=this.GetTarget(event);
var e5=this.GetSpread(n8,true);
if (e5==null&&!this.working){
return ;
}
if (this.dragSlideBar&&e5!=null)
{
this.dragSlideBar=false;
if (this.activePager!=null){
var ab4=this.MoveSliderBar(e5,event)-1;
this.activePager=null;
this.GotoPage(e5,ab4);
}
return ;
}
if (this.working&&(this.b5!=null||this.b6!=null)){
if (this.b5!=null)
e5=this.GetSpread(this.b5);
else 
e5=this.GetSpread(this.b6);
}
if (e5==null)return ;
if (this.GetViewport(e5)==null)return ;
var s6=this.GetOperationMode(e5);
if (s6=="ReadOnly")return ;
var i2=true;
if (this.working){
this.working=false;
if (this.dragCol!=null&&this.dragCol>=0){
var ad3=(this.IsChild(n8,this.GetGroupBar(e5))||n8==this.GetGroupBar(e5));
if (!ad3&&this.GetGroupBar(e5)!=null){
var ad4=event.clientX;
var ad5=event.clientY;
var p9=e5.offsetLeft;
var u1=e5.offsetTop;
var ad6=this.GetGroupBar(e5).offsetWidth;
var ad7=this.GetGroupBar(e5).offsetHeight;
var p4=window.scrollX;
var p3=window.scrollY;
var k9=document.getElementById(e5.id+"_titleBar");
if (k9)p3-=k9.parentNode.parentNode.offsetHeight;
if (this.GetPager1(e5)!=null)p3-=this.GetPager1(e5).offsetHeight;
ad3=(p9<=p4+ad4&&p4+ad4<=p9+ad6&&u1<=p3+ad5&&p3+ad5<=u1+ad7);
}
if (e5.dragFromGroupbar){
if (ad3){
if (e5.targetCol>0)
this.Regroup(e5,this.dragCol,parseInt((e5.targetCol+1)/2));
else 
this.Regroup(e5,this.dragCol,e5.targetCol);
}else {
this.Ungroup(e5,this.dragCol,e5.targetCol);
}
}else {
if (ad3){
if (e5.allowGroup){
if (e5.targetCol>0)
this.Group(e5,this.dragCol,parseInt((e5.targetCol+1)/2));
else 
this.Group(e5,this.dragCol,e5.targetCol);
}
}else if (e5.allowColMove){
if (e5.targetCol!=null){
var g1=this.CreateEvent("ColumnDragMove");
g1.cancel=false;
g1.col=e5.selectedCols;
this.FireEvent(e5,g1);
if (!g1.cancel){
this.MoveCol(e5,this.dragCol,e5.targetCol);
var g1=this.CreateEvent("ColumnDragMoveCompleted");
g1.col=e5.selectedCols;
this.FireEvent(e5,g1);
}
}
}
}
var v7=this.GetMovingCol(e5);
if (v7!=null)
v7.style.display="none";
this.dragCol=-1;
this.dragViewCol=-1;
var ab5=this.GetPosIndicator(e5);
if (ab5!=null)
ab5.style.display="none";
e5.dragFromGroupbar=false;
e5.targetCol=null;
this.b5=this.b6=null;
}
if (this.b5!=null){
i2=false;
var ac2=event.clientX-this.b7;
var w7=parseInt(this.b5.width);
var ad8=w7;
if (isNaN(w7))w7=0;
w7+=ac2;
if (w7<1)w7=1;
var k4=parseInt(this.b5.getAttribute("index"));
var ad9=this.GetColGroup(this.GetViewport(e5));
if (ad9!=null&&ad9.childNodes.length>0){
ad8=parseInt(ad9.childNodes[k4].width);
}else {
ad8=1;
}
if (this.GetViewport(e5).rules!="rows"){
if (k4==0)ad8+=1;
if (k4==parseInt(this.colCount)-1)ad8-=1;
}
if (w7!=ad8&&event.clientX!=this.b8)
{
this.SetColWidth(e5,k4,w7);
var g1=this.CreateEvent("ColWidthChanged");
g1.col=k4;
g1.width=w7;
this.FireEvent(e5,g1);
}
this.ScrollView(e5);
this.PaintFocusRect(e5);
}else if (this.b6!=null){
i2=false;
var ac2=event.clientY-this.b8;
var ac4=this.b6.offsetHeight+ac2;
if (ac4<1){
ac4=1;
ac2=1-this.b6.offsetHeight;
}
this.b6.cells[0].style.posHeight=this.b6.cells[1].style.posHeight=ac4;
this.b6.style.cursor="auto";
var i4=null;
i4=this.GetViewport(e5);
if (typeof(i4.rows[this.b6.rowIndex])!="undefined"&&
typeof(i4.rows[this.b6.rowIndex].cells[0])!="undefined")
{
i4.rows[this.b6.rowIndex].cells[0].style.height=this.b6.cells[0].style.height;
}
var p8=this.AddRowInfo(e5,this.b6.getAttribute("FpKey"));
if (p8!=null){
if (this.b6.cells[0])
this.SetRowHeight(e5,p8,parseInt(this.b6.cells[0].style.posHeight));
else 
this.SetRowHeight(e5,p8,parseInt(this.b6.style.height));
}
if (this.b7!=event.clientY){
var g1=this.CreateEvent("RowHeightChanged");
g1.row=this.GetRowFromCell(e5,this.b6.cells[0]);
g1.height=this.b6.offsetHeight;
this.FireEvent(e5,g1);
}
var i5=this.GetParentSpread(e5);
if (i5!=null)this.UpdateRowHeight(i5,e5);
var e8=this.GetTopSpread(e5);
this.SizeAll(e8);
this.Refresh(e8);
this.ScrollView(e5);
this.PaintFocusRect(e5);
}else {
}
if (this.b9!=null){
this.b9=null;
}
}
if (i2)i2=!this.IsControl(n8);
if (i2&&this.HitCommandBar(n8))return ;
var ae0=false;
var m9=this.GetSelection(e5);
if (m9!=null){
var n0=m9.firstChild;
var h8=new this.Range();
if (n0!=null){
h8.row=this.GetRowByKey(e5,n0.getAttribute("row"));
h8.col=this.GetColByKey(e5,n0.getAttribute("col"));
h8.rowCount=parseInt(n0.getAttribute("rowcount"));
h8.colCount=parseInt(n0.getAttribute("colcount"));
}
switch (e5.d8){
case "":
var g8=this.GetViewport(e5).rows;
for (var f0=h8.row;f0<h8.row+h8.rowCount&&f0<g8.length;f0++){
if (g8[f0].cells.length>0&&g8[f0].cells[0].firstChild!=null&&g8[f0].cells[0].firstChild.nodeName!="#text"){
if (g8[f0].cells[0].firstChild.getAttribute("FpSpread")=="Spread"){
ae0=true;
break ;
}
}
}
break ;
case "c":
var i4=this.GetViewport(e5);
for (var f0=0;f0<i4.rows.length;f0++){
if (this.IsChildSpreadRow(e5,i4,f0)){
ae0=true;
break ;
}
}
break ;
case "r":
var i4=this.GetViewport(e5);
var v3=h8.rowCount;
for (var f0=h8.row;f0<h8.row+v3&&f0<i4.rows.length;f0++){
if (this.IsChildSpreadRow(e5,i4,f0)){
ae0=true;
break ;
}
}
}
}
if (ae0){
var f7=this.GetCmdBtn(e5,"Copy");
this.UpdateCmdBtnState(f7,true);
f7=this.GetCmdBtn(e5,"Paste");
this.UpdateCmdBtnState(f7,true);
f7=this.GetCmdBtn(e5,"Clear");
this.UpdateCmdBtnState(f7,true);
}
var j9=this.IsXHTML(e5);
if (j9){
var e8=this.GetTopSpread(e5);
var f9=document.getElementById(e8.id+"_textBox");
if (f9!=null){
f9.style.top=event.clientY-e5.offsetTop;
f9.style.left=event.clientX-e5.offsetLeft;
}
}
if (i2)this.Focus(e5);
}
this.UpdateRowHeight=function (i5,child){
var m0=child.parentNode;
while (m0!=null){
if (m0.tagName=="TR")break ;
m0=m0.parentNode;
}
var j9=this.IsXHTML(i5);
if (m0!=null){
var e9=m0.rowIndex;
if (this.GetRowHeader(i5)!=null){
var p6=0;
if (this.GetColHeader(child)!=null)p6=this.GetColHeader(child).offsetHeight;
if (this.GetRowHeader(child)!=null)p6+=this.GetRowHeader(child).offsetHeight;
if (!j9)p6-=this.GetViewport(i5).cellSpacing;
if (this.GetViewport(i5).cellSpacing==0){
this.GetRowHeader(i5).rows[e9].cells[0].style.posHeight=p6;
if (this.GetParentSpread(i5)!=null){
this.GetRowHeader(i5).parentNode.style.posHeight=this.GetRowHeader(i5).offsetHeight;
}
}
else 
this.GetRowHeader(i5).rows[e9].cells[0].style.posHeight=(p6+2);
this.GetViewport(i5).rows[e9].cells[0].style.posHeight=p6;
if (!j9)p6-=1;
child.style.posHeight=p6;
}
}
var ae1=this.GetParentSpread(i5);
if (ae1!=null)
this.UpdateRowHeight(ae1,i5);
}
this.MouseOut=function (){
if (!this.working&&this.b5!=null&&this.b5.style!=null)this.b5.style.cursor="auto";
}
this.KeyDown=function (e5,event){
if (window.fpPostOn!=null)return ;
if (!e5.ProcessKeyMap(event))return ;
if (event.keyCode==this.space&&e5.d2!=null){
var v0=this.GetOperationMode(e5);
if (v0=="MultiSelect"){
if (this.IsRowSelected(e5,this.GetRowFromCell(e5,e5.d2)))
this.SelectRow(e5,this.GetRowFromCell(e5,e5.d2),1,false,true);
else 
this.SelectRow(e5,this.GetRowFromCell(e5,e5.d2),1,true,true);
return ;
}
}
var i3=false;
if (this.editing&&this.a9!=null){
var ae2=this.GetEditor(this.a9);
i3=(ae2!=null);
}
if (event.keyCode!=this.enter&&event.keyCode!=this.tab&&(this.editing&&!i3)&&this.a9.tagName=="SELECT")return ;
switch (event.keyCode){
case this.left:
case this.right:
if (i3){
var ae3=this.a9.getAttribute("FpEditor");
if (this.editing&&ae3=="ExtenderEditor"){
var ae4=FpExtender.Util.getEditor(this.a9);
if (ae4&&ae4.type!="text")this.EndEdit();
}
if (ae3!="RadioButton"&&ae3!="ExtenderEditor")this.EndEdit();
}
if (!this.editing){
this.NextCell(e5,event,event.keyCode);
}
break ;
case this.up:
case this.down:
case this.enter:
if (this.a9!=null&&this.a9.tagName=="TEXTAREA")return ;
if (i3&&this.editing&&this.a9.getAttribute("FpEditor")=="ExtenderEditor"){
var ae5=this.a9.getAttribute("Extenders");
if (ae5&&ae5.indexOf("AutoCompleteExtender")!=-1)return ;
}
if (event.keyCode==event.DOM_VK_RETURN)this.CancelDefault(event);
if (this.editing){
var o1=this.EndEdit();
if (!o1)return ;
}
this.NextCell(e5,event,event.keyCode);
var e8=this.GetTopSpread(e5);
var f9=document.getElementById(e8.id+"_textBox");
if (this.enter==event.keyCode)f9.focus();
break ;
case this.tab:
if (this.editing){
var o1=this.EndEdit();
if (!o1)return ;
}
var o0=this.GetProcessTab(e5);
var ae6=(o0=="true"||o0=="True");
if (ae6)this.NextCell(e5,event,event.keyCode);
break ;
case this.shift:
break ;
case this.home:
case this.end:
case this.pup:
case this.pdn:
this.CancelDefault(event);
if (!this.editing){
this.NextCell(e5,event,event.keyCode);
}
break ;
default :
if (event.keyCode==67&&event.ctrlKey&&(!this.editing||i3))this.Copy(e5);
else if (event.keyCode==86&&event.ctrlKey&&(!this.editing||i3))this.Paste(e5);
else if (event.keyCode==88&&event.ctrlKey&&(!this.editing||i3))this.Clear(e5);
else if (!this.editing&&e5.d2!=null&&!this.IsHeaderCell(e5.d2)&&!event.ctrlKey&&!event.altKey){
this.StartEdit(e5,e5.d2);
}
break ;
}
}
this.GetProcessTab=function (e5){
var e8=this.GetTopSpread(e5);
return e8.getAttribute("ProcessTab");
}
this.ExpandRow=function (e5,i6){
var s4=e5.getAttribute("name");
var y6=(e5.getAttribute("ajax")!="false");
if (y6)
this.SyncData(s4,"ExpandView,"+i6,e5);
else 
__doPostBack(s4,"ExpandView,"+i6);
}
this.SortColumn=function (e5,column){
var s4=e5.getAttribute("name");
var y6=(e5.getAttribute("ajax")!="false");
if (y6)
this.SyncData(s4,"SortColumn,"+column,e5);
else 
__doPostBack(s4,"SortColumn,"+column);
}
this.Filter=function (event,e5){
var n8=this.GetTarget(event);
var f8=n8.value;
if (n8.tagName=="SELECT"){
var y5=new RegExp("\\s*");
var ae7=new RegExp("\\S*");
var s7=n8[n8.selectedIndex].text;
var ae8="";
var f0=0;
var e9=f8.length;
while (e9>0){
var h4=f8.match(y5);
if (h4!=null){
ae8+=h4[0];
f0=h4[0].length;
e9-=f0;
f8=f8.substring(f0);
h4=f8.match(ae7);
if (h4!=null){
f0=h4[0].length;
e9-=f0;
f8=f8.substring(f0);
}
}else {
break ;
}
h4=s7.match(ae7);
if (h4!=null){
ae8+=h4[0];
f0=h4[0].length;
s7=s7.substring(f0);
h4=s7.match(y5);
if (h4!=null){
f0=h4[0].length;
s7=s7.substring(f0);
}
}else {
break ;
}
}
f8=ae8;
}
var y6=(e5.getAttribute("ajax")!="false");
if (y6)
this.SyncData(n8.name,f8,e5);
else 
__doPostBack(n8.name,f8);
}
this.MoveCol=function (e5,from,to){
var s4=e5.getAttribute("name");
if (e5.selectedCols&&e5.selectedCols.length>0){
var ae9=[];
for (var f0=0;f0<e5.selectedCols.length;f0++)
ae9[f0]=this.GetSheetColIndex(e5,e5.selectedCols[f0]);
var af0=ae9.join("+");
this.MoveMultiCol(e5,af0,to);
return ;
}
var y6=(e5.getAttribute("ajax")!="false");
if (y6)
this.SyncData(s4,"MoveCol,"+from+","+to,e5);
else 
__doPostBack(s4,"MoveCol,"+from+","+to);
}
this.MoveMultiCol=function (e5,af0,to){
var s4=e5.getAttribute("name");
var y6=(e5.getAttribute("ajax")!="false");
if (y6)
this.SyncData(s4,"MoveCol,"+af0+","+to,e5);
else 
__doPostBack(s4,"MoveCol,"+af0+","+to);
}
this.Group=function (e5,m8,toCol){
var s4=e5.getAttribute("name");
if (e5.selectedCols&&e5.selectedCols.length>0){
var ae9=[];
for (var f0=0;f0<e5.selectedCols.length;f0++)
ae9[f0]=this.GetSheetColIndex(e5,e5.selectedCols[f0]);
var af0=ae9.join("+");
this.GroupMultiCol(e5,af0,toCol);
e5.selectedCols=[];
return ;
}
var y6=(e5.getAttribute("ajax")!="false");
if (y6)
this.SyncData(s4,"Group,"+m8+","+toCol,e5);
else 
__doPostBack(s4,"Group,"+m8+","+toCol);
}
this.GroupMultiCol=function (e5,af0,toCol){
var s4=e5.getAttribute("name");
var y6=(e5.getAttribute("ajax")!="false");
if (y6)
this.SyncData(s4,"Group,"+af0+","+toCol,e5);
else 
__doPostBack(s4,"Group,"+af0+","+toCol);
}
this.Ungroup=function (e5,m8,toCol){
var s4=e5.getAttribute("name");
var y6=(e5.getAttribute("ajax")!="false");
if (y6)
this.SyncData(s4,"Ungroup,"+m8+","+toCol,e5);
else 
__doPostBack(s4,"Ungroup,"+m8+","+toCol);
}
this.Regroup=function (e5,fromCol,toCol){
var s4=e5.getAttribute("name");
var y6=(e5.getAttribute("ajax")!="false");
if (y6)
this.SyncData(s4,"Regroup,"+fromCol+","+toCol,e5);
else 
__doPostBack(s4,"Regroup,"+fromCol+","+toCol);
}
this.ProcessData=function (){
try {
var af1=this;
af1.removeEventListener("load",the_fpSpread.ProcessData,false);
var n8=window.srcfpspread;
n8=n8.split(":").join("_");
var af2=window.fpcommand;
var af3=document;
var af4=af3.getElementById(n8+"_buff");
if (af4==null){
af4=af3.createElement("iframe");
af4.id=n8+"_buff";
af4.style.display="none";
af3.body.appendChild(af4);
}
var e5=af3.getElementById(n8);
the_fpSpread.CloseWaitMsg(e5);
if (af4==null)return ;
var af5=af1.responseText;
af4.contentWindow.document.body.innerHTML=af5;
var o0=af4.contentWindow.document.getElementById(n8+"_values");
if (o0!=null){
var s3=o0.getElementsByTagName("data")[0];
var n0=s3.firstChild;
the_fpSpread.error=false;
while (n0!=null){
var h0=the_fpSpread.GetRowByKey(e5,n0.getAttribute("r"));
var h2=the_fpSpread.GetColByKey(e5,n0.getAttribute("c"));
var y8=the_fpSpread.GetValue(e5,h0,h2);
if (n0.innerHTML!=y8){
var i2=the_fpSpread.GetFormula(e5,h0,h2);
var i9=the_fpSpread.GetCellByRowCol(e5,h0,h2);
the_fpSpread.SetCellValueFromView(i9,n0.innerHTML,true);
i9.setAttribute("FpFormula",i2);
}
n0=n0.nextSibling;
}
the_fpSpread.ClearCellData(e5);
}else {
the_fpSpread.UpdateSpread(af3,af4,n8,af5,af2);
}
var y7=af3.getElementsByTagName("FORM");
y7[0].__EVENTTARGET.value="";
y7[0].__EVENTARGUMENT.value="";
var y8=af3.getElementsByName("__VIEWSTATE")[0];
var f8=af4.contentWindow.document.getElementsByName("__VIEWSTATE")[0];
if (y8!=null&&f8!=null)y8.value=f8.value;
y8=af3.getElementsByName("__EVENTVALIDATION");
f8=af4.contentWindow.document.getElementsByName("__EVENTVALIDATION");
if (y8!=null&&f8!=null&&y8.length>0&&f8.length>0)
y8[0].value=f8[0].value;
af4.contentWindow.document.location="about:blank";
window.fpPostOn=null;
d9=null;
}catch (g1){
window.fpPostOn=null;
d9=null;
}
var e5=the_fpSpread.GetTopSpread(af3.getElementById(n8));
var g1=the_fpSpread.CreateEvent("CallBackStopped");
g1.command=af2;
the_fpSpread.FireEvent(e5,g1);
};
this.UpdateSpread=function (af3,af4,n8,af5,af2){
var e5=the_fpSpread.GetTopSpread(af3.getElementById(n8));
var r4=af4.contentWindow.document.getElementById(e5.id);
if (r4!=null){
if (typeof(Sys)!='undefined'){
FarPoint.System.ExtenderHelper.saveLoadedExtenderScripts(e5);
}
the_fpSpread.error=(r4.getAttribute("error")=="true");
e5.LoadState=null;
if (af2=="LoadOnDemand"&&!the_fpSpread.error){
var af6=this.GetElementById(e5,e5.id+"_data");
var af7=this.GetElementById(r4,e5.id+"_data");
if (af6!=null&&af7!=null)af6.setAttribute("data",af7.getAttribute("data"));
var af8=r4.getElementsByTagName("style");
if (af8!=null){
for (var f0=0;f0<af8.length;f0++){
if (af8[f0]!=null&&af8[f0].innerHTML!=null&&af8[f0].innerHTML.indexOf(e5.id+"msgStyle")<0)
e5.appendChild(af8[f0].cloneNode(true));
}
}
var af9=this.GetElementById(e5,e5.id+"_LoadInfo");
var ag0=this.GetElementById(r4,e5.id+"_LoadInfo");
if (af9!=null&&ag0!=null)af9.value=ag0.value;
var ag1=false;
var ag2=this.GetElementById(r4,e5.id+"_rowHeader");
if (ag2!=null){
ag2=ag2.firstChild;
ag1=(ag2.rows.length>1);
var j5=this.GetRowHeader(e5);
this.LoadRows(j5,ag2,true);
}
var ag3=this.GetElementById(r4,e5.id+"_viewport");
if (ag3!=null){
ag1=(ag3.rows.length>0);
var e6=this.GetViewport(e5);
this.LoadRows(e6,ag3,false);
}
var ag4=e5.d4;
var ag5=e5.d5;
var n2=e5.d8;
the_fpSpread.Init(e5,af2);
the_fpSpread.LoadScrollbarState(e5);
the_fpSpread.Focus(e5);
e5.d4=ag4;
e5.d5=ag5;
e5.d8=n2;
if (ag1)
e5.LoadState=null;
else 
e5.LoadState="complete";
if (typeof(Sys)!='undefined'){
FarPoint.System.ExtenderHelper.loadExtenderScripts(e5,af4.contentWindow.document);
}
}else {
e5.innerHTML=r4.innerHTML;
the_fpSpread.CopySpreadAttrs(r4,e5);
if (typeof(Sys)!='undefined'){
FarPoint.System.ExtenderHelper.loadExtenderScripts(e5,af4.contentWindow.document);
}
var ag6=af4.contentWindow.document.getElementById(e5.id+"_initScript");
eval(ag6.value);
for (var f0=0;f0<af4.contentWindow.document.styleSheets.length;f0++){
for (var i0=0;i0<af4.contentWindow.document.styleSheets[f0].rules.length;i0++){
var ag7=af4.contentWindow.document.styleSheets[f0].rules[i0];
var ag8={styleSheetIndex:-1,ruleIndex:-1};
for (var ag9=0;ag9<af3.styleSheets.length;ag9++){
for (var ah0=0;ah0<af3.styleSheets[ag9].rules.length;ah0++){
if (af3.styleSheets[ag9].rules[ah0].selectorText==ag7.selectorText){
ag8.styleSheetIndex=ag9;
ag8.ruleIndex=ah0;
}
}
}
if (ag8.styleSheetIndex>-1&&ag8.ruleIndex>-1)
af3.styleSheets[ag8.styleSheetIndex].deleteRule(ag8.ruleIndex);
af3.styleSheets[0].addRule(ag7.selectorText,ag7.style.cssText);
}
}
}
}else {
the_fpSpread.error=true;
}
}
this.LoadRows=function (e6,ag3,isHeader){
if (e6==null||ag3==null)return ;
var ah1=e6.tBodies[0];
var v3=ag3.rows.length;
var ah2=null;
if (isHeader){
v3--;
if (ah1.rows.length>0)ah2=ah1.rows[ah1.rows.length-1];
}
for (var f0=0;f0<v3;f0++){
var ah3=ag3.rows[f0].cloneNode(false);
ah1.insertBefore(ah3,ah2);
ah3.innerHTML=ag3.rows[f0].innerHTML;
}
if (!isHeader){
for (var f0=0;f0<ag3.parentNode.childNodes.length;f0++){
var y2=ag3.parentNode.childNodes[f0];
if (y2!=ag3){
e6.parentNode.insertBefore(y2.cloneNode(true),null);
}
}
}
}
this.CopySpreadAttr=function (aa3,dest,attrName){
var ah4=aa3.getAttribute(attrName);
var ah5=dest.getAttribute(attrName);
if (ah4!=null||ah5!=null){
if (ah4==null)
dest.removeAttribute(attrName);
else 
dest.setAttribute(attrName,ah4);
}
}
this.CopySpreadAttrs=function (aa3,dest){
this.CopySpreadAttr(aa3,dest,"totalRowCount");
this.CopySpreadAttr(aa3,dest,"pageCount");
this.CopySpreadAttr(aa3,dest,"loadOnDemand");
this.CopySpreadAttr(aa3,dest,"allowGroup");
this.CopySpreadAttr(aa3,dest,"colMove");
this.CopySpreadAttr(aa3,dest,"showFocusRect");
this.CopySpreadAttr(aa3,dest,"FocusBorderColor");
this.CopySpreadAttr(aa3,dest,"FocusBorderStyle");
this.CopySpreadAttr(aa3,dest,"FpDefaultEditorID");
this.CopySpreadAttr(aa3,dest,"hierView");
this.CopySpreadAttr(aa3,dest,"IsNewRow");
this.CopySpreadAttr(aa3,dest,"cmdTop");
this.CopySpreadAttr(aa3,dest,"ProcessTab");
this.CopySpreadAttr(aa3,dest,"AcceptFormula");
this.CopySpreadAttr(aa3,dest,"EditMode");
this.CopySpreadAttr(aa3,dest,"AllowInsert");
this.CopySpreadAttr(aa3,dest,"AllowDelete");
this.CopySpreadAttr(aa3,dest,"error");
this.CopySpreadAttr(aa3,dest,"ajax");
this.CopySpreadAttr(aa3,dest,"autoCalc");
this.CopySpreadAttr(aa3,dest,"multiRange");
this.CopySpreadAttr(aa3,dest,"rowFilter");
this.CopySpreadAttr(aa3,dest,"OperationMode");
this.CopySpreadAttr(aa3,dest,"selectedForeColor");
this.CopySpreadAttr(aa3,dest,"selectedBackColor");
this.CopySpreadAttr(aa3,dest,"anchorBackColor");
this.CopySpreadAttr(aa3,dest,"columnHeaderAutoTextIndex");
this.CopySpreadAttr(aa3,dest,"SelectionPolicy");
this.CopySpreadAttr(aa3,dest,"ShowHeaderSelection");
this.CopySpreadAttr(aa3,dest,"EnableRowEditTemplate");
this.CopySpreadAttr(aa3,dest,"scrollContent");
this.CopySpreadAttr(aa3,dest,"scrollContentColumns");
this.CopySpreadAttr(aa3,dest,"scrollContentTime");
this.CopySpreadAttr(aa3,dest,"scrollContentMaxHeight");
dest.tabIndex=aa3.tabIndex;
if (dest.style!=null&&aa3.style!=null){
if (dest.style.width!=aa3.style.width)dest.style.width=aa3.style.width;
if (dest.style.height!=aa3.style.height)dest.style.height=aa3.style.height;
if (dest.style.border!=aa3.style.border)dest.style.border=aa3.style.border;
}
}
this.Clone=function (l8){
var f8=document.createElement(l8.tagName);
f8.id=l8.id;
var h2=l8.firstChild;
while (h2!=null){
var j7=this.Clone(h2);
f8.appendChild(j7);
h2=h2.nextSibling;
}
return f8;
}
this.FireEvent=function (e5,g1){
if (e5==null||g1==null)return ;
var e8=this.GetTopSpread(e5);
if (e8!=null){
g1.spread=e5;
e8.dispatchEvent(g1);
}
}
this.SyncData=function (s4,af2,e5,asyncCallBack){
if (window.fpPostOn!=null){
return ;
}
var g1=this.CreateEvent("CallBackStart");
g1.cancel=false;
g1.command=af2;
if (asyncCallBack==null)asyncCallBack=false;
g1.async=asyncCallBack;
if (e5==null){
var j7=s4.split(":").join("_");
e5=document.getElementById(j7);
}
if (e5!=null){
var e8=this.GetTopSpread(e5);
this.FireEvent(e5,g1);
}
if (g1.cancel){
the_fpSpread.ClearCellData(e5);
return ;
}
if (af2!=null&&(af2.indexOf("SelectView,")==0||af2=="Next"||af2=="Prev"||af2.indexOf("Group,")==0||af2.indexOf("Page,")==0))
e5.LoadState=null;
var ah6=g1.async;
if (ah6){
this.OpenWaitMsg(e5);
}
window.fpPostOn=true;
if (this.error)af2="update";
try {
var y7=document.getElementsByTagName("FORM");
if (y7==null&&y7.length==0)return ;
y7[0].__EVENTTARGET.value=s4;
y7[0].__EVENTARGUMENT.value=encodeURIComponent(af2);
var ah7=y7[0].action;
var f8;
if (ah7.indexOf("?")>-1){
f8="&";
}
else 
{
f8="?";
}
ah7=ah7+f8;
var f4=this.CollectData();
var af5="";
var af1=(window.XMLHttpRequest)?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
if (af1==null)return ;
af1.open("POST",ah7,ah6);
af1.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
if (e5!=null)
window.srcfpspread=e5.id;
else 
window.srcfpspread=s4;
window.fpcommand=af2;
this.AttachEvent(af1,"load",the_fpSpread.ProcessData,false);
af1.send(f4);
}catch (g1){
window.fpPostOn=false;
d9=null;
}
};
this.CollectData=function (){
var y7=document.getElementsByTagName("FORM");
var f8;
var g3="fpcallback=true&";
for (var f0=0;f0<y7[0].elements.length;f0++){
f8=y7[0].elements[f0];
var ah8=f8.tagName.toLowerCase();
if (ah8=="input"){
var ah9=f8.type;
if (ah9=="hidden"||ah9=="text"||ah9=="password"||((ah9=="checkbox"||ah9=="radio")&&f8.checked)){
g3+=(f8.name+"="+encodeURIComponent(f8.value)+"&");
}
}else if (ah8=="select"){
if (f8.childNodes!=null){
for (var i0=0;i0<f8.childNodes.length;i0++){
var p7=f8.childNodes[i0];
if (p7!=null&&p7.tagName!=null&&p7.tagName.toLowerCase()=="option"&&p7.selected){
g3+=(f8.name+"="+encodeURIComponent(p7.value)+"&");
}
}
}
}else if (ah8=="textarea"){
g3+=(f8.name+"="+encodeURIComponent(f8.value)+"&");
}
}
return g3;
};
this.ClearCellData=function (e5){
var f4=this.GetData(e5);
var ai0=f4.getElementsByTagName("root")[0];
var f5=ai0.getElementsByTagName("data")[0];
if (f5==null)return null;
if (e5.d9!=null){
var i6=e5.d9.firstChild;
while (i6!=null){
var h0=i6.getAttribute("key");
var ai1=i6.firstChild;
while (ai1!=null){
var h2=ai1.getAttribute("key");
var ai2=f5.firstChild;
while (ai2!=null){
var h4=ai2.getAttribute("key");
if (h0==h4){
var ai3=false;
var ai4=ai2.firstChild;
while (ai4!=null){
var h5=ai4.getAttribute("key");
if (h2==h5){
ai2.removeChild(ai4);
ai3=true;
break ;
}
ai4=ai4.nextSibling;
}
if (ai3)break ;
}
ai2=ai2.nextSibling;
}
ai1=ai1.nextSibling;
}
i6=i6.nextSibling;
}
}
e5.d9=null;
var f7=this.GetCmdBtn(e5,"Cancel");
if (f7!=null)
this.UpdateCmdBtnState(f7,true);
}
this.StorePostData=function (e5){
var f4=this.GetData(e5);
var f5=f4.getElementsByTagName("root")[0];
var ab2=f5.getElementsByTagName("data")[0];
if (ab2!=null)e5.d9=ab2.cloneNode(true);
}
this.ShowMessage=function (e5,u6,i6,m8,time){
var n1=e5.GetRowCount();
var g9=e5.GetColCount();
if (i6==null||m8==null||i6<0||i6>=n1||m8<0||m8>=g9){
i6=-1;
m8=-1;
}
this.ShowMessageInner(e5,u6,i6,m8,time);
}
this.HideMessage=function (e5,i6,m8){
var n1=e5.GetRowCount();
var g9=e5.GetColCount();
if (i6==null||m8==null||i6<0||i6>=n1||m8<0||m8>=g9)
if (e5.msgList&&e5.msgList.centerMsg&&e5.msgList.centerMsg.msgBox.IsVisible)
e5.msgList.centerMsg.msgBox.Hide();
var ai5=this.GetMsgObj(e5,i6,m8);
if (ai5&&ai5.msgBox.IsVisible){
ai5.msgBox.Hide();
}
}
this.ShowMessageInner=function (e5,u6,i6,m8,time){
var ai5=this.GetMsgObj(e5,i6,m8);
if (ai5){
if (ai5.timer)
ai5.msgBox.Hide();
}
else 
ai5=this.CreateMsgObj(e5,i6,m8);
var ai6=ai5.msgBox;
ai6.Show(e5,this,u6);
if (time&&time>0)
ai5.timer=setTimeout(function (){ai6.Hide();},time);
this.SetMsgObj(e5,ai5);
}
this.GetMsgObj=function (e5,i6,m8){
var ai5;
var ai7=e5.msgList;
if (ai7){
if (i6==-1&&m8==-1)
ai5=ai7.centerMsg;
else if (i6==-2)
ai5=ai7.hScrollMsg;
else if (m8==-2)
ai5=ai7.vScrollMsg;
else {
if (ai7[i6])
ai5=ai7[i6][m8];
}
}
return ai5;
}
this.SetMsgObj=function (e5,ai5){
var ai7=e5.msgList;
if (ai5.row==-1&&ai5.col==-1)
ai7.centerMsg=ai5;
else if (ai5.row==-2)
ai7.hScrollMsg=ai5;
else if (ai5.col==-2)
ai7.vScrollMsg=ai5;
else {
if (!ai7[ai5.row])ai7[ai5.row]=new Array();
ai7[ai5.row][ai5.col]=ai5;
}
}
var ai8=null;
this.CreateMsgObj=function (e5,i6,m8){
var ai6=document.createElement("div");
var ai5={row:i6,col:m8,msgBox:ai6};
var ai9=null;
if (i6!=-2&&m8!=-2){
ai6.style.border="1px solid black";
ai6.style.background="yellow";
ai6.style.color="red";
}
else {
ai6.style.border="1px solid #55678e";
ai6.style.fontSize="small";
ai6.style.background="#E6E9ED";
ai6.style.color="#4c5b7f";
this.GetScrollingContentStyle(e5);
ai9=ai8;
}
if (ai9!=null){
if (ai9.fontFamily!=null)
ai6.style.fontFamily=ai9.fontFamily;
if (ai9.fontSize!=null)
ai6.style.fontSize=ai9.fontSize;
if (ai9.fontStyle!=null)
ai6.style.fontStyle=ai9.fontStyle;
if (ai9.fontVariant!=null)
ai6.style.fontVariant=ai9.fontVariant;
if (ai9.fontWeight!=null)
ai6.style.fontWeight=ai9.fontWeight;
if (ai9.backgroundColor!=null)
ai6.style.backgroundColor=ai9.backgroundColor;
if (ai9.color!=null)
ai6.style.color=ai9.color;
}
ai6.style.position="absolute";
ai6.style.overflow="hidden";
ai6.style.display="block";
ai6.style.marginLeft=0;
ai6.style.marginTop=2;
ai6.style.marginRight=0;
ai6.style.marginBottom=0;
ai6.msgObj=ai5;
ai6.Show=function (r4,fpObj,u6){
var v5=fpObj.GetMsgPos(r4,this.msgObj.row,this.msgObj.col);
var e7=fpObj.GetCommandBar(r4);
var aj0=fpObj.GetGroupBar(r4);
this.style.visibility="visible";
this.style.display="block";
if (u6){
this.style.left=""+0+"px";
this.style.top=""+0+"px";
this.style.width="auto";
this.innerHTML=u6;
}
var aj1=false;
var aj2=(r4.style.position=="relative"||r4.style.position=="absolute");
var aj3=v5.top;
var aj4=v5.left;
var p7=e5.offsetParent;
while ((p7.tagName=="TD"||p7.tagName=="TR"||p7.tagName=="TBODY"||p7.tagName=="TABLE")&&p7.style.position!="relative"&&p7.style.position!="absolute")
p7=p7.offsetParent;
if (this.msgObj.row>=0&&this.msgObj.col>=0){
if (!aj2&&aj1&&p7){
var aj5=fpObj.GetLocation(r4);
var aj6=fpObj.GetLocation(p7);
aj3+=aj5.y-aj6.y;
aj4+=aj5.x-aj6.x;
if (p7.tagName!="BODY"){
aj3-=fpObj.GetBorderWidth(p7,0);
aj4-=fpObj.GetBorderWidth(p7,3);
}
}
var aj7=fpObj.GetViewPortByRowCol(r4,this.msgObj.row,this.msgObj.col);
if (!this.parentNode&&aj7&&aj7.parentNode)aj7.parentNode.insertBefore(ai6,null);
var j0=this.offsetWidth;
this.style.left=""+aj4+"px";
if (!aj1&&aj7&&aj7.parentNode&&aj4+j0>aj7.offsetWidth)
this.style.width=""+(v5.a5-2)+"px";
else if (parseInt(this.style.width)!=j0)
this.style.width=""+j0+"px";
if (!aj1&&aj7!=null&&aj3>=aj7.offsetHeight-2)aj3-=v5.a4+this.offsetHeight+3;
this.style.top=""+aj3+"px";
}
else {
if (!aj2&&p7){
var aj5=fpObj.GetLocation(r4);
var aj6=fpObj.GetLocation(p7);
aj3+=aj5.y-aj6.y;
aj4+=aj5.x-aj6.x;
if (p7.tagName!="BODY"){
aj3-=fpObj.GetBorderWidth(p7,0);
aj4-=fpObj.GetBorderWidth(p7,3);
}
}
var aj8=20;
if (!this.parentNode)r4.insertBefore(ai6,null);
if (this.offsetWidth+aj8<r4.offsetWidth)
aj4+=(r4.offsetWidth-this.offsetWidth-aj8)/(this.msgObj.row==-2?1:2);
else 
this.style.width=""+(r4.offsetWidth-aj8)+"px";
if (this.offsetHeight<r4.offsetHeight)
aj3+=(r4.offsetHeight-this.offsetHeight)/(this.msgObj.col==-2?1:2);
if (this.msgObj.col==-2){
var aj9=fpObj.GetColFooter(r4);
if (aj9)aj3-=aj9.offsetHeight;
var e7=fpObj.GetCommandBar(r4);
if (e7)aj3-=e7.offsetHeight;
aj3-=aj8;
}
this.style.top=""+aj3+"px";
this.style.left=""+aj4+"px";
}
this.IsVisible=true;
};
ai6.Hide=function (){
this.style.visibility="hidden";
this.style.display="none";
this.IsVisible=false;
if (this.msgObj.timer){
clearTimeout(this.msgObj.timer);
this.msgObj.timer=null;
}
this.innerHTML="";
};
return ai5;
}
this.GetLocation=function (ele){
if ((ele.window&&ele.window===ele)||ele.nodeType===9)return {x:0,y:0};
var ak0=0;
var ak1=0;
var ak2=null;
var ak3=null;
var ak4=null;
for (var i5=ele;i5;ak2=i5,ak3=ak4,i5=i5.offsetParent){
var ah8=i5.tagName;
ak4=this.GetCurrentStyle2(i5);
if ((i5.offsetLeft||i5.offsetTop)&&
!((ah8==="BODY")&&
(!ak3||ak3.position!="absolute"))){
ak0+=i5.offsetLeft;
ak1+=i5.offsetTop;
}
if (ak2!=null&&ak4){
if ((ah8!="TABLE")&&(ah8!="TD")&&(ah8!="HTML")){
ak0+=parseInt(ak4.borderLeftWidth)||0;
ak1+=parseInt(ak4.borderTopWidth)||0;
}
if (ah8==="TABLE"&&
(ak4.position==="relative"||ak4.position==="absolute")){
ak0+=parseInt(ak4.marginLeft)||0;
ak1+=parseInt(ak4.marginTop)||0;
}
}
}
ak4=this.GetCurrentStyle2(ele);
var ak5=ak4?ak4.position:null;
if (!ak5||(ak5!="absolute")){
for (var i5=ele.parentNode;i5;i5=i5.parentNode){
ah8=i5.tagName;
if ((ah8!="BODY")&&(ah8!="HTML")&&(i5.scrollLeft||i5.scrollTop)){
ak0-=(i5.scrollLeft||0);
ak1-=(i5.scrollTop||0);
ak4=this.GetCurrentStyle2(i5);
if (ak4){
ak0+=parseInt(ak4.borderLeftWidth)||0;
ak1+=parseInt(ak4.borderTopWidth)||0;
}
}
}
}
return {x:ak0,y:ak1};
}
var ak6=["borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth"];
var ak7=["borderTopStyle","borderRightStyle","borderBottomStyle","borderLeftStyle"];
var ak8;
this.GetBorderWidth=function (ele,side){
if (!this.GetBorderVisible(ele,side))return 0;
var m6=this.GetCurrentStyle(ele,ak6[side]);
return this.ParseBorderWidth(m6);
}
this.GetBorderVisible=function (ele,side){
return this.GetCurrentStyle(ele,ak7[side])!="none";
}
this.GetWindow=function (ele){
var af3=ele.ownerDocument||ele.document||ele;
return af3.defaultView||af3.parentWindow;
}
this.GetCurrentStyle2=function (ele){
if (ele.nodeType===3)return null;
var j0=this.GetWindow(ele);
if (ele.documentElement)ele=ele.documentElement;
var ak9=(j0&&(ele!=j0))?j0.getComputedStyle(ele,null):ele.style;
return ak9;
}
this.GetCurrentStyle=function (ele,attribute,defaultValue){
var al0=null;
if (ele){
if (ele.currentStyle){
al0=ele.currentStyle[attribute];
}
else if (document.defaultView&&document.defaultView.getComputedStyle){
var al1=document.defaultView.getComputedStyle(ele,null);
if (al1){
al0=al1[attribute];
}
}
if (!al0&&ele.style.getPropertyValue){
al0=ele.style.getPropertyValue(attribute);
}
else if (!al0&&ele.style.getAttribute){
al0=ele.style.getAttribute(attribute);
}
}
if (!al0||al0==""||typeof(al0)==='undefined'){
if (typeof(defaultValue)!='undefined'){
al0=defaultValue;
}
else {
al0=null;
}
}
return al0;
}
this.ParseBorderWidth=function (m6){
if (!ak8){
var al2={};
var al3=document.createElement('div');
al3.style.visibility='hidden';
al3.style.position='absolute';
al3.style.fontSize='1px';
document.body.appendChild(al3)
var al4=document.createElement('div');
al4.style.height='0px';
al4.style.overflow='hidden';
al3.appendChild(al4);
var al5=al3.offsetHeight;
al4.style.borderTop='solid black';
al4.style.borderTopWidth='thin';
al2['thin']=al3.offsetHeight-al5;
al4.style.borderTopWidth='medium';
al2['medium']=al3.offsetHeight-al5;
al4.style.borderTopWidth='thick';
al2['thick']=al3.offsetHeight-al5;
al3.removeChild(al4);
document.body.removeChild(al3);
ak8=al2;
}
if (m6){
switch (m6){
case 'thin':
case 'medium':
case 'thick':
return ak8[m6];
case 'inherit':
return 0;
}
var al6=this.ParseUnit(m6);
if (al6.type!='px')
throw new Error();
return al6.size;
}
return 0;
}
this.ParseUnit=function (m6){
if (!m6)
throw new Error();
m6=this.Trim(m6).toLowerCase();
var aa1=m6.length;
var r4=-1;
for (var f0=0;f0<aa1;f0++){
var y2=m6.substr(f0,1);
if ((y2<'0'||y2>'9')&&y2!='-'&&y2!='.'&&y2!=',')
break ;
r4=f0;
}
if (r4==-1)
throw new Error();
var ah9;
var al7;
if (r4<(aa1-1))
ah9=this.Trim(m6.substring(r4+1));
else 
ah9='px';
al7=parseFloat(m6.substr(0,r4+1));
if (ah9=='px'){
al7=Math.floor(al7);
}
return {size:al7,type:ah9};
}
this.GetViewPortByRowCol=function (e5,i6,m8){
var al8=null;
var f2=null;
var al9=null;
var m6=this.GetViewport(e5);
var h3=this.GetCellByRowCol(e5,i6,m8);
if (m6!=null&&this.IsChild(h3,m6))
return m6;
else if (al9!=null&&this.IsChild(h3,al9))
return al9;
else if (f2!=null&&this.IsChild(h3,f2))
return f2;
else if (al8!=null&&this.IsChild(h3,al8))
return al8;
return ;
}
this.GetMsgPos=function (e5,i6,m8){
if (i6<0||m8<0){
return {left:0,top:0};
}
else {
var al8=null;
var f2=null;
var al9=null;
var m6=this.GetViewport(e5);
var am0=this.GetGroupBar(e5);
var k9=document.getElementById(e5.id+"_titleBar");
var h3=this.GetCellByRowCol(e5,i6,m8);
var f8=h3.offsetTop+h3.offsetHeight;
var aa1=h3.offsetLeft;
if ((al8!=null||f2!=null)&&(this.IsChild(h3,al9)||this.IsChild(h3,m6))){
if (al8!=null)
f8+=al8.offsetHeight;
else 
f8+=f2.offsetHeight;
}
if ((al8!=null||al9!=null)&&(this.IsChild(h3,f2)||this.IsChild(h3,m6))){
if (al8!=null)
aa1+=al8.offsetWidth;
else 
aa1+=al9.offsetWidth;
}
if (m6!=null&&(al8||f2||al9)){
if (k9)f8+=k9.offsetHeight;
if (am0)f8+=am0.offsetHeight;
if (this.GetColHeader(e5))f8+=this.GetColHeader(e5).offsetHeight;
if (this.GetRowHeader(e5))aa1+=this.GetRowHeader(e5).offsetWidth;
}
if (m6!=null&&this.IsChild(h3,m6)){
if (f2)
f8-=m6.parentNode.scrollTop;
if (al9)
aa1-=m6.parentNode.scrollLeft;
}
if (al9!=null&&this.IsChild(h3,al9)){
f8-=al9.parentNode.scrollTop;
}
if (f2!=null&&this.IsChild(h3,f2)){
aa1-=f2.parentNode.scrollLeft;
}
var j8=h3.clientHeight;
var j0=h3.clientWidth;
return {left:aa1,top:f8,a4:j8,a5:j0};
}
}
this.SyncMsgs=function (e5){
if (!e5.msgList)return ;
for (f0 in e5.msgList){
if (e5.msgList[f0].constructor==Array){
for (i0 in e5.msgList[f0]){
if (e5.msgList[f0][i0]&&e5.msgList[f0][i0].msgBox&&e5.msgList[f0][i0].msgBox.IsVisible){
e5.msgList[f0][i0].msgBox.Show(e5,this);
}
}
}
}
}
this.GetCellInfo=function (e5,h0,h2,v5){
var f4=this.GetData(e5);
if (f4==null)return null;
var f5=f4.getElementsByTagName("root")[0];
if (f5==null)return null;
var n2=f5.getElementsByTagName("state")[0];
if (n2==null)return null;
var am1=n2.getElementsByTagName("cellinfo")[0];
if (am1==null)return null;
var f8=am1.firstChild;
while (f8!=null){
if ((f8.getAttribute("r")==""+h0)&&(f8.getAttribute("c")==""+h2)&&(f8.getAttribute("pos")==""+v5))return f8;
f8=f8.nextSibling;
}
return null;
}
this.AddCellInfo=function (e5,h0,h2,v5){
var n0=this.GetCellInfo(e5,h0,h2,parseInt(v5));
if (n0!=null)return n0;
var f4=this.GetData(e5);
var f5=f4.getElementsByTagName("root")[0];
if (f5==null)return null;
var n2=f5.getElementsByTagName("state")[0];
if (n2==null)return null;
var am1=n2.getElementsByTagName("cellinfo")[0];
if (am1==null)return null;
if (document.all!=null){
n0=f4.createNode("element","c","");
}else {
n0=document.createElement("c");
n0.style.display="none";
}
n0.setAttribute("r",h0);
n0.setAttribute("c",h2);
n0.setAttribute("pos",v5);
am1.appendChild(n0);
return n0;
}
this.setCellAttribute=function (e5,h3,attname,u3,noEvent,recalc){
if (h3==null)return ;
var h0=this.GetRowKeyFromCell(e5,h3);
var h2=this.GetColKeyFromCell(e5,h3);
if (typeof(h0)=="undefined")return ;
var v5=-1;
if (this.IsChild(h3,this.GetCorner(e5)))
v5=0;
else if (this.IsChild(h3,this.GetRowHeader(e5)))
v5=1;
else if (this.IsChild(h3,this.GetColHeader(e5)))
v5=2;
else if (this.IsChild(h3,this.GetViewport(e5)))
v5=3;
var r0=this.AddCellInfo(e5,h0,h2,v5);
r0.setAttribute(attname,u3);
if (!noEvent){
var g1=this.CreateEvent("DataChanged");
g1.cell=h3;
g1.cellValue=u3;
g1.row=h0;
g1.col=h2;
this.FireEvent(e5,g1);
}
var f7=this.GetCmdBtn(e5,"Update");
if (f7!=null&&f7.getAttribute("disabled")!=null)
this.UpdateCmdBtnState(f7,false);
f7=this.GetCmdBtn(e5,"Cancel");
if (f7!=null&&f7.getAttribute("disabled")!=null)
this.UpdateCmdBtnState(f7,false);
e5.e3=true;
if (recalc){
this.UpdateValues(e5);
}
}
this.updateCellLocked=function (h3,locked){
if (h3==null)return ;
var f8=h3.getAttribute("FpCellType")=="readonly";
if (f8==locked)return ;
var h2=h3.firstChild;
while (h2!=null){
if (typeof(h2.disabled)!="undefined")h2.disabled=locked;
h2=h2.nextSibling;
}
}
this.Cells=function (e5,h0,h2)
{
var am2=this.GetCellByRowCol(e5,h0,h2);
if (am2){
am2.GetValue=function (){
return the_fpSpread.GetValue(e5,h0,h2);
}
am2.SetValue=function (value){
if (typeof(value)=="undefined")return ;
if (this.parentNode.getAttribute("previewRow")!=null)return ;
the_fpSpread.SetValue(e5,h0,h2,value);
the_fpSpread.SaveClientEditedDataRealTime();
}
am2.GetBackColor=function (){
if (this.getAttribute("bgColorBak")!=null)
return this.getAttribute("bgColorBak");
return document.defaultView.getComputedStyle(this,"").getPropertyValue("background-color");
}
am2.SetBackColor=function (value){
if (typeof(value)=="undefined")return ;
this.bgColor=value;
this.setAttribute("bgColorBak",value);
this.style.backgroundColor=value;
the_fpSpread.setCellAttribute(e5,this,"bc",value);
the_fpSpread.SaveClientEditedDataRealTime();
}
am2.GetForeColor=function (){
return document.defaultView.getComputedStyle(this,"").getPropertyValue("color");
}
am2.SetForeColor=function (value){
if (typeof(value)=="undefined")return ;
this.style.color=value;
the_fpSpread.setCellAttribute(e5,this,"fc",value);
the_fpSpread.SaveClientEditedDataRealTime();
}
am2.GetTabStop=function (){
return this.getAttribute("TabStop")!="false";
}
am2.SetTabStop=function (value){
var am3=new String(value);
if (am3.toLocaleLowerCase()=="false"){
this.setAttribute("TabStop","false");
the_fpSpread.setCellAttribute(e5,this,"ts","false");
the_fpSpread.SaveClientEditedDataRealTime();
}else {
this.removeAttribute("TabStop");
}
}
am2.GetCellType=function (){
var am4=the_fpSpread.GetCellType2(this);
if (am4=="text"||am4=="readonly")
{
am4=this.getAttribute("CellType2");
}
if (am4==null)
am4="GeneralCellType";
return am4;
}
am2.GetHAlign=function (){
var am5=document.defaultView.getComputedStyle(this,"").getPropertyValue("text-Align");
if (am5==""||am5=="undefined"||am5==null)
am5=this.style.textAlign;
if (am5==""||am5=="undefined"||am5==null)
am5=this.getAttribute("align");
if (am5!=null&&am5.indexOf("-webkit")!=-1)am5=am5.replace("-webkit-","");
return am5;
}
am2.SetHAlign=function (value){
if (typeof(value)=="undefined")return ;
this.style.textAlign=typeof(value)=="string"?value:value.Name;
the_fpSpread.setCellAttribute(e5,this,"ha",typeof(value)=="string"?value:value.Name);
the_fpSpread.SaveClientEditedDataRealTime();
}
am2.GetVAlign=function (){
var am6=document.defaultView.getComputedStyle(this,"").getPropertyValue("vertical-Align");
if (am6==""||am6=="undefined"||am6==null)
am6=this.style.verticalAlign;
if (am6==""||am6=="undefined"||am6==null)
am6=this.getAttribute("valign");
return am6;
}
am2.SetVAlign=function (value){
if (typeof(value)=="undefined")return ;
this.style.verticalAlign=typeof(value)=="string"?value:value.Name;
the_fpSpread.setCellAttribute(e5,this,"va",typeof(value)=="string"?value:value.Name);
the_fpSpread.SaveClientEditedDataRealTime();
}
am2.GetLocked=function (){
if (am2.GetCellType()=="ButtonCellType"||am2.GetCellType()=="TagCloudCellType"||am2.GetCellType()=="HyperLinkCellType")
return am2.getAttribute("Locked")=="1";
return the_fpSpread.GetCellType(this)=="readonly";
}
am2.GetFont_Name=function (){
return document.defaultView.getComputedStyle(this,"").getPropertyValue("font-family");
}
am2.SetFont_Name=function (value){
if (typeof(value)=="undefined")return ;
this.style.fontFamily=value;
the_fpSpread.setCellAttribute(e5,this,"fn",value);
the_fpSpread.SaveClientEditedDataRealTime();
}
am2.GetFont_Size=function (){
return document.defaultView.getComputedStyle(this,"").getPropertyValue("font-size");
}
am2.SetFont_Size=function (value){
if (typeof(value)=="undefined")return ;
if (typeof(value)=="number")value+="px";
this.style.fontSize=value;
the_fpSpread.setCellAttribute(e5,this,"fs",value);
the_fpSpread.SizeSpread(e5);
the_fpSpread.SaveClientEditedDataRealTime();
}
am2.GetFont_Bold=function (){
return document.defaultView.getComputedStyle(this,"").getPropertyValue("font-weight")=="bold"?true:false;
}
am2.SetFont_Bold=function (value){
if (typeof(value)=="undefined")return ;
this.style.fontWeight=value==true?"bold":"normal";
the_fpSpread.setCellAttribute(e5,this,"fb",new String(value).toLocaleLowerCase());
the_fpSpread.SaveClientEditedDataRealTime();
}
am2.GetFont_Italic=function (){
return document.defaultView.getComputedStyle(this,"").getPropertyValue("font-style")=="italic"?true:false;
}
am2.SetFont_Italic=function (value){
if (typeof(value)=="undefined")return ;
this.style.fontStyle=value==true?"italic":"normal";
the_fpSpread.setCellAttribute(e5,this,"fi",new String(value).toLocaleLowerCase());
the_fpSpread.SaveClientEditedDataRealTime();
}
am2.GetFont_Overline=function (){
return document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("overline")>=0?true:false;
}
am2.SetFont_Overline=function (value){
if (value){
var am7=new String("overline");
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("line-through")>=0)
am7+=" line-through"
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("underline")>=0)
am7+=" underline"
this.style.textDecoration=am7;
}
else {
var am7=new String("");
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("line-through")>=0)
am7+=" line-through"
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("underline")>=0)
am7+=" underline"
if (am7=="")am7="none";
this.style.textDecoration=am7;
}
the_fpSpread.setCellAttribute(e5,this,"fo",new String(value).toLocaleLowerCase());
the_fpSpread.SaveClientEditedDataRealTime();
}
am2.GetFont_Strikeout=function (){
return document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("line-through")>=0?true:false;
}
am2.SetFont_Strikeout=function (value){
if (value){
var am7=new String("line-through");
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("overline")>=0)
am7+=" overline"
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("underline")>=0)
am7+=" underline"
this.style.textDecoration=am7;
}
else {
var am7=new String("");
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("overline")>=0)
am7+=" overline"
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("underline")>=0)
am7+=" underline"
if (am7=="")am7="none";
this.style.textDecoration=am7;
}
the_fpSpread.setCellAttribute(e5,this,"fk",new String(value).toLocaleLowerCase());
the_fpSpread.SaveClientEditedDataRealTime();
}
am2.GetFont_Underline=function (){
return document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("underline")>=0?true:false;
}
am2.SetFont_Underline=function (value){
if (value){
var am7=new String("underline");
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("overline")>=0)
am7+=" overline"
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("line-through")>=0)
am7+=" line-through"
this.style.textDecoration=am7;
}
else {
var am7=new String("");
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("overline")>=0)
am7+=" overline"
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("line-through")>=0)
am7+=" line-through"
if (am7=="")am7="none";
this.style.textDecoration=am7;
}
the_fpSpread.setCellAttribute(e5,this,"fu",new String(value).toLocaleLowerCase());
the_fpSpread.SaveClientEditedDataRealTime();
}
return am2;
}
return null;
}
this.getDomRow=function (e5,h0){
var n1=this.GetRowCount(e5);
if (n1==0)return null;
var h3=this.GetCellByRowCol(e5,h0,0);
if (h3){
var e9=h3.parentNode.rowIndex;
if (e9>=0){
var i6=h3.parentNode.parentNode.rows[e9];
if (this.GetSizable(e5,i6))
return i6;
}
return null;
}
}
this.setRowInfo_RowAttribute=function (e5,h0,attname,u3,recalc){
h0=parseInt(h0);
if (h0<0)return ;
var am8=this.AddRowInfo(e5,h0);
am8.setAttribute(attname,u3);
var f7=this.GetCmdBtn(e5,"Update");
if (f7!=null&&f7.getAttribute("disabled")!=null)
this.UpdateCmdBtnState(f7,false);
f7=this.GetCmdBtn(e5,"Cancel");
if (f7!=null&&f7.getAttribute("disabled")!=null)
this.UpdateCmdBtnState(f7,false);
e5.e3=true;
if (recalc){
this.UpdateValues(e5);
}
}
this.Rows=function (e5,h0)
{
var am9=this.getDomRow(e5,h0);
if (am9){
am9.GetHeight=function (){
return the_fpSpread.GetRowHeightInternal(e5,h0);
}
am9.SetHeight=function (ac4){
if (typeof(ac4)=="undefined")return ;
if (ac4<1)
ac4=1;
h0=the_fpSpread.GetDisplayIndex(e5,h0);
var b6=null;
if (the_fpSpread.GetRowHeader(e5)!=null)b6=the_fpSpread.GetRowHeader(e5).rows[h0];
if (b6!=null)b6.cells[0].style.posHeight=ac4;
var i4=the_fpSpread.GetViewport(e5);
if (b6==null)
b6=i4.rows[h0];
if (b6!=null)b6.cells[0].style.posHeight=ac4;
var p8=the_fpSpread.AddRowInfo(e5,b6.getAttribute("FpKey"));
if (p8!=null){
if (typeof(b6.cells[0].style.posHeight)=="undefined")
the_fpSpread.SetRowHeight(e5,p8,ac4);
else 
the_fpSpread.SetRowHeight(e5,p8,b6.cells[0].style.posHeight);
}
var i5=the_fpSpread.GetParentSpread(e5);
if (i5!=null)i5.UpdateRowHeight(e5);
the_fpSpread.SynRowHeight(e5,the_fpSpread.GetRowHeader(e5),i4,h0,true,false)
var e8=the_fpSpread.GetTopSpread(e5);
the_fpSpread.SizeAll(e8);
the_fpSpread.Refresh(e8);
the_fpSpread.SaveClientEditedDataRealTime();
}
return am9;
}
return null;
}
this.setColInfo_ColumnAttribute=function (e5,h2,attname,u3,recalc){
h2=parseInt(h2);
if (h2<0)return ;
var an0=this.AddColInfo(e5,h2);
an0.setAttribute(attname,u3);
var f7=this.GetCmdBtn(e5,"Update");
if (f7!=null&&f7.getAttribute("disabled")!=null)
this.UpdateCmdBtnState(f7,false);
f7=this.GetCmdBtn(e5,"Cancel");
if (f7!=null&&f7.getAttribute("disabled")!=null)
this.UpdateCmdBtnState(f7,false);
e5.e3=true;
if (recalc){
this.UpdateValues(e5);
}
}
this.Columns=function (e5,h2)
{
var an1={a2:this.GetColByKey(e5,parseInt(h2))};
if (an1){
an1.GetWidth=function (){
return the_fpSpread.GetColWidthFromCol(e5,h2);
}
an1.SetWidth=function (value){
if (typeof(value)=="undefined")return ;
the_fpSpread.SetColWidth(e5,h2,value);
the_fpSpread.SaveClientEditedDataRealTime();
}
return an1;
}
return null;
}
this.GetTitleBar=function (e5){
try {
if (document.getElementById(e5.id+"_title")==null)return null;
var an2=document.getElementById(e5.id+"_titleBar");
if (an2!=null)an2=document.getElementById(e5.id+"_title");
return an2;
}
catch (ex){
return null;
}
}
this.CheckTitleInfo=function (e5){
var f4=this.GetData(e5);
if (f4==null)return null;
var f5=f4.getElementsByTagName("root")[0];
if (f5==null)return null;
var an3=f5.getElementsByTagName("titleinfo")[0];
if (an3==null)return null;
return an3;
}
this.AddTitleInfo=function (e5){
var n0=this.CheckTitleInfo(e5);
if (n0!=null)return n0;
var f4=this.GetData(e5);
var f5=f4.getElementsByTagName("root")[0];
if (f5==null)return null;
if (document.all!=null){
n0=f4.createNode("element","titleinfo","");
}else {
n0=document.createElement("titleinfo");
n0.style.display="none";
}
f5.appendChild(n0);
return n0;
}
this.setTitleInfo_Attribute=function (e5,attname,u3,recalc){
var an4=this.AddTitleInfo(e5);
an4.setAttribute(attname,u3);
var f7=this.GetCmdBtn(e5,"Update");
if (f7!=null&&f7.getAttribute("disabled")!=null)
this.UpdateCmdBtnState(f7,false);
f7=this.GetCmdBtn(e5,"Cancel");
if (f7!=null&&f7.getAttribute("disabled")!=null)
this.UpdateCmdBtnState(f7,false);
e5.e3=true;
if (recalc){
this.UpdateValues(e5);
}
}
this.GetTitleInfo=function (e5)
{
var an5=this.GetTitleBar(e5);
if (an5){
an5.GetHeight=function (){
return this.style.height;
}
an5.SetHeight=function (value){
this.style.height=parseInt(value)+"px";
the_fpSpread.setTitleInfo_Attribute(e5,"ht",value);
var e8=the_fpSpread.GetTopSpread(e5);
the_fpSpread.SizeAll(e8);
the_fpSpread.Refresh(e8);
the_fpSpread.SaveClientEditedDataRealTime();
}
an5.GetVisible=function (){
return (document.defaultView.getComputedStyle(this,"").getPropertyValue("display")=="none")?false:true;
return document.defaultView.getComputedStyle(this,"").getPropertyValue("visibility");
}
an5.SetVisible=function (value){
this.style.display=value?"":"none";
this.style.visibility=value?"visible":"hidden";
the_fpSpread.setTitleInfo_Attribute(e5,"vs",new String(value).toLocaleLowerCase());
var e8=the_fpSpread.GetTopSpread(e5);
the_fpSpread.SizeAll(e8);
the_fpSpread.Refresh(e8);
the_fpSpread.SaveClientEditedDataRealTime();
}
an5.GetValue=function (){
return this.textContent;
}
an5.SetValue=function (value){
this.textContent=""+value;
the_fpSpread.setTitleInfo_Attribute(e5,"tx",value);
the_fpSpread.SaveClientEditedDataRealTime();
}
return an5;
}
return null;
}
this.SaveClientEditedDataRealTime=function (){
var an6=this.GetPageActiveSpread();
if (an6!=null){
this.SaveData(an6);
an6.e3=false;
}
an6=this.GetPageActiveSheetView();
if (an6!=null){
this.SaveData(an6);
an6.e3=false;
}
}
var an7="";
this.ShowScrollingContent=function (e5,hs){
var r1="";
var o5=this.GetTopSpread(e5);
var an8=o5.getAttribute("scrollContentColumns");
var an9=o5.getAttribute("scrollContentMaxHeight");
var ao0=o5.getAttribute("scrollContentTime");
var i4=this.GetViewport(o5);
var ao1=this.GetColGroup(i4);
var m6=this.GetParent(i4);
var ao2=0;
if (hs){
var ao3=m6.scrollLeft;
var c7=this.GetColHeader(o5);
var r8=0;
for (;r8<ao1.childNodes.length;r8++){
var h2=ao1.childNodes[r8];
ao2+=parseInt(h2.width);
if (ao2>ao3)break ;
}
var ao4=null;
if (ao4)r8+=this.GetColGroup(ao4).childNodes.length;
if (c7){
var r7=c7.rows.length-1;
if (e5.getAttribute("LayoutMode")==null)
r7=parseInt(c7.getAttribute("ColTextIndex"))?c7.getAttribute("ColTextIndex"):c7.rows.length-1;
var ao5=this.GetHeaderCellFromRowCol(o5,r7,r8,true);
if (ao5){
if (ao5.getAttribute("FpCellType")=="ExtenderCellType"&&ao5.getElementsByTagName("DIV").length>0){
var w4=this.GetEditor(ao5);
var w5=this.GetFunction("ExtenderCellType_getEditorValue");
if (w4!=null&&w5!=null){
r1="&nbsp;Column:&nbsp;"+w5(w4)+"&nbsp;";
}
}
else 
r1="&nbsp;Column:&nbsp;"+ao5.innerHTML+"&nbsp;";
}
}
if (r1.length<=0)r1="&nbsp;Column:&nbsp;"+(r8+1)+"&nbsp;";
}
else {
var n2=m6.scrollTop;
var c6=this.GetRowHeader(o5);
var r7=0;
var ao6=0;
var ao7=2;
for (var x5=0;x5<i4.rows.length;x5++){
var h0=i4.rows[x5];
ao2+=h0.offsetHeight;
if (ao2>n2){
if (h0.getAttribute("fpkey")==null&&h0.getAttribute("previewrow")!="true")
r7--;
else 
ao6=h0.offsetHeight;
break ;
}
if (h0.getAttribute("fpkey")!=null||h0.getAttribute("previewrow")=="true"){
r7++;
ao6=h0.offsetHeight;
}
}
var ao4=null;
if (ao4)r7+=ao4.rows.length;
if (e5.getAttribute("LayoutMode")==null&&an8!=null&&an8.length>0){
ao6=ao6>an9?an9:ao6;
var ao8=an8.split(",");
var ao9=false;
for (var f0=0;f0<ao8.length;f0++){
var h2=parseInt(ao8[f0]);
if (h2==null||h2>=this.GetColCount(e5))continue ;
var h3=o5.GetCellByRowCol(r7,h2);
if (!h3||h3.getAttribute("col")!=null&&h3.getAttribute("col")!=h2)continue ;
var ap0=(h3.getAttribute("group")==1);
var ab4=(h3.parentNode.getAttribute("previewrow")=="true");
var g1=(h3.getAttribute("RowEditTemplate")!=null);
var j9=this.IsXHTML(e5);
if (!j9&&an7==""){
this.GetScrollingContentStyle(e5);
if (ai8!=null){
if (ai8.fontFamily!=null&&ai8.fontFamily!="")an7+="fontFamily:"+ai8.fontFamily+";";
if (ai8.fontSize!=null&&ai8.fontSize!="")an7+="fontSize:"+ai8.fontSize+";";
if (ai8.fontStyle!=null&&ai8.fontStyle!="")an7+="fontStyle:"+ai8.fontStyle+";";
if (ai8.fontVariant!=null&&ai8.fontVariant!="")an7+="fontVariant:"+ai8.fontVariant+";";
if (ai8.fontWeight!=null&&ai8.fontWeight!="")an7+="fontWeight:"+ai8.fontWeight+";";
if (ai8.backgroundColor!=null&&ai8.backgroundColor!="")an7+="backgroundColor:"+ai8.backgroundColor+";";
if (ai8.color!=null&&ai8.color!="")an7+="color:"+ai8.color;
}
}
if (!ao9){
r1+="<div style='overflow:hidden;height:"+ao6+"px;ScrollingContentWidth'><table cellPadding='0' cellSpacing='0' style='height:"+ao6+"px;"+(ap0?"":"table-layout:auto;")+an7+"'><tr>";
}
r1+="<td style='width:"+(ap0?0:h3.offsetWidth)+"px;'>";
ao7+=h3.offsetWidth;
if (ap0)
r1+="&nbsp;<i>GroupBar:</i>&nbsp;"+h3.textContent+"&nbsp;";
else if (ab4)
r1+="&nbsp;<i>PreviewRow:</i>&nbsp;"+h3.textContent+"&nbsp;";
else if (g1){
var ap1=this.parseCell(e5,h3);
r1+="&nbsp;<i>RowEditTemplate:</i>&nbsp;"+ap1+"&nbsp;";
}
else {
if (h3.getAttribute("fpcelltype"))this.UpdateCellTypeDOM(h3);
if (h3.getAttribute("fpcelltype")=="MultiColumnComboBoxCellType"&&h3.childNodes[0]&&h3.childNodes[0].childNodes.length>0&&h3.childNodes[0].getAttribute("MccbId"))
r1+=o5.GetValue(r7,h2);
else if (h3.getAttribute("fpcelltype")=="RadioButtonListCellType"||h3.getAttribute("fpcelltype")=="ExtenderCellType"||h3.getAttribute("fpeditorid")!=null){
var ap2=this.parseCell(e5,h3);
r1+=ap2;
}
else 
r1+=h3.innerHTML;
}
r1+="</td>";
ao9=true;
if (ap0||ab4||g1)break ;
}
if (ao9){
r1=r1.replace("ScrollingContentWidth"," width:"+ao7+"px;");
r1+="</tr></table></div>";
}
}
if (r1.length<=0&&c6){
var r8=this.GetColGroup(c6).childNodes.length-1;
if (e5.getAttribute("LayoutMode")==null)
r8=c6.getAttribute("RowTextIndex")?parseInt(c6.getAttribute("RowTextIndex"))+1:this.GetColGroup(c6).childNodes.length-1;
var ao5=this.GetHeaderCellFromRowCol(e5,r7,r8,false);
if (ao5)r1="&nbsp;Row:&nbsp;"+ao5.textContent+"&nbsp;";
}
if (r1.length<=0)r1="&nbsp;Row:&nbsp;"+(r7+1)+"&nbsp;";
}
this.ShowMessageInner(o5,r1,(hs?-1:-2),(hs?-2:-1),ao0);
}
this.parseCell=function (e5,h3){
var r1=h3.innerHTML;
var o5=this.GetTopSpread(e5);
var ap3=o5.id;
if (r1.length>0){
r1=r1.replace(new RegExp("=\""+ap3,"g"),"=\""+ap3+"src");
r1=r1.replace(new RegExp("name="+ap3,"g"),"name="+ap3+"src");
}
return r1;
}
this.UpdateCellTypeDOM=function (h3){
for (var f0=0;f0<h3.childNodes.length;f0++){
if (h3.childNodes[f0].tagName&&(h3.childNodes[f0].tagName=="INPUT"||h3.childNodes[f0].tagName=="SELECT"))
this.UpdateDOM(h3.childNodes[f0]);
if (h3.childNodes[f0].childNodes&&h3.childNodes[f0].childNodes.length>0)
this.UpdateCellTypeDOM(h3.childNodes[f0]);
}
}
this.UpdateDOM=function (inputField){
if (typeof(inputField)=="string"){
inputField=document.getElementById(inputField);
}
if (inputField.type=="select-one"){
for (var f0=0;f0<inputField.options.length;f0++){
if (f0==inputField.selectedIndex){
inputField.options[inputField.selectedIndex].setAttribute("selected","selected");
}
}
}
else if (inputField.type=="text"){
inputField.setAttribute("value",inputField.value);
}
else if (inputField.type=="textarea"){
inputField.setAttribute("value",inputField.value);
}
else if ((inputField.type=="checkbox")||(inputField.type=="radio")){
if (inputField.checked){
inputField.setAttribute("checked","checked");
}else {
inputField.removeAttribute("checked");
}
}
}
this.GetScrollingContentStyle=function (e5){
if (ai8!=null)return ;
var e9=document.styleSheets.length;
for (var f0=0;f0<e9;f0++){
var ap4=document.styleSheets[f0];
for (var i0=0;i0<ap4.cssRules.length;i0++){
var ap5=ap4.cssRules[i0];
if (ap5.selectorText=="."+e5.id+"scrollContentStyle"||ap5.selectorText=="."+e5.id.toLowerCase()+"scrollcontentstyle"){
ai8=ap5.style;
break ;
}
}
if (ai8!=null)break ;
}
}
}
function CheckBoxCellType_setFocus(h3){
var i3=h3.getElementsByTagName("INPUT");
if (i3!=null&&i3.length>0&&i3[0].type=="checkbox"){
i3[0].focus();
}
}
function CheckBoxCellType_getCheckBoxEditor(h3){
var i3=h3.getElementsByTagName("INPUT");
if (i3!=null&&i3.length>0&&i3[0].type=="checkbox"){
return i3[0];
}
return null;
}
function CheckBoxCellType_isValid(h3,u3){
if (u3==null)return "";
u3=the_fpSpread.Trim(u3);
if (u3=="")return "";
if (u3.toLowerCase()=="true"||u3.toLowerCase()=="false")
return "";
else 
return "invalid value";
}
function CheckBoxCellType_getValue(u7,e5){
return CheckBoxCellType_getEditorValue(u7,e5);
}
function CheckBoxCellType_getEditorValue(u7,e5){
var h3=the_fpSpread.GetCell(u7);
var i3=CheckBoxCellType_getCheckBoxEditor(h3);
if (i3!=null&&i3.checked){
return "true";
}
return "false";
}
function CheckBoxCellType_setValue(u7,u3){
var h3=the_fpSpread.GetCell(u7);
var i3=CheckBoxCellType_getCheckBoxEditor(h3);
if (i3!=null){
i3.checked=(u3!=null&&u3.toLowerCase()=="true");
return ;
}
}
function IntegerCellType_getValue(u7){
var f8=u7;
while (f8.firstChild!=null&&f8.firstChild.nodeName!="#text")f8=f8.firstChild;
if (f8.innerHTML=="&nbsp;")return "";
var s7=f8.innerHTML;
u7=the_fpSpread.GetCell(u7);
if (u7.getAttribute("FpRef")!=null)u7=document.getElementById(u7.getAttribute("FpRef"));
var ap6=u7.getAttribute("groupchar");
if (ap6==null)ap6=",";
var t4=s7.length;
while (true){
s7=s7.replace(ap6,"");
if (s7.length==t4)break ;
t4=s7.length;
}
if (s7.charAt(0)=='('&&s7.charAt(s7.length-1)==')'){
var ap7=u7.getAttribute("negsign");
if (ap7==null)ap7="-";
s7=ap7+s7.substring(1,s7.length-1);
}
s7=the_fpSpread.ReplaceAll(s7,"&nbsp;"," ");
return s7;
}
function IntegerCellType_isValid(h3,u3){
if (u3==null||u3.length==0)return "";
u3=the_fpSpread.Trim(u3);
if (u3.length==0)return "";
var ao2=h3;
var ap8=h3.getAttribute("FpRef");
if (ap8!=null)ao2=document.getElementById(ap8);
var ap7=ao2.getAttribute("negsign");
var v5=ao2.getAttribute("possign");
if (ap7!=null)u3=u3.replace(ap7,"-");
if (v5!=null)u3=u3.replace(v5,"+");
if (u3.charAt(u3.length-1)=="-")u3="-"+u3.substring(0,u3.length-1);
var t6=new RegExp("^\\s*[-\\+]?\\d+\\s*$");
var o1=(u3.match(t6)!=null);
if (o1)o1=!isNaN(u3);
if (o1){
var u0=ao2.getAttribute("MinimumValue");
var i8=ao2.getAttribute("MaximumValue");
var t9=parseInt(u3);
if (u0!=null){
u0=parseInt(u0);
o1=(!isNaN(u0)&&t9>=u0);
}
if (o1&&i8!=null){
i8=parseInt(i8);
o1=(!isNaN(i8)&&t9<=i8);
}
}
if (!o1){
if (ao2.getAttribute("error")!=null)
return ao2.getAttribute("error");
else 
return "Integer";
}
return "";
}
function DoubleCellType_isValid(h3,u3){
if (u3==null||u3.length==0)return "";
var ao2=h3;
if (h3.getAttribute("FpRef")!=null)ao2=document.getElementById(h3.getAttribute("FpRef"));
var ap9=ao2.getAttribute("decimalchar");
if (ap9==null)ap9=".";
var ap6=ao2.getAttribute("groupchar");
if (ap6==null)ap6=",";
u3=the_fpSpread.Trim(u3);
var o1=true;
o1=(u3.length==0||u3.charAt(0)!=ap6);
if (o1){
var t4=u3.length;
while (true){
u3=u3.replace(ap6,"");
if (u3.length==t4)break ;
t4=u3.length;
}
}
var o1=true;
if (u3.length==0){
o1=false;
}else if (o1){
var ap7=ao2.getAttribute("negsign");
var v5=ao2.getAttribute("possign");
var u0=ao2.getAttribute("MinimumValue");
var i8=ao2.getAttribute("MaximumValue");
o1=the_fpSpread.IsDouble(u3,ap9,ap7,v5,u0,i8);
}
if (!o1){
if (ao2.getAttribute("error")!=null)
return ao2.getAttribute("error");
else 
return "Double";
}
return "";
}
function DoubleCellType_getValue(u7){
var f8=u7;
while (f8.firstChild!=null&&f8.firstChild.nodeName!="#text")f8=f8.firstChild;
if (f8.innerHTML=="&nbsp;")return "";
var s7=f8.innerHTML;
u7=the_fpSpread.GetCell(u7);
if (u7.getAttribute("FpRef")!=null)u7=document.getElementById(u7.getAttribute("FpRef"));
var ap6=u7.getAttribute("groupchar");
if (ap6==null)ap6=",";
var t4=s7.length;
while (true){
s7=s7.replace(ap6,"");
if (s7.length==t4)break ;
t4=s7.length;
}
if (s7.charAt(0)=='('&&s7.charAt(s7.length-1)==')'){
var ap7=u7.getAttribute("negsign");
if (ap7==null)ap7="-";
s7=ap7+s7.substring(1,s7.length-1);
}
s7=the_fpSpread.ReplaceAll(s7,"&nbsp;"," ");
return s7;
}
function CurrencyCellType_isValid(h3,u3){
if (u3!=null&&u3.length>0){
var ao2=h3;
if (h3.getAttribute("FpRef")!=null)ao2=document.getElementById(h3.getAttribute("FpRef"));
var t3=ao2.getAttribute("currencychar");
if (t3==null)t3="$";
u3=u3.replace(t3,"");
var ap6=ao2.getAttribute("groupchar");
if (ap6==null)ap6=",";
u3=the_fpSpread.Trim(u3);
var o1=true;
o1=(u3.length==0||u3.charAt(0)!=ap6);
if (o1){
var t4=u3.length;
while (true){
u3=u3.replace(ap6,"");
if (u3.length==t4)break ;
t4=u3.length;
}
}
if (u3.length==0){
o1=false;
}else if (o1){
var ap9=ao2.getAttribute("decimalchar");
if (ap9==null)ap9=".";
var ap7=ao2.getAttribute("negsign");
var v5=ao2.getAttribute("possign");
var u0=ao2.getAttribute("MinimumValue");
var i8=ao2.getAttribute("MaximumValue");
o1=the_fpSpread.IsDouble(u3,ap9,ap7,v5,u0,i8);
}
if (!o1){
if (ao2.getAttribute("error")!=null)
return ao2.getAttribute("error");
else 
return "Currency ("+t3+"100"+ap9+"10) ";
}
}
return "";
}
function CurrencyCellType_getValue(u7){
var f8=u7;
while (f8.firstChild!=null&&f8.firstChild.nodeName!="#text")f8=f8.firstChild;
if (f8.innerHTML=="&nbsp;")return "";
var s7=f8.innerHTML;
u7=the_fpSpread.GetCell(u7);
if (u7.getAttribute("FpRef")!=null)u7=document.getElementById(u7.getAttribute("FpRef"));
var t3=u7.getAttribute("currencychar");
if (t3!=null){
var aq0=document.createElement("SPAN");
aq0.innerHTML=t3;
t3=aq0.innerHTML;
}
if (t3==null)t3="$";
var ap6=u7.getAttribute("groupchar");
if (ap6==null)ap6=",";
s7=s7.replace(t3,"");
var t4=s7.length;
while (true){
s7=s7.replace(ap6,"");
if (s7.length==t4)break ;
t4=s7.length;
}
var ap7=u7.getAttribute("negsign");
if (ap7==null)ap7="-";
if (s7.charAt(0)=='('&&s7.charAt(s7.length-1)==')'){
s7=ap7+s7.substring(1,s7.length-1);
}
s7=the_fpSpread.ReplaceAll(s7,"&nbsp;"," ");
return s7;
}
function RegExpCellType_isValid(h3,u3){
if (u3==null||u3=="")
return "";
var ao2=h3;
if (h3.getAttribute("FpRef")!=null)ao2=document.getElementById(h3.getAttribute("FpRef"));
var aq1=new RegExp(ao2.getAttribute("fpexpression"));
var t7=u3.match(aq1);
var m6=(t7!=null&&t7.length>0&&u3==t7[0]);
if (!m6){
if (ao2.getAttribute("error")!=null)
return ao2.getAttribute("error");
else 
return "invalid";
}
return "";
}
function PercentCellType_getValue(u7){
var f8=u7;
while (f8.firstChild!=null&&f8.firstChild.nodeName!="#text")f8=f8.firstChild;
if (f8.innerHTML=="&nbsp;")return "";
f8=f8.innerHTML;
var h3=the_fpSpread.GetCell(u7);
var ao2=h3;
if (h3.getAttribute("FpRef")!=null)ao2=document.getElementById(h3.getAttribute("FpRef"));
var aq2=ao2.getAttribute("percentchar");
if (aq2==null)aq2="%";
f8=f8.replace(aq2,"");
var ap6=ao2.getAttribute("groupchar");
if (ap6==null)ap6=",";
var t4=f8.length;
while (true){
f8=f8.replace(ap6,"");
if (f8.length==t4)break ;
t4=f8.length;
}
var ap7=ao2.getAttribute("negsign");
var v5=ao2.getAttribute("possign");
f8=the_fpSpread.ReplaceAll(f8,"&nbsp;"," ");
var g3=f8;
if (ap7!=null)
f8=f8.replace(ap7,"-");
if (v5!=null)
f8=f8.replace(v5,"+");
var ap9=ao2.getAttribute("decimalchar");
if (ap9!=null)
f8=f8.replace(ap9,".");
if (!isNaN(f8))
return g3;
else 
return u7.innerHTML;
}
function PercentCellType_setValue(u7,u3){
var f8=u7;
while (f8.firstChild!=null&&f8.firstChild.nodeName!="#text")f8=f8.firstChild;
u7=f8;
if (u3!=null&&u3!=""){
var ao2=the_fpSpread.GetCell(u7);
if (ao2.getAttribute("FpRef")!=null)ao2=document.getElementById(ao2.getAttribute("FpRef"));
var aq2=ao2.getAttribute("percentchar");
if (aq2==null)aq2="%";
u3=u3.replace(" ","");
u3=u3.replace(aq2,"");
u7.innerHTML=u3+aq2;
}else {
u7.innerHTML="";
}
}
function PercentCellType_isValid(h3,u3){
if (u3!=null){
var ao2=the_fpSpread.GetCell(h3);
if (ao2.getAttribute("FpRef")!=null)ao2=document.getElementById(ao2.getAttribute("FpRef"));
var aq2=ao2.getAttribute("percentchar");
if (aq2==null)aq2="%";
u3=u3.replace(aq2,"");
var ap6=ao2.getAttribute("groupchar");
if (ap6==null)ap6=",";
var t4=u3.length;
while (true){
u3=u3.replace(ap6,"");
if (u3.length==t4)break ;
t4=u3.length;
}
var aq3=u3;
var ap7=ao2.getAttribute("negsign");
var v5=ao2.getAttribute("possign");
if (ap7!=null)u3=u3.replace(ap7,"-");
if (v5!=null)u3=u3.replace(v5,"+");
var ap9=ao2.getAttribute("decimalchar");
if (ap9!=null)
u3=u3.replace(ap9,".");
var o1=!isNaN(u3);
if (o1){
var aq4=ao2.getAttribute("MinimumValue");
var aq5=ao2.getAttribute("MaximumValue");
if (aq4!=null||aq5!=null){
var u0=parseFloat(aq4);
var i8=parseFloat(aq5);
o1=!isNaN(u0)&&!isNaN(i8);
if (o1){
if (ap9==null)ap9=".";
o1=the_fpSpread.IsDouble(aq3,ap9,ap7,v5,u0*100,i8*100);
}
}
}
if (!o1){
if (ao2.getAttribute("error")!=null)
return ao2.getAttribute("error");
else 
return "Percent:(ex,10"+aq2+")";
}
}
return "";
}
function ListBoxCellType_getValue(u7){
var f8=u7.getElementsByTagName("TABLE");
if (f8.length>0)
{
var g8=f8[0].rows;
for (var i0=0;i0<g8.length;i0++){
var h3=g8[i0].cells[0];
if (h3.selected=="true")
{
var aq6=h3;
while (aq6.firstChild!=null)aq6=aq6.firstChild;
var ao2=aq6.nodeValue;
return ao2;
}
}
}
return "";
}
function ListBoxCellType_setValue(u7,u3){
var f8=u7.getElementsByTagName("TABLE");
if (f8.length>0)
{
f8[0].style.width=(u7.clientWidth-6)+"px";
var g8=f8[0].rows;
for (var i0=0;i0<g8.length;i0++){
var h3=g8[i0].cells[0];
var aq6=h3;
while (aq6.firstChild!=null)aq6=aq6.firstChild;
var ao2=aq6.nodeValue;
if (ao2==u3){
h3.selected="true";
if (f8[0].parentNode.getAttribute("selectedBackColor")!="undefined")
h3.style.backgroundColor=f8[0].parentNode.getAttribute("selectedBackColor");
if (f8[0].parentNode.getAttribute("selectedForeColor")!="undefined")
h3.style.color=f8[0].parentNode.getAttribute("selectedForeColor");
}else {
h3.style.backgroundColor="";
h3.style.color="";
h3.selected="";
h3.bgColor="";
}
}
}
}
function TextCellType_getValue(u7){
var h3=the_fpSpread.GetCell(u7,true);
if (h3!=null&&h3.getAttribute("password")!=null){
if (h3!=null&&h3.getAttribute("value")!=null)
return h3.getAttribute("value");
else 
return "";
}else {
var f8=u7;
while (f8.firstChild!=null&&f8.firstChild.nodeName!="#text")f8=f8.firstChild;
if (f8.innerHTML=="&nbsp;")return "";
var f8=the_fpSpread.ReplaceAll(f8.innerHTML,"&nbsp;"," ");
var f8=the_fpSpread.ReplaceAll(f8,"<br>","\n");
return f8;
}
}
function TextCellType_setValue(u7,u3){
var h3=the_fpSpread.GetCell(u7,true);
if (h3==null)return ;
var f8=u7;
while (f8.firstChild!=null&&f8.firstChild.nodeName!="#text")f8=f8.firstChild;
u7=f8;
if (h3.getAttribute("password")!=null){
if (u3!=null&&u3!=""){
u3=u3.replace(" ","");
u7.innerHTML="";
for (var f0=0;f0<u3.length;f0++)
u7.innerHTML+="*";
h3.setAttribute("value",u3);
}else {
u7.innerHTML="";
h3.setAttribute("value","");
}
}else {
u3=the_fpSpread.ReplaceAll(u3,"\n","<br>");
u7.innerHTML=the_fpSpread.ReplaceAll(u3," ","&nbsp;");
}
}
function RadioButtonListCellType_getValue(u7){
var h3=the_fpSpread.GetCell(u7,true);
if (h3==null)return ;
var aq7=h3.getElementsByTagName("INPUT");
for (var f0=0;f0<aq7.length;f0++){
if (aq7[f0].tagName=="INPUT"&&aq7[f0].checked){
return aq7[f0].value;
}
}
return "";
}
function RadioButtonListCellType_getEditorValue(u7){
return RadioButtonListCellType_getValue(u7);
}
function RadioButtonListCellType_setValue(u7,u3){
var h3=the_fpSpread.GetCell(u7,true);
if (h3==null)return ;
if (u3!=null)u3=the_fpSpread.Trim(u3);
var aq7=h3.getElementsByTagName("INPUT");
for (var f0=0;f0<aq7.length;f0++){
if (aq7[f0].tagName=="INPUT"&&u3==the_fpSpread.Trim(aq7[f0].value)){
aq7[f0].checked=true;
break ;
}else {
if (aq7[f0].checked)aq7[f0].checked=false;
}
}
}
function RadioButtonListCellType_setFocus(u7){
var h3=the_fpSpread.GetCell(u7,true);
if (h3==null)return ;
var i3=h3.getElementsByTagName("INPUT");
if (i3==null)return ;
for (var f0=0;f0<i3.length;f0++){
if (i3[f0].type=="radio"&&i3[f0].checked){
i3[f0].focus();
return ;
}
}
}
function MultiColumnComboBoxCellType_setValue(u7,u3,e5){
var h3=the_fpSpread.GetCell(u7,true);
if (h3==null)return ;
var aq8=h3.getElementsByTagName("DIV");
if (aq8!=null&&aq8.length>0){
var aq9=h3.getElementsByTagName("input");
if (aq9!=null&&aq9.length>0)
aq9[0].value=u3;
return ;
}
if (u3!=null&&u3!="")
u7.textContent=u3;
else 
u7.innerHTML="&nbsp;";
}
function MultiColumnComboBoxCellType_getValue(u7,e5){
var s7=u7.textContent;
var i9=the_fpSpread.GetCell(u7,true);
var aq8=i9.getElementsByTagName("DIV");
if (aq8!=null&&aq8.length>0){
var aq9=i9.getElementsByTagName("input");
if (aq9!=null&&aq9.length>0)
return aq9[0].value;
return ;
}
if (!e5)return null;
var s8=the_fpSpread.GetCellEditorID(e5,i9);
var a9=null;
if (s8!=null&&typeof(s8)!="undefined"){
a9=the_fpSpread.GetCellEditor(e5,s8,true);
if (a9!=null){
var ar0=a9.getAttribute("MccbId");
if (ar0){
FarPoint.System.WebControl.MultiColumnComboBoxCellType.CheckInit(ar0);
var ar1=eval(ar0+"_Obj");
if (ar1!=null&&ar1.SetText!=null){
ar1.SetText(s7);
return s7;
}
}
}
return null;
}
return s7;
}
function MultiColumnComboBoxCellType_getEditorValue(u7,e5){
var h3=the_fpSpread.GetCell(u7,true);
if (h3==null)return ;
var ar2=h3.getElementsByTagName("INPUT");
if (ar2!=null&&ar2.length>0){
var f8=ar2[0];
return f8.value;
}
return null;
}
function MultiColumnComboBoxCellType_setFocus(u7){
var h3=the_fpSpread.GetCell(u7);
var e5=the_fpSpread.GetSpread(h3);
if (h3==null)return ;
var ar3=h3.getElementsByTagName("DIV");
if (ar3!=null&&ar3.length>0){
var ar0=ar3[0].getAttribute("MccbId");
if (ar0){
var ar1=eval(ar0+"_Obj");
if (ar1!=null&&typeof(ar1.FocusForEdit)!="undefined"){
ar1.FocusForEdit();
}
}
}
}
function MultiColumnComboBoxCellType_setEditorValue(u7,editorValue,e5){
var h3=the_fpSpread.GetCell(u7,true);
if (h3==null)return ;
var s8=the_fpSpread.GetCellEditorID(e5,h3);
var a9=null;
if (s8!=null&&typeof(s8)!="undefined"){
a9=the_fpSpread.GetCellEditor(e5,s8,true);
if (a9!=null){
var ar0=a9.getAttribute("MccbId");
if (ar0){
FarPoint.System.WebControl.MultiColumnComboBoxCellType.CheckInit(ar0);
var ar1=eval(ar0+"_Obj");
if (ar1!=null&&ar1.SetText!=null){
ar1.SetText(editorValue);
}
}
}
}
}
function TagCloudCellType_getValue(u7,e5){
var s7=u7.textContent;
if (typeof(s7)!="undefined"&&s7!=null&&s7.length>0)
{
s7=the_fpSpread.ReplaceAll(s7,"<br>","");
s7=the_fpSpread.ReplaceAll(s7,"\n","");
s7=the_fpSpread.ReplaceAll(s7,"\t","");
var r2=new RegExp("\xA0","g");
s7=s7.replace(r2,String.fromCharCode(32));
s7=the_fpSpread.HTMLDecode(s7);
}
else 
s7="";
return s7;
}
