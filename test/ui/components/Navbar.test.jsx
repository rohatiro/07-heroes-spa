import { MemoryRouter, useNavigate } from "react-router-dom"
import { AuthContext } from "../../../src/auth"
import { Navbar } from "../../../src/ui"
import { fireEvent, render, screen } from "@testing-library/react"

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en Navbar', () => {
    const contextValue = {
        logged: true,
        user: { name: 'roberto', id: '123' },
        logout: jest.fn()
    }

    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrar el nombre del usuario', () => {
        
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue } >
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect(screen.getByText(contextValue.user.name)).toBeTruthy();
    })
    
    test('debe de llamar el logout y navegar cuando se hace clic al boton', () => {
        
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue } >
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        const logoutBtn = screen.getByRole('button');

        fireEvent.click(logoutBtn);

        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { replace: true });
    })
})