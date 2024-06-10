import request from "@/utils/request"
import type {templateAddForm} from "@/models/template"

// 模板列表接口
export const getTemplateList_API = (page: number, size: number) => {
    return request.post('/template/list', {
      page: page,
      size: size
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
  };
  
  
  export const addTemplate_API = (data: templateAddForm) => {
    return request.post('/template/add', JSON.stringify(data), {
      headers: { 'Content-Type': 'Application/json' }
    })
  }