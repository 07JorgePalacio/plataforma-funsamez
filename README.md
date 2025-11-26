# 🌟 Plataforma FUNSAMEZ

## Sistema Unificado para la Gestión de Donaciones y Voluntariado

Este repositorio contiene el código fuente completo para la **Plataforma FUNSAMEZ**, un sistema diseñado para centralizar la gestión de donaciones (monetarias y en especie), el registro de voluntarios, y garantizar la transparencia del impacto generado por la Fundación Sarmiento Meza.

---

## 🎯 Arquitectura y Stack Tecnológico

El proyecto está organizado como un Monorepo Lógico (Frontend y Backend en el mismo repositorio) siguiendo el patrón de **Arquitectura Hexagonal (Puertos y Adaptadores)** para asegurar la máxima separación de preocupaciones y testabilidad.

### Stack Principal

| Componente | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Backend Core** | Python | Lógica de negocio pura (Dominio y Aplicación). |
| **Framework** | Django / Django REST Framework | Adaptador de Infraestructura para la API REST. |
| **Frontend** | React | Interfaz de Usuario. |
| **Base de Datos** | PostgreSQL | Persistencia de datos transaccionales. |
| **Gestión Ágil** | Jira & Scrum | Flujo de trabajo y gestión de tareas. |

### 📁 Estructura del Proyecto

* `/frontend`: Aplicación cliente desarrollada en React.
    * Organizada por `features` (Donations, Volunteers, Transparency).
* `/backend`: API RESTful en Python/Django.
    * Organizada en capas de **Dominio**, **Aplicación** e **Infraestructura** (Arquitectura Hexagonal).
* `/config`: Archivos de configuración para el entorno de desarrollo y despliegue.

---

## 🚀 Inicio Rápido (Levantar el Entorno de Desarrollo)

Recomendamos usar Docker Compose para iniciar el entorno de desarrollo con la base de datos y los servicios.

### Requisitos

1.  [Docker](https://www.docker.com/)
2.  [Docker Compose](https://docs.docker.com/compose/)

### 1. Clonar el Repositorio

```bash
git clone [https://github.com/tu-organizacion/plataforma-funsamez.git](https://github.com/tu-organizacion/plataforma-funsamez.git)
cd plataforma-funsamez

# 🌳 Flujo de Trabajo Git (Git Workflow)

Este proyecto utiliza una estrategia de ramas basada en **Requisitos Funcionales**. 

La rama `main` contiene el código base estable. Cada nuevo Requisito Funcional (RF) se desarrolla en su propia rama independiente y, una vez completado y probado, se fusiona (merge) de vuelta a `main`.

## 📊 Gráfico del Flujo

```mermaid
gitGraph
   commit id: "Inicio Proyecto"
   commit id: "Configuración Base"
   
   %% Requisito Funcional 01
   branch RF-01-Login
   checkout RF-01-Login
   commit id: "Diseño Interfaz"
   commit id: "Lógica Auth"
   checkout main
   merge RF-01-Login id: "Merge RF-01"

   %% Requisito Funcional 02
   branch RF-02-Catalogo
   checkout RF-02-Catalogo
   commit id: "Crear BD"
   commit id: "Vista Productos"
   checkout main
   merge RF-02-Catalogo id: "Merge RF-02"

   %% Requisito Funcional 03 (En desarrollo)
   branch RF-03-Pagos
   checkout RF-03-Pagos
   commit id: "API Pasarela"
   commit id: "Validaciones"
   
   checkout main
   commit id: "Hotfix menor"
