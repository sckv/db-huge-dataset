import http from 'k6/http';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.0.0/index.js';

const getRandomUser = () => randomIntBetween(1, 500000);

export let options = {
  vus: 15,
  duration: '2m',
};
export default function () {
  const url = `http://0.0.0.0:3000/user/${getRandomUser()}/analytics/merchants?fromDate=2015-01-01&toDate=2015-02-27`;
  console.log(url);
  http.get(url);
}
