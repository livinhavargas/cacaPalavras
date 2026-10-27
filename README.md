# Palavra do Dia

Jogo diário de adivinhação de palavras, feito como uma aplicação web estática mobile-first. O desafio é igual para todo mundo e muda à meia-noite UTC. O progresso e as estatísticas ficam salvos no armazenamento local do navegador; não há cadastro nem dependências de instalação.

## Executar localmente

Na raiz do projeto, inicie um servidor estático:

```powershell
python -m http.server 8000
```

Depois, abra `http://localhost:8000` no navegador. Também é possível abrir `index.html` diretamente, mas um servidor local oferece comportamento mais consistente para armazenamento e compartilhamento.

## Funcionalidades

- Até seis tentativas, com feedback por letra e suporte a teclado físico ou virtual.
- Desafio diário determinístico, com o mesmo tema e palavra para todos.
- Partida em andamento, streak e estatísticas salvos no aparelho.
- Resultado compartilhável sem revelar a palavra.
