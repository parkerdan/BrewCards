'use strict'

// const BASE = 'https://brewcards.herokuapp.com/';
const BASE = 'http://localhost:3000/';

const checkStatus = (res) => {
  if (res.status === 200) {
    return res.json()
  } else {
    throw {error: res}
  }
}


const Api = {
  getBars: BASE + '/api/bars',
  getCards: BASE + '/api/cards',


  checkStatus: checkStatus,
  headers: {'Accept': 'application/json','Content-Type': 'application/json'},
}

export default Api
