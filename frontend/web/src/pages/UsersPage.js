import { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

function UsersPage() {
    const { user } = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        birth_date: '',
        role: 'MORADOR',
    });

    // Estados para edição
    const [editUser, setEditUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const loadUsers = () => {
        api.get('/api/users')
            .then(res => setUsers(res.data))
            .catch(err => {
                console.error('Erro ao carregar usuários', err);
                alert('Erro ao carregar usuários. Veja o console.');
            });
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post('/api/users', form)
            .then(() => {
                alert('Usuário cadastrado com sucesso!');
                setForm({
                    name: '',
                    email: '',
                    password: '',
                    address: '',
                    birth_date: '',
                    role: 'MORADOR',
                });
                loadUsers();
            })
            .catch(err => {
                console.error('Erro ao cadastrar usuário', err);
                const msg = err.response?.data?.message || 'Erro ao cadastrar usuário';
                alert(msg);
            });
    };

    const handleDelete = (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este usuário?')) return;

        api.delete(`/api/users/${id}`)
            .then(() => {
                alert('Usuário removido com sucesso!');
                loadUsers();
            })
            .catch(err => {
                console.error('Erro ao excluir usuário', err);
                const msg = err.response?.data?.message || 'Erro ao excluir usuário.';
                alert(msg);
            });
    };

    // Abrir modal de edição preenchendo dados
    const openEditModal = (userData) => {
        setEditUser({
            ...userData,
            address: userData.endereco_completo,
            birth_date: userData.data_nascimento
                ? userData.data_nascimento.split('T')[0]
                : ''
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditUser(null);
    };

    // Atualizar usuário (PUT)
    const handleUpdate = (e) => {
        e.preventDefault();

        api.put(`/api/users/${editUser.id}`, editUser)
            .then(() => {
                alert('Usuário atualizado com sucesso!');
                closeModal();
                loadUsers();
            })
            .catch(err => {
                console.error('Erro ao atualizar usuário', err);
                alert(err.response?.data?.message || 'Erro ao atualizar usuário.');
            });
    };

    if (!user) return null;
    if (user.role !== "ADMIN") return <Navigate to="/dashboard" />;

    return (
        <div>
            <h2 className="mb-3">Usuários</h2>

            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Cadastrar novo usuário</h5>
                    <form className="row g-3" onSubmit={handleSubmit}>

                        <div className="col-12 col-md-4">
                            <label className="form-label">Nome</label>
                            <input className="form-control"
                                name="name" value={form.name}
                                onChange={handleChange} required />
                        </div>

                        <div className="col-12 col-md-4">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control"
                                name="email" value={form.email}
                                onChange={handleChange} required />
                        </div>

                        <div className="col-12 col-md-4">
                            <label className="form-label">Senha</label>
                            <input type="password" className="form-control"
                                name="password" value={form.password}
                                onChange={handleChange} required />
                        </div>

                        <div className="col-12 col-md-6">
                            <label className="form-label">Endereço Completo</label>
                            <input className="form-control"
                                name="address" value={form.address}
                                onChange={handleChange} required />
                        </div>

                        <div className="col-12 col-md-3">
                            <label className="form-label">Data de Nascimento</label>
                            <input type="date" className="form-control"
                                name="birth_date" value={form.birth_date}
                                onChange={handleChange} required />
                        </div>

                        <div className="col-12 col-md-3">
                            <label className="form-label">Função</label>
                            <select className="form-select"
                                name="role" value={form.role}
                                onChange={handleChange}>
                                <option value="MORADOR">Morador</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>

                        <div className="col-12">
                            <button className="btn btn-success" type="submit">
                                Salvar usuário
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <h5 className="mb-3">Usuários cadastrados</h5>
            <div className="table-responsive">
                <table className="table table-striped align-middle">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Função</th>
                            <th>Cadastrado em</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.role}</td>
                                <td>{new Date(u.created_at).toLocaleString('pt-BR')}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() => openEditModal(u)}
                                    >
                                        Editar
                                    </button>

                                    {u.has_deliveries ? (
                                        <span className="text-muted">
                                            🔒 Entrega Vinculado
                                        </span>
                                    ) : (
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDelete(u.id)}
                                        >
                                            Excluir
                                        </button>
                                    )}
                                </td>

                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="6">Nenhum usuário cadastrado ainda.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Editar Usuário</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>

                            <form onSubmit={handleUpdate}>
                                <div className="modal-body">

                                    <label className="form-label">Nome</label>
                                    <input className="form-control mb-2"
                                        value={editUser?.name || ''}
                                        onChange={e => setEditUser({ ...editUser, name: e.target.value })}
                                        required />

                                    <label className="form-label">Email</label>
                                    <input className="form-control mb-2"
                                        value={editUser?.email || ''}
                                        onChange={e => setEditUser({ ...editUser, email: e.target.value })}
                                        required />

                                    <label className="form-label">Endereço Completo</label>
                                    <input className="form-control mb-2"
                                        value={editUser?.address || ''}
                                        onChange={e => setEditUser({ ...editUser, address: e.target.value })}
                                        required />

                                    <label className="form-label">Data de Nascimento</label>
                                    <input
                                        type="date"
                                        className="form-control mb-2"
                                        value={editUser?.birth_date || ''}
                                        onChange={e => setEditUser({ ...editUser, birth_date: e.target.value })}
                                        required
                                    />

                                    <label className="form-label">Função</label>
                                    <select className="form-select"
                                        value={editUser?.role || ''}
                                        onChange={e => setEditUser({ ...editUser, role: e.target.value })}
                                    >
                                        <option value="MORADOR">Morador</option>
                                        <option value="ADMIN">Admin</option>
                                    </select>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-success">
                                        Salvar alterações
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UsersPage;





/* import { useEffect, useState, useContext } from 'react';
import api from '../api';



function UsersPage() {     
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',        
        address: '',
        birth_date: '',
        role: 'MORADOR',
    });

    const loadUsers = () => {
        api.get('/api/users')
            .then(res => setUsers(res.data))
            .catch(err => {
                console.error('Erro ao carregar usuários', err);
                alert('Erro ao carregar usuários. Veja o console.');
            });
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post('/api/users', form)
            .then(() => {
                alert('Usuário cadastrado com sucesso!');
                setForm({
                    name: '',
                    email: '',
                    password: '',                    
                    address: '',
                    birth_date: '',
                    role: 'MORADOR',
                });
                loadUsers();
            })
            .catch(err => {
                console.error('Erro ao cadastrar usuário', err);
                const msg = err.response?.data?.message || 'Erro ao cadastrar usuário';
                alert(msg);
            });
    };

    const handleDelete = (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este usuário?')) return;

        api.delete(`/api/users/${id}`)
            .then(() => {
                loadUsers();
            })
            .catch(err => {
                console.error('Erro ao excluir usuário', err);
                alert('Erro ao excluir usuário.');
            });
    };

    return (
        <div>
            <h2 className="mb-3">Usuários</h2>

            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Cadastrar novo usuário</h5>
                    <form className="row g-3" onSubmit={handleSubmit}>
                        
                        <div className="col-12 col-md-4">
                            <label className="form-label">Nome</label>
                            <input
                                className="form-control"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-12 col-md-4">
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

                        <div className="col-12 col-md-4">
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

                        <div className="col-12 col-md-6">
                            <label className="form-label">Endereço Completo</label>
                            <input
                                className="form-control"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-12 col-md-3">
                            <label className="form-label">Data de Nascimento</label>
                            <input
                                type="date"
                                className="form-control"
                                name="birth_date"
                                value={form.birth_date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-12 col-md-3">
                            <label className="form-label">Função</label>
                            <select
                                className="form-select"
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                            >
                                <option value="MORADOR">Morador</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>

                        <div className="col-12">
                            <button className="btn btn-success" type="submit">
                                Salvar usuário
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <h5 className="mb-3">Usuários cadastrados</h5>
            <div className="table-responsive">
                <table className="table table-striped align-middle">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Função</th>
                            <th>Cadastrado em</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.role}</td>
                                <td>{new Date(u.created_at).toLocaleString('pt-BR')}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDelete(u.id)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="6">Nenhum usuário cadastrado ainda.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsersPage;
*/