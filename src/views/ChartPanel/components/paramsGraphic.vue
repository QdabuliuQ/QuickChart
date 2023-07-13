<template>
  <div class="paramsGraphic">
    <div class="manageGraphic" @click="drawer = true"><i class="iconfont i_manage"></i> 管理图形组件</div>
    <el-drawer
      v-model="drawer"
      :size="'35%'"
      title="管理图形组件"
      custom-class="graphicManageDrawerClass"
      :direction="'rtl'"
      :before-close="handleClose"
      @open="drawerOpen"
    >
      <graphicComItem
        @delete-item="deleteItem"
        @toggle-item="toggleItem"
        @add-item="addItem"
        :components="config"
      />
      <optionItems v-if="config.length" :config="config[activeIdx]" />
      <el-empty v-else description="暂无内容信息" />
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  reactive, ref
} from "vue";
import useProxy from "@/hooks/useProxy";
import {ConfigInt} from "@/types/common";
import { common, label } from '@/chartConfig/opname';
import useCommonStore from "@/store/common";
import optionItems from '@/components/optionItems.vue'
import graphicComItem from "@/components/graphicComItem.vue"
import { ElMessageBox } from "element-plus";
const proxy = useProxy()
const _common: any = useCommonStore()
const drawer = ref<boolean>(false)
let config = reactive<ConfigInt[]>([])
const activeIdx = ref<number>(0)

const drawerOpen = () => {
  getConfigs(_common.option.graphic)
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('是否保存当前的图形组件？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(() => {
    let g = coveyConfigToOption(config)
    console.log(g)
    proxy.$Bus.emit("optionChange", {
      graphic: g,
    });
    done()
  }).catch(() => {
    done()
  })
}
const coveyConfigToOption = (config: ConfigInt[]): any[] => {
  let options: any[] = []
  for(let item of config) {
    let option: any = {}
    for(let key in item) {
      if(item[key].hasOwnProperty('attr')) {
        let attrs: string[] = (item[key]['attr'] as string).split('.')
        let p = option
        for(let prop of attrs) {
          if(!p[prop]) {
            p[prop] = {}
          }
          p = p[prop]
        }
        if(key == 'left' || key == 'top') {
          p[key] = item[key]["value"] + '%'
        } else {
          p[key] = item[key]["value"]
        }
      } else {
        if(key == 'left' || key == 'top') {
          option[key] = item[key]["value"] + '%'
        } else {
          option[key] = item[key]["value"]
        }
      }
    }
    options.push(option)
  }
  return options
}

// 删除内容
const deleteItem = (idx: number) => {
  config.splice(idx, 1)
}
// 添加内容
const addItem = (type: string) => {
  config.push(getDefaultConfig(type) as ConfigInt)
}
// 切换内容
const toggleItem = (idx: number) => {
  activeIdx.value = idx
}
const getConfigs = (options: any[]) => {
  config.length = 0
  for(let item of options) {
    if(item.type == 'text') {
      config.push({
        type: {
          type: null,
          value: item.type
        },
        text: {
          type: 'input_text',
          title: '文本内容',
          value: item.style.text,
          attr: 'style'
        },
        left: {
          type: 'input_number',
          title: common.left + '(%)',
          max: 100,
          value: parseInt(item.left)
        },
        top: {
          type: 'input_number',
          title: common.top + '(%)',
          max: 100,
          value: parseInt(item.top)
        },
        fill: {
          type: 'color_picker',
          title: common.color,
          value: item.style.fill,
          attr: 'style'
        },
        fontSize: {
          type: 'input_number',
          title: label.fontSize,
          value: item.style.fontSize,
          attr: 'style'
        },
        rotation: {
          type: 'input_number',
          title: label.rotate,
          max: 360,
          min: -360,
          value: item.rotation
        }
      })
    } else if(item.type == 'image') {
      config.push({
        type: {
          type: null,
          value: item.type
        },
        image: {
          type: 'imgload',
          title: '图片上传',
          value: item.style.image,
          attr: 'style'
        },
        left: {
          type: 'input_number',
          title: common.left + '(%)',
          max: 100,
          value: parseInt(item.left)
        },
        top: {
          type: 'input_number',
          title: common.top + '(%)',
          max: 100,
          value: parseInt(item.top)
        },
        width: {
          type: 'input_number',
          title: common.width,
          max: 3000,
          value: item.style.width,
          attr: 'style'
        },
        height: {
          type: 'input_number',
          title: common.height,
          max: 3000,
          value: item.style.height,
          attr: 'style'
        },
        rotation: {
          type: 'input_number',
          title: label.rotate,
          max: 360,
          min: -360,
          value: item.rotation
        }
      })
    }
  }
}

const getDefaultConfig = (type: string): ConfigInt => {
  switch (type) {
    case 'text':
      return {
        type: {
          type: null,
          value: 'text'
        },
        text: {
          type: 'input_text',
          title: '文本内容',
          value: '',
          attr: 'style'
        },
        left: {
          type: 'input_number',
          title: common.left + '(%)',
          value: 0
        },
        top: {
          type: 'input_number',
          title: common.top + '(%)',
          value: 0
        },
        fill: {
          type: 'color_picker',
          title: common.color,
          value: null,
          attr: 'style'
        },
        fontSize: {
          type: 'input_number',
          title: label.fontSize,
          value: 24,
          attr: 'style'
        },
        rotation: {
          type: 'input_number',
          title: label.rotate,
          max: 360,
          min: -360,
          value: 0
        }
      }
    case 'image':
      return {
        type: {
          type: null,
          value: 'image'
        },
        image: {
          type: 'imgload',
          title: '图片上传',
          value: '',
          attr: 'style'
        },
        left: {
          type: 'input_number',
          title: common.left + '(%)',
          value: 0
        },
        top: {
          type: 'input_number',
          title: common.top + '(%)',
          value: 0
        },
        width: {
          type: 'input_number',
          title: common.width,
          max: 3000,
          value: 0,
          attr: 'style'
        },
        height: {
          type: 'input_number',
          title: common.height,
          max: 3000,
          value: 0,
          attr: 'style'
        },
        rotation: {
          type: 'input_number',
          title: label.rotate,
          max: 360,
          min: -360,
          value: 0
        }
      }
    default:
      return {}
  }
}
</script>

<style lang="less">
.graphicManageDrawerClass {
  .el-drawer__header {
    margin-bottom: 20px;
  }
}
.paramsGraphic {
  .manageGraphic {
    padding: 8px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    cursor: pointer;
    border-radius: 20px;
    background-color: transparent;
    border: 1px solid #777676;
    box-sizing: border-box;
    color: #fff;
    letter-spacing: 2px;
    margin: 10px 10px;
    i {
      font-size: 12px;
      margin-right: 8px;
    }
    &:hover {
      background-color: #4f4f4f;
    }
  }
}
</style>