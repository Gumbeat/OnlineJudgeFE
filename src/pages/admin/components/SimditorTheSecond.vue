<template>
  <div class="editor-wrapper"><textarea ref="editor"></textarea></div>
</template>

<script>
  import Simditor from 'simditor'
  import 'simditor/styles/simditor.css'
  export default {
    name: 'SimditorTheSecond',
    props: {
      content: {
        type: String,
        default: ''
      },
      options: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        editor: ''
      }
    },
    watch: {
      content (val) {
        this.editor.setValue(val)
      }
    },
    mounted () {
      /* eslint-disable no-new */
      console.log(Object.assign({}, {
        textarea: this.$refs.editor
      }, this.options))
      this.editor = new Simditor(Object.assign({}, {
        textarea: this.$refs.editor
      }, this.options))
      this.editor.on('valuechanged', (e, src) => {
        this.valueChange(e, src)
      })
    },
    methods: {
      valueChange (e, val) {
        this.$emit('change', this.editor.getValue())
      }
    }
  }
</script>
