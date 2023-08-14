import { fireEvent, render, screen } from "@testing-library/react"
import { SearchPage } from "../../../src/heroes"
import { MemoryRouter } from "react-router-dom"

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en SearchPage', () => {
    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrar correctamente con valores por defecto', () => {
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )

        expect(container).toMatchSnapshot();
    });

    test('debe de mostrar a batman y el input con el valor del querystring', () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox');

        expect(input.value).toBe('batman');

        const img = screen.getByRole('img');
        expect(img.src).toContain('/heroes/dc-batman.jpg');

        expect(screen.queryByText('Search a hero')).toBeNull();
    });

    test('debe de mostrar un error si no encuentra el hero', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        )

        expect(screen.getByText('batman123')).toBeTruthy();
    });

    test('debe llamar el navigate a la pantall nueva', () => {
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        )

        const searchBox = screen.getByRole('textbox');
        fireEvent.change(searchBox, { target: { name: 'searchText', value: 'batman' } })

        const form = screen.getByRole('form');
        fireEvent.submit(form);

        expect(mockedUseNavigate).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith('?q=batman');
    });
})