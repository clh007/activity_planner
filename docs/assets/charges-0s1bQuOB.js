import{i as t}from"./request-Qmyq5DiB.js";import{q as n}from"./index-pVZTY_yu.js";const r=e=>t.post("/expense/save",JSON.stringify(e),{headers:{"Content-Type":"application/json"}}),o=e=>t.get(`/expense/myexpense?type=${e}`),i=(e,s)=>t.put("/expense/check",n.stringify({state:e,id:s})),c=e=>t.get(`/fee/all?act_id=${e}`),u=e=>t.post("/fee/update",JSON.stringify(e),{headers:{"Content-Type":"application/json"}});export{i as a,o as f,c as l,r as s,u};