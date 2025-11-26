import { useEffect, useState } from 'react';
import api from '../api';

function PointsPage() {
  const [points, setPoints] = useState([]);
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    neighborhood: ''
  });

  const loadPoints = () => {
    api.get('/api/points')
      .then(res => setPoints(res.data))
      .catch(err => {
        console.error('Erro ao carregar pontos', err);
        alert('Erro ao carregar pontos. Veja o console.');
      });
  };

  useEffect(() => {
    loadPoints();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/api/points', form)
      .then(() => {
        alert('Ponto cadastrado com sucesso!');
        setForm({ name: '', address: '', city: '', state: '', neighborhood: '' });
        loadPoints();
      })
      .catch(err => {
        console.error('Erro ao cadastrar ponto', err);
        alert('Erro ao cadastrar ponto. Veja o console.');
      });
  };

  return (
    <div>
      <h2 className="mb-3">Pontos de Coleta</h2>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Cadastrar novo ponto</h5>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label">Nome</label>
              <input
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 col-md-5">
              <label className="form-label">Cidade</label>
              <input
                className="form-control"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>
            < div className="col-12 col-md-1">
              <label className="form-label">UF</label>
              <input
                className="form-control"
                name="state"
                value={form.state}
                onChange={(e) => setForm(prev => ({ ...prev, state: e.target.value.toUpperCase().slice(0, 2) }))}
                maxLength={2}
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label">Endereço</label>
              <input
                className="form-control"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label">Bairro</label>
              <input
                className="form-control"
                name="neighborhood"
                value={form.neighborhood}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-success">
                Salvar ponto
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <button className="btn btn-primary mb-3"
        onClick={() => window.open("http://localhost:3001/api/reports/points")}
      >
        Exportar PDF
      </button>

      <h5 className="mb-3">Pontos cadastrados</h5>
      <div className="row">
        {points.map((p) => (
          <div key={p.id} className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.address}</p>
                <p className="card-text">
                  <small className="text-muted">
                    {p.city}{p.neighborhood ? ` - ${p.neighborhood}` : ''}
                  </small>
                </p>
              </div>
            </div>
          </div>
        ))}
        {points.length === 0 && (
          <p>Nenhum ponto cadastrado ainda.</p>
        )}
      </div>
    </div>
  );
}

export default PointsPage;
