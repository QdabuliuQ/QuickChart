import ajax, {upload} from "@/network/index";

/**
 * 保存图表
 * @param data
 */
export function postChart(data: FormData) {
  return ajax({
    url: '/qc/chart',
    method: 'post',
    data
  })
}

export function chartCoverUpload(data: FormData) {
  return upload('/chartCover', data)
}

/**
 * 获取图表
 * @param params
 */
export function getChart(params: {
  offset: number
}) {
  return ajax({
    url: '/qc/chart',
    method: 'get',
    params
  })
}

/**
 * 修改图表名称
 * @param data
 */
export function putChartName(data: {
  name: string
  chart_id: string
}) {
  return ajax({
    url: '/qc/chartName',
    method: 'put',
    data
  })
}

/**
 * 删除图表
 * @param data
 */
export function deleteChart(data: {
  chart_id: string
}) {
  return ajax({
    url: '/qc/chart',
    method: 'delete',
    data
  })
}

/**
 * 获取图表信息
 * @param params
 */
export function getChartDetail(params: {
  chart_id: string
}) {
  return ajax({
    url: '/qc/chartDetail',
    method: 'get',
    params
  })
}

/**
 * 修改图表
 * @param data
 */
export function putChart(data: FormData) {
  return ajax({
    url: '/qc/chart',
    method: 'put',
    data
  })
}

export function graphicUpload(data: FormData) {
  return upload('/graphic', data)
}

/**
 * 点赞图表
 * @param data
 */
export function postPraise(data: {
  chart_id: string
  state: string
}) {
  return ajax({
    url: "/qc/praise",
    method: 'post',
    data
  })
}

/**
 * 发布评论
 * @param data
 */
export function postComment(data: {
  chart_id: string
  content: string
}) {
  return ajax({
    url: "/qc/comment",
    method: "post",
    data
  })
}

/**
 * 获取评论
 * @param params
 */
export function getComment(params: {
  offset: number
  chart_id: string
}) {
  return ajax({
    url: "/qc/comment",
    method: "get",
    params
  })
}

/**
 * 删除评论
 * @param data
 */
export function deleteComment(data: {
  comment_id: string
}) {
  return ajax({
    url: "/qc/comment",
    method: "delete",
    data
  })
}

/**
 * 点赞/取消点赞评论
 * @param data
 */
export function postPraiseComment(data: {
  comment_id: string
  type: '1' | '0'
}) {
  return ajax({
    url: '/qc/praiseComment',
    method: 'post',
    data
  })
}