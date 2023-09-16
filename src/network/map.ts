import ajax from './index'

export function getCityData() {
  return ajax({
    url: '/map/cityData',
    method: 'get'
  })
}

export function getCityJSON(params: {
  adcode: string
}) {
  return ajax({
    url: '/map/cityJSON',
    method: 'get',
    params
  })
}

export function getRegionJSON() {
  return ajax({
    url: '/map/regionJSON',
    method: 'get'
  })
}

export function postChart(data: FormData) {
  return ajax({
    url: '/map/chart',
    method: 'post',
    data
  })
}

export function getChart(params: {
  offset: number
}) {
  return ajax({
    url: '/map/chart',
    method: "get",
    params
  })
}

export function putChartName(data: {
  name: string
  map_id: string
}) {
  return ajax({
    url: '/map/chartName',
    method: "put",
    data
  })
}

export function deleteChart(data: {
  map_id: string
}) {
  return ajax({
    url: '/map/chart',
    method: "delete",
    data
  })
}

export function getChartDetail(params: {
  map_id: string
}) {
  return ajax({
    url: '/map/chartDetail',
    method: 'get',
    params
  })
}

export function putChart(data: FormData) {
  return ajax({
    url: '/map/chart',
    method: 'put',
    data
  })
}