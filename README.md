Despliegue Serverless en Azure con GitHub Actions y Cosmos DB
Este repositorio contiene la implementación práctica de una arquitectura web moderna de tres capas independientes, diseñada bajo el paradigma Serverless (sin servidores) y automatizada mediante un flujo de trabajo DevOps.

Arquitectura del Sistema (3 Capas)
El proyecto se divide y desacopla en los siguientes componentes:

Capa de Presentación (Frontend): Una interfaz web estática y ligera desarrollada en HTML y JavaScript. Utiliza peticiones asíncronas (Fetch) para interactuar con el backend sin necesidad de recargar la página.

Capa de Lógica (Backend): Una Azure Function programada en Node.js bajo el plan Flex Consumption en Linux. Permite un escalado inmediato y reduce los costes a cero cuando la aplicación no recibe tráfico.

Capa de Datos (Persistencia): Una base de datos NoSQL administrada en Azure Cosmos DB que almacena y recupera registros estructurados en formato JSON de baja latencia.

Automatización DevOps (CI/CD)
El despliegue de la infraestructura está totalmente automatizado a través de GitHub Actions.

Cada vez que se realiza un git push a la rama main, un pipeline automatizado se encarga de:

Levantar un entorno virtual con Ubuntu.

Instalar las dependencias de Node.js en la ruta correspondiente (/api).

Compilar y empaquetar la solución de forma nativa.

Desplegar el código automáticamente en la Azure Function App de producción.

Seguridad y Configuración
Para garantizar la seguridad del entorno y evitar la filtración de credenciales en el repositorio público:

Las claves de acceso y cadenas de conexión a la base de datos están protegidas bajo variables de entorno (COSMOS_CONNECTION_STRING) configuradas directamente en el portal de Azure.

La comunicación entre el Frontend y el Backend requiere autenticación mediante una clave de función (Function Key).

Estructura del Repositorio
/frontend: Código fuente de la interfaz de usuario (HTML/JS).

/api: Código de la Azure Function en Node.js, incluyendo dependencias y configuración.

.github/workflows: Definición del pipeline automatizado de integración y despliegue continuo (CI/CD).
