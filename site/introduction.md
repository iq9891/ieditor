# 简单使用
> Vue.js 2.x 示例

<div id="ied" class="ied" ref="ied"></div>

<script>
import IEditor from '../src/core/ieditor';

export default {
  mounted() {
    const edit = new IEditor(this.$refs.ied);
    edit.init();
    console.log(edit, 'IEditor');
  }
};
</script>

<!-- <div>
  <p>
    <input type="file" @change="changeFile">
    <button @click="boldFn">加粗{{activeDatas.bold}}</button>
    <select @change="fontsizeFn" v-model="activeDatas.fontsize">
      <option value="false">选择字号</option>
      <option :value="slist" v-for="(slist, index) in sizeList" :key="index">{{slist}}</option>
    </select>
  </p>
  <p>
  </p>
  <div ref="text" contenteditable="true" class="diy-text"></div>
</div>

<script>
import IEditor from '../src/core/ieditor';

export default {
  data() {
    return {
      sizeList: ['20px', '30px'],
      activeDatas: {
        fontsize: false,
        bold: false,
      },
    };
  },
  mounted() {
    // const edit = new IEditor(this.$refs.ied);
    this.edit = new IEditor({
      // el: this.$refs.ied,
      diy: {
        menu: true,
        text: this.$refs.text,
        active: result => {
          this.handleActive(result);
        },
      },
    });

    this.edit.init();
  },
  methods: {
    handleActive(result) {
      Object.keys(result).forEach(resultKey => {
        let oneActive = result[resultKey];
        if (resultKey === 'fontsize') {
          oneActive = this.sizeList.indexOf(result[resultKey]) > -1 ? result[resultKey] : false;
        }
        Object.assign(this.activeDatas, {
          [resultKey]: oneActive
        });
      });
    },
    boldFn() {
      this.edit.menu.clicks.bold();
    },
    fontsizeFn(ev) {
      this.edit.menu.clicks.fontsize(ev.target.value);
    },
    changeFile(ev) {
      this.edit.menu.clicks.image(ev);
    },
  },
};
</script> -->

<style lang="scss">
// IEditor 样式
@import './style/ieditor.scss';

.diy-text {
  border: 2px solid #1996f9;
  height: 200px;
  overflow: auto;
}
</style>
