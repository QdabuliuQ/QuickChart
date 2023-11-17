import ajax from "@/network/index";

export function postScreenImage(data: {
  screen_id: string
}) {
  return ajax({
    url: "/ge/screenImage",
    method: "post",
    data
  })
}