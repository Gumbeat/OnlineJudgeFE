<template>
  <div>
    <Panel>
      <div slot="title">{{$t('m.Problems_List')}}</div>
      <Table v-if="contestRuleType == 'ACM' || OIContestRealTimePermission"
             :columns="ACMTableColumns"
             :data="problems"
             @on-row-click="goContestProblem"
             no-data-text="Нет задач"></Table>
      <Table v-else
             :data="problems"
             :columns="OITableColumns"
             @on-row-click="goContestProblem"
             no-data-text="Нет задач"></Table>
    </Panel>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import {ProblemMixin} from '@oj/components/mixins'

  export default {
    name: 'ContestProblemList',
    mixins: [ProblemMixin],
    data () {
      return {
        ACMTableColumns: [
          {
            title: '#',
            key: '_id',
            sortType: 'asc',
            width: 150
          },
          {
            title: 'Название',
            key: 'title'
          },
          {
            title: 'Всего',
            key: 'submission_number'
          },
          {
            title: 'Успешность решений',
            render: (h, params) => {
              return h('span', this.getACRate(params.row.accepted_number, params.row.submission_number))
            }
          }
        ],
        OITableColumns: [
          {
            title: '#',
            key: '_id',
            width: 150
          },
          {
            title: 'Название',
            key: 'title'
          }
        ]
      }
    },
    mounted () {
      this.getContestProblems()
    },
    methods: {
      getContestProblems () {
        this.$store.dispatch('getContestProblems').then(res => {
          if (this.isAuthenticated) {
            if (this.contestRuleType === 'ACM') {
              this.addStatusColumn(this.ACMTableColumns, res.data.data)
            } else if (this.OIContestRealTimePermission) {
              this.addStatusColumn(this.ACMTableColumns, res.data.data)
            }
          }
        })
      },
      goContestProblem (row) {
        this.$router.push({
          name: 'contest-problem-details',
          params: {
            contestID: this.$route.params.contestID,
            problemID: row._id
          }
        })
      }
    },
    computed: {
      ...mapState({
        problems: state => state.contest.contestProblems
      }),
      ...mapGetters(['isAuthenticated', 'contestRuleType', 'OIContestRealTimePermission'])
    }
  }
</script>

<style scoped lang="less">
</style>
