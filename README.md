# NovaPay Proxy (Fonte de Fato)

Função serverless que faz a ponte segura entre o site (GitHub Pages) e a
API da NovaPay, sem expor o Client Secret no navegador.

## Como publicar na Vercel

1. Acesse **vercel.com**, faça login (pode ser com sua conta GitHub).
2. Clique em **"Add New" → "Project"**.
3. Selecione este repositório.
4. Antes de clicar em "Deploy", vá em **"Environment Variables"** e adicione:
   - `NOVAPAY_CLIENT_ID` = (o seu Client ID)
   - `NOVAPAY_CLIENT_SECRET` = (o seu Client Secret — NUNCA coloque isso
     direto no código, só aqui no painel da Vercel)
5. Clique em **Deploy**.
6. Quando terminar, a Vercel vai te dar uma URL tipo:
   `https://fonte-de-fato-pagamento.vercel.app`
7. A função de cobrança vai estar disponível em:
   `https://fonte-de-fato-pagamento.vercel.app/api/create-charge`

Guarde essa URL final — ela precisa ser configurada no código do site.
