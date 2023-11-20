import ajax from "@/network/index";

export function postScreenImage(data: {
  option: any
  width: string
  height: string
  c_width: string
  c_height: string
  type: string
}) {
  return ajax({
    url: "/sc/screenImage",
    method: "post",
    data
  })
}