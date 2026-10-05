# Gerenciador de Tarefas

Uma aplicação web desenvolvida para criar, organizar e acompanhar tarefas de forma simples e intuitiva. O projeto tem como objetivo facilitar o gerenciamento das atividades do dia a dia, permitindo acompanhar o progresso das tarefas e manter a rotina mais organizada.

## 🚀 Funcionalidades

* **Criação de tarefas:** Adicione novas tarefas rapidamente.
* **Listagem de tarefas:** Visualize todas as atividades cadastradas.
* **Status de progresso:** Marque tarefas como pendentes ou concluídas.
* **Edição de tarefas:** Atualize o nome e as informações das tarefas.
* **Exclusão de tarefas:** Remova tarefas individualmente.
* **Exclusão de tarefas concluídas:** Limpe todas as tarefas que já foram finalizadas.
* **Filtro de tarefas:** Visualize todas as tarefas, apenas as pendentes ou apenas as concluídas.
* **Barra de progresso:** Acompanhe visualmente o progresso das tarefas concluídas.
* **Feedback visual:** Notificações informam quando ações são realizadas com sucesso ou quando ocorre algum erro.

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando:

* **Frontend:** Next.js, React e TypeScript
* **Estilização:** Tailwind CSS
* **Componentes de UI:** shadcn/ui
* **Ícones:** Lucide React
* **Backend:** Next.js Server Actions
* **ORM:** Prisma
* **Banco de Dados:** PostgreSQL
* **Ferramentas:** Git e npm

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

* [Git](https://git-scm.com)
* [Node.js](https://nodejs.org)
* PostgreSQL

## 🔧 Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

### 2. Acesse a pasta do projeto

```bash
cd nome-do-repositorio
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e configure a conexão com o seu banco de dados PostgreSQL.

Exemplo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

### 5. Execute as migrações do banco de dados

```bash
npx prisma migrate dev
```

### 6. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Após iniciar o projeto, acesse:

```text
http://localhost:3000
```

> **Observação:** caso a porta `3000` já esteja sendo utilizada, o Next.js poderá iniciar automaticamente em outra porta, como `3001`.

## 📁 Estrutura do Projeto

A aplicação utiliza uma estrutura baseada no Next.js, separando componentes de interface, ações do servidor e acesso ao banco de dados.

```text
my-app/
├── src/
│   ├── app/
│   └── components/
├── lib/
│   └── generated/
├── prisma/
├── public/
├── package.json
└── README.md
```

## 🎯 Objetivo do Projeto

Este projeto também tem como objetivo servir como prática de desenvolvimento web, permitindo aplicar conceitos como:

* React e componentes reutilizáveis;
* TypeScript;
* Next.js;
* Server Actions;
* Prisma ORM;
* PostgreSQL;
* CRUD;
* gerenciamento de estado;
* estilização com Tailwind CSS;
* organização de projetos.
