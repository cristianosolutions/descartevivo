import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/api/users/login', form)
            .then(res => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                setUser(res.data.user);
                navigate('/dashboard');
            })
            .catch(err => {
                console.error('Erro ao fazer login', err);
                const msg = err.response?.data?.message || 'Erro ao fazer login.';
                alert(msg);
            });
    };

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-4">
                <h2 className="mb-3 text-center">Login</h2>
                <div className="card">
                    <div className="card-body">
                        <form className="row g-3" onSubmit={handleSubmit}>
                            <div className="col-12">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Senha</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <button className="btn btn-success w-100" type="submit">
                                    Entrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
