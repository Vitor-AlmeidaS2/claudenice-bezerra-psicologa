# Site — Claudenice Bezerra

Site institucional estático (HTML, CSS e JavaScript puros). Não precisa de build,
banco de dados nem servidor: basta abrir o `index.html`.

## Arquivos

```
index.html              a página inteira
assets/css/styles.css   todo o visual
assets/js/main.js       menu, mapa cognitivo, formulário e animações
assets/img/             as fotos usadas no site
```

## Ligar o WhatsApp

Os botões de contato já funcionam por e-mail. Para passarem a abrir o WhatsApp,
abra `assets/js/main.js` e preencha o número na linha 16:

```js
const CONTATO = {
  whatsapp: '5598999999999',   // 55 + DDD + número, só dígitos
  ...
};
```

Assim que o número estiver preenchido, todos os botões, o botão flutuante e o
formulário passam a abrir o WhatsApp com a mensagem já escrita. Deixando vazio,
tudo continua indo para o e-mail.

## Instagram

O perfil `@psicologaclaubezerra` aparece em dois lugares do `index.html`:
na seção de contato e no rodapé. Se o @ mudar, troque o link e o texto
nos dois.

## Endereços dos consultórios

Os dois endereços ficam na seção de contato do `index.html`, no bloco
`<div class="enderecos">`. Cada um tem também um link "Ver no mapa" que abre o
Google Maps com o endereço escrito na busca. Se um endereço mudar, troque o texto
do card **e** o endereço dentro do link do mapa — e também no bloco
`application/ld+json` no fim do arquivo, que é o que o Google lê.

## Trocar as fotos

Substitua os arquivos em `assets/img/` mantendo os mesmos nomes
(`foto-1.jpg` a `foto-5.jpg`), ou troque o caminho no `index.html`.

- `foto-1.jpg` — topo da página
- `foto-2.jpg` — seção "Sobre mim"
- `foto-4.jpg` — seção "Para quem"
- `foto-5.jpg` — seção "Palestras e cursos"

`foto-3.jpg` (atendimento com a criança e a responsável, rostos visíveis) **não
está sendo usada**: imagem de paciente só pode ir ao ar com autorização de uso de
imagem assinada. O mesmo vale para a `foto-4.jpg`, em que a criança aparece de
costas — confirme a autorização antes de publicar.

## Publicar

Qualquer hospedagem de site estático serve. As gratuitas mais simples:

1. **Netlify Drop** — arraste a pasta inteira para `app.netlify.com/drop`.
2. **GitHub Pages** — suba a pasta em um repositório e ative Pages.
3. **Vercel** — importe a pasta, sem configuração.

Depois é só apontar o domínio próprio, se houver.

## Ver no computador

```powershell
python -m http.server 4321
```

E abrir `http://localhost:4321`.
