Este projeto é uma aplicação mobile Expo com uma API backend Python Flask. Usamos Docker e docker-compose para rodar e gerenciar ambos os serviços em contêineres.

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Estrutura do Projeto

- `Dockerfile`: Configuração do contêiner para o projeto Expo (Node.js 20).
- `Dockerfile.api`: Configuração do contêiner para a API (Python 3.8).
- `docker-compose.yml`: Arquivo de configuração para rodar a aplicação Expo e a API em contêineres separados.

## Configuração

### Variáveis de Ambiente

A comunicação entre a aplicação Expo e a API usa a variável `API_URL` para definir o endpoint da API. Para garantir o correto funcionamento do projeto, o Docker Compose define automaticamente `API_URL` como `http://api:5000` dentro do contêiner Expo.

## Como Rodar o Projeto

### Passo 1: Clone o Repositório

```bash
git clone <url-do-repositorio>
cd <nome-do-repositorio>
```

### Passo 2: Rodar com Docker Compose

No diretório do projeto, execute:

```bash
docker-compose up --build
```

Esse comando irá:
1. Construir as imagens Docker para o projeto Expo e a API.
2. Rodar o contêiner da API.
3. Rodar o contêiner do Expo, que iniciará a aplicação mobile.

> **Nota:** A API executa o arquivo `create_database.py` antes de iniciar para garantir que o banco de dados esteja configurado.

### Passo 3: Acessar a Aplicação

- **API**: A API estará disponível na porta `5000` em `localhost:5000`.
- **Expo**: A aplicação Expo estará disponível na porta `8081` em `localhost:8081`.

Se estiver executando a API localmente e quer que a aplicação se comunique usando `localhost:5000`, é necessário configurar a variável `host.docker.internal`.


## Solução de Problemas

- **Erro de Conexão API**: Certifique-se de que a API está acessível no endereço definido em `API_URL`. Para contêineres em Docker Compose, `http://api:5000` deve funcionar.
  
- **Portas Ocupadas**: Se `8081` ou `5000` já estiverem em uso, altere as portas no `docker-compose.yml`.

## Executar o projeto sem o Docker

### Passo 1: Instalar Node.js e Python

Certifique-se de ter o [Node.js 20](https://nodejs.org/) e o [Python 3.8](https://www.python.org/downloads/) instalados em sua máquina.

### Passo 2: Configurar o Ambiente Python

No diretório do projeto, crie um ambiente virtual e instale as dependências:
```bash
python -m venv venv
source venv/bin/activate  # No Windows use `venv\Scripts\activate`
pip install -r ./api/requirements.txt
```

### Passo 3: Configurar o Ambiente Node.js

No diretório do projeto, instale as dependências do Node.js:
```bash
npm install
```

### Passo 4: Rodar o Banco de Dados

Execute o script para criar o banco de dados:
```bash
python api/create_database.py
```

### Passo 5: Iniciar a API

No diretório `api`, inicie a API:
```bash
python api.py
```

### Passo 6: Iniciar a Aplicação Expo

No diretório do projeto, inicie a aplicação Expo:
```bash
npm run start
```

