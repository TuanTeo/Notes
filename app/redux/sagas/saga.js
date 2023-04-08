import { take, put, call, fork, select, all, takeEvery } from 'redux-saga/effects'
import * as actions from '../actions/actions'
import * as api from '../api/api'
import { getUser, getRepo, getStarredByUser, getStargazersByRepo } from '../reducers/selectors'

const { user } = actions

function* fetchEntity(entity, apiFn, id, url) {
    yield put(entity.request(id))
    const { response, error } = yield call(apiFn, url || id)
    if (response) yield put(entity.success(id, response))
    else yield put(entity.failure(id, error))
}

export const fetchUser = fetchEntity.bind(null, user, api.fetchUser)


function* watchLoadUserPage() {
    while (true) {
        const { login, requiredFields = [] } = yield take(actions.LOAD_USER_PAGE)

        yield fork(loadUser, login, requiredFields)
    }
}

function* loadUser(login, requiredFields) {
    const user = yield select(getUser, login)
    if (!user || requiredFields.some((key) => !user.hasOwnProperty(key))) {
        yield call(fetchUser, login)
    }
}

export default function* root() {
    yield all([
        fork(watchLoadUserPage),
    ])
}