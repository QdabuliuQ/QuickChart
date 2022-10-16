<template>
  <div id="paramsXasis">
    <div class="xasisContainer">
      <div class="asisTargetList">
        <div
          @click="toggleItem(index)"
          v-for="(item, index) in xAsisList"
          :key="item.value"
          :class="[activeIndex == index ? 'activeTarget' : '', 'targetItem']"
        >
          {{ item.label }}
          <div @click.stop="deleteItem(index)" class="deleteIcon">
            <i class="iconfont i_delete"></i>
          </div>
        </div>
        <div
          v-if="xAsisList.length < 2"
          @click="addAsisTarget"
          class="targetAddBtn"
        >
          <i class="iconfont i_plus"></i>添加X轴
        </div>
      </div>
      <div style="margin-top: 5px" class="optionItem">
        <div>轴数据</div>
        <el-button @click="xAsisDialog = true" type="primary" size="small"
          >编辑数据</el-button
        >
      </div>
      <div :key="activeIndex" class="paramsList">
        <div v-for="(value, key) in allOption[activeIndex]" :key="key">
          <div
            v-if="
              key != 'nameTextStyle' &&
              key != 'axisLine' &&
              key != 'axisTick' &&
              key != 'axisLabel' &&
              key != 'type'
            "
            :class="[
              key != 'nameTextStyle' &&
              key != 'axisLine' &&
              key != 'axisTick' &&
              key != 'axisLabel' &&
              key != 'type'
                ? 'optionItem'
                : '',
            ]"
          >
            <div>
              {{ opNameList ? opNameList[key] : "" }}
            </div>
            <div class="optionOperation">
              <el-switch
                v-if="key == 'show' || key == 'inverse'"
                size="small"
                v-model="defaultOption[activeIndex][key]"
              />
              <el-select
                v-else-if="key == 'position' || key == 'nameLocation'"
                popper-class="paramsSelectPopperClass"
                v-model="defaultOption[activeIndex][key]"
                size="small"
              >
                <el-option
                  v-for="item in allOption[activeIndex][key]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-input-number
                v-else-if="
                  key == 'offset' || key == 'nameGap' || key == 'nameRotate'
                "
                size="small"
                v-model="defaultOption[activeIndex][key]"
              />
              <el-input
                v-if="key == 'name'"
                size="small"
                v-model="defaultOption[activeIndex][key]"
              />
            </div>
          </div>
        </div>
        <!-- 坐标轴名称的文字样式 -->
        <span
          class="childOptionTitle"
          v-show="defaultOption[activeIndex].name != ''"
          >坐标轴名称的文字样式</span
        >
        <div
          v-show="defaultOption[activeIndex].name != ''"
          v-for="(value, key) in allOption[activeIndex].nameTextStyle"
        >
          <div class="childOptionOperation">
            <div class="chlidOptionTitle" :title="opNameList[key]">
              {{ opNameList[key] }}
            </div>
            <div class="childOptionItemOperation">
              <el-input-number
                v-if="
                  key == 'fontSize' ||
                  key == 'borderWidth' ||
                  key == 'borderRadius' ||
                  key == 'padding' ||
                  key == 'shadowBlur' ||
                  key == 'shadowOffsetX' ||
                  key == 'shadowOffsetY' ||
                  key == 'textShadowBlur' ||
                  key == 'textShadowOffsetX' ||
                  key == 'textShadowOffsetY'
                "
                size="small"
                :min="0"
                v-model="defaultOption[activeIndex].nameTextStyle[key]"
              />
              <el-color-picker
                v-else-if="
                  key == 'color' ||
                  key == 'backgroundColor' ||
                  key == 'borderColor' ||
                  key == 'shadowColor' ||
                  key == 'textShadowColor'
                "
                v-model="defaultOption[activeIndex].nameTextStyle[key]"
              />
              <el-select
                v-else-if="key == 'fontWeight' || key == 'fontFamily'"
                popper-class="paramsSelectPopperClass"
                v-model="defaultOption[activeIndex].nameTextStyle[key]"
                size="small"
              >
                <el-option
                  v-for="item in allOption[activeIndex].nameTextStyle[key]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
        <!-- 坐标轴样式 -->
        <span style="display: block; margin-top: 8px" class="childOptionTitle"
          >坐标轴样式</span
        >
        <div class="childOptionOperation">
          <div class="chlidOptionTitle">显示</div>
          <div class="childOptionItemOperation">
            <el-switch
              size="small"
              v-model="defaultOption[activeIndex].axisLine.show"
            />
          </div>
        </div>
        <div>
          <div
            v-show="defaultOption[activeIndex].axisLine.show"
            v-for="(value, key) in allOption[activeIndex].axisLine.lineStyle"
            class="childOptionOperation"
          >
            <div class="chlidOptionTitle">
              {{ opNameList[key] }}
            </div>
            <div class="childOptionItemOperation">
              <el-color-picker
                v-if="key == 'color' || key == 'shadowColor'"
                v-model="defaultOption[activeIndex].axisLine.lineStyle[key]"
              />
              <el-input-number
                v-else-if="
                  key == 'width' ||
                  key == 'shadowBlur' ||
                  key == 'shadowOffsetX' ||
                  key == 'shadowOffsetY'
                "
                :min="0"
                size="small"
                v-model="defaultOption[activeIndex].axisLine.lineStyle[key]"
              />
              <el-select
                v-else-if="key == 'type'"
                popper-class="paramsSelectPopperClass"
                v-model="defaultOption[activeIndex].axisLine.lineStyle[key]"
                size="small"
              >
                <el-option
                  v-for="item in allOption[activeIndex].axisLine.lineStyle[key]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-input-number
                v-else-if="key == 'opacity'"
                :min="0"
                :max="1"
                :step="0.1"
                size="small"
                v-model="defaultOption[activeIndex].axisLine.lineStyle[key]"
              />
            </div>
          </div>
        </div>

        <!-- 坐标轴刻度样式 -->
        <span style="display: block; margin-top: 8px" class="childOptionTitle"
          >坐标轴刻度样式</span
        >
        <div class="childOptionOperation">
          <div class="chlidOptionTitle">显示</div>
          <div class="childOptionItemOperation">
            <el-switch
              size="small"
              v-model="defaultOption[activeIndex].axisTick.show"
            />
          </div>
        </div>
        <div>
          <div
            v-show="defaultOption[activeIndex].axisTick.show"
            v-for="(value, key) in allOption[activeIndex].axisTick.lineStyle"
            class="childOptionOperation"
          >
            <div class="chlidOptionTitle">
              {{ opNameList[key] }}
            </div>
            <div class="childOptionItemOperation">
              <el-color-picker
                v-if="key == 'color' || key == 'shadowColor'"
                v-model="defaultOption[activeIndex].axisTick.lineStyle[key]"
              />
              <el-input-number
                v-else-if="
                  key == 'width' ||
                  key == 'shadowBlur' ||
                  key == 'shadowOffsetX' ||
                  key == 'shadowOffsetY'
                "
                :min="0"
                size="small"
                v-model="defaultOption[activeIndex].axisTick.lineStyle[key]"
              />
              <el-select
                v-else-if="key == 'type'"
                popper-class="paramsSelectPopperClass"
                v-model="defaultOption[activeIndex].axisTick.lineStyle[key]"
                size="small"
              >
                <el-option
                  v-for="item in allOption[activeIndex].axisTick.lineStyle[key]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-input-number
                v-else-if="key == 'opacity'"
                :min="0"
                :max="1"
                :step="0.1"
                size="small"
                v-model="defaultOption[activeIndex].axisLine.lineStyle[key]"
              />
            </div>
          </div>
        </div>

        <!-- 坐标轴文本样式 -->
        <span style="display: block; margin-top: 8px" class="childOptionTitle"
          >坐标轴文本样式</span
        >
        <div>
          <div class="childOptionOperation">
            <div class="chlidOptionTitle">显示</div>
            <div class="childOptionItemOperation">
              <el-switch
                size="small"
                v-model="defaultOption[activeIndex].axisLabel.show"
              />
            </div>
          </div>
          <div
            v-show="defaultOption[activeIndex].axisLabel.show"
            v-for="(value, key, index) in allOption[activeIndex].axisLabel"
            :class="[index == 0 ? '' : 'childOptionOperation']"
          >
            <div v-if="key != 'show'" class="chlidOptionTitle">
              {{ opNameList[key] }}
            </div>
            <div class="childOptionItemOperation">
              <el-color-picker
                v-if="
                  key == 'color' ||
                  key == 'backgroundColor' ||
                  key == 'borderColor' ||
                  key == 'textBorderColor' ||
                  key == 'shadowColor' ||
                  key == 'textShadowColor'
                "
                v-model="defaultOption[activeIndex].axisLabel[key]"
              />
              <el-input-number
                v-else-if="
                  key == 'rotate' ||
                  key == 'margin' ||
                  key == 'fontSize' ||
                  key == 'borderWidth' ||
                  key == 'borderRadius' ||
                  key == 'padding' ||
                  key == 'shadowBlur' ||
                  key == 'shadowOffsetX' ||
                  key == 'shadowOffsetY' ||
                  key == 'textBorderWidth' ||
                  key == 'textShadowBlur' ||
                  key == 'textShadowOffsetX' ||
                  key == 'textShadowOffsetY'
                "
                :min="0"
                size="small"
                v-model="defaultOption[activeIndex].axisLabel[key]"
              />
              <el-select
                v-else-if="
                  key == 'type' ||
                  key == 'fontStyle' ||
                  key == 'fontWeight' ||
                  key == 'fontFamily' ||
                  key == 'borderType' ||
                  key == 'textBorderType'
                "
                popper-class="paramsSelectPopperClass"
                v-model="defaultOption[activeIndex].axisLabel[key]"
                size="small"
              >
                <el-option
                  v-for="item in allOption[activeIndex].axisLabel[key]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
  onMounted,
  getCurrentInstance,
} from "vue";

