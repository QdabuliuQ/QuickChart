<template>
  <div id="dataParams">
    <el-scrollbar :height="height">
      <div class="itemListContainer">
        <div class="dataItem seriesData">
          <div class="itemTitle">图表数据</div>
          <div class="itemTip">编辑图表的各项数据</div>
          <div v-for="(item, index) in series" :key="index" class="item">
            <div class="optionTitle">
              <i class="iconfont i_data"></i>
              {{ item.name }}
            </div>
            <div class="optionBtn">
              <el-button
                @click="editData(item.name, item.data, index)"
                type="primary"
                size="small"
                >编辑</el-button>
              <el-button @click="deleteData(index)" size="small" type="danger">删除</el-button>
            </div>
          </div>
          <div class="addDataItem">
            <i class="iconfont i_plus"></i>
            添加数据项
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
  <el-drawer v-model="dataTableDrawer" custom-class="dataTableDrawerClass">
    <template #header>
      <h4>编辑数据</h4>
    </template>
    <template #default>
      <dataExcel ref="dataExcelRef" :key="values" :seriesName='seriesName' :values='values' :keys="keys" />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="dataTableDrawer = false">取消</el-button>
        <el-button @click="saveData" type="primary">保存</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  getCurrentInstance,
  ref
} from "vue";
import useCommonStore from "@/store/common";
import dataExcel from './dataExcel.vue'

interface comInitData {
  height: string;
  series: any[] | null;
  xAxis: any[] | null;
  dataTableDrawer: boolean;
  values: number[] | null
  keys: number[] | string[] | null
  seriesName: string | number
  dataType: string
}

export default defineComponent({
  name: "dataParams",
  props: ["type"],
  components: {
    dataExcel
  },
  setup() {
    const _this: any = getCurrentInstance();
    const common: any = useCommonStore();
    const dataExcelRef = ref()
    const data: comInitData = reactive({
      height: "",
      series: null,
      xAxis: null,
      dataTableDrawer: false,
      values: [],
      keys: [],
      seriesName: "",
      dataType: ""
    });

    // 保存数据
    const saveData = () => {
      // 修改的series数据
      if(data.dataType.length == 2) {
        let series = common.option.series
        // 修改数据
        series[parseInt(data.dataType[1])].data = dataExcelRef.value.values
        // 发送数据
        _this.proxy.$Bus.emit('optionChange', {
          series
        })
      } else {  // 修改的是轴数据

      }
      // 关闭抽屉
      data.dataTableDrawer = false
      data.dataType = ""
    }
    // 删除数据
    const deleteData = (i: number) => {
      let series = common.option.series
      series.splice(i, 1)
      console.log(series);
      
      // 发送数据
      _this.proxy.$Bus.emit('optionChange', {
        series
      })
    }
    // 编辑数据
    const editData = (name: string, _data: number[], index: number) => {
      data.dataType = 's' + index
      data.seriesName = name
      data.values = _data
      data.keys = common.option.xAxis[0].type == 'category' ? common.option.xAxis[0].data : common.option.yAxis[0].data
      data.dataTableDrawer = true;
    };
    const getData = () => {
      let { series } = common.option as any;
      data.series = series;

      let { xAxis } = common.option as any;
      data.xAxis = xAxis;
    };
    onMounted(() => {
      getData();
      // 监听窗口大小变化
      _this.proxy.$Bus.on("resize", (e: number) => {
        data.height = e - 54.8 + "px";
      });
    });
    return {
      dataExcelRef,
      saveData,
      deleteData,
      editData,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
.dataTableDrawerClass {
  width: 40% !important;
  .el-drawer__header {
    padding: 15px 15px 0;
    margin-bottom: 0;
    h4 {
      margin: 10px 0;
    }
  }
  .el-drawer__body {
    position: relative;
    margin: 10px;
    padding: 0;
  }
  .el-drawer__footer {
    .el-button {
      font-size: 13px;
    }
  }
}
#dataParams {
  height: 100%;
  background-color: @curColor;
  .itemListContainer {
    padding: 12px;
    .dataItem {
      .itemTitle {
        font-size: 13px;
        color: @theme;
        font-weight: bold;
      }
      .itemTip {
        margin-top: 3px;
        margin-bottom: 10px;
        font-size: 12px;
        color: #a9a8a8;
        letter-spacing: 2px;
      }
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        .optionTitle {
          font-size: 12px;
          display: flex;
          align-items: center;
          .iconfont {
            margin-right: 3px;
          }
        }
      }
      .addDataItem {
        width: 100%;
        padding: 8px 0 9px;
        text-align: center;
        font-size: 12px;
        border: 1px solid #636363;
        border-radius: 5px;
        transition: 0.2s all linear;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        .iconfont {
          margin-right: 5px;
        }
        &:hover {
          background-color: #ffae3445;
          color: @theme;
          border: 1px solid @theme;
        }
      }
    }
  }
}
</style>