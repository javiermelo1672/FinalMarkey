# **Plan de Pruebas de Software**

![](https://user-images.githubusercontent.com/12844600/53847725-c630e380-3f7f-11e9-9b4c-8450721a0f50.png)

### ***Market Place Turist***

**“Code for real services”**

**Javier Duvan Hospital Melo 20141020096**

**Daniel García Perea 20141020212**

**Andrés M. Hastamorir 20142020118**

**Edwin Y. Hastamorir 20142020001**

## **Historial de versiones**

<table>
    <tr>
        <td>Fecha</td>
	 	<td>Versión</td>
		<td>Autor</td>
		<td>Organización</td>
		<td>Descripción</td>
   </tr>
<tr>
<td>01/10/2018
<td>0.01
<td>Daniel Garcia perea
<td>CodeDevelop
<td>Primera versión
   </tr>
   <tr>
<td>11/02/2019
<td>0.02
<td>Edwin Yesid Hastamorir
<td>CodeDevelop
<td>Adición de las transacciones
</tr>
<tr>
<td>18/02/2019
<td>0.03
<td>Andres Mauricio Hastamorir
<td>CodeDevelop
<td>Pruebas de integración con los demás marketplace
</table>

## **Información del proyecto**

<table>
<tr>
<td>Empresa / Organización
<td>CodeDevelop
</tr>
<tr>
<td>Proyecto
<td>MarketPlace Turist
</tr>
<tr>
<td>Fecha de preparación
<td>1/10/2018
</tr>
<tr>
<td>Cliente
<td>Santiago Salazar
</tr>
<tr>
<td>Patrocinador principal
<td>Turist
</tr>
<tr>
<td>Gerente / Líder de Proyecto
<td>Edwin Hastamorir
</tr>
<tr>
<td>Gerente / Líder de Pruebas de Software
<td>Daniel Garcia Perea
</tr>
</table>




## **Resumen Ejecutivo**

Por medio de este documento se da a conocer el plan de pruebas que se establece para el proyecto de desarrollo “Market Place Turist” el cual incluye una descripción del tipo de pruebas a ejecutar y los elementos probados.

## **Alcance de las Pruebas**

### **Elementos de Pruebas**
#### **Cliente:**
-   Vista de Noticias
    
-   Vista de Promociones
    
-   Módulo de chat
    
-   Módulo Usuarios
    
-   Módulo Tarjetas
    
-   Módulo Generación Pedidos
    
-   Vista de Órdenes
    
-   Vista de Paquetes

#### **Administrador:**
-   Módulo Usuarios
    
-   Módulo de Persona
    
-   Módulo Chat
    
-   Módulo Dashboard
    
-   Módulo Gestión de Proveedores
    
-   Módulo Ganancias
    
-   Módulo de Servicios d
    
-   Módulo de Noticias

#### **Proveedor:**
-   Módulo de Noticias
    
-   Módulo de Promociones
    
-   Módulo de chat
    
-   Módulo Usuarios
    
-   Módulo Tarjetas
    
-   Módulo Pedidos
    
-   Módulo Ordenes
    
-   Módulo de Paquetes

#### **Integración con Marketplace asociado:**
-   Especificación del WSDL
    
-   Conexión con el Web service
    
-   Obtención del token
    
-   Transferencia de los parámetros de consulta
    
-   Transferencia del resultado de la consulta
    
-   Apertura del archivo obtenido
- Procesamiento del archivo obtenido

### **Nuevas Funcionalidades a Probar**
#### **Cliente**
-   Inicio de sesión
    
-   Registro de Nueva Cuenta de sesión
    
-   Visualización y actualización de información de cuenta
    
-   Solicitud, seguimiento y finalización de pedidos
    
-   Visualización información de pedidos
    
-   Visualización de Información de Paquetes
    
-   Registro y edición de tarjetas
    
-   Cerrar sesión

#### **Administrador**

-   Inicio de sesión
    
-   Registro, actualización y visualización de cuenta de perfil
    
-   Registro y visualización de información de Usuarios
    
-   Edición y visualización de datos de la empresa
    
-   Seguimiento y control de estados de pedidos
    
-   Visualización y filtro de información de pedidos
    
-   Registro, edición y visualización de Información de Paquetes
    
-   Registro, edición y visualización de cuentas bancarias
    
-   Registro, edición y visualización de seguros
    
-   Cerrar sesión

## **Pruebas de Regresión**

-   Verificación de Login
    
-   Verificación de Registro
    
-   Verificación de rol de usuario
    
-   Verificación de registro de Paquetes

### **Funcionalidades a Probar**

  

-   Autenticación de Firebase: Las pruebas de funcionamiento de autenticación son responsabilidad del proveedor, nosotros realizamos las pruebas de integración.
    
-   Servicio de conexión con base de datos a través de Firebase: Las pruebas de funcionamiento de autenticación son responsabilidad del proveedor, nosotros realizamos las pruebas de integración y que los datos enviados son correctos.
    
-   Servicios de proveedores de apis: Las pruebas de funcionamiento de las apis son responsabilidad de cada uno de los proveedores, nosotros realizamos pruebas de integración y que los datos de solicitud correspondan con la documentación de la api.

### **Transacciones a detallar**

-   Registro del usuario en el sistema: Se debe garantizar que el usuario que se registre en el sistema, efectivamente quede configurado con los privilegios propios de su perfil.
    
-   Registro del paquete creado por el proveedor. Se debe garantizar que los paquetes turísticos que se crean en el sistema queden completamente configurados y accesibles desde diferentes usuarios sin dejar bloqueos en las consultas.
-  Registro de la compra del paquete. Es la transacción más compleja del sistema, ya que requiere una reservación del cupo a adquirir, la confirmación de la generación de la orden y finalmente la confirmación de la compra del paquete. Si alguna de estas fases falla, el paquete no se puede adquirir lo que genera descontento en el cliente.
    
-   Modificación de los paquetes turísticos. La información de las ofertas están sujetas a un tiempo de vigencia que se debe considerar al momento de realizar las consultas, si alguna oferta venció, no debe ser visible para el usuario.

### **Integración con otros Marketplace asociados**

-   Especificación: Lo primero a probar en el webservice son las especificaciones entregadas en el WSDL contrastando con sus ejemplos.
    
-   Conexión: Establecer la conexión con el servidor establecido por el grupo anfitrión, verificando la existencia del método de consulta.
    
-   Manejo de la respuesta: Ejecución del método y tiempo de espera de la respuesta, ya sea positiva o negativa.
    
-   Transferencia del archivo generado.
    
-   Guardado del archivo generado en un directorio local al sistema propio.
    
-   Apertura y procesamiento del archivo para mostrar la información contenida y enviada por el socio de negocio.

## **Enfoque de Pruebas (Estrategia)**

### **Pruebas Funcionales**
-   Funcionamiento del Login
    
-   Funcionamiento del Registro
    
-   Funciones de Pedido
    
-   Funciones de pago con tarjeta de crédito
    
-   Funcionamiento de Servicios.
### **Pruebas de Desempeño**

-   Tiempo promedio de inicio de la aplicación
    
-   Tiempo promedio de autenticación
    
-   Tiempo del envío y la respuesta a la solicitud CRUD.
    

### **Pruebas de Interfaces**

-   Relación entre perspectiva y pantalla.
    
-   Funcionamiento del Nav Controller(ver Ionic Docs) en cada una de las sesiones y pestañas.
    
-   Funcionamiento de los Nav Parameters en la asignación de objetos.
    
-   Mensajes de la aplicación
    
-   Notificaciones a usuario
    

### **Pruebas no Funcionales**

-   Pruebas de respuesta a ion-click.
    
-   Pruebas de carga
    
-   Pruebas de estrés
    
-   Pruebas de configuración
    
-   Pruebas de usabilidad
    
-   Pruebas de seguridad
    
-   Pruebas de mantenibilidad
    
-   Vista en iOS y Android (deben corresponder a las especificaciones de UI de cada plataforma)
    

  

### **Pruebas de Integración**

-   Pruebas de Compatibilidad con Firebase
    
-   Pruebas de la API con Firebase
    
-   Pruebas de Conexión con Firebase


### **Pruebas de transacción**

-   Consultas concurrentes antes y después de la ejecución de la transacción.
    
-   Seguimiento a través de logs para la revisión del estado de la transacción y de la justificación del fallo.
    
-   Pruebas de configuración del caché del servidor para verificar reservas del registro.
    
-   Pruebas de confirmación del caché del servidor para verificar modificaciones efectivamente realizadas.


## **Criterios de Aceptación o Rechazo**

### **Criterios de Aceptación o Rechazo**

-   El 100% de las pruebas unitarias realizadas con la librería Husky deben ser satisfactorias
    
-   Completar el 100% de la pruebas de integración con los contenedores de docker
    
-   Al menos el 90% de las pruebas de usuario deben ser exitosas
    
-   El 100% de las pruebas de transacciones deben aprobar los criterios ACID.
    

### **Criterios de Suspensión**

-   Casos en los que no se realiza la conexión a internet por motivos adversos.
    
-   Casos en los que existe un registro inscrito y sea necesario la existencia de dicho registro.
    
-   Casos en lo que no halla por alguna razón no exista conexión con la base de datos.
    
-   Casos en los que haya un problema de integridad de datos.
    
-   Casos en los que no se pueden realizar las pruebas de integración porque fallaron las pruebas unitarias.
    
-   Casos en que la UI no permita la ejecución de la prueba por razones de programación.
    
-   Casos en los que por error del entorno no se logre la ejecución.
    
-   Casos en los que por alguna razón haya problemas en el servicio de apis.
    
-   Casos en los que no se pueda garantizar la consistencia y atomicidad de las transacciones.
    

  

### **Criterios de Reanudación**

-   Restablecer la conexión con la base de datos.
    
-   Cuando se ha solucionado el problema de integridad.
    
-   Completar las pruebas unitarias éxitosamente.
-    Cuando se ha solucionado el problema UI.
    
-   Cuando se ha solucionado el problema de implementación en el entorno.
    
-   Restablecer el servicio de las apis.
    
-   Corregir los inconvenientes presentados durante la ejecución de las transacciones, de manera que se pueda asegurar una transacción con criterios ACID bien configurados.
    

##  **Entregables​**

-   Documento de plan de pruebas
    
-   Documento de casos de pruebas
    
-   Documento de especificación de diseño de casos
    
-   Logs de errores
    
-   Reportes de incidencias
    
-   Reporte del resultado de las pruebas
    
-   Reportes emitidos por herramientas de pruebas
    

## **Recursos**

### **Requerimientos de Entornos – Hardware**

1.  Conectividad con la red a través de Ethernet, Wifi o GSM (3G/4G LTE)
    
2.  Equipos de PC:
    - Escritorio o portátil
	- 8 GB RAM
	- Procesador de 8 núcleos con una velocidad de 3.4 Ghz
	- Windows 10 o posterior, Linux(debian) posteriores a la 3.0 , Mac OS X “el capitán” o posterior o Sistema operativo compatible con herramientas de desarrollo móvil como Angular 6.x y Nodejs
	 - Tarjeta gráfica de 1 GB compatible con Direct 11X
	-  Periféricos de entrada y salida de datos ●  Características del dispositivo:
	- Celular o tablet con sistema operativo android 7.0 o posterior y/o móvil con iOS 9 o posterior.
	-   2 GB de Memoria de RAM.
	-   Conectividad 3G/4G LTE o Wifi
	-  Procesador de 4 núcleos con una frecuencia de 1.8 Ghz

### **Requerimientos de Entornos – Software**

-   Firefox 60 o Chrome 69
    
-   Instalación del entorno de nodejs
    
-   Instalación del entorno Angular 6.x
    
-   Instalación del entorno Ionic
    
-   Instalación de Ionic Dev App
    

### **Herramientas de Pruebas Requeridas**

  

-   Husky
    
-   Selenium
    
-   Ionic unit test
    
-   Firebase TestLab
    
-   Pruebas de caja negra
    
-   Jasmine
    
-   Pruebas de integración
    

### **Personal**

  -   Líder de Pruebas (Daniel García Perea)
    
-   Analista de Pruebas (Javier Melo,Andres Hastamorir,)
    
-   Especialistas en Automatización de Pruebas (Edwin Hastamorir)

#### **Entrenamiento**

  
-   Aprendizaje y uso de la librería husky.
    
-   Aprendizaje, entendimiento y uso del gestor de Firebase.
    
-   Aprendizaje y uso de Angular.
    
-   Aprendizaje y uso Typescript básico y sus librerías.
    
-   Uso de GitHub.
    
-   Uso de pruebas unitarias con el framework Ionic
    
-   Aprendizaje montaje de servidor de pruebas Ionic Dev App tanto en iOS como Android
    
-   Aprendizaje montaje de .apk y .ipa en firebase Testlab.
## **Planificación y Organización**

### **Procedimientos para las Pruebas**

-   Pruebas de Caja Negra: En cada módulo se probarán las respectivas funcionalidades pero en torno a la entrada y la salida de datos.
    
-   Pruebas Unitarias: En cada módulo se probarán las respectivas funcionalidades y se examinarán los resultados para su retroalimentación.
    
-   Pruebas de Integración: En cada módulo se prueba si la integración tiene atomicidad en cuanto a la información y en cuanto a las peticiones que se realizan.
