/*
  AGENDA DE SHOWS — ÜRÜTAÜ
  =========================
  Edite esta lista pra manter a agenda atualizada. Não precisa mexer em
  mais nenhum arquivo do site.

  Campos de cada show:
    data       -> formato "AAAA-MM-DD" (usado pra ordenar e decidir se é
                  "próximo" ou "passado" automaticamente)
    evento     -> opcional, nome do evento
    cidade     -> ex: "São Paulo - SP"
    local      -> nome da casa de show
    bairro     -> opcional, deixe "" se não quiser mostrar
    ingresso   -> opcional, link de venda de ingresso. Deixe "" se não tiver
    video      -> opcional, link de um vídeo do show (aparece como "assistir")
    flyer      -> opcional, link do flyer do evento
    observacao -> opcional, qualquer nota extra (ex: "com Mávra e Kvlto")

  Pra adicionar um show novo, copie um bloco { ... } inteiro, cole antes
  ou depois de outro (a ordem no arquivo não importa, o site ordena
  sozinho) e preencha os campos.
*/

const SHOWS = [
  {
    data: "2026-11-01",
    evento: "Selene Sabbath II",
    cidade: "São Paulo - SP",
    local: "Sodom Bar",
    bairro: "Centro histórico",
    ingresso: "https://wa.me/5511977862169?text=Ol%C3%A1%2C%20estou%20vindo%20pelo%20site%20da%20Urutau%2C%20gostaria%20de%20pegar%20um%20ingresso%20para%20o%20evento%20Selene%20Sabbath%2C%20do%20dia%2001%20de%20novembro",
    video: "",
    flyer: "https://shows.undershows.com.br/artist/urutau/",
    observacao: "Selene Sabbath II · Rua Dr. Falcão Filho, 87 · a partir das 16h · com Prophetic Age, Evil Sense e Língua Sacra",
    maps: "https://maps.app.goo.gl/Jp5ogxLZzvSQtnhK9"
  },

  // ATENÇÃO: as datas dos 4 shows passados abaixo são placeholders
  // (só sabíamos os locais, não as datas exatas). Corrija pra data real
  // de cada um — o resto do site funciona normalmente enquanto isso.
  {
    data: "2025-09-01",
    cidade: "Santo André - SP",
    local: "Black Bird Rock & Beer",
    bairro: "",
    ingresso: "",
    video: "",
    observacao: "",
    maps: ""
  },
  {
    data: "2025-06-01",
    cidade: "Várzea Paulista - SP",
    local: "Bar'phomet",
    bairro: "",
    ingresso: "",
    video: "",
    observacao: "",
    maps: ""
  },
  {
    data: "2025-03-01",
    cidade: "São Caetano do Sul - SP",
    local: "Necrópole Hall",
    bairro: "",
    ingresso: "",
    video: "",
    observacao: "",
    maps: ""
  },
  {
    data: "2024-11-01",
    cidade: "São Paulo - SP",
    local: "La Iglesia",
    bairro: "Pinheiros",
    ingresso: "",
    video: "https://youtu.be/9fpSO8ucZFU",
    observacao: "Show de estreia da banda",
    maps: ""
  }
];
