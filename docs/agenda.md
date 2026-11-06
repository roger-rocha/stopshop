# Agenda e calendário

Os eventos são cadastrados em **Admin → Agenda**. A mesma imagem e o mesmo título
alimentam o carrossel de banners e os cartões no calendário da home.

- Sem data de início: somente banner permanente.
- Com data: aparece no calendário. Fim vazio significa um único dia; períodos incluem ambos os dias.
- Horários opcionais: preencher início e fim juntos, com término posterior ao início. O mesmo horário vale para cada dia do período.
- Sem horários: o cartão mostra “Horário a confirmar”.
- Vários eventos: cartões ordenados pelo horário, depois pela ordem cadastrada. Eventos sem horário ficam ao final.
- Eventos encerrados saem do carrossel, mas permanecem consultáveis nas datas passadas do calendário.
- A descrição é uma anotação interna e não é enviada aos componentes públicos.
- O funcionamento do shopping continua em **Configurações → Agenda de funcionamento**, separado dos horários dos eventos.

## Banco e publicação

As novas colunas `events.start_time` e `events.end_time` são anuláveis. Em bancos
existentes, execute a migração aditiva antes de iniciar esta versão:

```sh
pnpm db:migrate-event-times
```

Esse comando usa o banco configurado em `.env.local`. Para outro ambiente, forneça
`DATABASE_URL` e, se necessário, `DATABASE_AUTH_TOKEN` ao processo e execute:

```sh
pnpm exec tsx scripts/migrate-event-times.ts
```

O script não remove nem recria tabelas; só adiciona as colunas ausentes e pode ser
executado novamente. Exige uma URL explícita e uma tabela `events` já existente.
Bancos novos continuam sendo preparados com `pnpm db:push`.

O comando `pnpm vercel-build` executa a migração antes do build. Um ambiente que
substitua esse comando por `next build` deve executar a migração separadamente.
