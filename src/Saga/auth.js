import { put, takeEvery, call, fork, take } from 'redux-saga/effects'

import axios from 'axios';

import firebase from 'firebase'
import rsf from './firebase'

import { SIGN_IN, SIGN_UP, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
SIGN_OUT_SUCCESS, SIGN_OUT, EMAIL_VERIFICATION_ERROR, SEND_EMAIL_VERIFICATION
 } from '../Constants/actiontype'

export default function* AuthSaga() {
    yield fork(loginStatusWatcher)
    yield takeEvery(SIGN_UP, handleSignUp)
    yield takeEvery(SIGN_IN, handleSignIn)
    yield takeEvery(SIGN_OUT, handleSignOut)
}

const authProvider = new firebase.auth.GoogleAuthProvider()

function* handleSignIn(action) {
    try {
        const user = yield call(rsf.auth.signInWithEmailAndPassword, action.payload.email, action.payload.password)
        
        if (user) {
            yield put({
                type: SIGN_IN_SUCCESS, payload: user
            })
        } else {
            yield put({ type: SIGN_IN_FAILURE, payload: "Error authentication user." });
        }
    } catch (err) {
        yield put({ type: SIGN_IN_FAILURE, payload: err.message });
    }
}

function* handleSignUp(action) {
    try {
        const user = yield call(rsf.auth.createUserWithEmailAndPassword, action.payload.email, action.payload.password);
        
        if (user) {
            yield put({
                type: SIGN_UP_SUCCESS, payload: user
            })
        } else {
            yield put({ type: SIGN_UP_FAILURE, payload: "Error registering user." });
        }
    } catch (err) {
        yield put({ type: SIGN_UP_FAILURE, payload: err.message });
    }
}

function* handleSignOut(action) {
    try {
        const data = yield call(rsf.auth.signOut);
        
        if (data) {
            yield put({
                type: SIGN_OUT_SUCCESS
            });
        } else {
            yield put({ type: SIGN_UP_FAILURE, payload: "Error registering user." });
        }
    } catch (err) {
        yield put({ type: SIGN_UP_FAILURE, payload: err.message });
    }
}

function* loginStatusWatcher() {
  const channel = yield call(rsf.auth.channel)

  while (true) {
    const { user } = yield take(channel)
    if (user) {
      yield put({ type: SIGN_IN_SUCCESS, payload: user });
    } else {
      yield put({ type: SIGN_OUT_SUCCESS })
    }
  }
}