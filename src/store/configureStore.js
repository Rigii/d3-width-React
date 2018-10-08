import {createStore, applyMiddleware} from 'redux'; // модуль для созд. стора и исп. промеж. ф-ий.
import rootReducer from '../reducers' //указываем папку где лежат редьюсеры (index.js)
import logger from 'redux-logger'// промеж. ф-ия для вывода промежуточных значений
import thunk from 'redux-thunk' // ф-ия для реализации асинхронных вызовов

export default function configureStore(initialState) {
const store = createStore(rootReducer, initialState, applyMiddleware(thunk, logger))
return store
}