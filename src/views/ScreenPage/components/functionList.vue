<template>
  <div class="functionList">
    <div class="funcItem" title="保存图表">
      <i class="iconfont i_save"></i>
      保存
    </div>
    <div class="funcItem" title="另存图表">
      <i class="iconfont i_save1"></i>
      另存
    </div>
    <div @click="imgClick" class="funcItem" title="插入图片">
      <i class="iconfont i_img"></i>
      图片
    </div>
    <input @change="selectFile" style="display: none" accept=".jpg,.png,.jpeg" type="file" ref="inputRef">
    <div @click="textClick" class="funcItem" title="插入文本">
      <i class="iconfont i_text"></i>
      文本
    </div>
    <el-popover
      ref='shapePopoverRef'
      popper-class="functionListPopoverClass"
      placement="right-start"
      trigger="click"
      :hide-after="0"
    >
      <el-scrollbar height="500px">
        <shape-list @shape-click="shapeClick" />
      </el-scrollbar>
      <template #reference>
        <div class="funcItem" title="插入图形">
          <i class="iconfont i_shape"></i>
          图形
        </div>
      </template>
    </el-popover>
    <el-popover
      ref='chartPopoverRef'
      popper-class="functionListPopoverClass"
      placement="right-start"
      trigger="click"
      :hide-after="0"
    >
      <el-scrollbar height="400px">
        <skeleton
          :count="4"
          :status="chartInfo.status"
          :loading-class="['cover', 'name']"
        >
          <template v-slot:template="{ setSlotRef }">
            <div class="item">
              <div class="cover" style="width: 100%; aspect-ratio: 2/1.3"></div>
              <div class="name" style="margin-top: 5px">xxxxxxxxxxx</div>
            </div>
          </template>
          <template v-slot:content>
            <div class="functionListChartContainer">
              <div
                @click="itemClick(item, type)"
                class="item"
                v-for="item in chartList"
                :key="item.cover"
              >
                <div class="mask">插入图表</div>
                <el-image
                  style="width: 100%; aspect-ratio: 2/1.3"
                  :src="item.cover"
                  fit="cover"
                />
                <div class="name">{{ item.name }}</div>
              </div>
            </div>
            <el-pagination
              class="paginationClass"
              v-model:current-page="chartInfo.offset"
              hide-on-single-page
              background
              layout="prev, pager, next"
              :page-size="chartInfo.limit"
              :total="chartInfo.count"
              @current-change="chartCurrentChange"
            />
          </template>
          <template v-slot:empty>
            <el-empty description="暂无图表" />
          </template>
        </skeleton>
      </el-scrollbar>
      <template #reference>
        <div @click="funcClick('chart')" class="funcItem" title="插入图表">
          <i class="iconfont i_chart"></i>
          图表
        </div>
      </template>
    </el-popover>
    <el-popover
      ref="mapPopoverRef"
      popper-class="functionListPopoverClass"
      placement="right-start"
      trigger="click"
      :hide-after="0"
    >
      <el-scrollbar height="400px">
        <skeleton
          :count="4"
          :status="mapInfo.status"
          :loading-class="['cover', 'name']"
        >
          <template v-slot:template="{ setSlotRef }">
            <div class="item">
              <div class="cover" style="width: 100%; aspect-ratio: 2/1.3"></div>
              <div class="name" style="margin-top: 5px">xxxxxxxxxxx</div>
            </div>
          </template>
          <template v-slot:content>
            <div class="functionListChartContainer">
              <div
                @click="itemClick(item, type)"
                class="item"
                v-for="item in mapList"
                :key="item.cover"
              >
                <div class="mask">插入图表</div>
                <el-image
                  style="width: 100%; aspect-ratio: 2/1.3"
                  :src="item.cover"
                  fit="cover"
                />
                <div class="name">{{ item.name }}</div>
              </div>
            </div>
            <el-pagination
              class="paginationClass"
              v-model:current-page="mapInfo.offset"
              hide-on-single-page
              background
              layout="prev, pager, next"
              :page-size="mapInfo.limit"
              :total="mapInfo.count"
              @current-change="mapCurrentChange"
            />
          </template>
          <template v-slot:empty>
            <el-empty description="暂无图表" />
          </template>
        </skeleton>
      </el-scrollbar>
      <template #reference>
        <div @click="funcClick('map')" class="funcItem" title="插入地图">
          <i class="iconfont i_map"></i>
          地图
        </div>
      </template>
    </el-popover>
    <el-popover
      ref="exportPopoverRef"
      popper-class="functionListPopoverClass"
      placement="right-start"
      trigger="click"
      :hide-after="0"
    >
      <div class="typeContainer">
        <div @click="exportClick('html')" class="typeItem">
          <img src="@/assets/image/html.svg" />
          HTML
        </div>
        <div @click="exportClick('image')" class="typeItem">
          <img src="@/assets/image/image.svg" />
          图片
        </div>
      </div>
      <template #reference>
        <div class="funcItem" title="导出内容">
          <i class="iconfont i_export"></i>
          导出
        </div>
      </template>
    </el-popover>
  </div>
  <el-dialog
    v-model="visible"
    title="导出图片"
    width="30%"
  >
    <el-select style="width: 100%" v-model="imgType" placeholder="选择图片格式" size="large">
      <el-option
        key="jpg"
        label="JPG"
        value="jpg"
      />
      <el-option
        key="png"
        label="PNG"
        value="png"
      />
    </el-select>
    <el-select style="width: 100%; margin-top: 20px" v-model="size" placeholder="选择图片格式" size="large">
      <el-option
        v-for="item in sizes"
        :key="item.key"
        :value="item.key"
      >
        <div style="transform: scale(.75); font-size: 15px; padding: 0 15px; display: inline-block; background: #f8b55738; color: #f8b557; border-radius: 6px">{{item.tar}}</div>
        <span style="font-size: 13px">{{item.label}}</span>
      </el-option>
    </el-select>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="exportImage">
          导出
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { getChart } from "@/network/chart";
import { getChart as getMap } from "@/network/map";
import {ajaxRequest, fileType, uuid} from "@/utils";
import Skeleton from "@/components/skeleton.vue";
import useProxy from "@/hooks/useProxy";
import useStore from "@/store";
import ShapeList from "@/views/ScreenPage/components/shapeList.vue";
import {ShapePoolItem} from "@/types/shape";
import {getImageConfig, getShapeConfig, getTextConfig} from "@/utils/screenUtil";

