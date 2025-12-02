## 📡 Documentação da API

### Principais rotas:

| Método | Rota               | Descrição               |
| ------ | ------------------ | ----------------------- |
| POST   | /auth/login        | Autenticação            |
| GET    | /users             | Listar usuários         |
| POST   | /users             | Criar usuário           |
| GET    | /collection-points | Listar pontos de coleta |
| POST   | /deliveries        | Registrar entrega       |
| GET    | /dashboard         | Totais consolidados     |


### 🔐 Autenticação

A API utiliza JWT (Bearer Token).
Após o login, o token deve ser enviado em todas as requisições protegidas.

**📌 Header obrigatório**

Authorization: Bearer {TOKEN}
Content-Type: application/json

### 📦 Endpoints

#### 1️⃣ Autenticação
**POST /auth/login**
Autentica usuário e gera token JWT.

- Request
```bash
{
  "email": "admin@admin.com",
  "password": "admin123"
}
```

- Response
```bash
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Administrador",
    "email": "admin@admin.com",
    "role": "ADMIN"
  }
}
```

Erros

| Código | Tipo         | Mensagem                         |
| ------ | ------------ | -------------------------------- |
| 401    | Unauthorized | Credenciais inválidas            |
| 400    | Bad Request  | Campos obrigatórios não enviados |

#### 2️⃣ Usuários
**GET /users/**

Retorna lista de usuários (ADMIN only)
Request header:
Authorization: Bearer {token}

- Response
```bash
[
  {
    "id": 1,
    "name": "Administrador",
    "email": "admin@admin.com",
    "role": "ADMIN",
    "created_at": "2025-11-28T22:15:10Z"
  }
]
```

**POST /users/**

Cria novo usuário

Body
```bash
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456",
  "role": "USER"
}
```

Response
```bash
{
  "message": "Usuário criado com sucesso"
}
```

**PUT /users/:id**

Atualiza usuário
```bash
{
  "name": "João da Silva",
  "role": "ADMIN"
}
```

**DELETE /users/:id**

Remove usuário
```bash
{
  "message": "Usuário removido"
}
```

#### 3️⃣ Pontos de Coleta
**GET /collection-points/**

Lista pontos de coleta
```bash
[
  {
    "id": 1,
    "name": "Ponto Central",
    "address": "Av. Brasil, 200",
    "type": "Plástico"
  }
]
```

**POST /collection-points/**
```bash
{
  "name": "Ponto Sul",
  "address": "Rua F, 500",
  "type": "Vidro"
}
```

DELETE /collection-points/:id (Implementação via interface não concluída, só via banco)

Remove um ponto

#### 4️⃣ Tipos de Resíduos
**GET /waste-types/**

Lista tipos por kg

#### 5️⃣ Entregas
**GET /deliveries/**

Lista entregas registradas
```bash
[
  {
    "id": 4,
    "user_id": 3,
    "point_id": 1,
    "weight_kg": 12.5,
    "waste_type": "Plástico",
    "total_value": 10.00
  }
]
```

**POST /deliveries/**
```bash
{
  "user_id": 3,
  "point_id": 1,
  "weight_kg": 10,
  "waste_type": "Vidro",
  "price_per_kg": 0.40
}
```

#### 6️⃣ Dashboard
**GET /dashboard/**

Retorna totais consolidados
```bash
{
  "totalDeliveries": 50,
  "totalWeightKg": 214.4,
  "totalValue": 180.30
}
```

⚠ Códigos de Erro

| Código | Descrição                |
| ------ | ------------------------ |
| 400    | Erro de validação        |
| 401    | Não autorizado           |
| 403    | Proibido (sem permissão) |
| 404    | Não encontrado           |
| 500    | Erro interno             |


### 🧪 Testes pelo Postman

Variáveis de ambiente recomendada
```bash
{
  "url": "http://localhost:3001",
  "token": ""
}
```

### 🧱 Modelo do Banco de Dados (Resumo)

| Tabela               | Campos principais                                                |
| ---------------------| ---------------------------------------------------------------- |
| collection_points    | id, name, address, state, status, created_at, created_at         |
| tasks                | id, title, completed                                             |
| users                | id, name, email, password_hash, role, created_at, address, birth |
| waste_deliveries     | id, user_id, collection_point_id, total_kg, created_at           |
| waste_delivery_items | id, user_id, collection_point_id, total_kg, created_at           |
| waste_types          | id, delivery_id, waste_type_id, quantity_kg                      |
