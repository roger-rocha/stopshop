# Revisão beeclã — 29/09/2026

Fonte: `Stop_Shop_Verificacao_Relatorio_beecla_v2.pdf`, revisão de 24/09/2026.
O pedido do usuário exclui o item “Mais de uma loja por lojista”. O fluxo de acesso não foi alterado.

## Implementado no código

- Galeria nos cards do diretório e dos segmentos: amplia imagens, navega por botões e setas do teclado, fecha com Escape e restaura o foco.
- Cadastro existente em `/admin/stores`: até 12 fotos adicionais, envio múltiplo, ordenação e remoção. Logo e fachada continuam separados; as fotos são persistidas em `stores.photos`.
- Busca compartilhada entre diretório e cabeçalho por nome, descrição, categoria e localização, sem distinção de acentos. “Atacado” recebe uma orientação de varejo e o diretório oferece limpar os filtros.
- Remoção das referências comerciais a atacado no rodapé, Sobre, Abra uma loja, Contato, FAQ, blog, página 404, metadados e dados estruturados.
- Remoção do bloco “Rota do atacado” e das configurações sem uso no painel; `/atacado` redireciona permanentemente para `/lojas`.
- Revisão das descrições de Baby&H Store, Sufatex, Linda Lu, Ciafox e Moon. Pano Velho também continha texto sobre atendimento a revendedores e entrou na revisão.

## Publicação

As mudanças não foram publicadas e o banco remoto não foi alterado. A validação usa `data/beecla-review.db`, uma cópia local do conteúdo público.

1. Antes de publicar, incluir a coluna `stores.photos`. O comando já existente `pnpm vercel-build` executa o schema push antes do build. Em um processo de publicação separado, aplicar a mudança de schema antes de iniciar a nova versão.
2. Revisar as seis descrições com o responsável pelo conteúdo. O PDF solicita alinhamento com as lojas; nenhum contato externo foi enviado.
3. Conferir a prévia: `pnpm exec tsx --env-file=.env.local scripts/update-retail-descriptions.ts`.
4. Aplicar com `--apply` no banco de destino. O script só troca os textos exatos revisados, preserva alterações posteriores e pode ser repetido. Não usar o atualizador genérico com `--force`.
5. Publicar e verificar diretório, segmentos, busca do cabeçalho, uploads autenticados e redirecionamento de `/atacado`. Revalidar o cache da busca e das páginas; o deploy após a atualização dos textos já reconstrói esses conteúdos.

## Definições pendentes

### Domínio antes do lançamento

O código já utiliza `https://stopshop.com.br` em metadados, sitemap e robots, mas o relatório registra `stopshop-v1.vercel.app` como ambiente publicado. Confirmar domínio definitivo, acesso ao DNS e data de lançamento antes da migração.

Sequência: confirmar domínio e data → configurar domínio/DNS na hospedagem → verificar certificado e domínio principal → conferir redirecionamentos, sitemap e metadados → testar os formulários e navegação no domínio final → liberar lançamento. Nenhuma data foi presumida.

### Clube de relacionamento

Aguardando definição do usuário sobre implementar agora ou em uma fase posterior. Não foi criado um programa de pontos, benefícios ou coleta de dados sem definir o escopo. A proposta do relatório é iniciar cadastro pelo clique em “Falar com a loja”; cliques de contato, sozinhos, não comprovam visitas ou compras.

## Validação executada

- Build de produção concluído com a cópia local; TypeScript e ESLint dos arquivos alterados passaram.
- Sete testes passaram: categorias, busca por descrição/acentos, compatibilidade das imagens legadas, deduplicação, ordenação e limites/URLs da galeria.
- Navegador: abertura/fechamento por clique, setas, Escape, retorno do foco, busca por descrição e mensagem para atacado. Conferência responsiva sem transbordamento horizontal no diretório.
- Painel local: reordenação, rejeição de URL inválida, remoção, salvamento e reabertura das fotos persistidas.
- HTTP: Home, Sobre, Abra uma loja, Contato, Blog e Lojas retornaram 200 sem os textos de atacado removidos. `/atacado` retornou 308 para `/lojas`.
- Limite da verificação: não foi realizado upload real de novos arquivos no Blob remoto, nem deploy/DNS. O envio reutiliza a integração autenticada existente.
