import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe('Pruebas en authReducer', () => {
    test('debe de retornar el estado por defecto', () => {
        const initialState = authReducer({ logged: false }, {});

        expect(initialState).toEqual({ logged: false });
    });
    test('debe de llamar el login, autenticar y establecer el user', () => {
        const action = {
            type: types.login,
            payload: {
                name: 'roberto',
                id: '123'
            }
        };

        const state = authReducer({ logged: false }, action);

        expect(state).toEqual({
            logged: true,
            user: {
                name: 'roberto',
                id: '123'
            }
        });
    });
    test('debe de borrar el name del usuario y logged en false', () => {
        const state = {
            logged: true,
            user: { name: 'roberto', id: '123' }
        };

        const action = { type: types.logout };

        const newState = authReducer(state, action);

        expect(newState).toEqual({ logged: false });
    });
});