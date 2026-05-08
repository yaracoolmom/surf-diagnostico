# SURF Diagnóstico Familiar

Aplicación web para diagnóstico inicial de la relación padre/madre–adolescente. Construida con Next.js 14, TypeScript, Tailwind CSS y Supabase.

---

## Instalación

### Requisitos
- Node.js 18 o superior
- npm 9 o superior
- Cuenta en [Supabase](https://supabase.com) (gratis)

### 1. Clonar o descargar el proyecto

```bash
# Si lo tienes en un repositorio:
git clone <url-del-repo>
cd surf-diagnostico

# O simplemente abre la carpeta surf-diagnostico en tu terminal
cd surf-diagnostico
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo de ejemplo:

```bash
cp .env.example .env.local
```

Abre `.env.local` y llena cada variable (ver sección siguiente).

---

## Configurar Supabase

### Crear proyecto

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta gratuita.
2. Crea un nuevo proyecto (elige nombre y contraseña de base de datos).
3. Espera a que el proyecto termine de aprovisionarse (~1 min).

### Crear la tabla

1. En tu proyecto de Supabase, ve a **SQL Editor**.
2. Copia todo el contenido del archivo `supabase/schema.sql`.
3. Pégalo en el editor y haz clic en **Run**.
4. Deberías ver `Success` al final.

### Obtener las claves

En Supabase, ve a **Settings → API**:

| Variable | Dónde encontrarla |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL (ej: `https://xyz.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `anon` `public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | `service_role` key (¡mantenla secreta!) |

---

## Configurar variables de entorno

Edita `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key-aqui

# Admin — elige una contraseña segura
ADMIN_PASSWORD=una-clave-segura-aqui

# WhatsApp — número con código de país, sin espacios ni +
# Ejemplo Colombia: 573001234567
NEXT_PUBLIC_WHATSAPP_NUMBER=573001234567
```

> **Importante:** El archivo `.env.local` nunca se sube a Git (está en `.gitignore`).

---

## Correr localmente

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Páginas de la aplicación

| Ruta | Descripción |
|---|---|
| `/` | Página de inicio |
| `/diagnostico` | Formulario multi-paso (4 pasos) |
| `/resultado/[id]` | Resultado personalizado |
| `/admin` | Panel interno (requiere contraseña) |

### Acceder al admin

1. Ve a [http://localhost:3000/admin](http://localhost:3000/admin)
2. Ingresa la contraseña que configuraste en `ADMIN_PASSWORD`
3. Verás la tabla con todos los diagnósticos
4. Haz clic en cualquier fila para ver el detalle completo

---

## Método SURF

La aplicación usa el método propio **SURF**:

- **S** — Sintonizar
- **U** — Ubicar
- **R** — Reparar
- **F** — Fortalecer

### Las 4 olas

| Ola | Preguntas clave | Fase |
|---|---|---|
| Silencio Emocional | q_cierre, q_comunicacion_emocional, q_rechazo | S — Sintonizar |
| Límites Difusos | q_discusion_limites, q_consecuencias, q_acuerdos | U — Ubicar |
| Desconexión Post-Conflicto | q_reparacion, q_miedo_perder_vinculo, q_sin_ruta | R — Reparar |
| Cansancio Parental | q_culpa_cansancio, q_sin_ruta, q_consecuencias | F — Fortalecer |

---

## Decisiones de diseño (MVP)

| Decisión | Razón |
|---|---|
| Sin autenticación de usuario | Reduce fricción en el diagnóstico inicial |
| Admin con contraseña simple en env var | Suficiente para uso interno personal |
| Numerología calculada solo en servidor | Nunca se expone al usuario final |
| Service Role Key solo en API routes | Evita exposición del secreto en el cliente |
| Row Level Security en Supabase | Solo service_role puede leer/escribir la tabla |

---

## Build para producción

```bash
npm run build
npm start
```

O despliega en [Vercel](https://vercel.com) conectando el repositorio y configurando las variables de entorno en el dashboard de Vercel.

---

## Estructura de archivos

```
surf-diagnostico/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Inicio
│   │   ├── layout.tsx            # Layout raíz
│   │   ├── diagnostico/          # Formulario multi-paso
│   │   ├── resultado/[id]/       # Página de resultado
│   │   ├── admin/                # Panel interno
│   │   └── api/
│   │       ├── diagnostico/      # POST: guarda diagnóstico
│   │       └── admin/data/       # GET: datos para admin
│   ├── components/
│   │   ├── DiagnosticoForm.tsx   # Orquestador del formulario
│   │   ├── ProgressBar.tsx       # Barra de progreso
│   │   ├── StepOne.tsx           # Datos del adulto
│   │   ├── StepTwo.tsx           # Datos del adolescente
│   │   ├── StepThree.tsx         # Preguntas de escala
│   │   └── StepFour.tsx          # Confirmación
│   ├── lib/
│   │   ├── supabase.ts           # Cliente público
│   │   ├── supabase-server.ts    # Cliente con service_role
│   │   ├── diagnostico.ts        # Lógica de diagnóstico
│   │   ├── numerologia.ts        # Cálculo numerológico interno
│   │   └── validations.ts        # Esquemas Zod
│   └── types/
│       └── index.ts              # Tipos TypeScript
├── supabase/
│   └── schema.sql                # SQL para crear la tabla
├── .env.example                  # Plantilla de variables
└── README.md
```

---

## Aviso

Esta herramienta es una orientación inicial y no reemplaza acompañamiento psicológico, terapéutico, médico o legal. La información numerológica se usa exclusivamente como referencia simbólica interna y nunca se presenta al usuario como diagnóstico clínico, psicológico ni científico.
