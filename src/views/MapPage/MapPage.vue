<template>
  <div class="MapPage">
    <chart-menu :itemlist="list" :click-event="clickEvent" />
    <div class="chartContainer">
      <router-view></router-view>
    </div>
  </div>
  <el-dialog
    v-model="visible"
    title="选择地区"
    width="45%"
    class="cityDialogClass"
    @close="() => {
      active = 0
      cityActive = -1
    }"
  >
    <div class="cityContainer">
      <div class="leftProvince">
        <el-scrollbar height="300px">
          <div @click="provinceClick(idx)" v-for="(item,idx) in city" :key="item.adcode" :class="[active === idx ? 'active' : '', 'provinceItem']">
            {{ item.name }}
          </div>
        </el-scrollbar>
      </div>
      <div class="rightCity">
        <div style="width: 100%; display: flex; align-items: center; justify-content: center" v-if="!city[active].districts" class="empty">
          <el-empty description="暂无数据" />
        </div>
        <el-scrollbar v-else height="300px">
          <div @click="cityClick(idx)" v-for="(item, idx) in city[active].districts" :key="item.adcode" :class="[cityActive === idx ? 'active' : '', 'cityItem']">
            {{ item.name }}
          </div>
        </el-scrollbar>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="confirmEvent">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import chartMenu from "@/components/chartMenu.vue"
import list from "@/utils/mapItem"
import {getCityData} from "@/network/map";
import {ref} from "vue";
import {ElMessageBox} from "element-plus";
import {useRouter} from "vue-router";

interface CityInt {
  adcode: string
  level: string
  name: string
  districts?: {
    adcode: string
    level: string
    name: string
  }[]
}

const visible = ref<boolean>(false)
const city = ref<CityInt[]>([])
const active = ref<number>(0)
const cityActive = ref<number>(-1)
const mapId = ref<string>('')
const router = useRouter()

const getData = async () => {
  if(localStorage.getItem('city')) {
    city.value = JSON.parse(localStorage.getItem('city') as string)
  } else {
    let data = await getCityData()
    city.value = data.data
    localStorage.setItem("city", JSON.stringify(data.data))
  }
}
getData()

const provinceClick = (idx: number) => {
  active.value = idx
  cityActive.value = -1
}
const cityClick = (idx: number) => {
  if(idx === cityActive.value) cityActive.value = -1
  else cityActive.value = idx
}

const clickEvent = (id: string) => {
  let curId = router.currentRoute.value.params.id;
  if (curId != id && router.currentRoute.value.name == "mapType") {
    visible.value = true
  } else if (curId != id) {
    visible.value = true
  }
  mapId.value = id
}

const confirmEvent = () => {
  let adcode = cityActive.value !== -1 ? (city.value[active.value] as any).districts[cityActive.value].adcode : city.value[active.value].adcode
  router.push('/edit/map/type/' + mapId.value + '/' + adcode)
  visible.value = false
}

</script>

<style lang='less'>
.MapPage {
  height: 100%;
  display: flex;
  .chartContainer {
    flex: 1;
  }
}
.cityDialogClass {
  .el-dialog__body {
    padding: 15px;
  }
  .cityContainer {
    display: flex;
    .active {
      background-color: @theme !important;
      color: #fff;
    }
    .leftProvince {
      width: 30%;
      .provinceItem {
        padding: 10px;
        cursor: pointer;
        border-radius: 5px;
        &:hover {
          background-color: @grey;
          color: #fff;
        }
      }
    }
    .rightCity {
      flex: 1;
      padding-left: 30px;
      display: flex;
      border-left: 1px solid #444;
      .el-scrollbar {
        width: 100%;
        .el-scrollbar__view {
          display: flex;
          flex-wrap: wrap;
        }
      }
      .cityItem {
        padding: 6px 13px 7px;
        margin: 7px;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
        &:hover {
          background-color: @grey;
          color: #fff;
        }
      }
    }
  }
}
</style>