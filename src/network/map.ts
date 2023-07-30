import ajax from './index'

export function getCityData() {
  return ajax({
    url: '/map/cityData',
    method: 'get'
  })
}