type STATUS = '1' | '2'| '3'
interface IItem {
  cover: string;
  name: string;
  [propName: string]: any;
}
interface IInfo {
  status: STATUS
  offset: number
  limit: number
  count: number
}
const proxy = useProxy()
const inputRef = ref()
const exportPopoverRef = ref()
const chartPopoverRef = ref()
const mapPopoverRef = ref()
const shapePopoverRef = ref()
const chartList = reactive<IItem[]>([]);
const mapList = reactive<IItem[]>([]);
const chartInfo = reactive<IInfo>({
  status: "1",
  offset: 1,
  limit: 15,
  count: 0,
});
const mapInfo = reactive<IInfo>({
  status: "1",
  offset: 1,
  limit: 15,
  count: 0,
});
const type = ref<"chart" | "map">("chart");
const visible = ref<boolean>(false)
const imgType = ref<"jpg" | "png">("jpg")
const size = ref<string>('1920*1080')
const sizes = [
  {
    key: "1920*1080",
    label: "1920px * 1080px",
    tar: '普通'
  },
  {
    key: "3840*2160",
    label: "3840px * 2160px",
    tar: '标清'
  },
  {
    key: "5760*3240",
    label: "5760px * 3240px",
    tar: '高清'
  },
  {
    key: "7680*4320",
    label: "7680px * 4320px",
    tar: '超清'
  }
]

const getData = async () => {
  if (
    (type.value === "chart" && chartList.length !== 0) ||
    (type.value === "map" && mapList.length !== 0)
  ) {
    return;
  }
  let res: any = null;
  type.value === "chart" ? (chartInfo.status = "1") : (mapInfo.status = "1");
  if (type.value === "chart") {
    res = await ajaxRequest(getChart, {
      offset: chartInfo.offset,
    });
  } else {
    res = await ajaxRequest(getMap, {
      offset: mapInfo.offset,
    });
  }
  if (!res || !res.status || res.data.length == 0) {
    type.value === "chart" ? (chartInfo.status = "3") : (mapInfo.status = "3");
    return
  } else {
    type.value === "chart" ? (chartInfo.status = "2") : (mapInfo.status = "2");
  }
  if (res.status) {
    for (let item of res.data) {
      if (type.value === "chart") {
        chartList.push(item);
      } else {
        mapList.push(item);
      }
    }
    type.value === "chart"
      ? (chartInfo.count = res.count)
      : (mapInfo.count = res.count);
    type.value === "chart"
      ? (chartInfo.limit = res.limit)
      : (mapInfo.limit = res.limit);
  }
};

