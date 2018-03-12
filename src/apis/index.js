import axios from 'axios'

export function fetchData (sql) {
  return axios.get(`/api/Api.ashx?sql=${sql}`).then(res => res.data)
}
