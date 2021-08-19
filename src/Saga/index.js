import { all } from 'redux-saga/effects'

// import sagas
import AuthSaga from './auth'

export default function* rootSaga() {
    yield all([
        AuthSaga(),
    ])
}