# Amplia Saúde website

## Scripts importantes

### yarn dev

Roda aplicação em modo de desenvolvimento

### yarn build

Roda tanto `next build` quanto `next export`, gerando um diretório `./out` para publicação

---

## Diretórios importantes para manutenção de conteúdo

### /public/assets/publicacoes

Contém as imagens, separadas em subdiretórios, dos conteúdos da seção "publicações"

### /public/files

Contém os arquivos PDF de metodologia, em inglês e português

### /public/locales

Contém os arquivos `json` com os textos localizados de todo o site, separados por seção

### /src/\_publicacoes

Contém os arquivos markdown de cada conteúdo da seção "publicações". O nome do arquivo `md` deve ser o mesmo nos dois idiomas, pois será utilizado para criar a URL.
O `src` das imagens utilizadas deve ser direcionada para o diretório de assets mencionado acima:
`/assets/publicacoes/[slug]/[filename.xxx]`

### /src/pages

Os componentes no nível superior desta pasta apenas direcionam para o seu correspondente dentro de `/[locale]`, para permitir um redirecionamento no navegador ao locale adequado.
