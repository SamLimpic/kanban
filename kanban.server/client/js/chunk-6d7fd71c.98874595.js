(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6d7fd71c"],{"67c7":function(t,e,a){"use strict";a("c3f3")},c3f3:function(t,e,a){},f517:function(t,e,a){"use strict";a.r(e);var c=a("7a23");const r=Object(c["F"])("data-v-938d3954");Object(c["u"])("data-v-938d3954");const s={class:"board-page container"},o={class:"row justify-content-center mb-2"},n={key:0,class:"col-12"},d={class:"row justify-content-center"},i={class:"col-md-6 col-10 bg-light shadow p-3 m-md-4 my-md-3 my-3 mt-4 text-center"},b=Object(c["g"])("Current Board: "),l={key:0,class:"row justify-content-center"},j={key:1,class:"col-12 text-center  p-3 m-md-4 my-md-3 my-4"},O=Object(c["h"])("h1",null,[Object(c["h"])("i",{class:"fas fa-circle-notch fa-spin text-warning"})],-1);Object(c["s"])();const u=r((t,e,a,r,u,h)=>{const y=Object(c["y"])("ListComponent");return Object(c["r"])(),Object(c["d"])("div",s,[Object(c["h"])("div",o,[!r.state.loading&&r.state.activeBoard?(Object(c["r"])(),Object(c["d"])("div",n,[Object(c["h"])("div",d,[Object(c["h"])("div",i,[Object(c["h"])("h1",null,[b,Object(c["h"])("u",null,Object(c["A"])(r.state.activeBoard.title),1)]),Object(c["h"])("button",{type:"button",class:"btn btn-lg btn-primary mt-3 mb-2",onClick:e[1]||(e[1]=t=>r.createList()),title:"Create List"}," CREATE LIST ")])]),null!=r.state.lists[0]?(Object(c["r"])(),Object(c["d"])("div",l,[(Object(c["r"])(!0),Object(c["d"])(c["a"],null,Object(c["x"])(r.state.lists,t=>(Object(c["r"])(),Object(c["d"])(y,{key:t.id,"list-prop":t},null,8,["list-prop"]))),128))])):Object(c["e"])("",!0)])):(Object(c["r"])(),Object(c["d"])("div",j,[O]))])])});var h=a("83fc"),y=a("6c02"),m=a("37c0"),p=a("3524"),w=a("5d40"),v={name:"Board",setup(){const t=Object(y["c"])(),e=Object(c["v"])({boardId:t.params.id,loading:!0,newList:{},lists:Object(c["b"])(()=>h["a"].lists[e.boardId]),activeBoard:Object(c["b"])(()=>h["a"].activeBoard)});return Object(c["p"])(async()=>{try{await m["a"].getListsByBoardId(e.boardId),e.loading=!1}catch(t){w["a"].toast("Error: ",t,"error")}try{await m["a"].getBoardById(e.boardId)}catch(t){w["a"].toast("Error: ",t,"error")}}),{state:e,async createList(){try{await w["a"].inputModal("Name your List!","List name here..."),h["a"].newPost.length>20?w["a"].toast(`That's ${h["a"].newPost.length-20} too many characters!`,"error"):(h["a"].newPost.boardId=e.boardId,await p["a"].createList(e.boardId,h["a"].newPost))}catch(t){w["a"].toast("Error: ",t,"error")}},user:Object(c["b"])(()=>h["a"].user)}}};a("67c7");v.render=u,v.__scopeId="data-v-938d3954";e["default"]=v}}]);