interface comInitData {
  xAsisList: { label: string; value: number }[];
  activeIndex: number;
  activeXasis: string;
  tempOption: any;
  allTempOption: any;
  xAsisDialog: boolean;
}
let timer: any;

export default defineComponent({
  name: "paramsXasis",
  props: ["defaultOption", "allOption", "opNameList"],
  setup(props) {
    const _this: any = getCurrentInstance();
    const data: comInitData = reactive({
      xAsisList: [
        {
          label: "X轴1",
          value: 0,
        },
      ],
      activeIndex: 0,
      activeXasis: "X轴1",
      tempOption: null,
      allTempOption: null,
      xAsisDialog: true,
    });

    const addAsisTarget = () => {
      data.xAsisList.push({
        label: "X轴" + (data.xAsisList[0].value + 2),
        value: data.xAsisList[0].value + 1,
      });
      props.defaultOption.push(JSON.parse(JSON.stringify(data.tempOption)));
      props.allOption.push(JSON.parse(JSON.stringify(data.allTempOption)));
    };
    // 删除
    const deleteItem = (i: number) => {
      if (data.xAsisList.length == 2) {
        data.xAsisList.splice(i, 1);
        props.defaultOption.splice(i, 1);
      }
    };
    // 切换
    const toggleItem = (i: number) => {
      data.activeIndex = i;
    };

    watch(
      () => props.defaultOption,
      (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          console.log(e);

          _this.proxy.$Bus.emit("optionChange", {
            xAxis: e,
          });
        }, 500);
      },
      {
        deep: true,
      }
    );

    onMounted(() => {
      data.tempOption = props.defaultOption[0];
      data.allTempOption = props.allOption[0];
      if (props.defaultOption.length == 2) {
        data.xAsisList.push({
          label: "X轴2",
          value: 1,
        });
      }
    });
    return {
      toggleItem,
      deleteItem,
      addAsisTarget,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#paramsXasis {
  .xasisContainer {
    padding: 12px 0;
    .asisTargetList {
      display: flex;
      align-items: center;
      font-size: 12px;
      .targetItem {
        height: 30px;
        padding: 0 10px;
        border-radius: 6px;
        margin-right: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        background-color: rgba(12, 12, 12, 0.203);
        .deleteIcon {
          width: 15px;
          height: 15px;
          position: relative;
          top: 0.5px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 3px;
          border-radius: 50%;
          &:hover {
            background-color: #fff;
            color: @theme;
          }
          .iconfont {
            position: relative;
            top: 0.5px;
            font-size: 12px;
          }
        }
      }
      .targetAddBtn {
        height: 30px;
        padding: 0 12px;
        border-radius: 4px;
        margin-right: 10px;
        color: #a9a8a8;
        cursor: pointer;
        display: flex;
        align-items: center;
        background-color: rgba(12, 12, 12, 0.203);
        i {
          margin-right: 3px;
          font-size: 14px;
          position: relative;
          top: 1px;
        }
      }
      .activeTarget {
        height: 29px;
        color: #fff;
        background-color: @theme;
      }
    }
    .childItem {
      padding: 7px 0;
      font-size: 12px;
    }
    .childOptionTitle {
      font-weight: bold;
      font-size: 12px;
      margin-bottom: 4px;
      color: @theme;
    }
    .childOptionItem {
      padding: 6px 0;
      color: #a9a8a8;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .chlidOptionTitle {
        max-width: 40%;
        width: 40%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .childOptionOperation {
      margin-left: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 7px 0;
      font-size: 12px;
      color: #a9a8a8;
      .chlidOptionTitle {
        max-width: 40%;
        width: 40%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .childOptionItemOperation {
      display: flex;
      justify-content: flex-end;
      width: 55%;
    }
  }
}
</style>