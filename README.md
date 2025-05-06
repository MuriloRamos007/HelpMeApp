# HelpMe - Apoio Estudantil

## O que é o HelpMe?
O **HelpMe - Apoio Estudantil** é um aplicativo mobile desenvolvido com React Native e SQLite (via Expo) que ajuda estudantes a organizarem suas tarefas escolares de forma prática e eficiente.

## Funcionalidades
- Adicionar novas tarefas com título e descrição
- Visualizar tarefas pendentes ou concluídas
- Marcar tarefas como concluídas
- Persistência de dados local via SQLite
- Interface intuitiva e responsiva

## Como executar

### Pré-requisitos
- Node.js instalado
- Expo CLI instalado (`npm install -g expo-cli`)
- Editor de código (ex: VS Code)

### Passos para rodar o app
1. Clone este repositório:
   ```bash
   git clone https://seu-repo.git
   cd nome-do-projeto
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o projeto:
   ```bash
   expo start
   ```

## Banco de Dados
O app utiliza o SQLite (com `expo-sqlite`) para armazenar localmente as tarefas dos estudantes.

### Estrutura da Tabela:
```sql
CREATE TABLE IF NOT EXISTS tarefas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  feita INTEGER DEFAULT 0
);
```

As tarefas iniciais são populadas automaticamente na primeira execução do app.

## Organização do Projeto

- `App.tsx`: inicialização do app
- `src/navigation/AppNavigator.tsx`: controle de navegação (Splash e Home)
- `src/screens/InicioScreen.tsx`: tela de boas-vindas com preload do banco
- `src/screens/HomeScreen.tsx`: visualização e gerenciamento de tarefas
- `src/database/database.ts`: lógica de banco de dados (inicialização, CRUD)
- `src/styles/styles.ts`: estilos compartilhados

---
