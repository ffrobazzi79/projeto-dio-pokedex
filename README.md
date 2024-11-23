# Pokédex

Este projeto é uma Pokédex interativa que utiliza a API pública do Pokémon para listar e mostrar detalhes sobre os Pokémons. O usuário pode visualizar uma lista de Pokémons, acessar informações detalhadas sobre cada um deles, como tipos, habilidades, altura, peso e atributos.

Foi desenvolvido para reproduzir o projeto visto na aula de Renan Johannsen, Software Engineer, Lead S3 BANK e Tech Educator na DIO.

o desafio do projeto foi : 
"Explore todos os conceitos que aprendemos nesta imersão e replique (ou melhore) este projeto prático." 

## Funcionalidades

- **Carregamento Dinâmico**: Carrega Pokémons da API e os exibe em uma lista paginada, com um botão "Load More" para carregar mais.
- **Detalhes do Pokémon**: Ao clicar em um Pokémon, é exibido um card com informações detalhadas sobre ele, como tipos, habilidades, altura, peso e atributos.
- **Spinner de Carregamento**: Mostra um ícone de carregamento enquanto os dados estão sendo carregados da API.

## Demonstração

![Demonstração da Pokédex](./img/demo-image.png)

![Demonstração da Pokédex](./img/demo-image2.png)

## Tecnologias Utilizadas

- **HTML**
- **CSS**
- **JavaScript**
- **API do Pokémon (pokeapi.co)**

## Estrutura do Projeto

```markdown
.
├── index.html                  # Estrutura HTML da Pokédex
├── assets
│   ├── css
│   │   ├── global.css          # Estilo principal da Pokédex e Reset de estilo
│   │   └── pokedex.css         # Estilo toda estrutura de listagem dos cards
│   └── js
│       ├── main.js             # Lógica principal com renderização dos cards
│       ├── poke-api.js         # Lógica de comunicação com a API do Pokémon
│       └── pokemon-model.js    # Lógica para construir a classe de objetos
├── README.md                   # Documentação do projeto
└── img
    └── demo-image.png          # Imagem de demonstração da Pokédex
```
