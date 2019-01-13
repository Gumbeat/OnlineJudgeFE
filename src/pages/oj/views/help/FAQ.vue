<template>
  <panel>
    <div slot="title">{{$t('m.Frequently_Asked_Questions')}}</div>
    <div class="content markdown-body">
      <ul>
        <li>Как происходит ввод и вывод?
          <p>Ваша программа будет считывать исходные данные с консоли и выводить результирующие данные также в консоль.
            Например, вы можете использовать <code>scanf</code> в C или <code>cin</code> в C++ для получения исходных данных, и использовать <code>printf</code> в C или <code>cout</code> в C++ для вывода результирующих данных.
            Программам не разрешается считывать файлы или писать в них, иначе произойдёт ошибка выполнения.
          </p>
        </li>
        <li>Что значит время выполнения решения?
        <p>Система может тестировать ваш код несколько раз с разными входными данными.
          Если ваша программа получит правильный ответ на всех тестах, показанное время выполнения - максимальное время среди всех проверенных тестов.
        </p>
        </li>
        <li>Как использовать Int64 в C++?
          <p>Вам нужно объявить <code>long long</code> и использовать его с <code>cin/cout</code> или <code>%lld</code>, использование<code> __int64</code> приведёт к ошибке компиляции.</p>
        </li>
        <li>Особенности Java?
          <p>Все программы должны быть описаны с помощью статического метода в классе <code>Main</code>. Не используйте public классы: даже <code>Main</code> должен быть не public для избежания ошибки компиляции.</p>
        </li>
      </ul>
    </div>
  </panel>
</template>

<script>
</script>

<style lang="less" scoped>
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
        }
      }
    }
  }
</style>
