/* empty css             *//* empty css                   *//* empty css                      *//* empty css                 *//* empty css               *//* empty css                  *//* empty css                     *//* empty css                  *//* empty css                        */import"./el-tooltip-l0sNRNKZ.js";/* empty css                  */import{d as G,r as n,C as H,E as i,as as J,i as K,g as e,a,b as O,c as W,f as _,S as X,a5 as Y,at as Z,Q as ee,aw as te,o as z,k as p,a6 as B,y as ae,z as le,a7 as oe,l as ne,au as se,av as re,aa as ie,_ as pe}from"./index-Cryq6cDr.js";/* empty css                       */import"./el-message-By6qvLqh.js";import{c as ce,d as de,u as ue,e as me}from"./notice-CJVjPO1h.js";import"./request-BgtXDK6E.js";import"./user-DJPoWAZv.js";const _e=f=>(ae("data-v-38a44fae"),f=f(),le(),f),fe={class:"template-management"},ve=_e(()=>_("h1",{class:"page-title"},"通知模板管理",-1)),ge={class:"handler flex-center"},ye={class:"pagination-container"},Ve={class:"dialog-footer"},he={class:"dialog-footer"},xe=G({__name:"noticetemplate",setup(f){const h=n(!1),x=n([]),v=n(!1),g=n(!1),c=n({notice_type:"",context:""}),r=n({id:0,notice_type:"",context:""}),u=n(),m=n(),T=n(0),w=n(10),b=n(1);H(async()=>{await d()});const d=async()=>{h.value=!0;try{const t=await ce(b.value,w.value);x.value=t.data.data.content,T.value=t.data.data.totalElements}catch(t){console.error("获取通知模板列表失败:",t),i.error("获取通知模板列表失败，请稍后再试。")}finally{h.value=!1}},N=t=>{b.value=t,d()},S=t=>{w.value=t,d()},k=J({notice_type:[{required:!0,message:"请输入通知类型",trigger:"blur"}],context:[{required:!0,message:"请输入内容",trigger:"blur"}]}),E=()=>{u.value&&u.value.resetFields()},F=()=>{m.value&&m.value.resetFields()},P=()=>{v.value=!0},D=async()=>{if(u.value)try{await u.value.validate()&&(await de(c.value),v.value=!1,await d(),E(),i.success("添加通知模板成功！"))}catch(t){console.error("添加通知模板失败:",t),i.error("添加通知模板失败，请稍后再试。")}},L=(t,l)=>{g.value=!0,r.value={...t}},M=async()=>{if(m.value)try{await m.value.validate()&&(await ue(r.value),g.value=!1,await d(),F(),i.success("修改通知模板成功！"))}catch(t){console.error("修改通知模板失败:",t),i.error("修改通知模板失败，请稍后再试。")}},R=async(t,l)=>{try{await ie.confirm("您确定要删除该通知模板吗？","确认删除",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}),await me(t),x.value.splice(l,1),await d(),i.success("删除通知模板成功！")}catch(s){s!=="cancel"&&(console.error("删除通知模板失败:",s),i.error("删除通知模板失败，请稍后再试。"))}};return(t,l)=>{const s=X,C=oe,q=Y,j=Z,y=ne,V=se,U=re,A=ee,Q=te;return z(),K("div",fe,[ve,e(s,{type:"primary",onClick:P,style:{margin:"15px 0"}},{default:a(()=>[p("+新增")]),_:1}),O((z(),W(q,{data:x.value,border:"",style:{width:"100%"},"max-height":"750"},{default:a(()=>[e(C,{prop:"notice_type",label:"通知类型"}),e(C,{prop:"context",label:"内容"}),e(C,{label:"操作","header-align":"center"},{default:a(({row:o,$index:I})=>[_("div",ge,[e(s,{type:"warning",onClick:B($=>L(o,I),["prevent","stop"])},{default:a(()=>[p(" 修改 ")]),_:2},1032,["onClick"]),e(s,{onClick:B($=>R(o.id,I),["prevent"]),type:"danger"},{default:a(()=>[p(" 删除 ")]),_:2},1032,["onClick"])])]),_:1})]),_:1},8,["data"])),[[Q,h.value]]),_("div",ye,[e(j,{onSizeChange:S,onCurrentChange:N,"current-page":b.value,"page-sizes":[10,20,50,100],"page-size":w.value,total:T.value,layout:"total, sizes, prev, pager, next, jumper"},null,8,["current-page","page-size","total"])]),e(A,{modelValue:v.value,"onUpdate:modelValue":l[2]||(l[2]=o=>v.value=o),title:"添加通知模板",width:"30%"},{footer:a(()=>[_("span",Ve,[e(s,{type:"primary",onClick:D},{default:a(()=>[p("确定")]),_:1}),e(s,{onClick:E},{default:a(()=>[p("重置")]),_:1})])]),default:a(()=>[e(U,{ref_key:"templateAddFormRef",ref:u,model:c.value,rules:k,"label-width":"80px"},{default:a(()=>[e(V,{label:"通知类型",prop:"notice_type"},{default:a(()=>[e(y,{modelValue:c.value.notice_type,"onUpdate:modelValue":l[0]||(l[0]=o=>c.value.notice_type=o),autocomplete:"off",placeholder:"请输入通知类型"},null,8,["modelValue"])]),_:1}),e(V,{label:"内容",prop:"context"},{default:a(()=>[e(y,{modelValue:c.value.context,"onUpdate:modelValue":l[1]||(l[1]=o=>c.value.context=o),autocomplete:"off",placeholder:"请输入内容"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue"]),e(A,{modelValue:g.value,"onUpdate:modelValue":l[5]||(l[5]=o=>g.value=o),title:"修改通知模板",width:"30%"},{footer:a(()=>[_("span",he,[e(s,{type:"primary",onClick:M},{default:a(()=>[p("确定")]),_:1}),e(s,{onClick:F},{default:a(()=>[p("重置")]),_:1})])]),default:a(()=>[e(U,{ref_key:"templateUpdateFormRef",ref:m,model:r.value,rules:k,"label-width":"80px"},{default:a(()=>[e(V,{label:"通知类型",prop:"notice_type"},{default:a(()=>[e(y,{modelValue:r.value.notice_type,"onUpdate:modelValue":l[3]||(l[3]=o=>r.value.notice_type=o),autocomplete:"off",placeholder:"请输入通知类型"},null,8,["modelValue"])]),_:1}),e(V,{label:"内容",prop:"context"},{default:a(()=>[e(y,{modelValue:r.value.context,"onUpdate:modelValue":l[4]||(l[4]=o=>r.value.context=o),autocomplete:"off",placeholder:"请输入内容"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue"])])}}}),Me=pe(xe,[["__scopeId","data-v-38a44fae"]]);export{Me as default};
