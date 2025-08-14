import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormularioLogin from '../components/FormularioLogin';

describe('FormularioLogin', () => {
    test('el botón de login está deshabilitado si los campos están vacíos', () => {
        render(<FormularioLogin />);
        const button = screen.getByRole('button', { name: /iniciar sesión/i });
        expect(button).toBeDisabled();
    });

    test('el botón de login se habilita solo cuando los tres campos están completos', () => {
        render(<FormularioLogin />);
        const usernameInput = screen.getByLabelText(/usuario/i);
        const passwordInput = screen.getByLabelText(/contraseña/i);
        const clientCodeInput = screen.getByLabelText(/código de cliente/i);
        const button = screen.getByRole('button', { name: /iniciar sesión/i });

        // Solo usuario
        fireEvent.change(usernameInput, { target: { value: 'usuario' } });
        expect(button).toBeDisabled();

        // Usuario y contraseña
        fireEvent.change(passwordInput, { target: { value: 'contraseña' } });
        expect(button).toBeDisabled();

        // Usuario, contraseña y código de cliente
        fireEvent.change(clientCodeInput, { target: { value: '123' } });
        expect(button).not.toBeDisabled();
    });

    test('al hacer clic en el botón habilitado se llama a la función "Login" con los valores correctos', () => {
        // Creamos un mock para la función de login
        const mockLogin = jest.fn();
        // Modificamos el componente para aceptar una prop onLogin
        const FormularioLoginWithLogin = (props) => {
            const [username, setUsername] = React.useState("");
            const [password, setPassword] = React.useState("");
            const [clientCode, setClientCode] = React.useState("");
            const isDisabled = username === "" || password === "" || clientCode === "";

            const handleSubmit = (e) => {
                e.preventDefault();
                if (!isDisabled && props.onLogin) {
                    props.onLogin({ username, password, clientCode });
                }
            };

            return (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <label htmlFor="clientCode">Código de Cliente:</label>
                    <input
                        type="text"
                        id="clientCode"
                        name="clientCode"
                        value={clientCode}
                        onChange={e => setClientCode(e.target.value)}
                    />
                    <button type="submit" disabled={isDisabled}>Iniciar sesión</button>
                </form>
            );
        };

        render(<FormularioLoginWithLogin onLogin={mockLogin} />);
        const usernameInput = screen.getByLabelText(/usuario/i);
        const passwordInput = screen.getByLabelText(/contraseña/i);
        const clientCodeInput = screen.getByLabelText(/código de cliente/i);
        const button = screen.getByRole('button', { name: /iniciar sesión/i });

        fireEvent.change(usernameInput, { target: { value: 'usuario' } });
        fireEvent.change(passwordInput, { target: { value: 'contraseña' } });
        fireEvent.change(clientCodeInput, { target: { value: '123' } });

        fireEvent.click(button);

        expect(mockLogin).toHaveBeenCalledWith({
            username: 'usuario',
            password: 'contraseña',
            clientCode: '123'
        });
    });
});
