# Site — Ürütaü

Site estático, sem banco de dados. Só HTML, CSS e JavaScript puro.

## Estrutura

```
index.html          -> a página inteira (todas as seções)
css/style.css        -> todo o visual do site
js/main.js            -> menu mobile, animações de scroll e a lógica da agenda
data/shows.js          -> ONDE VOCÊ MEXE PRA ATUALIZAR A AGENDA DE SHOWS
assets/                -> logo, foto da banda e ilustração do EP
```

## Como atualizar a agenda de shows

Abra `data/shows.js` em qualquer editor de texto (Bloco de Notas, VS Code,
etc). É uma lista de shows, cada um com data, cidade e local. Pra
adicionar um show novo, copie um bloco inteiro `{ ... }`, cole em
qualquer lugar da lista e preencha os campos. O código decide sozinho
quem é "próximo show" (data futura, mostrado em destaque) e quem vira
"show anterior" (data passada), comparando com a data de hoje.

**Atenção:** os 4 shows passados que já estão na lista têm datas
aproximadas (só sabíamos os locais, não os dias exatos) — tem um
comentário marcando isso no arquivo. Vale corrigir pras datas reais
quando puder.

## SEO

O site já sai com o básico bem-feito:
- `<title>` e meta description escritos pra busca (não genéricos)
- Open Graph e Twitter Card (pra quando o link for compartilhado no
  WhatsApp/Instagram/X mostrar imagem e texto bonitos)
- Dados estruturados (JSON-LD, tipo `MusicGroup`) no `<head>` do
  `index.html`, que ajudam o Google a entender que o site é de uma
  banda, quem são os integrantes e quais são as redes oficiais
- `robots.txt` e `sitemap.xml` na raiz
- imagens com `width`/`height` definidos (evita "pulos" de layout,
  o Google penaliza isso) e `loading="lazy"` nas que não aparecem
  na primeira tela

**Sobre o domínio:** o site já está configurado com `urutaudoom.com.br`
como endereço oficial (canonical, og:url, JSON-LD etc). Como vocês
registraram os dois — `.com.br` e `.com` — configure o `.com` pra
redirecionar (301) pro `.com.br` no painel do registrador/hospedagem.
Isso evita que o Google trate os dois como sites duplicados e mantém
toda a força de SEO concentrada num endereço só.

Fora isso, SEO de banda depende muito de fatores fora do site em si:
ter o perfil no Google (Google Business/Google Artist), backlinks de
sites de música e do próprio selo, e as plataformas de streaming
linkando de volta pro site.

## Como atualizar a discografia

O tracklist do EP e os links de streaming ficam direto no `index.html`,
dentro da seção `<section id="discografia">`. Quando o EP sair
inteiro nas plataformas, é só:
1. Trocar o texto "Em produção" (`disco__status`) por algo como "Disponível"
2. Adicionar os links de Bandcamp/plataformas nos botões (`btn-row`)
3. Tirar a nota sobre "Canto da Morte" já disponível, se quiser

## Onde comprar o CD

Dentro da seção de discografia no `index.html`, tem um bloco
`<div class="vendas">` com a lista de selos. Por enquanto eles estão
sem link (bordas tracejadas, "em breve"). Assim que a Impaled Records
(ou qualquer outra distribuidora) tiver o link direto do produto, troque
o `<li>` correspondente por um link — tem um comentário no próprio
código mostrando exatamente como fazer isso. Pode adicionar quantos
selos quiser na lista.

## Seção "Ouça e assista"

Tem um player do videoclipe (YouTube) e um player embutido do Spotify
logo depois da discografia. Quando o EP inteiro sair, dá pra trocar o
player do Spotify de "artista" pra um álbum específico — é só trocar
a URL do iframe de `embed/artist/ID` pra `embed/album/ID` (o ID novo
aparece na URL do álbum quando ele existir no Spotify).

## Como ver o site no seu computador

Dê duplo clique no `index.html` — ele abre em qualquer navegador e
funciona offline, sem precisar de servidor (por isso a agenda usa um
arquivo `.js` em vez de um `.json` puro).

## Como publicar o site (hospedagem gratuita)

A forma mais simples, sem precisar saber programação:

**Netlify Drop** — acesse https://app.netlify.com/drop e arraste a pasta
inteira do site pra lá. Em segundos você recebe um link público. Depois,
em "Domain settings" do próprio Netlify, dá pra conectar o
`urutaudoom.com.br` que vocês já registraram (o Netlify mostra os
registros DNS que você precisa apontar no painel do registrador do
domínio).

**GitHub Pages** — se preferir algo versionado, suba a pasta pra um
repositório no GitHub, ative o GitHub Pages nas configurações do
repositório e depois configure o domínio customizado do mesmo jeito
(GitHub Pages também aceita domínio próprio).

Qualquer uma dessas opções é gratuita e não exige banco de dados nem
backend — é exatamente o que esse site precisa. Lembre de configurar o
`urutaudoom.com` pra redirecionar pro `.com.br` (mencionado na seção de
SEO acima), senão os dois domínios vão abrir o mesmo site sem redirecionar
um pro outro.
