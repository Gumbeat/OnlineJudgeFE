<template>
  <Row type="flex" justify="space-around">
    <Col :span="24">
    <panel shadow v-if="contests.length" class="contest">
      <div slot="title">
        <Button type="text"  class="contest-title" @click="goContest">{{contests[index].title}}</Button>
      </div>
      <Carousel v-model="index" trigger="hover" autoplay :autoplay-speed="6000" class="contest contest-announce">
        <CarouselItem v-for="(contest, index) of contests" :key="index">
          <div class="contest-content">
            <div class="contest-content-tags">
              <Button type="info" shape="circle" size="small" icon="calendar">
                {{contest.start_time | localtime('YYYY-M-D HH:mm') }}
              </Button>
              <!--<Button type="success" shape="circle" size="small" icon="android-time">-->
                <!--{{getDuration(contest.start_time, contest.end_time)}}-->
              <!--</Button>-->
              <!--<Button type="warning" shape="circle" size="small" icon="trophy">-->
                <!--{{contest.rule_type}}-->
              <!--</Button>-->
            </div>
            <div class="contest-content-description">
              <blockquote v-html="contest.description"></blockquote>
            </div>
          </div>
        </CarouselItem>
      </Carousel>
    </panel>
    <div class="dcp_class">
      <h1>Добро пожаловать на олимпиаду по программированию!</h1>

      <div class="wrapper">
        <p>Олимпиада проводится кафедрой «Программная инженерия» факультета компьютерных наук и технологий ГОУВПО «Донецкий национальный технический университет» (ДонНТУ), г. Донецк, Донецкая Народная Республика.</p>
        <br>
        <p>Более подробно с условиями проведения олимпиады можно ознакомиться <a href="http://pi.olymp.donntu.org" target="_blank">на нашем сайте</a></p>
        <br>
        <p>Прежде, чем приступить к решению задач, ознакомьтесь с <a href="/FAQ" target="_blank">основными правилами олимпиадной системы</a></p>

      </div>
      <div class="dcp_class_img">
        <img width="90" height="100" src="../../../../assets/logo.png" alt="logo_donntu" />
      </div>
       </div>
    </Col>
  </Row>
</template>

<script>
  import Announcements from './Announcements.vue'
  import api from '@oj/api'
  import time from '@/utils/time'
  import { CONTEST_STATUS } from '@/utils/constants'

  export default {
    name: 'home',
    components: {
      Announcements
    },
    data () {
      return {
        contests: [],
        index: 0
      }
    },
    mounted () {
      let params = {status: CONTEST_STATUS.NOT_START}
      api.getContestList(0, 5, params).then(res => {
        this.contests = res.data.data.results
      })
    },
    methods: {
      getDuration (startTime, endTime) {
        return time.duration(startTime, endTime)
      },
      goContest () {
        this.$router.push({
          name: 'contest-details',
          params: {contestID: this.contests[this.index].id}
        })
      }
    }
  }
</script>

<style lang="less" scoped>

  .dcp_class {
    padding: 30px;
    background-color: white;
    font-size: 15px;
    border-radius: 3px;

    > p {
      word-break: break-word;
    }

    .dcp_class_img {
      text-align: center;
      padding-top: 20px;
    }

  }

  .wrapper {
    margin-top: 30px;
  }

  .contest {
    &-title {
      font-style: italic;
      font-size: 21px;
    }
    &-announce {
      margin-bottom: 20px;
    }

    &-content {
      padding: 0 70px 40px 70px;
      &-description {
        margin-top: 25px;
      }
    }
  }

  .announcement {
    margin-top: 20px;
  }
</style>
