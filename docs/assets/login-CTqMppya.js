/* empty css             *//* empty css                   *//* empty css                  *//* empty css                 */import{d as R,r as c,i as V,f as t,n as p,b as u,O as d,g as f,a as v,u as z,E as a,P as O,Q as W,o as x,k,y as j,z as F,R as J,S as M,_ as G}from"./index-Cryq6cDr.js";import{i as w}from"./request-BgtXDK6E.js";import{q as Q}from"./index-CN9UxN99.js";import{u as H}from"./el-message-By6qvLqh.js";import{p as I,e as S}from"./common-JspXp6_I.js";import{u as K}from"./user-DJPoWAZv.js";const L=r=>w.post("/auth/login",Q.stringify(r)),X=r=>w.post("/auth/register",JSON.stringify(r),{headers:{"Content-Type":"Application/json"}}),P=(r,y)=>{const n=`/auth/verification/code?${`identifier=${r}&type=${y}`}`;return w.get(n,{headers:{"Content-Type":"application/json"}})},Y=r=>w.get("/auth/find/password?account="+r),_=r=>(j("data-v-3b9dfa68"),r=r(),F(),r),Z={class:"body"},ee={class:"main"},te={class:"form"},oe=_(()=>t("h2",{class:"form_title title"},"注册",-1)),se={class:"code"},ae={class:"form"},le=_(()=>t("h2",{class:"form_title title"},"登录",-1)),ne=_(()=>t("h2",{class:"switch__title title"},"没有帐号？",-1)),re=_(()=>t("p",{class:"switch__description description"},"立即注册吧😃",-1)),ie=_(()=>t("h2",{class:"switch__title title"},"已有帐号？",-1)),ue=_(()=>t("p",{class:"switch__description description"},"请登录🚀",-1)),de=R({__name:"login",setup(r){const y=z(),C=H(),n=c(!0),m=c("0"),s=c(""),i=c(""),h=c(""),g=c(""),E=()=>{if(s.value===""){a.error({message:"请输入手机号或邮箱"});return}if(!(I(s.value)||S(s.value))){a.error({message:"请输入正确的手机号或者邮箱"});return}if(i.value===""){a.error({message:"请输入密码"});return}let l={account:s.value,password:i.value};L(l).then(e=>{e.data.code===400&&a.error(e.data.message),e.data.code===200&&(a.success({message:"登录成功"}),K().setUser(e.data.data),C.login(),localStorage.setItem("userToken",e.data.data.userToken),localStorage.setItem("currentUser",JSON.stringify(e.data.data)),y.push({name:"home"}))}).catch(e=>{})},$=async()=>{if(h.value===""){a.error("请输入用户名!");return}if(s.value===""){a.error("请输入手机号或者邮箱!");return}if(i.value===""){a.error("请输入密码!");return}if(g.value===""){a.error("请输入验证码!");return}let l={username:h.value,password:i.value,code:g.value};m.value==="0"?l.phone=s.value:l.email=s.value,await X(l).then(e=>{e.data.code===200?a.success("注册成功"):e.data.code===400&&a.error(e.data.message)}).catch(e=>{a.error("注册失败")})},N=()=>{if(s.value===""){a.error("请输入手机号或者邮箱!");return}if(m.value==="0")if(I(s.value))P(s.value,"phone").then(l=>{console.log(l.data)}).catch(l=>{console.log(l)}),a.success("获取成功!");else{a.error("请输入有效手机号!");return}else if(S(s.value))P(s.value,"email").then(l=>{console.log(l.data)}).catch(l=>{}),a.success("获取成功!");else{a.error("请输入有效邮箱!");return}},b=c(!1),T=()=>{b.value=!0},A=()=>{if(s.value===""){a.error("请输入手机号或者邮箱!");return}Y(s.value).then(l=>{l.data.code===200?a.success("发送成功!"):a.error(l.data.message)}).catch(l=>{})};return(l,e)=>{const U=J,q=O,B=M,D=W;return x(),V("div",Z,[t("div",ee,[t("div",{class:p(["container a-container",{"is-txl":n.value}])},[t("div",te,[oe,u(t("input",{class:"form__input",type:"text",placeholder:"用户名","onUpdate:modelValue":e[0]||(e[0]=o=>h.value=o)},null,512),[[d,h.value]]),u(t("input",{class:"form__input",type:"password",placeholder:"密码","onUpdate:modelValue":e[1]||(e[1]=o=>i.value=o)},null,512),[[d,i.value]]),f(q,{modelValue:m.value,"onUpdate:modelValue":e[2]||(e[2]=o=>m.value=o),style:{width:"350px"}},{default:v(()=>[f(U,{value:"0"},{default:v(()=>[k("手机号")]),_:1}),f(U,{value:"1",style:{"margin-left":"50px"}},{default:v(()=>[k("邮箱")]),_:1})]),_:1},8,["modelValue"]),m.value==="1"?u((x(),V("input",{key:0,class:"form__input",type:"email",placeholder:"邮箱","onUpdate:modelValue":e[3]||(e[3]=o=>s.value=o)},null,512)),[[d,s.value]]):u((x(),V("input",{key:1,class:"form__input",type:"tel",placeholder:"手机号","onUpdate:modelValue":e[4]||(e[4]=o=>s.value=o)},null,512)),[[d,s.value]]),t("div",se,[u(t("input",{class:"form__input",style:{width:"200px"},type:"text",placeholder:"验证码","onUpdate:modelValue":e[5]||(e[5]=o=>g.value=o)},null,512),[[d,g.value]]),t("span",{onClick:N},"获取验证码")]),t("button",{class:"form__button button",onClick:$},"注册")])],2),t("div",{class:p(["container b-container",[{"is-txl":n.value},{"is-z200":n.value}]])},[t("div",ae,[le,u(t("input",{class:"form__input",type:"text",placeholder:"邮箱/手机号","onUpdate:modelValue":e[6]||(e[6]=o=>s.value=o)},null,512),[[d,s.value]]),u(t("input",{class:"form__input",type:"password",placeholder:"密码","onUpdate:modelValue":e[7]||(e[7]=o=>i.value=o)},null,512),[[d,i.value]]),t("a",{class:"form__link",onClick:e[8]||(e[8]=o=>T())},"忘记密码？"),t("button",{class:"form__button button",onClick:E},"登录")])],2),t("div",{class:p(["switch",{"is-txr":n.value}])},[t("div",{class:p(["switch__circle",{"is-txr":n.value}])},null,2),t("div",{class:p(["switch__circle switch__circle--t",{"is-txr":n.value}])},null,2),t("div",{class:p(["switch__container",{"is-hidden":!n.value}])},[ne,re,t("button",{class:"switch__button button",onClick:e[9]||(e[9]=o=>n.value=!n.value)},"注册")],2),t("div",{class:p(["switch__container",{"is-hidden":n.value}])},[ie,ue,t("button",{class:"switch__button button",onClick:e[10]||(e[10]=o=>n.value=!n.value)},"登录")],2)],2)]),f(D,{title:"密码找回",modelValue:b.value,"onUpdate:modelValue":e[13]||(e[13]=o=>b.value=o),width:"25%",center:""},{footer:v(()=>[f(B,{type:"info",onClick:e[12]||(e[12]=o=>A())},{default:v(()=>[k("提交")]),_:1})]),default:v(()=>[u(t("input",{class:"form__input",type:"text",placeholder:"邮箱/手机号","onUpdate:modelValue":e[11]||(e[11]=o=>s.value=o)},null,512),[[d,s.value]])]),_:1},8,["modelValue"])])}}}),be=G(de,[["__scopeId","data-v-3b9dfa68"]]);export{be as default};
