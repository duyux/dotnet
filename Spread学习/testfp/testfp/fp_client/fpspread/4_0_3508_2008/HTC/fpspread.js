//
//	Copyright?2005. FarPoint Technologies.	All rights reserved.
//
var the_fpSpread = new Fpoint_FPSpread();
function FpSpread_EventHandlers(){
var e4=the_fpSpread;
this.TranslateKeyPress=function (event){
e4.TranslateKeyPress(event);
}
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
var e6=window.navigator.userAgent;
var e7=(e6.indexOf("Firefox/3.")>=0);
if (e7)
e4.AttachEvent(document,"keypress",this.TranslateKeyPress,true);
e4.AttachEvent(document,"keydown",this.TranslateKey,true);
e4.AttachEvent(document,"mousedown",this.SetActiveSpread,false);
e4.AttachEvent(document,"keyup",this.HandleFirstKey,true);
e4.AttachEvent(window,"resize",e4.DoResize,false);
e4.AttachEvent(window,"DOMMouseScroll",e4.DocScroll,false);
this.AttachEvents=function (e5){
e4.AttachEvent(e5,"mousedown",this.MouseDown,false);
e4.AttachEvent(e5,"mouseup",this.MouseUp,false);
e4.AttachEvent(document,"mouseup",this.MouseUp,false);
e4.AttachEvent(e5,"mousemove",this.MouseMove,false);
e4.AttachEvent(e5,"dblclick",this.DblClick,false);
e4.AttachEvent(e5,"focus",this.Focus,false);
var e8=e4.GetViewport(e5);
if (e8!=null){
e4.AttachEvent(e4.GetViewport(e5).parentNode,"DOMAttrModified",this.DoPropertyChange,true);
e4.AttachEvent(e4.GetViewport(e5).parentNode,"scroll",this.ScrollViewport);
}
var e9=e4.GetCommandBar(e5);
if (e9!=null){
e4.AttachEvent(e9,"mouseover",this.CmdbarMouseOver,false);
e4.AttachEvent(e9,"mouseout",this.CmdbarMouseOut,false);
}
}
this.DetachEvents=function (e5){
e4.DetachEvent(e5,"mousedown",this.MouseDown,false);
e4.DetachEvent(e5,"mouseup",this.MouseUp,false);
e4.DetachEvent(document,"mouseup",this.MouseUp,false);
e4.DetachEvent(e5,"mousemove",this.MouseMove,false);
e4.DetachEvent(e5,"dblclick",this.DblClick,false);
e4.DetachEvent(e5,"focus",this.Focus,false);
var e8=e4.GetViewport(e5);
if (e8!=null){
e4.DetachEvent(e4.GetViewport(e5).parentNode,"DOMAttrModified",this.DoPropertyChange,true);
e4.DetachEvent(e4.GetViewport(e5).parentNode,"scroll",this.ScrollViewport);
}
var e9=e4.GetCommandBar(e5);
if (e9!=null){
e4.DetachEvent(e9,"mouseover",this.CmdbarMouseOver,false);
e4.DetachEvent(e9,"mouseout",this.CmdbarMouseOut,false);
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
this.activePager=null;
this.dragSlideBar=false;
e5.allowColMove=(e5.getAttribute("colMove")=="true");
e5.allowGroup=(e5.getAttribute("allowGroup")=="true");
e5.selectedCols=[];
e5.msgList=new Array();
e5.mouseY=null;
e5.copymulticol=false;
}
this.RegisterSpread=function (e5){
var f0=this.GetTopSpread(e5);
if (f0!=e5)return ;
if (this.spreads==null){
this.spreads=new Array();
}
var f1=this.spreads.length;
for (var f2=0;f2<f1;f2++){
if (this.spreads[f2]==e5)return ;
}
this.spreads.length=f1+1;
this.spreads[f1]=e5;
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
e5.c2=document.createElement('XML');
e5.c2.id=e5.id+"_XMLDATA";
e5.c2.style.display="none";
document.body.insertBefore(e5.c2,null);
}
var f3=document.getElementById(e5.id+"_data");
if (f3!=null&&f3.getAttribute("data")!=null){
e5.c2.innerHTML=f3.getAttribute("data");
f3.value="";
}
this.SaveData(e5);
e5.c3=document.getElementById(e5.id+"_viewport");
if (e5.c3!=null){
e5.c4=e5.c3.parentNode;
}
e5.frozColHeader=document.getElementById(e5.id+"_frozColHeader");
e5.frozRowHeader=document.getElementById(e5.id+"_frozRowHeader");
e5.viewport0=document.getElementById(e5.id+"_viewport0");
e5.viewport1=document.getElementById(e5.id+"_viewport1");
e5.viewport2=document.getElementById(e5.id+"_viewport2");
e5.c5=document.getElementById(e5.id+"_corner");
if (e5.c5!=null&&e5.c5.childNodes.length>0){
e5.c5=e5.c5.getElementsByTagName("TABLE")[0];
}
e5.frzRows=e5.frzCols=0;
if (e5.viewport1!=null){
e5.frzRows=e5.viewport1.rows.length;
}
if (e5.viewport0!=null){
var f4=this.GetColGroup(e5.viewport0);
if (f4!=null)e5.frzCols=f4.childNodes.length;
}else if (e5.viewport2!=null){
var f4=this.GetColGroup(e5.viewport2);
if (f4!=null)e5.frzCols=f4.childNodes.length;
}
e5.c6=document.getElementById(e5.id+"_rowHeader");
if (e5.c6!=null)e5.c6=e5.c6.getElementsByTagName("TABLE")[0];
e5.c7=document.getElementById(e5.id+"_colHeader");
if (e5.c7!=null)e5.c7=e5.c7.getElementsByTagName("TABLE")[0];
e5.frozColFooter=document.getElementById(e5.id+"_frozColFooter");
e5.colFooter=document.getElementById(e5.id+"_colFooter");
if (e5.colFooter!=null)e5.colFooter=e5.colFooter.getElementsByTagName("TABLE")[0];
e5.footerCorner=document.getElementById(e5.id+"_footerCorner");
if (e5.footerCorner!=null&&e5.footerCorner.childNodes.length>0){
e5.footerCorner=e5.footerCorner.getElementsByTagName("TABLE")[0];
}
if (e5.frozColFooter!=null)e5.frozColFooter=e5.frozColFooter.getElementsByTagName("TABLE")[0];
var c8=e5.c8=document.getElementById(e5.id+"_commandBar");
if (e5.frozRowHeader!=null)e5.frozRowHeader=e5.frozRowHeader.getElementsByTagName("TABLE")[0];
if (e5.frozColHeader!=null)e5.frozColHeader=e5.frozColHeader.getElementsByTagName("TABLE")[0];
var f5=this.GetViewport(e5);
if (f5!=null){
e5.setAttribute("rowCount",f5.rows.length);
if (f5.rows.length==1)e5.setAttribute("rowCount",0);
e5.setAttribute("colCount",f5.getAttribute("cols"));
}
var e0=e5.e0;
var e2=e5.e2;
var e1=e5.e1;
this.InitSpan(e5,this.GetViewport0(e5),e0);
this.InitSpan(e5,this.GetViewport1(e5),e0);
this.InitSpan(e5,this.GetViewport2(e5),e0);
this.InitSpan(e5,this.GetViewport(e5),e0);
this.InitSpan(e5,this.GetColHeader(e5),e2);
this.InitSpan(e5,this.GetFrozColHeader(e5),e2);
this.InitSpan(e5,this.GetRowHeader(e5),e1);
this.InitSpan(e5,this.GetFrozRowHeader(e5),e1);
if (e5.frzRows!=0||e5.frzCols!=0){
var f6=0;
if (this.GetViewport1(e5)!=null)f6+=this.GetViewport1(e5).rows.length;
if (this.GetViewport(e5)!=null)f6+=this.GetViewport(e5).rows.length;
e5.setAttribute("rowCount",f6);
}
e5.style.overflow="hidden";
if (this.GetParentSpread(e5)==null){
this.LoadScrollbarState(e5);
var f7=this.GetData(e5);
var f8=f7.getElementsByTagName("root")[0];
var f9=f8.getElementsByTagName("activespread")[0];
if (f9!=null&&f9.innerHTML!=""){
this.SetPageActiveSpread(document.getElementById(this.Trim(f9.innerHTML)));
}
}
this.InitLayout(e5);
e5.e3=true;
if (this.GetPageActiveSpread()==e5&&(e5.getAttribute("AllowInsert")=="false"||e5.getAttribute("IsNewRow")=="true")){
var g0=this.GetCmdBtn(e5,"Insert");
this.UpdateCmdBtnState(g0,true);
g0=this.GetCmdBtn(e5,"Add");
this.UpdateCmdBtnState(g0,true);
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
this.CreateSizebar(e5);
this.SyncColSelection(e5);
}
this.Dispose=function (e5){
if (this.handlers==null)
this.handlers=new FpSpread_EventHandlers();
this.handlers.DetachEvents(e5);
}
this.CmdbarMouseOver=function (event){
var g1=this.GetTarget(event);
if (g1!=null&&g1.tagName=="IMG"&&g1.getAttribute("disabled")!="true"){
g1.style.backgroundColor="cyan";
}
}
this.CmdbarMouseOut=function (event){
var g1=this.GetTarget(event);
if (g1!=null&&g1.tagName=="IMG"){
g1.style.backgroundColor="";
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
var f0=this.GetTopSpread(e5);
var g2=document.getElementById(f0.id+"_textBox");
if (g2!=null&&g2.value!=""){
var e6=window.navigator.userAgent;
var e7=(e6.indexOf("Firefox/3.")>=0);
if (e7&&this.a9!=null)
this.a9.value=this.a9.value+g2.value;
g2.value="";
}
}
this.IsXHTML=function (e5){
var f0=this.GetTopSpread(e5);
var g3=f0.getAttribute("strictMode");
return (g3!=null&&g3=="true");
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
var g4=document.createEvent("Events")
g4.initEvent(name,true,true);
return g4;
}
this.Refresh=function (e5){
var g1=e5.style.display;
e5.style.display="none";
e5.style.display=g1;
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
e5.SetSelectedRange=function (r,c,rc,cc,innerRow){e4.SetSelectedRange(this,r,c,rc,cc,innerRow);}
e5.GetSelectedRanges=function (){return e4.GetSelectedRanges(this);}
e5.AddSelection=function (r,c,rc,cc,innerRow){e4.AddSelection(this,r,c,rc,cc,innerRow);}
e5.AddSpan=function (r,c,rc,cc,spans){e4.AddSpan(this,r,c,rc,cc,spans);}
e5.RemoveSpan=function (r,c,spans){e4.RemoveSpan(this,r,c,spans);}
e5.GetActiveRow=function (){var g1=e4.GetRowFromCell(this,this.d2);if (g1<0)return g1;return e4.GetSheetIndex(this,g1);}
e5.GetActiveCol=function (){return e4.GetColFromCell(this,this.d2);}
e5.SetActiveCell=function (r,c){e4.SetActiveCell(this,r,c);}
e5.GetCellByRowCol=function (r,c){return e4.GetCellByRowCol(this,r,c);}
e5.GetValue=function (r,c){return e4.GetValue(this,r,c);}
e5.SetValue=function (r,c,v,noEvent,recalc){e4.SetValue(this,r,c,v,noEvent,recalc);}
e5.GetFormula=function (r,c){return e4.GetFormula(this,r,c);}
e5.SetFormula=function (r,c,f,recalc,clientOnly){e4.SetFormula(this,r,c,f,recalc,clientOnly);}
e5.GetHiddenValue=function (r,colName){return e4.GetHiddenValue(this,r,colName);}
e5.GetSheetRowIndex=function (r){return e4.GetSheetRowIndex(this,r);}
e5.GetSheetColIndex=function (c,innerRow){return e4.GetSheetColIndex(this,c,innerRow);}
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
e5.GetSpread=function (g1){return e4.GetSpread(g1);}
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
e5.SizeAll=function (){e4.SizeAll(this);}
e5.ShowMessage=function (msg,r,c,time){return e4.ShowMessage(this,msg,r,c,time);}
e5.HideMessage=function (r,c){return e4.HideMessage(this,r,c);}
e5.ProcessKeyMap=function (event){
if (this.keyMap!=null){
var f1=this.keyMap.length;
for (var f2=0;f2<f1;f2++){
var g5=this.keyMap[f2];
if (event.keyCode==g5.key&&event.ctrlKey==g5.ctrl&&event.shiftKey==g5.shift&&event.altKey==g5.alt){
var g6=false;
if (typeof(g5.action)=="function")
g6=g5.action();
else 
g6=eval(g5.action);
return g6;
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
var f0=this.GetTopSpread(e5);
var g2=document.getElementById(f0.id+"_textBox");
if (g2==null)
{
g2=document.createElement("INPUT");
g2.type="text";
g2.setAttribute("autocomplete","off");
g2.style.position="absolute";
g2.style.borderWidth=0;
g2.style.top=""+(e5.clientHeight-20)+"px";
g2.style.left="-100px";
if (e5.style.position!="absolute"&&e5.style.position!="relative")
{
var g7=this.GetOffsetTop(e5,e5,document)+e5.clientHeight;
g2.style.top=g7+"px";
}
g2.style.width="0px";
g2.style.height="1px";
if (e5.tabIndex!=null)
g2.tabIndex=e5.tabIndex;
g2.id=e5.id+"_textBox";
e5.insertBefore(g2,e5.firstChild);
}
}
this.CreateSizebar=function (e5){
e5.sizeBar=document.getElementById(e5.id+"_sizeBar");
if (e5.sizeBar==null&&(e5.frzRows>0||e5.frzCols>0))
{
e5.sizeBar=document.createElement("img");
e5.sizeBar.style.position="absolute";
e5.sizeBar.style.borderWidth=1;
e5.sizeBar.style.top="0px";
e5.sizeBar.style.left="-400px";
e5.sizeBar.style.width="2px";
e5.sizeBar.style.height="400px";
e5.sizeBar.style.background="black";
e5.sizeBar.id=e5.id+"_sizeBar";
var g8=this.GetViewport(e5).parentNode;
g8.insertBefore(e5.sizeBar,null);
}
}
this.CreateLineBorder=function (e5,id){
var g9=document.getElementById(id);
if (g9==null)
{
g9=document.createElement('div');
g9.style.position="absolute";
g9.style.left="-1000px";
g9.style.top="0px";
g9.style.overflow="hidden";
g9.style.border="1px solid black";
if (e5.getAttribute("FocusBorderColor")!=null)
g9.style.borderColor=e5.getAttribute("FocusBorderColor");
if (e5.getAttribute("FocusBorderStyle")!=null)
g9.style.borderStyle=e5.getAttribute("FocusBorderStyle");
g9.id=id;
var g8=this.GetViewport(e5).parentNode;
g8.insertBefore(g9,null);
}
return g9;
}
this.CreateFocusBorder=function (e5){
if (e5.frzRows>0||e5.frzCols>0)return ;
if (this.GetTopSpread(e5).getAttribute("hierView")=="true")return ;
if (this.GetTopSpread(e5).getAttribute("showFocusRect")=="false")return ;
if (this.GetViewport(e5)==null)return ;
var g9=this.CreateLineBorder(e5,e5.id+"_focusRectT");
g9.style.height=0;
g9=this.CreateLineBorder(e5,e5.id+"_focusRectB");
g9.style.height=0;
g9=this.CreateLineBorder(e5,e5.id+"_focusRectL");
g9.style.width=0;
g9=this.CreateLineBorder(e5,e5.id+"_focusRectR");
g9.style.width=0;
}
this.GetPosIndicator=function (e5){
var h0=e5.posIndicator;
if (h0==null)
h0=this.CreatePosIndicator(e5);
else if (h0.parentNode!=e5)
e5.insertBefore(h0,null);
return h0;
}
this.CreatePosIndicator=function (e5){
var h0=document.createElement("img");
h0.style.position="absolute";
h0.style.top="0px";
h0.style.left="-400px";
h0.style.width="10px";
h0.style.height="10px";
h0.style.zIndex=1000;
h0.id=e5.id+"_posIndicator";
if (e5.getAttribute("clienturl")!=null)
h0.src=e5.getAttribute("clienturl")+"down.gif";
else 
h0.src=e5.getAttribute("clienturlres");
e5.insertBefore(h0,null);
e5.posIndicator=h0;
return h0;
}
this.InitSpan=function (e5,e8,spans){
if (e8!=null){
var f6=0;
if (e8==this.GetViewport(e5))
f6=e8.rows.length;
var h1=e8.rows;
var h2=this.GetColCount(e5);
for (var h3=0;h3<h1.length;h3++){
if (this.IsChildSpreadRow(e5,e8,h3)){
if (e8==this.GetViewport(e5))f6--;
}else {
var h4=h1[h3].cells;
for (var h5=0;h5<h4.length;h5++){
var h6=h4[h5];
if (h6!=null&&((h6.rowSpan!=null&&h6.rowSpan>1)||(h6.colSpan!=null&&h6.colSpan>1))){
var h7=this.GetRowFromCell(e5,h6);
var h8=parseInt(h6.getAttribute("scol"));
if (h8<h2){
this.AddSpan(e5,h7,h8,h6.rowSpan,h6.colSpan,spans);
}
}
}
}
}
if (e8==this.GetViewport(e5))e5.setAttribute("rowCount",f6);
}
}
this.GetColWithSpan=function (e5,h3,spans,h5){
var h9=0;
var i0=0;
if (h5==0){
while (this.IsCovered(e5,h3,i0,spans))
{
i0++;
}
}
for (var f2=0;f2<spans.length;f2++){
if (spans[f2].rowCount>1&&(spans[f2].col<=h5||h5==0&&spans[f2].col<i0)&&h3>=spans[f2].row&&h3<spans[f2].row+spans[f2].rowCount)
h9+=spans[f2].colCount;
}
return h9;
}
this.AddSpan=function (e5,h3,h5,rc,h2,spans){
if (spans==null)spans=e5.e0;
var i1=new this.Range();
this.SetRange(i1,"Cell",h3,h5,rc,h2);
spans.push(i1);
this.PaintFocusRect(e5);
}
this.RemoveSpan=function (e5,h3,h5,spans){
if (spans==null)spans=e5.e0;
for (var f2=0;f2<spans.length;f2++){
var i1=spans[f2];
if (i1.row==h3&&i1.col==h5){
var i2=spans.length-1;
for (var i3=f2;i3<i2;i3++){
spans[i3]=spans[i3+1];
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
var i4=this.GetOperationMode(e5);
if (e5.d2==null&&i4!="MultiSelect"&&i4!="ExtendedSelect"&&e5.GetRowCount()>0&&e5.GetColCount()>0){
var i5=this.FireActiveCellChangingEvent(e5,0,0,0);
if (!i5){
e5.SetActiveCell(0,0);
var g4=this.CreateEvent("ActiveCellChanged");
g4.cmdID=e5.id;
g4.row=g4.Row=0;
g4.col=g4.Col=0;
if (e5.getAttribute("LayoutMode"))
g4.InnerRow=g4.innerRow=0;
this.FireEvent(e5,g4);
}
}
var f0=this.GetTopSpread(e5);
var g2=document.getElementById(f0.id+"_textBox");
if (e5.d2!=null){
var i6=this.GetEditor(e5.d2);
if (i6==null){
if (g2!=null){
if (this.b9!=g2){
try {g2.focus();g2.value="";}catch (g4){}
}
}
}else {
if (i6.tagName!="SELECT")i6.focus();
this.SetEditorFocus(i6);
}
}else {
if (g2!=null){
try {g2.focus();g2.value="";}catch (g4){}
}
}
this.EnableButtons(e5);
}
this.GetTotalRowCount=function (e5){
var g1=parseInt(e5.getAttribute("totalRowCount"));
if (isNaN(g1))g1=0;
return g1;
}
this.GetPageCount=function (e5){
var g1=parseInt(e5.getAttribute("pageCount"));
if (isNaN(g1))g1=0;
return g1;
}
this.GetColCount=function (e5){
var g1=parseInt(e5.getAttribute("colCount"));
if (isNaN(g1))g1=0;
return e5.frzCols+g1;
}
this.GetRowCount=function (e5){
var g1=parseInt(e5.getAttribute("rowCount"));
if (isNaN(g1))g1=0;
return g1;
}
this.GetRowCountInternal=function (e5){
var g1=parseInt(this.GetViewport(e5).rows.length);
if (isNaN(g1))g1=0;
return e5.frzRows+g1;
}
this.IsChildSpreadRow=function (e5,view,h3){
if (e5==null||view==null)return false;
if (h3>=1&&h3<view.rows.length){
var i7=view.rows[h3].getAttribute("isCSR");
if (i7!=null){
if (i7=="true")
return true;
else 
return false;
}
if (view.rows[h3].cells.length>0&&view.rows[h3].cells[0]!=null&&view.rows[h3].cells[0].firstChild!=null){
var g1=view.rows[h3].cells[0].firstChild;
if (g1.nodeName!="#text"&&g1.getAttribute("FpSpread")=="Spread"){
view.rows[h3].setAttribute("isCSR","true");
return true;
}
}
view.rows[h3].setAttribute("isCSR","false");
}
return false;
}
this.GetChildSpread=function (e5,row,rindex){
var i8=this.GetViewport(e5);
if (i8!=null){
var h3=this.GetDisplayIndex(e5,row)+1;
if (typeof(rindex)=="number")h3+=rindex;
if (h3>=1&&h3<i8.rows.length){
if (i8.rows[h3].cells.length>0&&i8.rows[h3].cells[0]!=null&&i8.rows[h3].cells[0].firstChild!=null){
var g1=i8.rows[h3].cells[0].firstChild;
if (g1.nodeName!="#text"&&g1.getAttribute("FpSpread")=="Spread"){
return g1;
}
}
}
}
return null;
}
this.GetChildSpreads=function (e5){
var f2=0;
var g6=new Array();
var i8=this.GetViewport(e5);
if (i8!=null){
for (var h3=1;h3<i8.rows.length;h3++){
if (i8.rows[h3].cells.length>0&&i8.rows[h3].cells[0]!=null&&i8.rows[h3].cells[0].firstChild!=null){
var g1=i8.rows[h3].cells[0].firstChild;
if (g1.nodeName!="#text"&&g1.getAttribute("FpSpread")=="Spread"){
g6.length=f2+1;
g6[f2]=g1;
f2++;
}
}
}
}
return g6;
}
this.GetDisplayIndex=function (e5,row){
if (row<0)return -1;
var f2=0;
var h3=0;
var i9=this.GetViewport0(e5);
if (i9==null)i9=this.GetViewport1(e5);
if (i9!=null){
if (row<i9.rows.length){
return row;
}
h3=i9.rows.length;
}
var i8=this.GetViewport(e5);
if (i8!=null){
for (f2=0;f2<i8.rows.length;f2++){
if (this.IsChildSpreadRow(e5,i8,f2))continue ;
if (h3==row)break ;
h3++;
}
}
if (i9!=null)f2+=i9.rows.length;
return f2;
}
this.GetSheetIndex=function (e5,row,c3){
var f2=0
var h3=0;
var i8=c3;
if (i8==null)i8=this.GetViewport(e5);
if (i8!=null){
if (row<0||row>=e5.frzRows+i8.rows.length)return -1;
for (f2=0;f2<row;f2++){
if (this.IsChildSpreadRow(e5,i8,f2))continue ;
h3++;
}
}
return h3;
}
this.GetParentRowIndex=function (e5){
var j0=this.GetParentSpread(e5);
if (j0==null)return -1;
var i8=this.GetViewport(j0);
if (i8==null)return -1;
var j1=e5.parentNode.parentNode;
var f2=j1.rowIndex-1;
for (;f2>0;f2--){
if (this.IsChildSpreadRow(j0,i8,f2))continue ;
else 
break ;
}
return this.GetSheetIndex(j0,f2,i8);
}
this.CreateTestBox=function (e5){
var j2=document.getElementById(e5.id+"_testBox");
if (j2==null)
{
j2=document.createElement("span");
j2.style.position="absolute";
j2.style.borderWidth=0;
j2.style.top="-500px";
j2.style.left="-100px";
j2.id=e5.id+"_testBox";
e5.insertBefore(j2,e5.firstChild);
}
return j2;
}
this.SizeToFit=function (e5,h5){
if (h5==null||h5<0)h5=0;
var e8=this.GetViewport(e5);
if (e8!=null){
var j2=this.CreateTestBox(e5);
var h1=e8.rows;
var j3=0;
for (var h3=0;h3<h1.length;h3++){
if (!this.IsChildSpreadRow(e5,e8,h3)){
var j4=this.GetCellFromRowCol(e5,h3,h5);
if (j4.colSpan>1)continue ;
var j5=this.GetPreferredCellWidth(e5,j4,j2);
if (j5>j3)j3=j5;
}
}
this.SetColWidth(e5,h5,j3);
}
}
this.GetPreferredCellWidth=function (e5,j4,j2){
if (j2==null)j2=this.CreateTestBox(e5);
var j6=this.GetRender(e5,j4);
var j7=this.GetCellType(j4);
var j8=this.GetEditor(j4);
if (j6!=null){
j2.style.fontFamily=j6.style.fontFamily;
j2.style.fontSize=j6.style.fontSize;
j2.style.fontWeight=j6.style.fontWeight;
j2.style.fontStyle=j6.style.fontStyle;
}
if (j6!=null&&j7=="MultiColumnComboBoxCellType"){
var j9=j4.getElementsByTagName("Table")[0];
if (j9!=null){
j2.innerHTML=this.GetEditorValue(j8)+"1";
}
}
else {
j2.innerHTML=j4.innerHTML;
}
var j5=j2.offsetWidth+8;
if (j4.style.paddingLeft!=null&&j4.style.paddingLeft.length>0)
j5+=parseInt(j4.style.paddingLeft);
if (j4.style.paddingRight!=null&&j4.style.paddingRight.length>0)
j5+=parseInt(j4.style.paddingRight);
return j5;
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
this.SynRowHeight=function (e5,c6,e8,h3,updateParent,header){
if (c6==null||e8==null)return ;
var k0=c6.rows[h3].offsetHeight;
var g8=e8.rows[h3].offsetHeight;
if (k0==g8&&h3>0)return ;
var k1=this.IsXHTML(e5);
if (h3==0&&!k1){
k0+=c6.rows[h3].offsetTop;
g8+=e8.rows[h3].offsetTop;
}
if (k1)e8.rows[h3].style.height="";
var k2=Math.max(k0,g8);
if (c6.rows[h3].style.height=="")c6.rows[h3].style.height=""+k0+"px";
if (e8.rows[h3].style.height=="")e8.rows[h3].style.height=""+g8+"px";
if (this.IsChildSpreadRow(e5,e8,h3)){
c6.rows[h3].style.height=k2;
return ;
}
if (k2>0){
if (k1){
if (k2==k0)
e8.rows[h3].style.height=""+(parseInt(e8.rows[h3].style.height)+(k2-g8))+"px";
else 
c6.rows[h3].style.height=""+(parseInt(c6.rows[h3].style.height)+(k2-k0))+"px";
}else {
if (header&&e8.rows.length>=2&&e8.cellSpacing=="0"){
if (h3==0)
if (k2==k0)
e8.rows[h3].style.height=""+(parseInt(e8.rows[h3].style.height)+(k2-g8))+"px";
else 
c6.rows[h3].style.height=""+(parseInt(c6.rows[h3].style.height)+(k2-k0))+"px";
else 
{
if (e5.frzRows>0&&h3==e5.frzRows-1&&c6==this.GetFrozRowHeader(e5)){
k0+=this.GetRowHeader(e5).rows[0].offsetTop;
g8+=this.GetViewport(e5).rows[0].offsetTop;
c6.rows[h3].style.height=""+(parseInt(c6.rows[h3].style.height)+(Math.max(k0,g8)-k0))+"px";
}else {
c6.rows[h3].style.height=""+k2+"px";
e8.rows[h3].style.height=""+k2+"px";
}
}
}else {
if (k2==k0)
e8.rows[h3].style.height=""+(parseInt(e8.rows[h3].style.height)+(k2-g8))+"px";
else 
c6.rows[h3].style.height=""+(parseInt(c6.rows[h3].style.height)+(k2-k0))+"px";
}
}
}
if (updateParent){
var j0=this.GetParentSpread(e5);
if (j0!=null)this.UpdateRowHeight(j0,e5);
}
}
this.SizeAll=function (e5){
var k3=this.GetChildSpreads(e5);
if (k3!=null&&k3.length>0){
for (var f2=0;f2<k3.length;f2++){
this.SizeAll(k3[f2]);
}
}
this.SizeSpread(e5);
if (this.GetParentSpread(e5)!=null)
this.Refresh(e5);
}
this.EnsureAllRowHeights=function (e5){
if (this.GetFrozColHeader(e5)!=null&&this.GetColHeader(e5)!=null){
for (var f2=0;f2<this.GetFrozColHeader(e5).rows.length;f2++){
this.SynRowHeight(e5,this.GetFrozColHeader(e5),this.GetColHeader(e5),f2,false,false);
}
}
if (this.GetFrozColFooter(e5)!=null&&this.GetColFooter(e5)!=null){
for (var f2=0;f2<this.GetFrozColFooter(e5).rows.length;f2++){
this.SynRowHeight(e5,this.GetFrozColFooter(e5),this.GetColFooter(e5),f2,false,false);
}
}
if (this.GetViewport0(e5)!=null&&this.GetViewport1(e5)!=null){
for (var f2=0;f2<this.GetViewport1(e5).rows.length;f2++){
this.SynRowHeight(e5,this.GetViewport0(e5),this.GetViewport1(e5),f2,false,false);
this.SynRowHeight(e5,this.GetViewport0(e5),this.GetViewport1(e5),f2,false,false);
}
}
if (this.GetViewport(e5)!=null&&this.GetViewport2(e5)!=null){
for (var f2=0;f2<this.GetViewport(e5).rows.length;f2++){
this.SynRowHeight(e5,this.GetViewport2(e5),this.GetViewport(e5),f2,false,false);
this.SynRowHeight(e5,this.GetViewport2(e5),this.GetViewport(e5),f2,false,false);
}
}
if (this.GetFrozRowHeader(e5)!=null){
for (var f2=0;f2<this.GetViewport1(e5).rows.length;f2++){
this.SynRowHeight(e5,this.GetFrozRowHeader(e5),this.GetViewport1(e5),f2,false,true);
this.SynRowHeight(e5,this.GetFrozRowHeader(e5),this.GetViewport0(e5),f2,false,true);
}
}
if (this.GetRowHeader(e5)!=null){
for (var f2=0;f2<this.GetViewport(e5).rows.length;f2++){
this.SynRowHeight(e5,this.GetRowHeader(e5),this.GetViewport(e5),f2,false,true);
this.SynRowHeight(e5,this.GetRowHeader(e5),this.GetViewport2(e5),f2,false,true);
}
}
if (this.GetFrozColHeader(e5)!=null&&this.GetColHeader(e5)!=null){
for (var f2=0;f2<this.GetFrozColHeader(e5).rows.length;f2++){
this.SynRowHeight(e5,this.GetFrozColHeader(e5),this.GetColHeader(e5),f2,false,false);
}
}
if (this.GetViewport0(e5)!=null&&this.GetViewport1(e5)!=null){
for (var f2=0;f2<this.GetViewport1(e5).rows.length;f2++){
this.SynRowHeight(e5,this.GetViewport0(e5),this.GetViewport1(e5),f2,false,false);
this.SynRowHeight(e5,this.GetViewport0(e5),this.GetViewport1(e5),f2,false,false);
}
}
if (this.GetViewport(e5)!=null&&this.GetViewport2(e5)!=null){
for (var f2=0;f2<this.GetViewport(e5).rows.length;f2++){
this.SynRowHeight(e5,this.GetViewport2(e5),this.GetViewport(e5),f2,false,false);
this.SynRowHeight(e5,this.GetViewport2(e5),this.GetViewport(e5),f2,false,false);
}
}
if (this.GetFrozRowHeader(e5)!=null){
for (var f2=0;f2<this.GetViewport1(e5).rows.length;f2++){
this.SynRowHeight(e5,this.GetFrozRowHeader(e5),this.GetViewport1(e5),f2,false,true);
this.SynRowHeight(e5,this.GetFrozRowHeader(e5),this.GetViewport0(e5),f2,false,true);
}
}
if (this.GetRowHeader(e5)!=null){
for (var f2=0;f2<this.GetViewport(e5).rows.length;f2++){
this.SynRowHeight(e5,this.GetRowHeader(e5),this.GetViewport(e5),f2,false,true);
this.SynRowHeight(e5,this.GetRowHeader(e5),this.GetViewport2(e5),f2,false,true);
}
}
if (this.GetCorner(e5)!=null){
if (this.GetCorner(e5).getAttribute("allowTableCorner")!=null){
if (this.GetCorner(e5)!=null&&this.GetColHeader(e5)!=null){
for (var f2=0;f2<this.GetCorner(e5).rows.length;f2++){
this.SynRowHeight(e5,this.GetCorner(e5),this.GetColHeader(e5),f2,false,false);
}
}
if (this.GetFrozColHeader(e5)!=null&&this.GetCorner(e5)!=null){
for (var f2=0;f2<this.GetCorner(e5).rows.length;f2++){
this.SynRowHeight(e5,this.GetCorner(e5),this.GetFrozColHeader(e5),f2,false,false);
}
}
if (this.GetCorner(e5)!=null&&this.GetColHeader(e5)!=null){
for (var f2=0;f2<this.GetCorner(e5).rows.length;f2++){
this.SynRowHeight(e5,this.GetCorner(e5),this.GetColHeader(e5),f2,false,false);
}
}
if (this.GetFrozColHeader(e5)!=null&&this.GetCorner(e5)!=null){
for (var f2=0;f2<this.GetCorner(e5).rows.length;f2++){
this.SynRowHeight(e5,this.GetCorner(e5),this.GetFrozColHeader(e5),f2,false,false);
}
}
}
}
}
this.SizeSpread=function (e5,skipRowHeight){
if (e5.clientHeight==0||e5.clientWidth==0)return ;
var k1=this.IsXHTML(e5);
var c3=this.GetViewport(e5);
if (c3==null)return ;
if (skipRowHeight==null)this.EnsureAllRowHeights(e5);
var c7=this.GetColHeader(e5);
var k4=this.GetColGroup(c3);
var k5=this.GetColGroup(c7);
if (k4!=null&&k4.childNodes.length>0&&k5!=null&&k5.childNodes.length>0){
var k6=-1;
if (this.b5!=null)k6=parseInt(this.b5.getAttribute("index"));
if ((this.b5==null||k6==0)&&e5.frzCols>=0)
{
k5.childNodes[0].width=(k4.childNodes[0].offsetLeft+k4.childNodes[0].offsetWidth-c3.cellSpacing);
}
}
var k7=this.GetFrozColHeader(e5);
if (k4!=null&&k4.childNodes.length>0&&k7!=null){
var k8=0;
var k9=this.GetColGroup(this.GetViewport2(e5));
for (var f2=0;f2<k9.childNodes.length;f2++)k8+=k9.childNodes[f2].offsetWidth;
k7.parentNode.parentNode.style.width=""+(k8+k4.childNodes[0].offsetLeft)+"Px";
}
this.SyncMsgs(e5);
if (e5.frzCols>0){
var l0=this.GetFrozColHeader(e5);
if (l0!=null){
var l1=parseInt(l0.parentNode.parentNode.style.width);
if (l0!=null)
l0.parentNode.style.width=""+l1+"px";
var l2=this.GetFrozColFooter(e5);
if (l2!=null)
l2.parentNode.style.width=""+l1+"px";
}
}
if (skipRowHeight==null)this.EnsureAllRowHeights(e5);
var c6=this.GetRowHeader(e5);
var c7=this.GetColHeader(e5);
var l3=this.GetColFooter(e5);
var j0=this.GetParentSpread(e5);
if (j0!=null)this.UpdateRowHeight(j0,e5);
var k2=e5.clientHeight;
var l4=this.IsStaticPos(e5);
var l5=this.GetCommandBar(e5);
if (l5!=null)
{
l5.style.width=""+e5.clientWidth+"px";
if (l4){
l5.parentNode.style.borderTop="1px solid white";
l5.parentNode.style.backgroundColor=l5.style.backgroundColor;
}
var l6=this.GetElementById(l5,e5.id+"_cmdTable");
if (l6!=null){
if (l4&&(l6.style.height==""||parseInt(l6.style.height)<27)){
l6.style.height=""+(l6.offsetHeight+3)+"px";
}
if (!k1&&parseInt(c3.cellSpacing)>0)
l6.parentNode.style.height=""+(l6.offsetHeight+3)+"px";
k2-=Math.max(l6.parentNode.offsetHeight,l6.offsetHeight);
}
if (l6.offsetHeight>l6.parentNode.offsetHeight)k2+=2;
if (l4)
l5.style.position="";
}
var c7=this.GetColHeader(e5);
if (c7!=null)
{
if (!e5.initialized)
c7.parentNode.style.height=""+(c7.offsetHeight-parseInt(c7.cellSpacing))+"px";
k2-=c7.parentNode.offsetHeight;
}
var l3=this.GetColFooter(e5);
if (l3!=null)
{
k2-=l3.offsetHeight;
l3.parentNode.style.height=""+(l3.offsetHeight)+"px";
}
var c9=this.GetHierBar(e5);
if (c9!=null)
{
k2-=c9.offsetHeight;
}
var l7=this.GetGroupBar(e5);
if (l7!=null){
k2-=l7.offsetHeight;
}
var d0=this.GetPager1(e5);
if (d0!=null)
{
k2-=d0.offsetHeight;
this.InitSlideBar(e5,d0);
}
if (!k1&&e5.frzRows>0&&c6){
var k0=c6.rows[0].offsetTop;
var g8=this.GetViewport(e5).rows[0].offsetTop;
k2-=(g8-k0);
}
var l8=(e5.getAttribute("cmdTop")=="true");
var d1=this.GetPager2(e5);
if (d1!=null)
{
d1.style.width=""+(e5.clientWidth-10)+"px";
k2-=Math.max(d1.offsetHeight,28);
this.InitSlideBar(e5,d1);
}
var l9=null;
if (c6!=null)l9=c6.parentNode;
var m0=null;
if (c7!=null)m0=c7.parentNode;
var m1=null;
if (l3!=null)m1=l3.parentNode;
var m2=this.GetFooterCorner(e5);
if (m1!=null)
{
m1.style.height=""+l3.offsetHeight-parseInt(c3.cellSpacing)+"px";
if (m2!=null){
m2.parentNode.style.height=m1.style.height;
}
}
if (m2!=null&&!k1)
m2.width=""+(m2.parentNode.offsetWidth+parseInt(c3.cellSpacing))+"px";
var c5=this.GetCorner(e5);
if (m0!=null)
{
if (!e5.initialized)
m0.style.height=""+c7.offsetHeight-parseInt(c3.cellSpacing)+"px";
if (c5!=null){
c5.parentNode.style.height=m0.style.height;
}
}
if (c5!=null&&!k1)
c5.width=""+(c5.parentNode.offsetWidth+parseInt(c3.cellSpacing))+"px";
var m3=0;
if (this.GetColFooter(e5)){
m3=this.GetColFooter(e5).offsetHeight;
}
if (l5!=null&&!l8){
if (d1!=null){
if (!l4){
l5.style.position="absolute";
l5.style.top=""+(e5.clientHeight-Math.max(d1.offsetHeight,28)-l5.offsetHeight)+"px";
}else {
l5.style.position="absolute";
l5.style.top=""+(c3.parentNode.offsetTop+m3+c3.parentNode.offsetHeight)+"px";
}
}else {
if (!l4){
l5.style.position="absolute";
l5.style.top=""+(e5.clientHeight-l5.offsetHeight)+"px";
}else {
l5.style.position="absolute";
if (d1!=null)
l5.style.top=""+(this.GetOffsetTop(e5,e5,document.body)+e5.clientHeight-Math.max(d1.offsetHeight,28)-l5.offsetHeight)+"px";
else 
l5.style.top=""+(this.GetOffsetTop(e5,e5,document.body)+e5.clientHeight-l5.offsetHeight+1)+"px";
}
}
}
if (d1!=null)
{
if (!l4){
d1.style.position="absolute";
d1.style.top=""+(e5.clientHeight-Math.max(d1.offsetHeight,28))+"px";
}else {
d1.style.position="absolute";
if (l5!=null&&!l8)
d1.style.top=""+(c3.parentNode.offsetTop+c3.parentNode.offsetHeight+l5.offsetHeight+m3)+"px";
else 
d1.style.top=""+(c3.parentNode.offsetTop+c3.parentNode.offsetHeight+m3)+"px";
}
}
var m4=this.GetViewport0(e5);
var m5=this.GetViewport1(e5);
var m6=this.GetViewport2(e5);
if (m5!=null){
m5.parentNode.style.height=""+Math.max(0,m5.offsetHeight-m5.cellSpacing)+"px";
if (m4!=null){
m4.parentNode.style.height=m5.parentNode.style.height;
m4.parentNode.style.width=""+(m4.offsetWidth-m4.cellSpacing)+"px"
}
}
if (m6!=null){
m6.parentNode.style.width=""+(m6.offsetWidth-m6.cellSpacing)+"px"
}
var m7=this.GetFrozRowHeader(e5);
if (m7!=null){
var m8=m7.offsetHeight-m7.cellSpacing;
m7.parentNode.style.height=""+Math.max(0,m8)+"px";
}
var m9=e5.clientWidth;
if (c6!=null)m9-=c6.parentNode.offsetWidth;
if (m6!=null)m9-=m6.offsetWidth;
else if (m4!=null)m9-=m4.offsetWidth;
if (m4!=null)k2-=m4.offsetHeight;
else if (m5!=null)k2-=m5.offsetHeight;
if (e5.frzRows>0)k2+=parseInt(c3.cellSpacing);
if (!k1)k2+=parseInt(c3.cellSpacing);
k2-=1;
var n0=document.getElementById(e5.id+"_titleBar");
if (n0)k2-=n0.parentNode.parentNode.offsetHeight;
c3.parentNode.style.height=""+Math.max(k2,1)+"px";
if (e5.frzCols>0)m9+=parseInt(c3.cellSpacing);
c3.parentNode.style.width=""+(m9+parseInt(c3.cellSpacing))+"px";
if (m5!=null){
m5.parentNode.style.width=""+(c3.parentNode.clientWidth)+"px";
}
if (m6!=null)m6.parentNode.style.height=""+(c3.parentNode.clientHeight)+"px";
if (l9!=null){
l9.style.height=""+Math.max(c3.parentNode.offsetHeight,1)+"px";
}
if (this.GetParentSpread(e5)==null&&m0!=null&&l9!=null&&e5.frzCols==0){
var j5=0;
if (l9!=null){
j5=Math.max(e5.clientWidth-l9.offsetWidth,1);
}else {
j5=Math.max(e5.clientWidth,1);
}
m0.style.width=j5;
m0.parentNode.style.width=j5;
}
this.ScrollView(e5);
this.PaintFocusRect(e5);
if (c3&&!c6&&!m4&&!m5&&!m6){
c3.parentNode.parentNode.parentNode.style.height=""+c3.parentNode.offsetHeight+"px";
}
}
this.IsStaticPos=function (e5){
var l4=(e5.style.position!="absolute"&&e5.style.position!="relative");
if (l4&&document.defaultView!=null&&document.defaultView.getComputedStyle!=null){
var n1=document.defaultView.getComputedStyle(e5,'').getPropertyValue("position");
l4=(n1!="absolute"&&n1!="relative");
}
return l4;
}
this.InitSlideBar=function (e5,pager){
var n2=this.GetElementById(pager,e5.id+"_slideBar");
if (n2!=null){
var k1=this.IsXHTML(e5);
if (k1)
n2.style.height=Math.max(pager.offsetHeight,28)+"px";
else 
n2.style.height=(pager.offsetHeight-2)+"px";
var g1=pager.getElementsByTagName("TABLE");
if (g1!=null&&g1.length>0){
var n3=g1[0].rows[0];
var h8=n3.cells[0];
var n4=n3.cells[2];
e5.slideLeft=Math.max(107,h8.offsetWidth+1);
if (h8.style.paddingRight!="")e5.slideLeft+=parseInt(h8.style.paddingRight);
e5.slideRight=pager.offsetWidth-n4.offsetWidth-n2.offsetWidth-3;
if (n4.style.paddingRight!="")e5.slideRight-=parseInt(n4.style.paddingLeft);
var n5=parseInt(pager.getAttribute("curPage"));
var n6=parseInt(pager.getAttribute("totalPage"))-1;
if (n6==0)n6=1;
var n7=false;
var m9=Math.max(107,e5.slideLeft)+(n5/n6)*(e5.slideRight-e5.slideLeft);
if (pager.id.indexOf("pager1")>=0&&e5.style.position!="absolute"&&e5.style.position!="relative"){
m9+=this.GetOffsetLeft(e5,pager,document);
var g7=(this.GetOffsetTop(e5,h8,pager)+this.GetOffsetTop(e5,pager,document));
n2.style.top=g7+"px";
n7=true;
}
var n0=document.getElementById(e5.id+"_titleBar");
if (pager.id.indexOf("pager1")>=0&&!n7&&n0!=null){
var g7=n0.parentNode.parentNode.offsetHeight;
n2.style.top=g7+"px";
}
n2.style.left=m9+"px";
}
}
}
this.InitLayout=function (e5){
this.SizeSpread(e5);
this.SizeSpread(e5);
}
this.GetRowByKey=function (e5,key){
if (key=="-1")
return -1;
var n8=this.GetViewport1(e5);
if (n8!=null){
var n9=n8.rows.length;
var h1=n8.rows;
for (var j1=0;j1<n9;j1++){
if (h1[j1].getAttribute("FpKey")==key){
return j1;
}
}
}
var o0=this.GetViewport(e5);
if (o0!=null){
var n9=o0.rows.length;
var h1=o0.rows;
for (var j1=0;j1<n9;j1++){
if (h1[j1].getAttribute("FpKey")==key){
if (n8!=null)j1+=n8.rows.length;
return j1;
}
}
}
if (o0!=null)
return 0;
else 
return -1;
}
this.GetColByKey=function (e5,key){
if (key=="-1")
return -1;
var o1=null;
var n8=this.GetViewport0(e5);
if (n8==null||n8.rows.length==0)n8=this.GetViewport2(e5);
if (n8!=null){
o1=this.GetColGroup(n8);
if (o1!=null){
for (var o2=0;o2<o1.childNodes.length;o2++){
var g1=o1.childNodes[o2];
if (g1.getAttribute("FpCol")==key){
return o2;
}
}
}
}
var o0=this.GetViewport(e5);
var f4=this.GetColGroup(o0);
if (f4==null||f4.childNodes.length==0)
f4=this.GetColGroup(this.GetColHeader(e5));
if (f4!=null){
for (var o2=0;o2<f4.childNodes.length;o2++){
var g1=f4.childNodes[o2];
if (g1.getAttribute("FpCol")==key){
if (o1!=null){
o2+=o1.childNodes.length;
}
return o2;
}
}
}
return 0;
}
this.IsRowSelected=function (e5,j1){
var o3=this.GetSelection(e5);
if (o3!=null){
var o4=o3.firstChild;
while (o4!=null){
var h3;
var n9;
var o5=this.GetOperationMode(e5);
if (e5.getAttribute("LayoutMode")&&(o5=="ExtendedSelect"||o5=="MultiSelect")){
var o6=parseInt(o4.getAttribute("row"));
h3=this.GetFirstRowFromKey(e5,o6);
}
else 
h3=parseInt(o4.getAttribute("rowIndex"));
if (e5.getAttribute("LayoutMode")&&(o5=="ExtendedSelect"||o5=="MultiSelect"))
n9=parseInt(e5.getAttribute("layoutrowcount"));
else 
n9=parseInt(o4.getAttribute("rowcount"));
if (h3<=j1&&j1<h3+n9)
return true;
o4=o4.nextSibling;
}
}
}
this.InitSelection=function (e5){
var h3=0;
var h5=0;
var f7=this.GetData(e5);
var f8=f7.getElementsByTagName("root")[0];
var o7=f8.getElementsByTagName("state")[0];
var o3=o7.getElementsByTagName("selection")[0];
var o8=o7.firstChild;
while (o8!=null&&o8.tagName!="activerow"&&o8.tagName!="ACTIVEROW"){
o8=o8.nextSibling;
}
if (o8!=null&&!e5.getAttribute("LayoutMode"))
h3=this.GetRowByKey(e5,o8.innerHTML);
if (h3>=this.GetRowCount(e5))h3=0;
var o9=o7.firstChild;
while (o9!=null&&o9.tagName!="activecolumn"&&o9.tagName!="ACTIVECOLUMN"){
o9=o9.nextSibling;
}
if (o9!=null&&!e5.getAttribute("LayoutMode"))
h5=this.GetColByKey(e5,o9.innerHTML);
if (e5.getAttribute("LayoutMode")&&o8!=null&&o9!=null){
h3=parseInt(o8.innerHTML);
h5=parseInt(o9.innerHTML);
var h6;
if (h3!=-1&&h5!=-1)h6=this.GetCellByRowCol2(e5,o8.innerHTML,o9.innerHTML);
if (h6){
h3=this.GetRowFromCell(e5,h6);
h5=this.GetColFromCell(e5,h6);
}
}
if (h3<0)h3=0;
if (h3>=0||h5>=0){
var p0=f7;
if (this.GetParentSpread(e5)!=null){
var p1=this.GetTopSpread(e5);
if (p1.initialized)p0=this.GetData(p1);
f8=p0.getElementsByTagName("root")[0];
}
var p2=f8.getElementsByTagName("activechild")[0];
e5.d4=h3;e5.d5=h5;
if ((this.GetParentSpread(e5)==null&&(p2==null||p2.innerHTML==""))||(p2!=null&&e5.id==this.Trim(p2.innerHTML))){
this.UpdateAnchorCell(e5,h3,h5);
}else {
e5.d2=this.GetCellFromRowCol(e5,h3,h5);
}
}
var o4=o3.firstChild;
while (o4!=null){
var h3=0;
var h5=0;
if (e5.getAttribute("LayoutMode")&&o4.getAttribute("row")!="-1"&&o4.getAttribute("col")!="-1"){
var h6=this.GetCellByRowCol2(e5,o4.getAttribute("row"),o4.getAttribute("col"));
if (h6){
h3=this.GetRowFromCell(e5,h6);
h5=this.GetColFromCell(e5,h6);
}
}
else if (e5.getAttribute("LayoutMode")&&o4.getAttribute("col")!="-1"&&o4.getAttribute("row")=="-1"&&o4.getAttribute("rowcount")=="-1"){
var j1=this.GetRowTemplateRowFromGroupCell(e5,parseInt(o4.getAttribute("col")));
var h6=this.GetCellByRowCol2(e5,j1,parseInt(o4.getAttribute("col")));
if (h6){
h3=parseInt(h6.parentNode.getAttribute("row"));
h5=this.GetColFromCell(e5,h6);
}
}
else {
h3=this.GetRowByKey(e5,o4.getAttribute("row"));
h5=this.GetColByKey(e5,o4.getAttribute("col"));
}
var n9=parseInt(o4.getAttribute("rowcount"));
var h2=parseInt(o4.getAttribute("colcount"));
o4.setAttribute("rowIndex",h3);
o4.setAttribute("colIndex",h5);
if (e5.getAttribute("LayoutMode")&&o4.getAttribute("col")>=0&&o4.getAttribute("row")>=0&&(o4.getAttribute("rowcount")>=1||o4.getAttribute("colcount")>=1)){
var p3=o4.nextSibling;
if (parseInt(o4.getAttribute("row"))!=parseInt(o8.innerHTML)||parseInt(o4.getAttribute("col"))!=parseInt(o9.innerHTML))o3.removeChild(o4);
o4=p3;
continue ;
}
if (e5.getAttribute("LayoutMode")&&o4.getAttribute("col")=="-1"&&o4.getAttribute("row")!=-1){
n9=parseInt(e5.getAttribute("layoutrowcount"));
}
if (e5.getAttribute("LayoutMode")&&o4.getAttribute("col")!="-1"&&o4.getAttribute("row")=="-1"&&o4.getAttribute("rowcount")=="-1")
this.PaintMultipleRowSelection(e5,h3,h5,1,1,true);
else 
this.PaintSelection(e5,h3,h5,n9,h2,true);
o4=o4.nextSibling;
}
this.PaintFocusRect(e5);
}
this.TranslateKeyPress=function (event){
if (event.ctrlKey&&!event.altKey){
this.TranslateKey(event);
}
var e5=this.GetPageActiveSpread();
if (e5!=null&&!this.editing&&event.keyCode==event.DOM_VK_RETURN)this.CancelDefault(event);
}
this.TranslateKey=function (event){
event=this.GetEvent(event);
var p4=this.GetTarget(event);
try {
if (document.readyState!=null&&document.readyState!="complete")return ;
var e5=this.GetPageActiveSpread();
if (e5==null)return ;
if (typeof(e5.getAttribute("mcctCellType"))!="undefined"&&e5.getAttribute("mcctCellType")=="true")return ;
if (this.GetOperationMode(e5)=="RowMode"&&this.GetEnableRowEditTemplate(e5)=="true"&&this.IsInRowEditTemplate(e5,p4))return ;
if (e5!=null){
if (event.keyCode==229){
this.CancelDefault(event);
return ;
}
if (p4.tagName!="HTML"&&!this.IsChild(p4,this.GetTopSpread(e5)))return ;
this.KeyDown(e5,event);
var p5=false;
if (event.keyCode==event.DOM_VK_TAB){
var p6=this.GetProcessTab(e5);
p5=(p6=="true"||p6=="True");
}
if (p5)
this.CancelDefault(event);
}
}catch (g4){}
}
this.IsInRowEditTemplate=function (e5,p4){
while (p4&&p4.parentNode){
p4=p4.parentNode;
if (p4.tagName=="DIV"&&p4.id==e5.id+"_RowEditTemplateContainer")
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
var f1=e5.keyMap.length;
for (var f2=0;f2<f1;f2++){
var g5=e5.keyMap[f2];
if (g5!=null&&g5.key==keyCode&&g5.ctrl==ctrl&&g5.shift==shift&&g5.alt==alt){
for (var i3=f2+1;i3<f1;i3++){
e5.keyMap[i3-1]=e5.keyMap[i3];
}
e5.keyMap.length=e5.keyMap.length-1;
break ;
}
}
}
this.AddKeyMap=function (e5,keyCode,ctrl,shift,alt,action){
if (e5.keyMap==null)e5.keyMap=new Array();
var g5=this.GetKeyAction(e5,keyCode,ctrl,shift,alt);
if (g5!=null){
g5.action=action;
}else {
var f1=e5.keyMap.length;
e5.keyMap.length=f1+1;
e5.keyMap[f1]=new this.KeyAction(keyCode,ctrl,shift,alt,action);
}
}
this.GetKeyAction=function (e5,keyCode,ctrl,shift,alt){
if (e5.keyMap==null)e5.keyMap=new Array();
var f1=e5.keyMap.length;
for (var f2=0;f2<f1;f2++){
var g5=e5.keyMap[f2];
if (g5!=null&&g5.key==keyCode&&g5.ctrl==ctrl&&g5.shift==shift&&g5.alt==alt){
return g5;
}
}
return null;
}
this.MoveToPrevCell=function (e5){
var p7=this.EndEdit(e5);
if (!p7)return ;
var h3=e5.GetActiveRow();
var h5=e5.GetActiveCol();
this.MoveLeft(e5,h3,h5);
}
this.MoveToNextCell=function (e5){
var p7=this.EndEdit(e5);
if (!p7)return ;
var h3=e5.GetActiveRow();
var h5=e5.GetActiveCol();
this.MoveRight(e5,h3,h5);
}
this.MoveToNextRow=function (e5){
var p7=this.EndEdit(e5);
if (!p7)return ;
var h3=e5.GetActiveRow();
var h5=e5.GetActiveCol();
this.MoveDown(e5,h3,h5);
}
this.MoveToPrevRow=function (e5){
var p7=this.EndEdit(e5);
if (!p7)return ;
var h3=e5.GetActiveRow();
var h5=e5.GetActiveCol();
if (h3>0)
this.MoveUp(e5,h3,h5);
}
this.MoveToFirstColumn=function (e5){
var p7=this.EndEdit(e5);
if (!p7)return ;
var h3=e5.GetActiveRow();
if (e5.d2.parentNode.rowIndex>=0)
this.UpdateLeadingCell(e5,h3,0);
}
this.MoveToLastColumn=function (e5){
var p7=this.EndEdit(e5);
if (!p7)return ;
var h3=e5.GetActiveRow();
if (e5.d2.parentNode.rowIndex>=0){
h5=this.GetColCount(e5)-1;
this.UpdateLeadingCell(e5,h3,h5);
}
}
this.UpdatePostbackData=function (e5){
this.SaveData(e5);
}
this.PrepareData=function (o4){
var g6="";
if (o4!=null){
if (o4.nodeName=="#text")
g6=o4.nodeValue;
else {
g6=this.GetBeginData(o4);
var g1=o4.firstChild;
while (g1!=null){
var p8=this.PrepareData(g1);
if (p8!="")g6+=p8;
g1=g1.nextSibling;
}
g6+=this.GetEndData(o4);
}
}
return g6;
}
this.GetBeginData=function (o4){
var g6="<"+o4.nodeName.toLowerCase();
if (o4.attributes!=null){
for (var f2=0;f2<o4.attributes.length;f2++){
var p9=o4.attributes[f2];
if (p9.nodeName!=null&&p9.nodeName!=""&&p9.nodeName!="style"&&p9.nodeValue!=null&&p9.nodeValue!="")
g6+=(" "+p9.nodeName+"=\""+p9.nodeValue+"\"");
}
}
g6+=">";
return g6;
}
this.GetEndData=function (o4){
return "</"+o4.nodeName.toLowerCase()+">";
}
this.SaveData=function (e5){
if (e5==null)return ;
try {
var f7=this.GetData(e5);
var f8=f7.getElementsByTagName("root")[0];
var g1=this.PrepareData(f8);
var q0=document.getElementById(e5.id+"_data");
q0.value=encodeURIComponent(g1);
}catch (g4){
alert("e "+g4);
}
}
this.SetActiveSpread=function (event){
try {
event=this.GetEvent(event);
var p4=this.GetTarget(event);
var q1=this.GetSpread(p4,false);
var q2=this.GetPageActiveSpread();
if (this.editing&&(q1==null||(q1!=q2&&q1.getAttribute("mcctCellType")!="true"&&q2.getAttribute("mcctCellType")!="true"))){
if (p4!=this.a9&&this.a9!=null){
if (this.a9.blur!=null)this.a9.blur();
}
var p7=this.EndEdit();
if (!p7)return ;
}
var q3=false;
if (q1==null){
q1=this.GetSpread(p4,true);
q3=(q1!=null);
}
var h6=this.GetCell(p4,true);
if (h6==null&&q2!=null&&q2.e3){
this.SaveData(q2);
q2.e3=false;
}
if (q2!=null&&q2.e3&&(q1!=q2||q1==null||q3)){
this.SaveData(q2);
q2.e3=false;
}
if (q2!=null&&q2.e3&&q1==q2&&p4.tagName=="INPUT"&&(p4.type=="submit"||p4.type=="button"||p4.type=="image")){
this.SaveData(q2);
q2.e3=false;
}
if (q1!=null&&this.GetOperationMode(q1)=="ReadOnly")return ;
var p1=null;
if (q1==null){
if (q2==null)return ;
p1=this.GetTopSpread(q2);
this.SetActiveSpreadID(p1,"",null,false);
this.SetPageActiveSpread(null);
}else {
if (q1!=q2){
if (q2!=null){
p1=this.GetTopSpread(q2);
this.SetActiveSpreadID(p1,"",null,false);
}
if (q3){
p1=this.GetTopSpread(q1);
var q4=this.GetTopSpread(q2);
if (p1!=q4){
this.SetActiveSpreadID(p1,q1.id,q1.id,true);
this.SetPageActiveSpread(q1);
}else {
this.SetActiveSpreadID(p1,q2.id,q2.id,true);
this.SetPageActiveSpread(q2);
}
}else {
p1=this.GetTopSpread(q1);
this.SetPageActiveSpread(q1);
this.SetActiveSpreadID(p1,q1.id,q1.id,false);
}
}
}
}catch (g4){}
}
this.SetActiveSpreadID=function (e5,id,child,q3){
var f7=this.GetData(e5);
var f8=f7.getElementsByTagName("root")[0];
var f9=f8.getElementsByTagName("activespread")[0];
var q5=f8.getElementsByTagName("activechild")[0];
if (f9==null)return ;
if (q3&&q5!=null&&q5.nodeValue!=""){
f9.innerHTML=q5.innerHTML;
}else {
f9.innerHTML=id;
if (child!=null&&q5!=null)q5.innerHTML=child;
}
this.SaveData(e5);
e5.e3=false;
}
this.GetSpread=function (ele,incCmdBar){
var j5=ele;
while (j5!=null&&j5.tagName!="BODY"){
if (typeof(j5.getAttribute)!="function")break ;
var e5=j5.getAttribute("FpSpread");
if (e5==null)e5=j5.FpSpread;
if (e5=="Spread"){
if (!incCmdBar){
var g1=ele;
while (g1!=null&&g1!=j5){
if (g1.id==j5.id+"_commandBar"||g1.id==j5.id+"_pager1"||g1.id==j5.id+"_pager2")return null;
g1=g1.parentNode;
}
}
return j5;
}
j5=j5.parentNode;
}
return null;
}
this.GetActiveChildSheetView=function (e5){
var q2=this.GetPageActiveSheetView();
if (typeof(q2)=="undefined")return null;
var p1=this.GetTopSpread(e5);
var q6=this.GetTopSpread(q2);
if (q6!=p1)return null;
if (q2==q6)return null;
return q2;
}
this.ScrollViewport=function (event){
var g1=this.GetTarget(event);
var e5=this.GetTopSpread(g1);
if (e5!=null)this.ScrollView(e5);
}
this.ScrollTo=function (e5,j1,o2){
var h6=this.GetCellByRowCol(e5,j1,o2);
if (h6==null)return ;
var i8=this.GetViewport(e5).parentNode;
if (i8==null)return ;
i8.scrollTop=h6.offsetTop;
i8.scrollLeft=h6.offsetLeft;
}
this.ScrollView=function (e5){
var q1=this.GetTopSpread(e5);
var c6=this.GetParent(this.GetRowHeader(q1));
var c7=this.GetParent(this.GetColHeader(q1));
var l3=this.GetParent(this.GetColFooter(q1));
var i8=this.GetParent(this.GetViewport(q1));
var q7=false;
if (c6!=null){
q7=(c6.scrollTop!=i8.scrollTop);
c6.scrollTop=i8.scrollTop;
}
if (c7!=null){
if (!q7)q7=(c7.scrollLeft!=i8.scrollLeft);
c7.scrollLeft=i8.scrollLeft;
}
if (l3!=null){
if (!q7)q7=(l3.scrollLeft!=i8.scrollLeft);
l3.scrollLeft=i8.scrollLeft;
}
var q8=this.GetViewport0(e5);
var q9=this.GetViewport1(e5);
var r0=this.GetViewport2(e5);
if (r0!=null){
r0.parentNode.scrollTop=i8.scrollTop;
}
if (q9!=null){
q9.parentNode.scrollLeft=i8.scrollLeft;
}
if (this.GetParentSpread(e5)==null)this.SaveScrollbarState(e5,i8.scrollTop,i8.scrollLeft);
if (q7){
var g4=this.CreateEvent("Scroll");
this.FireEvent(e5,g4);
if (e5.frzRows!=0||e5.frzCols!=0)this.SyncMsgs(e5);
}
if (i8.scrollTop>0&&i8.scrollTop+i8.offsetHeight>=this.GetViewport(q1).offsetHeight){
if (e5.initialized&&!this.editing&&e5.getAttribute("loadOnDemand")=="true"){
if (e5.LoadState!=null)return ;
e5.LoadState=true;
this.SaveData(e5);
setTimeout(e5.CallBack("LoadOnDemand",true),0);
}
}
}
this.SaveScrollbarState=function (e5,scrollTop,scrollLeft){
if (this.GetParentSpread(e5)!=null)return ;
var f7=this.GetData(e5);
var f8=f7.getElementsByTagName("root")[0];
var r1=f8.getElementsByTagName("scrollTop")[0];
var r2=f8.getElementsByTagName("scrollLeft")[0];
if (e5.getAttribute("scrollContent"))
if (r1!=null&&r2!=null)
if (r1.innerHTML!=scrollTop||r2.innerHTML!=scrollLeft)
this.ShowScrollingContent(e5,r1.innerHTML==scrollTop);
if (r1!=null)r1.innerHTML=scrollTop;
if (r2!=null)r2.innerHTML=scrollLeft;
}
this.LoadScrollbarState=function (e5){
if (this.GetParentSpread(e5)!=null)return ;
var f7=this.GetData(e5);
var f8=f7.getElementsByTagName("root")[0];
var r1=f8.getElementsByTagName("scrollTop")[0];
var r2=f8.getElementsByTagName("scrollLeft")[0];
var r3=0;
if (r1!=null&&r1.innerHTML!=""){
r3=parseInt(r1.innerHTML);
}else {
r3=0;
}
var r4=0;
if (r2!=null&&r2.innerHTML!=""){
r4=parseInt(r2.innerHTML);
}else {
r4=0;
}
var i8=this.GetParent(this.GetViewport(e5));
if (i8!=null){
if (!isNaN(r3))i8.scrollTop=r3;
if (!isNaN(r4))i8.scrollLeft=r4;
var c6=this.GetParent(this.GetRowHeader(e5));
var c7=this.GetParent(this.GetColHeader(e5));
var l3=this.GetParent(this.GetColFooter(e5));
if (l3!=null){
l3.scrollLeft=i8.scrollLeft;
}
if (c6!=null){
c6.scrollTop=i8.scrollTop;
}
if (c7!=null){
c7.scrollLeft=i8.scrollLeft;
}
}
}
this.GetParent=function (g4){
if (g4==null)
return null;
else 
return g4.parentNode;
}
this.GetViewport=function (e5){
return e5.c3;
}
this.GetFrozColHeader=function (e5){
return e5.frozColHeader;
}
this.GetColFooter=function (e5){
return e5.colFooter;
}
this.GetFrozColFooter=function (e5){
return e5.frozColFooter;
}
this.GetTopTable=function (e5){
return e5.getElementsByTagName("TABLE")[0];
}
this.GetFrozRowHeader=function (e5){
return e5.frozRowHeader;
}
this.GetViewport0=function (e5){
return e5.viewport0;
}
this.GetViewport1=function (e5){
return e5.viewport1;
}
this.GetViewport2=function (e5){
return e5.viewport2;
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
this.GetCmdBtn=function (e5,id){
var q1=this.GetTopSpread(e5);
var r5=this.GetCommandBar(q1);
if (r5!=null)
return this.GetElementById(r5,q1.id+"_"+id);
else 
return null;
}
this.Range=function (){
this.type="Cell";
this.row=-1;
this.col=-1;
this.rowCount=0;
this.colCount=0;
this.innerRow=0;
}
this.SetRange=function (i1,type,j1,o2,n9,h2,innerRow){
i1.type=type;
i1.row=j1;
i1.col=o2;
i1.rowCount=n9;
i1.colCount=h2;
i1.innerRow=innerRow;
if (type=="Row"){
i1.col=i1.colCount=-1;
}else if (type=="Column"){
i1.row=i1.rowCount=-1;
}else if (type=="Table"){
i1.col=i1.colCount=-1;i1.row=i1.rowCount=-1;
}
}
this.Margin=function (left,top,right,bottom){
this.left;
this.top;
this.right;
this.bottom;
}
this.GetRender=function (h6){
var g1=h6;
if (g1.firstChild!=null&&g1.firstChild.tagName!=null&&g1.firstChild.tagName!="BR")
return g1.firstChild;
if (g1.firstChild!=null&&g1.firstChild.value!=null){
g1=g1.firstChild;
}
return g1;
}
this.GetPreferredRowHeight=function (e5,h3){
var j2=this.CreateTestBox(e5);
h3=this.GetDisplayIndex(e5,h3);
var i8=this.GetViewport(e5);
var j3=0;
var r6=i8.rows[h3].offsetHeight;
var f1=i8.rows[h3].cells.length;
for (var f2=0;f2<f1;f2++){
var j4=i8.rows[h3].cells[f2];
var j6=this.GetRender(j4);
if (j6!=null){
j2.style.fontFamily=j6.style.fontFamily;
j2.style.fontSize=j6.style.fontSize;
j2.style.fontWeight=j6.style.fontWeight;
j2.style.fontStyle=j6.style.fontStyle;
}
var o2=this.GetColFromCell(e5,j4);
j2.style.posWidth=this.GetColWidthFromCol(e5,o2);
if (j6!=null&&j6.tagName=="SELECT"){
var g1="";
for (var i3=0;i3<j6.childNodes.length;i3++){
var r7=j6.childNodes[i3];
if (r7.text!=null&&r7.text.length>g1.length)g1=r7.text;
}
j2.innerHTML=g1;
}
else if (j6!=null&&j6.tagName=="INPUT")
j2.innerHTML=j6.value;
else 
{
j2.innerHTML=j4.innerHTML;
}
r6=j2.offsetHeight;
if (r6>j3)j3=r6;
}
return Math.max(0,j3)+3;
}
this.SetRowHeight2=function (e5,h3,height){
if (height<1){
height=1;
}
h3=this.GetDisplayIndex(e5,h3);
var b6=null;
var g9=false;
if (h3<e5.frzRows){
g9=true;
if (this.GetFrozRowHeader(e5)!=null)b6=this.GetFrozRowHeader(e5).rows[h3];
}else {
h3-=e5.frzRows;
if (this.GetRowHeader(e5)!=null)b6=this.GetRowHeader(e5).rows[h3];
}
if (b6!=null)b6.style.height=""+height+"px";
if (g9){
var i8=this.GetViewport0(e5);
if (i8!=null){
if (b6!=null){
i8.rows[b6.rowIndex].style.height=""+(b6.offsetHeight-i8.rows[0].offsetTop)+"px";
}else {
i8.rows[h3].style.height=""+height+"px";
b6=i8.rows[h3];
}
}
i8=this.GetViewport1(e5);
if (i8!=null){
if (b6!=null){
i8.rows[b6.rowIndex].style.height=""+(b6.offsetHeight-i8.rows[0].offsetTop)+"px";
}else {
i8.rows[h3].style.height=""+height+"px";
b6=i8.rows[h3];
}
}
}else {
var i8=this.GetViewport(e5);
if (i8!=null){
if (b6!=null){
i8.rows[b6.rowIndex].style.height=b6.style.height;
}else {
i8.rows[h3].style.height=""+height+"px";
b6=i8.rows[h3];
}
}
i8=this.GetViewport2(e5);
if (i8!=null){
if (b6!=null){
i8.rows[b6.rowIndex].style.height=b6.style.height;
}else {
i8.rows[h3].style.height=""+height+"px";
b6=i8.rows[h3];
}
}
}
var r8=this.AddRowInfo(e5,b6.getAttribute("FpKey"));
if (r8!=null){
if (typeof(b6.style.posHeight)=="undefined")
b6.style.posHeight=height;
this.SetRowHeight(e5,r8,b6.style.posHeight);
}
var j0=this.GetParentSpread(e5);
if (j0!=null)j0.UpdateRowHeight(e5);
this.SizeSpread(e5);
}
this.GetRowHeightInternal=function (e5,h3){
var b6=null;
if (this.GetRowHeader(e5)!=null)
b6=this.GetRowHeader(e5).rows[h3];
else if (this.GetViewport(e5)!=null)
b6=this.GetViewport(e5).rows[h3];
if (b6!=null)
return b6.offsetHeight;
else 
return 0;
}
this.GetCell=function (ele,noHeader,event){
var g1=ele;
while (g1!=null){
if (noHeader){
if ((g1.tagName=="TD"||g1.tagName=="TH")&&(g1.parentNode.getAttribute("FpSpread")=="r")){
return g1;
}
}else {
if ((g1.tagName=="TD"||g1.tagName=="TH")&&(g1.parentNode.getAttribute("FpSpread")=="r"||g1.parentNode.getAttribute("FpSpread")=="ch"||g1.parentNode.getAttribute("FpSpread")=="rh")){
return g1;
}
}
g1=g1.parentNode;
}
return null;
}
this.InRowHeader=function (e5,h6){
return (this.IsChild(h6,this.GetFrozRowHeader(e5))||this.IsChild(h6,this.GetRowHeader(e5)));
}
this.InColHeader=function (e5,h6){
return (this.IsChild(h6,this.GetFrozColHeader(e5))||this.IsChild(h6,this.GetColHeader(e5)));
}
this.InColFooter=function (e5,h6){
return (this.IsChild(h6,this.GetFrozColFooter(e5))||this.IsChild(h6,this.GetColFooter(e5)));
}
this.IsHeaderCell=function (e5,h6){
return (h6!=null&&(h6.tagName=="TD"||h6.tagName=="TH")&&(h6.parentNode.getAttribute("FpSpread")=="ch"||h6.parentNode.getAttribute("FpSpread")=="rh"));
}
this.InFrozCols=function (e5,h6){
return (this.IsChild(h6,this.GetFrozColHeader(e5))||this.IsChild(h6,this.GetViewport0(e5))||this.IsChild(h6,this.GetViewport2(e5)));
}
this.InFrozRows=function (e5,h6){
(this.IsChild(h6,this.GetFrozRowHeader(e5))||this.IsChild(h6,this.GetViewport0(e5))||this.IsChild(h6,this.GetViewport1(e5)));
}
this.GetSizeColumn=function (e5,ele,event){
if (ele.tagName!="TD"||(this.GetColHeader(e5)==null))return null;
var o2=-1;
var g1=ele;
var r4=this.GetViewport(this.GetTopSpread(e5)).parentNode.scrollLeft+window.scrollX;
while (g1!=null&&g1.parentNode!=null&&g1.parentNode!=document.documentElement){
if (g1.parentNode.getAttribute("FpSpread")=="ch"){
var r9=this.GetOffsetLeft(e5,g1,document.body);
var s0=r9+g1.offsetWidth;
if (event.clientX+r4<r9+3){
o2=this.GetColFromCell(e5,g1)-1;
}
else if (event.clientX+r4>s0-4){
o2=this.GetColFromCell(e5,g1);
var s1=this.GetSpanCell(g1.parentNode.rowIndex,o2,e5.e2);
if (s1!=null){
o2=s1.col+s1.colCount-1;
}
}else {
o2=this.GetColFromCell(e5,g1);
var s1=this.GetSpanCell(g1.parentNode.rowIndex,o2,e5.e2);
if (s1!=null){
var j5=r9;
o2=-1;
for (var f2=s1.col;f2<s1.col+s1.colCount&&f2<this.GetColCount(e5);f2++){
if (this.IsChild(g1,this.GetColHeader(e5)))
j5+=parseInt(this.GetElementById(this.GetColHeader(e5),e5.id+"col"+f2).width);
else 
j5+=parseInt(this.GetElementById(this.GetFrozColHeader(e5),e5.id+"col"+f2).width);
if (event.clientX>j5-3&&event.clientX<j5+3){
o2=f2;
break ;
}
}
}else {
o2=-1;
}
}
if (isNaN(o2)||o2<0)return null;
var s2=0;
var s3=this.GetColCount(e5);
var s4=true;
var e8=null;
var h5=o2+1;
while (h5<s3){
var f4=this.GetColGroup(this.GetColHeader(e5));
if (h5>=e5.frzCols){
var f4=this.GetColGroup(this.GetColHeader(e5));
if (h5-e5.frzCols<f4.childNodes.length)
s2=parseInt(f4.childNodes[h5-e5.frzCols].width);
}else {
var f4=this.GetColGroup(this.GetFrozColHeader(e5));
if (h5<f4.childNodes.length)
s2=parseInt(f4.childNodes[h5].width);
}
if (s2>1){
s4=false;
break ;
}
h5++;
}
if (s4){
h5=o2+1;
while (h5<s3){
if (this.GetSizable(e5,h5)){
o2=h5;
break ;
}
h5++;
}
}
if (!this.GetSizable(e5,o2))return null;
if (this.IsChild(g1,this.GetColHeader(e5))){
if (event.offsetX<3&&g1.cellIndex==0&&this.GetFrozColHeader(e5)!=null){
return this.GetElementById(this.GetFrozColHeader(e5),e5.id+"col"+(e5.frzCols-1));
}else {
return this.GetElementById(this.GetColHeader(e5),e5.id+"col"+o2);
}
}else {
return this.GetElementById(this.GetFrozColHeader(e5),e5.id+"col"+o2);
}
}
g1=g1.parentNode;
}
return null;
}
this.GetColGroup=function (g1){
if (g1==null)return null;
var f4=g1.getElementsByTagName("COLGROUP");
if (f4!=null&&f4.length>0){
if (g1.colgroup!=null)return g1.colgroup;
var q4=new Object();
q4.childNodes=new Array();
for (var f2=0;f2<f4[0].childNodes.length;f2++){
if (f4[0].childNodes[f2]!=null&&f4[0].childNodes[f2].tagName=="COL"){
var f1=q4.childNodes.length;
q4.childNodes.length++;
q4.childNodes[f1]=f4[0].childNodes[f2];
}
}
g1.colgroup=q4;
return q4;
}else {
return null;
}
}
this.GetSizeRow=function (e5,ele,event){
var n9=this.GetRowCount(e5);
if (n9==0)return null;
if (e5.getAttribute("LayoutMode"))return null;
var h6=this.GetCell(ele);
if (h6==null){
if (ele.getAttribute("FpSpread")=="rowpadding"){
if (event.clientY<3){
var f1=ele.parentNode.rowIndex;
if (f1>1){
var j1=ele.parentNode.parentNode.rows[f1-1];
if (this.GetSizable(e5,j1))
return j1;
}
}
}
var c5=this.GetCorner(e5);
if (c5!=null&&this.IsChild(ele,c5)){
if (event.clientY>ele.offsetHeight-4){
var s5=null;
var f1=0;
s5=this.GetRowHeader(e5);
if (s5!=null){
while (f1<s5.rows.length&&s5.rows[f1].offsetHeight<2&&!this.GetSizable(e5,s5.rows[f1]))
f1++;
if (f1<s5.rows.length&&this.GetSizable(e5,s5.rows[f1])&&s5.rows[f1].offsetHeight<2)
return s5.rows[f1];
}
}else {
}
}
return null;
}
var e1=e5.e1;
var e0=e5.e0;
var s6=this.IsChild(h6,this.GetFrozRowHeader(e5));
var g1=h6;
var r3=this.GetViewport(this.GetTopSpread(e5)).parentNode.scrollTop+window.scrollY;
while (g1!=null&&g1!=document.documentElement){
if (g1.getAttribute("FpSpread")=="rh"){
var f1=-1;
var s7=this.GetOffsetTop(e5,g1,document.body);
var s8=s7+g1.offsetHeight;
if (event.clientY+r3<s7+3){
if (g1.rowIndex>1)
f1=g1.rowIndex-1;
else if (g1.rowIndex==0&&!s6&&this.GetFrozRowHeader(e5)!=null){
s6=true;
f1=g1.frzRows-1;
}
}
else if (event.clientY+r3>s8-4){
var s1=this.GetSpanCell(this.GetRowFromCell(e5,h6),this.GetColFromCell(e5,h6),e1);
if (s1!=null){
var k2=s7;
for (var f2=s1.row;f2<s1.row+s1.rowCount;f2++){
k2+=parseInt(this.GetRowHeader(e5).rows[f2].style.height);
if (event.clientY>k2-3&&event.clientY<k2+3){
f1=f2;
break ;
}
}
}else {
if (g1.rowIndex>=0)f1=g1.rowIndex;
}
}
else {
break ;
}
var k2=0;
var n9=this.GetRowHeader(e5).rows.length;
if (s6)n9=this.GetFrozRowHeader(e5).rows.length;
var s9=true;
var s5=null;
if (s6)
s5=this.GetFrozRowHeader(e5);
else 
s5=this.GetRowHeader(e5);
var h3=f1+1;
while (h3<n9){
if (s5.rows[h3].style.height!=null)k2=parseInt(s5.rows[h3].style.height);
else k2=parseInt(s5.rows[h3].offsetHeight);
if (k2>1){
s9=false;
break ;
}
h3++;
}
if (s9){
h3=f1+1;
while (h3<n9){
if (this.GetSizable(e5,this.GetRowHeader(e5).rows[h3])){
f1=h3;
break ;
}
h3++;
}
}
if (f1>=0&&this.GetSizable(e5,s5.rows[f1])){
return s5.rows[f1];
}
else if (event.clientY<3){
while (f1>0&&s5.rows[f1].offsetHeight==0&&!this.GetSizable(e5,s5.rows[f1]))
f1--;
if (f1>=0&&this.GetSizable(e5,s5.rows[f1]))
return s5.rows[f1];
else 
return null;
}
}
g1=g1.parentNode;
}
return null;
}
this.GetElementById=function (j0,id){
if (j0==null)return null;
var g1=j0.firstChild;
while (g1!=null){
if (g1.id==id||(typeof(g1.getAttribute)=="function"&&g1.getAttribute("name")==id))return g1;
var q4=this.GetElementById(g1,id)
if (q4!=null)return q4;
g1=g1.nextSibling;
}
return null;
}
this.GetSizable=function (e5,ele){
if (typeof(ele)=="number"){
var h6=null;
if (ele<e5.frzCols)
h6=this.GetElementById(this.GetFrozColHeader(e5),e5.id+"col"+ele);
else 
h6=this.GetElementById(this.GetColHeader(e5),e5.id+"col"+ele);
return (h6!=null&&(h6.getAttribute("Sizable")==null||h6.getAttribute("Sizable")=="True"));
}
return (ele!=null&&(ele.getAttribute("Sizable")==null||ele.getAttribute("Sizable")=="True"));
}
this.GetSpanWidth=function (e5,o2,s3){
var j5=0;
var e8=this.GetViewport(e5);
if (e8!=null){
var f4=this.GetColGroup(e8);
if (f4!=null){
for (var f2=o2;f2<o2+s3;f2++){
j5+=parseInt(f4.childNodes[f2].width);
}
}
}
return j5;
}
this.GetCellType=function (h6){
if (h6!=null&&h6.getAttribute("FpCellType")!=null)return h6.getAttribute("FpCellType");
if (h6!=null&&h6.getAttribute("FpRef")!=null){
var g1=document.getElementById(h6.getAttribute("FpRef"));
return g1.getAttribute("FpCellType");
}
if (h6!=null&&h6.getAttribute("FpCellType")!=null)return h6.getAttribute("FpCellType");
return "text";
}
this.GetCellType2=function (h6){
if (h6!=null&&h6.getAttribute("FpRef")!=null){
h6=document.getElementById(h6.getAttribute("FpRef"));
}
var j7=null;
if (h6!=null){
j7=h6.getAttribute("FpCellType");
if (j7=="readonly")j7=h6.getAttribute("CellType");
if (j7==null&&h6.getAttribute("CellType2")=="TagCloudCellType")
j7=h6.getAttribute("CellType2");
}
if (j7!=null)return j7;
return "text";
}
this.GetCellEditorID=function (e5,h6){
if (h6!=null&&h6.getAttribute("FpRef")!=null){
var g1=document.getElementById(h6.getAttribute("FpRef"));
return g1.getAttribute("FpEditorID");
}
if (h6.getAttribute("FpEditorID")!=null)
return h6.getAttribute("FpEditorID");
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
for (var f2=0;f2<this.c1.length;f2++){
var t0=this.c1[f2];
if (t0.id==editorID){
a9=t0.a9;
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
this.GetCellValidatorID=function (e5,h6){
return null;
}
this.GetCellValidator=function (e5,validatorID){
return null;
}
this.GetTableRow=function (e5,h3){
var f8=this.GetData(e5).getElementsByTagName("root")[0];
var f7=f8.getElementsByTagName("data")[0];
var g1=f7.firstChild;
while (g1!=null){
if (g1.getAttribute("key")==""+h3)return g1;
g1=g1.nextSibling;
}
return null;
}
this.GetTableCell=function (j1,h5){
if (j1==null)return null;
var g1=j1.firstChild;
while (g1!=null){
if (g1.getAttribute("key")==""+h5)return g1;
g1=g1.nextSibling;
}
return null;
}
this.AddTableRow=function (e5,h3){
if (h3==null)return null;
var o4=this.GetTableRow(e5,h3);
if (o4!=null)return o4;
var f8=this.GetData(e5).getElementsByTagName("root")[0];
var f7=f8.getElementsByTagName("data")[0];
if (document.all!=null){
o4=this.GetData(e5).createNode("element","row","");
}else {
o4=document.createElement("row");
o4.style.display="none";
}
o4.setAttribute("key",h3);
f7.appendChild(o4);
return o4;
}
this.AddTableCell=function (j1,h5){
if (j1==null)return null;
var o4=this.GetTableCell(j1,h5);
if (o4!=null)return o4;
if (document.all!=null){
o4=this.GetData(e5).createNode("element","cell","");
}else {
o4=document.createElement("cell");
o4.style.display="none";
}
o4.setAttribute("key",h5);
j1.appendChild(o4);
return o4;
}
this.GetCellValue=function (e5,h6){
if (h6==null)return null;
var h3=this.GetRowKeyFromCell(e5,h6);
var h5=e5.getAttribute("LayoutMode")?this.GetColKeyFromCell2(e5,h6):this.GetColKeyFromCell(e5,h6);
var t1=this.AddTableCell(this.AddTableRow(e5,h3),h5);
return t1.innerHTML;
}
this.HTMLEncode=function (s){
var t2=new String(s);
var t3=new RegExp("&","g");
t2=t2.replace(t3,"&amp;");
t3=new RegExp("<","g");
t2=t2.replace(t3,"&lt;");
t3=new RegExp(">","g");
t2=t2.replace(t3,"&gt;");
t3=new RegExp("\"","g");
t2=t2.replace(t3,"&quot;");
return t2;
}
this.HTMLDecode=function (s){
var t2=new String(s);
var t3=new RegExp("&amp;","g");
t2=t2.replace(t3,"&");
t3=new RegExp("&lt;","g");
t2=t2.replace(t3,"<");
t3=new RegExp("&gt;","g");
t2=t2.replace(t3,">");
t3=new RegExp("&nbsp;","g");
t2=t2.replace(t3," ");
t3=new RegExp("&quot;","g");
t2=t2.replace(t3,'"');
return t2;
}
this.SetCellValue=function (e5,h6,val,noEvent,recalc){
if (h6==null)return ;
var t4=this.GetCellType(h6);
if (t4=="readonly")return ;
var h3=this.GetRowKeyFromCell(e5,h6);
var h5=e5.getAttribute("LayoutMode")?this.GetColKeyFromCell2(e5,h6):this.GetColKeyFromCell(e5,h6);
var t1=this.AddTableCell(this.AddTableRow(e5,h3),h5);
val=this.HTMLEncode(val);
val=this.HTMLEncode(val);
t1.innerHTML=val;
if (!noEvent){
var g4=this.CreateEvent("DataChanged");
g4.cell=h6;
g4.cellValue=val;
g4.row=h3;
g4.col=h5;
this.FireEvent(e5,g4);
}
var g0=this.GetCmdBtn(e5,"Update");
if (g0!=null&&g0.getAttribute("disabled")!=null)
this.UpdateCmdBtnState(g0,false);
g0=this.GetCmdBtn(e5,"Cancel");
if (g0!=null&&g0.getAttribute("disabled")!=null)
this.UpdateCmdBtnState(g0,false);
e5.e3=true;
if (recalc){
this.UpdateValues(e5);
}
}
this.GetSelectedRanges=function (e5){
var o3=this.GetSelection(e5);
var g6=new Array();
var o4=o3.firstChild;
while (o4!=null){
var i1=new this.Range();
this.GetRangeFromNode(e5,o4,i1);
var g1=g6.length;
g6.length=g1+1;
g6[g1]=i1;
o4=o4.nextSibling;
}
return g6;
}
this.GetSelectedRange=function (e5){
var i1=new this.Range();
var o3=this.GetSelection(e5);
var o4=o3.lastChild;
if (o4!=null){
this.GetRangeFromNode(e5,o4,i1);
}
return i1;
}
this.GetRangeFromNode=function (e5,o4,i1){
if (o4==null||e5==null||i1==null)return ;
var h3;
var h5;
if (e5.getAttribute("LayoutMode")){
h3=parseInt(o4.getAttribute("rowIndex"));
h5=parseInt(o4.getAttribute("colIndex"));
}
else {
h3=this.GetRowByKey(e5,o4.getAttribute("row"));
h5=this.GetColByKey(e5,o4.getAttribute("col"));
}
var n9=parseInt(o4.getAttribute("rowcount"));
var h2=parseInt(o4.getAttribute("colcount"));
var i8=this.GetViewport(e5);
if (i8!=null){
var t5=this.GetDisplayIndex(e5,h3);
for (var f2=t5;f2<t5+n9;f2++){
if (this.IsChildSpreadRow(e5,i8,f2))n9--;
}
}
var t6;
if (e5.getAttribute("LayoutMode")){
var o2=parseInt(o4.getAttribute("col"));
if (o2!=-1&&parseInt(o4.getAttribute("row"))==-1&&n9==-1){
h3=parseInt(o4.getAttribute("row"));
t6=parseInt(o4.getAttribute("rowIndex"));
}
}
var t7=null;
if (h3<0&&h5<0&&n9!=0&&h2!=0)
t7="Table";
else if (h3<0&&h5>=0&&h2>0)
t7="Column";
else if (h5<0&&h3>=0&&n9>0)
t7="Row";
else 
t7="Cell";
this.SetRange(i1,t7,h3,h5,n9,h2,t6);
}
this.GetSelection=function (e5){
var f7=this.GetData(e5);
var f8=f7.getElementsByTagName("root")[0];
var o7=f8.getElementsByTagName("state")[0];
var t8=o7.getElementsByTagName("selection")[0];
return t8;
}
this.GetRowKeyFromRow=function (e5,h3){
if (h3<0)return null;
var e8=null;
if (h3<e5.frzRows){
e8=this.GetViewport0(e5);
if (e8==null)e8=this.GetViewport1(e5);
}else {
e8=this.GetViewport2(e5);
if (e8==null)e8=this.GetViewport(e5);
}
if (h3>=e5.frzRows){
h3-=e5.frzRows;
}
return e8.rows[h3].getAttribute("FpKey");
}
this.GetColKeyFromCol=function (e5,h5){
if (h5<0)return null;
var e8=null;
if (h5>=e5.frzCols){
e8=this.GetViewport1(e5);
if (e8==null)e8=this.GetViewport(e5);
if (e8==null)e8=this.GetColHeader(e5);
}else {
e8=this.GetViewport0(e5);
if (e8==null)e8=this.GetViewport2(e5);
if (e8==null)e8=this.GetFrozColHeader(e5);
}
if (h5>=e5.frzCols)
h5=h5-e5.frzCols;
var f4=this.GetColGroup(e8);
if (f4!=null&&h5>=0&&h5<f4.childNodes.length){
return f4.childNodes[h5].getAttribute("FpCol");
}
return null;
}
this.GetRowKeyFromCell=function (e5,h6){
var h3=h6.parentNode.getAttribute("FpKey");
return h3;
}
this.GetColKeyFromCell=function (e5,h6){
var o2=this.GetColFromCell(e5,h6);
if (o2>=e5.frzCols){
e8=this.GetViewport(e5);
if (e8==null||!this.IsChild(h6,e8))e8=this.GetViewport1(e5);
var f4=this.GetColGroup(e8);
if (f4!=null&&o2-e5.frzCols>=0&&o2-e5.frzCols<f4.childNodes.length){
return f4.childNodes[o2-e5.frzCols].getAttribute("FpCol");
}
}else {
e8=this.GetViewport0(e5);
if (e8==null||!this.IsChild(h6,e8))e8=this.GetViewport2(e5);
var f4=this.GetColGroup(e8);
if (f4!=null&&o2>=0&&o2<f4.childNodes.length){
return f4.childNodes[o2].getAttribute("FpCol");
}
}
}
this.GetRowTemplateRowFromGroupCell=function (e5,h6,isColHeader){
var t9=this.GetColCount(e5);
var c7=this.GetColHeader(e5);
if ((!e5.allowGroup||isColHeader)&&c7!=null){
for (var f2=0;f2<c7.rows.length;f2++){
for (var i3=0;i3<t9;i3++){
var u0=c7.rows[f2].cells[i3];
var u1=isNaN(h6)?parseInt(h6.getAttribute("col")):h6;
if (u0!=null&&h6!=null&&parseInt(u0.getAttribute("col"))==u1)
return f2;
}
}
}
var n8=this.GetViewport1(e5);
if (n8!=null){
for (var j1=0;j1<n8.rows.length;j1++){
for (var o2=0;o2<n8.rows[j1].cells.length;o2++){
var u2=isNaN(h6)?parseInt(h6.getAttribute("col")):h6;
if (parseInt(n8.rows[j1].cells[o2].getAttribute("col"))==u2&&n8.rows[j1].cells[o2].getAttribute("group")==null)
return parseInt(n8.rows[j1].getAttribute("FpKey"));
}
}
}
var o0=this.GetViewport(e5);
if (o0!=null){
for (var j1=0;j1<o0.rows.length;j1++){
for (var o2=0;o2<o0.rows[j1].cells.length;o2++){
var u2=isNaN(h6)?parseInt(h6.getAttribute("col")):h6;
if (parseInt(o0.rows[j1].cells[o2].getAttribute("col"))==u2&&o0.rows[j1].cells[o2].getAttribute("group")==null)
return parseInt(o0.rows[j1].getAttribute("FpKey"));
}
}
}
return -1;
}
this.GetColTemplateRowFromGroupCell=function (e5,colIndex){
var t9=this.GetColCount(e5);
var c7=this.GetColHeader(e5);
var u3=this.GetRowTemplateRowFromGroupCell(e5,colIndex);
var h6=null
if (c7==null)return -1;
for (var f2=0;f2<c7.rows.length;f2++){
for (var i3=0;i3<t9;i3++){
var u0=c7.rows[f2].cells[i3];
if (u0!=null&&parseInt(u0.getAttribute("col"))==colIndex){
h6=u0;
break ;
}
}
}
return this.GetColFromCell(e5,h6);
}
this.GetColKeyFromCell2=function (e5,h6){
if (!h6)return -1;
if (h6.getAttribute("col"))
return h6.getAttribute("col")=="-1"?0:parseInt(h6.getAttribute("col"));
else 
return this.GetColKeyFromCell(e5,h6);
}
this.GetColKeyFromCol2=function (e5,j1,o2){
var h6=this.GetCellFromRowCol(e5,j1,o2);
if (h6)
return this.GetColKeyFromCell2(e5,h6);
return o2;
}
this.GetCellByRowCol2=function (e5,h3,h5){
if (h3==null||h5==null||h3.length<=0||h3=="-1"||h5.length<=0||h5=="-1")
return null;
var f5=this.GetViewport1(e5);
if (f5!=null){
for (var j1=0;j1<f5.rows.length;j1++){
if (f5.rows[j1].getAttribute("FpKey")==h3){
for (var o2=0;o2<f5.rows[j1].cells.length;o2++){
if (f5.rows[j1].cells[o2].getAttribute("col")==h5)
return f5.rows[j1].cells[o2];
}
}
}
}
var o0=this.GetViewport(e5);
if (o0!=null){
for (var j1=0;j1<o0.rows.length;j1++){
if (o0.rows[j1].getAttribute("FpKey")==h3){
for (var o2=0;o2<o0.rows[j1].cells.length;o2++){
if (o0.rows[j1].cells[o2].getAttribute("col")==h5)
return o0.rows[j1].cells[o2];
}
}
}
}
return null;
}
this.GetRowTemplateRowFromCell=function (e5,h6){
if (!h6)return -1;
try {
var h3
if (h6.getAttribute("group")!=null)
h3=this.GetRowTemplateRowFromGroupCell(e5,h6);
else 
h3=parseInt(h6.parentNode.getAttribute("row"));
return h3;
}
catch (g4){
return -1;
}
}
this.PaintMultipleRowSelection=function (e5,h3,h5,n9,h2,select){
var u4=this.GetRowCountInternal(e5);
var t9=this.GetColCount(e5);
var u5=true;
for (var f2=h3;f2<u4;f2++){
if (this.IsChildSpreadRow(e5,this.GetViewport(e5),f2))continue ;
var h6=null;
for (var i3=h5;i3<h5+h2&&i3<t9;i3++){
if (this.IsCovered(e5,f2,i3,e5.e0))continue ;
h6=this.GetCellFromRowCol(e5,f2,i3,h6);
if (h6!=null&&parseInt(h6.parentNode.getAttribute("row"))==h3){
this.PaintViewportSelection(e5,f2,i3,n9,h2,select);
if (this.GetColHeader(e5)!=null&&this.GetOperationMode(e5)=="Normal"&&u5)this.PaintHeaderSelection(e5,f2,i3,n9,h2,select,true);
if (this.GetRowHeader(e5)!=null)this.PaintHeaderSelection(e5,f2,i3,n9,h2,select,false);
u5=false;
}
}
}
this.PaintAnchorCell(e5);
}
this.GetFirstRowFromKey=function (e5,rowKey){
var f5=this.GetViewport1(e5)
if (f5!=null){
for (var j1=0;j1<f5.rows.length;j1++){
if (f5.rows[j1].getAttribute("FpKey")==rowKey){
return j1;
}
}
}
var o0=this.GetViewport(e5)
if (o0!=null){
for (var j1=0;j1<o0.rows.length;j1++){
if (o0.rows[j1].getAttribute("FpKey")==rowKey){
return (e5.frzRows!=null)?e5.frzRows+j1:j1;
}
}
}
return null;
}
this.GetFirstMultiRowFromViewport=function (e5,j1,isColHeader){
var e8=null;
var u6=null;
if (j1<e5.frzRows)
e8=this.GetViewport1(e5);
else 
e8=this.GetViewport(e5);
if (!isColHeader)
u6=this.GetRowKeyFromRow(e5,j1);
var u7=parseInt(e5.getAttribute("layoutrowcount"));
var u8;
for (var f2=0;f2<e8.rows.length;f2++){
u8=0;
if (u6!=null){
if (e8.rows[f2].getAttribute("FpKey")==u6)
return ((e5.frzRows!=null&&j1<e5.frzRows)?f2:f2+e5.frzRows);
}
else {
for (var i3=f2+1;i3<e8.rows.length;i3++){
if (e8.rows[f2]!=null&&e8.rows[i3]!=null&&e8.rows[f2].getAttribute("FpKey")==e8.rows[i3].getAttribute("FpKey"))
u8++;
if (u8==(u7-1))
return f2;
}
}
}
}
this.GetRowFromViewPort=function (e5,h3,h5){
if (h3<0||h5<0)return null;
var e8=null;
if (h3<e5.frzRows)
e8=this.GetViewport1(e5);
else 
e8=this.GetViewport(e5);
if (h3>=0&&h3<e8.rows.length){
for (var f2=0;f2<e8.rows.length;f2++){
if (e8.rows[f2].getAttribute("row")!=null&&parseInt(e8.rows[f2].getAttribute("row"))==h3)
return f2;
}
}
return 0;
}
this.GetDisplayIndex2=function (e5,u3){
if (!e5.allowGroup)
return (u3!=null)?this.GetDisplayIndex(e5,u3):0;
else {
var f5=this.GetViewport1(e5);
if (f5!=null){
for (var j1=u3;j1<f5.rows.length;j1++){
if (f5.rows(j1).getAttribute("row")==u3){
return j1;
}
}
}
var o0=this.GetViewport(e5);
if (o0!=null){
for (var j1=u3;j1<o0.rows.length;j1++){
if (IsChildSpreadRow(o0,j1))continue ;
if (o0.rows(j1).getAttribute("row")==u3){
return j1;
}
}
}
}
return -1;
}
this.SetSelection=function (e5,j1,o2,rowcount,colcount,addSelection,rowIndex2,colIndex2){
if (!e5.initialized)return ;
var u3=j1;
var u9=(colIndex2==null)?o2:colIndex2;
if (j1!=null&&parseInt(j1)>=0){
j1=this.GetRowKeyFromRow(e5,j1);
if (j1!="newRow")
j1=parseInt(j1);
}
if (o2!=null&&parseInt(o2)>=0){
if (e5.getAttribute("LayoutMode"))
o2=parseInt(this.GetColKeyFromCol2(e5,u3,o2));
else 
o2=parseInt(this.GetColKeyFromCol(e5,o2));
}
if (e5.getAttribute("LayoutMode")&&rowIndex2!=null)
u3=rowIndex2;
var o4=this.GetSelection(e5);
if (o4==null)return ;
if (addSelection==null)
addSelection=(e5.getAttribute("multiRange")=="true"&&!this.working);
var v0=o4.lastChild;
if (v0==null||addSelection){
if (document.all!=null){
v0=this.GetData(e5).createNode("element","range","");
}else {
v0=document.createElement('range');
v0.style.display="none";
}
o4.appendChild(v0);
}
v0.setAttribute("row",j1);
v0.setAttribute("col",o2);
v0.setAttribute("rowcount",rowcount);
v0.setAttribute("colcount",colcount);
v0.setAttribute("rowIndex",u3);
v0.setAttribute("colIndex",u9);
e5.e3=true;
this.PaintFocusRect(e5);
var g0=this.GetCmdBtn(e5,"Update");
this.UpdateCmdBtnState(g0,false);
var g4=this.CreateEvent("SelectionChanged");
this.FireEvent(e5,g4);
}
this.CreateSelectionNode=function (e5,j1,o2,rowcount,colcount,u3,u9){
var v0=document.createElement('range');
v0.style.display="none";
v0.setAttribute("row",j1);
v0.setAttribute("col",o2);
v0.setAttribute("rowcount",rowcount);
v0.setAttribute("colcount",colcount);
v0.setAttribute("rowIndex",u3);
v0.setAttribute("colIndex",u9);
return v0;
}
this.AddRowToSelection=function (e5,o4,j1){
var o5=this.GetOperationMode(e5);
if (e5.getAttribute("LayoutMode")&&(o5=="ExtendedSelect"||o5=="MultiSelect"))return ;
var u3=j1;
if (typeof(j1)!="undefined"&&parseInt(j1)>=0){
j1=this.GetRowKeyFromRow(e5,j1);
if (j1!="newRow")
j1=parseInt(j1);
}
if (!this.IsRowSelected(e5,j1)&&!isNaN(j1))
{
var v0=this.CreateSelectionNode(e5,j1,-1,1,-1,u3,-1);
o4.appendChild(v0);
}
}
this.RemoveSelection=function (e5,j1,o2,rowcount,colcount){
var o4=this.GetSelection(e5);
if (o4==null)return ;
var v0=o4.firstChild;
while (v0!=null){
var h3;
var n9;
var o5=this.GetOperationMode(e5);
if (e5.getAttribute("LayoutMode")&&(o5=="ExtendedSelect"||o5=="MultiSelect")){
var o6=parseInt(v0.getAttribute("row"));
h3=this.GetFirstRowFromKey(e5,o6);
}
else 
h3=parseInt(v0.getAttribute("rowIndex"));
if (e5.getAttribute("LayoutMode")&&(o5=="ExtendedSelect"||o5=="MultiSelect"))
n9=parseInt(e5.getAttribute("layoutrowcount"));
else 
n9=parseInt(v0.getAttribute("rowcount"));
if (h3<=j1&&j1<h3+n9){
o4.removeChild(v0);
for (var f2=h3;f2<h3+n9;f2++){
if (f2!=j1){
this.AddRowToSelection(e5,o4,f2);
}
}
break ;
}
v0=v0.nextSibling;
}
e5.e3=true;
var g0=this.GetCmdBtn(e5,"Update");
this.UpdateCmdBtnState(g0,false);
var g4=this.CreateEvent("SelectionChanged");
this.FireEvent(e5,g4);
}
this.GetColInfo=function (e5,h5){
var f7=this.GetData(e5);
var f8=f7.getElementsByTagName("root")[0];
var o7=f8.getElementsByTagName("state")[0];
var o2=o7.getElementsByTagName("colinfo")[0];
var g1=o2.firstChild;
while (g1!=null){
if (g1.getAttribute("key")==""+h5)return g1;
g1=g1.nextSibling;
}
return null;
}
this.GetColWidthFromCol=function (e5,h5){
var f4=this.GetColGroup(this.GetViewport(e5));
return parseInt(f4.childNodes[h5].width);
}
this.GetColWidth=function (colInfo){
if (colInfo==null)return null;
var o4=colInfo.getElementsByTagName("width")[0];
if (o4!=null)return o4.innerHTML;
return 0;
}
this.AddColInfo=function (e5,h5){
var o4=this.GetColInfo(e5,h5);
if (o4!=null)return o4;
var f7=this.GetData(e5);
var f8=f7.getElementsByTagName("root")[0];
var o7=f8.getElementsByTagName("state")[0];
var o2=o7.getElementsByTagName("colinfo")[0];
if (document.all!=null){
o4=this.GetData(e5).createNode("element","col","");
}else {
o4=document.createElement('col');
o4.style.display="none";
}
o4.setAttribute("key",h5);
o2.appendChild(o4);
return o4;
}
this.SetColWidth=function (e5,o2,width,oldWidth){
if (o2==null)return ;
o2=parseInt(o2);
var k1=this.IsXHTML(e5);
var v1=null;
if (o2<e5.frzCols){
if (this.GetViewport0(e5)!=null){
var f4=this.GetColGroup(this.GetViewport0(e5));
if (f4==null||f4.childNodes.length==0){
f4=this.GetColGroup(this.GetFrozColHeader(e5));
}
v1=this.AddColInfo(e5,f4.childNodes[o2].getAttribute("FpCol"));
if (width==0)width=1;
if (f4!=null){
if (oldWidth==null)oldWidth=f4.childNodes[o2].width;
f4.childNodes[o2].width=width;
}
this.SetWidthFix(this.GetViewport0(e5),o2,width);
}
if (this.GetFrozColFooter(e5)!=null){
var f4=this.GetColGroup(this.GetFrozColFooter(e5));
if (f4==null||f4.childNodes.length==0){
f4=this.GetColGroup(this.GetFrozColHeader(e5));
}
if (width==0)width=1;
if (f4!=null){
if (oldWidth==null)oldWidth=f4.childNodes[o2].width;
f4.childNodes[o2].width=width;
}
this.SetWidthFix(this.GetFrozColFooter(e5),o2,width);
}
if (this.GetViewport2(e5)!=null){
var f4=this.GetColGroup(this.GetViewport2(e5));
if (f4==null||f4.childNodes.length==0){
f4=this.GetColGroup(this.GetFrozColHeader(e5));
}
v1=this.AddColInfo(e5,f4.childNodes[o2].getAttribute("FpCol"));
if (width==0)width=1;
if (f4!=null){
if (oldWidth==null)oldWidth=f4.childNodes[o2].width;
f4.childNodes[o2].width=width;
}
this.SetWidthFix(this.GetViewport2(e5),o2,width);
}
if (this.GetFrozColHeader(e5)!=null){
var v2=parseInt(this.GetFrozColHeader(e5).parentNode.parentNode.style.width);
this.GetFrozColHeader(e5).parentNode.parentNode.style.width=(v2+width-oldWidth)+"px";
if (this.GetViewport(e5)!=null){
if (this.GetViewport(e5).cellSpacing=="0"&&this.GetColCount(e5)>1&&this.GetViewport(e5).rules!="rows"){
if (k1){
if (o2==this.colCount-1)width-=1;
}
}
}
if (width<=0)width=1;
document.getElementById(e5.id+"col"+o2).width=width;
this.SetWidthFix(this.GetFrozColHeader(e5),o2,width);
if (this.GetViewport(e5)!=null){
if (this.GetViewport(e5).cellSpacing=="0"&&this.GetColCount(e5)>1&&this.GetViewport(e5).rules!="rows"){
if (o2==this.GetColCount(e5)-1)width+=1;
}
}
}
}else {
if (this.GetViewport1(e5)!=null){
var f4=this.GetColGroup(this.GetViewport1(e5));
if (f4==null||f4.childNodes.length==0){
f4=this.GetColGroup(this.GetColHeader(e5));
}
v1=this.AddColInfo(e5,f4.childNodes[o2-e5.frzCols].getAttribute("FpCol"));
if (this.GetViewport1(e5).cellSpacing=="0"&&this.GetColCount(e5)>1&&this.GetViewport1(e5).rules!="rows"){
if (o2==0)width-=1;
}
if (width==0)width=1;
if (f4!=null)
f4.childNodes[o2-e5.frzCols].width=width;
this.SetWidthFix(this.GetViewport1(e5),o2-e5.frzCols,width);
var c7=this.GetColHeader(e5);
var k4=this.GetColGroup(this.GetViewport(e5));
var k5=this.GetColGroup(c7);
if (k4!=null&&k4.childNodes.length>0&&k5!=null&&k5.childNodes.length>0){
f4=this.GetColGroup(this.GetColHeader(e5));
if (f4!=null){
if (o2==e5.frzCols&&e5.frzCols>0)
width=width+k4.childNodes[0].offsetLeft;
f4.childNodes[o2-e5.frzCols].width=width;
}
}
this.SetWidthFix(this.GetColHeader(e5),o2-e5.frzCols,width);
}
if (this.GetViewport(e5)!=null){
var f4=this.GetColGroup(this.GetViewport(e5));
if (f4==null||f4.childNodes.length==0){
f4=this.GetColGroup(this.GetColHeader(e5));
}
v1=this.AddColInfo(e5,f4.childNodes[o2-e5.frzCols].getAttribute("FpCol"));
if (this.GetViewport(e5).cellSpacing=="0"&&this.GetColCount(e5)>1&&this.GetViewport(e5).rules!="rows"){
if (o2==0)width-=1;
}
if (width==0)width=1;
if (f4!=null)
f4.childNodes[o2-e5.frzCols].width=width;
this.SetWidthFix(this.GetViewport(e5),o2-e5.frzCols,width);
}
if (this.GetColHeader(e5)!=null){
if (this.GetViewport(e5)!=null){
if (this.GetViewport(e5).cellSpacing=="0"&&this.GetColCount(e5)>1&&this.GetViewport(e5).rules!="rows"){
if (o2==e5.frzCols&&e5.frzCols>0)width-=1;
if (o2==this.colCount-1)width-=1;
}
}
if (width<=0)width=1;
document.getElementById(e5.id+"col"+o2).width=width;
this.SetWidthFix(this.GetColHeader(e5),o2-e5.frzCols,width);
if (this.GetViewport(e5)!=null){
if (this.GetViewport(e5).cellSpacing=="0"&&this.GetColCount(e5)>1&&this.GetViewport(e5).rules!="rows"){
if (o2==this.GetColCount(e5)-1)width+=1;
}
}
}
if (this.GetColFooter(e5)!=null){
var f4=this.GetColGroup(this.GetColFooter(e5));
if (f4==null||f4.childNodes.length==0){
f4=this.GetColGroup(this.GetColHeader(e5));
}
v1=this.AddColInfo(e5,f4.childNodes[o2-e5.frzCols].getAttribute("FpCol"));
if (this.GetColFooter(e5).cellSpacing=="0"&&this.GetColCount(e5)>1&&this.GetColFooter(e5).rules!="rows"){
if (o2==0)width-=1;
}
if (width==0)width=1;
if (f4!=null)
f4.childNodes[o2-e5.frzCols].width=width;
this.SetWidthFix(this.GetColFooter(e5),o2-e5.frzCols,width);
}
}
var f0=this.GetTopSpread(e5);
this.SizeAll(f0);
this.Refresh(f0);
if (o2<e5.frzCols&&this.GetFrozColHeader(e5)!=null){
var v2=parseInt(this.GetFrozColHeader(e5).parentNode.parentNode.style.width);
this.GetFrozColHeader(e5).parentNode.parentNode.style.width=(v2+width-oldWidth)+"px";
var v3=this.GetColGroup(this.GetTopTable(e5));
if (v3!=null){
var v4=this.GetFrozColHeader(e5).parentNode.parentNode.cellIndex;
var v2=parseInt(v3.childNodes[1].width);
v3.childNodes[v4].width=(v2+width-oldWidth)+"px";
}
}
if (v1!=null){
var o4=v1.getElementsByTagName("width");
if (o4!=null&&o4.length>0)
o4[0].innerHTML=width;
else {
if (document.all!=null){
o4=this.GetData(e5).createNode("element","width","");
}else {
o4=document.createElement('width');
o4.style.display="none";
}
v1.appendChild(o4);
o4.innerHTML=width;
}
}
var g0=this.GetCmdBtn(e5,"Update");
if (g0!=null)this.UpdateCmdBtnState(g0,false);
e5.e3=true;
}
this.SetWidthFix=function (e8,o2,width){
if (e8==null||e8.rows.length==0)return ;
var f2=0;
var v5=0;
var j4=e8.rows[0].cells[0];
var v6=j4.colSpan;
if (v6==null)v6=1;
while (o2>=v5+v6){
f2++;
v5=v5+v6;
j4=e8.rows[0].cells[f2];
v6=j4.colSpan;
if (v6==null)v6=1;
}
j4.width=width;
}
this.GetRowInfo=function (e5,h3){
var f7=this.GetData(e5);
var f8=f7.getElementsByTagName("root")[0];
var o7=f8.getElementsByTagName("state")[0];
var j1=o7.getElementsByTagName("rowinfo")[0];
var g1=j1.firstChild;
while (g1!=null){
if (g1.getAttribute("key")==""+h3)return g1;
g1=g1.nextSibling;
}
return null;
}
this.GetRowHeight=function (r8){
if (r8==null)return null;
var v7=r8.getElementsByTagName("height");
if (v7!=null&&v7.length>0)return v7[0].innerHTML;
return 0;
}
this.AddRowInfo=function (e5,h3){
var o4=this.GetRowInfo(e5,h3);
if (o4!=null)return o4;
var f7=this.GetData(e5);
var f8=f7.getElementsByTagName("root")[0];
var o7=f8.getElementsByTagName("state")[0];
var j1=o7.getElementsByTagName("rowinfo")[0];
if (document.all!=null){
o4=this.GetData(e5).createNode("element","row","");
}else {
o4=document.createElement('row');
o4.style.display="none";
}
o4.setAttribute("key",h3);
j1.appendChild(o4);
return o4;
}
this.GetTopSpread=function (g4)
{
if (g4==null)return null;
var g6=this.GetSpread(g4);
if (g6==null)return null;
var g1=g6.parentNode;
while (g1!=null&&g1.tagName!="BODY")
{
if (g1.getAttribute("FpSpread")=="Spread"){
if (g1.getAttribute("hierView")=="true")
g6=g1;
else 
break ;
}
g1=g1.parentNode;
}
return g6;
}
this.GetParentSpread=function (e5)
{
var v8=e5.getAttribute("parentSpread");
if (v8!=null){
if (v8.length<=0)
return null;
else 
return document.getElementById(v8);
}
else {
try {
var g1=e5.parentNode;
while (g1!=null&&g1!=document&&g1.getAttribute("FpSpread")!="Spread")g1=g1.parentNode;
if (g1!=null&&g1!=document&&g1.getAttribute("hierView")=="true"){
e5.setAttribute("parentSpread",g1.id);
return g1;
}
else {
e5.setAttribute("parentSpread","");
return null;
}
}catch (g4){
e5.setAttribute("parentSpread","");
return null;
}
}
}
this.SetRowHeight=function (e5,r8,height){
if (r8==null)return ;
var o4=r8.getElementsByTagName("height");
if (o4!=null&&o4.length>0)
o4[0].innerHTML=height;
else {
if (document.all!=null){
o4=this.GetData(e5).createNode("element","height","");
}else {
o4=document.createElement('height');
o4.style.display="none";
}
r8.appendChild(o4);
o4.innerHTML=height;
}
var g0=this.GetCmdBtn(e5,"Update");
if (g0!=null)this.UpdateCmdBtnState(g0,false);
e5.e3=true;
}
this.SetActiveRow=function (e5,j1){
if (this.GetRowCount(e5)<1)return ;
if (j1==null)j1=-1;
var f7=this.GetData(e5);
var f8=f7.getElementsByTagName("root")[0];
var o7=f8.getElementsByTagName("state")[0];
var o8=o7.firstChild;
while (o8!=null&&o8.tagName!="activerow"&&o8.tagName!="ACTIVEROW"){
o8=o8.nextSibling;
}
if (o8!=null)
o8.innerHTML=""+j1;
if (j1!=null&&e5.getAttribute("IsNewRow")!="true"&&e5.getAttribute("AllowInsert")=="true"){
var g0=this.GetCmdBtn(e5,"Insert");
this.UpdateCmdBtnState(g0,false);
g0=this.GetCmdBtn(e5,"Add");
this.UpdateCmdBtnState(g0,false);
}else {
var g0=this.GetCmdBtn(e5,"Insert");
this.UpdateCmdBtnState(g0,true);
g0=this.GetCmdBtn(e5,"Add");
this.UpdateCmdBtnState(g0,true);
}
if (j1!=null&&e5.getAttribute("IsNewRow")!="true"&&(e5.getAttribute("AllowDelete")==null||e5.getAttribute("AllowDelete")=="true")){
var g0=this.GetCmdBtn(e5,"Delete");
this.UpdateCmdBtnState(g0,(j1==-1));
}else {
var g0=this.GetCmdBtn(e5,"Delete");
this.UpdateCmdBtnState(g0,true);
}
e5.e3=true;
}
this.SetActiveCol=function (e5,o2){
var f7=this.GetData(e5);
var f8=f7.getElementsByTagName("root")[0];
var o7=f8.getElementsByTagName("state")[0];
var o9=o7.firstChild;
while (o9!=null&&o9.tagName!="activecolumn"&&o9.tagName!="ACTIVECOLUMN"){
o9=o9.nextSibling;
}
if (o9!=null)
o9.innerHTML=""+parseInt(o2);
e5.e3=true;
}
this.GetEditor=function (h6){
if (h6==null)return null;
var t4=this.GetCellType(h6);
if (t4=="readonly")return null;
var i6=h6.getElementsByTagName("DIV");
if (t4=="MultiColumnComboBoxCellType"){
if (i6!=null&&i6.length>0){
var g1=i6[0];
g1.type="div";
return g1;
}
}
i6=h6.getElementsByTagName("INPUT");
if (i6!=null&&i6.length>0){
var g1=i6[0];
while (g1!=null&&g1.getAttribute&&g1.getAttribute("FpEditor")==null)
g1=g1.parentNode;
if (g1!=null&&!g1.getAttribute)g1=null;
return g1;
}
i6=h6.getElementsByTagName("SELECT");
if (i6!=null&&i6.length>0){
var g1=i6[0];
return g1;
}
return null;
}
this.GetPageActiveSpread=function (){
var v9=document.documentElement.getAttribute("FpActiveSpread");
var g1=null;
if (v9!=null)g1=document.getElementById(v9);
return g1;
}
this.GetPageActiveSheetView=function (){
var v9=document.documentElement.getAttribute("FpActiveSheetView");
var g1=null;
if (v9!=null)g1=document.getElementById(v9);
return g1;
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
var f1=the_fpSpread.spreads.length;
for (var f2=0;f2<f1;f2++){
if (the_fpSpread.spreads[f2]!=null)the_fpSpread.SizeSpread(the_fpSpread.spreads[f2]);
}
}
this.DocScroll=function (event){
if (the_fpSpread.spreads==null||!the_fpSpread.editing)return ;
var e5=the_fpSpread.GetPageActiveSpread();
if (e5!=null)e5.EndEdit();
}
this.DblClick=function (event){
var h6=this.GetCell(this.GetTarget(event),true,event);
var e5=this.GetSpread(h6);
if (h6!=null&&!this.IsHeaderCell(h6)&&this.GetOperationMode(e5)=="RowMode"&&this.GetEnableRowEditTemplate(e5)=="true"&&!e5.getAttribute("LayoutMode")){
var w0=h6.getElementsByTagName("DIV");
if (w0!=null&&w0.length>0&&w0[0].id==e5.id+"_RowEditTemplateContainer")return ;
this.Edit(e5,this.GetRowKeyFromCell(e5,h6));
var g0=this.GetCmdBtn(e5,"Cancel");
if (g0!=null)
this.UpdateCmdBtnState(g0,false);
return ;
}
if (h6!=null&&!this.IsHeaderCell(h6)&&h6==e5.d2)this.StartEdit(e5,h6);
}
this.GetEvent=function (g4){
if (g4!=null)return g4;
return window.event;
}
this.GetTarget=function (g4){
g4=this.GetEvent(g4);
if (g4.target==document){
if (g4.currentTarget!=null)return g4.currentTarget;
}
if (g4.target!=null)return g4.target;
return g4.srcElement;
}
this.StartEdit=function (e5,editCell){
var w1=this.GetOperationMode(e5);
if (w1=="SingleSelect"||w1=="ReadOnly"||this.editing)return ;
if (w1=="RowMode"&&this.GetEnableRowEditTemplate(e5)=="true"&&!e5.getAttribute("LayoutMode"))return ;
var h6=editCell;
if (h6==null)h6=e5.d2;
if (h6==null)return ;
this.renderAsEditor=-1;
var i6=this.GetEditor(h6);
if (i6!=null){
this.editing=true;
this.a9=i6;
this.renderAsEditor=1;
}
var k1=this.IsXHTML(e5);
if (h6!=null){
var h3=this.GetRowFromCell(e5,h6);
var h5=this.GetColFromCell(e5,h6);
var g4=this.CreateEvent("EditStart");
g4.cell=h6;
g4.row=this.GetSheetIndex(e5,h3);
g4.col=h5;
g4.cancel=false;
this.FireEvent(e5,g4);
if (g4.cancel)return ;
var t4=this.GetCellType(h6);
if (t4=="readonly")return ;
if (e5.d2!=h6){
e5.d2=h6;
this.SetActiveRow(e5,this.GetRowKeyFromCell(e5,h6));
this.SetActiveCol(e5,e5.getAttribute("LayoutMode")?this.GetColKeyFromCell2(h6):this.GetColKeyFromCell(e5,h6));
}
if (i6==null){
var j6=this.GetRender(h6);
var w2=this.GetValueFromRender(e5,j6);
if (w2==" ")w2="";
this.b0=w2;
this.b1=this.GetFormulaFromCell(h6);
if (this.b1!=null)w2=this.b1;
try {
if (j6!=h6){
j6.style.display="none";
}
else {
j6.innerHTML="";
}
}catch (g4){
return ;
}
var w3=this.GetCellEditorID(e5,h6);
if (w3!=null&&w3.length>0){
this.a9=this.GetCellEditor(e5,w3,true);
if (!this.a9.getAttribute("MccbId")&&!this.a9.getAttribute("Extenders"))
this.a9.style.display="inline";
else 
this.a9.style.display="block";
}else {
this.a9=document.createElement("INPUT");
this.a9.type="text";
}
this.a9.style.fontFamily=j6.style.fontFamily;
this.a9.style.fontSize=j6.style.fontSize;
this.a9.style.fontWeight=j6.style.fontWeight;
this.a9.style.fontStyle=j6.style.fontStyle;
this.a9.style.textDecoration=j6.style.textDecoration;
this.a9.style.position="";
if (k1){
var k8=h6.clientWidth-2;
var w4=parseInt(h6.style.paddingLeft);
if (!isNaN(w4))
k8-=w4;
w4=parseInt(h6.style.paddingRight);
if (!isNaN(w4))
k8-=w4;
this.a9.style.width=""+k8+"px";
}
else 
this.a9.style.width=h6.clientWidth-2;
this.SaveMargin(h6);
if (this.a9.tagName=="TEXTAREA")
this.a9.style.height=""+(h6.offsetHeight-4)+"px";
if ((this.a9.tagName=="INPUT"&&this.a9.type=="text")||this.a9.tagName=="TEXTAREA"){
if (this.a9.style.backgroundColor==""||this.a9.backColorSet!=null){
var w5="";
if (document.defaultView!=null&&document.defaultView.getComputedStyle!=null)w5=document.defaultView.getComputedStyle(h6,'').getPropertyValue("background-color");
if (w5!="")
this.a9.style.backgroundColor=w5;
else 
this.a9.style.backgroundColor=h6.bgColor;
this.a9.backColorSet=true;
}
if (this.a9.style.color==""||this.a9.colorSet!=null){
var w6="";
if (document.defaultView!=null&&document.defaultView.getComputedStyle!=null)w6=document.defaultView.getComputedStyle(h6,'').getPropertyValue("color");
this.a9.style.color=w6;
this.a9.colorSet=true;
}
this.a9.style.borderWidth="0px";
this.RestoreMargin(this.a9,false);
}
this.renderAsEditor=0;
h6.insertBefore(this.a9,h6.firstChild);
this.SetEditorValue(this.a9,w2,e5);
if (this.a9.offsetHeight<h6.clientHeight&&this.a9.tagName!="TEXTAREA"){
if (h6.vAlign=="middle")
this.a9.style.posTop+=(h6.clientHeight-this.a9.offsetHeight)/2;
else if (h6.vAlign=="bottom")
this.a9.style.posTop+=(h6.clientHeight-this.a9.offsetHeight);
}
this.SizeAll(this.GetTopSpread(e5));
}
this.SetEditorFocus(this.a9);
if (e5.getAttribute("EditMode")=="replace"){
if ((this.a9.tagName=="INPUT"&&this.a9.type=="text")||this.a9.tagName=="TEXTAREA")
this.a9.select();
}
this.editing=true;
var g0=this.GetCmdBtn(e5,"Update");
if (g0!=null&&g0.disabled)
this.UpdateCmdBtnState(g0,false);
g0=this.GetCmdBtn(e5,"Copy");
if (g0!=null&&!g0.disabled)
this.UpdateCmdBtnState(g0,true);
g0=this.GetCmdBtn(e5,"Paste");
if (g0!=null&&!g0.disabled)
this.UpdateCmdBtnState(g0,true);
g0=this.GetCmdBtn(e5,"Clear");
if (g0!=null&&!g0.disabled)
this.UpdateCmdBtnState(g0,true);
}
this.ScrollView(e5);
}
this.GetCurrency=function (validator){
var w7=validator.CurrencySymbol;
if (w7!=null)return w7;
var g1=document.getElementById(validator.id+"cs");
if (g1!=null){
return g1.innerHTML;
}
return "";
}
this.GetValueFromRender=function (e5,rd){
var j7=this.GetCellType2(this.GetCell(rd));
if (j7!=null){
if (j7=="text")j7="TextCellType";
var i5=null;
if (j7=="ExtenderCellType"){
i5=this.GetFunction(j7+"_getEditor")
if (i5!=null){
if (i5(rd)!=null)
i5=this.GetFunction(j7+"_getEditorValue");
else 
i5=null;
}
}else 
i5=this.GetFunction(j7+"_getValue");
if (i5!=null){
return i5(rd,e5);
}
}
var g1=rd;
while (g1.firstChild!=null&&g1.firstChild.nodeName!="#text")g1=g1.firstChild;
if (g1.innerHTML=="&nbsp;")return "";
var w2=g1.value;
if ((typeof(w2)=="undefined")&&j7=="readonly"&&g1.parentNode!=null&&g1.parentNode.getAttribute("CellType2")=="TagCloudCellType")
w2=g1.textContent;
if (w2==null){
w2=this.ReplaceAll(g1.innerHTML,"&nbsp;"," ");
w2=this.ReplaceAll(w2,"<br>"," ");
w2=this.HTMLDecode(w2);
}
return w2;
}
this.ReplaceAll=function (val,u4,dest){
if (val==null)return val;
var w8=val.length;
while (true){
val=val.replace(u4,dest);
if (val.length==w8)break ;
w8=val.length;
}
return val;
}
this.GetFormula=function (e5,h3,h5){
h3=this.GetDisplayIndex(e5,h3);
var h6=this.GetCellFromRowCol(e5,h3,h5);
var w9=this.GetFormulaFromCell(h6);
return w9;
}
this.SetFormula=function (e5,h3,h5,i5,recalc,clientOnly){
h3=this.GetDisplayIndex(e5,h3);
var h6=this.GetCellFromRowCol(e5,h3,h5);
h6.setAttribute("FpFormula",i5);
if (!clientOnly)
this.SetCellValue(e5,h6,i5,null,recalc);
}
this.GetFormulaFromCell=function (rd){
var w2=null;
if (rd.getAttribute("FpFormula")!=null){
w2=rd.getAttribute("FpFormula");
}
if (w2!=null)
w2=this.Trim(new String(w2));
return w2;
}
this.IsDouble=function (val,decimalchar,negsign,possign,minimumvalue,maximumvalue){
if (val==null||val.length==0)return true;
val=the_fpSpread.Trim(val);
if (val.length==0)return true;
if (negsign!=null)val=val.replace(negsign,"-");
if (possign!=null)val=val.replace(possign,"+");
if (val.charAt(val.length-1)=="-")val="-"+val.substring(0,val.length-1);
var x0=new RegExp("^\\s*([-\\+])?(\\d+)?(\\"+decimalchar+"(\\d+))?([eE]([-\\+])?(\\d+))?\\s*$");
var x1=val.match(x0);
if (x1==null)
return false;
if ((x1[2]==null||x1[2].length==0)&&(x1[4]==null||x1[4].length==0))return false;
var x2="";
if (x1[1]!=null&&x1[1].length>0)x2=x1[1];
if (x1[2]!=null&&x1[2].length>0)
x2+=x1[2];
else 
x2+="0";
if (x1[4]!=null&&x1[4].length>0)
x2+=("."+x1[4]);
if (x1[6]!=null&&x1[6].length>0){
x2+=("E"+x1[6]);
if (x1[7]!=null)
x2+=(x1[7]);
else 
x2+="0";
}
var x3=parseFloat(x2);
if (isNaN(x3))return false;
var g1=true;
if (minimumvalue!=null){
var x4=parseFloat(minimumvalue);
g1=(!isNaN(x4)&&x3>=x4);
}
if (g1&&maximumvalue!=null){
var j3=parseFloat(maximumvalue);
g1=(!isNaN(j3)&&x3<=j3);
}
return g1;
}
this.GetFunction=function (fn){
if (fn==null||fn=="")return null;
try {
var g1=eval(fn);
return g1;
}catch (g4){
return null;
}
}
this.SetValueToRender=function (rd,val,valueonly){
var i5=null;
var j7=this.GetCellType2(this.GetCell(rd));
if (j7!=null){
if (j7=="text")j7="TextCellType";
if (j7=="ExtenderCellType"){
i5=this.GetFunction(j7+"_getEditor")
if (i5!=null){
if (i5(rd)!=null)
i5=this.GetFunction(j7+"_setEditorValue");
else 
i5=null;
}
}else 
i5=this.GetFunction(j7+"_setValue");
}
if (i5!=null){
i5(rd,val);
}else {
if (typeof(rd.value)!="undefined"){
if (val==null)val="";
rd.value=val;
}else {
var g1=rd;
while (g1.firstChild!=null&&g1.firstChild.nodeName!="#text")g1=g1.firstChild;
g1.innerHTML=this.ReplaceAll(val," ","&nbsp;");
}
}
if ((valueonly==null||!valueonly)&&rd.getAttribute("FpFormula")!=null){
rd.setAttribute("FpFormula",val);
}
}
this.Trim=function (t5){
var x1=t5.match(new RegExp("^\\s*(\\S+(\\s+\\S+)*)\\s*$"));
return (x1==null)?"":x1[1];
}
this.GetOffsetLeft=function (e5,h6,j0){
var e8=j0;
if (e8==null)e8=this.GetViewportFromCell(e5,h6);
var r9=0;
var g1=h6;
while (g1!=null&&g1!=e8&&this.IsChild(g1,e8)){
r9+=g1.offsetLeft;
g1=g1.offsetParent;
}
return r9;
}
this.GetOffsetTop=function (e5,h6,j0){
var e8=j0;
if (e8==null)e8=this.GetViewportFromCell(e5,h6);
var x5=0;
var g1=h6;
while (g1!=null&&g1!=e8&&this.IsChild(g1,e8)){
x5+=g1.offsetTop;
g1=g1.offsetParent;
}
return x5;
}
this.SetEditorFocus=function (g1){
if (g1==null)return ;
var x6=true;
var h6=this.GetCell(g1,true);
var j7=this.GetCellType(h6);
if (j7!=null){
var i5=this.GetFunction(j7+"_setFocus");
if (i5!=null){
i5(g1);
x6=false;
}
}
if (x6){
try {
g1.focus();
}catch (g4){}
}
}
this.SetEditorValue=function (g1,val,e5){
var h6=this.GetCell(g1,true);
var j7=this.GetCellType(h6);
if (j7!=null){
var i5=this.GetFunction(j7+"_setEditorValue");
if (i5!=null){
i5(g1,val,e5);
return ;
}
}
j7=g1.getAttribute("FpEditor");
if (j7!=null){
var i5=this.GetFunction(j7+"_setEditorValue");
if (i5!=null){
i5(g1,val,e5);
return ;
}
}
g1.value=val;
}
this.GetEditorValue=function (g1){
var h6=this.GetCell(g1,true);
var j7=this.GetCellType(h6);
if (j7!=null){
var i5=this.GetFunction(j7+"_getEditorValue");
if (i5!=null){
return i5(g1);
}
}
j7=g1.getAttribute("FpEditor");
if (j7!=null){
var i5=this.GetFunction(j7+"_getEditorValue");
if (i5!=null){
return i5(g1);
}
}
if (g1.type=="checkbox"){
if (g1.checked)
return "True";
else 
return "False";
}
else {
return g1.value;
}
}
this.CreateMsg=function (){
if (this.validationMsg!=null)return ;
var g1=this.validationMsg=document.createElement("div");
g1.style.position="absolute";
g1.style.background="yellow";
g1.style.color="red";
g1.style.border="1px solid black";
g1.style.display="none";
}
this.SetMsg=function (msg){
this.CreateMsg();
this.validationMsg.innerHTML=msg;
this.validationMsg.width=this.validationMsg.offsetWidth+6;
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
var h6=this.GetCell(this.a9.parentNode);
var e5=this.GetSpread(h6,false);
if (e5==null)return true;
var x7=this.GetEditorValue(this.a9);
var x8=x7;
if (typeof(x7)=="string")x8=this.Trim(x7);
var x9=(e5.getAttribute("AcceptFormula")=="true"&&x8!=null&&x8.charAt(0)=='=');
var i6=(this.renderAsEditor!=0);
if (!x9&&!i6){
var y0=null;
var j7=this.GetCellType(h6);
if (j7!=null){
var i5=this.GetFunction(j7+"_isValid");
if (i5!=null){
y0=i5(h6,x7);
}
}
if (y0!=null&&y0!=""){
this.SetMsg(y0);
this.GetViewport(e5).parentNode.insertBefore(this.validationMsg,this.GetViewport(e5).parentNode.firstChild);
this.ShowMsg(true);
this.SetValidatorPos(e5);
this.a9.focus();
return false;
}else {
this.ShowMsg(false);
}
}
if (!i6){
h6.removeChild(this.a9);
this.a9.style.display="none";
this.GetViewport(e5).parentNode.appendChild(this.a9);
this.SetEditorValue(this.a9,"",e5);
var y1=this.GetRender(h6);
if (y1.style.display=="none")y1.style.display="block";
if (this.b1!=null&&this.b1==x7){
this.SetValueToRender(y1,this.b0,true);
}else {
this.SetValueToRender(y1,x7);
}
this.RestoreMargin(h6);
}
if ((this.b1!=null&&this.b1!=x7)||(this.b1==null&&this.b0!=x7)){
this.SetCellValue(e5,h6,x7);
if (x7!=null&&x7.length>0&&x7.indexOf("=")==0)h6.setAttribute("FpFormula",x7);
}
if (!i6)
this.SizeAll(this.GetTopSpread(e5));
this.a9=null;
this.editing=false;
var g4=this.CreateEvent("EditStopped");
g4.cell=h6;
this.FireEvent(e5,g4);
this.Focus(e5);
var y2=e5.getAttribute("autoCalc");
if (y2!="false"){
if ((this.b1!=null&&this.b1!=x7)||(this.b1==null&&this.b0!=x7)){
this.UpdateValues(e5);
}
}
}
this.renderAsEditor=-1;
return true;
}
this.SetValidatorPos=function (e5){
if (this.a9==null)return ;
var h6=this.GetCell(this.a9.parentNode);
if (h6==null)return ;
var g1=this.validationMsg;
if (g1!=null&&g1.style.display!="none"){
var n8=this.GetViewport0(e5);
var f5=this.GetViewport1(e5);
var y3=this.GetViewport2(e5);
var e8=this.GetViewport(e5);
var q4=0;
if (this.GetColHeader(e5)!=null)q4=this.GetColHeader(e5).offsetHeight;
if ((n8!=null||f5!=null)&&(this.IsChild(h6,y3)||this.IsChild(h6,e8))){
if (n8!=null)
q4+=n8.offsetHeight;
else 
q4+=f5.offsetHeight;
}
var y4=0;
if (this.GetRowHeader(e5)!=null)y4=this.GetRowHeader(e5).offsetWidth;
if ((n8!=null||y3!=null)&&(this.IsChild(h6,f5)||this.IsChild(h6,e8)))
{
if (n8!=null)
y4+=n8.offsetWidth;
else 
y4+=y3.offsetWidth;
}
if (e5.frzRows==0&&e5.frzCols==0){
q4=0;
y4=0;
}else {
if (e8!=null&&this.IsChild(h6,e8)){
q4-=e8.parentNode.scrollTop;
y4-=e8.parentNode.scrollLeft;
}
}
g1.style.left=""+(y4+h6.offsetLeft)+"px";
g1.style.top=""+(q4+h6.offsetTop+h6.offsetHeight)+"px";
if (h6.offsetTop+h6.offsetHeight+g1.offsetHeight+16>g1.parentNode.offsetHeight)
g1.style.top=""+(q4+h6.offsetTop-g1.offsetHeight-1)+"px";
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
this.RestoreMargin=function (h6,reset){
if (this.b4.left!=null&&this.b4.left!=-1){
h6.style.paddingLeft=this.b4.left;
if (reset==null||reset)this.b4.left=-1;
}
if (this.b4.right!=null&&this.b4.right!=-1){
h6.style.paddingRight=this.b4.right;
if (reset==null||reset)this.b4.right=-1;
}
if (this.b4.top!=null&&this.b4.top!=-1){
h6.style.paddingTop=this.b4.top;
if (reset==null||reset)this.b4.top=-1;
}
if (this.b4.bottom!=null&&this.b4.bottom!=-1){
h6.style.paddingBottom=this.b4.bottom;
if (reset==null||reset)this.b4.bottom=-1;
}
}
this.PaintSelectedCell=function (e5,h6,select,anchor){
if (h6==null)return ;
var y5=anchor?e5.getAttribute("anchorBackColor"):e5.getAttribute("selectedBackColor");
if (select){
if (h6.getAttribute("bgColorBak")==null)
h6.setAttribute("bgColorBak",document.defaultView.getComputedStyle(h6,"").getPropertyValue("background-color"));
if (h6.bgColor1==null)
h6.bgColor1=h6.style.backgroundColor;
h6.style.backgroundColor=y5;
if (h6.getAttribute("bgSelImg"))
h6.style.backgroundImage=h6.getAttribute("bgSelImg");
}else {
if (h6.bgColor1!=null)
h6.style.backgroundColor="";
if (h6.bgColor1!=null&&h6.bgColor1!="")
h6.style.backgroundColor=h6.bgColor1;
h6.style.backgroundImage="";
if (h6.getAttribute("bgImg")!=null)
h6.style.backgroundImage=h6.getAttribute("bgImg");
}
}
this.PaintAnchorCell=function (e5){
var o5=this.GetOperationMode(e5);
if (e5.d2==null||(o5!="Normal"&&o5!="RowMode"))return ;
if (o5=="MultiSelect"||o5=="ExtendedSelect")return ;
if (!this.IsChild(e5.d2,e5))return ;
var y6=(e5.frzRows==0&&e5.frzCols==0)&&(this.GetTopSpread(e5).getAttribute("hierView")!="true");
if (e5.getAttribute("showFocusRect")=="false")y6=false;
if (y6){
this.PaintSelectedCell(e5,e5.d2,false);
this.PaintFocusRect(e5);
this.PaintAnchorCellHeader(e5,true);
return ;
}
var g1=e5.d2.parentNode.cells[0].firstChild;
if (g1!=null&&g1.nodeName!="#text"&&g1.getAttribute("FpSpread")=="Spread")return ;
this.PaintSelectedCell(e5,e5.d2,true,true);
this.PaintAnchorCellHeader(e5,true);
}
this.ClearSelection=function (e5,thisonly){
var y7=this.GetParentSpread(e5);
if (thisonly==null&&y7!=null&&y7.getAttribute("hierView")=="true"){
this.ClearSelection(y7);
return ;
}
var i8=this.GetViewport(e5);
var f6=this.GetRowCount(e5);
if (i8!=null&&i8.rows.length>f6){
for (var f2=0;f2<i8.rows.length;f2++){
if (i8.rows[f2].cells.length>0&&i8.rows[f2].cells[0]!=null&&i8.rows[f2].cells[0].firstChild!=null&&i8.rows[f2].cells[0].firstChild.nodeName!="#text"){
var g1=i8.rows[f2].cells[0].firstChild;
if (g1.getAttribute("FpSpread")=="Spread"){
this.ClearSelection(g1,true);
}
}
}
}
this.DoclearSelection(e5);
if (e5.d2!=null){
var w1=this.GetOperationMode(e5);
if (w1=="RowMode"||w1=="SingleSelect"||w1=="ExtendedSelect"||w1=="MultiSelect"){
var h7=this.GetRowFromCell(e5,e5.d2);
this.PaintSelection(e5,h7,-1,1,-1,false);
}
this.PaintSelectedCell(e5,e5.d2,false);
this.PaintAnchorCellHeader(e5,false);
}else {
var h6=this.GetCellFromRowCol(e5,1,0);
if (h6!=null)this.PaintSelectedCell(e5,h6,false);
}
this.PaintFocusRect(e5);
e5.selectedCols=[];
e5.e3=true;
}
this.SetSelectedRange=function (e5,h3,h5,n9,h2,t6){
this.ClearSelection(e5);
var h3=this.GetDisplayIndex(e5,h3);
var u8=0;
var y8=n9;
var i8=this.GetViewport(e5);
if (i8!=null){
for (f2=h3;f2<i8.rows.length&&u8<y8;f2++){
if (this.IsChildSpreadRow(e5,i8,f2)){;
n9++;
}else {
u8++;
}
}
}
var y9=null;
var a2=null;
if (e5.getAttribute("LayoutMode")){
if (h5>=0&&n9<0){
if (h2!=1)return ;
var j1=this.GetDisplayIndex2(e5,t6);
var h6=this.GetCellByRowCol(e5,j1,h5);
if (h6!=null&&parseInt(h6.getAttribute("col"))!=-1){
h5=parseInt(h6.getAttribute("col"));
y9=parseInt(h6.parentNode.getAttribute("row"));
a2=this.GetColFromCell(e5,h6);
}
else 
return ;
this.PaintMultipleRowSelection(e5,y9,a2,1,h2,true);
}
else if (h3>=0&&h2<0){
if (n9>parseInt(e5.getAttribute("layoutrowcount")))return ;
var z0=parseInt(this.GetRowKeyFromRow(e5,h3));
var h3=parseInt(this.GetFirstRowFromKey(e5,z0));
this.UpdateAnchorCell(e5,h3,0,true);
n9=parseInt(e5.getAttribute("layoutrowcount"));
this.PaintSelection(h3,h5,n9,h2,true);
}
else if (h3>=0&&h5>=0&&(h2>1||n9>1))
return ;
}
else 
this.PaintSelection(e5,h3,h5,n9,h2,true);
this.SetSelection(e5,h3,h5,n9,h2,null,y9,a2);
}
this.AddSelection=function (e5,h3,h5,n9,h2,t6){
var h3=this.GetDisplayIndex(e5,h3);
var u8=0;
var y8=n9;
var i8=this.GetViewport(e5);
if (i8!=null){
for (f2=h3;f2<i8.rows.length&&u8<y8;f2++){
if (this.IsChildSpreadRow(e5,i8,f2)){;
n9++;
}else {
u8++;
}
}
}
var y9;
var a2;
if (e5.getAttribute("LayoutMode")){
if (h5>=0&&n9<0){
if (h2!=1)return ;
var j1=this.GetDisplayIndex2(e5,t6);
var h6=this.GetCellByRowCol(e5,j1,h5);
if (h6!=null&&parseInt(h6.getAttribute("col"))!=-1){
y9=parseInt(h6.parentNode.getAttribute("row"));
a2=this.GetColFromCell(e5,h6);
h5=parseInt(h6.getAttribute("col"));
}
else 
return ;
this.PaintMultipleRowSelection(e5,y9,a2,1,h2,true);
}
else if (h3>=0&&h2<0){
if (n9>parseInt(e5.getAttribute("layoutrowcount")))return ;
var z0=parseInt(this.GetRowKeyFromRow(e5,h3));
var h3=parseInt(this.GetFirstRowFromKey(e5,z0));
if (e5.allowGroup){
this.ClearSelection(e5);
this.UpdateAnchorCell(e5,h3,0,true);
}
n9=parseInt(e5.getAttribute("layoutrowcount"));
this.PaintSelection(e5,h3,h5,n9,h2,true);
}
else if (h3>=0&&h5>=0&&(h2>1||n9>1))
return ;
}
else 
this.PaintSelection(e5,h3,h5,n9,h2,true);
this.SetSelection(e5,h3,h5,n9,h2,true,y9,a2);
}
this.SelectRow=function (e5,index,u8,select,ignoreAnchor){
e5.d6=index;
e5.d7=-1;
if (!ignoreAnchor)this.UpdateAnchorCell(e5,index,0,false);
e5.d8="r";
var z1=u8;
if (e5.getAttribute("LayoutMode")){
z1=parseInt(e5.getAttribute("layoutrowcount"));
}
this.PaintSelection(e5,index,-1,z1,-1,select);
if (select)
{
this.SetSelection(e5,index,-1,u8,-1);
}else {
this.RemoveSelection(e5,index,-1,u8,-1);
this.PaintFocusRect(e5);
}
}
this.SelectColumn=function (e5,index,u8,select,ignoreAnchor){
e5.d6=-1;
e5.d7=index;
if (!ignoreAnchor){
var h3=0;
var z2=index;
if (e5.getAttribute("LayoutMode")){
var h6=e5.d2;
if (parseInt(e5.d2.getAttribute("col"))==-1)return ;
if (h6){
h3=this.GetRowFromCell(e5,h6);
z2=this.GetColFromCell(e5,h6);
}
e5.copymulticol=true;
}
this.UpdateAnchorCell(e5,h3,z2,false,true);
}
e5.d8="c";
if (!e5.getAttribute("LayoutMode"))
this.PaintSelection(e5,-1,z2,-1,u8,select);
else 
this.PaintMultipleRowSelection(e5,h3,z2,1,u8,select);
if (select)
{
this.SetSelection(e5,-1,index,-1,u8,null,h3,z2);
this.AddColSelection(e5,index);
}
}
this.AddColSelection=function (e5,index){
var z3=0;
for (var f2=0;f2<e5.selectedCols.length;f2++){
if (e5.selectedCols[f2]==index)return ;
if (index>e5.selectedCols[f2])z3=f2+1;
}
e5.selectedCols.length++;
for (var f2=e5.selectedCols.length-1;f2>z3;f2--)
e5.selectedCols[f2]=e5.selectedCols[f2-1];
e5.selectedCols[z3]=index;
}
this.IsColSelected=function (e5,u9){
for (var f2=0;f2<e5.selectedCols.length;f2++)
if (e5.selectedCols[f2]==u9)return true;
return false;
}
this.SyncColSelection=function (e5){
e5.selectedCols=[];
var z4=this.GetSelectedRanges(e5);
for (var f2=0;f2<z4.length;f2++){
var i1=z4[f2];
if (i1.type=="Column"){
for (var i3=i1.col;i3<i1.col+i1.colCount;i3++){
this.AddColSelection(e5,i3);
}
}
}
}
this.InitMovingCol=function (e5,u9,isGroupBar,p4){
if (e5.getAttribute("LayoutMode")&&u9==-1)return ;
if (this.GetOperationMode(e5)!="Normal"){
e5.selectedCols=[];
e5.selectedCols.push(u9);
}
if (isGroupBar){
this.dragCol=u9;
this.dragViewCol=this.GetColByKey(e5,u9);
}else {
if (e5.getAttribute("LayoutMode"))
this.dragCol=this.GetColTemplateRowFromGroupCell(e5,u9);
else 
this.dragCol=parseInt(this.GetSheetColIndex(e5,u9));
this.dragViewCol=u9;
}
var z5=this.GetMovingCol(e5);
if (isGroupBar){
this.ClearSelection(e5);
z5.innerHTML="";
var z6=document.createElement("DIV");
z6.innerHTML=p4.innerHTML;
z6.style.borderTop="0px solid";
z6.style.borderLeft="0px solid";
z6.style.borderRight="#808080 1px solid";
z6.style.borderBottom="#808080 1px solid";
z6.style.width=""+Math.max(this.GetPreferredCellWidth(e5,p4),80)+"px";
z5.appendChild(z6);
if (e5.getAttribute("DragColumnCssClass")==null){
z5.style.backgroundColor=p4.style.backgroundColor;
z5.style.paddingTop="1px";
z5.style.paddingBottom="1px";
}
z5.style.top="-50px";
z5.style.left="-100px";
}else {
var z7=0;
z5.style.top="0px";
z5.style.left="-1000px";
z5.style.display="";
z5.innerHTML="";
var z8=document.createElement("TABLE");
z5.appendChild(z8);
var j1=document.createElement("TR");
z8.appendChild(j1);
for (var f2=0;f2<e5.selectedCols.length;f2++){
var h6=document.createElement("TD");
j1.appendChild(h6);
var z9;
var aa0;
if (e5.getAttribute("LayoutMode")){
z9=this.GetRowTemplateRowFromGroupCell(e5,u9,true);
aa0=this.GetColTemplateRowFromGroupCell(e5,u9);
}
else {
if (e5.getAttribute("columnHeaderAutoTextIndex")!=null)
z9=parseInt(e5.getAttribute("columnHeaderAutoTextIndex"));
else 
z9=e5.getAttribute("ColHeaders")-1;
aa0=e5.selectedCols[f2];
}
var aa1=this.GetHeaderCellFromRowCol(e5,z9,aa0,true);
if (aa1.getAttribute("FpCellType")=="ExtenderCellType"&&aa1.getElementsByTagName("DIV").length>0){
var aa2=this.GetEditor(aa1);
var aa3=this.GetFunction("ExtenderCellType_getEditorValue");
if (aa2!=null&&aa3!=null){
h6.innerHTML=aa3(aa2);
}
}
else 
h6.innerHTML=aa1.innerHTML;
h6.style.cssText=aa1.style.cssText;
h6.style.borderTop="0px solid";
h6.style.borderLeft="0px solid";
h6.style.borderRight="#808080 1px solid";
h6.style.borderBottom="#808080 1px solid";
h6.setAttribute("align","center");
var j5=Math.max(this.GetPreferredCellWidth(e5,aa1),80);
h6.style.width=""+j5+"px";
z7+=j5;
}
if (e5.getAttribute("DragColumnCssClass")==null){
z5.style.backgroundColor=e5.getAttribute("SelectedBackColor");
z5.style.tableLayout="fixed";
z5.style.width=""+z7+"px";
}
}
e5.selectedCols.context=[];
var aa4=e5.selectedCols.context;
var r9=0;
var f4=this.GetColGroup(this.GetFrozColHeader(e5));
if (f4!=null){
for (var f2=0;f2<f4.childNodes.length;f2++){
var aa5=f4.childNodes[f2].offsetWidth;
aa4.push({left:r9,width:aa5});
r9+=aa5;
}
}
f4=this.GetColGroup(this.GetColHeader(e5));
if (f4!=null){
for (var f2=0;f2<f4.childNodes.length;f2++){
var aa5=f4.childNodes[f2].offsetWidth;
aa4.push({left:r9,width:aa5});
r9+=aa5;
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
this.GetSpanCell=function (h3,h5,span){
if (span==null){
return null;
}
var u8=span.length;
for (var f2=0;f2<u8;f2++){
var s1=span[f2];
var aa6=(s1.row<=h3&&h3<s1.row+s1.rowCount&&s1.col<=h5&&h5<s1.col+s1.colCount);
if (aa6)return s1;
}
return null;
}
this.IsCovered=function (e5,h3,h5,span){
var s1=this.GetSpanCell(h3,h5,span);
if (s1==null){
return false;
}else {
if (s1.row==h3&&s1.col==h5)return false;
return true;
}
}
this.IsSpanCell=function (e5,h3,h5){
var e0=e5.e0;
var u8=e0.length;
for (var f2=0;f2<u8;f2++){
var s1=e0[f2];
var aa6=(s1.row==h3&&s1.col==h5);
if (aa6)return s1;
}
return null;
}
this.SelectRange=function (e5,h3,h5,n9,h2,select){
e5.d8="";
this.UpdateRangeSelection(e5,h3,h5,n9,h2,select);
if (select){
this.SetSelection(e5,h3,h5,n9,h2);
this.PaintAnchorCell(e5);
}
}
this.UpdateRangeSelection=function (e5,h3,h5,n9,h2,select){
var i8=this.GetViewport(e5);
this.UpdateRangeSelection(e5,h3,h5,n9,h2,select,i8);
}
this.GetSpanCells=function (e5,i8){
if (i8==this.GetViewport(e5)||i8==this.GetViewport1(e5)||i8==this.GetViewport2(e5)||i8==this.GetViewport0(e5))
return e5.e0;
else if (i8==this.GetColHeader(e5)||i8==this.GetFrozColHeader(e5))
return e5.e2;
else if (i8==this.GetRowHeader(e5)||i8==this.GetFrozRowHeader(e5))
return e5.e1;
return null;
}
this.UpdateRangeSelection=function (e5,h3,h5,n9,h2,select,i8){
if (i8==null)return ;
for (var f2=h3;f2<h3+n9&&f2<i8.rows.length;f2++){
if (this.IsChildSpreadRow(e5,i8,f2))continue ;
var aa7=this.GetCellIndex(e5,f2,h5,this.GetSpanCells(e5,i8));
for (var i3=0;i3<h2;i3++){
if (this.IsCovered(e5,f2,h5+i3,this.GetSpanCells(e5,i8)))continue ;
if (aa7<i8.rows[f2].cells.length){
this.PaintSelectedCell(e5,i8.rows[f2].cells[aa7],select);
}
aa7++;
}
}
}
this.GetColFromCell=function (e5,h6){
if (h6==null)return -1;
var h3=this.GetRowFromCell(e5,h6);
return this.GetColIndex(e5,h3,h6.cellIndex,this.GetSpanCells(e5,h6.parentNode.parentNode.parentNode),this.InFrozCols(e5,h6),this.IsChild(h6,this.GetFrozRowHeader(e5))||this.IsChild(h6,this.GetRowHeader(e5)));
}
this.GetRowFromCell=function (e5,h6){
if (h6==null||h6.parentNode==null)return -1;
var h3=h6.parentNode.rowIndex;
if (e5.frzRows>0&&(this.IsChild(h6,this.GetViewport2(e5))||this.IsChild(h6,this.GetViewport(e5))||this.IsChild(h6,this.GetRowHeader(e5)))){
h3+=e5.frzRows;
}
return h3;
}
this.GetColIndex=function (e5,f2,u2,span,frozArea,c6){
var aa8=0;
var u8=this.GetColCount(e5);
var aa9=e5.frzCols;
if (frozArea){
u8=e5.frzCols;
aa9=0;
}else if (c6){
aa9=0;
var f4=null;
if (this.GetFrozRowHeader(e5)!=null)
f4=this.GetColGroup(this.GetFrozRowHeader(e5));
else if (this.GetRowHeader(e5)!=null)
f4=this.GetColGroup(this.GetRowHeader(e5));
if (f4!=null)
u8=f4.childNodes.length;
}
for (var i3=aa9;i3<u8;i3++){
if (this.IsCovered(e5,f2,i3,span))continue ;
if (aa8==u2){
return i3;
}
aa8++;
}
return u8;
}
this.GetCellIndex=function (e5,f2,u9,span){
var ab0=false;
var e8=this.GetViewport(e5);
if (e8!=null)ab0=e8.parentNode.getAttribute("hiddenCells");
if (ab0&&span==e5.e0){
if (span!=e5.e1&&u9>=e5.frzCols){
return u9-e5.frzCols;
}
return u9;
}else {
var aa9=0;
var u8=u9;
if (span!=e5.e1&&u9>=e5.frzCols){
aa9=e5.frzCols;
u8=u9-e5.frzCols;
}
var aa8=0;
for (var i3=0;i3<u8;i3++){
if (this.IsCovered(e5,f2,aa9+i3,span))continue ;
aa8++;
}
return aa8;
}
}
this.NextCell=function (e5,event,key){
if (event.altKey)return ;
var ab1=this.GetParent(this.GetViewport(e5));
if (e5.d2==null){
var i5=this.FireActiveCellChangingEvent(e5,0,0);
if (!i5){
e5.SetActiveCell(0,0);
var g4=this.CreateEvent("ActiveCellChanged");
g4.cmdID=e5.id;
g4.row=g4.Row=0;
g4.col=g4.Col=0;
this.FireEvent(e5,g4);
}
return ;
}
if (event.shiftKey&&key!=event.DOM_VK_TAB){
this.CancelDefault(event);
var r7=this.GetOperationMode(e5);
if (r7=="RowMode"||r7=="SingleSelect"||r7=="MultiSelect"||(r7=="Normal"&&this.GetSelectionPolicy(e5)=="Single"))return ;
var s1=this.GetSpanCell(e5.d4,e5.d5,this.GetSpanCells(e5,this.GetViewportFromCell(e5,e5.d2)));
switch (key){
case event.DOM_VK_RIGHT:
var h3=e5.d4;
var h5=e5.d5+1;
if (s1!=null){
h5=s1.col+s1.colCount;
}
if (h5>this.GetColCount(e5)-1)return ;
e5.d5=h5;
e5.d3=this.GetCellFromRowCol(e5,h3,h5);
this.Select(e5,e5.d2,e5.d3);
break ;
case event.DOM_VK_LEFT:
var h3=e5.d4;
var h5=e5.d5-1;
if (s1!=null){
h5=s1.col-1;
}
s1=this.GetSpanCell(h3,h5,this.GetSpanCells(e5,this.GetViewportFromCell(e5,e5.d2)));
if (s1!=null){
if (this.IsSpanCell(e5,h3,s1.col))h5=s1.col;
}
if (h5<0)return ;
e5.d5=h5;
e5.d3=this.GetCellFromRowCol(e5,h3,h5);
this.Select(e5,e5.d2,e5.d3);
break ;
case event.DOM_VK_DOWN:
var h3=e5.d4+1;
var h5=e5.d5;
if (s1!=null){
h3=s1.row+s1.rowCount;
}
h3=this.GetNextRow(e5,h3);
if (h3>this.GetRowCountInternal(e5)-1)return ;
e5.d4=h3;
e5.d3=this.GetCellFromRowCol(e5,h3,h5);
this.Select(e5,e5.d2,e5.d3);
break ;
case event.DOM_VK_UP:
var h3=e5.d4-1;
var h5=e5.d5;
if (s1!=null){
h3=s1.row-1;
}
h3=this.GetPrevRow(e5,h3);
s1=this.GetSpanCell(h3,h5,this.GetSpanCells(e5,this.GetViewportFromCell(e5,e5.d2)));
if (s1!=null){
if (this.IsSpanCell(e5,s1.row,h5))h3=s1.row;
}
if (h3<0)return ;
e5.d4=h3;
e5.d3=this.GetCellFromRowCol(e5,h3,h5);
this.Select(e5,e5.d2,e5.d3);
break ;
case event.DOM_VK_HOME:
if (e5.d2.parentNode.rowIndex>=0){
e5.d5=0;
e5.d3=this.GetCellFromRowCol(e5,e5.d4,e5.d5);
this.Select(e5,e5.d2,e5.d3);
}
break ;
case event.DOM_VK_END:
if (e5.d2.parentNode.rowIndex>=0){
e5.d5=this.GetColCount(e5)-1;
e5.d3=this.GetCellFromRowCol(e5,e5.d4,e5.d5);
this.Select(e5,e5.d2,e5.d3);
}
break ;
case event.DOM_VK_PAGE_DOWN:
if (this.GetViewport(e5)!=null&&e5.d2.parentNode.rowIndex>=0){
h3=0;
for (h3=0;h3<this.GetViewport(e5).rows.length;h3++){
if (this.GetViewport(e5).rows[h3].offsetTop+this.GetViewport(e5).rows[h3].offsetHeight>this.GetViewport(e5).parentNode.offsetHeight+this.GetViewport(e5).parentNode.scrollTop){
break ;
}
}
h3=this.GetNextRow(e5,h3);
if (h3<this.GetViewport(e5).rows.length){
this.GetViewport(e5).parentNode.scrollTop=this.GetViewport(e5).rows[h3].offsetTop;
e5.d4=h3;
}else {
h3=this.GetRowCountInternal(e5)-1;
e5.d4=h3;
}
e5.d3=this.GetCellFromRowCol(e5,e5.d4,e5.d5);
this.Select(e5,e5.d2,e5.d3);
}
break ;
case event.DOM_VK_PAGE_UP:
if (this.GetViewport(e5)!=null&&e5.d2.parentNode.rowIndex>0){
h3=0;
for (h3=0;h3<this.GetViewport(e5).rows.length;h3++){
if (this.GetViewport(e5).rows[h3].offsetTop+this.GetViewport(e5).rows[h3].offsetHeight>this.GetViewport(e5).parentNode.scrollTop){
break ;
}
}
if (h3<this.GetViewport(e5).rows.length){
var k2=0;
while (h3>0){
k2+=this.GetViewport(e5).rows[h3].offsetHeight;
if (k2>this.GetViewport(e5).parentNode.offsetHeight){
break ;
}
h3--;
}
h3=this.GetPrevRow(e5,h3);
if (h3>=0){
this.GetViewport(e5).parentNode.scrollTop=this.GetViewport(e5).rows[h3].offsetTop;
e5.d4=h3;
e5.d3=this.GetCellFromRowCol(e5,e5.d4,e5.d5);
this.Select(e5,e5.d2,e5.d3);
}
}
}
break ;
}
this.SyncColSelection(e5);
}else {
var ab2=(key==event.DOM_VK_TAB);
if (key==event.DOM_VK_TAB){
if (event.shiftKey)key=event.DOM_VK_LEFT;
else key=event.DOM_VK_RIGHT;
}
var ab3=e5.d2;
var h3=e5.d4;
var h5=e5.d5;
switch (key){
case event.DOM_VK_RIGHT:
if (event.keyCode==event.DOM_VK_TAB){
var ab4=h3;
var ab5=h5;
do {
this.MoveRight(e5,h3,h5);
h3=e5.d4;
h5=e5.d5;
}while (!(ab4==h3&&ab5==h5)&&this.GetCellFromRowCol(e5,h3,h5).getAttribute("TabStop")!=null&&this.GetCellFromRowCol(e5,h3,h5).getAttribute("TabStop")=="false")
}
else {
this.MoveRight(e5,h3,h5);
}
break ;
case event.DOM_VK_LEFT:
if (event.keyCode==event.DOM_VK_TAB){
var ab4=h3;
var ab5=h5;
do {
this.MoveLeft(e5,h3,h5);
h3=e5.d4;
h5=e5.d5;
}while (!(ab4==h3&&ab5==h5)&&this.GetCellFromRowCol(e5,h3,h5).getAttribute("TabStop")!=null&&this.GetCellFromRowCol(e5,h3,h5).getAttribute("TabStop")=="false")
}
else {
this.MoveLeft(e5,h3,h5);
}
break ;
case event.DOM_VK_DOWN:
this.MoveDown(e5,h3,h5);
break ;
case event.DOM_VK_UP:
this.MoveUp(e5,h3,h5);
break ;
case event.DOM_VK_HOME:
if (e5.d2.parentNode.rowIndex>=0){
this.UpdateLeadingCell(e5,h3,0);
}
break ;
case event.DOM_VK_END:
if (e5.d2.parentNode.rowIndex>=0){
h5=this.GetColCount(e5)-1;
this.UpdateLeadingCell(e5,h3,h5);
}
break ;
case event.DOM_VK_PAGE_DOWN:
if (this.GetViewport(e5)!=null&&e5.d2.parentNode.rowIndex>=0){
h3=0;
for (h3=0;h3<this.GetViewport(e5).rows.length;h3++){
if (this.GetViewport(e5).rows[h3].offsetTop+this.GetViewport(e5).rows[h3].offsetHeight>this.GetViewport(e5).parentNode.offsetHeight+this.GetViewport(e5).parentNode.scrollTop){
break ;
}
}
h3=this.GetNextRow(e5,h3);
if (h3<this.GetViewport(e5).rows.length){
var g1=this.GetViewport(e5).rows[h3].offsetTop;
this.UpdateLeadingCell(e5,h3,e5.d5);
this.GetViewport(e5).parentNode.scrollTop=g1;
}else {
h3=this.GetPrevRow(e5,this.GetRowCount(e5)-1);
this.UpdateLeadingCell(e5,h3,e5.d5);
}
}
break ;
case event.DOM_VK_PAGE_UP:
if (this.GetViewport(e5)!=null&&e5.d2.parentNode.rowIndex>=0){
h3=0;
for (h3=0;h3<this.GetViewport(e5).rows.length;h3++){
if (this.GetViewport(e5).rows[h3].offsetTop+this.GetViewport(e5).rows[h3].offsetHeight>this.GetViewport(e5).parentNode.scrollTop){
break ;
}
}
if (h3<this.GetViewport(e5).rows.length){
var k2=0;
while (h3>=0){
k2+=this.GetViewport(e5).rows[h3].offsetHeight;
if (k2>this.GetViewport(e5).parentNode.offsetHeight){
break ;
}
h3--;
}
h3=this.GetPrevRow(e5,h3);
if (h3>=0){
var g1=this.GetViewport(e5).rows[h3].offsetTop;
this.UpdateLeadingCell(e5,h3,e5.d5);
this.GetViewport(e5).parentNode.scrollTop=g1;
}
}
}
break ;
}
if (ab3!=e5.d2){
var g4=this.CreateEvent("ActiveCellChanged");
g4.cmdID=e5.id;
g4.Row=g4.row=this.GetSheetIndex(e5,this.GetRowFromCell(e5,e5.d2));
g4.Col=g4.col=this.GetColFromCell(e5,e5.d2);
if (e5.getAttribute("LayoutMode"))
g4.InnerRow=g4.innerRow=e5.d2.parentNode.getAttribute("row");
this.FireEvent(e5,g4);
}
var r7=this.GetOperationMode(e5);
if (r7=="ExtendedSelect")this.SelectRow(e5,e5.d4,1,true,true);
}
var h6=this.GetCellFromRowCol(e5,e5.d4,e5.d5);
if (key==event.DOM_VK_LEFT&&h6.offsetLeft<ab1.scrollLeft){
if (h6.cellIndex>0)
ab1.scrollLeft=e5.d2.offsetLeft;
else 
ab1.scrollLeft=0;
}else if (h6.cellIndex==0){
ab1.scrollLeft=0;
}
if (key==event.DOM_VK_RIGHT&&h6.offsetLeft+h6.offsetWidth>ab1.scrollLeft+ab1.offsetWidth-10){
ab1.scrollLeft+=h6.offsetWidth;
}
if (key==event.DOM_VK_UP&&h6.parentNode.offsetTop<ab1.scrollTop){
if (h6.parentNode.rowIndex>1)
ab1.scrollTop=h6.parentNode.offsetTop;
else 
ab1.scrollTop=0;
}else if (h6.parentNode.rowIndex==1){
ab1.scrollTop=0;
}
var ab6=this.GetParent(this.GetViewport(e5));
ab1=this.GetParent(this.GetViewport(e5));
if (key==event.DOM_VK_DOWN&&(this.IsChild(h6,ab1)||this.IsChild(h6,this.GetViewport2(e5)))&&h6.offsetTop+h6.offsetHeight>ab1.scrollTop+ab1.clientHeight){
ab6.scrollTop+=h6.offsetHeight;
}
if (h6!=null&&h6.offsetWidth<ab1.clientWidth){
if ((this.IsChild(h6,ab1)||this.IsChild(h6,this.GetViewport1(e5)))&&h6.offsetLeft+h6.offsetWidth>ab1.scrollLeft+ab1.clientWidth){
ab6.scrollLeft=h6.offsetLeft+h6.offsetWidth-ab1.clientWidth;
}
}
if ((this.IsChild(h6,ab1)||this.IsChild(h6,this.GetViewport1(e5)))&&h6.offsetTop+h6.offsetHeight>ab1.scrollTop+ab1.clientHeight&&h6.offsetHeight<ab1.clientHeight){
ab6.scrollTop=h6.offsetTop+h6.offsetHeight-ab1.clientHeight;
}
if (h6.offsetTop<ab1.scrollTop){
ab6.scrollTop=h6.offsetTop;
}
this.ScrollView(e5);
this.EnableButtons(e5);
this.SaveData(e5);
var i5=true;
if (e5.d2!=null){
var i6=this.GetEditor(e5.d2);
if (i6!=null){
if (event.shiftKey&&!ab2){
i6.blur();
}else {
this.SetEditorFocus(i6);
if (!i6.disabled&&(i6.type==null||i6.type=="checkbox"||i6.type=="radio"||i6.type=="text"||i6.type=="password"||i6.tagName=="SELECT")){
this.editing=true;
this.a9=i6;
this.b0=this.GetEditorValue(i6);
}
}
i5=false;
}
}
if (i5)this.Focus(e5);
}
this.MoveUp=function (e5,h3,h5){
var n9=this.GetRowCountInternal(e5);
var h2=this.GetColCount(e5);
h3--;
h3=this.GetPrevRow(e5,h3);
if (h3>=0){
e5.d4=h3;
this.UpdateLeadingCell(e5,e5.d4,e5.d5);
}
}
this.MoveDown=function (e5,h3,h5){
var n9=this.GetRowCountInternal(e5);
var h2=this.GetColCount(e5);
var s1=this.GetSpanCell(h3,h5,this.GetSpanCells(e5,this.GetViewportFromCell(e5,e5.d2)));
if (s1!=null){
h3=s1.row+s1.rowCount;
}else {
h3++;
}
h3=this.GetNextRow(e5,h3);
if (h3==n9)h3=n9-1;
if (h3<n9){
e5.d4=h3;
this.UpdateLeadingCell(e5,e5.d4,e5.d5);
}
}
this.MoveLeft=function (e5,h3,h5){
var ab7=h3;
var n9=this.GetRowCountInternal(e5);
var h2=this.GetColCount(e5);
var s1=this.GetSpanCell(h3,h5,this.GetSpanCells(e5,this.GetViewportFromCell(e5,e5.d2)));
if (s1!=null){
h5=s1.col-1;
}else {
h5--;
}
if (h5<0){
h5=h2-1;
h3--;
if (h3<0){
h3=n9-1;
}
h3=this.GetPrevRow(e5,h3);
if (h3<0){
h3=n9-1;
}
h3=this.GetPrevRow(e5,h3);
e5.d4=h3;
}
var ab8=this.UpdateLeadingCell(e5,e5.d4,h5);
if (ab8)e5.d4=ab7;
}
this.MoveRight=function (e5,h3,h5){
var ab7=h3;
var n9=this.GetRowCountInternal(e5);
var h2=this.GetColCount(e5);
var s1=this.GetSpanCell(h3,h5,this.GetSpanCells(e5,this.GetViewportFromCell(e5,e5.d2)));
if (s1!=null){
h5=s1.col+s1.colCount;
}else {
h5++;
}
if (h5>=h2){
h5=0;
h3++;
if (h3>=n9)h3=0;
h3=this.GetNextRow(e5,h3);
if (h3>=n9)h3=0;
h3=this.GetNextRow(e5,h3);
e5.d4=h3;
}
var ab8=this.UpdateLeadingCell(e5,e5.d4,h5);
if (ab8)e5.d4=ab7;
}
this.UpdateLeadingCell=function (e5,h3,h5){
var ab9=0;
if (e5.getAttribute("LayoutMode")){
ab9=this.GetRowFromViewPort(e5,h3,h5);
var ac0=this.GetCellFromRowCol(e5,ab9,h5);
if (ac0)ab9=ac0.parentNode.getAttribute("row");
}
var i5=this.FireActiveCellChangingEvent(e5,h3,h5,ab9);
if (!i5){
var o5=this.GetOperationMode(e5);
if (o5!="MultiSelect")
this.ClearSelection(e5);
e5.d5=h5;
e5.d4=h3;
e5.d7=h5;
e5.d6=h3;
this.UpdateAnchorCell(e5,h3,h5);
}
return i5;
}
this.GetPrevRow=function (e5,h3){
if (h3<0)return 0;
var i8=this.GetViewport(e5);
if (h3<e5.frzRows){
i8=this.GetViewport0(e5);
if (i8==null)i8=this.GetViewport1(e5);
}
while (i8!=null&&h3<i8.rows.length){
if (this.IsChildSpreadRow(e5,i8,h3))
h3--;
else 
break ;
}
var h9=0;
if (h3>=e5.frzRows){
h3=h3-e5.frzRows;
h9=e5.frzRows;
}
if (e5.frzCols<this.GetColCount(e5)){
var y3=this.GetViewport2(e5);
while ((y3==null||h3<y3.rows.length&&y3.rows[h3].cells.length==0)&&i8!=null&&h3>0&&i8.rows[h3].cells.length==0)h3--;
}
if (i8!=null&&h3>=0&&h3<i8.rows.length){
if (i8.rows[h3].getAttribute("previewrow")){
h3--;
}
}
return h3+h9;
}
this.GetNextRow=function (e5,h3){
var i8=this.GetViewport(e5);
if (h3<e5.frzRows){
i8=this.GetViewport0(e5);
if (i8==null)i8=this.GetViewport1(e5);
}
while (i8!=null&&h3<i8.rows.length){
if (this.IsChildSpreadRow(e5,i8,h3))h3++;
else 
break ;
}
var h9=0;
if (h3>=e5.frzRows){
h3=h3-e5.frzRows;
h9=e5.frzRows;
}
if (e5.frzCols<this.GetColCount(e5)){
var y3=this.GetViewport2(e5);
while ((y3==null||h3<y3.rows.length&&y3.rows[h3].cells.length==0)&&i8!=null&&h3<i8.rows.length&&i8.rows[h3].cells.length==0)h3++;
}
if (i8!=null&&h3>=0&&h3<i8.rows.length){
if (i8.rows[h3].getAttribute("previewrow")){
h3++;
}
}
return h3+h9;
}
this.FireActiveCellChangedEvent=function (e5,j1,o2){
var g4=this.CreateEvent("ActiveCellChanged");
g4.cmdID=e5.id;
g4.row=this.GetSheetIndex(e5,j1);
g4.col=o2;
this.FireEvent(e5,g4);
}
this.FireActiveCellChangingEvent=function (e5,j1,o2,t6){
var g4=this.CreateEvent("ActiveCellChanging");
g4.cancel=false;
g4.cmdID=e5.id;
g4.row=this.GetSheetIndex(e5,j1);
g4.col=o2;
if (e5.getAttribute("LayoutMode"))
g4.innerRow=t6;
this.FireEvent(e5,g4);
return g4.cancel;
}
this.GetSheetRowIndex=function (e5,h3){
h3=this.GetDisplayIndex(e5,h3);
if (h3<0)return -1;
var n3=null;
if (e5.frzRows>0){
if (h3>=e5.frzRows&&this.GetViewport(e5)!=null){
n3=this.GetViewport(e5).rows[h3-e5.frzRows];
}else if (h3<e5.frzRows&&this.GetViewport1(e5)!=null){
n3=this.GetViewport1(e5).rows[h3];
}
}else {
n3=this.GetViewport(e5).rows[h3];
}
if (n3!=null){
return n3.getAttribute("FpKey");
}else {
return -1;
}
}
this.GetSheetColIndex=function (e5,h5,t6){
var o2=-1;
if (e5.getAttribute("LayoutMode")){
var h3=this.GetDisplayIndex2(e5,t6);
var h6=this.GetCellByRowCol(e5,h3,h5);
if (h6!=null)
o2=parseInt(h6.getAttribute("col"));
}
else {
var f4=null;
if (e5.frzCols>0&&h5<e5.frzCols){
var l0=this.GetFrozColHeader(e5);
if (l0!=null&&l0.rows.length>0){
f4=this.GetColGroup(l0);
}else {
var m6=this.GetViewport2(e5);
if (m6!=null&&m6.rows.length>0){
f4=this.GetColGroup(m6);
}else {
var m4=this.GetViewport0(e5);
if (m4!=null&&m4.rows.length>0){
f4=this.GetColGroup(m4);
}
}
}
if (f4!=null&&h5>=0&&h5<f4.childNodes.length)o2=f4.childNodes[h5].getAttribute("FpCol");
}else {
var ac1=this.GetColHeader(e5);
if (ac1!=null&&ac1.rows.length>0){
f4=this.GetColGroup(ac1);
}else {
var e8=this.GetViewport(e5);
if (e8!=null&&e8.rows.length>0){
f4=this.GetColGroup(e8);
}else {
var m5=this.GetViewport1(e5);
if (m5!=null&&m5.rows.length>0){
f4=this.GetColGroup(m5);
}
}
}
if (f4!=null&&h5-e5.frzCols>=0&&h5-e5.frzCols<f4.childNodes.length){
o2=f4.childNodes[h5-e5.frzCols].getAttribute("FpCol");
}
}
}
return o2;
}
this.GetCellByRowCol=function (e5,h3,h5){
h3=this.GetDisplayIndex(e5,h3);
return this.GetCellFromRowCol(e5,h3,h5);
}
this.GetHeaderCellFromRowCol=function (e5,h3,h5,c7){
if (h3<0||h5<0)return null;
var e8=null;
if (c7){
if (h5<e5.frzCols){
e8=this.GetFrozColHeader(e5);
}else {
e8=this.GetColHeader(e5);
}
}else {
if (h3<e5.frzRows){
e8=this.GetFrozRowHeader(e5);
}else {
e8=this.GetRowHeader(e5);
}
}
var s1=this.GetSpanCell(h3,h5,this.GetSpanCells(e5,e8));
if (s1!=null){
h3=s1.row;
h5=s1.col;
}
var u1=this.GetCellIndex(e5,h3,h5,this.GetSpanCells(e5,e8));
if (!c7){
if (h3>=e5.frzRows){
h3-=e5.frzRows;
}
}
return e8.rows[h3].cells[u1];
}
this.GetCellFromRowCol=function (e5,h3,h5,prevCell){
if (h3<0||h5<0)return null;
var e8=null;
if (h3<e5.frzRows){
if (h5<e5.frzCols){
e8=this.GetViewport0(e5);
}else {
e8=this.GetViewport1(e5);
}
}else {
if (h5<e5.frzCols){
e8=this.GetViewport2(e5);
}else {
e8=this.GetViewport(e5);
}
}
var e0=e5.e0;
var s1=this.GetSpanCell(h3,h5,e0);
if (s1!=null){
h3=s1.row;
h5=s1.col;
}
var u1=0;
var ab0=false;
if (e8!=null)ab0=e8.parentNode.getAttribute("hiddenCells");
if (prevCell!=null&&!ab0){
if (prevCell.cellIndex<prevCell.parentNode.cells.length-1)
u1=prevCell.cellIndex+1;
}
else 
{
u1=this.GetCellIndex(e5,h3,h5,e0);
}
if (h3>=e5.frzRows){
h3-=e5.frzRows;
}
if (h3>=0&&h3<e8.rows.length)
return e8.rows[h3].cells[u1];
else 
return null;
}
this.GetHiddenValue=function (e5,h3,colName){
if (colName==null)return ;
h3=this.GetDisplayIndex(e5,h3);
var w2=null;
var e8=null;
e8=this.GetViewport(e5);
if (e8!=null&&h3>=0&&h3<e8.rows.length){
var n3=e8.rows[h3];
w2=n3.getAttribute("hv"+colName);
}
return w2;
}
this.GetValue=function (e5,h3,h5){
h3=this.GetDisplayIndex(e5,h3);
var h6=this.GetCellFromRowCol(e5,h3,h5);
var j6=this.GetRender(h6);
var w2=this.GetValueFromRender(e5,j6);
if (w2!=null)w2=this.Trim(w2.toString());
return w2;
}
this.SetValue=function (e5,h3,h5,x7,noEvent,recalc){
h3=this.GetDisplayIndex(e5,h3);
if (x7!=null&&typeof(x7)!="string")x7=new String(x7);
var h6=this.GetCellFromRowCol(e5,h3,h5);
if (this.ValidateCell(e5,h6,x7)){
this.SetCellValueFromView(h6,x7);
if (x7!=null){
this.SetCellValue(e5,h6,""+x7,noEvent,recalc);
}else {
this.SetCellValue(e5,h6,"",noEvent,recalc);
}
this.SizeSpread(e5);
}else {
if (e5.getAttribute("lcidMsg")!=null)
alert(e5.getAttribute("lcidMsg"));
else 
alert("Can't set the data into the cell. The data type is not correct for the cell.");
}
}
this.SetActiveCell=function (e5,h3,h5){
this.ClearSelection(e5,true);
h3=this.GetDisplayIndex(e5,h3);
this.UpdateAnchorCell(e5,h3,h5);
this.ResetLeadingCell(e5);
}
this.GetOperationMode=function (e5){
var o5=e5.getAttribute("OperationMode");
return o5;
}
this.SetOperationMode=function (e5,o5){
e5.setAttribute("OperationMode",o5);
}
this.GetEnableRowEditTemplate=function (e5){
var ac2=e5.getAttribute("EnableRowEditTemplate");
return ac2;
}
this.GetSelectionPolicy=function (e5){
var ac3=e5.getAttribute("SelectionPolicy");
return ac3;
}
this.UpdateAnchorCell=function (e5,h3,h5,select,isColHeader){
if (h3<0||h5<0)return ;
if (e5.getAttribute("LayoutMode")&&e5.allowGroup&&isColHeader)
h3=this.GetRowFromViewPort(e5,h3,h5);
e5.d2=this.GetCellFromRowCol(e5,h3,h5);
if (e5.d2==null)return ;
this.SetActiveRow(e5,this.GetRowKeyFromCell(e5,e5.d2));
this.SetActiveCol(e5,e5.getAttribute("LayoutMode")?this.GetColKeyFromCell2(e5,e5.d2):this.GetColKeyFromCell(e5,e5.d2));
if (select==null||select){
var o5=this.GetOperationMode(e5);
if (o5=="RowMode"||o5=="SingleSelect")
this.SelectRow(e5,h3,1,true,true);
else if (o5!="MultiSelect"&&o5!="ExtendedSelect")
this.SelectRange(e5,h3,h5,1,1,true);
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
this.Edit=function (e5,j1){
var o5=this.GetOperationMode(e5);
if (o5!="RowMode")return ;
var v9=e5.getAttribute("name");
var ac4=(e5.getAttribute("ajax")!="false");
if (ac4){
if (FarPoint&&FarPoint.System.WebControl.MultiColumnComboBoxCellTypeUtilitis)
FarPoint.System.WebControl.MultiColumnComboBoxCellTypeUtilitis.CloseAll();
this.SyncData(v9,"Edit,"+j1,e5);
}
else 
__doPostBack(v9,"Edit,"+j1);
}
this.Update=function (e5){
if (this.editing&&this.GetOperationMode(e5)!="RowMode"&&this.GetEnableRowEditTemplate(e5)!="true")return ;
this.SaveData(e5);
var v9=e5.getAttribute("name");
var ac4=(e5.getAttribute("ajax")!="false");
if (ac4)
this.SyncData(v9,"Update",e5);
else 
__doPostBack(v9,"Update");
}
this.Cancel=function (e5){
var g1=document.getElementById(e5.id+"_data");
g1.value="";
this.SaveData(e5);
var v9=e5.getAttribute("name");
var ac4=(e5.getAttribute("ajax")!="false");
if (ac4)
this.SyncData(v9,"Cancel",e5);
else 
__doPostBack(v9,"Cancel");
}
this.Add=function (e5){
if (this.editing)return ;
var v9=null;
var q2=this.GetPageActiveSpread();
if (q2!=null){
v9=q2.getAttribute("name");
}else {
v9=e5.getAttribute("name");
}
var ac4=(e5.getAttribute("ajax")!="false");
if (ac4)
this.SyncData(v9,"Add",e5);
else 
__doPostBack(v9,"Add");
}
this.Insert=function (e5){
if (this.editing)return ;
var v9=null;
var q2=this.GetPageActiveSpread();
if (q2!=null){
v9=q2.getAttribute("name");
}else {
v9=e5.getAttribute("name");
}
var ac4=(e5.getAttribute("ajax")!="false");
if (ac4)
this.SyncData(v9,"Insert",e5);
else 
__doPostBack(v9,"Insert");
}
this.Delete=function (e5){
if (this.editing)return ;
var v9=null;
var q2=this.GetPageActiveSpread();
if (q2!=null){
v9=q2.getAttribute("name");
}else {
v9=e5.getAttribute("name");
}
var ac4=(e5.getAttribute("ajax")!="false");
if (ac4)
this.SyncData(v9,"Delete",e5);
else 
__doPostBack(v9,"Delete");
}
this.Print=function (e5){
if (this.editing)return ;
this.SaveData(e5);
if (document.printSpread==null){
var g1=document.createElement("IFRAME");
g1.name="printSpread";
g1.style.position="absolute";
g1.style.left="-10px";
g1.style.width="0px";
g1.style.height="0px";
document.printSpread=g1;
document.body.insertBefore(g1,null);
g1.addEventListener("load",function (){the_fpSpread.PrintSpread();},false);
}
var ac5=this.GetForm(e5);
if (ac5==null)return ;
{
var i5=ac5;
i5.__EVENTTARGET.value=e5.getAttribute("name");
i5.__EVENTARGUMENT.value="Print";
var ac6=i5.target;
i5.target="printSpread";
i5.submit();
i5.target=ac6;
}
}
this.PrintSpread=function (){
document.printSpread.contentWindow.focus();
document.printSpread.contentWindow.print();
window.focus();
var q2=this.GetPageActiveSpread();
if (q2!=null)this.Focus(q2);
}
this.GotoPage=function (e5,f1){
if (this.editing)return ;
var v9=e5.getAttribute("name");
var ac4=(e5.getAttribute("ajax")!="false");
if (ac4)
this.SyncData(v9,"Page,"+f1,e5);
else 
__doPostBack(v9,"Page,"+f1);
}
this.Next=function (e5){
if (this.editing)return ;
var v9=e5.getAttribute("name");
var ac4=(e5.getAttribute("ajax")!="false");
if (ac4)
this.SyncData(v9,"Next",e5);
else 
__doPostBack(v9,"Next");
}
this.Prev=function (e5){
if (this.editing)return ;
var v9=e5.getAttribute("name");
var ac4=(e5.getAttribute("ajax")!="false");
if (ac4)
this.SyncData(v9,"Prev",e5);
else 
__doPostBack(v9,"Prev");
}
this.GetViewportFromCell=function (e5,j4){
if (j4!=null){
var g1=j4;
while (g1!=null){
if (g1.tagName=="TABLE")break ;
g1=g1.parentNode;
}
if (g1==this.GetViewport(e5)||g1==this.GetViewport0(e5)||g1==this.GetViewport1(e5)||g1==this.GetViewport2(e5))
return g1;
}
return null;
}
this.IsChild=function (h6,j0){
if (h6==null||j0==null)return false;
var g1=h6.parentNode;
while (g1!=null){
if (g1==j0)return true;
g1=g1.parentNode;
}
return false;
}
this.GetCorner=function (e5){
return e5.c5;
}
this.GetFooterCorner=function (e5){
return e5.footerCorner;
}
this.Select=function (e5,cl1,cl2){
if (this.GetSpread(cl1)!=e5||this.GetSpread(cl2)!=e5)return ;
var h7=e5.d6;
var h8=e5.d7;
var ac7=this.GetRowFromCell(e5,cl2);
var n4=0;
if (e5.d8=="r"){
n4=-1;
if (this.IsChild(cl2,this.GetColHeader(e5)))
ac7=0;
}else if (e5.d8=="c"){
if (this.IsChild(cl2,this.GetRowHeader(e5)))
n4=0;
else 
n4=this.GetColFromCell(e5,cl2);
ac7=-1;
}
else {
if (this.IsChild(cl2,this.GetColHeader(e5))){
ac7=0;n4=this.GetColFromCell(e5,cl2);
}else if (this.IsChild(cl2,this.GetRowHeader(e5))){
n4=0;
}else {
n4=this.GetColFromCell(e5,cl2);
}
}
if (e5.d8=="t"){
h8=n4=h7=ac7=-1;
}
var g1=Math.max(h7,ac7);
h7=Math.min(h7,ac7);
ac7=g1;
g1=Math.max(h8,n4);
h8=Math.min(h8,n4);
n4=g1;
var i1=null;
var o3=this.GetSelection(e5);
var o4=o3.lastChild;
if (o4!=null){
var h3=this.GetRowByKey(e5,o4.getAttribute("row"));
var h5=this.GetColByKey(e5,o4.getAttribute("col"));
var n9=parseInt(o4.getAttribute("rowcount"));
var h2=parseInt(o4.getAttribute("colcount"));
i1=new this.Range();
this.SetRange(i1,"cell",h3,h5,n9,h2);
}
if (i1!=null&&i1.col==-1&&i1.row==-1)return ;
if (i1!=null&&i1.col==-1&&i1.row>=0){
if (i1.row>ac7||i1.row+i1.rowCount-1<h7){
this.PaintSelection(e5,i1.row,i1.col,i1.rowCount,i1.colCount,false);
this.PaintSelection(e5,h7,h8,ac7-h7+1,n4-h8+1,true);
}else {
if (h7>i1.row){
var g1=h7-i1.row;
this.PaintSelection(e5,i1.row,i1.col,g1,i1.colCount,false);
if (ac7<i1.row+i1.rowCount-1){
this.PaintSelection(e5,ac7,i1.col,i1.row+i1.rowCount-ac7,i1.colCount,false);
}else {
this.PaintSelection(e5,i1.row+i1.rowCount,i1.col,ac7-i1.row-i1.rowCount+1,i1.colCount,true);
}
}else {
this.PaintSelection(e5,h7,i1.col,i1.row-h7,i1.colCount,true);
if (ac7<i1.row+i1.rowCount-1){
this.PaintSelection(e5,ac7+1,i1.col,i1.row+i1.rowCount-ac7-1,i1.colCount,false);
}else {
this.PaintSelection(e5,i1.row+i1.rowCount,i1.col,ac7-i1.row-i1.rowCount+1,i1.colCount,true);
}
}
}
}else if (i1!=null&&i1.row==-1&&i1.col>=0){
if (i1.col>n4||i1.col+i1.colCount-1<h8){
this.PaintSelection(e5,i1.row,i1.col,i1.rowCount,i1.colCount,false);
this.PaintSelection(e5,h7,h8,ac7-h7+1,n4-h8+1,true);
}else {
if (h8>i1.col){
this.PaintSelection(e5,i1.row,i1.col,i1.rowCount,h8-i1.col,false);
if (n4<i1.col+i1.colCount-1){
this.PaintSelection(e5,i1.row,n4,i1.rowCount,i1.col+i1.colCount-n4,false);
}else {
this.PaintSelection(e5,i1.row,i1.col+i1.colCount,i1.rowCount,n4-i1.col-i1.colCount,true);
}
}else {
this.PaintSelection(e5,i1.row,h8,i1.rowCount,i1.col-h8,true);
if (n4<i1.col+i1.colCount-1){
this.PaintSelection(e5,i1.row,n4+1,i1.rowCount,i1.col+i1.colCount-n4-1,false);
}else {
this.PaintSelection(e5,i1.row,i1.col+i1.colCount,i1.rowCount,n4-i1.col-i1.colCount+1,true);
}
}
}
}else if (i1!=null&&i1.row>=0&&i1.col>=0){
this.ExtendSelection(e5,i1,h7,h8,ac7-h7+1,n4-h8+1);
}else {
this.PaintSelection(e5,h7,h8,ac7-h7+1,n4-h8+1,true);
}
this.SetSelection(e5,h7,h8,ac7-h7+1,n4-h8+1,i1==null);
}
this.ExtendSelection=function (e5,i1,newRow,newCol,newRowCount,newColCount)
{
var r9=Math.max(i1.col,newCol);
var s0=Math.min(i1.col+i1.colCount-1,newCol+newColCount-1);
var x5=Math.max(i1.row,newRow);
var ac8=Math.min(i1.row+i1.rowCount-1,newRow+newRowCount-1);
if (i1.row<x5){
this.PaintSelection(e5,i1.row,i1.col,x5-i1.row,i1.colCount,false);
}
if (i1.col<r9){
this.PaintSelection(e5,i1.row,i1.col,i1.rowCount,r9-i1.col,false);
}
if (i1.row+i1.rowCount-1>ac8){
this.PaintSelection(e5,ac8+1,i1.col,i1.row+i1.rowCount-ac8-1,i1.colCount,false);
}
if (i1.col+i1.colCount-1>s0){
this.PaintSelection(e5,i1.row,s0+1,i1.rowCount,i1.col+i1.colCount-s0-1,false);
}
if (newRow<x5){
this.PaintSelection(e5,newRow,newCol,x5-newRow,newColCount,true);
}
if (newCol<r9){
this.PaintSelection(e5,newRow,newCol,newRowCount,r9-newCol,true);
}
if (newRow+newRowCount-1>ac8){
this.PaintSelection(e5,ac8+1,newCol,newRow+newRowCount-ac8-1,newColCount,true);
}
if (newCol+newColCount-1>s0){
this.PaintSelection(e5,newRow,s0+1,newRowCount,newCol+newColCount-s0-1,true);
}
}
this.PaintAnchorCellHeader=function (e5,select){
var h3,h5;
h3=this.GetRowFromCell(e5,e5.d2);
h5=this.GetColFromCell(e5,e5.d2);
if (select&&e5.d2.getAttribute("group")!=null){
var s1=this.GetSpanCell(h3,h5,e5.e0);
if (s1!=null&&s1.colCount>1){
var ac9=this.GetSelectedRange(e5);
if (h3<ac9.row||h3>=ac9.row+ac9.rowCount||h5<ac9.col||h5>=ac9.col+ac9.colCount)
return ;
}
}
if (this.GetColHeader(e5)!=null)this.PaintHeaderSelection(e5,h3,h5,1,1,select,true);
if (this.GetRowHeader(e5)!=null)this.PaintHeaderSelection(e5,h3,h5,1,1,select,false);
}
this.LineIntersection=function (s1,h8,s2,n4){
var t5,g4;
t5=Math.max(s1,s2);
g4=Math.min(s1+h8,s2+n4);
if (t5<g4)
return {s:t5,c:g4-t5};
return null;
}
this.RangeIntersection=function (h7,h8,y8,cc1,ac7,n4,rc2,cc2){
var ad0=this.LineIntersection(h7,y8,ac7,rc2);
var ad1=this.LineIntersection(h8,cc1,n4,cc2);
if (ad0&&ad1)
return {row:ad0.s,col:ad1.s,rowCount:ad0.c,colCount:ad1.c};
return null;
}
this.PaintSelection=function (e5,h3,h5,n9,h2,select){
if (h3<0&&h5<0){
this.PaintCornerSelection(e5,select);
}
var ad2=false;
var ad3=false;
var u3;
var u9;
var ad4;
if (h3<0){
u3=h3;
h3=0;
n9=this.GetRowCountInternal(e5);
}
if (h5<0){
u9=h5;
h5=0;
h2=this.GetColCount(e5);
}
this.PaintViewportSelection(e5,h3,h5,n9,h2,select);
var o3=this.GetSelection(e5);
var o4;
var ac7;
var n4;
var ad5;
var ad6;
var ad7=0;
var ad8=0;
var i1;
var ad9;
for (var f2=o3.childNodes.length-1;f2>=0;f2--){
o4=o3.childNodes[f2];
if (o4){
ac7=parseInt(o4.getAttribute("rowIndex"));
n4=parseInt(o4.getAttribute("colIndex"));
ad5=parseInt(o4.getAttribute("rowcount"));
ad6=parseInt(o4.getAttribute("colcount"));
if (ac7<0||ad5<0){ac7=0;ad5=this.GetRowCountInternal(e5);}
if (n4<0||ad6<0){n4=0;ad6=this.GetColCount(e5);}
if (ad7<ad5)
ad7=ad5;
if (ad8<ad6)
ad8=ad6;
if (f2>=o3.childNodes.length-1){
if (h3<=ac7&&n9>=ad5||e5.getAttribute("LayoutMode")&&h2==1&&h3<parseInt(e5.getAttribute("layoutrowcount"))){
if (this.GetColHeader(e5)!=null&&this.GetOperationMode(e5)=="Normal"){
this.PaintHeaderSelection(e5,h3,h5,n9,h2,select,true);
ad2=true;
}
}
if (h5<=n4&&h2>=ad6){
if (this.GetRowHeader(e5)!=null){
this.PaintHeaderSelection(e5,h3,h5,n9,h2,select,false);
ad3=true;
}
}
if (!ad2&&!ad3){
if (this.GetColHeader(e5)!=null&&this.GetOperationMode(e5)=="Normal"){
this.PaintHeaderSelection(e5,h3,h5,n9,h2,select,true);
ad2=true;
}
if (this.GetRowHeader(e5)!=null){
this.PaintHeaderSelection(e5,h3,h5,n9,h2,select,false);
ad3=true;
}
}
}
else {
if (!select&&this.GetOperationMode(e5)=="Normal"&&!e5.getAttribute("LayoutMode")){
i1=this.RangeIntersection(h3,h5,n9,h2,ac7,n4,ad5,ad6);
if (i1){
this.PaintViewportSelection(e5,i1.row,i1.col,i1.rowCount,i1.colCount,true);
}
if (ad2){
ad9=this.LineIntersection(h5,h2,n4,ad6);
if (ad9)this.PaintHeaderSelection(e5,h3,ad9.s,n9,ad9.c,true,true);
}
if (ad3){
ad9=this.LineIntersection(h3,n9,ac7,ad5);
if (ad9)this.PaintHeaderSelection(e5,ad9.s,h5,ad9.c,h2,true,false);
}
}
}
}
}
if (u3!=null||u9!=null){
if ((ad7<n9&&u3<0)||(ad8<h2&&u9<0))
ad4=true;
}
if (o3.childNodes.length<=0||(e5.getAttribute("SelectionPolicy")=="MultiRange"&&ad4)){
if (this.GetColHeader(e5)!=null&&this.GetOperationMode(e5)=="Normal")this.PaintHeaderSelection(e5,h3,h5,n9,h2,select,true);
if (this.GetRowHeader(e5)!=null)this.PaintHeaderSelection(e5,h3,h5,n9,h2,select,false);
}
this.PaintAnchorCell(e5);
}
this.PaintFocusRect=function (e5){
var g9=document.getElementById(e5.id+"_focusRectT");
if (g9==null)return ;
var ae0=this.GetSelectedRange(e5);
if (e5.d2==null&&(ae0==null||(ae0.rowCount==0&&ae0.colCount==0))){
g9.style.left="-1000px";
var v9=e5.id;
g9=document.getElementById(v9+"_focusRectB");
g9.style.left="-1000px";
g9=document.getElementById(v9+"_focusRectL");
g9.style.left="-1000px";
g9=document.getElementById(v9+"_focusRectR");
g9.style.left="-1000px";
return ;
}
var i4=this.GetOperationMode(e5);
if (i4=="RowMode"||i4=="SingleSelect"||i4=="MultiSelect"||i4=="ExtendedSelect"){
var h3=e5.GetActiveRow();
if (e5.getAttribute("layoutMode"))
h3=this.GetFirstMultiRowFromViewport(e5,h3,false);
ae0=new this.Range();
this.SetRange(ae0,"Row",h3,-1,1,-1);
}else if (ae0==null||(ae0.rowCount==0&&ae0.colCount==0)){
var h3=e5.GetActiveRow();
var h5=e5.GetActiveCol();
ae0=new this.Range();
this.SetRange(ae0,"Cell",h3,h5,e5.d2.rowSpan,e5.d2.colSpan);
}
if (ae0.row<0){
ae0.row=0;
ae0.rowCount=this.GetRowCountInternal(e5);
}
if (ae0.col<0){
ae0.col=0;
ae0.colCount=this.GetColCount(e5);
if (e5.getAttribute("LayoutMode")&&ae0.rowCount<parseInt(e5.getAttribute("layoutrowcount"))&&ae0.type=="Row")ae0.rowCount=parseInt(e5.getAttribute("layoutrowcount"));
}
var u3;
if (e5.getAttribute("LayoutMode"))
u3=(ae0.innerRow!=null)?ae0.innerRow:ae0.row;
else 
u3=ae0.row;
var h6=this.GetCellFromRowCol(e5,u3,ae0.col);
if (h6==null)return ;
if (ae0.rowCount==1&&ae0.colCount==1){
ae0.rowCount=h6.rowSpan;
ae0.colCount=h6.colSpan;
if (h6.colSpan>1){
var ae1=parseInt(h6.getAttribute("col"));
if (ae1!=ae0.col&&!isNaN(ae1)&&!e5.getAttribute("LayoutMode"))ae0.col=ae1;
}
}
var g1=this.GetOffsetTop(e5,h6);
var ae2=this.GetOffsetLeft(e5,h6);
if (h6.rowSpan>1){
u3=h6.parentNode.rowIndex;
var h8=this.GetCellFromRowCol(e5,u3,ae0.col+ae0.colCount-1);
if (h8!=null&&h8.parentNode.rowIndex>h6.parentNode.rowIndex){
g1=this.GetOffsetTop(e5,h8);
}
if (e5.getAttribute("LayoutMode")&&ae0.rowCount<h6.rowSpan&&(ae0.type=="Column"||ae0.type=="Row"))ae0.rowCount=h6.rowSpan;
}
if (h6.colSpan>1){
var h8=this.GetCellFromRowCol(e5,u3+ae0.rowCount-1,ae0.col);
var q4=this.GetOffsetLeft(e5,h8);
if (q4>ae2){
ae2=q4;
h6=h8;
}
if (e5.getAttribute("LayoutMode")&&ae0.colCount<h6.colSpan&&(ae0.type=="Column"||ae0.type=="Row"))ae0.colCount=h6.colSpan;
}
var k2=0;
var h1=this.GetViewport(e5).rows;
for (var h3=u3;h3<u3+ae0.rowCount&&h3<h1.length;h3++){
k2+=h1[h3].offsetHeight;
if (h3>u3)k2+=parseInt(this.GetViewport(e5).cellSpacing);
}
var j5=0;
var f4=this.GetColGroup(this.GetViewport(e5));
if (f4.childNodes==null||f4.childNodes.length==0)return ;
for (var h5=ae0.col;h5<ae0.col+ae0.colCount&&h5<f4.childNodes.length;h5++){
j5+=f4.childNodes[h5].offsetWidth;
if (h5>ae0.col)j5+=parseInt(this.GetViewport(e5).cellSpacing);
}
if (ae0.col>h6.cellIndex&&ae0.type=="Column"){
var n4=(e5.getAttribute("LayoutMode")!=null)?parseInt(h6.getAttribute("scol")):parseInt(h6.getAttribute("col"));
for (var h5=n4;h5<ae0.col;h5++){
ae2+=f4.childNodes[h5].offsetWidth;
if (h5>n4)ae2+=parseInt(this.GetViewport(e5).cellSpacing);
}
}
if (ae0.row>0)g1-=2;
else k2-=2;
if (ae0.col>0)ae2-=2;
else j5-=2;
if (parseInt(this.GetViewport(e5).cellSpacing)>0){
g1+=1;ae2+=1;
}else {
j5+=1;
k2+=1;
}
if (j5<0)j5=0;
if (k2<0)k2=0;
g9.style.left=""+ae2+"px";
g9.style.top=""+g1+"px";
g9.style.width=""+j5+"px";
g9=document.getElementById(e5.id+"_focusRectB");
g9.style.left=""+ae2+"px";
g9.style.top=""+(g1+k2)+"px";
g9.style.width=""+j5+"px";
g9=document.getElementById(e5.id+"_focusRectL");
g9.style.left=""+ae2+"px";
g9.style.top=""+g1+"px";
g9.style.height=""+k2+"px";
g9=document.getElementById(e5.id+"_focusRectR");
g9.style.left=""+(ae2+j5)+"px";
g9.style.top=""+g1+"px";
g9.style.height=""+k2+"px";
}
this.PaintCornerSelection=function (e5,select){
var ae3=true;
if (this.GetTopSpread(e5).getAttribute("ShowHeaderSelection")=="false")ae3=false;
if (!ae3)return ;
var o0=this.GetCorner(e5);
if (o0!=null&&o0.rows.length>0){
for (var f2=0;f2<o0.rows.length;f2++){
for (var i3=0;i3<o0.rows[f2].cells.length;i3++){
if (o0.rows[f2].cells[i3]!=null)
this.PaintSelectedCell(e5,o0.rows[f2].cells[i3],select);
}
}
}
}
this.PaintHeaderSelection=function (e5,h3,h5,n9,h2,select,c7){
var ae3=true;
if (this.GetTopSpread(e5).getAttribute("ShowHeaderSelection")=="false")ae3=false;
if (!ae3)return ;
var ae4=c7?e5.e2:e5.e1;
if (e5.getAttribute("LayoutMode")&&c7){
if (n9>parseInt(e5.getAttribute("layoutrowcount")))
n9=parseInt(e5.getAttribute("layoutrowcount"));
var ae5=this.GetCellFromRowCol(e5,h3,h5);
if (e5.allowGroup&&ae5.getAttribute("group")!=null)
h3=this.GetFirstMultiRowFromViewport(e5,h3,true);
for (var f2=h3;f2<h3+n9;f2++){
for (var i3=h5;i3<h5+h2;i3++){
var ae6=this.GetCellFromRowCol(e5,f2,i3);
if (ae6){
var o6=this.GetRowTemplateRowFromCell(e5,ae6);
if (!isNaN(o6)){
if (o6>=parseInt(e5.getAttribute("layoutrowcount")))o6=parseInt(e5.getAttribute("layoutrowcount"))-1;
var h6=this.GetHeaderCellFromRowCol(e5,o6,i3,c7);
if (h6!=null&&this.GetRowTemplateRowFromCell(e5,h6)==o6)this.PaintSelectedCell(e5,h6,select);
}
}
}
}
}
else {
var u4=this.GetRowCountInternal(e5);
var t9=this.GetColCount(e5);
if (c7){
if (this.GetColHeader(e5)==null)return ;
h3=0;
n9=u4=this.GetColHeader(e5).rows.length;
}else {
if (this.GetRowHeader(e5)==null)return ;
h5=0;
h2=t9=this.GetColGroup(this.GetRowHeader(e5)).childNodes.length;
}
}
if (e5.getAttribute("LayoutMode")&&e5.getAttribute("OperationMode")!="Normal"&&!c7)
h3=this.GetFirstMultiRowFromViewport(e5,h3,false);
if (e5.getAttribute("LayoutMode")&&e5.d2!=null&&e5.d2.getAttribute("group")!=null&&!c7&&n9!=u4)
n9=1;
for (var f2=h3;f2<h3+n9&&f2<u4;f2++){
if (!c7&&this.IsChildSpreadRow(e5,this.GetViewport(e5),f2))continue ;
for (var i3=h5;i3<h5+h2&&i3<t9;i3++){
if (!e5.getAttribute("LayoutMode")&&this.IsCovered(e5,f2,i3,ae4))continue ;
var h6=this.GetHeaderCellFromRowCol(e5,f2,i3,c7);
if (h6!=null)this.PaintSelectedCell(e5,h6,select);
}
}
}
this.PaintViewportSelection=function (e5,h3,h5,n9,h2,select){
var u4=this.GetRowCountInternal(e5);
var t9=this.GetColCount(e5);
if (e5.getAttribute("LayoutMode")&&e5.getAttribute("OperationMode")!="Normal"&&n9==parseInt(e5.getAttribute("layoutrowcount")))
h3=this.GetFirstMultiRowFromViewport(e5,h3,false);
if (e5.getAttribute("LayoutMode")&&e5.d2!=null&&e5.d2.getAttribute("group")!=null&&n9!=u4)
n9=1;
for (var f2=h3;f2<h3+n9&&f2<u4;f2++){
if (this.IsChildSpreadRow(e5,this.GetViewport(e5),f2))continue ;
var h6=null;
for (var i3=h5;i3<h5+h2&&i3<t9;i3++){
if (this.IsCovered(e5,f2,i3,e5.e0))continue ;
h6=this.GetCellFromRowCol(e5,f2,i3,h6);
this.PaintSelectedCell(e5,h6,select);
}
}
}
this.Copy=function (e5){
var q2=this.GetPageActiveSpread();
if (q2!=null&&q2!=e5&&this.GetTopSpread(q2)==e5){
this.Copy(q2);
return ;
}
var o3=this.GetSelection(e5);
var o4=o3.lastChild;
if (o4!=null){
var h3;
var h5;
var n9;
var h2;
e5.copymulticol=false;
if (e5.getAttribute("LayoutMode")&&o4.getAttribute("col")!="-1"&&o4.getAttribute("row")=="-1"&&o4.getAttribute("rowcount")=="-1"){
var h6=e5.d2;
if (h6){
h3=h6.parentNode.getAttribute("row");
h5=this.GetColFromCell(e5,h6);
n9=this.GetRowCountInternal(e5);
h2=parseInt(o4.getAttribute("colcount"));
e5.copymulticol=true;
}
}
else if (e5.getAttribute("LayoutMode")&&o4.getAttribute("col")=="-1"&&o4.getAttribute("row")!=-1){
var u6=parseInt(o4.getAttribute("row"));
h3=this.GetFirstRowFromKey(e5,u6);
h5=parseInt(o4.getAttribute("colIndex"));
n9=parseInt(e5.getAttribute("layoutrowcount"));
}
else {
h3=e5.getAttribute("LayoutMode")?parseInt(o4.getAttribute("rowIndex")):this.GetRowByKey(e5,o4.getAttribute("row"));
h5=e5.getAttribute("LayoutMode")?parseInt(o4.getAttribute("colIndex")):this.GetColByKey(e5,o4.getAttribute("col"));
n9=parseInt(o4.getAttribute("rowcount"));
h2=parseInt(o4.getAttribute("colcount"));
}
if (h3<0){
h3=0;
n9=this.GetRowCountInternal(e5);
}
if (h5<0){
h5=0;
h2=this.GetColCount(e5);
}
var f7="";
for (var f2=h3;f2<h3+n9;f2++){
if (this.IsChildSpreadRow(e5,this.GetViewport(e5),f2))continue ;
var h6=null;
for (var i3=h5;i3<h5+h2;i3++){
if (this.IsCovered(e5,f2,i3,e5.e0))
f7+="";
else 
{
h6=this.GetCellFromRowCol(e5,f2,i3,h6);
if (e5.getAttribute("LayoutMode")&&e5.copymulticol&&(h6==null||(h6.parentNode.getAttribute("row"))!=h3))continue ;
if (h6!=null&&h6.parentNode.getAttribute("previewrow")!=null)continue ;
var j7=this.GetCellType(h6);
if (j7=="TextCellType"&&h6.getAttribute("password")!=null)
f7+="";
else 
f7+=this.GetCellValueFromView(e5,h6);
}
if (i3+1<h5+h2)f7+="\t";
}
f7+="\r\n";
}
this.c0=f7;
}else {
if (e5.d2!=null){
var f7=this.GetCellValueFromView(e5,e5.d2);
this.c0=f7;
}
}
}
this.GetCellValueFromView=function (e5,h6){
var x7=null;
if (h6!=null){
var ae7=this.GetRender(h6);
x7=this.GetValueFromRender(e5,ae7);
if (x7==null||x7==" ")x7="";
}
return x7;
}
this.SetCellValueFromView=function (h6,x7,ignoreLock){
if (h6!=null){
var ae7=this.GetRender(h6);
var t4=this.GetCellType(h6);
if ((t4!="readonly"||ignoreLock)&&ae7!=null&&ae7.getAttribute("FpEditor")!="Button")
this.SetValueToRender(ae7,x7);
}
}
this.Paste=function (e5){
var q2=this.GetPageActiveSpread();
if (q2!=null&&q2!=e5&&this.GetTopSpread(q2)==e5){
this.Paste(q2);
return ;
}
if (e5.d2==null)return ;
var f7=this.c0;
if (f7==null)return ;
var e8=this.GetViewportFromCell(e5,e5.d2);
var h3=this.GetRowFromCell(e5,e5.d2);
var h5=this.GetColFromCell(e5,e5.d2);
var h2=this.GetColCount(e5);
var n9=this.GetRowCountInternal(e5);
var ae8=h3;
var aa7=h5;
var ae9=new String(f7);
if (ae9.length==0)return ;
var f1=ae9.lastIndexOf("\r\n");
if (f1>=0&&f1==ae9.length-2)ae9=ae9.substring(0,f1);
var af0=0;
var af1=ae9.split("\r\n");
for (var f2=0;f2<af1.length&&ae8<n9;f2++){
if (typeof(af1[f2])=="string"){
af1[f2]=af1[f2].split("\t");
if (af1[f2].length>af0)af0=af1[f2].length;
}
ae8++;
}
ae8=this.GetSheetIndex(e5,h3);
for (var f2=0;f2<af1.length&&ae8<n9;f2++){
var af2=af1[f2];
if (af2!=null){
aa7=h5;
var h6=null;
var ac7=this.GetDisplayIndex(e5,ae8);
for (var i3=0;i3<af2.length&&aa7<h2;i3++){
if (!this.IsCovered(e5,ac7,aa7,e5.e0)){
h6=this.GetCellFromRowCol(e5,ac7,aa7,h6);
if (h6==null)return ;
if (e5.getAttribute("LayoutMode")&&e5.copymulticol&&parseInt(h6.parentNode.getAttribute("row"))!=parseInt(e5.d2.parentNode.getAttribute("row")))continue ;
if (h6!=null&&h6.parentNode.getAttribute("previewrow")!=null)continue ;
var af3=af2[i3];
if (!this.ValidateCell(e5,h6,af3)){
if (e5.getAttribute("lcidMsg")!=null)
alert(e5.getAttribute("lcidMsg"));
else 
alert("Can't set the data into the cell. The data type is not correct for the cell.");
return ;
}
}
aa7++;
}
}
ae8++;
}
if (af1.length==0)return ;
ae8=this.GetSheetIndex(e5,h3);
for (var f2=0;f2<af1.length&&ae8<n9;f2++){
aa7=h5;
var af2=af1[f2];
var h6=null;
var ac7=this.GetDisplayIndex(e5,ae8);
for (var i3=0;i3<af0&&aa7<h2;i3++){
if (!this.IsCovered(e5,ac7,aa7,e5.e0)){
h6=this.GetCellFromRowCol(e5,ac7,aa7,h6);
if (e5.getAttribute("LayoutMode")&&e5.copymulticol&&parseInt(h6.parentNode.getAttribute("row"))!=parseInt(e5.d2.parentNode.getAttribute("row")))continue ;
if (h6!=null&&h6.parentNode.getAttribute("previewrow")!=null)continue ;
var t4=this.GetCellType(h6);
var ae7=this.GetRender(h6);
if (t4!="readonly"&&ae7.getAttribute("FpEditor")!="Button"){
var af3=null;
if (af2!=null&&i3<af2.length)af3=af2[i3];
this.SetCellValueFromView(h6,af3);
if (af3!=null){
this.SetCellValue(e5,h6,""+af3);
}else {
this.SetCellValue(e5,h6,"");
}
}
}
aa7++;
}
ae8++;
}
var y2=e5.getAttribute("autoCalc");
if (y2!="false"){
this.UpdateValues(e5);
}
var f0=this.GetTopSpread(e5);
var g2=document.getElementById(f0.id+"_textBox");
if (g2!=null){
g2.blur();
}
this.Focus(e5);
this.SizeSpread(e5);
}
this.UpdateValues=function (e5){
if (e5.d9==null&&this.GetParentSpread(e5)==null&&e5.getAttribute("rowFilter")!="true"&&e5.getAttribute("hierView")!="true"&&e5.getAttribute("IsNewRow")!="true"){
this.SaveData(e5);
this.StorePostData(e5);
this.SyncData(e5.getAttribute("name"),"UpdateValues",e5);
}
}
this.ValidateCell=function (e5,h6,x7){
if (h6==null||x7==null||x7=="")return true;
var y0=null;
var j7=this.GetCellType(h6);
if (j7!=null){
var i5=this.GetFunction(j7+"_isValid");
if (i5!=null){
y0=i5(h6,x7);
}
}
return (y0==null||y0=="");
}
this.DoclearSelection=function (e5){
var o3=this.GetSelection(e5);
var o4=o3.lastChild;
while (o4!=null){
var h3=e5.getAttribute("LayoutMode")?parseInt(o4.getAttribute("rowIndex")):this.GetRowByKey(e5,o4.getAttribute("row"));
var h5=e5.getAttribute("LayoutMode")?parseInt(o4.getAttribute("colIndex")):this.GetColByKey(e5,o4.getAttribute("col"));
var n9=parseInt(o4.getAttribute("rowcount"));
var h2=parseInt(o4.getAttribute("colcount"));
if (e5.getAttribute("LayoutMode")&&h3!=-1&&(h2==-1||e5.getAttribute("OperationMode")!="Normal")){
n9=parseInt(e5.getAttribute("layoutrowcount"));
this.PaintSelection(e5,h3,-1,n9,-1,false);
}
if (e5.getAttribute("LayoutMode")&&h5!=-1&&(n9==-1||e5.getAttribute("OperationMode")!="Normal")){
var j1=this.GetRowTemplateRowFromGroupCell(e5,parseInt(o4.getAttribute("col")));
var h6=this.GetCellByRowCol2(e5,j1,parseInt(o4.getAttribute("col")));
if (h6){
h3=parseInt(h6.parentNode.getAttribute("row"));
h5=this.GetColFromCell(e5,h6);
}
this.PaintMultipleRowSelection(e5,h3,h5,1,h2,false);
}
else 
this.PaintSelection(e5,h3,h5,n9,h2,false);
o3.removeChild(o4);
o4=o3.lastChild;
}
}
this.Clear=function (e5){
var q2=this.GetPageActiveSpread();
if (q2!=null&&q2!=e5&&this.GetTopSpread(q2)==e5){
this.Clear(q2);
return ;
}
var t4=this.GetCellType(e5.d2);
if (t4=="readonly")return ;
var o3=this.GetSelection(e5);
var o4=o3.lastChild;
if (this.AnyReadOnlyCell(e5,o4)){
return ;
}
this.Copy(e5);
if (o4!=null){
var h3;
var h5;
var n9;
var h2;
var af4=false;
if (e5.getAttribute("LayoutMode")&&o4.getAttribute("col")!="-1"&&o4.getAttribute("row")=="-1"&&o4.getAttribute("rowcount")=="-1"){
var h6=e5.d2;
if (h6){
h3=h6.parentNode.getAttribute("row");
h5=this.GetColFromCell(e5,h6);
n9=this.GetRowCountInternal(e5);
h2=parseInt(o4.getAttribute("colcount"));
af4=true;
}
}
else if (e5.getAttribute("LayoutMode")&&o4.getAttribute("col")=="-1"&&o4.getAttribute("row")!=-1){
var u6=parseInt(o4.getAttribute("row"));
h3=this.GetFirstRowFromKey(e5,u6);
h5=parseInt(o4.getAttribute("colIndex"));
n9=parseInt(e5.getAttribute("layoutrowcount"));
}
else {
h3=e5.getAttribute("LayoutMode")?parseInt(o4.getAttribute("rowIndex")):this.GetRowByKey(e5,o4.getAttribute("row"));
h5=e5.getAttribute("LayoutMode")?parseInt(o4.getAttribute("colIndex")):this.GetColByKey(e5,o4.getAttribute("col"));
n9=parseInt(o4.getAttribute("rowcount"));;
h2=parseInt(o4.getAttribute("colcount"));
}
if (h3<0){
h3=0;
n9=this.GetRowCountInternal(e5);
}
if (h5<0){
h5=0;
h2=this.GetColCount(e5);
}
for (var f2=h3;f2<h3+n9;f2++){
if (this.IsChildSpreadRow(e5,this.GetViewport(e5),f2))continue ;
var h6=null;
for (var i3=h5;i3<h5+h2;i3++){
if (!this.IsCovered(e5,f2,i3,e5.e0)){
h6=this.GetCellFromRowCol(e5,f2,i3,h6);
if (e5.getAttribute("LayoutMode")&&af4&&(h6==null||(h6.parentNode.getAttribute("row"))!=h3))continue ;
if (h6!=null&&h6.parentNode.getAttribute("previewrow")!=null)continue ;
var t4=this.GetCellType(h6);
if (t4!="readonly"){
var af5=this.GetEditor(h6);
if (af5!=null&&af5.getAttribute("FpEditor")=="Button")continue ;
this.SetCellValueFromView(h6,null);
this.SetCellValue(e5,h6,"");
}
}
}
}
var y2=e5.getAttribute("autoCalc");
if (y2!="false"){
this.UpdateValues(e5);
}
}
}
this.AnyReadOnlyCell=function (e5,o4){
if (o4!=null){
var h3=this.GetRowByKey(e5,o4.getAttribute("row"));
var h5=this.GetColByKey(e5,o4.getAttribute("col"));
var n9=parseInt(o4.getAttribute("rowcount"));
var h2=parseInt(o4.getAttribute("colcount"));
if (h3<0){
h3=0;
n9=this.GetRowCountInternal(e5);
}
if (h5<0){
h5=0;
h2=this.GetColCount(e5);
}
for (var f2=h3;f2<h3+n9;f2++){
if (this.IsChildSpreadRow(e5,this.GetViewport(e5),f2))continue ;
var h6=null;
for (var i3=h5;i3<h5+h2;i3++){
if (!this.IsCovered(e5,f2,i3,e5.e0)){
h6=this.GetCellFromRowCol(e5,f2,i3,h6);
var t4=this.GetCellType(h6);
if (t4=="readonly"){
return true;
}
}
}
}
}
return false;
}
this.GetViewportFromPoint=function (e5,m9,g7){
var y4=l2=0;
var q4=t2=0;
var k8=v2=0;
var r6=h2=0;
var m4=this.GetViewport0(e5);
var m5=this.GetViewport1(e5);
var m6=this.GetViewport2(e5);
var e8=this.GetViewport(e5);
if (m4!=null){
y4=this.GetOffsetLeft(e5,m4,document.body);
k8=m4.offsetWidth;
q4=this.GetOffsetTop(e5,m4,document.body);
r6=m4.offsetHeight;
}
if (m6!=null){
y4=this.GetOffsetLeft(e5,m6,document.body);
k8=m6.offsetWidth;
t2=this.GetOffsetTop(e5,m6,document.body);
h2=m6.offsetHeight;
}
if (m5!=null){
l2=this.GetOffsetLeft(e5,m5,document.body);
v2=m5.offsetWidth;
q4=this.GetOffsetTop(e5,m5,document.body);
r6=m5.offsetHeight;
}
if (e8!=null){
l2=this.GetOffsetLeft(e5,e8,document.body);
v2=e8.offsetWidth;
t2=this.GetOffsetTop(e5,e8,document.body);
h2=e8.offsetHeight;
}
if (y4<m9&&m9<l2){
if (q4<g7&&g7<t2)return m4;
else if (t2<g7&&g7<t2+v2)return m6;
}else if (l2<m9&&m9<l2+v2){
if (q4<g7&&g7<t2)return m5;
else if (t2<g7&&g7<t2+v2)return e8;
}
return null;
}
this.GetCellFromPoint=function (e5,m9,g7,e8){
var r9=this.GetOffsetLeft(e5,e8,document.body);
var x5=this.GetOffsetTop(e5,e8,document.body);
if (m9<r9||g7<x5){
return null;
}else {
var h1=e8.rows;
var af6=null;
for (var h3=0;h3<h1.length;h3++){
var n3=h1[h3];
x5+=n3.offsetHeight;
if (g7<x5){
af6=n3;
break ;
}
}
if (af6!=null){
for (var h5=0;h5<af6.cells.length;h5++){
var af7=af6.cells[h5];
r9+=af7.offsetWidth;
if (m9<r9){
return af7;
}
}
}
}
return null;
}
this.MoveSliderBar=function (e5,g4){
var n2=this.GetElementById(this.activePager,e5.id+"_slideBar");
var g1=(g4.clientX-this.GetOffsetLeft(e5,e5,document.body)+window.scrollX-8);
if (g1<e5.slideLeft)g1=e5.slideLeft;
if (g1>e5.slideRight)g1=e5.slideRight;
var n6=parseInt(this.activePager.getAttribute("totalPage"))-1;
var n1=parseInt(((g1-e5.slideLeft)/(e5.slideRight-e5.slideLeft))*n6)+1;
if (e5.style.position!="absolute"&&e5.style.position!="relative")
g1+=this.GetOffsetLeft(e5,e5,document.body)
n2.style.left=g1+"px";
return n1;
}
this.MouseMove=function (event){
if (window.fpPostOn!=null)return ;
event=this.GetEvent(event);
var p4=this.GetTarget(event);
if (p4!=null&&p4.tagName=="scrollbar")
return ;
if (p4.parentNode!=null&&p4.parentNode.getAttribute("previewrow"))
return ;
var e5=this.GetSpread(p4,true);
if (e5!=null&&this.dragSlideBar)
{
if (this.activePager!=null){
var n1=this.MoveSliderBar(e5,event);
var af8=this.GetElementById(this.activePager,e5.id+"_posIndicator");
af8.innerHTML=this.activePager.getAttribute("pageText")+n1;
}
return ;
}
if (this.working)e5=this.GetSpread(this.b9);
if (e5==null||(!this.working&&this.HitCommandBar(p4)))return ;
if (e5.getAttribute("OperationMode")=="ReadOnly")return ;
var k1=this.IsXHTML(e5);
if (this.working){
if (this.dragCol!=null&&this.dragCol>=0){
var z5=this.GetMovingCol(e5);
if (z5!=null){
if (z5.style.display=="none")z5.style.display="";
if (e5.style.position!="absolute"&&e5.style.position!="relative"){
z5.style.top=""+(event.clientY+window.scrollY)+"px";
z5.style.left=""+(event.clientX+window.scrollX+5)+"px";
}else {
z5.style.top=""+(event.clientY-this.GetOffsetTop(e5,e5,document.body)+window.scrollY)+"px";
z5.style.left=""+(event.clientX-this.GetOffsetLeft(e5,e5,document.body)+window.scrollX+5)+"px";
}
}
var e8=this.GetViewport(e5);
var af9=document.body;
var ag0=this.GetGroupBar(e5);
var g1=-1;
var m9=event.clientX;
var x5=0;
var r9=0;
if (e5.style.position!="absolute"&&e5.style.position!="relative"){
x5=this.GetOffsetTop(e5,e5,document.body)-e8.parentNode.scrollTop;
r9=this.GetOffsetLeft(e5,e5,document.body)-e8.parentNode.scrollLeft;
m9+=Math.max(document.body.scrollLeft,document.documentElement.scrollLeft);
}else {
m9-=(this.GetOffsetLeft(e5,e5,document.body)-Math.max(document.body.scrollLeft,document.documentElement.scrollLeft));
}
var ag1=false;
var k1=this.IsXHTML(e5);
var ag2=k1?document.body.parentNode.scrollTop:document.body.scrollTop;
var n0=document.getElementById(e5.id+"_titleBar");
if (n0)ag2-=n0.parentNode.parentNode.offsetHeight;
if (this.GetPager1(e5)!=null)ag2-=this.GetPager1(e5).offsetHeight;
if (ag0!=null&&event.clientY<this.GetOffsetTop(e5,e5,document.body)-e8.parentNode.scrollTop+ag0.offsetHeight-ag2){
if (e5.style.position!="absolute"&&e5.style.position!="relative")
r9=this.GetOffsetLeft(e5,e5,document.body);
x5+=10;
ag1=true;
var z8=ag0.getElementsByTagName("TABLE")[0];
if (z8!=null){
for (var f2=0;f2<z8.rows[0].cells[0].childNodes.length;f2++){
var j5=z8.rows[0].cells[0].childNodes[f2].offsetWidth;
if (j5==null)continue ;
if (r9<=m9&&m9<r9+j5){
g1=f2;
break ;
}
r9+=j5;
}
}
if (g1==-1&&m9>=r9)g1=-2;
e5.targetCol=g1;
}else {
if (e5.style.position=="absolute"||e5.style.position=="relative")
r9=-e8.parentNode.scrollLeft;
if (this.GetRowHeader(e5)!=null)r9+=this.GetRowHeader(e5).offsetWidth;
if (ag0!=null)x5+=ag0.offsetHeight;
if (m9<r9){
g1=0;
}else {
var aa4=e5.selectedCols.context;
if (aa4){
for (var f2=0;f2<aa4.length;f2++){
if (aa4[f2].left+r9<=m9&&m9<aa4[f2].left+r9+aa4[f2].width){
g1=f2;
}
}
if (this.IsColSelected(e5,g1)){
while (this.IsColSelected(e5,g1)&&this.IsColSelected(e5,g1-1))g1--;
}else {
if (this.IsColSelected(e5,g1-1))g1++;
}
if (g1<0)g1=0;
if (g1>=aa4.length)g1=aa4.length-1;
r9+=aa4[g1].left;
}
}
r9-=5;
var ag3=parseInt(this.GetSheetColIndex(e5,g1));
if (ag3<0)ag3=g1;
e5.targetCol=ag3;
}
if (n0)x5+=n0.parentNode.parentNode.offsetHeight;
if (this.GetPager1(e5)!=null)x5+=this.GetPager1(e5).offsetHeight;
var af8=this.GetPosIndicator(e5);
af8.style.left=""+r9+"px";
af8.style.top=""+x5+"px";
if (ag0!=null&&ag1&&ag0.getElementsByTagName("TABLE").length==0){
af8.style.display="none";
}else {
if (ag1||e5.allowColMove)
af8.style.display="";
else 
af8.style.display="none";
}
var i8=this.GetParent(this.GetViewport(e5));
if (i8!=null){
var ag4=this.GetOffsetLeft(e5,e5,document.body)+i8.offsetLeft+i8.offsetWidth-20;
var ag5=0;
var m6=this.GetViewport2(e5);
if (m6!=null){
ag5=m6.offsetWidth;
ag4+=ag5;
}
if (event.clientX>ag4){
i8.scrollLeft=i8.scrollLeft+10;
this.ScrollView(e5);
this.UpdatePostbackData(e5);
}else if (event.clientX<this.GetOffsetLeft(e5,e5,document.body)+i8.offsetLeft+ag5+5){
i8.scrollLeft=i8.scrollLeft-10;
this.ScrollView(e5);
this.UpdatePostbackData(e5);
}
}
return ;
}
if (this.b5==null&&this.b6==null){
if (e5.d2!=null){
var i8=this.GetParent(this.GetViewport(e5));
if (i8!=null){
var l4=this.IsStaticPos(e5);
var ag6=-Math.max(document.body.parentNode.scrollTop,document.body.scrollTop);
var ag7=-Math.max(document.body.parentNode.scrollLeft,document.body.scrollLeft);
if (!l4){
ag6+=this.GetOffsetTop(e5,e5,document.body);
ag7+=this.GetOffsetLeft(e5,e5,document.body);
}
var t7=i8.offsetTop+i8.offsetHeight-10+ag6;
var ag8=0;
var m5=this.GetViewport1(e5);
if (m5!=null){
ag8=this.GetViewport1(e5).offsetHeight;
t7+=ag8;
}
if (event.clientY>t7){
i8.scrollTop=i8.scrollTop+10;
this.ScrollView(e5);
}else if (event.clientY<i8.offsetTop+ag8+5+ag6){
i8.scrollTop=i8.scrollTop-10;
this.ScrollView(e5);
}
var ag4=i8.offsetLeft+i8.offsetWidth-20+ag7;
var ag5=0;
var m6=this.GetViewport2(e5);
if (m6!=null){
ag5=m6.offsetWidth;
ag4+=ag5;
}
if (event.clientX>ag4){
i8.scrollLeft=i8.scrollLeft+10;
this.ScrollView(e5);
}else if (event.clientX<i8.offsetLeft+ag5+5+ag7){
i8.scrollLeft=i8.scrollLeft-10;
this.ScrollView(e5);
}
}
var h6=this.GetCell(p4,null,event);
if (h6==null&&p4!=null){
var e8=this.GetViewportFromPoint(e5,event.clientX,event.clientY);
if (e8!=null)
h6=this.GetCellFromPoint(e5,event.clientX,event.clientY,e8);
}
if (h6!=null&&h6!=e5.d3){
var i4=this.GetOperationMode(e5);
if (i4!="MultiSelect"){
if (!this.InColHeader(e5,h6)&&(i4=="SingleSelect"||i4=="RowMode")){
var h7=this.GetRowFromCell(e5,h6);
var ag9=this.GetColFromCell(e5,h6);
var ab8=this.FireActiveCellChangingEvent(e5,h7,ag9);
if (ab8)return ;
this.ClearSelection(e5);
this.UpdateAnchorCell(e5,h7,ag9);
this.SelectRow(e5,h7,1,true,true);
this.FireActiveCellChangedEvent(e5,h7,ag9);
}else {
if (i4!="SingleSelect"&&i4!="RowMode"&&!(i4=="Normal"&&this.GetSelectionPolicy(e5)=="Single")&&!e5.getAttribute("LayoutMode")){
this.Select(e5,e5.d2,h6);
this.SyncColSelection(e5);
}
}
e5.d3=h6;
}
}
}
}else if (this.b5!=null){
var ah0=event.clientX-this.b7;
var aa5=parseInt(this.b5.width)+ah0;
var x4=0;
var ah1=(aa5>x4);
if (ah1){
if (e5.frzRows>0||e5.frzCols>0){
var h9=0;
if (!k1)h9+=parseInt(e5.style.borderWidth);
var ah2=this.GetViewport(e5).parentNode;
if (e5.style.position!="relative"&&e5.style.position!="absolute")
e5.sizeBar.style.left=(event.clientX-this.GetOffsetLeft(ah2.offsetParent,document.body)-h9+window.scrollX)+"px";
else 
e5.sizeBar.style.left=(event.clientX-this.GetOffsetLeft(e5,e5,document.body)-h9+window.scrollX)+"px";
}else {
this.b5.width=aa5;
var k6=parseInt(this.b5.getAttribute("index"));
if (this.IsChild(this.b5,this.GetFrozColHeader(e5)))
this.SetWidthFix(this.GetFrozColHeader(e5),k6,aa5);
else 
this.SetWidthFix(this.GetColHeader(e5),k6-e5.frzCols,aa5);
this.b7=event.clientX;
}
}
}else if (this.b6!=null){
var ah0=event.clientY-this.b8;
var ah3=parseInt(this.b6.style.height)+ah0;
var x4=0;
var ah1=(x4<ah3);
if (ah1){
if (e5.frzRows>0||e5.frzCols>0){
var h9=0;
if (!k1)h9+=parseInt(e5.style.borderWidth);
if (e5.style.position=="relative"||e5.style.position=="absolute")
e5.sizeBar.style.top=(event.clientY-this.GetOffsetTop(e5,e5,document.body)-h9+window.scrollY)+"px";
else 
e5.sizeBar.style.top=(event.clientY-h9+window.scrollY)+"px";
}else {
this.b6.style.height=""+(parseInt(this.b6.style.height)+ah0)+"px";
this.b8=event.clientY;
}
}
}
}else {
this.b9=p4;
if (this.b9==null||this.GetSpread(this.b9)!=e5)return ;
var p4=this.GetSizeColumn(e5,this.b9,event);
if (p4!=null){
this.b5=p4;
this.b9.style.cursor=this.GetResizeCursor(false);
}else {
var p4=this.GetSizeRow(e5,this.b9,event);
if (p4!=null){
this.b6=p4;
if (this.b9!=null&&this.b9.style!=null)this.b9.style.cursor=this.GetResizeCursor(true);
}else {
if (this.b9!=null&&this.b9.style!=null){
var h6=this.GetCell(this.b9);
if (h6!=null&&this.IsHeaderCell(e5,h6)){
if (this.b9.getAttribute("FpSpread")=="rowpadding"||this.b9.getAttribute("ControlType")=="chgrayarea")
this.b9.style.cursor=this.GetgrayAreaCursor(e5);
else 
this.b9.style.cursor="default";
}else {
if (this.b9!=null&&this.b9.style!=null&&(this.b9.getAttribute("FpSpread")=="rowpadding"||this.b9.getAttribute("ControlType")=="chgrayarea"))
this.b9.style.cursor=this.GetgrayAreaCursor(e5);
}
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
this.GetResizeCursor=function (j1){
if (j1){
return "n-resize";
}else {
return "w-resize";
}
}
this.HitCommandBar=function (p4){
var g1=p4;
var e5=this.GetTopSpread(this.GetSpread(g1,true));
if (e5==null)return false;
var r5=this.GetCommandBar(e5);
while (g1!=null&&g1!=e5){
if (g1==r5)return true;
g1=g1.parentNode;
}
return false;
}
this.OpenWaitMsg=function (e5){
var i5=document.getElementById(e5.id+"_waitmsg");
if (i5==null)return ;
var j5=e5.offsetWidth;
var k2=e5.offsetHeight;
var j2=this.CreateTestBox(e5);
j2.style.fontFamily=i5.style.fontFamily;
j2.style.fontSize=i5.style.fontSize;
j2.style.fontWeight=i5.style.fontWeight;
j2.style.fontStyle=i5.style.fontStyle;
j2.innerHTML=i5.innerHTML;
i5.style.width=""+(j2.offsetWidth+2)+"px";
var ae2=Math.max(10,(j5-parseInt(i5.style.width))/2);
var g1=Math.max(10,(k2-parseInt(i5.style.height))/2);
if (e5.style.position!="absolute"&&e5.style.position!="relative"){
ae2+=this.GetOffsetLeft(e5,e5,document.body);
g1+=this.GetOffsetTop(e5,e5,document.body);
}
i5.style.top=""+g1+"px";
i5.style.left=""+ae2+"px";
i5.style.display="block";
}
this.CloseWaitMsg=function (e5){
var i5=document.getElementById(e5.id+"_waitmsg");
if (i5==null)return ;
i5.style.display="none";
}
this.MouseDown=function (event){
if (window.fpPostOn!=null)return ;
event=this.GetEvent(event);
var p4=this.GetTarget(event);
var e5=this.GetSpread(p4,true);
e5.mouseY=event.clientY;
var ah4=this.GetPageActiveSpread();
if (this.GetViewport(e5)==null)return ;
if (e5!=null&&p4.parentNode!=null&&p4.parentNode.getAttribute("name")==e5.id+"_slideBar"){
if (this.IsChild(p4,this.GetPager1(e5)))
this.activePager=this.GetPager1(e5);
else if (this.IsChild(p4,this.GetPager2(e5)))
this.activePager=this.GetPager2(e5);
if (this.activePager!=null){
var p7=true;
if (this.editing)p7=this.EndEdit(e5);
if (p7){
this.UpdatePostbackData(e5);
this.dragSlideBar=true;
}
}
return this.CancelDefault(event);
}
if (e5!=null)e5.working=false;
if (this.GetOperationMode(e5)=="ReadOnly")return ;
var k1=false;
if (e5!=null)k1=this.IsXHTML(e5);
if (this.editing&&e5.getAttribute("mcctCellType")!="true"){
var g1=this.GetCell(p4);
if (g1!=e5.d2){
var p7=this.EndEdit();
if (!p7)return ;
}else 
return ;
}
if (p4==this.GetParent(this.GetViewport(e5))){
if (this.GetTopSpread(ah4)!=e5){
this.SetActiveSpread(event);
}
return ;
}
var ah5=(ah4==e5);
this.SetActiveSpread(event);
ah4=this.GetPageActiveSpread();
if (this.HitCommandBar(p4))return ;
if (event.button==2)return ;
if (this.IsChild(p4,this.GetGroupBar(e5))){
var h8=parseInt(p4.id.replace(e5.id+"_group",""));
if (!isNaN(h8)){
this.InitMovingCol(e5,h8,true,p4);
this.working=true;
e5.dragFromGroupbar=true;
this.CancelDefault(event);
return ;
}
}
if (this.IsInRowEditTemplate(e5,p4)){
return ;
}
this.b5=this.GetSizeColumn(e5,p4,event);
if (this.b5!=null){
this.working=true;
this.b7=this.b8=event.clientX;
if (this.b5.style!=null)this.b5.style.cursor=this.GetResizeCursor(false);
this.b9=p4;
if (e5.frzRows>0||e5.frzCols>0){
var ah2=this.GetViewport0(e5);
if (ah2==null)ah2=this.GetViewport1(e5);
if (ah2==null)ah2=this.GetViewport(e5);
ah2=ah2.parentNode;
var q4=0;
if (e5.style.position!="relative"&&e5.style.position!="absolute")q4=this.GetOffsetTop(e5,e5,document.body);
if (this.GetColHeader(e5)!=null)
e5.sizeBar.style.top=""+(q4+this.GetOffsetTop(e5,ah2,e5)-this.GetColHeader(e5).offsetHeight)+"px";
else 
e5.sizeBar.style.top=""+(q4+this.GetOffsetTop(e5,ah2,e5))+"px";
var h9=0;
if (!k1)h9+=parseInt(e5.style.borderWidth);
if (e5.style.position!="relative"&&e5.style.position!="absolute")
e5.sizeBar.style.left=(this.b7-this.GetOffsetLeft(ah2.offsetParent,document.body)-h9+window.scrollX)+"px";
else 
e5.sizeBar.style.left=(this.b7-this.GetOffsetLeft(e5,e5,document.body)-h9+window.scrollX)+"px";
var ah6=0;
if (this.GetViewport0(e5)!=null)ah6=this.GetViewport0(e5).parentNode.offsetHeight;
if (ah6==0&&this.GetViewport1(e5)!=null)ah6=this.GetViewport1(e5).parentNode.offsetHeight;
if (this.GetViewport(e5)!=null)ah6+=this.GetViewport(e5).parentNode.offsetHeight;
if (this.GetColHeader(e5)!=null)ah6+=this.GetColHeader(e5).offsetHeight;
e5.sizeBar.style.height=""+ah6+"px";
e5.sizeBar.style.width="2px";
}
}else {
this.b6=this.GetSizeRow(e5,p4,event);
if (this.b6!=null){
this.working=true;
this.b7=this.b8=event.clientY;
this.b6.style.cursor=this.GetResizeCursor(true);
this.b9=p4;
e5.working=true;
if (e5.frzRows>0||e5.frzCols>0){
var ah2=this.GetViewport0(e5);
if (ah2==null)ah2=this.GetViewport1(e5);
if (ah2==null)ah2=this.GetViewport(e5);
ah2=ah2.parentNode;
var h9=0;
if (!k1)h9+=parseInt(e5.style.borderWidth);
if (e5.style.position=="relative"||e5.style.position=="absolute"){
e5.sizeBar.style.left="0px";
e5.sizeBar.style.top=(this.b8-this.GetOffsetTop(e5,e5,document.body)-h9+window.scrollY)+"px";
}else {
e5.sizeBar.style.left=""+this.GetOffsetLeft(e5,e5,document.body)+"px";
e5.sizeBar.style.top=(this.b8-h9+window.scrollY)+"px";
}
e5.sizeBar.style.height="2px";
e5.sizeBar.style.width=""+e5.offsetWidth+"px";
}
}else {
var ah7=this.GetCell(p4,null,event);
if (ah7==null){
var c5=this.GetCorner(e5);
if (c5!=null&&this.IsChild(p4,c5)){
if (this.GetOperationMode(e5)=="Normal")
this.SelectTable(e5,true);
}
return ;
}
var ag9=this.GetColFromCell(e5,ah7);
if (ah7.parentNode.getAttribute("FpSpread")=="ch"&&ag9>=this.GetColCount(e5))return ;
if (ah7.parentNode.getAttribute("FpSpread")=="rh"&&this.IsChildSpreadRow(e5,this.GetViewport(e5),ah7.parentNode.rowIndex))return ;
if (ah7.parentNode.getAttribute("FpSpread")=="ch"&&this.GetOperationMode(e5)!="Normal"){
if (e5.allowColMove||e5.allowGroup){
if (e5.getAttribute("LayoutMode"))ag9=parseInt(ah7.getAttribute("col"));
this.InitMovingCol(e5,ag9);
}
this.working=true;
this.b9=p4;
return this.CancelDefault(event);
}
if (ah7.parentNode.getAttribute("FpSpread")=="ch"&&(this.GetOperationMode(e5)=="RowMode"||this.GetOperationMode(e5)=="SingleSelect"||this.GetOperationMode(e5)=="ExtendedSelect")){
if (!e5.allowColMove&&!e5.allowGroup)
return ;
}else {
var p5=this.FireActiveCellChangingEvent(e5,this.GetRowFromCell(e5,ah7),ag9,ah7.parentNode.getAttribute("row"));
if (p5)return ;
var o5=this.GetOperationMode(e5);
var f0=this.GetTopSpread(e5);
if (!event.ctrlKey||e5.getAttribute("multiRange")!="true"){
if (o5!="MultiSelect"){
if (!(
(e5.allowColMove||e5.allowGroup)&&ah7.parentNode.getAttribute("FpSpread")=="ch"&&
o5=="Normal"&&(e5.getAttribute("SelectionPolicy")=="Range"||e5.getAttribute("SelectionPolicy")=="MultiRange")&&
e5.selectedCols.length!=0&&this.IsColSelected(e5,ag9)
))
this.ClearSelection(e5);
}
}else {
if (o5!="ExtendedSelect"&&o5!="MultiSelect"){
if (e5.d2!=null)this.PaintSelectedCell(e5,e5.d2,true);
}
}
}
e5.d2=ah7;
var h6=e5.d2;
var ab1=this.GetParent(this.GetViewport(e5));
if (ab1!=null&&!this.IsControl(p4)&&(p4!=null&&p4.tagName!="scrollbar")){
if (this.IsChild(h6,ab1)&&h6.offsetLeft+h6.offsetWidth>ab1.scrollLeft+ab1.clientWidth){
ab1.scrollLeft=h6.offsetLeft+h6.offsetWidth-ab1.clientWidth;
}
if ((this.IsChild(h6,ab1)||this.IsChild(h6,this.GetViewport2(e5)))&&h6.offsetTop+h6.offsetHeight>ab1.scrollTop+ab1.clientHeight&&h6.offsetHeight<ab1.clientHeight){
ab1.scrollTop=h6.offsetTop+h6.offsetHeight-ab1.clientHeight;
}
if (h6.offsetTop<ab1.scrollTop){
ab1.scrollTop=h6.offsetTop;
}
if (h6.offsetLeft<ab1.scrollLeft){
ab1.scrollLeft=h6.offsetLeft;
}
this.ScrollView(e5);
}
if (ah7.parentNode.getAttribute("FpSpread")!="ch")this.SetActiveRow(e5,this.GetRowKeyFromCell(e5,e5.d2));
if (ah7.parentNode.getAttribute("FpSpread")=="rh")
this.SetActiveCol(e5,0);
else {
this.SetActiveCol(e5,e5.getAttribute("LayoutMode")?this.GetColKeyFromCell2(e5,e5.d2):this.GetColKeyFromCell(e5,e5.d2));
}
var o5=this.GetOperationMode(e5);
if (e5.d2.parentNode.getAttribute("FpSpread")=="r"){
if (o5=="ExtendedSelect"||o5=="MultiSelect"){
var ah8=this.IsRowSelected(e5,this.GetRowFromCell(e5,e5.d2));
if (ah8)
this.SelectRow(e5,this.GetRowFromCell(e5,e5.d2),1,false,true);
else 
this.SelectRow(e5,this.GetRowFromCell(e5,e5.d2),1,true,true);
}
else if (o5=="RowMode"||o5=="SingleSelect")
this.SelectRow(e5,this.GetRowFromCell(e5,e5.d2),1,true,true);
else {
this.SelectRange(e5,this.GetRowFromCell(e5,e5.d2),ag9,1,1,true);
}
e5.d6=this.GetRowFromCell(e5,e5.d2);
e5.d7=ag9;
}else if (e5.d2.parentNode.getAttribute("FpSpread")=="ch"){
if (p4.tagName=="INPUT"||p4.tagName=="TEXTAREA"||p4.tagName=="SELECT")
return ;
var u9=ag9;
if (e5.allowColMove||e5.allowGroup)
{
if (o5=="Normal"&&(e5.getAttribute("SelectionPolicy")=="Range"||e5.getAttribute("SelectionPolicy")=="MultiRange")){
if (this.IsColSelected(e5,u9))this.InitMovingCol(e5,u9);
else this.SelectColumn(e5,u9,1,true);
}else {
if (e5.getAttribute("LayoutMode"))
u9=parseInt(e5.d2.getAttribute("col"));
if (o5=="Normal"||o5=="ReadOnly")
this.SelectColumn(e5,u9,1,true);
else e5.selectedCols.push(u9);
this.InitMovingCol(e5,u9);
}
}else {
if (o5=="Normal"||o5=="ReadOnly"){
if (e5.getAttribute("LayoutMode"))
u9=parseInt(e5.d2.getAttribute("col"));
this.SelectColumn(e5,u9,1,true);
}
else 
return ;
}
}else if (e5.d2.parentNode.getAttribute("FpSpread")=="rh"){
if (p4.tagName=="INPUT"||p4.tagName=="TEXTAREA"||p4.tagName=="SELECT")
return ;
if (o5=="ExtendedSelect"||o5=="MultiSelect"){
if (this.IsRowSelected(e5,this.GetRowFromCell(e5,e5.d2)))
this.SelectRow(e5,this.GetRowFromCell(e5,e5.d2),1,false,true);
else 
this.SelectRow(e5,this.GetRowFromCell(e5,e5.d2),1,true,true);
}else {
this.SelectRow(e5,this.GetRowFromCell(e5,e5.d2),1,true);
}
}
e5.d3=e5.d2;
if (e5.d2!=null){
e5.d4=this.GetRowFromCell(e5,e5.d2);
e5.d5=ag9;
}
this.b9=p4;
this.working=true;
if (e5.d2!=null){
var g4=this.CreateEvent("ActiveCellChanged");
g4.cmdID=e5.id;
g4.Row=g4.row=this.GetSheetIndex(e5,this.GetRowFromCell(e5,e5.d2));
g4.Col=g4.col=ag9;
if (e5.getAttribute("LayoutMode"))
g4.InnerRow=g4.innerRow=e5.d2.parentNode.getAttribute("row");
this.FireEvent(e5,g4);
}
}
}
this.EnableButtons(e5);
if (this.dragCol!=null&&this.dragCol>=0&&!this.IsControl(p4))this.Focus(e5);
if (!this.editing&&this.b6==null&&this.b5==null){
if (e5.d2!=null&&this.IsChild(e5.d2,e5)&&!this.IsHeaderCell(this.GetCell(p4))){
var i6=this.GetEditor(e5.d2);
if (i6!=null){
if (i6.type=="submit")this.SaveData(e5);
this.editing=(i6.type!="button"&&i6.type!="submit");
this.a9=i6;
this.b0=this.GetEditorValue(i6);
if (i6.focus)i6.focus();
}
}
}
if (!this.IsControl(p4)){
if (e5!=null)this.UpdatePostbackData(e5);
return this.CancelDefault(event);
}
}
this.GetMovingCol=function (e5){
var z5=document.getElementById(e5.id+"movingCol");
if (z5==null){
z5=document.createElement("DIV");
z5.style.display="none";
z5.style.position="absolute";
z5.style.top="0px";
z5.style.left="0px";
z5.id=e5.id+"movingCol";
z5.align="center";
e5.insertBefore(z5,null);
if (e5.getAttribute("DragColumnCssClass")!=null)
z5.className=e5.getAttribute("DragColumnCssClass");
else 
z5.style.border="1px solid black";
z5.style.MozOpacity=0.50;
}
return z5;
}
this.IsControl=function (g1){
return (g1!=null&&(g1.tagName=="INPUT"||g1.tagName=="TEXTAREA"||g1.tagName=="SELECT"||g1.tagName=="OPTION"));
}
this.EnableButtons=function (e5){
var t4=this.GetCellType(e5.d2);
var o3=this.GetSelection(e5);
var o4=o3.lastChild;
var w1=e5.getAttribute("OperationMode");
var ah9=w1=="ReadOnly"||w1=="SingleSelect"||t4=="readonly";
if (!ah9){
ah9=this.AnyReadOnlyCell(e5,o4);
}
if (ah9){
var g0=this.GetCmdBtn(e5,"Copy");
this.UpdateCmdBtnState(g0,o4==null);
var f7=this.c0;
g0=this.GetCmdBtn(e5,"Paste");
this.UpdateCmdBtnState(g0,(o4==null||f7==null));
g0=this.GetCmdBtn(e5,"Clear");
this.UpdateCmdBtnState(g0,true);
}else {
var g0=this.GetCmdBtn(e5,"Copy");
this.UpdateCmdBtnState(g0,o4==null);
var f7=this.c0;
g0=this.GetCmdBtn(e5,"Paste");
this.UpdateCmdBtnState(g0,(o4==null||f7==null));
g0=this.GetCmdBtn(e5,"Clear");
this.UpdateCmdBtnState(g0,o4==null);
}
}
this.CellClicked=function (h6){
var e5=this.GetSpread(h6);
if (e5!=null){
this.SaveData(e5);
}
}
this.UpdateCmdBtnState=function (g0,disabled){
if (g0==null)return ;
if (g0.tagName=="INPUT"){
var g1=g0.disabled;
if (g1==disabled)return ;
g0.disabled=disabled;
}else {
var g1=g0.getAttribute("disabled");
if (g1==disabled)return ;
g0.setAttribute("disabled",disabled);
}
if (g0.tagName=="IMG"){
var ai0=g0.getAttribute("disabledImg");
if (disabled&&ai0!=null&&ai0!=""){
if (g0.src.indexOf(ai0)<0)g0.src=ai0;
}else {
var ai1=g0.getAttribute("enabledImg");
if (g0.src.indexOf(ai1)<0)g0.src=ai1;
}
}
}
this.MouseUp=function (event){
if (window.fpPostOn!=null)return ;
event=this.GetEvent(event);
var p4=this.GetTarget(event);
var e5=this.GetSpread(p4,true);
if (e5==null&&!this.working){
return ;
}
if (this.dragSlideBar&&e5!=null)
{
this.dragSlideBar=false;
if (this.activePager!=null){
var n1=this.MoveSliderBar(e5,event)-1;
this.activePager=null;
this.GotoPage(e5,n1);
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
var w1=this.GetOperationMode(e5);
if (w1=="ReadOnly")return ;
var i5=true;
if (this.working){
this.working=false;
if (this.dragCol!=null&&this.dragCol>=0){
var ai2=(this.IsChild(p4,this.GetGroupBar(e5))||p4==this.GetGroupBar(e5));
if (!ai2&&this.GetGroupBar(e5)!=null){
var ai3=event.clientX;
var ai4=event.clientY;
var r9=this.GetOffsetLeft(e5,e5,document.body);
var x5=this.GetOffsetTop(e5,e5,document.body);
var ai5=this.GetGroupBar(e5).offsetWidth;
var ai6=this.GetGroupBar(e5).offsetHeight;
var r4=window.scrollX;
var r3=window.scrollY;
var n0=document.getElementById(e5.id+"_titleBar");
if (n0)r3-=n0.parentNode.parentNode.offsetHeight;
if (this.GetPager1(e5)!=null)r3-=this.GetPager1(e5).offsetHeight;
ai2=(r9<=r4+ai3&&r4+ai3<=r9+ai5&&x5<=r3+ai4&&r3+ai4<=x5+ai6);
}
if (e5.dragFromGroupbar){
if (ai2){
if (e5.targetCol>0)
this.Regroup(e5,this.dragCol,parseInt((e5.targetCol+1)/2));
else 
this.Regroup(e5,this.dragCol,e5.targetCol);
}else {
this.Ungroup(e5,this.dragCol,e5.targetCol);
}
}else {
if (ai2){
if (e5.allowGroup){
if (e5.targetCol>0)
this.Group(e5,this.dragCol,parseInt((e5.targetCol+1)/2));
else 
this.Group(e5,this.dragCol,e5.targetCol);
}
}else if (e5.allowColMove){
if (e5.targetCol!=null){
var g4=this.CreateEvent("ColumnDragMove");
g4.cancel=false;
g4.col=e5.selectedCols;
this.FireEvent(e5,g4);
if (!g4.cancel){
this.MoveCol(e5,this.dragCol,e5.targetCol);
var g4=this.CreateEvent("ColumnDragMoveCompleted");
g4.col=e5.selectedCols;
this.FireEvent(e5,g4);
}
}
}
}
var z5=this.GetMovingCol(e5);
if (z5!=null)
z5.style.display="none";
this.dragCol=-1;
this.dragViewCol=-1;
var af8=this.GetPosIndicator(e5);
if (af8!=null)
af8.style.display="none";
e5.dragFromGroupbar=false;
e5.targetCol=null;
this.b5=this.b6=null;
}
if (this.b5!=null){
if (e5.sizeBar!=null)e5.sizeBar.style.left="-400px";
i5=false;
var ah0=event.clientX-this.b7;
var aa5=parseInt(this.b5.width);
var ai7=aa5;
if (isNaN(aa5))aa5=0;
aa5+=ah0;
if (aa5<1)aa5=1;
var k6=parseInt(this.b5.getAttribute("index"));
var v3=this.GetColGroup(this.GetViewport(e5));
if (this.IsChild(this.b5,this.GetFrozColHeader(e5))){
v3=this.GetColGroup(this.GetViewport0(e5));
if (v3==null)v3=this.GetColGroup(this.GetViewport2(e5));
}
if (v3!=null&&v3.childNodes.length>0){
if (this.IsChild(this.b5,this.GetColHeader(e5)))
ai7=parseInt(v3.childNodes[k6-e5.frzCols].width);
else 
ai7=parseInt(v3.childNodes[k6].width);
}else {
ai7=1;
}
if (this.GetViewport(e5).rules!="rows"){
if (k6==parseInt(this.colCount)-1)ai7-=1;
}
if (aa5!=ai7&&event.clientX!=this.b8)
{
this.SetColWidth(e5,k6,aa5,ai7);
var g4=this.CreateEvent("ColWidthChanged");
g4.col=k6;
g4.width=aa5;
this.FireEvent(e5,g4);
}
this.ScrollView(e5);
this.PaintFocusRect(e5);
}else if (this.b6!=null){
if (e5.sizeBar!=null){e5.sizeBar.style.left="-400px";e5.sizeBar.style.width="2px";}
i5=false;
var ah0=event.clientY-this.b8;
var ah3=this.b6.offsetHeight+ah0;
if (ah3<1){
ah3=1;
ah0=1-this.b6.offsetHeight;
}
this.b6.style.height=""+ah3+"px";
this.b6.style.cursor="auto";
var i8=null;
if (this.IsChild(this.b6,this.GetFrozRowHeader(e5))){
i8=this.GetViewport1(e5);
}else {
i8=this.GetViewport(e5);
}
if (i8.rows.length>=2&&i8.cellSpacing=="0"&&e5.frzRow==0){
if (this.b6.rowIndex==0)
i8.rows[0].style.height=""+(parseInt(this.b6.style.height)-1)+"px";
else 
if (this.b6.rowIndex==i8.rows.length-1)
i8.rows[this.b6.rowIndex].style.height=""+(parseInt(this.b6.style.height)+1)+"px";
else 
i8.rows[this.b6.rowIndex].style.height=this.b6.style.height;
}else {
i8.rows[this.b6.rowIndex].style.height=""+(this.b6.offsetHeight-i8.rows[0].offsetTop)+"px";
}
var ai8=this.GetViewport2(e5);
if (this.IsChild(this.b6,this.GetFrozRowHeader(e5))){
ai8=this.GetViewport0(e5);
}
if (ai8!=null)
ai8.rows[this.b6.rowIndex].style.height=i8.rows[this.b6.rowIndex].style.height;
if (this.IsChild(this.b6,this.GetFrozRowHeader(e5))){
this.GetFrozRowHeader(e5).parentNode.parentNode.parentNode.style.posHeight+=ah0;
}
var r8=this.AddRowInfo(e5,this.b6.getAttribute("FpKey"));
if (r8!=null){
this.SetRowHeight(e5,r8,parseInt(this.b6.style.height));
}
if (this.b7!=event.clientY){
var g4=this.CreateEvent("RowHeightChanged");
g4.row=this.GetRowFromCell(e5,this.b6.cells[0]);
g4.height=this.b6.offsetHeight;
this.FireEvent(e5,g4);
}
var j0=this.GetParentSpread(e5);
if (j0!=null)this.UpdateRowHeight(j0,e5);
var f0=this.GetTopSpread(e5);
this.SizeAll(f0);
this.Refresh(f0);
this.ScrollView(e5);
this.PaintFocusRect(e5);
}else {
}
if (this.b9!=null){
this.b9=null;
}
}
if (i5)i5=!this.IsControl(p4);
if (i5&&this.HitCommandBar(p4))return ;
var ai9=false;
var o3=this.GetSelection(e5);
if (o3!=null){
var o4=o3.firstChild;
var i1=new this.Range();
if (o4!=null){
i1.row=this.GetRowByKey(e5,o4.getAttribute("row"));
i1.col=this.GetColByKey(e5,o4.getAttribute("col"));
i1.rowCount=parseInt(o4.getAttribute("rowcount"));
i1.colCount=parseInt(o4.getAttribute("colcount"));
}
switch (e5.d8){
case "":
var h1=this.GetViewport(e5).rows;
for (var f2=i1.row;f2<i1.row+i1.rowCount&&f2<h1.length;f2++){
if (h1[f2].cells.length>0&&h1[f2].cells[0].firstChild!=null&&h1[f2].cells[0].firstChild.nodeName!="#text"){
if (h1[f2].cells[0].firstChild.getAttribute("FpSpread")=="Spread"){
ai9=true;
break ;
}
}
}
break ;
case "c":
var i8=this.GetViewport(e5);
for (var f2=0;f2<i8.rows.length;f2++){
if (this.IsChildSpreadRow(e5,i8,f2)){
ai9=true;
break ;
}
}
break ;
case "r":
var i8=this.GetViewport(e5);
var u8=i1.rowCount;
for (var f2=i1.row;f2<i1.row+u8&&f2<i8.rows.length;f2++){
if (this.IsChildSpreadRow(e5,i8,f2)){
ai9=true;
break ;
}
}
}
}
if (ai9){
var g0=this.GetCmdBtn(e5,"Copy");
this.UpdateCmdBtnState(g0,true);
g0=this.GetCmdBtn(e5,"Paste");
this.UpdateCmdBtnState(g0,true);
g0=this.GetCmdBtn(e5,"Clear");
this.UpdateCmdBtnState(g0,true);
}
var f0=this.GetTopSpread(e5);
if (f0.style.position!="absolute"&&f0.style.position!="relative")
{
var g2=document.getElementById(f0.id+"_textBox");
if (g2!=null){
g2.style.top=""+(window.scrollY)+"px";
g2.style.left=""+(window.scrollX)+"px";
}
}else {
var g2=document.getElementById(f0.id+"_textBox");
if (g2!=null&&this.GetCell(p4)!=null){
if (e5.d3!=null){
var aj0=this.GetViewportFromCell(e5,e5.d3).parentNode;
g2.style.top=""+(aj0.offsetTop+e5.d3.offsetTop-aj0.scrollTop)+"px";
g2.style.left=""+(aj0.offsetLeft+e5.d3.offsetLeft-aj0.scrollLeft)+"px";
}
else if (e5.d2!=null){
var aj0=this.GetViewportFromCell(e5,e5.d2).parentNode;
g2.style.top=""+(aj0.offsetTop+e5.d2.offsetTop-aj0.scrollTop)+"px";
g2.style.left=""+(aj0.offsetLeft+e5.d2.offsetLeft-aj0.scrollLeft)+"px";
}else {
g2.style.top="0px";
g2.style.left="0px";
}
}
}
if (i5&&p4!=this.GetViewport(e5).parentNode)this.Focus(e5);
}
this.UpdateRowHeight=function (j0,child){
var n3=child.parentNode;
while (n3!=null){
if (n3.tagName=="TR")break ;
n3=n3.parentNode;
}
var k1=this.IsXHTML(j0);
if (n3!=null){
var f1=n3.rowIndex;
if (this.GetRowHeader(j0)!=null){
var r6=0;
if (this.GetColHeader(child)!=null)r6=this.GetColHeader(child).offsetHeight;
if (this.GetRowHeader(child)!=null)r6+=this.GetRowHeader(child).offsetHeight;
var aj1=document.getElementById(child.id+"_titleBar");
if (aj1!=null)r6+=aj1.offsetHeight;
if (this.GetPager1(child)!=null)r6+=this.GetPager1(child).offsetHeight;
if (!k1)r6-=this.GetViewport(j0).cellSpacing;
if (this.GetViewport(j0).cellSpacing==0){
this.GetRowHeader(j0).rows[f1].style.height=""+(r6+1)+"px";
if (this.GetParentSpread(j0)!=null){
this.GetRowHeader(j0).parentNode.style.height=""+this.GetRowHeader(j0).offsetHeight+"px";
}
}
else 
this.GetRowHeader(j0).rows[f1].style.height=""+(r6+2)+"px";
this.GetViewport(j0).rows[f1].style.height=""+r6+"px";
child.style.height=""+r6+"px";
}
}
var aj2=this.GetParentSpread(j0);
if (aj2!=null)
this.UpdateRowHeight(aj2,j0);
}
this.MouseOut=function (){
if (!this.working&&this.b5!=null&&this.b5.style!=null)this.b5.style.cursor="auto";
}
this.KeyDown=function (e5,event){
if (window.fpPostOn!=null)return ;
if (!e5.ProcessKeyMap(event))return ;
if (event.keyCode==event.DOM_VK_SPACE&&e5.d2!=null){
var o5=this.GetOperationMode(e5);
if (o5=="MultiSelect"){
if (this.IsRowSelected(e5,this.GetRowFromCell(e5,e5.d2)))
this.SelectRow(e5,this.GetRowFromCell(e5,e5.d2),1,false,true);
else 
this.SelectRow(e5,this.GetRowFromCell(e5,e5.d2),1,true,true);
return ;
}
}
var i6=false;
if (this.editing&&this.a9!=null){
var aj3=this.GetEditor(this.a9);
i6=(aj3!=null);
}
if (event.keyCode!=event.DOM_VK_LEFT&&event.keyCode!=event.DOM_VK_RIGHT&&event.keyCode!=event.DOM_VK_RETURN&&event.keyCode!=event.DOM_VK_TAB&&(this.editing&&!i6)&&this.a9.tagName=="SELECT")return ;
if (this.editing&&this.a9!=null&&this.a9.getAttribute("MccbId")){
var aj4=eval(this.a9.getAttribute("MccbId")+"_Obj");
if (event.altKey&&event.keyCode==event.DOM_VK_DOWN)return ;
if (aj4!=null&&aj4.getIsDrop!=null&&aj4.getIsDrop())return ;
}
switch (event.keyCode){
case event.DOM_VK_LEFT:
case event.DOM_VK_RIGHT:
if (i6){
var aj5=this.a9.getAttribute("FpEditor");
if (this.editing&&aj5=="ExtenderEditor"){
var aj6=FpExtender.Util.getEditor(this.a9);
if (aj6&&aj6.type!="text")this.EndEdit();
}
if (aj5!="RadioButton"&&aj5!="ExtenderEditor")this.EndEdit();
}
if (!this.editing){
this.NextCell(e5,event,event.keyCode);
}
break ;
case event.DOM_VK_UP:
case event.DOM_VK_DOWN:
case event.DOM_VK_RETURN:
if (this.a9!=null&&this.a9.tagName=="TEXTAREA")return ;
if (i6&&this.editing&&this.a9.getAttribute("FpEditor")=="ExtenderEditor"){
var aj7=this.a9.getAttribute("Extenders");
if (aj7&&aj7.indexOf("AutoCompleteExtender")!=-1)return ;
}
if (event.keyCode==event.DOM_VK_RETURN)this.CancelDefault(event);
if (this.editing){
var p7=this.EndEdit();
if (!p7)return ;
}
if (event.keyCode!=event.DOM_VK_RETURN)this.NextCell(e5,event,event.keyCode);
var f0=this.GetTopSpread(e5);
var g2=document.getElementById(f0.id+"_textBox");
if (event.DOM_VK_RETURN==event.keyCode)g2.focus();
break ;
case event.DOM_VK_TAB:
if (this.editing){
var p7=this.EndEdit();
if (!p7)return ;
}
var p6=this.GetProcessTab(e5);
var aj8=(p6=="true"||p6=="True");
if (aj8)this.NextCell(e5,event,event.keyCode);
break ;
case event.DOM_VK_SHIFT:
break ;
case event.DOM_VK_HOME:
case event.DOM_VK_END:
case event.DOM_VK_PAGE_UP:
case event.DOM_VK_PAGE_DOWN:
if (!this.editing){
this.NextCell(e5,event,event.keyCode);
}
break ;
default :
var e6=window.navigator.userAgent;
var y3=(e6.indexOf("Firefox/2.")>=0);
if (y3){
if (event.keyCode==67&&event.ctrlKey&&(!this.editing||i6))this.Copy(e5);
else if (event.keyCode==86&&event.ctrlKey&&(!this.editing||i6))this.Paste(e5);
else if (event.keyCode==88&&event.ctrlKey&&(!this.editing||i6))this.Clear(e5);
else if (!this.editing&&e5.d2!=null&&!this.IsHeaderCell(e5.d2)&&!event.ctrlKey&&!event.altKey){
this.StartEdit(e5,e5.d2);
}
}else {
if (event.charCode==99&&event.ctrlKey&&(!this.editing||i6))this.Copy(e5);
else if (event.charCode==118&&event.ctrlKey&&(!this.editing||i6))this.Paste(e5);
else if (event.charCode==120&&event.ctrlKey&&(!this.editing||i6))this.Clear(e5);
else if (!this.editing&&e5.d2!=null&&!this.IsHeaderCell(e5.d2)&&!event.ctrlKey&&!event.altKey){
this.StartEdit(e5,e5.d2);
}
}
break ;
}
}
this.GetProcessTab=function (e5){
var f0=this.GetTopSpread(e5);
return f0.getAttribute("ProcessTab");
}
this.ExpandRow=function (e5,j1){
var v9=e5.getAttribute("name");
var ac4=(e5.getAttribute("ajax")!="false");
if (ac4)
this.SyncData(v9,"ExpandView,"+j1,e5);
else 
__doPostBack(v9,"ExpandView,"+j1);
}
this.SortColumn=function (e5,column,t6){
var v9=e5.getAttribute("name");
var ac4=(e5.getAttribute("ajax")!="false");
if (ac4)
this.SyncData(v9,"SortColumn,"+column,e5);
else 
__doPostBack(v9,"SortColumn,"+column);
}
this.Filter=function (event,e5){
var p4=this.GetTarget(event);
var g1=p4.value;
if (p4.tagName=="SELECT"){
var ac3=new RegExp("\\s*");
var aj9=new RegExp("\\S*");
var w2=p4[p4.selectedIndex].text;
var ak0="";
var f2=0;
var f1=g1.length;
while (f1>0){
var h7=g1.match(ac3);
if (h7!=null){
ak0+=h7[0];
f2=h7[0].length;
f1-=f2;
g1=g1.substring(f2);
h7=g1.match(aj9);
if (h7!=null){
f2=h7[0].length;
f1-=f2;
g1=g1.substring(f2);
}
}else {
break ;
}
h7=w2.match(aj9);
if (h7!=null){
ak0+=h7[0];
f2=h7[0].length;
w2=w2.substring(f2);
h7=w2.match(ac3);
if (h7!=null){
f2=h7[0].length;
w2=w2.substring(f2);
}
}else {
break ;
}
}
g1=ak0;
}
var ac4=(e5.getAttribute("ajax")!="false");
if (ac4){
this.SyncData(p4.name,g1,e5);
e5.LoadState=null;
}
else 
__doPostBack(p4.name,g1);
}
this.MoveCol=function (e5,from,to){
var v9=e5.getAttribute("name");
if (e5.selectedCols&&e5.selectedCols.length>0){
var ak1=[];
for (var f2=0;f2<e5.selectedCols.length;f2++)
ak1[f2]=this.GetSheetColIndex(e5,e5.selectedCols[f2]);
var ak2=ak1.join("+");
this.MoveMultiCol(e5,ak2,to);
return ;
}
var ac4=(e5.getAttribute("ajax")!="false");
if (ac4)
this.SyncData(v9,"MoveCol,"+from+","+to,e5);
else 
__doPostBack(v9,"MoveCol,"+from+","+to);
}
this.MoveMultiCol=function (e5,ak2,to){
var v9=e5.getAttribute("name");
var ac4=(e5.getAttribute("ajax")!="false");
if (ac4)
this.SyncData(v9,"MoveCol,"+ak2+","+to,e5);
else 
__doPostBack(v9,"MoveCol,"+ak2+","+to);
}
this.Group=function (e5,o2,toCol){
var v9=e5.getAttribute("name");
if (e5.selectedCols&&e5.selectedCols.length>0){
var ak1=[];
for (var f2=0;f2<e5.selectedCols.length;f2++)
if (e5.getAttribute("LayoutMode"))
ak1[f2]=parseInt(e5.selectedCols[f2]);
else 
ak1[f2]=this.GetSheetColIndex(e5,e5.selectedCols[f2]);
var ak2=ak1.join("+");
this.GroupMultiCol(e5,ak2,toCol);
e5.selectedCols=[];
return ;
}
var ac4=(e5.getAttribute("ajax")!="false");
if (ac4)
this.SyncData(v9,"Group,"+o2+","+toCol,e5);
else 
__doPostBack(v9,"Group,"+o2+","+toCol);
}
this.GroupMultiCol=function (e5,ak2,toCol){
var v9=e5.getAttribute("name");
var ac4=(e5.getAttribute("ajax")!="false");
if (ac4)
this.SyncData(v9,"Group,"+ak2+","+toCol,e5);
else 
__doPostBack(v9,"Group,"+ak2+","+toCol);
}
this.Ungroup=function (e5,o2,toCol){
var v9=e5.getAttribute("name");
var ac4=(e5.getAttribute("ajax")!="false");
if (ac4)
this.SyncData(v9,"Ungroup,"+o2+","+toCol,e5);
else 
__doPostBack(v9,"Ungroup,"+o2+","+toCol);
}
this.Regroup=function (e5,fromCol,toCol){
var v9=e5.getAttribute("name");
var ac4=(e5.getAttribute("ajax")!="false");
if (ac4)
this.SyncData(v9,"Regroup,"+fromCol+","+toCol,e5);
else 
__doPostBack(v9,"Regroup,"+fromCol+","+toCol);
}
this.ProcessData=function (){
try {
var ak3=this;
ak3.removeEventListener("load",the_fpSpread.ProcessData,false);
var p4=window.srcfpspread;
p4=p4.split(":").join("_");
var ak4=window.fpcommand;
var ak5=document;
var ak6=ak5.getElementById(p4+"_buff");
if (ak6==null){
ak6=ak5.createElement("iframe");
ak6.id=p4+"_buff";
ak6.style.display="none";
ak5.body.appendChild(ak6);
}
var e5=ak5.getElementById(p4);
the_fpSpread.CloseWaitMsg(e5);
if (ak6==null)return ;
var ak7=ak3.responseText;
ak6.contentWindow.document.body.innerHTML=ak7;
var p6=ak6.contentWindow.document.getElementById(p4+"_values");
if (p6!=null){
var v7=p6.getElementsByTagName("data")[0];
var o4=v7.firstChild;
the_fpSpread.error=false;
while (o4!=null){
var h3=the_fpSpread.GetRowByKey(e5,o4.getAttribute("r"));
var h5=the_fpSpread.GetColByKey(e5,o4.getAttribute("c"));
var ac6=the_fpSpread.GetValue(e5,h3,h5);
if (o4.innerHTML!=ac6){
var i5=the_fpSpread.GetFormula(e5,h3,h5);
var j4=the_fpSpread.GetCellByRowCol(e5,h3,h5);
the_fpSpread.SetCellValueFromView(j4,o4.innerHTML,true);
j4.setAttribute("FpFormula",i5);
}
o4=o4.nextSibling;
}
the_fpSpread.ClearCellData(e5);
}else {
the_fpSpread.UpdateSpread(ak5,ak6,p4,ak7,ak4);
}
var ac5=the_fpSpread.GetForm(e5);
ac5.__EVENTTARGET.value="";
ac5.__EVENTARGUMENT.value="";
var ac6=ak5.getElementsByName("__VIEWSTATE")[0];
var g1=ak6.contentWindow.document.getElementsByName("__VIEWSTATE")[0];
if (ac6!=null&&g1!=null)ac6.value=g1.value;
ac6=ak5.getElementsByName("__EVENTVALIDATION");
g1=ak6.contentWindow.document.getElementsByName("__EVENTVALIDATION");
if (ac6!=null&&g1!=null&&ac6.length>0&&g1.length>0)
ac6[0].value=g1[0].value;
ak6.contentWindow.document.location="about:blank";
window.fpPostOn=null;
d9=null;
}catch (g4){
window.fpPostOn=null;
d9=null;
}
var e5=the_fpSpread.GetTopSpread(ak5.getElementById(p4));
var g4=the_fpSpread.CreateEvent("CallBackStopped");
g4.command=ak4;
the_fpSpread.FireEvent(e5,g4);
};
this.UpdateSpread=function (ak5,ak6,p4,ak7,ak4){
var e5=the_fpSpread.GetTopSpread(ak5.getElementById(p4));
var t5=ak6.contentWindow.document.getElementById(e5.id);
if (t5!=null){
if (typeof(Sys)!='undefined'){
FarPoint.System.ExtenderHelper.saveLoadedExtenderScripts(e5);
}
the_fpSpread.error=(t5.getAttribute("error")=="true");
e5.LoadState=null;
if (ak4=="LoadOnDemand"&&!the_fpSpread.error){
var ak8=this.GetElementById(e5,e5.id+"_data");
var ak9=this.GetElementById(t5,e5.id+"_data");
if (ak8!=null&&ak9!=null)ak8.setAttribute("data",ak9.getAttribute("data"));
var al0=t5.getElementsByTagName("style");
if (al0!=null){
for (var f2=0;f2<al0.length;f2++){
if (al0[f2]!=null&&al0[f2].innerHTML!=null&&al0[f2].innerHTML.indexOf(e5.id+"msgStyle")<0)
e5.appendChild(al0[f2].cloneNode(true));
}
}
var al1=this.GetElementById(e5,e5.id+"_LoadInfo");
var al2=this.GetElementById(t5,e5.id+"_LoadInfo");
if (al1!=null&&al2!=null)al1.value=al2.value;
var al3=false;
var al4=this.GetElementById(t5,e5.id+"_rowHeader");
if (al4!=null){
al4=al4.firstChild;
al3=(al4.rows.length>1);
var k0=this.GetRowHeader(e5);
this.LoadRows(k0,al4,true);
}
var al5=this.GetElementById(t5,e5.id+"_viewport2");
if (al5!=null){
al3=(al5.rows.length>0);
var e8=this.GetViewport2(e5);
this.LoadRows(e8,al5,false);
}
al5=this.GetElementById(t5,e5.id+"_viewport");
if (al5!=null){
al3=(al5.rows.length>0);
var e8=this.GetViewport(e5);
this.LoadRows(e8,al5,false);
}
var d6=e5.d6;
var d7=e5.d7;
var al6=e5.d4;
var al7=e5.d5;
var o7=e5.d8;
the_fpSpread.Init(e5,ak4);
the_fpSpread.LoadScrollbarState(e5);
if (ak4!="LoadOnDemand")the_fpSpread.Focus(e5);
e5.d6=d6;
e5.d7=d7;
e5.d4=al6;
e5.d5=al7;
e5.d8=o7;
if (al3)
e5.LoadState=null;
else 
e5.LoadState="complete";
if (typeof(Sys)!='undefined'){
FarPoint.System.ExtenderHelper.loadExtenderScripts(e5,ak6.contentWindow.document);
}
}else {
e5.innerHTML=t5.innerHTML;
the_fpSpread.CopySpreadAttrs(t5,e5);
if (typeof(Sys)!='undefined'){
FarPoint.System.ExtenderHelper.loadExtenderScripts(e5,ak6.contentWindow.document);
}
var al8=ak6.contentWindow.document.getElementById(e5.id+"_initScript");
eval(al8.value);
}
}else {
the_fpSpread.error=true;
var al9=e5.getAttribute("errorPage");
if (al9!=null&&al9.length>0){
window.location.href=al9;
}
}
}
this.LoadRows=function (e8,al5,isHeader){
if (e8==null||al5==null)return ;
var am0=e8.tBodies[0];
var u8=al5.rows.length;
var am1=null;
if (isHeader){
u8--;
if (am0.rows.length>0)am1=am0.rows[am0.rows.length-1];
}
for (var f2=0;f2<u8;f2++){
var am2=al5.rows[f2].cloneNode(false);
am0.insertBefore(am2,am1);
am2.innerHTML=al5.rows[f2].innerHTML;
}
if (!isHeader){
for (var f2=0;f2<al5.parentNode.childNodes.length;f2++){
var ac1=al5.parentNode.childNodes[f2];
if (ac1!=al5){
e8.parentNode.insertBefore(ac1.cloneNode(true),null);
}
}
}
}
this.CopySpreadAttr=function (u4,dest,attrName){
var am3=u4.getAttribute(attrName);
var am4=dest.getAttribute(attrName);
if (am3!=null||am4!=null){
if (am3==null)
dest.removeAttribute(attrName);
else 
dest.setAttribute(attrName,am3);
}
}
this.CopySpreadAttrs=function (u4,dest){
this.CopySpreadAttr(u4,dest,"totalRowCount");
this.CopySpreadAttr(u4,dest,"pageCount");
this.CopySpreadAttr(u4,dest,"loadOnDemand");
this.CopySpreadAttr(u4,dest,"allowGroup");
this.CopySpreadAttr(u4,dest,"colMove");
this.CopySpreadAttr(u4,dest,"showFocusRect");
this.CopySpreadAttr(u4,dest,"FocusBorderColor");
this.CopySpreadAttr(u4,dest,"FocusBorderStyle");
this.CopySpreadAttr(u4,dest,"FpDefaultEditorID");
this.CopySpreadAttr(u4,dest,"hierView");
this.CopySpreadAttr(u4,dest,"IsNewRow");
this.CopySpreadAttr(u4,dest,"cmdTop");
this.CopySpreadAttr(u4,dest,"ProcessTab");
this.CopySpreadAttr(u4,dest,"AcceptFormula");
this.CopySpreadAttr(u4,dest,"EditMode");
this.CopySpreadAttr(u4,dest,"AllowInsert");
this.CopySpreadAttr(u4,dest,"AllowDelete");
this.CopySpreadAttr(u4,dest,"error");
this.CopySpreadAttr(u4,dest,"ajax");
this.CopySpreadAttr(u4,dest,"autoCalc");
this.CopySpreadAttr(u4,dest,"multiRange");
this.CopySpreadAttr(u4,dest,"rowFilter");
this.CopySpreadAttr(u4,dest,"OperationMode");
this.CopySpreadAttr(u4,dest,"selectedForeColor");
this.CopySpreadAttr(u4,dest,"selectedBackColor");
this.CopySpreadAttr(u4,dest,"anchorBackColor");
this.CopySpreadAttr(u4,dest,"columnHeaderAutoTextIndex");
this.CopySpreadAttr(u4,dest,"EnableRowEditTemplate");
this.CopySpreadAttr(u4,dest,"scrollContent");
this.CopySpreadAttr(u4,dest,"scrollContentColumns");
this.CopySpreadAttr(u4,dest,"scrollContentTime");
this.CopySpreadAttr(u4,dest,"scrollContentMaxHeight");
this.CopySpreadAttr(u4,dest,"SelectionPolicy");
this.CopySpreadAttr(u4,dest,"ShowHeaderSelection");
this.CopySpreadAttr(u4,dest,"layoutMode");
this.CopySpreadAttr(u4,dest,"layoutRowCount");
dest.tabIndex=u4.tabIndex;
if (dest.style!=null&&u4.style!=null){
if (dest.style.width!=u4.style.width)dest.style.width=u4.style.width;
if (dest.style.height!=u4.style.height)dest.style.height=u4.style.height;
if (dest.style.border!=u4.style.border)dest.style.border=u4.style.border;
}
}
this.Clone=function (m9){
var g1=document.createElement(m9.tagName);
g1.id=m9.id;
var h5=m9.firstChild;
while (h5!=null){
var q4=this.Clone(h5);
g1.appendChild(q4);
h5=h5.nextSibling;
}
return g1;
}
this.FireEvent=function (e5,g4){
if (e5==null||g4==null)return ;
var f0=this.GetTopSpread(e5);
if (f0!=null){
g4.spread=e5;
f0.dispatchEvent(g4);
}
}
this.GetForm=function (e5)
{
var i5=e5.parentNode;
while (i5!=null&&i5.tagName!="FORM")i5=i5.parentNode;
return i5;
}
this.SyncData=function (v9,ak4,e5,asyncCallBack){
if (window.fpPostOn!=null){
return ;
}
this.editing=false;
var g4=this.CreateEvent("CallBackStart");
g4.cancel=false;
g4.command=ak4;
if (asyncCallBack==null)asyncCallBack=false;
g4.async=asyncCallBack;
if (e5==null){
var q4=v9.split(":").join("_");
e5=document.getElementById(q4);
}
if (e5!=null){
var f0=this.GetTopSpread(e5);
this.FireEvent(e5,g4);
}
if (g4.cancel){
the_fpSpread.ClearCellData(e5);
return ;
}
if (ak4!=null&&(ak4.indexOf("SelectView,")==0||ak4=="Next"||ak4=="Prev"||ak4.indexOf("Group,")==0||ak4.indexOf("Page,")==0))
e5.LoadState=null;
var am5=g4.async;
if (am5){
this.OpenWaitMsg(e5);
}
window.fpPostOn=true;
if (this.error)ak4="update";
try {
var ac5=this.GetForm(e5);
if (ac5==null)return ;
ac5.__EVENTTARGET.value=v9;
ac5.__EVENTARGUMENT.value=encodeURIComponent(ak4);
var am6=ac5.action;
var g1;
if (am6.indexOf("?")>-1){
g1="&";
}
else 
{
g1="?";
}
am6=am6+g1;
var f7=this.CollectData(e5);
var ak7="";
var ak3=(window.XMLHttpRequest)?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
if (ak3==null)return ;
ak3.open("POST",am6,am5);
ak3.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
if (e5!=null)
window.srcfpspread=e5.id;
else 
window.srcfpspread=v9;
window.fpcommand=ak4;
this.AttachEvent(ak3,"load",the_fpSpread.ProcessData,false);
ak3.send(f7);
}catch (g4){
window.fpPostOn=false;
d9=null;
}
};
this.CollectData=function (e5){
var ac5=this.GetForm(e5);
var g1;
var g6="fpcallback=true&";
for (var f2=0;f2<ac5.elements.length;f2++){
g1=ac5.elements[f2];
var am7=g1.tagName.toLowerCase();
if (am7=="input"){
var am8=g1.type;
if (am8=="hidden"||am8=="text"||am8=="password"||((am8=="checkbox"||am8=="radio")&&g1.checked)){
g6+=(g1.name+"="+encodeURIComponent(g1.value)+"&");
}
}else if (am7=="select"){
if (g1.childNodes!=null){
for (var i3=0;i3<g1.childNodes.length;i3++){
var r7=g1.childNodes[i3];
if (r7!=null&&r7.tagName!=null&&r7.tagName.toLowerCase()=="option"&&r7.selected){
g6+=(g1.name+"="+encodeURIComponent(r7.value)+"&");
}
}
}
}else if (am7=="textarea"){
g6+=(g1.name+"="+encodeURIComponent(g1.value)+"&");
}
}
return g6;
};
this.ClearCellData=function (e5){
var f7=this.GetData(e5);
var am9=f7.getElementsByTagName("root")[0];
var f8=am9.getElementsByTagName("data")[0];
if (f8==null)return null;
if (e5.d9!=null){
var j1=e5.d9.firstChild;
while (j1!=null){
var h3=j1.getAttribute("key");
var an0=j1.firstChild;
while (an0!=null){
var h5=an0.getAttribute("key");
var an1=f8.firstChild;
while (an1!=null){
var h7=an1.getAttribute("key");
if (h3==h7){
var an2=false;
var an3=an1.firstChild;
while (an3!=null){
var h8=an3.getAttribute("key");
if (h5==h8){
an1.removeChild(an3);
an2=true;
break ;
}
an3=an3.nextSibling;
}
if (an2)break ;
}
an1=an1.nextSibling;
}
an0=an0.nextSibling;
}
j1=j1.nextSibling;
}
}
e5.d9=null;
var g0=this.GetCmdBtn(e5,"Cancel");
if (g0!=null)
this.UpdateCmdBtnState(g0,true);
}
this.StorePostData=function (e5){
var f7=this.GetData(e5);
var f8=f7.getElementsByTagName("root")[0];
var af3=f8.getElementsByTagName("data")[0];
if (af3!=null)e5.d9=af3.cloneNode(true);
}
this.ShowMessage=function (e5,y0,j1,o2,time){
var n9=e5.GetRowCount();
var h2=e5.GetColCount();
if (j1==null||o2==null||j1<0||j1>=n9||o2<0||o2>=h2){
j1=-1;
o2=-1;
}
this.ShowMessageInner(e5,y0,j1,o2,time);
}
this.HideMessage=function (e5,j1,o2){
var n9=e5.GetRowCount();
var h2=e5.GetColCount();
if (j1==null||o2==null||j1<0||j1>=n9||o2<0||o2>=h2)
if (e5.msgList&&e5.msgList.centerMsg&&e5.msgList.centerMsg.msgBox.IsVisible)
e5.msgList.centerMsg.msgBox.Hide();
var an4=this.GetMsgObj(e5,j1,o2);
if (an4&&an4.msgBox.IsVisible){
an4.msgBox.Hide();
}
}
this.ShowMessageInner=function (e5,y0,j1,o2,time){
var an4=this.GetMsgObj(e5,j1,o2);
if (an4){
if (an4.timer)
an4.msgBox.Hide();
}
else 
an4=this.CreateMsgObj(e5,j1,o2);
var an5=an4.msgBox;
an5.Show(e5,this,y0);
if (time&&time>0)
an4.timer=setTimeout(function (){an5.Hide();},time);
this.SetMsgObj(e5,an4);
}
this.GetMsgObj=function (e5,j1,o2){
var an4;
var an6=e5.msgList;
if (an6){
if (j1==-1&&o2==-1)
an4=an6.centerMsg;
else if (j1==-2)
an4=an6.hScrollMsg;
else if (o2==-2)
an4=an6.vScrollMsg;
else {
if (an6[j1])
an4=an6[j1][o2];
}
}
return an4;
}
this.SetMsgObj=function (e5,an4){
var an6=e5.msgList;
if (an4.row==-1&&an4.col==-1)
an6.centerMsg=an4;
else if (an4.row==-2)
an6.hScrollMsg=an4;
else if (an4.col==-2)
an6.vScrollMsg=an4;
else {
if (!an6[an4.row])an6[an4.row]=new Array();
an6[an4.row][an4.col]=an4;
}
}
var an7=null;
this.CreateMsgObj=function (e5,j1,o2){
var an5=document.createElement("div");
var an4={row:j1,col:o2,msgBox:an5};
var an8=null;
if (j1!=-2&&o2!=-2){
an5.style.border="1px solid black";
an5.style.background="yellow";
an5.style.color="red";
}
else {
an5.style.border="1px solid #55678e";
an5.style.fontSize="small";
an5.style.background="#E6E9ED";
an5.style.color="#4c5b7f";
this.GetScrollingContentStyle(e5);
an8=an7;
}
if (an8!=null){
if (an8.fontFamily!=null)
an5.style.fontFamily=an8.fontFamily;
if (an8.fontSize!=null)
an5.style.fontSize=an8.fontSize;
if (an8.fontStyle!=null)
an5.style.fontStyle=an8.fontStyle;
if (an8.fontVariant!=null)
an5.style.fontVariant=an8.fontVariant;
if (an8.fontWeight!=null)
an5.style.fontWeight=an8.fontWeight;
if (an8.backgroundColor!=null)
an5.style.backgroundColor=an8.backgroundColor;
if (an8.color!=null)
an5.style.color=an8.color;
}
an5.style.position="absolute";
an5.style.overflow="hidden";
an5.style.display="block";
an5.style.marginLeft=0;
an5.style.marginTop=2;
an5.style.marginRight=0;
an5.style.marginBottom=0;
an5.msgObj=an4;
an5.Show=function (t5,fpObj,y0){
var z3=fpObj.GetMsgPos(t5,this.msgObj.row,this.msgObj.col);
var e9=fpObj.GetCommandBar(t5);
var an9=fpObj.GetGroupBar(t5);
this.style.visibility="visible";
this.style.display="block";
if (y0){
this.style.left=""+0+"px";
this.style.top=""+0+"px";
this.style.width="auto";
this.innerHTML=y0;
}
var n8=fpObj.GetViewport0(t5);
var f5=fpObj.GetViewport1(t5);
var y3=fpObj.GetViewport2(t5);
var ao0=(n8||f5||y3);
var ao1=(t5.style.position=="relative"||t5.style.position=="absolute");
var ao2=z3.top;
var ao3=z3.left;
var r7=e5.offsetParent;
while ((r7.tagName=="TD"||r7.tagName=="TR"||r7.tagName=="TBODY"||r7.tagName=="TABLE")&&r7.style.position!="relative"&&r7.style.position!="absolute")
r7=r7.offsetParent;
if (this.msgObj.row>=0&&this.msgObj.col>=0){
if (!ao1&&ao0&&r7){
var ao4=fpObj.GetLocation(t5);
var ao5=fpObj.GetLocation(r7);
ao2+=ao4.y-ao5.y;
ao3+=ao4.x-ao5.x;
if (r7.tagName!="BODY"){
ao2-=fpObj.GetBorderWidth(r7,0);
ao3-=fpObj.GetBorderWidth(r7,3);
}
}
var ao6=fpObj.GetViewPortByRowCol(t5,this.msgObj.row,this.msgObj.col);
if (!this.parentNode&&ao6&&ao6.parentNode)ao6.parentNode.insertBefore(an5,null);
var j5=this.offsetWidth;
this.style.left=""+ao3+"px";
if (!ao0&&ao6&&ao6.parentNode&&ao3+j5>ao6.offsetWidth)
this.style.width=""+(z3.a5-2)+"px";
else if (parseInt(this.style.width)!=j5)
this.style.width=""+(j5-2)+"px";
if (!ao0&&ao6!=null&&ao2>=ao6.offsetHeight-2)ao2-=z3.a4+this.offsetHeight;
this.style.top=""+ao2+"px";
}
else {
if (!ao1&&r7){
var ao4=fpObj.GetLocation(t5);
var ao5=fpObj.GetLocation(r7);
ao2+=ao4.y-ao5.y;
ao3+=ao4.x-ao5.x;
if (r7.tagName!="BODY"){
ao2-=fpObj.GetBorderWidth(r7,0);
ao3-=fpObj.GetBorderWidth(r7,3);
}
}
var ao7=20;
if (!this.parentNode)t5.insertBefore(an5,null);
if (this.offsetWidth+ao7<t5.offsetWidth)
ao3+=(t5.offsetWidth-this.offsetWidth-ao7)/(this.msgObj.row==-2?1:2);
else 
this.style.width=""+(t5.offsetWidth-ao7)+"px";
if (this.offsetHeight<t5.offsetHeight)
ao2+=(t5.offsetHeight-this.offsetHeight)/(this.msgObj.col==-2?1:2);
if (this.msgObj.col==-2){
var ao8=fpObj.GetColFooter(t5);
if (ao8)ao2-=ao8.offsetHeight;
var e9=fpObj.GetCommandBar(t5);
if (e9)ao2-=e9.offsetHeight;
ao2-=ao7;
}
this.style.top=""+ao2+"px";
this.style.left=""+ao3+"px";
}
this.IsVisible=true;
};
an5.Hide=function (){
this.style.visibility="hidden";
this.style.display="none";
this.IsVisible=false;
if (this.msgObj.timer){
clearTimeout(this.msgObj.timer);
this.msgObj.timer=null;
}
this.innerHTML="";
};
return an4;
}
this.GetLocation=function (ele){
if ((ele.window&&ele.window===ele)||ele.nodeType===9)return {x:0,y:0};
var ao9=0;
var ap0=0;
var ap1=null;
var ap2=null;
var ap3=null;
for (var j0=ele;j0;ap1=j0,ap2=ap3,j0=j0.offsetParent){
var am7=j0.tagName;
ap3=this.GetCurrentStyle2(j0);
if ((j0.offsetLeft||j0.offsetTop)&&
!((am7==="BODY")&&
(!ap2||ap2.position!="absolute"))){
ao9+=j0.offsetLeft;
ap0+=j0.offsetTop;
}
if (ap1!=null&&ap3){
if ((am7!="TABLE")&&(am7!="TD")&&(am7!="HTML")){
ao9+=parseInt(ap3.borderLeftWidth)||0;
ap0+=parseInt(ap3.borderTopWidth)||0;
}
if (am7==="TABLE"&&
(ap3.position==="relative"||ap3.position==="absolute")){
ao9+=parseInt(ap3.marginLeft)||0;
ap0+=parseInt(ap3.marginTop)||0;
}
}
}
ap3=this.GetCurrentStyle2(ele);
var ap4=ap3?ap3.position:null;
if (!ap4||(ap4!="absolute")){
for (var j0=ele.parentNode;j0;j0=j0.parentNode){
am7=j0.tagName;
if ((am7!="BODY")&&(am7!="HTML")&&(j0.scrollLeft||j0.scrollTop)){
ao9-=(j0.scrollLeft||0);
ap0-=(j0.scrollTop||0);
ap3=this.GetCurrentStyle2(j0);
if (ap3){
ao9+=parseInt(ap3.borderLeftWidth)||0;
ap0+=parseInt(ap3.borderTopWidth)||0;
}
}
}
}
return {x:ao9,y:ap0};
}
var ap5=["borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth"];
var ap6=["borderTopStyle","borderRightStyle","borderBottomStyle","borderLeftStyle"];
var ap7;
this.GetBorderWidth=function (ele,side){
if (!this.GetBorderVisible(ele,side))return 0;
var o0=this.GetCurrentStyle(ele,ap5[side]);
return this.ParseBorderWidth(o0);
}
this.GetBorderVisible=function (ele,side){
return this.GetCurrentStyle(ele,ap6[side])!="none";
}
this.GetWindow=function (ele){
var ak5=ele.ownerDocument||ele.document||ele;
return ak5.defaultView||ak5.parentWindow;
}
this.GetCurrentStyle2=function (ele){
if (ele.nodeType===3)return null;
var j5=this.GetWindow(ele);
if (ele.documentElement)ele=ele.documentElement;
var ap8=(j5&&(ele!=j5))?j5.getComputedStyle(ele,null):ele.style;
return ap8;
}
this.GetCurrentStyle=function (ele,attribute,defaultValue){
var ap9=null;
if (ele){
if (ele.currentStyle){
ap9=ele.currentStyle[attribute];
}
else if (document.defaultView&&document.defaultView.getComputedStyle){
var aq0=document.defaultView.getComputedStyle(ele,null);
if (aq0){
ap9=aq0[attribute];
}
}
if (!ap9&&ele.style.getPropertyValue){
ap9=ele.style.getPropertyValue(attribute);
}
else if (!ap9&&ele.style.getAttribute){
ap9=ele.style.getAttribute(attribute);
}
}
if (!ap9||ap9==""||typeof(ap9)==='undefined'){
if (typeof(defaultValue)!='undefined'){
ap9=defaultValue;
}
else {
ap9=null;
}
}
return ap9;
}
this.ParseBorderWidth=function (o0){
if (!ap7){
var aq1={};
var aq2=document.createElement('div');
aq2.style.visibility='hidden';
aq2.style.position='absolute';
aq2.style.fontSize='1px';
document.body.appendChild(aq2)
var aq3=document.createElement('div');
aq3.style.height='0px';
aq3.style.overflow='hidden';
aq2.appendChild(aq3);
var aq4=aq2.offsetHeight;
aq3.style.borderTop='solid black';
aq3.style.borderTopWidth='thin';
aq1['thin']=aq2.offsetHeight-aq4;
aq3.style.borderTopWidth='medium';
aq1['medium']=aq2.offsetHeight-aq4;
aq3.style.borderTopWidth='thick';
aq1['thick']=aq2.offsetHeight-aq4;
aq2.removeChild(aq3);
document.body.removeChild(aq2);
ap7=aq1;
}
if (o0){
switch (o0){
case 'thin':
case 'medium':
case 'thick':
return ap7[o0];
case 'inherit':
return 0;
}
var aq5=this.ParseUnit(o0);
if (aq5.type!='px')
throw new Error();
return aq5.size;
}
return 0;
}
this.ParseUnit=function (o0){
if (!o0)
throw new Error();
o0=this.Trim(o0).toLowerCase();
var ae2=o0.length;
var t5=-1;
for (var f2=0;f2<ae2;f2++){
var ac1=o0.substr(f2,1);
if ((ac1<'0'||ac1>'9')&&ac1!='-'&&ac1!='.'&&ac1!=',')
break ;
t5=f2;
}
if (t5==-1)
throw new Error();
var am8;
var aq6;
if (t5<(ae2-1))
am8=this.Trim(o0.substring(t5+1));
else 
am8='px';
aq6=parseFloat(o0.substr(0,t5+1));
if (am8=='px'){
aq6=Math.floor(aq6);
}
return {size:aq6,type:am8};
}
this.GetViewPortByRowCol=function (e5,j1,o2){
var n8=this.GetViewport0(e5);
var f5=this.GetViewport1(e5);
var y3=this.GetViewport2(e5);
var o0=this.GetViewport(e5);
var h6=this.GetCellByRowCol(e5,j1,o2);
if (o0!=null&&this.IsChild(h6,o0))
return o0;
else if (y3!=null&&this.IsChild(h6,y3))
return y3;
else if (f5!=null&&this.IsChild(h6,f5))
return f5;
else if (n8!=null&&this.IsChild(h6,n8))
return n8;
return ;
}
this.GetMsgPos=function (e5,j1,o2){
if (j1<0||o2<0){
return {left:0,top:0};
}
else {
var n8=this.GetViewport0(e5);
var f5=this.GetViewport1(e5);
var y3=this.GetViewport2(e5);
var o0=this.GetViewport(e5);
var aq7=this.GetGroupBar(e5);
var n0=document.getElementById(e5.id+"_titleBar");
var h6=this.GetCellByRowCol(e5,j1,o2);
var g1=h6.offsetTop+h6.clientHeight;
var ae2=h6.offsetLeft;
if ((n8!=null||f5!=null)&&(this.IsChild(h6,y3)||this.IsChild(h6,o0))){
if (n8!=null)
g1+=n8.offsetHeight;
else 
g1+=f5.offsetHeight;
}
if ((n8!=null||y3!=null)&&(this.IsChild(h6,f5)||this.IsChild(h6,o0))){
if (n8!=null)
ae2+=n8.offsetWidth;
else 
ae2+=y3.offsetWidth;
}
if (o0!=null&&(n8||f5||y3)){
if (n0)g1+=n0.offsetHeight;
if (aq7)g1+=aq7.offsetHeight;
if (this.GetColHeader(e5))g1+=this.GetColHeader(e5).offsetHeight;
if (this.GetRowHeader(e5))ae2+=this.GetRowHeader(e5).offsetWidth;
}
if (o0!=null&&this.IsChild(h6,o0)){
if (f5||y3)
g1-=o0.parentNode.scrollTop;
if (f5||y3)
ae2-=o0.parentNode.scrollLeft;
}
if (y3!=null&&this.IsChild(h6,y3)){
g1-=y3.parentNode.scrollTop;
}
if (f5!=null&&this.IsChild(h6,f5)){
ae2-=f5.parentNode.scrollLeft;
}
var k2=h6.clientHeight;
var j5=h6.clientWidth;
return {left:ae2,top:g1,a4:k2,a5:j5};
}
}
this.SyncMsgs=function (e5){
if (!e5.msgList)return ;
for (f2 in e5.msgList){
if (e5.msgList[f2].constructor==Array){
for (i3 in e5.msgList[f2]){
if (e5.msgList[f2][i3]&&e5.msgList[f2][i3].msgBox&&e5.msgList[f2][i3].msgBox.IsVisible){
e5.msgList[f2][i3].msgBox.Show(e5,this);
}
}
}
}
}
this.GetCellInfo=function (e5,h3,h5,z3){
var f7=this.GetData(e5);
if (f7==null)return null;
var f8=f7.getElementsByTagName("root")[0];
if (f8==null)return null;
var o7=f8.getElementsByTagName("state")[0];
if (o7==null)return null;
var aq8=o7.getElementsByTagName("cellinfo")[0];
if (aq8==null)return null;
var g1=aq8.firstChild;
while (g1!=null){
if ((g1.getAttribute("r")==""+h3)&&(g1.getAttribute("c")==""+h5)&&(g1.getAttribute("pos")==""+z3))return g1;
g1=g1.nextSibling;
}
return null;
}
this.AddCellInfo=function (e5,h3,h5,z3){
var o4=this.GetCellInfo(e5,h3,h5,parseInt(z3));
if (o4!=null)return o4;
var f7=this.GetData(e5);
var f8=f7.getElementsByTagName("root")[0];
if (f8==null)return null;
var o7=f8.getElementsByTagName("state")[0];
if (o7==null)return null;
var aq8=o7.getElementsByTagName("cellinfo")[0];
if (aq8==null)return null;
if (document.all!=null){
o4=f7.createNode("element","c","");
}else {
o4=document.createElement("c");
o4.style.display="none";
}
o4.setAttribute("r",h3);
o4.setAttribute("c",h5);
o4.setAttribute("pos",z3);
aq8.appendChild(o4);
return o4;
}
this.setCellAttribute=function (e5,h6,attname,x7,noEvent,recalc){
if (h6==null)return ;
var h3=this.GetRowKeyFromCell(e5,h6);
var h5=e5.getAttribute("LayoutMode")?this.GetColKeyFromCell2(e5,h6):this.GetColKeyFromCell(e5,h6);
if (typeof(h3)=="undefined")return ;
var z3=-1;
if (this.IsChild(h6,this.GetCorner(e5)))
z3=0;
else if (this.IsChild(h6,this.GetRowHeader(e5))||this.IsChild(h6,this.GetFrozColHeader(e5)))
z3=1;
else if (this.IsChild(h6,this.GetColHeader(e5))||this.IsChild(h6,this.GetFrozColHeader(e5)))
z3=2;
else if (this.IsChild(h6,this.GetViewport(e5))||this.IsChild(h6,this.GetViewport0(e5))||this.IsChild(h6,this.GetViewport1(e5))||this.IsChild(h6,this.GetViewport2(e5)))
z3=3;
var t1=this.AddCellInfo(e5,h3,h5,z3);
t1.setAttribute(attname,x7);
if (!noEvent){
var g4=this.CreateEvent("DataChanged");
g4.cell=h6;
g4.cellValue=x7;
g4.row=h3;
g4.col=h5;
this.FireEvent(e5,g4);
}
var g0=this.GetCmdBtn(e5,"Update");
if (g0!=null&&g0.getAttribute("disabled")!=null)
this.UpdateCmdBtnState(g0,false);
g0=this.GetCmdBtn(e5,"Cancel");
if (g0!=null&&g0.getAttribute("disabled")!=null)
this.UpdateCmdBtnState(g0,false);
e5.e3=true;
if (recalc){
this.UpdateValues(e5);
}
}
this.updateCellLocked=function (h6,locked){
if (h6==null)return ;
var g1=h6.getAttribute("FpCellType")=="readonly";
if (g1==locked)return ;
var h5=h6.firstChild;
while (h5!=null){
if (typeof(h5.disabled)!="undefined")h5.disabled=locked;
h5=h5.nextSibling;
}
}
this.Cells=function (e5,h3,h5)
{
var aq9=this.GetCellByRowCol(e5,h3,h5);
if (aq9){
aq9.GetValue=function (){
return the_fpSpread.GetValue(e5,h3,h5);
}
aq9.SetValue=function (value){
if (typeof(value)=="undefined")return ;
if (this.parentNode.getAttribute("previewRow")!=null)return ;
the_fpSpread.SetValue(e5,h3,h5,value);
the_fpSpread.SaveClientEditedDataRealTime();
}
aq9.GetBackColor=function (){
if (this.getAttribute("bgColorBak")!=null)
return this.getAttribute("bgColorBak");
return document.defaultView.getComputedStyle(this,"").getPropertyValue("background-color");
}
aq9.SetBackColor=function (value){
if (typeof(value)=="undefined")return ;
this.bgColor=value;
this.setAttribute("bgColorBak",value);
this.style.backgroundColor=value;
the_fpSpread.setCellAttribute(e5,this,"bc",value);
the_fpSpread.SaveClientEditedDataRealTime();
}
aq9.GetForeColor=function (){
return document.defaultView.getComputedStyle(this,"").getPropertyValue("color");
}
aq9.SetForeColor=function (value){
if (typeof(value)=="undefined")return ;
this.style.color=value;
the_fpSpread.setCellAttribute(e5,this,"fc",value);
the_fpSpread.SaveClientEditedDataRealTime();
}
aq9.GetTabStop=function (){
return this.getAttribute("TabStop")!="false";
}
aq9.SetTabStop=function (value){
if (typeof(value)=="undefined")return ;
var ar0=new String(value);
if (ar0.toLocaleLowerCase()=="false"){
this.setAttribute("TabStop","false");
the_fpSpread.setCellAttribute(e5,this,"ts","false");
the_fpSpread.SaveClientEditedDataRealTime();
}else {
this.removeAttribute("TabStop");
}
}
aq9.GetCellType=function (){
var ar1=the_fpSpread.GetCellType2(this);
if (ar1=="text"||ar1=="readonly")
{
ar1=this.getAttribute("CellType2");
}
if (ar1==null)
ar1="GeneralCellType";
return ar1;
}
aq9.GetHAlign=function (){
var ar2=document.defaultView.getComputedStyle(this,"").getPropertyValue("text-Align");
if (ar2==""||ar2=="undefined"||ar2==null){
ar2=this.style.textAlign;
}
if (ar2==""||ar2=="undefined"||ar2==null)
ar2=this.getAttribute("align");
if (ar2=="start")ar2="left";
if (ar2!=null&&ar2.indexOf("-moz")!=-1)ar2=ar2.replace("-moz-","");
return ar2;
}
aq9.SetHAlign=function (value){
if (typeof(value)=="undefined")return ;
this.style.textAlign=typeof(value)=="string"?value:value.Name;
the_fpSpread.setCellAttribute(e5,this,"ha",typeof(value)=="string"?value:value.Name);
the_fpSpread.SaveClientEditedDataRealTime();
}
aq9.GetVAlign=function (){
var ar3=document.defaultView.getComputedStyle(this,"").getPropertyValue("vertical-Align");
if (ar3==""||ar3=="undefined"||ar3==null)
ar3=this.style.verticalAlign;
if (ar3==""||ar3=="undefined"||ar3==null)
ar3=this.getAttribute("valign");
return ar3;
}
aq9.SetVAlign=function (value){
if (typeof(value)=="undefined")return ;
this.style.verticalAlign=typeof(value)=="string"?value:value.Name;
the_fpSpread.setCellAttribute(e5,this,"va",typeof(value)=="string"?value:value.Name);
the_fpSpread.SaveClientEditedDataRealTime();
}
aq9.GetLocked=function (){
if (aq9.GetCellType()=="ButtonCellType"||aq9.GetCellType()=="TagCloudCellType"||aq9.GetCellType()=="HyperLinkCellType")
return aq9.getAttribute("Locked")=="1";
return the_fpSpread.GetCellType(this)=="readonly";
}
aq9.GetFont_Name=function (){
return document.defaultView.getComputedStyle(this,"").getPropertyValue("font-family");
}
aq9.SetFont_Name=function (value){
if (typeof(value)=="undefined")return ;
this.style.fontFamily=value;
the_fpSpread.setCellAttribute(e5,this,"fn",value);
the_fpSpread.SaveClientEditedDataRealTime();
}
aq9.GetFont_Size=function (){
return document.defaultView.getComputedStyle(this,"").getPropertyValue("font-size");
}
aq9.SetFont_Size=function (value){
if (typeof(value)=="undefined")return ;
if (typeof(value)=="number")value+="px";
this.style.fontSize=value;
the_fpSpread.setCellAttribute(e5,this,"fs",value);
the_fpSpread.SizeSpread(e5);
the_fpSpread.SaveClientEditedDataRealTime();
}
aq9.GetFont_Bold=function (){
return document.defaultView.getComputedStyle(this,"").getPropertyValue("font-weight")=="bold"?true:false;
}
aq9.SetFont_Bold=function (value){
if (typeof(value)=="undefined")return ;
this.style.fontWeight=value==true?"bold":"normal";
the_fpSpread.setCellAttribute(e5,this,"fb",new String(value).toLocaleLowerCase());
the_fpSpread.SaveClientEditedDataRealTime();
}
aq9.GetFont_Italic=function (){
return document.defaultView.getComputedStyle(this,"").getPropertyValue("font-style")=="italic"?true:false;
}
aq9.SetFont_Italic=function (value){
if (typeof(value)=="undefined")return ;
this.style.fontStyle=value==true?"italic":"normal";
the_fpSpread.setCellAttribute(e5,this,"fi",new String(value).toLocaleLowerCase());
the_fpSpread.SaveClientEditedDataRealTime();
}
aq9.GetFont_Overline=function (){
return document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("overline")>=0?true:false;
}
aq9.SetFont_Overline=function (value){
if (value){
var ar4=new String("overline");
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("line-through")>=0)
ar4+=" line-through"
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("underline")>=0)
ar4+=" underline"
this.style.textDecoration=ar4;
}
else {
var ar4=new String("");
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("line-through")>=0)
ar4+=" line-through"
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("underline")>=0)
ar4+=" underline"
if (ar4=="")ar4="none";
this.style.textDecoration=ar4;
}
the_fpSpread.setCellAttribute(e5,this,"fo",new String(value).toLocaleLowerCase());
the_fpSpread.SaveClientEditedDataRealTime();
}
aq9.GetFont_Strikeout=function (){
return document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("line-through")>=0?true:false;
}
aq9.SetFont_Strikeout=function (value){
if (value){
var ar4=new String("line-through");
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("overline")>=0)
ar4+=" overline"
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("underline")>=0)
ar4+=" underline"
this.style.textDecoration=ar4;
}
else {
var ar4=new String("");
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("overline")>=0)
ar4+=" overline"
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("underline")>=0)
ar4+=" underline"
if (ar4=="")ar4="none";
this.style.textDecoration=ar4;
}
the_fpSpread.setCellAttribute(e5,this,"fk",new String(value).toLocaleLowerCase());
the_fpSpread.SaveClientEditedDataRealTime();
}
aq9.GetFont_Underline=function (){
return document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("underline")>=0?true:false;
}
aq9.SetFont_Underline=function (value){
if (value){
var ar4=new String("underline");
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("overline")>=0)
ar4+=" overline"
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("line-through")>=0)
ar4+=" line-through"
this.style.textDecoration=ar4;
}
else {
var ar4=new String("");
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("overline")>=0)
ar4+=" overline"
if (document.defaultView.getComputedStyle(this,"").getPropertyValue("text-decoration").indexOf("line-through")>=0)
ar4+=" line-through"
if (ar4=="")ar4="none";
this.style.textDecoration=ar4;
}
the_fpSpread.setCellAttribute(e5,this,"fu",new String(value).toLocaleLowerCase());
the_fpSpread.SaveClientEditedDataRealTime();
}
return aq9;
}
return null;
}
this.getDomRow=function (e5,h3){
var n9=this.GetRowCount(e5);
if (n9==0)return null;
var h6=this.GetCellByRowCol(e5,h3,0);
if (h6){
var f1=h6.parentNode.rowIndex;
if (f1>=0){
var j1=h6.parentNode.parentNode.rows[f1];
if (this.GetSizable(e5,j1))
return j1;
}
return null;
}
}
this.setRowInfo_RowAttribute=function (e5,h3,attname,x7,recalc){
h3=parseInt(h3);
if (h3<0)return ;
var ar5=this.AddRowInfo(e5,h3);
ar5.setAttribute(attname,x7);
var g0=this.GetCmdBtn(e5,"Update");
if (g0!=null&&g0.getAttribute("disabled")!=null)
this.UpdateCmdBtnState(g0,false);
g0=this.GetCmdBtn(e5,"Cancel");
if (g0!=null&&g0.getAttribute("disabled")!=null)
this.UpdateCmdBtnState(g0,false);
e5.e3=true;
if (recalc){
this.UpdateValues(e5);
}
}
this.Rows=function (e5,h3)
{
var ar6=this.getDomRow(e5,h3);
if (ar6){
ar6.GetHeight=function (){
return the_fpSpread.GetRowHeightInternal(e5,h3);
}
ar6.SetHeight=function (value){
if (typeof(value)=="undefined")return ;
the_fpSpread.SetRowHeight2(e5,h3,parseInt(value));
the_fpSpread.SaveClientEditedDataRealTime();
}
return ar6;
}
return null;
}
this.setColInfo_ColumnAttribute=function (e5,h5,attname,x7,recalc){
h5=parseInt(h5);
if (h5<0)return ;
var ar7=this.AddColInfo(e5,h5);
ar7.setAttribute(attname,x7);
var g0=this.GetCmdBtn(e5,"Update");
if (g0!=null&&g0.getAttribute("disabled")!=null)
this.UpdateCmdBtnState(g0,false);
g0=this.GetCmdBtn(e5,"Cancel");
if (g0!=null&&g0.getAttribute("disabled")!=null)
this.UpdateCmdBtnState(g0,false);
e5.e3=true;
if (recalc){
this.UpdateValues(e5);
}
}
this.Columns=function (e5,h5)
{
var ar8={a2:this.GetColByKey(e5,parseInt(h5))};
if (ar8){
ar8.GetWidth=function (){
return the_fpSpread.GetColWidthFromCol(e5,h5);
}
ar8.SetWidth=function (value){
if (typeof(value)=="undefined")return ;
the_fpSpread.SetColWidth(e5,h5,value);
the_fpSpread.SaveClientEditedDataRealTime();
}
return ar8;
}
return null;
}
this.GetTitleBar=function (e5){
try {
if (document.getElementById(e5.id+"_title")==null)return null;
var aj1=document.getElementById(e5.id+"_titleBar");
if (aj1!=null)aj1=document.getElementById(e5.id+"_title");
return aj1;
}
catch (ex){
return null;
}
}
this.CheckTitleInfo=function (e5){
var f7=this.GetData(e5);
if (f7==null)return null;
var f8=f7.getElementsByTagName("root")[0];
if (f8==null)return null;
var ar9=f8.getElementsByTagName("titleinfo")[0];
if (ar9==null)return null;
return ar9;
}
this.AddTitleInfo=function (e5){
var o4=this.CheckTitleInfo(e5);
if (o4!=null)return o4;
var f7=this.GetData(e5);
var f8=f7.getElementsByTagName("root")[0];
if (f8==null)return null;
if (document.all!=null){
o4=f7.createNode("element","titleinfo","");
}else {
o4=document.createElement("titleinfo");
o4.style.display="none";
}
f8.appendChild(o4);
return o4;
}
this.setTitleInfo_Attribute=function (e5,attname,x7,recalc){
var as0=this.AddTitleInfo(e5);
as0.setAttribute(attname,x7);
var g0=this.GetCmdBtn(e5,"Update");
if (g0!=null&&g0.getAttribute("disabled")!=null)
this.UpdateCmdBtnState(g0,false);
g0=this.GetCmdBtn(e5,"Cancel");
if (g0!=null&&g0.getAttribute("disabled")!=null)
this.UpdateCmdBtnState(g0,false);
e5.e3=true;
if (recalc){
this.UpdateValues(e5);
}
}
this.GetTitleInfo=function (e5)
{
var as1=this.GetTitleBar(e5);
if (as1){
as1.GetHeight=function (){
return document.defaultView.getComputedStyle(this,"").getPropertyValue("height");
}
as1.SetHeight=function (value){
this.style.height=parseInt(value)+"px";
the_fpSpread.setTitleInfo_Attribute(e5,"ht",value);
var f0=the_fpSpread.GetTopSpread(e5);
the_fpSpread.SizeAll(f0);
the_fpSpread.Refresh(f0);
the_fpSpread.SaveClientEditedDataRealTime();
}
as1.GetVisible=function (){
return (document.defaultView.getComputedStyle(this,"").getPropertyValue("display")=="none")?false:true;
return document.defaultView.getComputedStyle(this,"").getPropertyValue("visibility");
}
as1.SetVisible=function (value){
this.style.display=value?"":"none";
this.style.visibility=value?"visible":"hidden";
the_fpSpread.setTitleInfo_Attribute(e5,"vs",new String(value).toLocaleLowerCase());
var f0=the_fpSpread.GetTopSpread(e5);
the_fpSpread.SizeAll(f0);
the_fpSpread.Refresh(f0);
the_fpSpread.SaveClientEditedDataRealTime();
}
as1.GetValue=function (){
return this.textContent;
}
as1.SetValue=function (value){
this.textContent=""+value;
the_fpSpread.setTitleInfo_Attribute(e5,"tx",value);
the_fpSpread.SaveClientEditedDataRealTime();
}
return as1;
}
return null;
}
this.SaveClientEditedDataRealTime=function (){
var as2=this.GetPageActiveSpread();
if (as2!=null){
this.SaveData(as2);
as2.e3=false;
}
as2=this.GetPageActiveSheetView();
if (as2!=null){
this.SaveData(as2);
as2.e3=false;
}
}
var as3="";
this.ShowScrollingContent=function (e5,hs){
var t2="";
var q1=this.GetTopSpread(e5);
var as4=q1.getAttribute("scrollContentColumns");
var as5=q1.getAttribute("scrollContentMaxHeight");
var as6=q1.getAttribute("scrollContentTime");
var i8=this.GetViewport(q1);
var as7=this.GetColGroup(i8);
var o0=this.GetParent(i8);
var as8=0;
if (hs){
var as9=o0.scrollLeft;
var c7=this.GetColHeader(q1);
var u9=0;
for (;u9<as7.childNodes.length;u9++){
var h5=as7.childNodes[u9];
as8+=h5.offsetWidth;
if (as8>as9)break ;
}
var at0=this.GetViewport2(q1);
if (at0)u9+=this.GetColGroup(at0).childNodes.length;
if (c7){
var u3=c7.rows.length-1;
if (e5.getAttribute("LayoutMode")==null)
u3=c7.getAttribute("ColTextIndex")?c7.getAttribute("ColTextIndex"):c7.rows.length-1;
var at1=this.GetHeaderCellFromRowCol(q1,u3,u9,true);
if (at1){
if (at1.getAttribute("FpCellType")=="ExtenderCellType"&&at1.getElementsByTagName("DIV").length>0){
var aa2=this.GetEditor(at1);
var aa3=this.GetFunction("ExtenderCellType_getEditorValue");
if (aa2!=null&&aa3!=null){
t2="&nbsp;Column:&nbsp;"+aa3(aa2)+"&nbsp;";
}
}
else 
t2="&nbsp;Column:&nbsp;"+at1.innerHTML+"&nbsp;";
}
}
if (t2.length<=0)t2="&nbsp;Column:&nbsp;"+(u9+1)+"&nbsp;"
}
else {
var o7=o0.scrollTop;
var c6=this.GetRowHeader(q1);
var u3=0;
var at2=0;
var at3=2;
for (var ab4=0;ab4<i8.rows.length;ab4++){
var h3=i8.rows[ab4];
as8+=h3.offsetHeight;
if (as8>o7){
if (h3.getAttribute("fpkey")==null&&!h3.getAttribute("previewrow"))
u3--;
else 
at2=h3.offsetHeight;
break ;
}
if (h3.getAttribute("fpkey")!=null||h3.getAttribute("previewrow")){
u3++;
at2=h3.offsetHeight;
}
}
var at0=this.GetViewport1(q1);
if (at0)u3+=at0.rows.length;
if (e5.getAttribute("LayoutMode")==null&&as4!=null&&as4.length>0){
at2=at2>as5?as5:at2;
var at4=as4.split(",");
var at5=false;
for (var f2=0;f2<at4.length;f2++){
var h5=parseInt(at4[f2]);
if (h5==null||h5>=this.GetColCount(e5))continue ;
var h6=q1.GetCellByRowCol(u3,h5);
if (!h6||h6.getAttribute("col")!=null&&h6.getAttribute("col")!=h5)continue ;
var at6=(h6.getAttribute("group")==1);
var n1=(h6.parentNode.getAttribute("previewrow")!=null);
var g4=(h6.getAttribute("RowEditTemplate")!=null);
var k1=this.IsXHTML(e5);
if (!k1&&as3==""){
this.GetScrollingContentStyle(e5);
if (an7!=null){
if (an7.fontFamily!=null&&an7.fontFamily!="")as3+="fontFamily:"+an7.fontFamily+";";
if (an7.fontSize!=null&&an7.fontSize!="")as3+="fontSize:"+an7.fontSize+";";
if (an7.fontStyle!=null&&an7.fontStyle!="")as3+="fontStyle:"+an7.fontStyle+";";
if (an7.fontVariant!=null&&an7.fontVariant!="")as3+="fontVariant:"+an7.fontVariant+";";
if (an7.fontWeight!=null&&an7.fontWeight!="")as3+="fontWeight:"+an7.fontWeight+";";
if (an7.backgroundColor!=null&&an7.backgroundColor!="")as3+="backgroundColor:"+an7.backgroundColor+";";
if (an7.color!=null&&an7.color!="")as3+="color:"+an7.color;
}
}
if (!at5){
t2+="<div style='overflow:hidden;height:"+at2+"px;ScrollingContentWidth'><table cellPadding='0' cellSpacing='0' style='height:"+at2+"px;"+(at6?"":"table-layout:auto;")+as3+"'><tr>";
}
t2+="<td style='width:"+(at6?0:h6.offsetWidth)+"px;'>";
at3+=h6.offsetWidth;
if (at6)
t2+="&nbsp;<i>GroupBar:</i>&nbsp;"+h6.textContent+"&nbsp;";
else if (n1)
t2+="&nbsp;<i>PreviewRow:</i>&nbsp;"+h6.textContent+"&nbsp;";
else if (g4){
var at7=this.parseCell(e5,h6);
t2+="&nbsp;<i>RowEditTemplate:</i>&nbsp;"+at7+"&nbsp;"
}
else {
if (h6.getAttribute("fpcelltype"))this.UpdateCellTypeDOM(h6);
if (h6.getAttribute("fpcelltype")=="MultiColumnComboBoxCellType"&&h6.childNodes[0]&&h6.childNodes[0].childNodes.length>0&&h6.childNodes[0].getAttribute("MccbId"))
t2+=q1.GetValue(u3,h5);
else if (h6.getAttribute("fpcelltype")=="RadioButtonListCellType"||h6.getAttribute("fpcelltype")=="ExtenderCellType"||h6.getAttribute("fpeditorid")!=null){
var at8=this.parseCell(e5,h6);
t2+=at8;
}
else 
t2+=h6.innerHTML;
}
t2+="</td>";
at5=true;
if (at6||n1||g4)break ;
}
if (at5){
t2=t2.replace("ScrollingContentWidth"," width:"+at3+"px;");
t2+="</tr></table></div>";
}
}
if (t2.length<=0&&c6){
var u9=this.GetColGroup(c6).childNodes.length-1;
if (e5.getAttribute("LayoutMode")==null)
u9=c6.getAttribute("RowTextIndex")?parseInt(c6.getAttribute("RowTextIndex")):this.GetColGroup(c6).childNodes.length-1;
var j1=this.GetDisplayIndex(e5,u3);
var at1=this.GetHeaderCellFromRowCol(e5,j1,u9,false);
if (at1)t2="&nbsp;Row:&nbsp;"+at1.textContent+"&nbsp;";
}
if (t2.length<=0){
var n9=(e5.getAttribute("layoutrowcount")!=null)?parseInt(e5.getAttribute("layoutrowcount")):1;
t2="&nbsp;Row:&nbsp;"+(parseInt(u3/n9)+1)+"&nbsp;";
}
}
this.ShowMessageInner(q1,t2,(hs?-1:-2),(hs?-2:-1),as6);
}
this.parseCell=function (e5,h6){
var t2=h6.innerHTML;
var q1=this.GetTopSpread(e5);
var at9=q1.id;
if (t2.length>0){
t2=t2.replace(new RegExp("=\""+at9,"g"),"=\""+at9+"src");
t2=t2.replace(new RegExp("name="+at9,"g"),"name="+at9+"src");
}
return t2;
}
this.UpdateCellTypeDOM=function (h6){
for (var f2=0;f2<h6.childNodes.length;f2++){
if (h6.childNodes[f2].tagName&&(h6.childNodes[f2].tagName=="INPUT"||h6.childNodes[f2].tagName=="SELECT"))
this.UpdateDOM(h6.childNodes[f2]);
if (h6.childNodes[f2].childNodes&&h6.childNodes[f2].childNodes.length>0)
this.UpdateCellTypeDOM(h6.childNodes[f2]);
}
}
this.UpdateDOM=function (inputField){
if (typeof(inputField)=="string"){
inputField=document.getElementById(inputField);
}
if (inputField.type=="select-one"){
for (var f2=0;f2<inputField.options.length;f2++){
if (f2==inputField.selectedIndex){
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
if (an7!=null)return ;
var f1=document.styleSheets.length;
for (var f2=0;f2<f1;f2++){
var au0=document.styleSheets[f2];
for (var i3=0;i3<au0.cssRules.length;i3++){
var au1=au0.cssRules[i3];
if (au1.selectorText=="."+e5.id+"scrollContentStyle"){
an7=au1.style;
break ;
}
}
if (an7!=null)break ;
}
}
}
function ComboBoxCellType_setValue(y1,x7,e5){
var h6=the_fpSpread.GetCell(y1);
if (h6==null)return ;
var au2=h6.getElementsByTagName("SELECT");
if (au2!=null&&au2.length>0){
au2[0].value=x7;
return 
}
var w3=the_fpSpread.GetCellEditorID(e5,h6);
var a9=null;
if (w3!=null&&typeof(w3)!="undefined"){
a9=the_fpSpread.GetCellEditor(e5,w3,true);
if (a9!=null){
a9.value=x7;
if (a9.selectedIndex>=0&&a9.selectedIndex<a9.options.length)
x7=a9.options[a9.selectedIndex].text;
if (x7!=null&&x7!="")
y1.innerHTML=x7;
else 
y1.innerHTML="&nbsp;";
}
}
}
function ComboBoxCellType_getValue(y1,e5){
var w2=y1.innerHTML;
var j4=the_fpSpread.GetCell(y1);
var au2=j4.getElementsByTagName("SELECT");
if (au2!=null&&au2.length>0){
return au2[0].value;
}
var w3=the_fpSpread.GetCellEditorID(e5,j4);
var a9=null;
if (w3!=null&&typeof(w3)!="undefined"){
a9=the_fpSpread.GetCellEditor(e5,w3,true);
if (a9!=null){
var f1=a9.options.length;
for (var f2=0;f2<f1;f2++){
if (a9.options[f2].text==w2){
return a9.options[f2].value;
}
}
return null;
}
}
return w2;
}
function CheckBoxCellType_setFocus(h6){
var i6=h6.getElementsByTagName("INPUT");
if (i6!=null&&i6.length>0&&i6[0].type=="checkbox"){
i6[0].focus();
}
}
function CheckBoxCellType_getCheckBoxEditor(h6){
var i6=h6.getElementsByTagName("INPUT");
if (i6!=null&&i6.length>0&&i6[0].type=="checkbox"){
return i6[0];
}
return null;
}
function CheckBoxCellType_isValid(h6,x7){
if (x7==null)return "";
x7=the_fpSpread.Trim(x7);
if (x7=="")return "";
if (x7.toLowerCase()=="true"||x7.toLowerCase()=="false")
return "";
else 
return "invalid value";
}
function CheckBoxCellType_getValue(y1,e5){
return CheckBoxCellType_getEditorValue(y1,e5);
}
function CheckBoxCellType_getEditorValue(y1,e5){
var h6=the_fpSpread.GetCell(y1);
var i6=CheckBoxCellType_getCheckBoxEditor(h6);
if (i6!=null&&i6.checked){
return "true";
}
return "false";
}
function CheckBoxCellType_setValue(y1,x7){
var h6=the_fpSpread.GetCell(y1);
var i6=CheckBoxCellType_getCheckBoxEditor(h6);
if (i6!=null){
i6.checked=(x7!=null&&x7.toLowerCase()=="true");
return ;
}
}
function IntegerCellType_getValue(y1){
var g1=y1;
while (g1.firstChild!=null&&g1.firstChild.nodeName!="#text")g1=g1.firstChild;
if (g1.innerHTML=="&nbsp;")return "";
var w2=g1.innerHTML;
y1=the_fpSpread.GetCell(y1);
if (y1.getAttribute("FpRef")!=null)y1=document.getElementById(y1.getAttribute("FpRef"));
var au3=y1.getAttribute("groupchar");
if (au3==null)au3=",";
var w8=w2.length;
while (true){
w2=w2.replace(au3,"");
if (w2.length==w8)break ;
w8=w2.length;
}
if (w2.charAt(0)=='('&&w2.charAt(w2.length-1)==')'){
var au4=y1.getAttribute("negsign");
if (au4==null)au4="-";
w2=au4+w2.substring(1,w2.length-1);
}
w2=the_fpSpread.ReplaceAll(w2,"&nbsp;"," ");
return w2;
}
function IntegerCellType_isValid(h6,x7){
if (x7==null||x7.length==0)return "";
x7=the_fpSpread.Trim(x7)
if (x7.length==0)return "";
var as8=h6;
var au5=h6.getAttribute("FpRef");
if (au5!=null)as8=document.getElementById(au5);
var au4=as8.getAttribute("negsign");
var z3=as8.getAttribute("possign");
if (au4!=null)x7=x7.replace(au4,"-");
if (z3!=null)x7=x7.replace(z3,"+");
if (x7.charAt(x7.length-1)=="-")x7="-"+x7.substring(0,x7.length-1);
var x0=new RegExp("^\\s*[-\\+]?\\d+\\s*$");
var p7=(x7.match(x0)!=null);
if (p7)p7=!isNaN(x7);
if (p7){
var x4=as8.getAttribute("MinimumValue");
var j3=as8.getAttribute("MaximumValue");
var x3=parseInt(x7);
if (x4!=null){
x4=parseInt(x4);
p7=(!isNaN(x4)&&x3>=x4);
}
if (p7&&j3!=null){
j3=parseInt(j3);
p7=(!isNaN(j3)&&x3<=j3);
}
}
if (!p7){
if (as8.getAttribute("error")!=null)
return as8.getAttribute("error");
else 
return "Integer";
}
return "";
}
function DoubleCellType_isValid(h6,x7){
if (x7==null||x7.length==0)return "";
var as8=h6;
if (h6.getAttribute("FpRef")!=null)as8=document.getElementById(h6.getAttribute("FpRef"));
var au6=as8.getAttribute("decimalchar");
if (au6==null)au6=".";
var au3=as8.getAttribute("groupchar");
if (au3==null)au3=",";
x7=the_fpSpread.Trim(x7);
var p7=true;
p7=(x7.length==0||x7.charAt(0)!=au3);
if (p7){
var f1=x7.indexOf(au6);
if (f1>=0){
f1=x7.indexOf(au3,f1);
p7=(f1<0);
}
}
if (p7){
var w8=x7.length;
while (true){
x7=x7.replace(au3,"");
if (x7.length==w8)break ;
w8=x7.length;
}
}
if (x7.length==0){
p7=false;
}else if (p7){
var au4=as8.getAttribute("negsign");
var z3=as8.getAttribute("possign");
var x4=as8.getAttribute("MinimumValue");
var j3=as8.getAttribute("MaximumValue");
p7=the_fpSpread.IsDouble(x7,au6,au4,z3,x4,j3);
}
if (!p7){
if (as8.getAttribute("error")!=null)
return as8.getAttribute("error");
else 
return "Double";
}
return "";
}
function DoubleCellType_getValue(y1){
var g1=y1;
while (g1.firstChild!=null&&g1.firstChild.nodeName!="#text")g1=g1.firstChild;
if (g1.innerHTML=="&nbsp;")return "";
var w2=g1.innerHTML;
y1=the_fpSpread.GetCell(y1);
if (y1.getAttribute("FpRef")!=null)y1=document.getElementById(y1.getAttribute("FpRef"));
var au3=y1.getAttribute("groupchar");
if (au3==null)au3=",";
var w8=w2.length;
while (true){
w2=w2.replace(au3,"");
if (w2.length==w8)break ;
w8=w2.length;
}
if (w2.charAt(0)=='('&&w2.charAt(w2.length-1)==')'){
var au4=y1.getAttribute("negsign");
if (au4==null)au4="-";
w2=au4+w2.substring(1,w2.length-1);
}
w2=the_fpSpread.ReplaceAll(w2,"&nbsp;"," ");
return w2;
}
function CurrencyCellType_isValid(h6,x7){
if (x7!=null&&x7.length>0){
var as8=h6;
if (h6.getAttribute("FpRef")!=null)as8=document.getElementById(h6.getAttribute("FpRef"));
var w7=as8.getAttribute("currencychar");
if (w7==null)w7="$";
x7=x7.replace(w7,"");
var au3=as8.getAttribute("groupchar");
if (au3==null)au3=",";
var au6=as8.getAttribute("decimalchar");
if (au6==null)au6=".";
x7=the_fpSpread.Trim(x7);
var p7=true;
p7=(x7.length==0||x7.charAt(0)!=au3);
if (p7){
var f1=x7.indexOf(au6);
if (f1>=0){
f1=x7.indexOf(au3,f1);
p7=(f1<0);
}
}
if (p7){
var w8=x7.length;
while (true){
x7=x7.replace(au3,"");
if (x7.length==w8)break ;
w8=x7.length;
}
}
var p7=true;
if (x7.length==0){
p7=false;
}else if (p7){
var au4=as8.getAttribute("negsign");
var z3=as8.getAttribute("possign");
var x4=as8.getAttribute("MinimumValue");
var j3=as8.getAttribute("MaximumValue");
p7=the_fpSpread.IsDouble(x7,au6,au4,z3,x4,j3);
}
if (!p7){
if (as8.getAttribute("error")!=null)
return as8.getAttribute("error");
else 
return "Currency ("+w7+"100"+au6+"10) ";
}
}
return "";
}
function CurrencyCellType_getValue(y1){
var g1=y1;
while (g1.firstChild!=null&&g1.firstChild.nodeName!="#text")g1=g1.firstChild;
if (g1.innerHTML=="&nbsp;")return "";
var w2=g1.innerHTML;
y1=the_fpSpread.GetCell(y1);
if (y1.getAttribute("FpRef")!=null)y1=document.getElementById(y1.getAttribute("FpRef"));
var w7=y1.getAttribute("currencychar");
if (w7!=null){
var au7=document.createElement("SPAN");
au7.innerHTML=w7;
w7=au7.innerHTML;
}
if (w7==null)w7="$";
var au3=y1.getAttribute("groupchar");
if (au3==null)au3=",";
w2=w2.replace(w7,"");
var w8=w2.length;
while (true){
w2=w2.replace(au3,"");
if (w2.length==w8)break ;
w8=w2.length;
}
var au4=y1.getAttribute("negsign");
if (au4==null)au4="-";
if (w2.charAt(0)=='('&&w2.charAt(w2.length-1)==')'){
w2=au4+w2.substring(1,w2.length-1);
}
w2=the_fpSpread.ReplaceAll(w2,"&nbsp;"," ");
return w2;
}
function RegExpCellType_isValid(h6,x7){
if (x7==null||x7=="")
return "";
var as8=h6;
if (h6.getAttribute("FpRef")!=null)as8=document.getElementById(h6.getAttribute("FpRef"));
var au8=new RegExp(as8.getAttribute("fpexpression"));
var x1=x7.match(au8);
var o0=(x1!=null&&x1.length>0&&x7==x1[0]);
if (!o0){
if (as8.getAttribute("error")!=null)
return as8.getAttribute("error");
else 
return "invalid";
}
return "";
}
function PercentCellType_getValue(y1){
var g1=y1;
while (g1.firstChild!=null&&g1.firstChild.nodeName!="#text")g1=g1.firstChild;
if (g1.innerHTML=="&nbsp;")return "";
g1=g1.innerHTML;
var h6=the_fpSpread.GetCell(y1);
var as8=h6;
if (h6.getAttribute("FpRef")!=null)as8=document.getElementById(h6.getAttribute("FpRef"));
var au9=as8.getAttribute("percentchar");
if (au9==null)au9="%";
g1=g1.replace(au9,"");
var au3=as8.getAttribute("groupchar");
if (au3==null)au3=",";
var w8=g1.length;
while (true){
g1=g1.replace(au3,"");
if (g1.length==w8)break ;
w8=g1.length;
}
var au4=as8.getAttribute("negsign");
var z3=as8.getAttribute("possign");
g1=the_fpSpread.ReplaceAll(g1,"&nbsp;"," ");
var g6=g1;
if (au4!=null)
g1=g1.replace(au4,"-");
if (z3!=null)
g1=g1.replace(z3,"+");
var au6=as8.getAttribute("decimalchar");
if (au6!=null)
g1=g1.replace(au6,".");
if (!isNaN(g1))
return g6;
else 
return y1.innerHTML;
}
function PercentCellType_setValue(y1,x7){
var g1=y1;
while (g1.firstChild!=null&&g1.firstChild.nodeName!="#text")g1=g1.firstChild;
y1=g1;
if (x7!=null&&x7!=""){
var as8=the_fpSpread.GetCell(y1);
if (as8.getAttribute("FpRef")!=null)as8=document.getElementById(as8.getAttribute("FpRef"));
var au9=as8.getAttribute("percentchar");
if (au9==null)au9="%";
x7=x7.replace(" ","");
x7=x7.replace(au9,"");
y1.innerHTML=x7+au9;
}else {
y1.innerHTML="";
}
}
function PercentCellType_isValid(h6,x7){
if (x7!=null){
var as8=the_fpSpread.GetCell(h6);
if (as8.getAttribute("FpRef")!=null)as8=document.getElementById(as8.getAttribute("FpRef"));
var au9=as8.getAttribute("percentchar");
if (au9==null)au9="%";
x7=x7.replace(au9,"");
var au3=as8.getAttribute("groupchar");
if (au3==null)au3=",";
var w8=x7.length;
while (true){
x7=x7.replace(au3,"");
if (x7.length==w8)break ;
w8=x7.length;
}
var av0=x7;
var au4=as8.getAttribute("negsign");
var z3=as8.getAttribute("possign");
if (au4!=null)x7=x7.replace(au4,"-");
if (z3!=null)x7=x7.replace(z3,"+");
var au6=as8.getAttribute("decimalchar");
if (au6!=null)
x7=x7.replace(au6,".");
var p7=!isNaN(x7);
if (p7){
var av1=as8.getAttribute("MinimumValue");
var av2=as8.getAttribute("MaximumValue");
if (av1!=null||av2!=null){
var x4=parseFloat(av1);
var j3=parseFloat(av2);
p7=!isNaN(x4)&&!isNaN(j3);
if (p7){
if (au6==null)au6=".";
p7=the_fpSpread.IsDouble(av0,au6,au4,z3,x4*100,j3*100);
}
}
}
if (!p7){
if (as8.getAttribute("error")!=null)
return as8.getAttribute("error");
else 
return "Percent:(ex,10"+au9+")";
}
}
return "";
}
function ListBoxCellType_getValue(y1){
var g1=y1.getElementsByTagName("TABLE");
if (g1.length>0)
{
var h1=g1[0].rows;
for (var i3=0;i3<h1.length;i3++){
var h6=h1[i3].cells[0];
if (h6.selected=="true")
{
var av3=h6;
while (av3.firstChild!=null)av3=av3.firstChild;
var as8=av3.nodeValue;
return as8;
}
}
}
return "";
}
function ListBoxCellType_setValue(y1,x7){
var g1=y1.getElementsByTagName("TABLE");
if (g1.length>0)
{
g1[0].style.width=(y1.clientWidth-6)+"px";
var h1=g1[0].rows;
for (var i3=0;i3<h1.length;i3++){
var h6=h1[i3].cells[0];
var av3=h6;
while (av3.firstChild!=null)av3=av3.firstChild;
var as8=av3.nodeValue;
if (as8==x7){
h6.selected="true";
if (g1[0].parentNode.getAttribute("selectedBackColor")!="undefined")
h6.style.backgroundColor=g1[0].parentNode.getAttribute("selectedBackColor");
if (g1[0].parentNode.getAttribute("selectedForeColor")!="undefined")
h6.style.color=g1[0].parentNode.getAttribute("selectedForeColor");
}else {
h6.style.backgroundColor="";
h6.style.color="";
h6.selected="";
h6.bgColor="";
}
}
}
}
function TextCellType_getValue(y1){
var h6=the_fpSpread.GetCell(y1,true);
if (h6!=null&&h6.getAttribute("password")!=null){
if (h6!=null&&h6.getAttribute("value")!=null)
return h6.getAttribute("value");
else 
return "";
}else {
var g1=y1;
while (g1.firstChild!=null&&g1.firstChild.nodeName!="#text")g1=g1.firstChild;
if (g1.innerHTML=="&nbsp;")return "";
if (g1!=null){
if (g1.tagName=="INPUT")
g1=g1.value;
else 
g1=the_fpSpread.HTMLDecode(g1.innerHTML);
}
g1=the_fpSpread.ReplaceAll(g1,"<br>","\n");
return g1;
}
}
function TextCellType_setValue(y1,x7){
var h6=the_fpSpread.GetCell(y1,true);
if (h6==null)return ;
var g1=y1;
while (g1.firstChild!=null&&g1.firstChild.nodeName!="#text")g1=g1.firstChild;
y1=g1;
if (h6.getAttribute("password")!=null){
if (x7!=null&&x7!=""){
x7=x7.replace(" ","");
y1.innerHTML="";
for (var f2=0;f2<x7.length;f2++)
y1.innerHTML+="*";
h6.setAttribute("value",x7);
}else {
y1.innerHTML="";
h6.setAttribute("value","");
}
}else {
if (x7!=null)x7=the_fpSpread.HTMLEncode(x7);
x7=the_fpSpread.ReplaceAll(x7,"\n","<br>");
y1.innerHTML=x7;
}
}
function TextCellType_setEditorValue(g1,x7){
if (x7!=null)x7=the_fpSpread.HTMLDecode(x7);
g1.value=x7;
}
function RadioButtonListCellType_getValue(y1){
var h6=the_fpSpread.GetCell(y1,true);
if (h6==null)return ;
var av4=h6.getElementsByTagName("INPUT");
for (var f2=0;f2<av4.length;f2++){
if (av4[f2].tagName=="INPUT"&&av4[f2].checked){
return av4[f2].value;
}
}
return "";
}
function RadioButtonListCellType_getEditorValue(y1){
return RadioButtonListCellType_getValue(y1);
}
function RadioButtonListCellType_setValue(y1,x7){
var h6=the_fpSpread.GetCell(y1,true);
if (h6==null)return ;
if (x7!=null)x7=the_fpSpread.Trim(x7);
var av4=h6.getElementsByTagName("INPUT");
for (var f2=0;f2<av4.length;f2++){
if (av4[f2].tagName=="INPUT"&&x7==the_fpSpread.Trim(av4[f2].value)){
av4[f2].checked=true;
break ;
}else {
if (av4[f2].checked)av4[f2].checked=false;
}
}
}
function RadioButtonListCellType_setFocus(y1){
var h6=the_fpSpread.GetCell(y1,true);
if (h6==null)return ;
var i6=h6.getElementsByTagName("INPUT");
if (i6==null)return ;
for (var f2=0;f2<i6.length;f2++){
if (i6[f2].type=="radio"&&i6[f2].checked){
i6[f2].focus();
return ;
}
}
}
function MultiColumnComboBoxCellType_setValue(y1,x7,e5){
var h6=the_fpSpread.GetCell(y1,true);
if (h6==null)return ;
var au2=h6.getElementsByTagName("DIV");
if (au2!=null&&au2.length>0){
var av5=h6.getElementsByTagName("input");
if (av5!=null&&av5.length>0)
av5[0].value=x7;
return ;
}
if (x7!=null&&x7!="")
y1.textContent=x7;
else 
y1.innerHTML="&nbsp;";
}
function MultiColumnComboBoxCellType_getValue(y1,e5){
var w2=y1.textContent;
var j4=the_fpSpread.GetCell(y1,true);
var au2=j4.getElementsByTagName("DIV");
if (au2!=null&&au2.length>0){
var av5=j4.getElementsByTagName("input");
if (av5!=null&&av5.length>0)
return av5[0].value;
return ;
}
if (!e5)return null;
var w3=the_fpSpread.GetCellEditorID(e5,j4);
var a9=null;
if (w3!=null&&typeof(w3)!="undefined"){
a9=the_fpSpread.GetCellEditor(e5,w3,true);
if (a9!=null){
var av6=a9.getAttribute("MccbId");
if (av6){
FarPoint.System.WebControl.MultiColumnComboBoxCellType.CheckInit(av6);
var aj4=eval(av6+"_Obj");
if (aj4!=null&&aj4.SetText!=null){
aj4.SetText(w2);
return w2;
}
}
}
return null;
}
return w2;
}
function MultiColumnComboBoxCellType_getEditorValue(y1,e5){
var h6=the_fpSpread.GetCell(y1,true);
if (h6==null)return ;
var av7=h6.getElementsByTagName("INPUT");
if (av7!=null&&av7.length>0){
var g1=av7[0];
return g1.value;
}
return null;
}
function MultiColumnComboBoxCellType_setFocus(y1){
var h6=the_fpSpread.GetCell(y1);
var e5=the_fpSpread.GetSpread(h6);
if (h6==null)return ;
var av8=h6.getElementsByTagName("DIV");
if (av8!=null&&av8.length>0){
var av6=av8[0].getAttribute("MccbId");
if (av6){
var aj4=eval(av6+"_Obj");
if (aj4!=null&&typeof(aj4.FocusForEdit)!="undefined"){
aj4.FocusForEdit();
}
}
}
}
function MultiColumnComboBoxCellType_setEditorValue(y1,editorValue,e5){
var h6=the_fpSpread.GetCell(y1,true);
if (h6==null)return ;
var w3=the_fpSpread.GetCellEditorID(e5,h6);
var a9=null;
if (w3!=null&&typeof(w3)!="undefined"){
a9=the_fpSpread.GetCellEditor(e5,w3,true);
if (a9!=null){
var av6=a9.getAttribute("MccbId");
if (av6){
FarPoint.System.WebControl.MultiColumnComboBoxCellType.CheckInit(av6);
var aj4=eval(av6+"_Obj");
if (aj4!=null&&aj4.SetText!=null){
aj4.SetText(editorValue);
}
}
}
}
}
function TagCloudCellType_getValue(y1,e5){
var w2=y1.textContent;
if (typeof(w2)!="undefined"&&w2!=null&&w2.length>0)
{
w2=the_fpSpread.ReplaceAll(w2,"<br>","");
w2=the_fpSpread.ReplaceAll(w2,"\n","");
w2=the_fpSpread.ReplaceAll(w2,"\t","");
var t3=new RegExp("\xA0","g");
w2=w2.replace(t3,String.fromCharCode(32));
w2=the_fpSpread.HTMLDecode(w2);
}
else 
w2="";
return w2;
}
