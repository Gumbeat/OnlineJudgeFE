<template>
  <div style="margin: 0px 0px 15px 0px">
    <Row type="flex" justify="space-between" class="header">
      <Col :span=8>
      <div>
        <span>Язык:</span>
        <Select :value="language"  @on-change="onLangChange" class="adjust">
          <Option v-for="item in languages" :key="item" :value="item">{{item}}
          </Option>
        </Select>

        <Tooltip content="Сбросить до кода по умолчанию" placement="top" style="margin-left: 10px">
          <Button icon="refresh" @click="onResetClick"></Button>
        </Tooltip>

      </div>
      </Col>
      <Col v-if="restriction" :span="10">
        <div class="restriction">
          <span>Примечание: {{restriction}}</span>
        </div>
      </Col>
      <Col :span=6>
      <div class="fl-right">
        <span>Тема:</span>
        <Select :value="theme" @on-change="onThemeChange" class="adjust">
          <Option v-for="item in themes" :key="item.label" :value="item.value">{{item.label}}
          </Option>
        </Select>
      </div>
      </Col>
    </Row>
    <codemirror :value="value" :options="options" @change="onEditorCodeChange" ref="myEditor">
    </codemirror>
  </div>
</template>
<script>
  import utils from '@/utils/utils'
  import { codemirror } from 'vue-codemirror-lite'

  // theme
  import 'codemirror/theme/monokai.css'
  import 'codemirror/theme/solarized.css'
  import 'codemirror/theme/material.css'

  // mode
  import 'codemirror/mode/clike/clike.js'
  import 'codemirror/mode/python/python.js'

  // active-line.js
  import 'codemirror/addon/selection/active-line.js'

  // foldGutter
  import 'codemirror/addon/fold/foldgutter.css'
  import 'codemirror/addon/fold/foldgutter.js'
  import 'codemirror/addon/fold/brace-fold.js'
  import 'codemirror/addon/fold/indent-fold.js'

  export default {
    name: 'CodeMirror',
    components: {
      codemirror
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      languages: {
        type: Array,
        default: () => {
          return []
        }
      },
      language: {
        type: String,
        default: () => {
          return localStorage.getItem('lang') || 'C++'
        }
      },
      theme: {
        type: String,
        default: 'solarized'
      }
    },
    data () {
      return {
        options: {
          // codemirror options
          tabSize: 4,
          restriction: '',
          mode: 'text/x-csrc',
          theme: 'solarized',
          lineNumbers: true,
          line: true,
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          styleSelectedText: true,
          lineWrapping: false,
          highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true}
        },
        mode: {
          'C++': 'text/x-csrc'
        },
        themes: [
          {label: 'Monokai', value: 'monokai'},
          {label: 'Solarized Light', value: 'solarized'},
          {label: 'Material', value: 'material'}
        ]
      }
    },
    mounted () {
      utils.getLanguages().then(languages => {
        let mode = {}
        languages.forEach(lang => {
          mode[lang.name] = lang.content_type
        })
        this.mode = mode
        this.editor.setOption('mode', this.mode[this.language])
      })
      this.editor.focus()
      this.changeRestriction(this.language)
    },
    methods: {
      onEditorCodeChange (newCode) {
        this.$emit('update:value', newCode)
      },
      onLangChange (newVal) {
        this.changeRestriction(newVal)
        this.editor.setOption('mode', this.mode[newVal])
        localStorage.setItem('lang', newVal)
        this.$emit('changeLang', newVal)
      },
      changeRestriction (lang) {
        const langRestrictions = {
          'C': 'Не использовать stdafx.h и conio.h. Функция int main() не должна содержать параметров',
          'C++': 'Не использовать stdafx.h и conio.h и тип данных Int64. Функция int main() не должна содержать параметров',
          'C#': 'Не использовать namespace в коде',
          'Java': 'Не использовать public классы. Главный класс должен называться Main. Убрать package, если он есть.'
        }
        if (lang in langRestrictions) {
          this.restriction = langRestrictions[lang]
        } else {
          this.restriction = ''
        }
      },
      onThemeChange (newTheme) {
        this.editor.setOption('theme', newTheme)
        this.$emit('changeTheme', newTheme)
      },
      onResetClick () {
        this.$emit('resetCode')
      }
    },
    computed: {
      editor () {
        // get current editor object
        return this.$refs.myEditor.editor
      }
    },
    watch: {
      'theme' (newVal, oldVal) {
        this.editor.setOption('theme', newVal)
      },
      language:
        function (newVal, oldVal) {
          this.onLangChange(newVal)
        }
    }
  }
</script>

<style lang="less" scoped>
  .restriction {
    padding: 5px;
    border: 1px solid orange;
    border-radius: 3px;
  }

  .header {
    margin: 5px 5px 15px 5px;
    .adjust {
      width: 150px;
      margin-left: 10px;
    }
    .fl-right {
      float: right;
    }
  }
</style>

<style>
  .CodeMirror {
    height: auto !important;
  }
  .CodeMirror-scroll {
    min-height: 300px;
    max-height: 1000px;
  }
</style>
