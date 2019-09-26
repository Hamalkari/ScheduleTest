<template>
  <div class="schedules">
    <div class="schedules-container">
      <form class="form">
        <div class="form__field">
          <label for="slug" class="form__label">
            Слаг заведения
          </label>
          <input type="text" class="form__input" v-model="slug" id="slug" />
        </div>
        <button type="submit" class="form__btn" @click.prevent="getSchedules">
          Обновить
        </button>
      </form>
      <pulse-loader
        :loading="status == 'loading'"
        color="#ee514a"
        size="20px"
        class="loader"
      ></pulse-loader>
      <div class="error" v-if="status == 'error'">
        {{ error }}
      </div>
      <div class="schedules-list" v-else-if="status == 'success'">
        <ScheduleItem
          v-for="schedule in schedules"
          :key="schedule.id"
          :schedule="schedule"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ScheduleItem from '@/components/ScheduleItem';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
  name: 'schedule',
  components: {
    ScheduleItem,
    PulseLoader,
  },
  data() {
    return {
      slug: null,
      error: '',
    };
  },
  computed: {
    ...mapGetters('schedule', ['schedules', 'status']),
  },
  methods: {
    getSchedules() {
      this.$store
        .dispatch('schedule/fetchSchedules', this.slug)
        .catch((err) => {
          this.error = err;
        });
    },
  },
};
</script>

<style lang="scss">
.schedules {
  &-list {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    width: 100%;
    padding: 10px;
    .schedule {
      &:last-child {
        margin: 0;
        padding: 0;
        border: none;
      }
    }
  }
  &-container {
    margin: 10px auto;
    width: 610px;
  }
  .form {
    margin-bottom: 40px;
    &__label {
      font-size: 14px;
      line-height: 17px;
      color: #000;
      display: block;
      margin-bottom: 5px;
    }
    &__input {
      display: block;
      width: 300px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 3px;
      font-size: 14px;
      line-height: 17px;
      color: #000;
      padding: 7px 5px 6px 10px;
      outline: none;
      margin-bottom: 20px;
    }
    &__btn {
      display: block;
      font-weight: 500;
      font-size: 18px;
      line-height: 21px;
      text-align: center;
      background: #ee514a;
      border-radius: 3px;
      border: none;
      color: #fff;
      width: 260px;
      cursor: pointer;
      height: 50px;
    }
  }
}

.loader {
  text-align: center;
}
</style>
