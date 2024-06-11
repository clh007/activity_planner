import request from "@/utils/request"
import type { templateAddForm, updateTemplateForm } from "@/models/template"

// 模板列表接口
export const getTemplateList_API = (page: number, size: number) => {
  return request.post('/template/list', {
    page: page,
    size: size
  }, {
    headers: { 'Content-Type': 'application/json' }
  });
};

// 添加活动模板接口
export const addTemplate_API = (data: templateAddForm) => {
  return request.post('/template/add', JSON.stringify(data), {
    headers: { 'Content-Type': 'Application/json' }
  })
}


// 修改活动模板接口
export const updateTemplate_API = (data: updateTemplateForm) => {
  return request.post('/template/update', JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
};

// 删除活动模板接口
export const deleteTemplate_API = (template_id: number) => { return request.post('/template/delete/' + template_id); };
