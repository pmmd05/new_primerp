import React, { useState } from "react";

const FormularioLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [clientCode, setClientCode] = useState("");

    const isDisabled =
        username === "" ||
        password === "" ||
        clientCode === "";

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <img src={process.env.PUBLIC_URL + "/LogoUrl.png"} alt="Logo" style={{ width: "80px", marginBottom: "24px" }} />
            <form style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "16px", width: "250px" }}>
                <label htmlFor="username">Usuario:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    style={{ width: "100%" }}
                />
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ width: "100%" }}
                />
                <label htmlFor="clientCode">Código de Cliente:</label>
                <input
                    type="text"
                    id="clientCode"
                    name="clientCode"
                    value={clientCode}
                    onChange={e => setClientCode(e.target.value)}
                    style={{ width: "100%" }}
                />
                <button
                    type="submit"
                    disabled={isDisabled}
                    style={{
                        width: "100%",
                        backgroundColor: "#1976d2",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        padding: "10px 0",
                        fontWeight: "bold",
                        fontSize: "16px",
                        cursor: isDisabled ? "not-allowed" : "pointer",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                        transition: "background 0.2s"
                    }}
                >
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
};

export default FormularioLogin;

