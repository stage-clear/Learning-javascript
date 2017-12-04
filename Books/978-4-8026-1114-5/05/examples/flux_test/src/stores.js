import {appDispatcher} from './appDispatcher'
import {ActionType} from './actioins'

// 今回利用するStoreを用意
export const nameStore = {name: '', onChange: null}
export const messageStore = {name: '', onChange: null}

// Action と Store を結びつける
appDispatcher.register(payload => {
  if (payload.actionType === ActionType.CHANGE_NAME) {
    nameStore.name = payload.value
    nameStore.onChange()
  }
})

appDispatcher.register(payload => {
  if (payload.actionType === ActionType.SUBMIT_NAME) {
    messageStore.message = nameStore.name + 'さん, こんにちは'
    messageStore.onChange()
  }
})
