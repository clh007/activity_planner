import{i as s}from"./request-BVinqq6X.js";const c=e=>s.post("/resource/add",JSON.stringify(e),{headers:{"Content-Type":"application/json"}}),a=(e,r)=>s.post("/resource/list",{page:e,size:r},{headers:{"Content-Type":"application/json"}}),p=()=>s.get("/resource/all"),u=(e,r,t,o)=>s.post("/resource/search",{type:e,keyword:r,page:t,size:o},{headers:{"Content-Type":"application/json"}}),i=e=>s.post("/resource/applyresource",JSON.stringify(e),{headers:{"Content-Type":"application/json"}}),l=()=>s.post("/resource/myresourceapply"),y=e=>s.post("/resource/delete/"+e);export{l as a,a as b,u as c,c as d,y as e,p as g,i as s};