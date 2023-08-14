import { render, screen } from "@testing-library/react"
import { PublicRoute } from './../../src/router/PublicRoute';
import { AuthContext } from "../../src/auth";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe('Pruebas en PublicRoute', () => {
    test('debe de mostrar el children si no esta autenticado', () => {
        const contextValue = {
            logged: false
        }
        render(
            <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Ruta Publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )

        // screen.debug();

        expect(screen.getByText('Ruta Publica')).toBeTruthy();
    })
    
    test('debe de navegar si esta autenticado', () => {
        const contextValue = {
            logged: true
        }
        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={[ '/login' ]}>
                    <Routes>
                        <Route path="/login" element={ 
                            <PublicRoute>
                                <h1>Ruta Publica</h1>
                            </PublicRoute>
                        } />
                    </Routes>
                    <Routes>
                        <Route path="/" element={ <h1>Pagina Marvel</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        // screen.debug();

        expect(screen.getByText('Pagina Marvel')).toBeTruthy();
    })
})