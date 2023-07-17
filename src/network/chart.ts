import ajax, {upload} from "@/network/index";

export function postChart(data: {  // 保存图表
  name: string
  type: string
  option: string
  cover: string
}) {
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