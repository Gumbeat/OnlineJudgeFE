<template>
  <Panel shadow>
    <div class="contest-header" slot="title">{{ contest.title }}
      <download-excel v-if="isContestAdmin"
                      :data = "excelData">
        <Button type="primary" size="small">Скачать Excel</Button>
      </download-excel>
    </div>
    <!--<div slot="extra">-->
      <!--<screen-full :height="18" :width="18" class="screen-full"></screen-full>-->
      <!--<Poptip trigger="hover" placement="left-start">-->
        <!--<Icon type="android-settings" size="20"></Icon>-->
        <!--<div slot="content" id="switches">-->
          <!--<p>-->
            <!--<span>Меню</span>-->
            <!--<i-switch v-model="showMenu"></i-switch>-->
            <!--<span>График</span>-->
            <!--<i-switch v-model="showChart"></i-switch>-->
          <!--</p>-->
          <!--<p>-->
            <!--<span>Автообновление(10с)</span>-->
            <!--<i-switch :disabled="refreshDisabled" @on-change="handleAutoRefresh"></i-switch>-->
          <!--</p>-->
          <!--<template v-if="isContestAdmin">-->
            <!--&lt;!&ndash;<p>&ndash;&gt;-->
              <!--&lt;!&ndash;<span>Настоящее Имя</span>&ndash;&gt;-->
              <!--&lt;!&ndash;<i-switch v-model="showRealName"></i-switch>&ndash;&gt;-->
            <!--&lt;!&ndash;</p>&ndash;&gt;-->
            <!--<p>-->
              <!--<span>Принудительное обновление</span>-->
              <!--<i-switch :disabled="refreshDisabled" v-model="forceUpdate"></i-switch>-->
            <!--</p>-->
          <!--</template>-->
          <!--<template>-->
           <!---->
          <!--</template>-->
        <!--</div>-->
      <!--</Poptip>-->
    <!--</div>-->
    <!--<div v-show="showChart" class="echarts">-->
      <!--<ECharts :options="options" ref="chart" auto-resize></ECharts>-->
    <!--</div>-->
    <Table ref="tableRank" class="auto-resize" :columns="columns" :data="dataRank" disabled-hover></Table>

    <Pagination :total="total"
                :page-size.sync="limit"
                :current.sync="page"
                @on-change="getContestRankData"
                @on-page-size-change="getContestRankData(1)"
                show-sizer></Pagination>

  </Panel>


