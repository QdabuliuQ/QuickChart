import ajax from "@/network/index";

export function getEvents(params: {
  type: string
  offset: number
}) {
  return ajax({
    url: '/ev/events',
    method: 'get',
    params
  })
}

export function postPraise(data: {
  event_id: string
  type: string
}) {
  return ajax({
    url: '/ev/praise',
    method: 'post',
    data
  })
}

export function postEvent(data: {
  chart_id: string
  content: string
}) {
  return ajax({
    url: '/ev/event',
    method: 'post',
    data
  })
}