const chartCurrentChange = (e: number) => {
  chartInfo.offset = e;
  chartList.length = 0;
  getData();
};
const mapCurrentChange = (e: number) => {
  mapInfo.offset = e;
  mapList.length = 0;
  getData();
};

const {screen} = useStore()
const itemClick = (info: any, _type: "chart" | "map") => {
  if (type.value === 'chart') {
    chartPopoverRef.value.hide()
  } else {
    mapPopoverRef.value.hide()
  }
  screen.addScreenOptionOfElements({
    id: uuid(6, 36),
    type: _type,
    cover: info.cover,
    option: info.option,
    style: {
      width: 200,
      height: 130,
      translateX: 0,
      translateY: 0,
      scaleX: 1,
      scaleY: 1,
      rotate: 0,
      zIndex: 0,
    },
  })
}

const funcClick = (_type: "chart" | "map") => {
  type.value = _type;
  if (_type === "chart") {
    getData();
  } else {
    getData();
  }
};

const textClick = () => {  // 插入文本
  screen.addScreenOptionOfElements(getTextConfig())
}
const shapeClick = (shape: ShapePoolItem & {idx: number}) => {  // 插入图形
  screen.addScreenOptionOfElements(getShapeConfig({
    viewBox: shape.viewBox,
    path: shape.path,
  } as any))
  shapePopoverRef.value.hide()
}
const imgClick = () => {
  inputRef.value.click()
}
const selectFile = () => {
  let img = (inputRef.value as any).files[0]
  if (fileType(img.name) == 'image') {
    if (img.size / 1024 > 1000) {
      proxy.$notice({
        type: 'error',
        message: '图片大小不能超过1M',
        position: 'top-left'
      })
    } else {
      let reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = function (e: any) {
        let p = getImageConfig({
          url: e.target.result,
          file: img
        })
        screen.addScreenOptionOfElements(p)
      };
    }
  } else {
    proxy.$notice({
      type: 'error',
      message: '请上传图片(jpg/png/jpeg)',
      position: 'top-left'
    })
  }
}

const exportImage = () => {  // 导出图片
  visible.value = false
  proxy.$Bus.emit("exportImage", {
    size: size.value.split("*"),
    type: imgType.value
  })
}
const exportClick = (type: string) => {
  switch (type) {
    case 'html':
      break
    case 'image':
      visible.value = true
      // proxy.$Bus.emit("exportImage")
      break
  }
  exportPopoverRef.value.hide()
}

</script>

<style lang="less">
.functionListPopoverClass {
  width: auto !important;
  .typeContainer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
    .typeItem {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 13px;
      cursor: pointer;
      padding: 10px;
      border-radius: 10px;
      img {
        width: 50px;
        margin-bottom: 10px;
      }
      &:hover {
        background-color: #ffffff17;
      }
    }
  }
  .skeleton_loading {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    width: 500px;
  }
  .el-empty {
    width: 500px;
  }
  .functionListChartContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    width: 500px;
    .el-image {
      border-radius: 10px;
      overflow: hidden;
      background-color: #fff;
      box-sizing: border-box;
      border: 1px solid #ccc;
    }
    .item {
      position: relative;
      .name {
        margin-top: 5px;
        text-align: center;
        font-size: 14px;
      }
      &:hover .mask {
        opacity: 1;
      }
      .mask {
        position: absolute;
        z-index: 2;
        width: 100%;
        aspect-ratio: 2/1.3;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 180, 75, 0.509);
        color: #fff;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
        opacity: 0;
        transition: 0.2s all linear;
        box-sizing: border-box;
        border: 2px solid @theme;
        border-radius: 10px;
        overflow: hidden;
      }
    }
  }
}
.functionList {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  background-color: @curColor;
  .active {
    background-color: #4d4d4d !important;
    color: @theme !important;
  }
  .funcItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;
    cursor: pointer;
    padding: 15px 20px;
    transition: 0.2s all linear;
    .iconfont {
      margin-bottom: 5px;
      font-size: 23px;
    }
    &:hover {
      background-color: #4d4d4d;
      color: @theme;
    }
  }
}
</style>
