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