/* empty css             *//* empty css                  *//* empty css                       *//* empty css                 *//* empty css                     *//* empty css                  *//* empty css               *//* empty css                  */import{c as U}from"./activity-BUeWCNGV.js";import{f as Y}from"./template-Co7KAKk1.js";import{u as k}from"./user-Bk1f5By2.js";import"./el-message-DxFAMNyy.js";import{d as D,r as d,w as I,C as w,s as x,i as v,f as a,g as n,a as f,E as u,U as M,l as B,V as T,S as C,o as _,F as H,G as N,c as P,k as b,y as F,z,W as G,_ as L}from"./index-DBEex_3j.js";import"./request-BolxJDmg.js";const i=r=>(F("data-v-da8a0708"),r=r(),z(),r),O={class:"main"},R=i(()=>a("h3",{class:"title"},"创建活动",-1)),W={class:"template-select"},j=i(()=>a("span",null,"模板选择:",-1)),q={class:"container"},J={class:"activity-title"},K=i(()=>a("span",null,"活动标题",-1)),Q={class:"activity-content"},X=i(()=>a("span",null,"活动介绍",-1)),Z={class:"activity-time"},$=i(()=>a("span",null,"活动起止时间",-1)),ee={class:"location"},te=i(()=>a("span",null,"活动地点",-1)),ae={class:"activity-button"},oe=D({__name:"createActivity",setup(r){const c=d("自定义");I(c,()=>{c.value=="自定义"?(e.value.name="",e.value.info="",e.value.location=""):m.value.forEach(t=>{t.tem_name==c.value&&(e.value.name=t.name,e.value.info=t.info,e.value.location=t.location)})});const e=d({id:0,name:"",info:"",start_time:Date.now().toString(),end_time:Date.now().toString(),location:""}),s=d(["",""]),m=d([{id:0,tem_name:"自定义",name:"",info:"",location:""}]),h=()=>{Y().then(t=>{console.log(t.data.data),m.value.push(...t.data.data)}).catch(t=>{console.error("请求模板数据失败:",t)})};w(()=>{h()});const{currentUser:V}=x(k()),y=()=>{if(e.value.name==""){u.error("请输入活动标题");return}if(s.value[0]===""||s.value[1]===""){u.error("请选择活动起止时间");return}e.value.start_time=s.value[0].toString(),e.value.end_time=s.value[1].toString(),e.value.creator_id=V.value.id,U(e.value).then(t=>{t.data.code===200?u.success("创建成功"):u.error("创建失败")}).catch(t=>{})};return(t,l)=>{const g=G,S=M,p=B,E=T,A=C;return _(),v("div",O,[R,a("div",W,[j,n(S,{modelValue:c.value,"onUpdate:modelValue":l[0]||(l[0]=o=>c.value=o),placeholder:"请选择活动模板"},{default:f(()=>[(_(!0),v(H,null,N(m.value,o=>(_(),P(g,{value:o.tem_name},null,8,["value"]))),256))]),_:1},8,["modelValue"])]),a("div",q,[a("div",J,[K,n(p,{modelValue:e.value.name,"onUpdate:modelValue":l[1]||(l[1]=o=>e.value.name=o),placeholder:"请输入活动标题"},null,8,["modelValue"])]),a("div",Q,[X,n(p,{type:"textarea",modelValue:e.value.info,"onUpdate:modelValue":l[2]||(l[2]=o=>e.value.info=o),placeholder:"请输入活动简介"},null,8,["modelValue"])]),a("div",Z,[$,n(E,{modelValue:s.value,"onUpdate:modelValue":l[3]||(l[3]=o=>s.value=o),type:"datetimerange","range-separator":"To","start-placeholder":"开始日期","end-placeholder":"结束日期",format:"YYYY-MM-DD HH:mm:ss","value-format":"YYYY-MM-DD HH:mm:ss"},null,8,["modelValue"])]),a("div",ee,[te,n(p,{modelValue:e.value.location,"onUpdate:modelValue":l[4]||(l[4]=o=>e.value.location=o),placeholder:"请输入活动地点"},null,8,["modelValue"])]),a("div",ae,[n(A,{type:"primary",onClick:y},{default:f(()=>[b("创建活动")]),_:1})])])])}}}),Ve=L(oe,[["__scopeId","data-v-da8a0708"]]);export{Ve as default};