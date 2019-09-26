<template>
  <div class="schedule">
    <div class="schedule-container">
      <form class="form">
        <div class="form__field">
          <label for="slug" class="form__label">
            Слаг заведения
          </label>
          <input type="text" class="form__input" v-model="slug" id="slug" />
        </div>
        <button type="submit" class="form__btn">Обновить</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'schedule',
  data() {
    return {
      slug: null,
    };
  },
  methods: {},
};
</script>

<style lang="scss">
.schedule {
  &-container {
    margin-top: 45px;
    margin-left: 41px;
    min-width: 610px;
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
</style>
