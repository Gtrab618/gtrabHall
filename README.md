# Halltech Invoicing Frontend

Este proyecto fue desarrollado como una prueba técnica para la empresa colombiana **Halltech**. El objetivo principal consistió en diseñar el frontend de la aplicación y consumir su API de facturación electrónica.

## 🎯 El Desafío

El reto central del proyecto fue **comprender e integrar la API de facturación** proporcionada por la empresa. Esto implicó:
*   Analizar la documentación de la API.
*   Entender los flujos de autenticación y datos requeridos para la facturación electrónica en Colombia.
*   Diseñar una interfaz de usuario intuitiva para gestionar estos procesos.

## 🛠️ Tecnologías y Herramientas

El proyecto está construido con un stack moderno enfocado en rendimiento y experiencia de desarrollador:

### Core
*   **[React 18](https://reactjs.org/)**: Biblioteca principal para la construcción de interfaces de usuario.
*   **[TypeScript](https://www.typescriptlang.org/)**: Superset de JavaScript que añade tipado estático, mejorando la calidad y mantenibilidad del código.
*   **[Vite](https://vitejs.dev/)**: Entorno de desarrollo de próxima generación, rápido y ligero.

### UI & Estilos
*   **[Material UI (MUI)](https://mui.com/)**: Biblioteca de componentes de UI robusta y personalizable. Se utilizaron paquetes como:
    *   `@mui/material`: Componentes base.
    *   `@mui/x-data-grid`: Tablas de datos avanzadas.
    *   `@mui/x-date-pickers`: Selectores de fecha.
    *   `@mui/icons-material`: Iconografía.
*   **Emotion**: Motor de estilos CSS-in-JS utilizado internamente por MUI.
*   **Iconify**: Framework de iconos unificado.

### Gestión de Datos y Estado
*   **[Axios](https://axios-http.com/)**: Cliente HTTP basado en promesas para realizar peticiones a la API.
*   **JS Cookie**: Manejo sencillo de cookies para almacenar tokens de autenticación de forma segura.

### Navegación y Utilidades
*   **[React Router DOM v7](https://reactrouter.com/)**: Manejo de rutas y navegación en la aplicación.
*   **Dayjs**: Librería ligera para el manejo de fechas y horas.
*   **React Number Format**: Componente para formatear entradas de números y monedas.

## 🔌 Integración de API

La aplicación interactúa con varios endpoints clave para la gestión de facturas:

### Autenticación
*   **Login (`/api/oauth/token`)**: Implementación de OAuth 2.0 (Password Grant) para obtener el token de acceso seguro.

### Facturación
*   **Rangos de Numeración (`/v1/numbering-ranges`)**: Consulta de los rangos disponibles para la facturación.
*   **Tributos y Productos (`/v1/tributes/products`)**: Obtención de listados de impuestos y productos configurados.
*   **Municipios (`/v1/municipalities`)**: Catálogo de municipios para la dirección de facturación.
*   **Unidades de Medida (`/v1/measurement-units`)**: Unidades estandarizadas para los items de la factura.
*   **Validación de Factura (`/v1/bills/validate`)**: Envío y validación de la estructura de la factura electrónica.

## 🚀 Instalación y Ejecución

Para correr el proyecto localmente:

1.  **Clonar el repositorio**:
    ```bash
    git clone <url-del-repo>
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Ejecutar en desarrollo**:
    ```bash
    npm run dev
    ```
