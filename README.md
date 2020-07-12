## Aprendendo GraphQL

### Desafio 02 (Back-end)

Este é um pequeno projeto de aprendizagem de GraphQL (GQL) com Node.js. Este repositório é um aprimoramento do Desafio 01. Aqui foi abordado, além dos conceitos anteriores, e posto em prática os conceitos de Contexto e Autenticação, tornando o CRUD mais robusot e aplicando autenticação JWT.

#### 💻 Ambiente

1. Docker e Docker Compose, para a execução das instâncias do Node.js e MySQL
1. Node.js (Container), para contrução de um servidor utilizando a linguagem JS
1. MySQL (Container), como sistema de gerência de banco de dados

#### 📚 Libs

1. **graphql** para manipulação do GQL com JS
1. **graphql-import** para suporte a sintaxe de importação dentro de arquivos `.graphql`
1. **apollo-server** para a instanciação de um servidor com suporte a GQL, além da disponibilização de um _playground_ intuitivo
1. **mysql2** para utilização do driver de conexão com o banco de dados MySQL
1. **knex** para a contrução das _querys_ de criação, consulta, inserção e remoção de elementos dentro do banco de dados
1. **dotenv** para a inserão da variáveis de ambiente do arquivo `.env` (não incluido neste repositório) dentro do atributo `process.env` do servidor Node.
1. **jwl-simple** para codificação e decodificação dos dados baseando-se em JWT
1. **bcrypt-nodejs** para encriptação da senha do usuário para segurança de suas credenciais

> Observação: o pacote **graphql-import** está descontinuado. Sua utilização neste desafio se deu pela sua simplicidade
>
> Esta versão já oferece alguma camadas de seguranças (encriptação de senha e autenticação com JWT) em contraste com o Desafio 01 (anterior)
>
> No código do arquivo [context](config/context.js), existe um requerimento e execução do método [mock](config/mock.js). Esse método não é posto em produção, seu único propósito é o teste da API sem exsitência prévia da parte front-end da aplicação
