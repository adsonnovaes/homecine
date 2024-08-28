# Nuxt 3 Minimal Starter

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

## Deploy - Controle de variáveis de ambiente e configuração do projeto:

``` ts
runtimeConfig: {
	public: {
		omdbApiKey: process.env.OMDB_API_KEY || "",
		omdbApi: process.env.OMDB_API || "",
		authApi: process.env.AUTH_API || "",
	},
},
```

Foi definido no arquivo `nuxt.config.ts` as variáveis de ambiente utilizada na aplicação, logo, ao subir a aplicação na vercel (ou outra plataforma de produção) será necessário definir essas três variáveis. Existe um arquivo chamado `.env.example`, onde contém os nomes das variáveis:


```.env
OMDB_API_KEY=

OMDB_API=http://www.omdbapi.com/

AUTH_API=https://dummyjson.com/auth/login
```
Dessas três, somente a `OMDB_API_KEY` terá que ser gerada no site `https://www.omdbapi.com/`, para conseguir fazer as requisições, as outras duas são a própria api da OMDB e a outra uma fake api que realiza uma seção de autenticação simulada.

Para mandar para produção, utilizei a vercel, onde após logado e vinculado com a conta do github, é possível criar um novo projeto. Com a conta vinculada ao github os projetos aparecem e pode selecioná-lo. Ao fazer isso, a tela de configuração aparece em seguida e o que precisa adicionar. Nesse ponto que será adicionado as varáveis de ambiente.
Após adicionar as variáveis de ambiente é só realizar o deploy, aguardar o build e por fim as urls geradas.

[Acessar o projeto](https://homecine-omega.vercel.app/) e veja o resultado final.
