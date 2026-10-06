# Jogo Número 20 — publicar e instalar

## Publicar no GitHub Pages

1. Crie um repositório público no GitHub, por exemplo `jogo-numero-20`.
2. Extraia o ZIP. Envie TODOS os arquivos desta pasta para a raiz do repositório, preservando a pasta `icons`. O arquivo `index.html` deve ficar na raiz, sem uma pasta extra acima dele.
3. No repositório, abra **Settings → Pages**.
4. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
5. Selecione a branch **main** e a pasta **/(root)**. Clique em **Save**.
6. Aguarde a publicação. O GitHub mostrará o endereço, normalmente `https://SEU-USUARIO.github.io/jogo-numero-20/`.

Documentação: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Instalar no PC ou Android

Abra o endereço publicado no Chrome ou Edge. Se o navegador disponibilizar a instalação, clique em **Instalar jogo** e confirme. Caso o botão mostre instruções, use a opção de instalação no menu do navegador. A disponibilidade depende do navegador e do dispositivo.

## Instalar no iPhone/iPad

Abra o endereço no Safari. Toque em **Compartilhar → Adicionar à Tela de Início** e confirme a adição; ative a opção de abrir como aplicativo se ela aparecer.

## Jogar sem internet

Faça o primeiro acesso com internet e aguarde a mensagem **Jogo disponível offline**. Depois, o jogo usa uma cópia dos arquivos no dispositivo. Não depende do Google Sheets. Limpar os dados do navegador remove essa cópia; nesse caso, abra novamente com internet.

A partida atual não é salva: fechar ou recarregar inicia uma nova partida.

## Abrir como arquivo no PC

Você também pode abrir `index.html` diretamente, mantendo todos os arquivos na mesma pasta. Nesse modo, o jogo funciona, mas a instalação e o armazenamento offline pelo navegador exigem o endereço publicado.

## Atualizações

Ao alterar os arquivos, mude o nome do cache em `sw.js` de `destino20-v1` para `destino20-v2` (e assim por diante). Publique todos os arquivos juntos. Abra o jogo com internet, aguarde a atualização e feche/reabra para usar a nova versão.

## Regras

- Comece na casa 1.
- Cada lançamento avança de 1 a 6 casas.
- Ao terminar um lançamento na casa 4, 8, 12 ou 16, volte à casa 1.
- Chegue exatamente à casa 20 para vencer, inclusive na 12ª jogada.
- Ultrapassar 20 encerra a partida com derrota e retorna a posição para 1.
- São no máximo 12 lançamentos. Retornar ao início não renova as tentativas.

Este pacote está preparado para publicação; ele ainda não foi enviado ao seu GitHub.
