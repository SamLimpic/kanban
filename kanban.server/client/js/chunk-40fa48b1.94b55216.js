(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-40fa48b1"],{"029e":function(t,e,a){},"62c8":function(t,e,a){"use strict";a("029e")},f517:function(t,e,a){"use strict";a.r(e);var c=a("7a23");const s=Object(c["E"])("data-v-07c27894");Object(c["t"])("data-v-07c27894");const r={class:"board-page container"},o={class:"row justify-content-center mb-2"},n={key:0,class:"col-12"},d={class:"row justify-content-center"},b={class:"col-md-6 col-10 bg-light shadow p-3 m-md-4 my-md-3 my-3 mt-4 text-center"},i=Object(c["f"])("Current Board: "),l={key:0,class:"row justify-content-center"},j={key:1,class:"col-12 text-center  p-3 m-md-4 my-md-3 my-4"},O=Object(c["g"])("h1",null,[Object(c["g"])("i",{class:"fas fa-circle-notch fa-spin text-info"})],-1);Object(c["r"])();const u=s((t,e,a,s,u,m)=>{const y=Object(c["x"])("ListComponent");return Object(c["q"])(),Object(c["d"])("div",r,[Object(c["g"])("div",o,[!s.state.loading&&s.state.activeBoard?(Object(c["q"])(),Object(c["d"])("div",n,[Object(c["g"])("div",d,[Object(c["g"])("div",b,[Object(c["g"])("h1",null,[i,Object(c["g"])("u",null,Object(c["z"])(s.state.activeBoard.title),1)]),Object(c["g"])("button",{type:"button",class:"btn btn-lg btn-info mt-3 mb-2",onClick:e[1]||(e[1]=t=>s.createList()),title:"Create List"}," CREATE LIST ")])]),null!=s.state.lists[0]?(Object(c["q"])(),Object(c["d"])("div",l,[(Object(c["q"])(!0),Object(c["d"])(c["a"],null,Object(c["w"])(s.state.lists,t=>(Object(c["q"])(),Object(c["d"])(y,{key:t.id,"list-prop":t},null,8,["list-prop"]))),128))])):Object(c["e"])("",!0)])):(Object(c["q"])(),Object(c["d"])("div",j,[O]))])])});var m=a("83fc"),y=a("6c02"),w=a("37c0"),g=a("3524"),p=a("5d40"),f={name:"Board",setup(){const t=Object(y["c"])(),e=Object(c["u"])({boardId:t.params.id,loading:!0,newList:{},lists:Object(c["b"])(()=>m["a"].lists[e.boardId]),activeBoard:Object(c["b"])(()=>m["a"].activeBoard)});return Object(c["o"])(async()=>{try{await w["a"].getListsByBoardId(e.boardId),e.loading=!1}catch(t){p["a"].toast("Error: ",t,"error")}try{await w["a"].getBoardById(e.boardId)}catch(t){p["a"].toast("Error: ",t,"error")}}),{state:e,async createList(){try{await p["a"].inputModal("Name your List!","List name here..."),m["a"].newPost.length>20?p["a"].toast(`That's ${m["a"].newPost.length-20} too many characters!`,"error"):(m["a"].newPost.boardId=e.boardId,await g["a"].createList(e.boardId,m["a"].newPost))}catch(t){p["a"].toast("Error: ",t,"error")}},user:Object(c["b"])(()=>m["a"].user)}}};a("62c8");f.render=u,f.__scopeId="data-v-07c27894";e["default"]=f}}]);