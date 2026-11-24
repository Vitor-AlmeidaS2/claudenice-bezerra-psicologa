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

## No ar

O site está publicado no GitHub Pages:

**https://vitor-almeidas2.github.io/claudenice-bezerra-psicologa/**

Repositório: `Vitor-AlmeidaS2/claudenice-bezerra-psicologa` (público).

### Atualizar o site

Depois de mudar qualquer arquivo, rode na pasta do projeto:

```powershell
git add -A; if ($?) { git commit -m "descreva a mudanca" }; if ($?) { git push }
```

O GitHub republica sozinho em um ou dois minutos.

### Domínio próprio

Se um dia houver um domínio (ex.: `claudenicebezerra.com.br`), é só apontá-lo
para o GitHub Pages nas configurações do repositório. Nesse caso, troque também
o endereço que aparece em três lugares do `index.html`: `rel="canonical"`,
`og:url` e `og:image` — são eles que montam a prévia quando o link é
compartilhado no WhatsApp.

### O que não vai para o ar

O `.gitignore` deixa de fora as fotos originais `.jfif` e a `assets/img/foto-3.jpg`
(atendimento com rostos visíveis). O repositório é público: tudo que estiver nele
fica acessível por um endereço, mesmo que não apareça no site.

## Ver no computador

```powershell
python -m http.server 4321
```

E abrir `http://localhost:4321`.
