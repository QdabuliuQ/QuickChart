<template>
  <div id="paramsBarPolar">
    <div class="uniqueOptionContainer">
      <div class="seriesItem">
        <div style="width: 100%">(%)内圈大小</div>
        <div class="optionOperation">
          <el-input-number
            size="small"
            v-model="innerSize"
            :min="1"
            :max="100"
            @change="handleChange"
          />
        </div>
      </div>
      <div class="seriesItem">
        <div style="width: 100%">(%)外圈大小</div>
        <div class="optionOperation">
          <el-input-number
            size="small"
            v-model="outerSize"
            :min="1"
            :max="100"
            @change="handleChange"
          />
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
  getCurrentInstance,
} from "vue";
import useCommonStore from "@/store/common";

interface comInitData {
  innerSize: number;
  outerSize: number;
}

export default defineComponent({
  name: "paramsBarPolar",
  setup() {
    const _this: any = getCurrentInstance();
    const common: any = useCommonStore();
    const data: comInitData = reactive({
      innerSize: 0,
      outerSize: 0,
    });

    data.innerSize = common.option.polar.radius[0];
    data.outerSize = parseInt(common.option.polar.radius[1]);

    const handleChange = () => {
      _this.proxy.$Bus.emit('optionChange', {
        polar: {
          radius: [data.innerSize, data.outerSize + '%']
        },
      })
    }

    return {
      handleChange,
      ...toRefs(data),
    };
  },
});
</script>

<style lang='less'>
#paramsBarPolar {
}
</style>