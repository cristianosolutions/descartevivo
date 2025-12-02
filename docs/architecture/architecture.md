## 🏗️ Arquitetura da API
### Diagrama


```mermaid
graph TD

%% ==================== FRONTEND ====================
subgraph FRONTEND["🌐 Interface do Usuário — Frontend (React.js)"]
    U1[👤 Moradores / Cidadãos]
    U2[🧑‍💼 Administradores]
    FE[🖥 React.js\nFormulários • Dashboard • Axios]
end

%% ==================== BACKEND ====================
subgraph BACKEND["🚀 Nossa API Backend — Node.js / Express"]
    EP1(🔑 POST /login)
    EP2(📦 POST /users /points /deliveries)
    EP3(📊 GET /dashboard /points /deliveries)
    EP4(📄 GET /reports/pdf)
    CTRL[⚙ Controller]
    SRV[🧠 Services / Regras de Negócio]
    AUTH[🔐 JWT Auth Middleware]
    MODEL[📂 Queries / Modelos SQL]
end

%% ==================== BANCO DE DADOS ====================
subgraph DATABASE["🗄 Banco de Dados — PostgreSQL (Railway Cloud)"]

    users[(📁 users\nid • name • email • password_hash • role • created_at\nendereco_completo • data_nascimento)]
    collection_points[(📍 collection_points\nid • name • address • city • state • status\ncreated_at • neighborhood)]
    waste_deliveries[(♻ waste_deliveries\nid • user_id • collection_point_id\n total_kg • created_at)]
    waste_delivery_items[(📦 waste_delivery_items\nid • delivery_id • waste_type_id\n quantity_kg)]
    waste_types[(🏷 waste_types\nid • name • description)]
    tasks[(📝 tasks\nid • title • completed)]

end

%% ==================== RELATÓRIOS ====================
subgraph REPORTS["📑 Módulo Relatórios PDF"]
    PDFGEN[🧾 Exportação PDF]
end

%% ==================== INFRA ====================
subgraph DEPLOY["🛠 Infra / Deploy / CI/CD"]
    VERCEL[▶ Deploy Frontend — Vercel]
    RW[🚂 Deploy Backend + Banco — Railway]
    GH[🔧 GitHub Actions • CI/CD]
end


%% ==================== CONEXÕES ====================
U1 --> FE
U2 --> FE

FE -->|Axios / JSON| EP1
FE -->|Axios / JSON| EP2
FE -->|Axios / JSON| EP3
FE -->|Exportação PDF| EP4

EP1 --> CTRL
EP2 --> CTRL
EP3 --> CTRL
CTRL --> SRV
SRV --> AUTH
SRV --> MODEL
MODEL --> DB

EP4 --> PDFGEN
PDFGEN --> FE

FE --> VERCEL
RW --> users
MODEL --> users
MODEL --> collection_points
MODEL --> waste_types
MODEL --> waste_deliveries
MODEL --> waste_delivery_items
MODEL --> tasks

waste_deliveries --> waste_delivery_items
users --> waste_deliveries
collection_points --> waste_deliveries
waste_types --> waste_delivery_items

VERCEL --> GH
RW --> GH
