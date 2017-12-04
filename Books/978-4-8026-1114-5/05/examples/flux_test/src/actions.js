import {appDispatcher} from './appDispatcher'

// 今回利用する Action を準備
export const ActionType = {
  CHANGE_NAME: 'CHANGE_NAME',
  SUBMIT_NAME: 'SUBMIT_NAME'
}

// Action の生成 ... Dispatcher に情報を投げる
export const Actions = {
  changeName: (name) => {
    if (name === null) return 
    appDispatcher.dispatch({
      actionType: ActionType.CHANGE_NAME,
      value: name
    })
  },
  submitName: () => {
    appDispatcher.dispatch({
      actionType: AcionType.SUBMIT_NAME
    })
  }
}
