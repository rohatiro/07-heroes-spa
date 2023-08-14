import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth"
import { AppRouter } from "../../src/router/AppRouter"
import { MemoryRouter } from "react-router-dom"

describe('Pruebas en AppRouter', () => {
    test('debe de mostrar el login si no esta autenticado', () => {
        const contextValue = {
            logged: false
        }
        
        render(
            <MemoryRouter initialEntries={[ '/marvel' ]}>
                <AuthContext.Provider value={ contextValue } >
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect( screen.getAllByText('Login').length ).toBe(2)
     });
    
     test('debe de mostrar el componente de marvel si esta autenticado', () => {
        const contextValue = {
            logged: true,
            user: { name: 'roberto', id: '123' }
        }
        
        render(
            <MemoryRouter initialEntries={[ '/marvel' ]}>
                <AuthContext.Provider value={ contextValue } >
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect( screen.getByText('MarvelPage') ).toBeTruthy();
     });
})