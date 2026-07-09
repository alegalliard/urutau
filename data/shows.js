/*
  AGENDA DE SHOWS — ÜRÜTAÜ
  =========================
  Edite esta lista pra manter a agenda atualizada. Não precisa mexer em
  mais nenhum arquivo do site.

  Campos de cada show:
    data       -> formato "AAAA-MM-DD" (usado pra ordenar e decidir se é
                  "próximo" ou "passado" automaticamente)
    cidade     -> ex: "São Paulo - SP"
    local      -> nome da casa de show
    bairro     -> opcional, deixe "" se não quiser mostrar
    ingresso   -> opcional, link de venda de ingresso. Deixe "" se não tiver
    video      -> opcional, link de um vídeo do show (aparece como "assistir")
    observacao -> opcional, qualquer nota extra (ex: "com Mávra e Kvlto")

  Pra adicionar um show novo, copie um bloco { ... } inteiro, cole antes
  ou depois de outro (a ordem no arquivo não importa, o site ordena
  sozinho) e preencha os campos.
*/

const SHOWS = [
  {
    data: "2026-11-01",
    cidade: "São Paulo - SP",
    local: "Sodom Bar",
    bairro: "Centro",
    ingresso: "",
    video: "",
    observacao: ""
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
    observacao: ""
  },
  {
    data: "2025-06-01",
    cidade: "Várzea Paulista - SP",
    local: "Bar'phomet",
    bairro: "",
    ingresso: "",
    video: "",
    observacao: ""
  },
  {
    data: "2025-03-01",
    cidade: "São Caetano do Sul - SP",
    local: "Necrópole Hall",
    bairro: "",
    ingresso: "",
    video: "",
    observacao: ""
  },
  {
    data: "2024-11-01",
    cidade: "São Paulo - SP",
    local: "La Iglesia",
    bairro: "Pinheiros",
    ingresso: "",
    video: "https://youtu.be/9fpSO8ucZFU",
    observacao: "Show de estreia da banda"
  }
];
