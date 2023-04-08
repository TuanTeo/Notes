const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
    return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
        acc[type] = `${base}_${type}`
        return acc
    }, {})
}

function action(type, payload = {}) {
    return { type, ...payload }
}

export const USER = createRequestTypes('USER')

export const UPDATE_ROUTER_STATE = 'UPDATE_ROUTER_STATE'

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

export const user = {
    request: (login) => action(USER[REQUEST], { login }),
    success: (login, response) => action(USER[SUCCESS], { login, response }),
    failure: (login, error) => action(USER[FAILURE], { login, error }),
}

export const updateRouterState = (payload) => action(UPDATE_ROUTER_STATE, { payload })