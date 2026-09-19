// Função serverless da Vercel: faz a cobrança Pix na NovaPay
// mantendo o Client Secret seguro (nunca aparece no site).
//
// Variáveis de ambiente necessárias (configurar no painel da Vercel,
// em Settings > Environment Variables):
//   NOVAPAY_CLIENT_ID     -> seu "ci"
//   NOVAPAY_CLIENT_SECRET -> seu "cs"

export default async function handler(req, res) {
  // Libera chamadas vindas do site (GitHub Pages)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Use POST.' });
  }

  try {
    const { amount, description } = req.body || {};

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ error: 'Campo "amount" é obrigatório e deve ser um número maior que zero.' });
    }

    const clientId = process.env.NOVAPAY_CLIENT_ID;
    const clientSecret = process.env.NOVAPAY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return res.status(500).json({ error: 'Credenciais da NovaPay não configuradas no servidor.' });
    }

    const novapayResponse = await fetch('https://api.anovapay.com.br/charges', {
      method: 'POST',
      headers: {
        'ci': clientId,
        'cs': clientSecret,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount,
        description: description || 'Pedido Fonte de Fato'
      })
    });

    const data = await novapayResponse.json();

    if (!novapayResponse.ok) {
      return res.status(novapayResponse.status).json({ error: 'Erro ao criar cobrança na NovaPay.', details: data });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno ao processar a cobrança.', details: String(err) });
  }
}
