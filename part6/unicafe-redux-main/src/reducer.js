const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':{
      const goodNum = state.good + 1;
      const newState = {...state, good: goodNum}
      return newState
    }
    case 'OK':{
      const okNum = state.ok + 1;
      const newState = {...state, ok: okNum}
      return newState
    }
    case 'BAD':{
      const badNum = state.bad + 1;
      const newState = {...state, bad: badNum}
      return newState
    }
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer