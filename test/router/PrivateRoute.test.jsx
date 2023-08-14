import { render, screen } from "@testing-library/react"
import { PrivateRoute } from './../../src/router/PrivateRoute';
import { AuthContext } from "../../src/auth";
import { MemoryRouter } from "react-router-dom";

describe('Pruebas en PrivateRoute', () => {
    test('debe de mostrar el children si esta autenticado', () => {
        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                name: 'roberto',
                id: '123'
            }
        }
        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={ ['/search?q=batman'] }>
                    <PrivateRoute>
                        <h1>Ruta Privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        // screen.debug();

        expect(screen.getByText('Ruta Privada')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalled();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=batman');
    })
})