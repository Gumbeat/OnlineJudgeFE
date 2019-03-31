<template>
  <div>
    <panel>
      <div slot="title">{{$t('m.Frequently_Asked_Questions')}}</div>
      <div class="content markdown-body">
        <ul>
          <li>Ввод и вывод данных
            <p><b> Программа должна считывать исходные данные из консоли и выводить результирующие данные также в консоль </b>
              Например, вы можете использовать <code>scanf</code> в C или <code>cin</code> в C++ для получения исходных данных, и использовать <code>printf</code> в C или <code>cout</code> в C++ для вывода результирующих данных.
              Программам не разрешается считывать файлы или писать в них, иначе произойдёт ошибка выполнения.
            </p>
            <br>
            <p><b> Не выводить ничего в консоль, кроме ответа, который требуется в задаче. </b>
              Например, не выводить фразы по типу "Введите а:".
            </p>
          </li>
          <li>Стандартный разделитель
            <p>Для всех языков данной системы стандартным разделителем в числа с плавающей точкой является <b>точка</b>>. Например: 1.5, 6.87, 12.76.
            </p>
          </li>
          <li>Внешние ресурсы
            <p>В коде разрешается использовать только стандартные библиотеки. В противном случае произойдёт ошибка компиляции.
               Не разрешается использовать прекомпилированные заголовки в C/C++ и <code>package</code> в Java.
            </p>
            <br>
            <p>Список стандартных библиотек для некоторых языков</p>
            <ul>
              <li class="libs_el" @click="showLibs('C')">C</li>
              <li class="libs_el" @click="showLibs('C++')">C++</li>
            </ul>
          </li>
          <li>Особенности использования C++
            <p>Не разрешается использование типа <code> __int64</code>, он приведёт к ошибке компиляции. Вместо него стоит использовать <code>long long</code></p>
            <p>Не разрешается использование предварительно откомпилированных заголовков, например <code>stdafx.h</code></p>
            <br>
            <p>Функция <code>int main()</code> не должна содержать параметров</p>
            <p> Не использовать библиотеку <code>conio.h</code> </p>
          </li>
          <li>Особенности использования C
            <p>Не разрешается использование предварительно откомпилированных заголовков, например <code>stdafx.h</code></p>
            <p>Функция <code>int main()</code> не должна содержать параметров</p>
            <p> Не использовать библиотеку <code>conio.h</code> </p>
            <p>Функция <code>int main()</code> не должна содержать параметров</p>
          </li>
          <li>Особенности Java
            <p>Все программы должны быть описаны с помощью статического метода в классе <code>Main</code>. </p>
            <p>Не используйте public классы: даже <code>Main</code> должен быть не public для избежания ошибки компиляции.
               Также в конечном коде не должен присутствовать <code>package</code>
            </p>
          </li>
          <li>Особенности C#
            <p>В случае, если ваш конечный код содержит <code>namespace</code> с именем неймспейса вашей программы, то его следует убрать, оставив только главный класс программы и используемые библиотеки.</p>
          </li>
          <li>Кодировки
            <p>Система поддерживает кодировку UTF-8</p>
          </li>
          <li>Прочее
            <p> В коде лучше <b>не обрабатывать исключения</b>, потому что тесты большинства задач не подразумевают возникновение исключений (если только об этом не сказано в условие задачи).
              Не использовать такие вещи, как <code>System.pause()</code>, <code> Console.Readline() </code> и т.д. в конце кода вашей программы.
            </p>
          </li>
          <li>Что влияет на конечные результаты в олимпиаде
            <p> В случае, если у двух или более человек одинаковое количество решённых задач, лучший из них будет выбираться по двум критериям:
              времени, потраченному, на решение задач и точности решения задач (отношению правильных решений к отправленным)
            </p>
          </li>
        </ul>
      </div>
    </panel>
    <panel>
      <div slot="title">Объяснение результата</div>
      <div class="content markdown-body">
        <ul>
          <li><b>В ожидании</b> и <b>Оценивается</b> : {{$t('m.Pending_Juding')}}</li>
          <li><b>Ошибка компиляции</b> :	{{$t('m.Compile_Error')}}
          </li>
          <li><b>Принято</b> :	{{$t('m.Accepted')}}</li>
          <li><b>Неправильный ответ</b> :	{{$t('m.Wrong_Answer')}}</li>
          <li>
            <b>Ошибка исполнения</b>
            :	{{$t('m.Runtime_Error')}}
          </li>
          <li><b>Превышение лимита времени</b>
            :	{{$t('m.Time_Limit_Exceeded')}}
          </li>
          <li><b>Превышение лимита памяти</b> :	{{$t('m.Memory_Limit_Exceeded')}}</li>
          <li><b>Системная ошибка</b> :	{{$t('m.System_Error')}}
          </li>
        </ul>
      </div>
    </panel>
    <Modal v-model="modalVisible">
      <div slot="header" class="modal-title">Список допустимых библиотек {{ currentLang }}</div>
      <ul class="libs_ul">
        <li v-for="lib in libs[currentLang]">
          {{ lib }}
        </li>
      </ul>
    </Modal>
  </div>

