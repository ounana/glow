(this.webpackJsonpglow=this.webpackJsonpglow||[]).push([[21],{987:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return f}));var i=n(53),r=n(59),a=n(61),o=n(62),d=n(0),c=n.n(d),l=n(601),s=n(2),g="red",u="#444";l.a.registerNode("irect",{draw:function(e,t){var n=e.size;if(!Array.isArray(n))throw new Error("size \u4e0d\u5b58\u5728");var i=t.addGroup(),r=i.addShape("rect",{attrs:{fill:"white",stroke:u,width:n[0],height:n[1],x:-n[0]/2,y:-n[1]/2},name:"irect-box",draggable:!0});return i.addShape("text",{attrs:{fill:u,x:0,y:0,text:"\u6d4b\u8bd5",textAlign:"center",textBaseline:"middle",fontSize:16},name:"irect-text",draggable:!0}),function(e,t,n){var i={r:4,stroke:g,fill:"white"},r=[[0,-t/2],[0,t/2],[-e/2,0],[e/2,0]],a=n.addGroup();return r.forEach((function(e){a.addShape("circle",{attrs:Object(s.a)({x:e[0],y:e[1]},i)})})),a}(n[0],n[1],t).hide(),r},setState:function(e,t,n){var i=n.getContainer().get("children")[1];"selected"===e&&(t?i.show():i.hide())}}),l.a.registerBehavior("select-item",{getDefaultCfg:function(){return{multiple:!1}},getEvents:function(){return{"edge:click":"onItemClick","node:click":"onItemClick","canvas:click":"onCanvasClick"}},onItemClick:function(e){var t=this.graph,n=e.item;this.removeState(),n.hasState("selected")?t.setItemState(n,"selected",!1):t.setItemState(n,"selected",!0)},onCanvasClick:function(e){this.removeState()},removeState:function(){var e=this.graph;e.findAllByState("node","selected").forEach((function(t){e.setItemState(t,"selected",!1)})),e.findAllByState("edge","selected").forEach((function(t){e.setItemState(t,"selected",!1)}))}}),l.a.registerBehavior("click-add-edge",{getEvents:function(){return{"node:click":"onClick",mousemove:"onMousemove","edge:click":"onEdgeClick"}},onClick:function(e){var t=e.item,n=this.graph,i={x:e.x,y:e.y},r=t.getModel();if(this.addingEdge&&this.edge){var a=this.edge.getSource().getModel();if(a.id===r.id)return;if(n.getEdges().filter((function(e){return"string"===typeof e.getModel().target})).map((function(e){return e.getSource().getID()+e.getTarget().getID()})).find((function(e){return e===a.id+r.id})))return;n.updateItem(this.edge,{target:r.id}),n.emit("aftercreateedge",this.edge),this.edge=null,this.addingEdge=!1}else this.edge=n.addItem("edge",{source:r.id,target:i}),this.addingEdge=!0},onMousemove:function(e){var t=this.graph,n={x:e.x,y:e.y};this.addingEdge&&this.edge&&t.updateItem(this.edge,{target:n})},onEdgeClick:function(e){var t=e.item;this.addingEdge&&this.edge===t&&(this.graph.removeItem(this.edge),this.edge=null,this.addingEdge=!1)}});var h=n(3),f=function(e){Object(a.a)(n,e);var t=Object(o.a)(n);function n(){var e;Object(i.a)(this,n);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).nodeRef=c.a.createRef(),e.graph=null,e.getContextMenu=function(){return new l.a.Menu({getContent:function(e){return"<ul>\n        <li>\u4fee\u653901</li>\n        <li>\u6d4b\u8bd502</li>\n      </ul>"},handleMenuClick:function(e,t){console.log(e,t)},offsetX:0,offsetY:0,itemTypes:["node"]})},e.renderGraph=function(){var t=e.nodeRef.current,n=[t.scrollWidth,t.scrollHeight],i=n[0],r=n[1],a=new l.a.Grid,o=e.getContextMenu();e.graph=new l.a.Graph({plugins:[a,o],container:t,width:i,height:r,modes:{default:["drag-node","select-item","drag-canvas","click-add-edge"]},defaultNode:{anchorPoints:[[.5,0],[1,.5],[.5,1],[0,.5],[.5,0]]},edgeStateStyles:{selected:{stroke:"red"}},defaultEdge:{type:"polyline",size:2,style:{stroke:"#000",endArrow:!0,lineAppendWidth:8,offset:20}},layout:{type:"dagre",ranksep:25}}),e.graph.render(),e.resizeGraph(),e.graph.on("contextmenu",(function(e){e.originalEvent.preventDefault()})),e.graph.on("canvas:click",e.onCanvasClick)},e.remove=function(){e.graph&&e.graph.findAllByState("edge","selected").concat(e.graph.findAllByState("node","selected")).forEach((function(t){e.graph.removeItem(t.getID())}))},e.resizeGraph=function(){var e=document.querySelector(".g6-grid-container");e&&(e.style.left="0px",e.style.top="0px")},e}return Object(r.a)(n,[{key:"componentDidMount",value:function(){this.renderGraph()}},{key:"fitCenter",value:function(){this.graph.layout(),this.graph.fitCenter()}},{key:"onCanvasClick",value:function(e){var t="node-"+Date.now().toString(),n=this.getPointByClient(e.clientX,e.clientY),i=n.x,r=n.y;this.addItem("node",{id:t,x:i,y:r,type:"irect",size:[100,50]})}},{key:"render",value:function(){return Object(h.jsx)("div",{ref:this.nodeRef,style:{width:"800px",height:"600px",position:"relative",border:"1px solid"}})}}]),n}(d.PureComponent)}}]);
//# sourceMappingURL=21.e9e3d1c5.chunk.js.map