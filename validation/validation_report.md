# Relatório de Validação com o Público-Alvo – EcoRecicla

## 1. Contexto da validação

- **Data da apresentação:** (preencher)
- **Local:** (ex.: Associação de Reciclagem do Bairro José Walter)
- **Participantes:**
  - Representante da associação/cooperativa
  - Desenvolvedor do sistema (aluno)

O objetivo da validação foi apresentar o sistema EcoRecicla ao público-alvo definido e coletar feedbacks sobre a utilidade, usabilidade e possíveis melhorias.

---

## 2. Roteiro da apresentação

1. Explicação do objetivo do sistema (ODS 11, reciclagem, controle de resíduos).
2. Demonstração das telas:
   - Login
   - Dashboard
   - Cadastro de pontos de coleta
   - Cadastro de usuários
   - Registro de entregas
   - Histórico de entregas
3. Discussão com o público sobre:
   - Se o sistema se encaixa na realidade deles.
   - O que facilita.
   - O que está faltando.

---

## 3. Feedbacks recebidos (exemplos, adapte com o real)

- **Feedback 1 – Simplicidade da interface**
  - O representante considerou a interface simples e fácil de entender.
  - Sugeriu manter os formulários com poucos campos obrigatórios para agilizar o registro das entregas.

- **Feedback 2 – Necessidade de relatório por período**
  - Foi sugerida a possibilidade de gerar um relatório mensal com total de kg reciclados para cada tipo de resíduo.

- **Feedback 3 – Impressão dos dados**
  - Sugeriu ser útil ter opção de exportar ou imprimir o histórico de entregas para levar em reuniões com parceiros.

- **Feedback 4 – Controle de acesso**
  - Sugeriu que apenas pessoas autorizadas pudessem cadastrar pontos de coleta, enquanto outros só poderiam registrar entregas.

---

## 4. Ajustes realizados após a validação

- Implementado **dashboard** com resumo de:
  - total de usuários
  - total de pontos
  - total de entregas
  - total de kg reciclados
  - distribuição de kg por tipo de resíduo.
- Proteção de rotas através de **login com JWT**, garantindo que apenas usuários autenticados acessem funcionalidades críticas.
- Estrutura preparada para futura exportação/relatórios (ex.: botão de exportar na página de Entregas).

---

## 5. Possíveis evoluções futuras

- Filtro por período de data nas telas de:
  - Entregas
  - Dashboard
- Exportação de dados em CSV ou PDF.
- Mapa com localização dos pontos de coleta.
- Versão mobile dedicada (app ou PWA).

---

## 6. Evidências

As evidências da validação (fotos, prints, anotações de reuniões) estão armazenadas na pasta:

```text
/validation/evidence
