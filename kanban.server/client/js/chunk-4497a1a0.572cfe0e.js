(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4497a1a0"],{"50fc":function(t,e,c){},a8b7:function(t,e,c){"use strict";c.r(e);var a=c("7a23");const o=Object(a["E"])("data-v-6dec8366");Object(a["t"])("data-v-6dec8366");const n={class:"welcome-page container"},r={key:0,class:"row justify-content-center"},d=Object(a["g"])("div",{class:"col-12 text-center p-3 m-md-4 my-md-3 my-4"},[Object(a["g"])("h1",null,[Object(a["g"])("i",{class:"fas fa-clipboard-check fa-spin text-info"})])],-1),s={key:1,class:"row justify-content-center"},b={key:0,class:"col-md-6 col-10 shadow bg-light text-center p-3 m-md-4 my-md-3 my-4"},l=Object(a["g"])("h1",null,"You don't have any Bill Boards!",-1),i={key:1,class:"col-12 mb-4"},j={class:"row justify-content-center"},O={class:"col-md-6 col-10 bg-light shadow text-center p-3 m-md-4 my-md-3 my-4"},u=Object(a["g"])("h1",null,"Here are your Bill Boards!",-1),m={class:"row justify-content-center"};Object(a["r"])();const y=o((t,e,c,o,y,g)=>{const p=Object(a["x"])("BoardComponent");return Object(a["q"])(),Object(a["d"])("div",n,[o.state.loading?(Object(a["q"])(),Object(a["d"])("div",r,[d])):(Object(a["q"])(),Object(a["d"])("div",s,[null==o.state.boards[0]?(Object(a["q"])(),Object(a["d"])("div",b,[l,Object(a["g"])("button",{type:"button",class:"btn btn-lg btn-info text-light w-25 mx-auto my-2",onClick:e[1]||(e[1]=(...t)=>o.createBoard&&o.createBoard(...t)),title:"Create Board"}," CREATE BOARD ")])):(Object(a["q"])(),Object(a["d"])("div",i,[Object(a["g"])("div",j,[Object(a["g"])("div",O,[u,Object(a["g"])("button",{type:"button",class:"btn btn-lg btn-info text-light mt-3 mb-2",onClick:e[2]||(e[2]=(...t)=>o.createBoard&&o.createBoard(...t)),title:"Create Board"}," CREATE BOARD ")])]),Object(a["g"])("div",m,[(Object(a["q"])(!0),Object(a["d"])(a["a"],null,Object(a["w"])(o.state.boards,t=>(Object(a["q"])(),Object(a["d"])(p,{key:t.id,"board-prop":t},null,8,["board-prop"]))),128))])]))]))])});var g=c("83fc"),p=c("37c0"),w=c("5d40"),B={name:"Welcome",setup(){const t=Object(a["u"])({loading:!0,boards:Object(a["b"])(()=>g["a"].boards),user:Object(a["b"])(()=>g["a"].user)});return Object(a["o"])(async()=>{try{await p["a"].getAllBoards(),t.loading=!1}catch(e){w["a"].toast("Error: "+e,"error")}}),{state:t,async createBoard(){try{await w["a"].inputModal("Name your Board!","Board name here..."),await p["a"].createBoard(g["a"].newPost)}catch(t){w["a"].toast("Input cancelled!","warning")}}}}};c("d6be");B.render=y,B.__scopeId="data-v-6dec8366";e["default"]=B},d6be:function(t,e,c){"use strict";c("50fc")}}]);