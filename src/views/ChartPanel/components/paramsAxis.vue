<template>
  <div id="paramsAsis">
    <div class="asisContainer">
      <div class="paramsList">
        <div v-for="(value, key, index) in allOption[activeIndex]" :key="key">
          <div
            v-if="
              (key as any) != 'nameTextStyle' &&
              (key as any) != 'axisLine' &&
              (key as any) != 'axisTick' &&
              (key as any) != 'axisLabel' &&
              (key as any) != 'type'
            "
            :class="[
              (key as any) != 'nameTextStyle' &&
              (key as any) != 'axisLine' &&
              (key as any) != 'axisTick' &&
              (key as any) != 'axisLabel' &&
              (key as any) != 'type'
                ? 'optionItem'
                : '',
            ]"
          >
            <div>
              {{ opNameList ? opNameList[(key as any)] : "" }}
            </div>
            <div class="optionOperation">
              <el-switch
                v-if="(key as any) == 'show' || (key as any) == 'inverse'"
                size="small"
                v-model="defaultOption[activeIndex][(key as any)]"
              />
              <el-select
                v-else-if="(key as any) == 'position' || (key as any) == 'nameLocation'"
                popper-class="paramsSelectPopperClass"
                v-model="defaultOption[activeIndex][(key as any)]"
                size="small"
              >
                <el-option
                  v-for="item in allOption[activeIndex][(key as any)]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-input-number
                v-else-if="
                  (key as any) == 'offset' || (key as any) == 'nameGap' || (key as any) == 'nameRotate'
                "
                size="small"
                v-model="defaultOption[activeIndex][(key as any)]"
              />
              <el-input
                v-if="(key as any) == 'name'"
                size="small"
                v-model="defaultOption[activeIndex][(key as any)]"
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
            <div class="chlidOptionTitle" :title="opNameList[(key as any)]">
              {{ opNameList[(key as any)] }}
            </div>
            <div class="childOptionItemOperation">
              <el-input-number
                v-if="
                  (key as any) == 'fontSize' ||
                  (key as any) == 'borderWidth' ||
                  (key as any) == 'borderRadius' ||
                  (key as any) == 'padding' ||
                  (key as any) == 'shadowBlur' ||
                  (key as any) == 'shadowOffsetX' ||
                  (key as any) == 'shadowOffsetY' ||
                  (key as any) == 'textShadowBlur' ||
                  (key as any) == 'textShadowOffsetX' ||
                  (key as any) == 'textShadowOffsetY'
                "
                size="small"
                :min="0"
                v-model="defaultOption[activeIndex].nameTextStyle[(key as any)]"
              />
              <el-color-picker
                v-else-if="
                  (key as any) == 'color' ||
                  (key as any) == 'backgroundColor' ||
                  (key as any) == 'borderColor' ||
                  (key as any) == 'shadowColor' ||
                  (key as any) == 'textShadowColor'
                "
                v-model="defaultOption[activeIndex].nameTextStyle[(key as any)]"
              />
              <el-select
                v-else-if="(key as any) == 'fontWeight' || (key as any) == 'fontFamily'"
                popper-class="paramsSelectPopperClass"
                v-model="defaultOption[activeIndex].nameTextStyle[(key as any)]"
                size="small"
              >
                <el-option
                  v-for="item in allOption[activeIndex].nameTextStyle[(key as any)]"
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
              {{ opNameList[(key as any)] }}
            </div>
            <div class="childOptionItemOperation">
              <el-color-picker
                v-if="(key as any) == 'color' || (key as any) == 'shadowColor'"
                v-model="defaultOption[activeIndex].axisLine.lineStyle[(key as any)]"
              />
              <el-input-number
                v-else-if="
                  (key as any) == 'width' ||
                  (key as any) == 'shadowBlur' ||
                  (key as any) == 'shadowOffsetX' ||
                  (key as any) == 'shadowOffsetY'
                "
                :min="0"
                size="small"
                v-model="defaultOption[activeIndex].axisLine.lineStyle[(key as any)]"
              />
              <el-select
                v-else-if="(key as any) == 'type'"
                popper-class="paramsSelectPopperClass"
                v-model="defaultOption[activeIndex].axisLine.lineStyle[(key as any)]"
                size="small"
              >
                <el-option
                  v-for="item in allOption[activeIndex].axisLine.lineStyle[(key as any)]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-input-number
                v-else-if="(key as any) == 'opacity'"
                :min="0"
                :max="1"
                :step="0.1"
                size="small"
                v-model="defaultOption[activeIndex].axisLine.lineStyle[(key as any)]"
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
              {{ opNameList[(key as any)] }}
            </div>
            <div class="childOptionItemOperation">
              <el-color-picker
                v-if="(key as any) == 'color' || (key as any) == 'shadowColor'"
                v-model="defaultOption[activeIndex].axisTick.lineStyle[(key as any)]"
              />
              <el-input-number
                v-else-if="
                  (key as any) == 'width' ||
                  (key as any) == 'shadowBlur' ||
                  (key as any) == 'shadowOffsetX' ||
                  (key as any) == 'shadowOffsetY'
                "
                :min="0"
                size="small"
                v-model="defaultOption[activeIndex].axisTick.lineStyle[(key as any)]"
              />
              <el-select
                v-else-if="(key as any) == 'type'"
                popper-class="paramsSelectPopperClass"
                v-model="defaultOption[activeIndex].axisTick.lineStyle[(key as any)]"
                size="small"
              >
                <el-option
                  v-for="item in allOption[activeIndex].axisTick.lineStyle[(key as any)]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-input-number
                v-else-if="(key as any) == 'opacity'"
                :min="0"
                :max="1"
                :step="0.1"
                size="small"
                v-model="defaultOption[activeIndex].axisLine.lineStyle[(key as any)]"
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
            <div v-if="(key as any) != 'show'" class="chlidOptionTitle">
              {{ opNameList[(key as any)] }}
            </div>
            <div class="childOptionItemOperation">
              <el-color-picker
                v-if="
                  (key as any) == 'color' ||
                  (key as any) == 'backgroundColor' ||
                  (key as any) == 'borderColor' ||
                  (key as any) == 'textBorderColor' ||
                  (key as any) == 'shadowColor' ||
                  (key as any) == 'textShadowColor'
                "
                v-model="defaultOption[activeIndex].axisLabel[(key as any)]"
              />
              <el-input-number
                v-else-if="
                  (key as any) == 'rotate' ||
                  (key as any) == 'margin' ||
                  (key as any) == 'fontSize' ||
                  (key as any) == 'borderWidth' ||
                  (key as any) == 'borderRadius' ||
                  (key as any) == 'padding' ||
                  (key as any) == 'shadowBlur' ||
                  (key as any) == 'shadowOffsetX' ||
                  (key as any) == 'shadowOffsetY' ||
                  (key as any) == 'textBorderWidth' ||
                  (key as any) == 'textShadowBlur' ||
                  (key as any) == 'textShadowOffsetX' ||
                  (key as any) == 'textShadowOffsetY'
                "
                :min="0"
                size="small"
                v-model="defaultOption[activeIndex].axisLabel[(key as any)]"
              />
              <el-select
                v-else-if="
                  (key as any) == 'type' ||
                  (key as any) == 'fontStyle' ||
                  (key as any) == 'fontWeight' ||
                  (key as any) == 'fontFamily' ||
                  (key as any) == 'borderType' ||
                  (key as any) == 'textBorderType'
                "
                popper-class="paramsSelectPopperClass"
                v-model="defaultOption[activeIndex].axisLabel[(key as any)]"
                size="small"
              >
                <el-option
                  v-for="item in allOption[activeIndex].axisLabel[(key as any)]"
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
  tempOption: any;
  allTempOption: any;
  activeIndex: number
}
let timer: any;

export default defineComponent({
  name: "paramsAsis",
  props: ["defaultOption", "allOption", "opNameList", "asis"],
  setup(props) {
    const _this: any = getCurrentInstance();
    const data: comInitData = reactive({
      activeIndex: 0,
      tempOption: null,
      allTempOption: null,
    });

    watch(
      () => props.defaultOption,
      (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          _this.proxy.$Bus.emit("optionChange", {
            [props.asis]: e,
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
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#paramsAsis {
  .asisContainer {
    // padding: 12px 0;
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