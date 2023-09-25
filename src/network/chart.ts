import ajax, {upload} from "@/network/index";

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

export function getChart(params: {
  offset: number
}) {
  return ajax({
    url: '/qc/chart',
    method: 'get',
    params
  })
}

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

export function deleteChart(data: {
  chart_id: string
}) {
  return ajax({
    url: '/qc/chart',
    method: 'delete',
    data
  })
}

export function getChartDetail(params: {
  chart_id: string
}) {
  return ajax({
    url: '/qc/chartDetail',
    method: 'get',
    params
  })
}

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