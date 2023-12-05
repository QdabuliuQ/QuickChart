import { onMounted, onUnmounted, ref } from "vue";
export default function (containerRef: any) {
  const showMenu = ref(false);
  const x = ref(0);
  const y = ref(0);
  let dom: any = null
  const handleContextMenu = (e: any) => {
    e.preventDefault(); // 阻止浏览器的默认行为
    e.stopPropagation(); // 阻止冒泡
    showMenu.value = true;
    x.value = e.clientX;
    y.value = e.clientY;
  };
  const closeMenu = () => {
    showMenu.value = false;
  }
  onMounted(() => {
    containerRef.value.addEventListener("contextmenu", handleContextMenu);
    dom = containerRef.value
    window.addEventListener("click", closeMenu, true);
    window.addEventListener("contextmenu", closeMenu, true);
  });
  onUnmounted(() => {
    dom.removeEventListener("contextmenu", handleContextMenu)
    window.removeEventListener("click", closeMenu, true)
    window.removeEventListener("contextmenu", closeMenu, true);
    dom = null
  });
  return {
    showMenu,
    x,
    y,
  };
}
