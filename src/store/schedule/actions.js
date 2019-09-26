import scheduleService from '../../services/schedule.service';

function fetchSchedules({ commit }, name) {
  return new Promise((resolve, reject) => {
    commit('setStatus', 'loading');
    scheduleService
      .getSchedules(name)
      .then((res) => {
        const schedules = res.data.data.place.schedules;
        commit('setStatus', 'success');
        commit('setSchedule', schedules);
        resolve();
      })
      .catch((err) => {
        commit('setStatus', 'error');
        const message = err.response.data.message || err.message;
        reject(message);
      });
  });
}

export { fetchSchedules };
