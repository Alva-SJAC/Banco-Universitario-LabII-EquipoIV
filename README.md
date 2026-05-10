# Banco Universitario - Frontend

Este repositorio contiene el código cliente (Frontend) para la plataforma web del "Banco Universitario", un proyecto desarrollado para el Decanato de Ciencias y Tecnología.

La solución se divide en dos componentes principales: el **Sitio Web Institucional** (informativo) y la **Banca en Línea** (transaccional).

## Stack Tecnológico

El proyecto utiliza las siguientes tecnologías y librerías:

- **Vue.js:** Framework principal para la reactividad y manejo de componentes dinámicos.
- **Tailwind CSS:** Para el diseño responsive y estilos personalizados de la web institucional.
- **Bootstrap:** Para la implementación rápida de componentes de interfaz (modales, tablas).
- **Axios:** Cliente HTTP para el consumo de la API RESTful y manejo de JSON Web Tokens (JWT).
- **jsPDF:** Librería para la generación y descarga de comprobantes de pago en el navegador.

## Arquitectura del Proyecto

El proyecto sigue una estructura modular orientada a separar la lógica de negocio (servicios y utilidades) de la capa de presentación (vistas y componentes). **No existe una carpeta backend**, ya que toda la comunicación con el servidor se maneja de forma asíncrona a través de `/services`.

```text
/banco-universitario-frontend
├── /public                     # Archivos estáticos base (index.html, favicon)
│
└── /src                        # Código fuente de la SPA
    │
    ├── /assets                 # Recursos estáticos empaquetados
    │   ├── /img                # Fotografías e isologotipos institucionales
    │   └── /css                # Hojas de estilo globales y configuración de Tailwind
    │
    ├── /components             # Piezas de interfaz reutilizables
    │   ├── /layout             # Navbar institucional, Footer, Sidebar de la banca
    │   ├── /ui                 # Alertas, modales de Bootstrap, botones, spinners
    │   └── /contacts           # Formularios del CRUD de contactos
    │
    ├── /views                  # Pantallas completas mapeadas a rutas
    │   ├── /public             # Módulo Institucional (Estático)
    │   │   └── Home.vue        # Landing page (Misión, Visión y Servicios)
    │   │
    │   └── /banking            # Módulo Transaccional (Protegido por JWT)
    │       ├── Login.vue       # Autenticación de usuarios
    │       ├── Recovery.vue    # Flujo visual de recuperación de contraseña
    │       ├── Dashboard.vue   # Perfil (Who am I) y saldo disponible
    │       ├── Transfers.vue   # Módulo de transferencias internas
    │       ├── History.vue     # Historial de movimientos paginado
    │       └── Agenda.vue      # Libreta de contactos (CRUD)
    │
    ├── /router                 # Configuración de Vue Router
    │   └── index.js            # Definición de rutas públicas y guardias de navegación (JWT)
    │
    ├── /services               # Consumo de la API externa (Axios)
    │   ├── api.js              # Configuración base (URL, interceptores de token)
    │   ├── auth.service.js     # Endpoints de login, registro y recuperación
    │   ├── bank.service.js     # Endpoints de transacciones, saldo e historial
    │   └── contact.service.js  # Endpoints de la agenda de contactos
    │
    └── /utils                  # Funciones de ayuda independientes
        ├── validators.js       # Validación de cuentas (20 dígitos), montos y correos
        └── pdfGenerator.js     # Lógica centralizada para exportar recibos con jsPDF

## Flujo de Trabajo en Git

Para **mantener el orden en el repositorio, evitar conflictos de código y facilitar la revisión, todo el equipo debe seguir el siguiente estándar para la creación de ramas y el registro de cambios (commits).

### 1. Nomenclatura de Ramas
Las ramas deben ser descriptivas, estar en minúsculas y separar las palabras con guiones. Se utilizará el formato: `tipo-accion-contexto`.

* **Ejemplo para una nueva vista:** `feat-new-view-misionVision`
* **Ejemplo para un arreglo:** `fix-navbar-mobile`
* **Ejemplo para configuración:** `chore-setup-tailwind`

### 2. Estándar de Commits
Los mensajes de commit deben ser claros, concisos y explicar qué se hizo en el código. Se debe utilizar el formato: `tipo: descripción del cambio`.

* **Ejemplo:** `feat: maquetación de la vista de registro`
* **Ejemplo:** `style: ajuste de colores institucionales en el footer`

**Prefijos permitidos para ramas y commitss:**

* `feat`: Para agregar una nueva funcionalidad, componente o pantalla.
* `fix`: Para solucionar un error o bug detectado.
* `style`: Para cambios exclusivos de diseño (clases de Tailwind, CSS, animaciones) o formato de código.
* `docs`: Para agregar o modificar documentación.
* `refactor`: Para optimizar o reestructurar código existente sin alterar su comportamiento final.
* `chore`: Para tareas de configuración del proyecto, instalación de dependencias o ajustes en las herramientas de compilación.
```
