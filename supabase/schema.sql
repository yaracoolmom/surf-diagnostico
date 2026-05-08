-- SURF Diagnóstico Familiar — Esquema Supabase
-- Ejecutar en el SQL Editor de tu proyecto Supabase

create table if not exists diagnosticos_surf (
  id                        uuid primary key default gen_random_uuid(),
  created_at                timestamp with time zone default now(),

  -- Datos del adulto
  nombre_adulto             text not null,
  email                     text not null,
  whatsapp                  text not null,
  rol                       text not null,
  cumple_adulto             date not null,
  acepta_contacto           boolean not null default false,

  -- Datos del adolescente
  nombre_hijo               text not null,
  edad_hijo                 int not null,
  cumple_hijo               date not null,
  genero_hijo               text not null,
  principal_preocupacion    text not null,

  -- Respuestas diagnóstico (escala 1-5)
  q_cierre                  int not null check (q_cierre between 1 and 5),
  q_discusion_limites       int not null check (q_discusion_limites between 1 and 5),
  q_consecuencias           int not null check (q_consecuencias between 1 and 5),
  q_reparacion              int not null check (q_reparacion between 1 and 5),
  q_culpa_cansancio         int not null check (q_culpa_cansancio between 1 and 5),
  q_comunicacion_emocional  int not null check (q_comunicacion_emocional between 1 and 5),
  q_acuerdos                int not null check (q_acuerdos between 1 and 5),
  q_rechazo                 int not null check (q_rechazo between 1 and 5),
  q_miedo_perder_vinculo    int not null check (q_miedo_perder_vinculo between 1 and 5),
  q_sin_ruta                int not null check (q_sin_ruta between 1 and 5),

  -- Resultados calculados
  promedio_total            numeric(4,2) not null,
  ola_principal             text not null,
  fase_surf                 text not null,
  resultado_visible         jsonb not null,

  -- Numerología interna (nunca se expone al usuario)
  adulto_compound_number    int,
  adulto_final_number       int,
  adulto_numerology_keyword text,
  hijo_compound_number      int,
  hijo_final_number         int,
  hijo_numerology_keyword   text,
  lectura_simbolica_interna text,

  -- Gestión comercial
  prioridad_comercial       text not null check (prioridad_comercial in ('Alta', 'Media', 'Baja')),
  nota_interna              text
);

-- Índices útiles para consultas frecuentes
create index if not exists idx_diagnosticos_created_at
  on diagnosticos_surf (created_at desc);

create index if not exists idx_diagnosticos_email
  on diagnosticos_surf (email);

create index if not exists idx_diagnosticos_prioridad
  on diagnosticos_surf (prioridad_comercial);

-- Row Level Security: solo el service_role puede leer/escribir
-- El cliente anon NO tiene acceso directo a esta tabla
alter table diagnosticos_surf enable row level security;

-- Política: solo service_role tiene acceso total
-- (Las escrituras desde la API route y lecturas del admin usan service_role key)
create policy "service_role_all"
  on diagnosticos_surf
  for all
  to service_role
  using (true)
  with check (true);