</template>
<script>
  import moment from 'moment'
  import { mapActions } from 'vuex'

  import Pagination from '@oj/components/Pagination'
  import ContestRankMixin from './contestRankMixin'
  import time from '@/utils/time'
  import utils from '@/utils/utils'

  export default {
    name: 'acm-contest-rank',
    components: {
      Pagination
    },
    mixins: [ContestRankMixin],
    data () {
      return {
        total: 0,
        page: 1,
        contestID: '',
        columns: [
          {
            align: 'center',
            width: 60,
            render: (h, params) => {
              return h('span', {}, params.index + (this.page - 1) * this.limit + 1)
            }
          },
          {
            title: 'Пользователь',
            align: 'center',
            render: (h, params) => {
              return h('a', {
                style: {
                  display: 'inline-block',
                  'max-width': '150px'
                },
                on: {
                  click: () => {
                    this.$router.push(
                      {
                        name: 'user-home',
                        query: {username: params.row.user.username}
                      })
                  }
                }
              }, params.row.user.username)
            }
          },
          {
            title: 'Учебное заведение',
            align: 'center',
            render: (h, params) => {
              console.log(params.row.user)
              return h('span', params.row.user.mood)
            }
          },
          {
            title: 'Решено / Отправлено',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('span', {}, [
                h('span', {}, params.row.accepted_number + ' / '),
                h('a', {
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'contest-submission-list',
                        query: {username: params.row.user.username}
                      })
                    }
                  }
                }, params.row.submission_number)
              ])
            }
          },
          {
            title: 'Общее время',
            align: 'center',
            render: (h, params) => {
              return h('span', this.parseTotalTime(params.row.total_time))
            }
          }
        ],
        dataRank: [],
        excellDataRank: [],
        options: {
          title: {
            text: 'Топ 10',
            left: 'center'
          },
          dataZoom: [
            {
              type: 'inside',
              filterMode: 'none',
              xAxisIndex: [0],
              start: 0,
              end: 100
            }
          ],
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {show: true, title: 'сохранить как изображение'}
            },
            right: '5%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              axis: 'x'
            }
          },
          legend: {
            orient: 'vertical',
            y: 'center',
            right: 0,
            data: [],
            formatter: (value) => {
              return utils.breakLongWords(value, 16)
            },
            textStyle: {
              fontSize: 12
            }
          },
          grid: {
            x: 80,
            x2: 200
          },
          xAxis: [{
            type: 'time',
            splitLine: false,
            axisPointer: {
              show: true,
              snap: true
            }
          }],
          yAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: [0]
            }],
          series: []
        }
      }
    },
    mounted () {
      this.contestID = this.$route.params.contestID
      this.getContestRankData(1)
      if (this.contestProblems.length === 0) {
        this.getContestProblems().then((res) => {
          this.addTableColumns(res.data.data)
          this.addChartCategory(res.data.data)
        })
      } else {
        this.addTableColumns(this.contestProblems)
        this.addChartCategory(this.contestProblems)
      }
    },
    computed: {
      excelData () {
        let data = []
        this.excellDataRank.forEach(user => {
          data.push({
            'Позиция': user.id,
            'Имя': user.user.real_name,
            'Учебное заведение': user.user.mood,
            'Решено задач': user.accepted_number
          })
        })
        return data
      }
    },
    methods: {
      ...mapActions(['getContestProblems']),
      addChartCategory (contestProblems) {
        let category = []
        for (let i = 0; i <= contestProblems.length; ++i) {
          category.push(i)
        }
        this.options.yAxis[0].data = category
      },
      applyToChart (rankData) {
        let [users, seriesData] = [[], []]
        rankData.forEach(rank => {
          users.push(rank.user.username)
          let info = rank.submission_info
          // 提取出已AC题目的时间
          let timeData = []
          Object.keys(info).forEach(problemID => {
            if (info[problemID].is_ac) {
              timeData.push(info[problemID].ac_time)
            }
          })
          timeData.sort((a, b) => {
            return a - b
          })

          let data = []
          data.push([this.contest.start_time, 0])
          // index here can be regarded as stacked accepted number count.
          for (let [index, value] of timeData.entries()) {
            let realTime = moment(this.contest.start_time).add(value, 'seconds').format()
            data.push([realTime, index + 1])
          }
          seriesData.push({
            name: rank.user.username,
            type: 'line',
            data
          })
        })
        this.options.legend.data = users
        this.options.series = seriesData
      },
      applyToTable (data) {
        this.excellDataRank = JSON.parse(JSON.stringify(data))
        let dataRank = JSON.parse(JSON.stringify(data))
        dataRank.forEach((rank, i) => {
          let info = rank.submission_info
          let cellClass = {}
          Object.keys(info).forEach(problemID => {
            dataRank[i][problemID] = info[problemID]
            dataRank[i][problemID].ac_time = time.secondFormat(dataRank[i][problemID].ac_time)
            let status = info[problemID]
            if (status.is_first_ac) {
              cellClass[problemID] = 'first-ac'
            } else if (status.is_ac) {
              cellClass[problemID] = 'ac'
            } else {
              cellClass[problemID] = 'wa'
            }
          })
          dataRank[i].cellClassName = cellClass
        })
        this.dataRank = dataRank
      },
      addTableColumns (problems) {
        problems.forEach(problem => {
          this.columns.push({
            align: 'center',
            key: problem.id,
            renderHeader: (h, params) => {
              return h('a', {
                'class': {
                  'emphasis': true
                },
                on: {
                  click: () => {
                    this.$router.push({
                      name: 'contest-problem-details',
                      params: {
                        contestID: this.contestID,
                        problemID: problem._id
                      }
                    })
                  }
                }
              }, problem._id)
            },
            render: (h, params) => {
              if (params.row[problem.id]) {
                let status = params.row[problem.id]
                let acTime, errorNumber
                if (status.is_ac) {
                  acTime = h('span', status.ac_time)
                }
                if (status.error_number !== 0) {
                  errorNumber = h('p', '(-' + status.error_number + ')')
                }
                return h('div', [acTime, errorNumber])
              }
            }
          })
        })
      },
      parseTotalTime (totalTime) {
        let m = moment.duration(totalTime, 's')
        return [Math.floor(m.asHours()), m.minutes(), m.seconds()].join(':')
      },
      downloadRankCSV () {
        utils.downloadFile(`contest_rank?download_csv=1&contest_id=${this.$route.params.contestID}&force_refresh=${this.forceUpdate ? '1' : '0'}`)
      }
    }
  }
</script>
<style scoped lang="less">

  .contest-header {
    display: flex;
    justify-content: space-between;
  }

  .echarts {
    margin: 20px auto;
    height: 400px;
    width: 98%;
  }

  .screen-full {
    margin-right: 8px;
  }

  #switches {
    p {
      margin-top: 5px;
      &:first-child {
        margin-top: 0;
      }
      span {
        margin-left: 8px;
      }
    }
  }
</style>
