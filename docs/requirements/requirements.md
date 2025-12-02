## 📘 Introdução

**Este documento apresenta os requisitos funcionais, não funcionais e regras de negócio do sistema Descarte Vivo, solução digital que visa auxiliar o gerenciamento de reciclagem, pontos de coleta e entregas de resíduos, promovendo sustentabilidade e contribuindo com o ODS 11 – Cidades e Comunidades Sustentáveis.**


### ✅ Requisitos Funcionais (RF)

| **ID**   | **Requisito Funcional**                                  | **Status**     |
| -------- | -------------------------------------------------------- | -------------- |
| **RF01** | O sistema deve permitir login com autenticação JWT       | ✔ Implementado |
| **RF02** | O sistema deve permitir CRUD de usuários                 | ✔ Implementado |
| **RF03** | Administradores com acesso total ao sistema              | ✔ Implementado |
| **RF04** | Usuários podem registrar entregas de resíduos            | ✔ Implementado |
| **RF05** | O sistema deve calcular o total de peso entregue         | ✔ Implementado |
| **RF06** | O sistema deve gerar relatórios em PDF                   | ❌Implementando|
| **RF07** | O dashboard deve exibir métricas em tempo real           | ✔ Implementado |
| **RF08** | Pesquisa e listagem de pontos de coleta                  | ✔ Implementado |
| **RF09** | Edição e exclusão de pontos de coleta                    | ✔ Implementado |
| **RF10** | Exclusão de usuários vinculados deve ser bloqueada       | ✔ Implementado |
| **RF11** | O sistema deve validar dados obrigatórios em formulários | ✔ Implementado |
| **RF12** | Exportação de dados para PDF e listagens                 | ❌Implementando|
| **RF13** | Controle de itens e tipos de resíduos                    | ✔ Implementado |
| **RF14** | Usuários comuns (MORADOR) com restrições de acesso       | ✔ Implementado |


### 🛡 6. Requisitos Não Funcionais (RNF)

| **ID**    | **Requisitos Não Funcionais**                  | **Status**   |
| ----------|----------------------------------------------- | ------------ |
| **RNF01** | A comunicação deve utilizar JSON               |       ✔      |
| **RNF02** | Tempo máximo de resposta inferior a 3 segundos |       ✔      |
| **RNF03** | Segurança aplicada com JWT e Hash Bcrypt       |       ✔      |
| **RNF04** | Interface responsiva e compatível com mobile   |       ✔      |
| **RNF05** | Deploy automatizado via CI/CD                  |       ✔      |
| **RNF06** | Banco PostgreSQL hospedado em nuvem            |       ✔      |
| **RNF07** | Logs de erros e proteção a falhas críticas     |       ✔      |
| **RNF08** | HTTPS obrigatório em produção                  |       ✔      |
