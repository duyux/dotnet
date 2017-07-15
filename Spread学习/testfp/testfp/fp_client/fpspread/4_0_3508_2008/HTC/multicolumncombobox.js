//
//	Copyright?2005. FarPoint Technologies.	All rights reserved.
//

eval("var FarPoint={};");
FarPoint.System={};
FarPoint.System.CheckBrowserByName=function (browsername,version){
var e4=window.navigator.userAgent;
var e5=false;
var e6=(""+browsername).toLowerCase();
if ((e6.indexOf("ms")>=0)||(e6.indexOf("msie")>=0)||(e6.indexOf("ie")>=0))
e5=(e4.indexOf("MSIE")>=1);
else if ((e6.indexOf("safari")>=0)||(e6.indexOf("apple")>=0))
e5=(e4.indexOf("Safari")>=1);
else if ((e6.indexOf("ff")>=0)||(e6.indexOf("firefox")>=0))
e5=(e4.indexOf("Firefox")>=1);
return e5;
};
FarPoint.System.IsChild=function (parent,child){
if (child==null||parent==null)return false;
var e7=child.parentNode;
while (e7!=null){
if (e7==parent)return true;
e7=e7.parentNode;
}
return false;
};
FarPoint.System.FindElementById=function (ctl,id,ATTRI_ID){
if (ctl==null)return null;
var e8=ctl.getAttribute(ATTRI_ID);
if (e8==null)return null;
return document.getElementById(e8+id);
};
FarPoint.System.GetEvent=function (e){
if (e!=null)return e;
return window.event;
};
FarPoint.System.GetTarget=function (e){
e=FarPoint.System.GetEvent(e);
if (e.target==document&&e.currentTarget!=null)return e.currentTarget;
if (e.target!=null)return e.target;
return e.srcElement;
};
FarPoint.System.CancelDefault=function (e){
if (e.preventDefault!=null){
e.preventDefault();
e.stopPropagation();
}else {
e.cancelBubble=true;
e.returnValue=false;
}
return false;
};
FarPoint.System.GetMouseCoords=function (ev){
if (ev.pageX||ev.pageY){
return {x:ev.pageX,y:ev.pageY};
}
return {
x:ev.clientX+document.body.scrollLeft-document.body.clientLeft,
y:ev.clientY+document.body.scrollTop-document.body.clientTop
};
};
FarPoint.System.GetOffsetTop=function (ctl){
var e9=0;
while (ctl){
if ((ctl.tagName!="HTML")&&(typeof(ctl.tagName)!="undefined"))
e9+=typeof(ctl.offsetTop)!="undefined"?ctl.offsetTop:0-typeof(ctl.scrollTop)!="undefined"?ctl.scrollTop:0;
if (typeof(ctl.clientTop)=="number")e9+=ctl.clientTop;
ctl=ctl.offsetParent;
}
return parseInt(e9);
};
FarPoint.System.GetOffsetLeft=function (ctl){
var f0=0;
while (ctl){
if ((ctl.tagName!="HTML")&&(typeof(ctl.tagName)!="undefined"))
f0+=typeof(ctl.offsetLeft)!="undefined"?ctl.offsetLeft:0-typeof(ctl.scrollLeft)!="undefined"?ctl.scrollLeft:0;
if (typeof(ctl.clientLeft)=="number")f0+=ctl.clientLeft;
ctl=ctl.offsetParent;
}
return parseInt(f0);
};
FarPoint.System.AttachEvent=function (target,event,handler,useCapture){
if (target==null||event==null||handler==null)return ;
if (target.addEventListener!=null){
target.addEventListener(event,handler,useCapture);
}else if (target.attachEvent!=null){
target.attachEvent("on"+event,handler);
}
};
FarPoint.System.DetachEvent=function (target,event,handler,useCapture){
if (target==null||event==null||handler==null)return ;
if (target.removeEventListener!=null){
target.removeEventListener(event,handler,useCapture);
}else if (target.detachEvent!=null){
target.detachEvent("on"+event,handler);
}
};
FarPoint.System.Track=function (msg){
if (!FarPoint.System.Config.Consts.$FLAG_ISDEBUG)return ;
if (document.getElementById("txtOutput")==null){
var f1=document.createElement("textarea");
f1.id="txtOutput";
f1.style.width="100%";
f1.style.height="100px";
if (f1.style.bottom!=null&&f1.style.right!=null){
f1.style.bottom="0px";
f1.style.right="0px";
}
f1.style.color="#00ff00";
f1.style.position="absolute";
f1.style.backgroundColor="black";
if (FarPoint.System.CheckBrowserByName("IE")){
window.onload=function (){
if (document.all&&document.body.readyState=="complete"){
document.body.appendChild(f1);
}
};
}else {
document.body.appendChild(f1);
}
}
var f2=document.getElementById("txtOutput");
if (f2!=null){
f2.value="&nbsp;&nbsp;"+msg+"\r\n"+f2.value;
}
};
FarPoint.System.Config={};
FarPoint.System.Config.Consts={};
var f3=FarPoint.System.Config.Consts;
f3.$FLAG_ISDEBUG=false;
f3.$LEFT=37;
f3.$RIGHT=39;
f3.$UP=38;
f3.$DOWN=40;
f3.$ENTER=13;
f3.$CANCEL=27;
f3.$PageUp=33;
f3.$PageDown=34;
f3.$Home=36;
f3.$End=35;
f3.$Tab=9;
FarPoint.System.WebControl={};
FarPoint.System.WebControl.MultiColumnComboBoxCellTypeUtilitis={};
var f4=FarPoint.System.WebControl.MultiColumnComboBoxCellTypeUtilitis;
var f5=f4.Consts={
$ATTRI_MULTICOMBO_PART_TYPE:"MccbPartType",
$ATTRI_LIST_ALIGNMENT:"MccbListAlignment",
$ATTRI_LIST_OFFSET:"MccbListOffset",
$ATTRI_LIST_WIDTH:"MccbListWidth",
$ATTRI_LIST_HEIGHT:"MccbListHEIGHT",
$ATTRI_COLUMN_EDIT:"MccbColumnEdit",
$ATTRI_COLUMN_DATA:"MccbColumnData",
$ATTRI_ID:"MccbId",
$ATTRI_LIST_MIN_HEIGHT:"MccbListMinHeight",
$ATTRI_LIST_MIN_WIDTH:"MccbListMinWidth",
$TYPE_DROPDOWNBUTTON:"DropDownButton",
$ID_BUTTON_OUTSIDE:"_DropDownButtonOutside",
$ID_BUTTON_INSIDE:"_DropDownButtonInside",
$ID_INPUT:"_Input",
$ID_CONTAINER:"_Container",
$ID_CONTAINER_DIV:"_ContainerDiv",
$ID_SPREAD:"_FpSpread",
$ID_STATUS_RESIZE:"_ResizeButton",
$OBJECT_SUFFIX:"_Obj"
};
f4.CloseAll=function (){
var f6=document.body.lastChild;
if (f6!=null&&f6.tagName!=null&&f6.tagName=="DIV"){
if (f6.id!=null&&f6.close&&f6.id.match(new RegExp(f5.$ID_CONTAINER_DIV+"$"))){
f6.close();
}
}
};
FarPoint.System.WebControl.MultiColumnComboBoxCellType=function (mc){
if (mc==null)return null;
var f7=true;
var f8=null;
var f9=false;
var g0=false;
var g1=-1;
var g2=0;
var g3=false;
var g4=0;
var g5=0;
var g6=50;
var g7=200;
var g8=false;
var g9=this;
this.Init=function (){
if (f7){
this.InitSpread();
this.setController();
var h0=0;
while (h0<12){
if (h0==0||h0==1||h0==3){
h0++;
continue ;
}
if (f8[h0]!=null&&f8[h0].event=="SelectionChanged"){
if (FarPoint.System.CheckBrowserByName("IE")){
this.getFpSpread().onSelectionChanged=f8[h0].handler;
h0++;
continue ;
}
}
this.SetHandler(f8,h0,0);
h0++;
}
var h1=this.getControl();
var h2=FarPoint.System.FindElementById(h1,f5.$ID_BUTTON_INSIDE,f5.$ATTRI_ID);
if (h1!=null&&h2!=null){
if (h1.offsetHeight-5>0)
h2.style.height=h1.offsetHeight-5;
}
this.setListWidth(parseInt(this.getControl().getAttribute(f5.$ATTRI_LIST_WIDTH)));
this.setListHeight(parseInt(this.getControl().getAttribute(f5.$ATTRI_LIST_HEIGHT)));
h1.Init=true;
f7=false;
}
}
this.Dispose=function (){
var h3=this.getController();
if (!h3)return ;
var h0=0;
while (f8[h0]!=null){
if (f8[h0].event=="SelectionChanged"){
if (FarPoint.System.CheckBrowserByName("IE")){
this.getFpSpread().onSelectionChanged=null;
h0++;
continue ;
}
}
this.SetHandler(f8,h0,1);
h0++;
}
}
this.getDragOffsetX=function (){
return g4;
}
this.setDragOffsetX=function (value){
g4=value;
}
this.getDragOffsetY=function (){
return g5;
}
this.setDragOffsetY=function (value){
g5=value;
}
this.getStatusBarHeight=function (){
return 13;
}
this.getIsDrag=function (){
return g3;
}
this.setIsDrag=function (value){
var h4=12;
g3=value;
if (g3){
this.SetHandler(f8,h4,0);
}else {
this.SetHandler(f8,h4,1);
}
}
this.getHostSpread=function (){
var h5=this.getFpSpread();
if (h5==null)return null;
var h6=FarPoint.System.CheckBrowserByName("IE")?h5.hostspread:h5.getAttribute("hostspread");
return document.getElementById(h6);
}
this.getControl=function (){
return mc;
}
this.getFpSpread=function (){
var h7=this.getContainer();
if (h7==null)return null;
return h7.getElementsByTagName("div")[0];
}
this.getContainer=function (){
var h1=this.getControl();
if (h1==null)return null;
return FarPoint.System.FindElementById(h1,f5.$ID_CONTAINER,f5.$ATTRI_ID);
}
this.getContainerDiv=function (){
var h1=this.getControl();
if (h1==null)return null;
return FarPoint.System.FindElementById(h1,f5.$ID_CONTAINER_DIV,f5.$ATTRI_ID);
}
this.getInputControl=function (){
var h1=this.getControl();
if (h1==null)return null;
return FarPoint.System.FindElementById(h1,f5.$ID_INPUT,f5.$ATTRI_ID);
}
this.getResizeButton=function (){
var h1=this.getControl();
if (h1==null)return null;
return FarPoint.System.FindElementById(h1,f5.$ID_STATUS_RESIZE,f5.$ATTRI_ID);
}
this.getController=function (){
return f8;
}
this.setController=function (){
if (f8==null){
f8={
1:{target:document,event:"mousedown",handler:function (event){g9.MouseDownOutside(event)},useCapture:false},
3:{target:document,event:"mouseup",handler:function (event){g9.MouseUpOutside(event)},useCapture:false},
12:{target:document,event:"mousemove",handler:function (event){g9.MouseMove(event)},useCapture:false},
4:{target:this.getControl(),event:"mousedown",handler:function (event){g9.MouseDown(event)},useCapture:false},
7:{target:this.getInputControl(),event:"keydown",handler:function (event){g9.OnInputKeyDown(event)},useCapture:FarPoint.System.CheckBrowserByName("IE")?false:true},
6:{target:this.getContainer(),event:"mousedown",handler:function (event){g9.CancelEvent(event)},useCapture:false},
9:{target:this.getFpSpread(),event:"SelectionChanged",handler:function (event){g9.OnSpreadSelectionChanged(event)},useCapture:false},
8:{target:this.getResizeButton(),event:"mousedown",handler:function (event){g9.ResizeButtonMouseDown(event)},useCapture:false}
};
if (FarPoint.System.CheckBrowserByName("IE")?typeof(this.getFpSpread().EnableClientScript)=="undefined":this.getFpSpread().getAttribute("EnableClientScript")==null){
f8[13]={target:FarPoint.System.CheckBrowserByName("IE")?this.getHostSpread():the_fpSpread.GetViewport(this.getHostSpread()).parentNode,event:"scroll",handler:function (event){g9.MccbctScroll(event)},useCapture:false};
}
}
}
this.getIsDrop=function (){
return f9;
}
this.setIsDrop=function (value){
f9=value;
}
this.getIsDroping=function (){
return g0;
}
this.setIsDroping=function (value){
g0=value;
}
this.getListAlignment=function (){
try {
var h0=this.getControl().getAttribute(f5.$ATTRI_LIST_ALIGNMENT);
return parseInt(h0);
}catch (exception ){
return 0;
}
}
this.getListOffset=function (){
try {
var h0=this.getControl().getAttribute(f5.$ATTRI_LIST_OFFSET);
return parseInt(h0);
}catch (exception ){
return 0;
}
}
this.getListWidth=function (){
return g6;
}
this.setListWidth=function (value){
if ((value<this.getListMinWidth())&&(value!=-1))
g6=this.getListMinWidth();
else {
if (!FarPoint.System.CheckBrowserByName("IE"))
if (value>2000)
value=2000;
g6=value;
}
}
this.getListHeight=function (){
return g7;
}
this.setListHeight=function (value){
if (value<this.getListMinHeight())
g7=this.getListMinHeight();
else 
g7=value;
}
this.getListMinWidth=function (){
try {
var h0=this.getControl().getAttribute(f5.$ATTRI_LIST_MIN_WIDTH);
return Math.min(Math.abs(parseInt(h0)),32767);
}catch (exception ){
return 50;
}
}
this.getListMinHeight=function (){
try {
var h0=this.getControl().getAttribute(f5.$ATTRI_LIST_MIN_HEIGHT);
return Math.min(Math.abs(parseInt(h0)),32767);
}catch (exception ){
return 50;
}
}
this.getEditColumnIndex=function (){
try {
var h0=this.getControl().getAttribute(f5.$ATTRI_COLUMN_EDIT);
return parseInt(h0);
}catch (exception ){
return 0;
}
}
this.setSelectedIndex=function (value){
g1=value;
}
this.getSelectedIndex=function (){
if (g1!=-1){
var h8=this.getFpSpread();
var h9=FarPoint.System.CheckBrowserByName("IE")?parseInt(h8.ActiveRow):parseInt(h8.GetActiveRow());
if (h8){
if (h9>=0){
this.setSelectedIndex(h9);
}
}
}
return g1;
}
this.setActiveColumnIndex=function (value){
g2=value;
}
this.getActiveColumnIndex=function (){
return g2;
}
this.getDataColumnIndex=function (){
try {
var h0=this.getControl().getAttribute(f5.$ATTRI_COLUMN_DATA);
return parseInt(h0);
}catch (exception ){
return 0;
}
}
this.FocusForEdit=function (){
var h1=this.getControl();
if (h1==null)return ;
if (h1.parentNode==null||typeof(h1.parentNode.tagName)=="undefined")return ;
if (h1.parentNode.tagName!="TD")return ;
if (h1.parentNode.getAttribute("FpCellType")!="MultiColumnComboBoxCellType")return ;
var i0=this.getInputControl();
if (i0!=null){
try {
i0.focus();
i0.select();
}catch (exception ){}
this.SetHandler(f8,7,1);
this.SetHandler(f8,7,0);
}
}
this.LockFocus=function (event){
var i1=this.getInputControl();
if (i1!=null&&typeof(i1.focus)!="undefined")
if (i1!=null){
try {
i1.focus();
i1.select();
}catch (exception ){}
}
}
this.MouseDown=function (event){
if (!FarPoint.System.CheckBrowserByName("IE")&&this.getControl().getAttribute("disabled")=="disabled")return FarPoint.System.CancelDefault(event);
if (!this.getIsDrop()&&event.button!=(FarPoint.System.CheckBrowserByName("IE")?1:0))return ;
var i2=FarPoint.System.GetTarget(event);
if (i2==null||i2.getAttribute(f5.$ATTRI_MULTICOMBO_PART_TYPE)!=f5.$TYPE_DROPDOWNBUTTON)return false;
this.setIsDroping(true);
var i3=this;
setTimeout(function (){i3.DropDown();},0);
}
this.DropDown=function (){
this.ShowHideContainer(!this.getIsDrop());
}
this.OnInputKeyDown=function (event){
if (event.altKey&&event.keyCode==f3.$DOWN){
this.ShowHideContainer(!this.getIsDrop());
FarPoint.System.CancelDefault(event);
return false;
}
switch (event.keyCode){
case f3.$UP:
if (this.getIsDrop()){
this.ChangeSelectedIndex(-1);
var i4=this.getFpSpread();
if (!FarPoint.System.CheckBrowserByName("IE")){
the_fpSpread.ScrollTo(i4,i4.GetActiveRow(),this.getActiveColumnIndex());
}else {
i4.ScrollTo(i4.ActiveRow,this.getActiveColumnIndex());
}
if (FarPoint.System.CheckBrowserByName("IE"))
FarPoint.System.CancelDefault(event);
}
if (!FarPoint.System.CheckBrowserByName("IE")){
FarPoint.System.CancelDefault(event);
}
break ;
case f3.$LEFT:
if (this.getIsDrop()){
this.ChangedActiveColumnIndex(true);
FarPoint.System.CancelDefault(event);
}
break ;
case f3.$DOWN:
if (this.getIsDrop()){
this.ChangeSelectedIndex(1);
var i4=this.getFpSpread();
if (!FarPoint.System.CheckBrowserByName("IE")){
the_fpSpread.ScrollTo(i4,i4.GetActiveRow(),this.getActiveColumnIndex());
}else {
i4.ScrollTo(i4.ActiveRow,this.getActiveColumnIndex());
}
if (FarPoint.System.CheckBrowserByName("IE"))
FarPoint.System.CancelDefault(event);
}
if (!FarPoint.System.CheckBrowserByName("IE")){
FarPoint.System.CancelDefault(event);
}
break ;
case f3.$RIGHT:
if (this.getIsDrop()){
this.ChangedActiveColumnIndex(false);
FarPoint.System.CancelDefault(event);
}
break ;
case f3.$ENTER:
if (this.getIsDrop()){
this.ShowHideContainer(false);
FarPoint.System.CancelDefault(event);
}
if (!FarPoint.System.CheckBrowserByName("safari")&&this.getFpSpread().getAttribute("EnableClientScript")=="0"){
return FarPoint.System.CancelDefault(event);
}
break ;
case f3.$CANCEL:
if (this.getIsDrop()){
this.ShowHideContainer(false);
}
FarPoint.System.CancelDefault(event);
break ;
case f3.$PageUp:
if (this.getIsDrop()){
this.ChangeSelectedIndex(null,1);
var i4=this.getFpSpread();
if (!FarPoint.System.CheckBrowserByName("IE")){
the_fpSpread.ScrollTo(i4,i4.GetActiveRow(),this.getActiveColumnIndex());
}else {
i4.ScrollTo(i4.ActiveRow,this.getActiveColumnIndex());
}
if (FarPoint.System.CheckBrowserByName("IE"))
FarPoint.System.CancelDefault(event);
}
if (!FarPoint.System.CheckBrowserByName("IE")){
FarPoint.System.CancelDefault(event);
}
break ;
case f3.$PageDown:
if (this.getIsDrop()){
this.ChangeSelectedIndex(null,2);
var i4=this.getFpSpread();
if (!FarPoint.System.CheckBrowserByName("IE")){
the_fpSpread.ScrollTo(i4,i4.GetActiveRow(),this.getActiveColumnIndex());
}else {
i4.ScrollTo(i4.ActiveRow,this.getActiveColumnIndex());
}
if (FarPoint.System.CheckBrowserByName("IE"))
FarPoint.System.CancelDefault(event);
}
if (!FarPoint.System.CheckBrowserByName("IE")){
FarPoint.System.CancelDefault(event);
}
break ;
case f3.$Home:
if (this.getIsDrop()){
this.ChangeSelectedIndex(null,3);
var i4=this.getFpSpread();
if (!FarPoint.System.CheckBrowserByName("IE")){
the_fpSpread.ScrollTo(i4,i4.GetActiveRow(),this.getActiveColumnIndex());
}else {
i4.ScrollTo(i4.ActiveRow,this.getActiveColumnIndex());
}
if (FarPoint.System.CheckBrowserByName("IE"))
FarPoint.System.CancelDefault(event);
}
if (!FarPoint.System.CheckBrowserByName("IE")){
FarPoint.System.CancelDefault(event);
}
break ;
case f3.$End:
if (this.getIsDrop()){
this.ChangeSelectedIndex(null,4);
var i4=this.getFpSpread();
if (!FarPoint.System.CheckBrowserByName("IE")){
the_fpSpread.ScrollTo(i4,i4.GetActiveRow(),this.getActiveColumnIndex());
}else {
i4.ScrollTo(i4.ActiveRow,this.getActiveColumnIndex());
}
if (FarPoint.System.CheckBrowserByName("IE"))
FarPoint.System.CancelDefault(event);
}
if (!FarPoint.System.CheckBrowserByName("IE")){
FarPoint.System.CancelDefault(event);
}
break ;
case f3.$Tab:
if (this.getIsDrop()){
this.ShowHideContainer(false);
if (!FarPoint.System.CheckBrowserByName("IE")){
FarPoint.System.CancelDefault(event);
if (FarPoint.System.CheckBrowserByName("FF")){
var i5=this.getControl().getElementsByTagName("input")[1];
if (i5!=null){
var i6=document.createEvent('KeyboardEvent');
i6.initKeyEvent('keydown',true,true,null,null,null,null,null,9,null);
setTimeout(function (){i5.dispatchEvent(i6)},0);
}
}
}
}
break ;
}
}
this.OnSpreadSelectionChanged=function (event){
var h8=this.getFpSpread();
if (h8==null)return ;
if (!FarPoint.System.CheckBrowserByName("IE")){
this.setSelectedIndex(h8.GetActiveRow());
}else {
this.setSelectedIndex(h8.ActiveRow);
}
var i0=this.getInputControl();
if (i0==null)return ;
if (this.getSelectedIndex()>=0&&this.getEditColumnIndex()>=0){
i0.value=h8.GetValue(this.getSelectedIndex(),this.getEditColumnIndex());
i0.select();
}
FarPoint.System.GetEvent(event).cancelBubble=true;
}
this.CancelEvent=function (event){
if (this.getIsDrop()){
this.LockFocus(event);
var i7=this;
setTimeout(function (){i7.LockFocus(event);},0);
}
return FarPoint.System.CancelDefault(event);
}
this.MouseDownOutside=function (event){
if (this.getIsDrag())
this.setIsDrag(false);
var i8=this.getContainerDiv();
var i9=this.getControl();
var i4=this.getFpSpread();
var j0=document.getElementById(i4.id+"_viewport");
var i2=FarPoint.System.GetTarget(event);
if (!FarPoint.System.IsChild(i8,i2)&&!FarPoint.System.IsChild(i9,i2)){
this.setIsDroping(false);
if (this.getIsDrop())
this.ShowHideContainer(false);
}
var i7=this;
setTimeout(function (){i7.LockFocus(event);},0);
}
this.MouseUpOutside=function (event){
var i2=FarPoint.System.GetTarget(event);
var i9=this.getControl();
if (this.getIsDroping()&&FarPoint.System.IsChild(i9,i2)){
this.setIsDroping(false);
return ;
}
if (this.getIsDrop()==false)return ;
if (this.getIsDrag()){
this.setIsDrag(false);
return ;
}
var i8=this.getContainerDiv();
var i4=this.getFpSpread();
var j0=document.getElementById(i4.id+"_viewport");
if (FarPoint.System.IsChild(j0,i2)||!FarPoint.System.IsChild(i8,i2)){
this.ShowHideContainer(false);
}
var i7=this;
setTimeout(function (){i7.LockFocus(event);},0);
}
this.ResizeButtonMouseDown=function (event){
this.LockFocus(event);
if (event.button!=(FarPoint.System.CheckBrowserByName("IE")?1:0))return ;
var h7=this.getContainer();
if (h7==null)return ;
var j1=FarPoint.System.GetMouseCoords(event);
this.setDragOffsetX(parseInt(h7.offsetLeft+h7.offsetWidth)-j1.x);
this.setDragOffsetY(parseInt(h7.offsetTop+h7.offsetHeight)-j1.y);
this.setIsDrag(true);
if (event.preventDefault)event.preventDefault();
event.returnValue=false;
event.cancelBubble=true;
return false;
}
this.MouseMove=function (event){
if (!this.getIsDrag())return ;
var h7=this.getContainer();
if (h7==null)return ;
var j2=this.getContainerDiv();
if (j2==null)return ;
var j1=FarPoint.System.GetMouseCoords(event);
var j3=j1.x-parseInt(h7.offsetLeft)+this.getDragOffsetX();
var j4=j1.y-parseInt(h7.offsetTop)+this.getDragOffsetY()-5;
if (j3>this.getListMinWidth()&&Math.abs(j3-h7.offsetWidth)>5){
j2.style.width=j3+"px";
h7.style.width=j3+"px";
this.setListWidth(j3+5);
}
if (j4>this.getListMinHeight()&&Math.abs(j4-h7.offsetHeight)>20){
var i4=this.getFpSpread();
if (i4!=null)
i4.style.height=""+(j4-this.getStatusBarHeight())+"px";
j2.style.height=(j4+5)+"px";
h7.style.height=j4+"px";
this.setListHeight(j4);
}
if (!FarPoint.System.CheckBrowserByName("IE")){
var j5=this.getFpSpread();
the_fpSpread.SizeSpread(j5)
the_fpSpread.Refresh(j5);
}
event.cancelBubble=true;
return false;
}
this.MccbctScroll=function (event){
var h1=this.getControl();
if (h1==null)return ;
var h7=this.getContainer();
if (h7==null)return ;
var j2=this.getContainerDiv();
if (j2==null)return ;
if (FarPoint.System.CheckBrowserByName("safari")&&h1.offsetHeight==0){
j2.style.top=(FarPoint.System.GetOffsetTop(h1)+25)-(this.GetSpreadClientData(this.getHostSpread(),1))+"px";
}else {
var j6=null;
if (FarPoint.System.CheckBrowserByName("IE")?typeof(this.getFpSpread().EnableClientScript)=="undefined":this.getFpSpread().getAttribute("EnableClientScript")==null)
j6=FarPoint.System.CheckBrowserByName("IE")?document.getElementById(this.getHostSpread().id+"_view"):document.getElementById(this.getHostSpread().id+"_viewport").parentNode;
var j7=FarPoint.System.IsChild(j6,h1)?(this.GetSpreadClientData(this.getHostSpread(),1)):0;
j2.style.top=(FarPoint.System.GetOffsetTop(h1)+h1.offsetHeight+2)-j7+"px";
}
}
this.GetAdjustorForScroll=function (){
var j8=0;var j9=0;
var e8=new String(this.getControl().getAttribute(f5.$ATTRI_ID));
j8=parseInt(e8.split(new RegExp("_"))[1]);
j9=parseInt(e8.split(new RegExp("_"))[2]);
var k0=e8.split(new RegExp("_"))[3];
var k1=this.getHostSpread();
var k2=FarPoint.System.CheckBrowserByName("IE");
var k3=FarPoint.System.CheckBrowserByName("safari");
var k4={left:0,top:0};
if (this.getFpSpread().getAttribute("EnableClientScript")=="0")
return k4;
if (k3){
if (k0!="sc"&&k0!="rh")
k4.left=this.GetSpreadClientData(k1,0);
if (k0!="ch"&&k0!="cf"&&k0!="sc")
k4.top=this.GetSpreadClientData(k1,1);
return k4;
}
var k5=k2?k1.getViewport():the_fpSpread.GetViewport(k1);
var k6=k2?k1.getViewport0():the_fpSpread.GetViewport0(k1);
var k7=k2?k1.getViewport1():the_fpSpread.GetViewport1(k1);
var k8=k2?k1.getViewport2():the_fpSpread.GetViewport2(k1);
var k9=0;var l0=0;
k9=k2?(k7!=null?k7.rows.length:0):k1.frzRows;
if (k2){
if (k6!=null){
var l1=k6.getElementsByTagName("COLGROUP");
if (l1!=null&&l1.length>0)
l0=l1[0].childNodes.length;
}else if (k8!=null){
var l1=k8.getElementsByTagName("COLGROUP");
if (l1!=null&&l1.length>0)
l0=l1[0].childNodes.length;
}
}else {
l0=k1.frzCols;
}
if ((k0!="ch"&&k0!="cf"&&k0!="sc")&&((k9>0&&(j8+1)>k9)||k9==0))
k4.top=this.GetSpreadClientData(k1,1);
if ((k0!="sc"&&k0!="rh")&&((l0>0&&(j9+1)>l0)||l0==0))
k4.left=this.GetSpreadClientData(k1,0);
return k4;
}
this.InitSpread=function (){
if (!FarPoint.System.CheckBrowserByName("IE")&&typeof(the_fpSpread)!="undefined"){
var i4=this.getFpSpread();
the_fpSpread.Init(i4);
the_fpSpread.SizeAll(i4);
i4.dispose=function (){
the_fpSpread.Dispose(i4);
}
}
}
this.IsContained=function (child){
return FarPoint.System.IsChild(this.getControl(),child)||FarPoint.System.IsChild(this.getContainer(),child);
}
this.GetActivePositonInDomTree=function (element){
if (element==null)return false;
while (element!=null&&element!=document.body){
if (element.tagName=="TR"&&element.getAttribute("FpSpread")!=null)return element.getAttribute("FpSpread");
element=element.parentNode;
}
return "";
}
this.GetSpreadClientData=function (i4,whichData){
if (this.getFpSpread().getAttribute("EnableClientScript")=="0")return 0;
var l2="";
var l3=0;
var l4=null;
if (FarPoint.System.CheckBrowserByName("ie")){
if (i4.GetParentSpread()!=null)return ;
l4=document.getElementById(i4.id+"_XMLDATA");
switch (whichData){
case 0:
l2="/root/scrollLeft";
break ;
case 1:
l2="/root/scrollTop";
break ;
}
var l3=l4.documentElement.selectSingleNode(l2);
if (l3!=null&&l3.text!=""){
l3=parseInt(l3.text);
}
}else {
if (the_fpSpread.GetParentSpread(i4)!=null)return ;
l4=the_fpSpread.GetData(i4);
var l5=l4.getElementsByTagName("root")[0];
switch (whichData){
case 0:
l2="scrollLeft";
break ;
case 1:
l2="scrollTop";
break ;
}
var l6=l5.getElementsByTagName(l2)[0];
if (l6!=null&&l6.innerHTML!=""){
l3=parseInt(l6.innerHTML);
}
}
if (isNaN(l3))l3=0;
return l3;
}
this.SetHandler=function (f8,index,method){
if (isNaN(index)||index<0)return ;
if ((typeof(f8[index])=="undefined")||(f8[index]==null))return ;
switch (method){
case 0:
FarPoint.System.AttachEvent(f8[index].target,f8[index].event,f8[index].handler,f8[index].useCapture);
break ;
case 1:
FarPoint.System.DetachEvent(f8[index].target,f8[index].event,f8[index].handler,f8[index].useCapture);
break ;
}
}
this.ChangeSelectedIndex=function (step,caseId){
var l7=0;
if (typeof(caseId)!="undefined")
l7=caseId;
var i4=this.getFpSpread();
if (!i4)return ;
var l8=i4.GetRowCount();
if (l8<=0)return ;
var l9=this.getSelectedIndex();
var m0=this.getActiveColumnIndex();
if (m0<0)m0=0;
switch (l7){
case 0:
l9+=step;
if ((l9<0)||(l9>=l8))return ;
break ;
case 1:
l9-=5;
l9=Math.max(l9,0);
break ;
case 2:
l9+=5;
l9=Math.min(l9,l8-1);
break ;
case 3:
l9=0;
break ;
case 4:
l9=l8-1;
break ;
}
this.setSelectedIndex(l9);
i4.SetActiveCell(l9,m0);
}
this.ChangedActiveColumnIndex=function (IsLeft){
var i4=this.getFpSpread();
if (!i4)return ;
var m1=i4.GetColCount();
if (m1<=0)return ;
var m2=FarPoint.System.CheckBrowserByName("IE")?i4.ActiveRow:i4.GetActiveRow();
var m3=this.getActiveColumnIndex();
if (isNaN(m3))m3=0;
m3=IsLeft?m3-1:m3+1;
if ((m3<0)||(m3>=m1)){
m3=Math.max(m3,0);
m3=Math.min(m3,m1-1);
this.setActiveColumnIndex(m3);
return ;
}
if (FarPoint.System.CheckBrowserByName("IE"))
i4.ScrollTo(m2,m3);
else 
the_fpSpread.ScrollTo(i4,m2,m3);
this.setActiveColumnIndex(m3);
}
this.ShowHideContainer=function (show){
var h1=this.getControl();
if (h1==null)return ;
var h7=this.getContainer();
if (h7==null)return ;
var j2=this.getContainerDiv();
if (j2==null)return ;
if (!FarPoint.System.CheckBrowserByName("IE")){
j2.style.display=(show?'block':'none');
j2.style.visibility=(show?'visible':'hidden');
}
if (show){
h7.style.height=this.getListHeight()+"px";
j2.style.height=(this.getListHeight()+5)+"px";
h7.style.top=(-this.getListHeight()*0.25)+"px";
var k4=this.GetAdjustorForScroll();
if (FarPoint.System.CheckBrowserByName("safari")&&h1.offsetHeight==0){
j2.style.top=(FarPoint.System.GetOffsetTop(h1)+25)-k4.top+"px";
}else {
j2.style.top=(FarPoint.System.GetOffsetTop(h1)+h1.offsetHeight)-k4.top+"px";
}
var m4=FarPoint.System.GetOffsetLeft(h1);
if (this.getListAlignment()==0)
m4+=this.getListOffset();
else {
var m5=0;
if (this.getListWidth()!=-1)
m5=(this.getListWidth()-h1.parentNode.offsetWidth);
m4-=(this.getListOffset()+m5);
}
j2.style.left=m4-k4.left+"px";
var m6=this.getListWidth();
if (m6<0)m6=Math.max(this.getListMinWidth(),h1.parentNode.offsetWidth);
h7.style.width=(m6+5)+"px";
j2.style.width=(m6+5)+"px";
document.body.appendChild(j2);
var m7=this;
j2.close=function (){
m7.ShowHideContainer(false);
};
this.SetHandler(f8,1,0);
this.SetHandler(f8,3,0);
this.SetHandler(f8,13,0);
}else {
j2.close=null;
h1.appendChild(j2);
j2.style.top=-10000;
j2.style.left=-10000;
this.SetHandler(f8,1,1);
this.SetHandler(f8,3,1);
this.SetHandler(f8,13,1);
}
var i4=this.getFpSpread();
if (show&&i4!=null){
if (document.documentMode)
{
i4.style.backgroundColor="white";
i4.style.position="relative";
}
i4.style.height=(parseInt(h7.style.height)-this.getStatusBarHeight())+"px";
}
this.setIsDrop(show);
if (!FarPoint.System.CheckBrowserByName("IE")){
if (i4!=null){
var c7=the_fpSpread.GetColHeader(i4);
if (c7!=null&&FarPoint.System.CheckBrowserByName("Firefox")){
c7.parentNode.style.height=""+(c7.offsetHeight-parseInt(c7.cellSpacing))+"px";
}
the_fpSpread.SizeAll(i4);
the_fpSpread.SizeAll(i4);
if (show){
if (this.getFpSpread().getAttribute("EnableClientScript")!="0"){
the_fpSpread.SetPageActiveSpread(i4);
the_fpSpread.SetActiveSpreadID(i4,i4.id,i4.id,false);
}
var l9=this.getSelectedIndex();
i4.SetActiveCell(l9,0);
this.setActiveColumnIndex(0);
if (i4.GetActiveRow()>-1)
the_fpSpread.ScrollTo(i4,i4.GetActiveRow(),0);
}else {
var m8=this.getHostSpread();
if (this.getFpSpread().getAttribute("EnableClientScript")!="0"){
the_fpSpread.SetPageActiveSpread(m8);
the_fpSpread.SetActiveSpreadID(m8,m8.id,m8.id,false);
}
}
}
}else {
if (show){
var l9=this.getSelectedIndex();
i4.SetActiveCell(l9,0);
this.setActiveColumnIndex(0);
if (i4.ActiveRow>-1)
i4.ScrollTo(i4.ActiveRow,0);
}
}
if (show){
var i3=this;
setTimeout(function (){i3.AnimShow(h7);},30);
}
var i0=this.getInputControl();
if (i0!=null){
try {
i0.focus();
i0.select();
if (i0.value.length>0&&this.getSelectedIndex()==-1){
this.SetText(i0.value);
}
}catch (exception ){}
}
if (FarPoint.System.CheckBrowserByName("IE")){
j2.style.display=(show?'block':'none');
j2.style.visibility=(show?'visible':'hidden');
if (document.documentMode)
{
i4.sizeSpread();
}
}
}
this.AnimShow=function (h7){
var m9=h7.offsetTop;
if (m9>=0)return ;
var n0=m9<-5?m9*0.25:0;
h7.style.top=n0+"px";
var i3=this;
setTimeout(function (){i3.AnimShow(h7);},30);
}
this.SetText=function (text){
var i4=this.getFpSpread();
if (i4==null)return ;
var n1=this.getEditColumnIndex();
var i0=this.getInputControl();
if (text==null){
if (i0!=null){
i0.value="";
this.setSelectedIndex(-1);
}
i4.SetActiveCell(-1,-1);
return ;
}
var n2=text.match(new RegExp("^\\s*(\\S+(\\s+\\S+)*)\\s*$"));
text=(n2==null)?"":n2[1];
if ((text.length==1&&text.charCodeAt(0)==160)||(text=="")||(text.length<=0)){
if (i0!=null){
i0.value="";
this.setSelectedIndex(-1);
}
i4.SetActiveCell(-1,-1);
return ;
}
if ((!FarPoint.System.CheckBrowserByName("IE"))&&typeof(i4.GetRowCount)=="undefined"){
var h0=0,l9=-1;
while ((h0<the_fpSpread.spreads.length)&&(l9==-1)){
if (the_fpSpread.spreads[h0].id==i4.id)l9=h0;
h0++;
}
the_fpSpread.spreads.splice(l9,1);
the_fpSpread.Init(document.getElementById(i4.id));
document.getElementById(i4.id).dispose=function (){
the_fpSpread.Dispose(document.getElementById(i4.id));
}
}
if (!FarPoint.System.CheckBrowserByName("IE")){
text=text.replace(new RegExp("\xA0","g"),String.fromCharCode(32));
}
var n3=i4.GetRowCount();
var l9=0;
for (;l9<n3;l9++){
try {
var n4=i4.GetValue(l9,n1);
if (n4==(FarPoint.System.CheckBrowserByName("IE")?text:the_fpSpread.Trim(text))){
i4.SetActiveCell(l9,n1);
break ;
}
}catch (exception ){
return ;
}
}
}
this.TestProps=function (){
if (!f3.$FLAG_ISDEBUG)return ;
}
this.Init();
}
FarPoint.System.WebControl.MultiColumnComboBoxCellType.CheckInit=function (id){
var h1=document.getElementById(id);
if (h1==null){
h1=document.getElementById(id+"Editor");
id+="Editor";
}
if (h1&&h1.Init)return ;
try {
var n5=eval(id+f5.$OBJECT_SUFFIX);
if (n5){
n5.Dispose();
delete n5;
}
}catch (exception ){}
var n6=id+f5.$OBJECT_SUFFIX+"=new FarPoint.System.WebControl.MultiColumnComboBoxCellType(document.getElementById('"+id+"'));";
eval(n6);
}
FarPoint.System._ExtenderHelper=function (){
this.ScriptHolderID="__PAGESCRIPT";
this.ScriptBlockID="__SCRIPTBLOCK";
this.StartupScriptID="__STARTUPSCRIPT";
this.CssLinksID="__CSSLINKS";
}
FarPoint.System._ExtenderHelper.prototype={
getExtenderScripts:function (){
var n7={};
var n8=document.getElementsByTagName("input");
for (var h0=0;h0<n8.length;h0++){
var n9=n8[h0].id.match(new RegExp("^(.+)_extender$"));
if (n9&&n9.length==2){
var o0=n9[1];
var o1=$get(o0);
if (o1&&(o1.FpSpread=="Spread"||o1.getAttribute("FpSpread")=="Spread")){
var o2=n8[h0].json||n8[h0].getAttribute("json");
var o3=eval("("+o2+")");
this.mergeExtenderScripts(n7,o3.extenderScripts);
}
}
}
return n7;
},
mergeExtenderScripts:function (i2,source){
for (var o4 in source){
var n4=source[o4];
if (!i2[o4]){
i2[o4]=n4;
}else {
for (var o5=0;o5<n4.length;o5++){
var o6=n4[o5];
if (!Array.contains(i2[o4],o6))i2[o4].push(o6);
}
}
}
},
getNeededExtenderScripts:function (newScripts,realScripts,loadedScripts){
var o7=[];
var o8=[];
for (var o4 in newScripts){
Array.addRange(o7,newScripts[o4]);
}
for (var o4 in loadedScripts){
Array.addRange(o8,loadedScripts[o4]);
}
var o9=[];
for (var h0=0;h0<realScripts.length;h0++){
var n4=realScripts[h0];
if (!Array.contains(o8,n4)&&Array.contains(o7,n4))
o9.push(n4);
}
return o9;
},
get_scriptHolder:function (){
var p0=$get(this.ScriptHolderID);
if (!p0){
p0=document.createElement("div");
p0.id=this.ScriptHolderID;
p0.style.display="none";
document.body.appendChild(p0);
}
return p0;
},
saveLoadedExtenderScripts:function (i4){
var p0=this.get_scriptHolder();
p0.innerHTML="";
var p1=this.getExtenderScripts();
var o8=p0.loaded;
if (!o8)o8={};
this.mergeExtenderScripts(o8,p1);
p0.loaded=o8;
if (typeof(FpExtender)!='undefined')FpExtender.Util.disposeExtenders(i4);
},
processCss:function (buff){
var p2=document.getElementsByTagName("head");
if (!p2){
p2=document.createElement("head");
document.documentElement.insertBefore(p2,document.body)
}else {
p2=p2[0];
}
var p3=[];
var p4=p2.getElementsByTagName("link");
if (p4){
for (var h0=0;h0<p4.length;h0++){
var p5=p4[h0];
if (p5.getAttribute("type")=="text/css"){
p3.push(p5.getAttribute("href"));
}
}
}
var p6=$get(this.CssLinksID,buff);
if (p6){
p6=eval("("+p6.value+")");
p6=p6.cssLinks;
for (var h0=0;h0<p6.length;h0++){
var p7=p6[h0];
if (!Array.contains(p3,p7)){
var p5=document.createElement("link");
p5.type="text/css";
p5.rel="stylesheet";
p5.href=p7;
p2.appendChild(p5);
}
}
}
},
loadExtenderScripts:function (i4,buff){
if (Sys.Browser.agent!=Sys.Browser.InternetExplorer)
this.processCss(buff);
var p8=[];
var p9=[];
var q0=$get(this.ScriptBlockID,buff);
if (q0){
var q1=new RegExp("<script src=\"(.+)\" type=\"text\\/javascript\"><\\/script>","gm");
var q2;
while ((q2=q1.exec(q0.value))!=null){
p9.push(q2[1]);
}
}
var q3=this.getExtenderScripts();
var p0=this.get_scriptHolder();
var o9=this.getNeededExtenderScripts(q3,p9,p0.loaded);
for (var h0=0;h0<o9.length;h0++)p8.push({src:o9[h0]});
var q4=$get(this.StartupScriptID,buff);
var q5=Sys._ScriptLoader.getInstance();
for (var h0=0;h0<p8.length;h0++){
var q6=p8[h0].src;
if (q6)q5.queueScriptReference(q6);
}
q5.loadScripts(0,function (){
if (q4&&typeof(FpExtender)!=='undefined'){
var q7=false;
var q8=FpExtender.Util.getExtenderInitScripts(i4,q4.value);
for (var h0=0;h0<q8.length;h0++){
eval(q8[h0]);
if (q8[h0].indexOf("Sys.Application.initialize")!=-1)q7=true;
}
if (!q7){
var q9=Sys.Application.getComponents();
for (var h0 in q9){
if (q9[h0].get_id().indexOf(i4.id)==0&&FpExtender.ContainerBehavior.isInstanceOfType(q9[h0]))
q9[h0]._load();
}
}
}
},function (){
},null);
}
}
FarPoint.System.ExtenderHelper=new FarPoint.System._ExtenderHelper();
