<template>
  <div class="schedule">
    <div
      class="schedule-top"
      :class="schedule.isMain ? 'schedule-top--main' : ''"
    >
      <h2 class="schedule__title">
        {{ schedule.name ? schedule.name : 'Часы работы' }}
      </h2>
      <span
        class="schedule__status"
        :class="
          isClosedSchedule
            ? 'schedule__status--close'
            : 'schedule__status--open'
        "
      >
        {{ isClosedSchedule ? 'закрыто' : 'открыто' }}
      </span>
    </div>
    <div class="weeks">
      <div class="week" v-for="(obj, time, index) in works" :key="index">
        <div class="week__days">
          {{
            obj.reduce
              ? `${obj.days[0]} - ${obj.days[obj.days.length - 1]}`
              : obj.days.join(', ')
          }}
        </div>
        <div class="week__time">
          {{ time === '00:00 - 23:59' ? 'круглосуточно' : time }}
        </div>
      </div>
      <div class="week" v-if="weekends.length > 0">
        <div class="week__days">
          {{ weekends.join(', ') }}
        </div>
        <div class="week__time">
          выходной
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    schedule: Object,
  },
  data() {
    return {
      currentDay: null,
      works: [],
      weekends: [],
    };
  },
  computed: {
    isClosedSchedule() {
      const workDay = this.schedule.items.find(
        (item) => item.dayOfWeek === this.currentDay.dayOfWeek,
      );
      let isClose = true;
      if (workDay) {
        let { startAt, endAt } = workDay;
        let isNextDay = false;
        if (
          parseInt(endAt.split(':')[0]) - parseInt(startAt.split(':')[0]) <
          0
        ) {
          isNextDay = true;
        }
        startAt = this.getMillesecondsInTime(startAt);
        endAt = this.getMillesecondsInTime(endAt, isNextDay);
        if (this.currentDay.time >= startAt && this.currentDay.time <= endAt) {
          isClose = false;
        }
      } else {
        isClose = true;
      }
      return isClose;
    },
  },
  created() {
    this.schedule.items.sort((a, b) => a.dayOfWeek - b.dayOfWeek);
    this.currentDay = this.getCurrentDate();
    this.works = this.makeSchedule();
  },
  methods: {
    getCurrentDate() {
      const date = new Date();
      const time = date.getTime();
      let dayOfWeek = date.getDay();
      if (dayOfWeek == 0) {
        dayOfWeek = 7;
      }
      return {
        dayOfWeek,
        time,
      };
    },
    makeSchedule() {
      const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
      const weekendsHash = {};
      for (let day of days) {
        weekendsHash[day] = false;
      }
      const works = {};
      for (let item of this.schedule.items) {
        const timeWork = `${item.startAt} - ${item.endAt}`;
        if (!(timeWork in works)) {
          works[timeWork] = {
            days: [],
            weeksNumber: [],
            reduce: false,
          };
        }
        weekendsHash[days[item.dayOfWeek - 1]] = true;
        works[timeWork].weeksNumber.push(item.dayOfWeek);
        works[timeWork].days.push(days[item.dayOfWeek - 1]);
      }
      for (let time in works) {
        let needReduce = true;
        for (let i = 0; i < works[time].weeksNumber.length; i++) {
          const cur = works[time].weeksNumber[i];
          const next = works[time].weeksNumber[i + 1];
          if (next - cur > 1) {
            needReduce = false;
            break;
          }
        }
        if (needReduce) {
          works[time].reduce = true;
        }
      }

      for (let day in weekendsHash) {
        if (!weekendsHash[day]) {
          this.weekends.push(day);
        }
      }

      return works;
    },
    getMillesecondsInTime(time, isNextDay = false) {
      const [h, m] = time.split(':').map((t) => parseInt(t));
      return new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        isNextDay ? new Date().getDate() + 1 : new Date().getDate(),
        h,
        m,
      ).getTime();
    },
  },
};
</script>

<style lang="scss">
.schedule {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 7px;
  margin-bottom: 10px;
  &__title {
    font-size: 14px;
    color: #000;
    line-height: 17px;
    &--main {
      font-size: 18px;
      line-height: 21px;
    }
  }
  &-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    &--main {
      justify-content: start;
      margin-bottom: 14px;
      .schedule__title {
        font-size: 18px;
        margin-right: 10px;
        line-height: 21px;
      }
      .schedule__status {
        padding: 0;
        font-size: 18px;
        line-height: 21px;
        &::before {
          display: none;
        }
        &--open {
          color: #ee514a;
        }
        &--close {
          color: rgba(0, 0, 0, 0.67);
        }
      }
    }
  }
  &__status {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.67);
    line-height: 17px;
    position: relative;
    display: block;
    padding-left: 15px;
    &::before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    &--close {
      &::before {
        background: #737373;
      }
    }
    &--open {
      &::before {
        background: #ee514a;
      }
    }
  }
}

.week {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  &__days,
  &__time {
    font-size: 14px;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.67);
  }
}
</style>