</template>

<script>
  import utils from '@/utils/utils'

  export default {
    name: 'FAQ',
    data () {
      return {
        languages: [],
        currentLang: '',
        libs: {
          'C': [
            'assert.h',
            'complex.h (C99)',
            'ctype.h',
            'errno.h',
            'fenv.h (C99)',
            'float.h',
            'inttypes.h (C99)',
            'iso646.h',
            'limits.h',
            'locale.h',
            'math.h',
            'setjmp.h',
            'signal.h',
            'stdalign.h (C11)',
            'stdarg.h',
            'stdatomic.h (C11)',
            'stdbool.h (C99)',
            'stddef.h',
            'stdint.h (C99)',
            'stdio.h',
            'stdlib.h',
            'stdnoreturn.h (C11)',
            'string.h',
            'tgmath.h',
            'threads.h (C11)',
            'time.h',
            'uchar.h (C11)',
            'wchar.h',
            'wctype.h'
          ],
          'C++': [
            'fstream',
            'iomanip',
            'ios',
            'iosfwd',
            'iostream (ostream, istream)',
            'sstream',
            'streambuf',
            'atomic (C++11)',
            'condition_variable (C++11)',
            'future (C++11)',
            'mutex (C++11)',
            'shared_mutex (C++14)',
            'thread (C++11)',
            'algorithm',
            'bitset',
            'chrono (C++11)',
            'codecvt (C++11)',
            'complex',
            'exception',
            'functional',
            'initializer_list (C++11)',
            'iterator',
            'limits',
            'locale',
            'memory',
            'new',
            'numeric',
            'random (C++11)',
            'ratio (C++11)',
            'regex (C++11)',
            'stdexcept',
            'string',
            'system_error (C++11)',
            'tuple (C++11)',
            'typeindex (C++11)',
            'typeinfo',
            'type_traits (C++11)',
            'utility',
            'valarray',
            'array (C++11)',
            'deque',
            'forward_list (C++11)',
            'list',
            'vector',
            'map',
            'set',
            'multimap',
            'multiset',
            'unordered_map (C++11)',
            'unordered_set (C++11)',
            'unordered_multimap (C++11)',
            'unordered_multiset (C++11)',
            'stack',
            'priority_queue',
            'queue'
          ]
        },
        modalVisible: false
      }
    },
    methods: {
      showLibs (lang) {
        this.currentLang = lang
        this.modalVisible = true // !this.modalVisible
      }
    },
    beforeRouteEnter (to, from, next) {
      utils.getLanguages().then(languages => {
        next(vm => {
          vm.languages = languages
        })
      })
    }
  }
</script>

<style lang="less" scoped>

  .modal {
    &-title {
      font-size: 18px;
      font-weight: 600;
    }
  }

  .libs_ul {
    padding: 35px;
  }

  .libs_el {
    color: #09f;
    max-width: fit-content;

   &:hover {
     text-decoration: underline;
     cursor: pointer;
   }
  }

  .content {
    font-size: 16px;
    margin: 0 50px 40px 50px;
    > ul {
      list-style: disc;
      li {
        font-size: 16px;
        margin-top: 20px;
        &:first-child {
          margin-top: 0;
        }
        p {
          font-size: 14px;
          margin-top: 5px;
          word-break: break-word;
        }
      }
    }
  }
</style>
