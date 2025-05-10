# Proyecto Fullstack - Prueba Técnica NTT DATA

## Descripción
Este proyecto es una aplicación fullstack desarrollada como parte de una prueba técnica. Está dirigida al evaluador técnico, con el propósito de demostrar competencias en el desarrollo de aplicaciones modernas y escalables. Para ello, se utilizó Spring Boot en el backend y React con Vite en el frontend, aplicando buenas prácticas tanto en arquitectura como en organización del código.
## Tecnologías Utilizadas

### Backend
- Java 17  
- Spring Boot 3.x  
- Spring Web  
- Spring Security  
- Spring Data JPA  
- MySQL  
- JWT (Java Web Tokens - `jjwt`)  
- Springdoc OpenAPI (Swagger)  
- Bean Validation (Jakarta Validation)  
- Maven

### Frontend
- React 19  
- Vite  
- Axios  
- Chakra UI (componentes, formularios y modales)  
- Zustand (state management)  
- React Hook Form  
- @tanstack/react-query (manejo de datos remotos)  
- @tanstack/react-table (tablas avanzadas)  
- React Router  
- React Icons / Lucide React (iconografía)  
- Hookform Resolvers (validaciones con schemas)

## Requisitos Previos
Para ejecutar este proyecto necesitarás tener instalado:

- Java JDK 17 o superior
- Node.js 16.x o superior
- npm 8.x o superior
- Maven 3.8.x o superior

## Modelo de Datos

### Usuarios
El sistema utiliza un modelo de usuario básico con roles:

```java
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Enum.Role role; // Puede ser ADMIN, USER
}
```

## Instalación y Configuración

### Backend (Spring Boot)

1. Navega a la carpeta del backend:
   ```bash
   cd backend
   ```

2. Compila el proyecto:
   ```bash
   mvn clean install
   ```

3. Ejecuta la aplicación:
   ```bash
   mvn spring-boot:run
   ```

El servidor backend se iniciará en `http://localhost:8080`.

### Frontend (React/Vite)

1. Navega a la carpeta del frontend:
   ```bash
   cd frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ejecuta la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```

La aplicación frontend estará disponible en `http://localhost:5173`.

## Variables de Entorno

### Backend
El proyecto utiliza perfiles de Spring Boot para diferentes entornos. Los archivos de configuración principales son:

#### application-dev.properties
Este archivo contiene la configuración para el entorno de desarrollo:

```properties
# Puerto del servidor
server.port=${server_port:8080}

# Configuración de Base de Datos
spring.datasource.url=${db_url}
spring.datasource.username=${db_user}
spring.datasource.password=${db_password}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA / Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# JWT
jwt.secret=${jwt_secret}
jwt.expiration=${jwt_expiration}

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

> **Importante:** Es necesario configurar estas variables de entorno en IntelliJ IDEA mediante la edición de configuración de ejecución:
> 1. Ve a Run > Edit Configurations
> 2. En la configuración de Spring Boot, añade las siguientes variables de entorno:
>    - server_port=8082
>    - db_url=jdbc:mysql://localhost:3306/nombre_db?useSSL=false&serverTimezone=UTC
>    - db_user=tu_usuario_db
>    - db_password=tu_contraseña_db
>    - jwt_secret=nI2wlItdlyQuq5bOxfsiBoqoEsmRmjieXlkaaEBK2Phr8EAB7gqtbJZMGVZGipKbVSXEtwaADmSBkwoALGfAgaZHYVkDMDMjvx5MJenuuwLHDenfj8Zsgo8HLcCeeNUUvz84D1mS02zoA09kfJwgw258kntWsIhCtotzSpDe3NRPEGeA78Tie8UKj4AkYR6SevqCdGsiq8PbSEUitkZWhD1JlYtshUlnfdlETW0RkDGAebhwiqDY0pkb6F3C7MwI
>    - jwt_expiration=604800000
>
> Se recomienda utilizar específicamente estos valores para las claves JWT ya que han sido probados y validados para el correcto funcionamiento de la aplicación.

También existe un archivo `application-prod.properties` para el entorno de producción, pero el principal para desarrollo es `application-dev.properties`.

#### Inicialización de Usuario Administrador
El sistema está configurado para crear automáticamente un usuario administrador por defecto al iniciar la aplicación:

- Email: admin@example.com
- Contraseña: admin123
- Rol: ADMIN

### Frontend
Crear un archivo `.env` en la carpeta raíz del frontend con las siguientes variables:

```
VITE_API_HOST=localhost
VITE_API_PORT=8080
VITE_BASE_URL=http://${VITE_API_HOST}:${VITE_API_PORT}/api
```

Estas variables se utilizan para configurar la URL base para las llamadas a la API.

## API Endpoints

### Documentación de la API
La documentación completa de la API está disponible a través de Swagger UI:
```
http://localhost:8080/swagger-ui/index.html
```

Puedes explorar todos los endpoints, ver los modelos de datos y probar las operaciones directamente desde la interfaz de Swagger.


## Compilación para Producción

### Backend
```bash
cd backend
mvn clean package
```
El archivo JAR estará disponible en `target/`.

### Frontend
```bash
cd frontend
npm run build
```
Los archivos optimizados estarán disponibles en `dist/`.
## Pruebas

### Backend
Las pruebas unitarias pueden ejecutarse de varias formas:

#### Mediante Maven
```bash
cd backend
mvn test
```

#### Desde IntelliJ IDEA
También puedes ejecutar las pruebas directamente desde IntelliJ IDEA:
1. Navega hasta la carpeta `src/test/java`
2. Haz clic derecho en la carpeta de pruebas
3. Selecciona "Run Tests in..." o "Debug Tests in..."
4. Alternativamente, puedes abrir una clase de prueba específica y ejecutarla individualmente con el icono de "play" junto al nombre de la clase o método

Las pruebas cubren servicios principales de la aplicación.


## Características Implementadas
- Autenticación y autorización con JWT
- CRUD completo para entidad Empleado
- Validación de datos en backend
- Gestión de estados en el frontend
- Interfaces responsivas
- Manejo de errores

## Contacto
Axel Jhosmell Muñoz Silva - axeljhosmell13@gmail.com

---

Este proyecto fue desarrollado como parte de una prueba técnica para NTT DATA.
