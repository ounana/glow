(this.webpackJsonpglow=this.webpackJsonpglow||[]).push([[20],{695:function(e,t){},697:function(e,t){},983:function(e,t,i){"use strict";i.r(t),i.d(t,"default",(function(){return y}));var o=i(53),n=i(59),s=i(61),r=i(62),a=i(0),h=i(973),p=i(974),u=i(962),c=i(694),v=i(3);var l=function(e){return Object(v.jsx)("div",{style:d.con,children:"\u663e\u793a\u5f53\u524d\u5143\u7d20\u6570\u636e"})},d={con:{padding:10,cursor:"pointer"},div:{margin:"5px 0"}},f=function(){function e(t){var i=this;Object(o.a)(this,e),this.paper=t,this.oldPath=null,this.newPath=null,this.circle=void 0,this.hitOptions={fill:!0,class:this.paper.Path,tolerance:30},this.onMouseUp=function(e){i.oldPath&&i.newPath&&(i.oldPath=i.newPath=null)},this.onMouseMove=function(e){i.circle.position=e.point},this.onMouseDrag=function(e){var t=e.point;i.circle.position=t;var o=(i.paper.project.hitTest(t,i.hitOptions)||{}).item;o&&o.intersects(i.circle)&&(i.oldPath||(i.oldPath=o),i.newPath=o.unite(i.circle),o.remove(),i.paper.project.activeLayer.addChild(i.newPath))},this.circle=new t.Path.Circle({center:[80,50],radius:30,strokeColor:"black"}),this.paper.view.on("mouseup",this.onMouseUp),this.paper.view.on("mousemove",this.onMouseMove),this.paper.view.on("mousedrag",this.onMouseDrag)}return Object(n.a)(e,[{key:"destroy",value:function(){this.paper.view.off("mouseup",this.onMouseUp),this.paper.view.off("mousemove",this.onMouseMove),this.paper.view.off("mousedrag",this.onMouseDrag),this.circle.remove()}}]),e}();f.namespace="daub";var w=function(){function e(t){var i=this;Object(o.a)(this,e),this.paper=t,this.path=null,this.segment=null,this.hoverPath=null,this.hitOptions={segments:!0,stroke:!0,fill:!0,tolerance:5},this.onMouseMove=function(e){var t=e.point,o=(i.paper.project.hitTest(t,i.hitOptions)||{}).item;o?(i.hoverPath&&i.hoverPath.id!==o.id&&(i.hoverPath.selected=!1),i.hoverPath=o,o.selected=!0):i.hoverPath&&i.hoverPath.selected&&(i.hoverPath.selected=!1)},this.onMouseDrag=function(e){var t=e.delta;i.segment?(i.segment.point=i.segment.point.add(t),i.path.smooth()):i.path&&(i.path.position=i.path.position.add(t))},this.onMouseDown=function(e){i.path=i.segment=null;var t=e.point,o=i.paper.project.hitTest(t,i.hitOptions);if(o){i.path=o.item;var n=o.type;if("segment"===n&&(i.segment=o.segment),"stroke"===n){var s=o.location;i.segment=i.path.insert(s.index+1,t)}"fill"===n&&i.paper.project.activeLayer.addChild(o.item)}},this.paper.view.on("mousemove",this.onMouseMove),this.paper.view.on("mousedrag",this.onMouseDrag),this.paper.view.on("mousedown",this.onMouseDown)}return Object(n.a)(e,[{key:"destroy",value:function(){this.paper.view.off("mousemove",this.onMouseMove),this.paper.view.off("mousedrag",this.onMouseDrag),this.paper.view.off("mousedown",this.onMouseDown)}}]),e}();w.namespace="move";var m=function(){function e(t){var i=this;Object(o.a)(this,e),this.paper=t,this.path=null,this.start=null,this.onMouseUp=function(e){i.path&&i.start&&(i.path.closed=!0,i.path.simplify())},this.onMouseDrag=function(e){i.path&&i.path.add(e.point)},this.onMouseDown=function(e){i.path=new i.paper.Path,i.path.fillColor=new i.paper.Color({hue:360*Math.random(),saturation:1,brightness:1}),i.path.strokeColor=new i.paper.Color(0,0,0,1),i.start=e.point,i.path.add(e.point)},this.paper.view.on("mouseup",this.onMouseUp),this.paper.view.on("mousedrag",this.onMouseDrag),this.paper.view.on("mousedown",this.onMouseDown),this.paper.view.element.style.cursor="crosshair"}return Object(n.a)(e,[{key:"destroy",value:function(){this.paper.view.off("mouseup",this.onMouseUp),this.paper.view.off("mousedrag",this.onMouseDrag),this.paper.view.off("mousedown",this.onMouseDown),this.paper.view.element.style.cursor="auto"}}]),e}();m.namespace="draw";var j=function(){function e(t){var i=this;Object(o.a)(this,e),this.paper=t,this.path=null,this.hitOptions={fill:!0,tolerance:5},this.onMouseMove=function(e){},this.onMouseDrag=function(e){var t=e.delta;i.path&&(i.path.position=i.path.position.add(t))},this.onMouseDown=function(e){var t=e.point,o=(i.paper.project.hitTest(t,i.hitOptions)||{}).item;i.path=o,console.log(i.path)},this.paper.view.on("mousemove",this.onMouseMove),this.paper.view.on("mousedrag",this.onMouseDrag),this.paper.view.on("mousedown",this.onMouseDown)}return Object(n.a)(e,[{key:"destroy",value:function(){this.paper.view.off("mousemove",this.onMouseMove),this.paper.view.off("mousedrag",this.onMouseDrag),this.paper.view.off("mousedown",this.onMouseDown)}}]),e}();j.namespace="union";var g=function(){function e(t){Object(o.a)(this,e),this.paper=t,this.Services=[f,w,m,j],this.service=null,this.serviceName=null}return Object(n.a)(e,[{key:"getService",value:function(e){return this.Services.find((function(t){return t.namespace===e}))}},{key:"registerService",value:function(e){if(e===this.serviceName)throw new Error("The service has not changed!");this.service&&(this.service.destroy(),this.service=null);var t=this.getService(e);if(!t)throw new Error("This service not is exist!");this.service=new t(this.paper),this.serviceName=t.namespace}}]),e}(),b=i(498),M=i(500),O=i(157),P=function(e){Object(s.a)(i,e);var t=Object(r.a)(i);function i(e){var n;return Object(o.a)(this,i),(n=t.call(this,e)).paperdom=Object(a.createRef)(),n.paper=void 0,n.serviceCore=void 0,n.rePaperSub=null,n.onRadioChange=function(e){n.serviceCore&&n.serviceCore.registerService(e.target.value)},n.paper=new c.PaperScope,n.serviceCore=new g(n.paper),n}return Object(n.a)(i,[{key:"componentWillUnmount",value:function(){var e;null===(e=this.rePaperSub)||void 0===e||e.unsubscribe()}},{key:"componentDidMount",value:function(){var e=this,t=this.paperdom.current;if(t){var i=document.createElement("canvas");t.appendChild(i),this.paper.setup(i),this.serviceCore.registerService("draw");var o=t.getBoundingClientRect();this.paper.view.viewSize=new this.paper.Size(o.width,o.height);var n=Object(b.a)(window,"resize").pipe(Object(M.a)(300),Object(O.a)((function(e){return t.getBoundingClientRect()})));this.rePaperSub=n.subscribe((function(t){e.paper.view.viewSize=new e.paper.Size(t.width,t.height)}))}}},{key:"render",value:function(){return Object(v.jsxs)("div",{children:[Object(v.jsxs)(h.a,{children:[Object(v.jsx)(p.a,{span:18,style:{border:"1px solid",height:500},ref:this.paperdom}),Object(v.jsx)(p.a,{span:6,children:Object(v.jsx)(l,{})})]}),Object(v.jsxs)(u.a.Group,{defaultValue:"draw",buttonStyle:"solid",onChange:this.onRadioChange,children:[Object(v.jsx)(u.a.Button,{value:"draw",children:"\u52fe\u753b"}),Object(v.jsx)(u.a.Button,{value:"move",children:"\u79fb\u52a8"}),Object(v.jsx)(u.a.Button,{value:"daub",children:"\u6d82\u62b9"}),Object(v.jsx)(u.a.Button,{value:"union",children:"\u8054\u5408"}),Object(v.jsx)(u.a.Button,{value:"hide",children:"\u9690\u85cf"}),Object(v.jsx)(u.a.Button,{value:"show",children:"\u663e\u793a"})]})]})}}]),i}(a.PureComponent);function y(){return Object(v.jsx)("div",{children:Object(v.jsx)(P,{})})}}}]);
//# sourceMappingURL=20.0aaf4a92.chunk.js.map