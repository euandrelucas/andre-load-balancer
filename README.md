# andre-load-balancer

`andre-load-balancer` é um balanceador de carga simples e eficiente, implementado com **Fastify** e **@fastify/http-proxy**. Ele distribui requisições HTTP entre múltiplos servidores back-end de forma **round-robin**, garantindo alta disponibilidade e escalabilidade para sua aplicação.

## Funcionalidades

- **Round-robin** para distribuição de requisições entre múltiplos servidores back-end.
- Log bonito e informativo usando **pino-pretty**, exibindo detalhes sobre cada requisição.
- Suporte para configurações customizáveis através de um arquivo `config.json`.
- Encaminhamento de todas as requisições HTTP (GET, POST, etc.) para os servidores configurados.

## Requisitos

- **Node.js** (v20 ou superior)
- **npm** (ou **yarn**)

## Instalação

### Passo 1: Clone o repositório

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/euandrelucas/andre-load-balancer.git
cd andre-load-balancer
```

### Passo 2: Instale as dependências

Execute o seguinte comando para instalar as dependências:

```bash
npm install
```

### Passo 3: Configure os servidores

Edite o arquivo `config.json` para configurar os servidores back-end e a porta do balanceador de carga. Um exemplo de configuração pode ser:

```json
{
  "port": 8080,
  "servers": ["http://localhost:3001", "http://localhost:3002"]
}
```

- **port**: A porta onde o balanceador de carga será executado.
- **servers**: Uma lista de URLs de servidores back-end para balanceamento de carga.

### Passo 4: Execute o balanceador de carga

Após configurar o `config.json`, execute o balanceador de carga com o comando:

```bash
npm start
```

Ou, para rodar no modo de desenvolvimento:

```bash
npm run dev
```

### Passo 5: Teste a aplicação

Com o balanceador de carga rodando, envie requisições HTTP para o endereço configurado, por exemplo, `http://localhost:8080`. O balanceador distribuirá as requisições entre os servidores configurados em `config.json`.

## Estrutura do Projeto

```
andre-load-balancer/
├── src/
│   └── server.ts         # Código do balanceador de carga
├── config.json           # Configuração do balanceador de carga
├── tsconfig.json         # Configurações do TypeScript
├── package.json          # Dependências do projeto
└── README.md             # Este arquivo
```

## Como funciona

O balanceador de carga utiliza um algoritmo **round-robin** para encaminhar as requisições para os servidores definidos no arquivo `config.json`. A cada requisição recebida, o servidor atual é incrementado e, em seguida, a requisição é encaminhada para o próximo servidor.

### Log de Requisições

As requisições recebidas pelo balanceador de carga são registradas com informações como:

- Método HTTP (`GET`, `POST`, etc.)
- URL da requisição
- IP do cliente
- Cabeçalhos da requisição
- Servidor de destino para onde a requisição será encaminhada

Os logs são exibidos no terminal de forma colorida e fácil de ler.

## Licença

Este projeto está sob a [Licença MIT](LICENSE).
