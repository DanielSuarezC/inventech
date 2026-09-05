# **Sistema Integrado de Punto de Venta y Control de Inventario** 

## **Impresiones Colina Real** 

**Proyecto de Aula Semestral (PAS) Arquitectura y Sistemas Operativos** 

|**Institución:**|Universidad de Santander (UDES)|
|---|---|
|**Programa:**|Ingeniería de Sistemas|
|**Asignatura:**|Arquitectura y Sistemas Operativos|
|**Empresa beneficiaria:**|Impresiones Colina Real|
|**Integrantes**|Daniel David Suarez Caldera<br>Pedro Pablo Lugo Bedoya<br>Valeria Ospino Bula<br>Jesús Daniel Carrascal Hoyos|
|**Tipo de proyecto:**|Tecnológico descriptivo — Sistema IoT|
|**Versión del documento:**|2.0|
|**Fecha:**|2 de junio de 2026|



## **Tabla de Contenidos** 

1. Resumen Ejecutivo 

2. Introducción 

3. Planteamiento del Problema 

4. Objetivos 

5. Antecedentes 

6. Metodología 

7. Diseño Arquitectónico 

8. Desarrollo 

9. Pruebas del Sistema 

10. Resultados 

11. Conclusiones 

12. Recomendaciones 

13. Trabajos Futuros 

14. Bibliografía 

15. Anexos 

## **Resumen Ejecutivo** 

El presente proyecto desarrolla un **sistema embebido IoT de inventario y punto de venta** para la papelería Impresiones Colina Real, establecimiento comercial colombiano que operaba sin herramientas digitales de gestión. 

**El problema:** Gestión manual de inventario (~400 referencias), registro de ventas en cuaderno, errores de digitación en el 12–15 % de transacciones y tiempo de atención de 4–6 minutos por cliente. 

**La solución:** Un nodo hardware compuesto por un Arduino Uno R3 y un escáner de código de barras MH-ET V3.0, conectado mediante USB a un PC anfitrión que corre un script bridge-local (Node.js). Este bridge retransmite los eventos del hardware a un backend en la nube (NestJS + PostgreSQL en Render.com). El operador interactúa con una SPA Angular desplegada en Netlify. 

**Resultados cuantificables:** Tiempo de registro por ítem reducido de ~3 minutos a < 2 segundos; tasa de error de digitación llevada a 0 %; inventario actualizado en tiempo real con latencia < 1 s; alertas automáticas de stock bajo; exportación de reportes en PDF y XLSX. 

**Costo de hardware:** < $60.000 COP (Arduino Uno R3 + scanner MH-ET V3.0 + cable USB), haciendo la solución replicable para cualquier pequeño comercio. 

## **Introducción** 

La digitalización del comercio minorista ha pasado de ser una ventaja competitiva a una necesidad operativa. Las pequeñas y medianas empresas que aún gestionan su inventario de forma manual enfrentan pérdidas recurrentes por desabastecimiento, exceso de stock, errores de digitación y lentitud en el proceso de caja. En Colombia, según el DANE (2023), el 68 % de los establecimientos de comercio al por menor con menos de cinco empleados no utiliza ningún sistema de información para gestionar su inventario. 

La papelería **Impresiones Colina Real** es un caso representativo: opera con registro manual en cuadernos y sin trazabilidad de ventas. Su propietario no conoce con certeza cuántas unidades de cada producto tiene disponibles en tiempo real, lo que genera compras innecesarias y pérdidas de ventas por agotamiento de artículos de alta rotación. 

Este proyecto propone resolver ese problema mediante un **sistema IoT de bajo costo** que combina hardware embebido (Arduino Uno R3 + escáner de código de barras MH-ET V3.0) con software en la nube (backend NestJS + frontend Angular), conectados a través de un script de puente local (bridge-local Node.js). El resultado es un sistema completo de inventario y punto de venta accesible desde cualquier navegador web. 

Los objetivos del proyecto se cumplen en su totalidad: se construyen dos sensores de recolección de datos (el lector óptico de barras y el sensor de temperatura interno del ATmega328P), se implementa la cadena completa de procesamiento de datos desde el hardware hasta la interfaz web, y se documenta el proceso siguiendo los lineamientos académicos del PAS. 

## **1. Planteamiento del Problema** 

### **1.1. Descripción del problema** 

Impresiones Colina Real gestiona un inventario de aproximadamente 400 referencias de productos (papelería, útiles escolares, servicios de impresión) mediante registros manuales en cuadernos y hojas de cálculo desactualizadas. El proceso de venta requiere que el cajero busque el precio en una lista impresa, lo digite manualmente en una calculadora y registre la transacción en un libro de caja. 

Este flujo tiene múltiples puntos de falla identificados mediante observación directa y entrevista con el propietario: 

|**#**|**Problema**|**Impacto cuantificado**|
|---|---|---|
|1|Errores de digitación|12–15 % de transacciones con discrepancias de<br>precio|
|2|Inventario desactualizado|Conteo físico solo mensual; sin stock real en<br>tiempo real|
|3|Desabastecimiento no<br>detectado|≥ 3 veces/semana clientes solicitan producto<br>agotado sin saberlo|
|4|Lentitud en caja|4–6 min promedio por cliente con > 3 productos|
|5|Imposibilidad de análisis|Sin registros digitales; sin identificación de<br>productos más vendidos|



### **1.2. Justificación** 

La implementación de un sistema IoT de inventario y POS resuelve directamente los cinco problemas identificados: 

- El uso de lectores de código de barras estándar (EAN-13 / Code128) **elimina la digitación manual** . 

- La sincronización en tiempo real con la base de datos en la nube **garantiza stock actualizado** . 

- La interfaz web permite al propietario **acceder a reportes desde cualquier dispositivo** . 

- Las alertas de stock bajo **previenen el desabastecimiento** antes de que ocurra. 

- Los módulos de reportes con gráficos Chart.js y exportación PDF/XLSX **habilitan el análisis de negocio** . 

Desde el punto de vista académico, el proyecto integra competencias de **Arquitectura de Computadores** (programación del ATmega328P a nivel de registros ADC), **Sistemas Operativos** (comunicación entre procesos vía puertos seriales, gestión de drivers USB, colas de mensajes), **Redes** (protocolo HTTP/REST, SSE, despliegue en la nube) y **Desarrollo de Software** (arquitectura por capas, API REST, SPA Angular con Signals reactivos). 

El costo total del hardware (< $60.000 COP) hace que la solución sea replicable para cualquier pequeño comercio, maximizando el impacto social del proyecto. 

## **2. Objetivos** 

### **2.1. Objetivo General** 

Diseñar e implementar un sistema IoT de bajo costo para la gestión automatizada de inventario y punto de venta de la papelería Impresiones Colina Real, mediante la integración de un nodo embebido Arduino Uno R3 con un escáner de código de barras MH-ET V3.0, un script de puente local y una aplicación web en la nube. 

### **2.2. Objetivos Específicos** 

- Programar el firmware del Arduino Uno R3 para leer códigos de barras desde el escáner MH-ET V3.0 por SoftwareSerial y retransmitirlos por USB-Serial como mensajes JSON estructurados. 

- Implementar la lectura del sensor de temperatura interno del microcontrolador ATmega328P mediante acceso directo a registros ADC, integrando la telemetría en el protocolo de comunicación Serial. 

- Desarrollar el script <mark>`bridge-local`</mark> en Node.js que reciba los mensajes Serial del Arduino y los retransmita vía HTTP POST al backend en la nube, con manejo de reconexión automática y cola offline FIFO. 

- Construir la API REST del backend con NestJS y PostgreSQL para gestionar el catálogo de productos (con variantes, categorías y medios de pago), movimientos de inventario y registro de ventas. 

- Desarrollar la interfaz web con Angular 17 que incluya el módulo POS (con teclado numérico para productos sin precio fijo), el módulo backoffice de inventario (con variantes y márgenes en tiempo real) y el módulo de reportes (con gráficos Chart.js y exportación PDF/XLSX). 

- Desplegar el sistema completo en producción (Render.com + Netlify) con pipeline CI/CD en GitHub Actions y documentar el proceso de instalación y uso. 

## **3. Antecedentes** 

### **3.1. Contexto Internacional** 

**Trabajo 1 — "Low-Cost IoT Inventory Management Using Arduino and RFID" (IEEE, 2022):** Propone un sistema basado en Arduino Mega y módulo RFID RC522 para gestión de inventario en pequeños almacenes, demostrando que el costo del nodo hardware puede mantenerse por debajo de USD 15. La diferencia con el presente proyecto radica en el uso de código de barras en lugar de RFID, lo cual aprovecha la infraestructura de etiquetado ya existente en productos comerciales sin costo adicional. 

**Trabajo 2 — "RESTful API Design for IoT Backend Systems" (Springer, 2021):** Propone un patrón arquitectónico para backends IoT que separa la capa de recepción de telemetría de la capa de lógica de negocio. El presente proyecto adopta este patrón al separar el módulo <mark>`scanner`</mark> (recepción de eventos raw del hardware) del módulo <mark>`inventory`</mark> (lógica de negocio del stock). 

**Trabajo 3 — "Edge Computing vs. Cloud Computing in Retail IoT" (ACM, 2023):** Concluye que para establecimientos con menos de 10 puntos de venta, la arquitectura cloudfirst ofrece mejor relación costo-beneficio al eliminar la necesidad de servidores locales. El presente proyecto adopta esta arquitectura con el backend en Render.com. 

### **3.2. Contexto Nacional** 

**Trabajo 1 — "Sistema de Inventario con Arduino para PyMEs Colombianas" (Universidad Nacional, 2021):** Implementa un sistema con Arduino Mega y módulo Ethernet ENC28J60. El presente proyecto actualiza ese enfoque reemplazando el módulo Ethernet con conectividad USB-a-PC, más confiable en establecimientos con red WiFi compartida sin IP fija. 

**Trabajo 2 — "Digitalización del Comercio Minorista en Colombia" (MinTIC, 2022):** Identifica el costo del hardware y la complejidad de instalación como las principales barreras. El sistema propuesto aborda ambas: hardware < $60.000 COP y configuración en < 30 minutos. 

### **3.3. Contexto Regional** 

**Trabajo 1 — "Sistema POS con Arduino para el Mercado Campesino de Floridablanca" (UIS, 2023):** A diferencia de ese trabajo (Arduino Due + pantalla táctil), el presente proyecto prescinde de pantalla física y delega toda la interfaz al navegador web, reduciendo costos y aumentando la flexibilidad. 

**Trabajo 2 — "Automatización de Tiendas de Barrio con IoT de Bajo Costo" (UNAB, 2024):** Usa NodeMCU ESP8266 con WiFi embebido. El presente proyecto adopta Arduino Uno (sin WiFi integrado) delegando la conectividad al PC anfitrión, eliminando problemas de seguridad de credenciales WiFi en el firmware. 

## **4. Metodología** 

### **4.1. Tipo de trabajo** 

**Tecnológico descriptivo.** Se construye un artefacto funcional (sistema IoT) y se describe detalladamente su diseño, implementación y comportamiento. Se aplica el método de investigación-acción: se identifica un problema real en un establecimiento comercial, se diseña e implementa una solución tecnológica, y se valida mediante pruebas funcionales. 

### **4.2. Estrategias de recolección de la información** 

|**Fuente**|**Descripción**|
|---|---|
|Documentación técnica oficial|Datasheet ATmega328P, manual MH-ET V3.0, docs<br>NestJS/Angular/serialport|
|Entrevista con propietario|Entrevista semiestructurada; flujo actual, problemas<br>y requerimientos|
|Observación directa|2 jornadas laborales en la papelería registrando el<br>proceso de venta|
|Revisión de literatura|IEEE Xplore, ACM DL, Springer — sistemas IoT de<br>retail|
|Encuesta a empleados|Cuestionario a los 2 empleados sobre dificultades y<br>expectativas|
|Pruebas de prototipo|Iteraciones prueba-error en firmware y bridge-local|



### **4.3. Proceso de la investigación** 

#### **4.3.1. Fase I — Estudio, análisis e interpretación del sistema** 

Se mapeó el proceso As-Is (venta y reabastecimiento manual), se construyó una matriz de problemas vs. requerimientos y se realizó un benchmark de hardware: 

|**Plataforma**|**Costo**|**WiFi integrado**|**Facilidad**|**Seleccionado**|
|---|---|---|---|---|
|Arduino Uno R3|~$25.000 COP|No|Alta|**Sí**|
|Raspberry Pi Zero<br>2W|~$80.000 COP|Sí|Media|No|
|ESP32 DevKit|~$35.000 COP|Sí|Media|No|





<!-- Start of picture text -->
*<br>x F vwnpa JEP i 5M ST aph cane \eweet |<br>*<br><!-- End of picture text -->

|**Módulo**|**Tecnología**|**Función**|
|---|---|---|
|`firmware/src/main`<br>`/main.ino`|Arduino C++|Lee scanner por SoftwareSerial, ADC8<br>temp, envía JSON por Serial|
|`bridge-`<br>`local/src/index.j`<br>`s`|Node.js 18|Escucha COM port, HTTP POST al<br>backend, cola offline|
|`backend/src/scann`<br>`er/`|NestJS|Recibe eventos raw del bridge|
|`backend/src/produ`<br>`cts/`|NestJS +<br>TypeORM|CRUD catálogo productos con variantes|
|`backend/src/categ`<br>`ories/`|NestJS +<br>TypeORM|CRUD categorías con búsqueda|
|`backend/src/payme`<br>`nt-methods/`|NestJS +<br>TypeORM|CRUD medios de pago, seed automático|
|`backend/src/inven`<br>`tory/`|NestJS +<br>TypeORM|Movimientos de stock, alertas|
|`backend/src/sales`<br>`/`|NestJS +<br>TypeORM|Registro ventas, resumen/reportes|
|`frontend/src/app/`<br>`pos/`|Angular 17|Caja registradora con numpad flotante|
|`frontend/src/app/`<br>`inventory/`|Angular 17|Backoffice con variantes y márgenes|
|`frontend/src/app/`<br>`reports/`|Angular 17|Reportes con Chart.js, export<br>PDF/XLSX|
|`frontend/src/app/`<br>`monitor/`|Angular 17|Monitoreo nodo Arduino en tiempo real|
|`frontend/src/app/`<br>`settings/`|Angular 17|Gestión de categorías y medios de pago|



#### **4.3.4. Fase IV — Descripción de pruebas** 

Ver sección **7. Pruebas del Sistema** para detalle completo. 



<!-- Start of picture text -->
Lector de escaneo<br>I<br>Z_— aap<br>mena? emi EOE T DEA<br><!-- End of picture text -->

Lector de escaneo 



<!-- Start of picture text -->
ee oe, CSA=<br>ma<br>—=—_ Affy a }<br>7 IMpresiones he<br>SURI HOS er? Hes 193 a yy |<br>Seemann cone 4<br>=aSa A<br>CR 038465-609 d<br>Puerto_  USBZ tipo B<br><!-- End of picture text -->



<!-- Start of picture text -->
fe Tienda Fisica —<br>Dispositivo loT (mostrador) resiones Colina Real<br>MH-ET V3.0\nEscaner<br>optico\nUART TTL 9600bps<br>TX D? SoftwareSerial<br>Arduino Uno<br>R3\nATmega328P @<br>16MHz\nFirmware v1.0.0<br>USB-B cable<br>PC de Caja<br>Driver USB-SerialinCOM<br>virtual (CH340)<br>bridge-local\nNode.js 18 Navegador web\nAngular<br>LTS\nserialport + axios SPA<br>HTTPS HTTPS REST +° SSE Sirveuve SPA<br>POST\n/api/scanner/event<br>:<br>NestJS 10\nAPI Angular 17\nSPA<br>REST\nDocker container estaticainCDN global<br>DB<br>“ws 15\nManaged<br><!-- End of picture text -->





<!-- Start of picture text -->
———————————<br>a<br>=< Ss<br>CC<br>ee<br>le TTT<br>~ LOPE RE<br>rr<br>~~|<br>=a —_—_ —<br>tee fee ccc Se aan<br>att eerie | Ch Co<br>ee Coe a<br>a oe co a<br>fo - 0 ee<br>[ow | fom jal a<br>Ss os. a<br>PZ __ ccd al aeeleet| |<br>SsSa NN<br>= oN —<br>ala =<br>feeteee | ome] el<br>or [= Joe |]<br>ee Co Bos<br>——ae cae=<br><!-- End of picture text -->



<!-- Start of picture text -->
PaymentMethod SalesService ScannerService<br>HJUID id<br>String +oreate(dto} : Sale +handleEvent(event) : void<br>+findAll(query) : Sale[] — +processBarcode(barcode} : void<br>+getSummary (from, to) : SalesSummary +processTelemetry(event) = void a<br>—;a<br>\<br>// ee ee |\ ProductsService<br>+String transactionNumber - _<br>{ +UUID+SaleltemSnapshot[] id items ; ; ; So<br>=H t I tcreate(dto) ¢ Product<br>+Number+Mumber discounttotal ee, : iy<br>+String paymentMethod ‘re ene Product<br>20 sk +removelid) : void<br>| +buildVariantEntity(dto) : ProductVariant<br>+generateTransactionNumber() : String | f<br>T | / \<br>de | / \<br>1 / | |<br>\ / j |<br>\ f |<br>\e +UUID id |<br>ScannerEvent +Snring systemCode<br>| *UUID id | suuIDGa +String barcode<br>+String type l+ _ +String type<br>. BES Soran “ar<br>+Number value | aSeri +Mumiber costPrice<br>+String unit | 2Stri aI +Mumiber salePrice<br>| +Number raw | . +String soldBy<br>| +Humber. timestamp. . +String+Number categoryquantity‘ —|4 +Boolean trackinventory<br>+String bridgeld | ety —— — +Humber stock<br>~Date receivedAt | ty —_— +Humber minStock<br>| +String status | +Boolean availableForSale 7<br>= j<br>H—<br>i—— | +findByBarcode(barcode) : Product<br>/ |<br>‘e, _<br>[os i ‘\<br>Ne Pa ProductVariant \<br>“a a +ULIID id ;<br>~ +UUID id +String systenrCode<br>“enn UPS vem ete<br>+Mumber quantity +String optionValue<br>+Humiber stockBefore +String barcode UID id<br>+Humiber stockAfter +Number costPrice +String name<br>+String source | Number salePrice<br>+String notes +Humber stock<br>+Date created&t +Humber minStock<br>Ld +generateSystemCoda() : void<br><!-- End of picture text -->



<!-- Start of picture text -->
ree ier ine apr inal bir a1 eral a Pemrrics. opie FA.<br>cad<br>sna oe<br>SCAU Bebra ESE<br>atfe Pemba!<br>DeniaJH» Lin"<br>—<br>feist ye beeee rece tt<br>File sareniiown. cake tare<br>—<br>SERSor<br>—<br>Fe) cae usar mcs yeases eeepe<br>MELOCT "FOS, CT SR aeA<br>emda [ame are bi 1]<br>a<br>CA arena THE ming<br>yoked OH<br>Poa “WangWEE: NOG na Ca<br>Lalctebttiahademenaell<br>1 1 ———— . 1 =<br>ee oe<br>PONT ce bd TA Sp AT eT<br>ahem Fara tls<br>SITY ST ie ae ie Nl teintbap<br>Soemere eee em apo<br>PRT BT RPO<br>leMLA ot eeeemer ee nat mee|<br>———<br>lI I J<br>L, Caer ioe ee<br>muitenb epee Re ae bt all Deal aia seer<br>coe<br><!-- End of picture text -->



<!-- Start of picture text -->
=<br>Bem<br>insismanmmanaonnn<br>|I a oo a |<br>ews ><br>a yn<br>— — ef * ~~,<br>eee tocee |<br>\ ) Poachrna pre Mj! |<br>‘ os ff |<br>Ns a a<br>i A |<br>art: remmere pe jneocec eee |<br>| 5<br>rs re |<br>SN A<br>i | sea ke _<br>sie 5 prece | /<br>‘ —<br>sy, os, 7 _—<br>nf<br>eTetal<br>| ee |<br>Lefer oc |<br>|<br>BAY USES ] } wee See |<br>aa | | ome hevretn y<br><!-- End of picture text -->



<!-- Start of picture text -->
|+muctanno<br>BUSCANDO_PUERTO<br>o !<br>“ctr| ta 00’ io| Arduino\nReintentarate  en 10s [Timeout 10s<br>SSPERANDO | port.close()inReconectar<br>ee ee — en 5s |<br>port.open() OF<br>ESCUCHANDO<br>Linea 180) -Evente bootino linea < —~<br>| PROCESANDO | | REINTENTANDO \ HTTP 201 OX<br>——<br>Evento vatido\n{barcode 0 | Evento én cola FIFO<br>temp) !<br>" ENVIANDO<br>| ENCOLANDO<br><!-- End of picture text -->



<!-- Start of picture text -->
bla in<br>f<br>* -<br>itr Je boncqueda<br>.<br>freer<br>r . latte ita<br>* tt \/ sale a 1 - ug! it oe he<br>' ‘i<br>.<br><!-- End of picture text -->



```
      // REFS1:REFS0 = 11 → Vref interna 1.1V; MUX = 0b1000 → canal 8
      ADMUX  = (_BV(REFS1) | _BV(REFS0) | 0x08);
      ADCSRA = _BV(ADEN) | _BV(ADPS2) | _BV(ADPS1) | _BV(ADPS0);
      delay(20); // estabilizar referencia
```

```
      // Conversión de descarte + conversión real
      ADCSRA |= _BV(ADSC); while (ADCSRA & _BV(ADSC));
      ADCSRA |= _BV(ADSC); while (ADCSRA & _BV(ADSC));
      int raw = ADC;
```

```
      ADMUX  = admuxPrev;
      ADCSRA = adcsraPrev;
```

```
      // T(°C) = (raw - offset) / 1.22  [ATmega328P datasheet §24.8]
      return (float)(raw - TEMP_ADC_OFFSET) / 1.22f;
    }
```

##### **Protocolo de salida (Serial 115200 bps):** 

|**Tipo**|**Ejemplo JSON**|
|---|---|
|Boot|`{"type":"boot","firmware":"1.0.0","ts":0}`|
|Barcode|`{"type":"barcode","data":"7702010018521",`<br>`"ts":1234}`|
|Temperatura|`{"type":"temp","value":29.5,"unit":"C","r`<br>`aw":358,"ts":100}`|



El campo `ts` es <mark>`millis()/1000`</mark> (segundos desde el arranque). El bridge-local reemplaza este valor con el timestamp UTC real del servidor al momento del reenvío. 

### **6.2. Bridge Local (Node.js)** 

El bridge <mark>`bridge-local/src/index.js`</mark> conecta el hardware con la nube mediante 4 responsabilidades: 

1. **Auto-detección del Arduino:** Busca por Vendor ID (Arduino SA: <mark>`2341` ,</mark> CH340: <mark>`1a86` ,</mark> FTDI: <mark>`0403` ,</mark> CP210x: <mark>`10c4`</mark> ) y por nombre de fabricante. Si no se encuentra, reintenta cada 10 s. 

2. **Parseo de eventos:** Cada línea del Serial se parsea como JSON. Los eventos <mark>`boot`</mark> solo se loguean; los de <mark>`barcode`</mark> y <mark>`temp`</mark> se procesan. 

3. **Envío HTTP:** Se reemplaza el campo `ts` con <mark>`Date.now()`</mark> y se hace POST a 

- <mark>`/api/scanner/event`</mark> con headers <mark>`x-api-key`</mark> y <mark>`x-bridge-id` .</mark> 





<!-- Start of picture text -->
NestiS Application<br>masn tz\<br>Modulos<br>al ProductsModule nC RUD a CategoriesModule nC RUD<br>products categories<br>ScennerModule nPOST<br>scanner/ event<br>PaymentMetnhodsModyle\nc RUD<br>payment -method<br>InventoryModule\nGET<br>sl nventory /movements<br>SalesModule\nPOST<br>sales\nGET<br>seles/summar<br>°<br>TyYpeORM miynchronize<br>true (dev)\nmigretionsun<br>true iprod<br>?<br>PostgreSQL 15<br><!-- End of picture text -->

##### **Endpoints implementados:** 

|**Método**|**Ruta**|**Descripción**|
|---|---|---|
|POST|`/api/scanner/event`|Recibe evento del bridge (barcode o temp)|
|GET|`/api/products`|Lista productos (paginado, filtro`?q=`,<br>`?barcode=`)|
|POST|`/api/products`|Crear producto con variantes opcionales|
|PUT|`/api/products/:id`|Actualizar producto|
|DELETE|`/api/products/:id`|Eliminar producto|
|GET|`/api/categories`|Lista categorías (`?q=` búsqueda)|
|POST|`/api/categories`|Crear categoría|
|PUT|`/api/categories/:i`<br>`d`|Actualizar categoría|
|DELETE|`/api/categories/:i`<br>`d`|Eliminar categoría|
|GET|`/api/payment-`<br>`methods`|Lista medios de pago|
|POST|`/api/payment-`<br>`methods`|Crear medio de pago|
|DELETE|`/api/payment-`<br>`methods/:id`|Eliminar medio de pago|
|GET|`/api/inventory/mov`<br>`ements`|Historial de movimientos|
|GET|`/api/sales`|Lista ventas (filtros fecha)|
|POST|`/api/sales`|Registrar nueva venta|
|GET|`/api/sales/summary`|Resumen: total, por método de pago, por<br>categoría, serie diaria|



##### **Validaciones relevantes:** 

- <mark>`costPrice <= salePrice`</mark> (lanza <mark>`BadRequestException`</mark> si <mark>`salePrice > 0 && costPrice > salePrice`</mark> ) 

- <mark>`systemCode`</mark> del producto se genera automáticamente ( <mark>`P/SXXXXXXXX`</mark> vía UUID) y no es editable 

- <mark>`systemCode`</mark> de variante se genera con prefijo `V` <mark>(</mark> <mark>`VXXXXXXXX` )</mark> 

- Stock solo se descuenta si <mark>`trackInventory = true`</mark> 







<!-- Start of picture text -->
itt / weork flaws Sek. yert Pthubs workflows / deploy ymt Proceeds<br>Githud Repository Ch mn<br>| - Backend Jobanpn o - ' ‘-e Render Wenmcok nDepiny t +. Render. com nrttps: ’ /cotne<br>batid + lint Wests reai-backend onrencter com<br>gt pushinimain branch)<br>a FrontendbullaJobinngmprod ci + ng: ~ - © NettifyAcularCLiveQepioySPAt: . oo Mettifyoitps:real netiifyapo/ /cotine<br>Jobs en persieio<br><!-- End of picture text -->

### **7.3. Prueba 3 — Bridge Local → Backend (online)** 

|**Campo**|**Detalle**|
|---|---|
|**Qué se prueba**|Retransmisión correcta al backend|
|**Cómo**|Backend corriendo; escanear 50 productos|
|**Resultado**|50/50 eventos recibidos; latencia media bridge→backend<br>180 ms (WiFi doméstico)|



### **7.4. Prueba 4 — Tolerancia a desconexión (cola offline)** 

|**Campo**|**Detalle**|
|---|---|
|**Qué se prueba**|Cola FIFO y reenvío automático|
|**Cómo**|Detener backend; escanear 12 productos; reiniciar backend|
|**Resultado**|12/12 eventos reenviados en primer ciclo de reintento (30 s);<br>orden preservado|



### **7.5. Prueba 5 — Actualización de inventario por escaneo** 

|**Campo**|**Detalle**|
|---|---|
|**Qué se prueba**|Descuento correcto de stock con<br>`trackInventory=true`|
|**Cómo**|Producto stock=20; 5 ventas de 1 unidad|
|**Resultado**|Stock final en BD = 15; actualización en UI < 1 s|



### **7.6. Prueba 6 — Flujo completo de venta** 

|**Campo**|**Detalle**|
|---|---|
|**Qué se prueba**|Flujo POS completo: escaneo → carrito → pago → tiquete|
|**Cómo**|3 productos distintos (1 con salePrice=0); flujo hasta<br>confirmación|
|**Resultado**|Tiquete generado con número de transacción; inventario<br>descontado correctamente; numpad funcionó para producto sin<br>precio|
|**Tiempo total**|28 segundos para 3 productos|



### **7.7. Prueba 7 — Módulo de reportes y exportación** 

|**Campo**|**Detalle**|
|---|---|
|**Qué se prueba**|Generación de PDF y XLSX con datos reales|
|**Cómo**|Filtrar ventas por rango de 7 días; exportar ambos formatos|
|**Resultado**|PDF con encabezado empresa, resumen y tablas generado<br>correctamente; XLSX con hojas de ventas y resumen|



### **7.8. Prueba 8 — Gestión de categorías y medios de pago** 

|**Campo**|**Detalle**|
|---|---|
|**Qué se prueba**|CRUD en Settings y reflejo en POS/Inventario|
|**Cómo**|Crear categoría "Lapiceros", asignarla a productos; crear<br>medio de pago "Daviplata"|
|**Resultado**|Categoría disponible en autocomplete del inventario;<br>"Daviplata" disponible en selector del POS|



## **8. Resultados** 

El sistema implementado cumple todos los objetivos planteados. La siguiente tabla muestra el antes y después para cada problema identificado: 

|**Problema**|**Situación anterior**|**Situación con el sistema**|
|---|---|---|
|Errores de digitación|12–15 % de<br>transacciones|**0 %**— barcode elimina digitación|
|Actualización de<br>inventario|Mensual (conteo físico)|**En tiempo real**(< 1 s post-venta)|
|Desabastecimiento no<br>detectado|≥ 3 veces/semana|**Alerta automática**por stock<br>mínimo|
|Tiempo de atención en<br>caja|4–6 min por cliente|**< 30 s**para 3 productos|
|Sin análisis de ventas|Ningún registro digital|**Reportes diarios**con gráficos y<br>exportación|



##### **Indicadores técnicos medidos:** 

|**Indicador**|**Valor**|
|---|---|
|Latencia Arduino → Serial|< 50 ms|
|Latencia bridge → backend|180 ms promedio (WiFi doméstico)|
|Latencia actualización UI (polling 1 s)|< 1 s|
|Throughput de escaneo|~ 1 producto / 2 s (limitado por polling)|
|Tolerancia offline máxima|24 horas (cola 1000 eventos)|
|Precisión sensor temperatura|± 10 °C (solo telemetría del nodo)|
|Uptime backend Render.com (free tier)|~99 % — cold start ~30 s tras inactividad|



## **9. Conclusiones** 

El sistema IoT desarrollado resuelve efectivamente los cinco problemas identificados en Impresiones Colina Real: elimina la digitación manual, actualiza el inventario en tiempo real, detecta desabastecimiento automáticamente, reduce el tiempo de atención en caja y genera registros digitales de ventas analizables. 

La arquitectura de tres capas (Edge → Bridge → Cloud) demostró ser robusta y de bajo costo. El uso del puerto USB del Arduino como canal de comunicación elimina la necesidad de módulos WiFi adicionales y problemas de configuración de red. Para el caso de uso (establecimiento fijo con PC de caja permanente), este trade-off es favorable. 

El sensor de temperatura interno del ATmega328P, aunque con precisión limitada (±10°C), cumple su función de telemetría de hardware sin requerir componentes adicionales. Esto valida el enfoque de aprovechar los recursos integrados del microcontrolador antes de añadir hardware externo. 

La cola offline FIFO del bridge-local demostró ser un componente crítico para la confiabilidad del sistema en entornos con conectividad intermitente, garantizando la integridad de los datos ante interrupciones de Internet de hasta varias horas. 

La elección de Angular 17 con Signals ( <mark>`signal()` ,</mark> <mark>`computed()` ,</mark> <mark>`toSignal()`</mark> ) permitió construir interfaces reactivas de alto rendimiento con menor complejidad que el enfoque tradicional de <mark>`BehaviorSubject`</mark> + <mark>`async pipe` .</mark> El patrón se aplicó exitosamente en el cálculo de márgenes en tiempo real y el estado del carrito POS. 

El modelo de datos con variantes de producto ( <mark>`ProductVariant` )</mark> y medios de pago dinámicos <mark>(</mark> <mark>`PaymentMethod`</mark> ) hace el sistema significativamente más flexible que un POS de catálogo plano, permitiendo cubrir casos reales como artículos vendidos por tamaño/color y métodos de pago locales (Nequi, Daviplata). 

El stack tecnológico seleccionado (NestJS + Angular + PostgreSQL) ofrece una base sólida para escalar el sistema a múltiples puntos de venta sin cambios arquitectónicos significativos. El diseño modular del backend facilita la adición de nuevos dominios (facturación, proveedores, multi-tienda) como módulos NestJS independientes. 

## **10. Recomendaciones** 

**Scanner:** Reemplazar el MH-ET V3.0 por un modelo con interfaz USB-HID (como el Zebra DS2208) para eliminar la dependencia del Arduino en el proceso de escaneo y aumentar la velocidad de lectura en un POS de alta demanda. 

**Conectividad:** Migrar a un Arduino con WiFi integrado (Arduino Uno R4 WiFi) o agregar un módulo SIM800L para crear un nodo IoT completamente autónomo, eliminando la dependencia del bridge-local en el PC anfitrión. 

**Temperatura:** Reemplazar el sensor interno del ATmega328P por un sensor externo DS18B20 (±0.5°C) si se requiere monitoreo preciso de temperatura ambiente del local (ej. para refrigeración de productos perecederos). 

**Autenticación:** Implementar JWT con refresh tokens y roles de usuario (administrador / cajero) antes de un despliegue en producción real con múltiples operadores. 

**Base de datos:** Para volumen > 500 ventas/día, evaluar la migración de la telemetría de temperatura a una base de datos de series temporales (TimescaleDB, InfluxDB) manteniendo PostgreSQL para el negocio. 

**Backend libre tier:** Render.com free tier tiene un cold start de ~30 s tras 15 min de inactividad. Para producción real, contratar el tier <mark>`Starter`</mark> ($7/mes) para eliminar el cold start o implementar un keep-alive ping desde el bridge-local. 

## **11. Trabajos Futuros** 

**Multi-tienda:** Extender el sistema para múltiples sucursales con inventario centralizado y reportes consolidados por tienda, añadiendo un campo <mark>`branchId`</mark> a productos y ventas. 

**App móvil:** Desarrollar una aplicación React Native para que el propietario consulte inventario y ventas desde su smartphone, con notificaciones push para alertas de stock bajo. 

**Integración con proveedores:** Automatizar órdenes de compra cuando el stock cae por debajo del mínimo configurado, vía API o correo automático. 

**Machine Learning:** Implementar un modelo de predicción de demanda (Prophet o ARIMA) entrenado con el histórico de ventas para optimizar los niveles de reorden. 

**Facturación electrónica DIAN:** Integrar el sistema con la API de la DIAN para emisión de facturas electrónicas, cumpliendo la normativa colombiana para comercios que superen los umbrales de facturación. 

**Etiquetado propio:** Integrar una impresora térmica de etiquetas (Zebra ZD220) para imprimir códigos EAN-13 generados automáticamente para productos sin código estándar. 

**Autenticación biométrica:** Reemplazar el login por huella dactilar usando el módulo ZFM706 conectado al Arduino, permitiendo identificar cajeros sin contraseña. 

## **12. Bibliografía** 

- Atmel Corporation. (2015). _ATmega328P Datasheet — Complete_ . Microchip Technology. Sección 24.8: Temperature Measurement. 

- DANE. (2023). _Encuesta Anual de Comercio 2022_ . Departamento Administrativo Nacional de Estadística. 

- Fowler, M. (2002). _Patterns of Enterprise Application Architecture_ . Addison-Wesley. 

- Ministerio TIC Colombia. (2022). _Índice de Digitalización Empresarial 2022_ . MinTIC. 

- NestJS Foundation. (2024). _NestJS Documentation v10_ . https://docs.nestjs.com/ 

- Node.js. (2024). _serialport v12 Documentation_ . https://serialport.io/docs/ 

- Richardson, L., & Ruby, S. (2007). _RESTful Web Services_ . O'Reilly Media. 

- Schwaber, K., & Sutherland, J. (2020). _The Scrum Guide_ . Scrum.org. 

- Torres, A., & Gómez, R. (2021). _Sistema de Inventario con Arduino para PyMEs Colombianas_ . Universidad Nacional de Colombia. 

- Angular. (2024). _Angular 17 Signals Documentation_ . https://angular.dev/guide/signals 

- Chart.js. (2024). _Chart.js v4 Documentation_ . https://www.chartjs.org/docs/ 

- SheetJS. (2024). _xlsx (SheetJS) Documentation_ . https://docs.sheetjs.com/ 

## **ANEXOS** 

### **A. Manual del Usuario — Instalación y Primer Uso** 

##### **Requisitos del sistema:** 

|**Requisito**|**Mínimo**|**Recomendado**|
|---|---|---|
|Sistema operativo|Windows 10 / Ubuntu 20.04|Windows 11|
|RAM|4 GB|8 GB|
|Almacenamiento|500 MB libre|1 GB libre|
|Conectividad|Internet (mín. 1 Mbps)|Fibra / Cable|
|Navegador|Chrome 100+ / Firefox 100+|Chrome (última versión)|
|Node.js|18 LTS|20 LTS|
|Driver|CH340 (Windows)|Arduino IDE auto-instala|



##### **Paso 1 — Conectar el hardware:** 

```
    Conectar el cable USB-B del dispositivo (Arduino Uno R3)
    al puerto USB del PC de caja.
    Windows instalará automáticamente el driver CH340.
    Verificar en Administrador de Dispositivos → Puertos COM:
    aparecerá "USB-SERIAL CH340 (COMx)".
```

##### **Paso 2 — Configurar y ejecutar el bridge-local:** 

```
    cd bridge-local
    Copy-Item .env.example .env
    # Editar .env:
    #   COM_PORT=COM3       (o el número que asignó Windows)
    #   API_URL=https://colina-real-backend.onrender.com
    #   BRIDGE_ID=colina-real-01
    npm install
    npm start
```

##### El bridge mostrará en consola: 

```
    [INFO] === Bridge Local — Impresiones Colina Real ===
    [INFO] Puerto serial abierto: COM3 @ 115200 bps
    [INFO] Arduino listo. Firmware: 1.0.0
```

##### **Paso 3 — Acceder a la aplicación web:** 

Abrir el navegador y navegar a: <mark>`https://colina-real.netlify.app`</mark> 

##### **Paso 4 — Registrar productos:** 

##### 1. Ir a **Inventario** → botón **Nuevo producto** 

2. Ingresar: nombre, categoría (autocomplete), precio de costo, precio de venta 

3. Si el producto tiene variantes (tallas, colores): activar sección **Variantes** y agregar cada opción 

4. Si el precio varía por venta (servicios): dejar <mark>`precio de venta = 0`</mark> 

5. Activar **Rastrear inventario** e ingresar stock inicial y mínimo 

6. Guardar — el sistema asignará automáticamente un <mark>`systemCode`</mark> 

##### **Paso 5 — Realizar una venta:** 

1. Ir a **POS** (Punto de Venta) 

2. Escanear los productos uno a uno con el dispositivo (o buscarlos por nombre) 

3. Si un producto tiene <mark>`salePrice = 0`</mark> , el teclado numérico se abrirá automáticamente 

4. Seleccionar método de pago 

5. Confirmar venta — el sistema mostrará el número de transacción 

##### **Paso 6 — Configurar categorías y medios de pago:** 

##### 1. Ir a **Configuración** → tab **Categorías** 

2. Crear las categorías del negocio (ej. "Lapiceros", "Cuadernos", "Impresión") 

3. Tab **Medios de pago** : vienen precargados Efectivo, Tarjeta, Transferencia, Nequi 

4. Agregar métodos locales adicionales (ej. "Daviplata", "Crédito interno") 

### **B. Manual del Desarrollador — Entorno Local** 

**Levantar el entorno completo (requiere Docker):** 



<!-- Start of picture text -->
    # 1. Clonar el repositorio<br>    git clone <repo-url> colina-real && cd colina-real<br>    # 2. Levantar PostgreSQL local<br>    docker-compose up -d<br>    # Crea: postgres:15 en localhost:5432<br>    # DB: colina_real | User: postgres | Pass: postgres<br>    # 3. Backend<br>    cd backend<br>    Copy-Item .env.example .env<br>    # DB_HOST=localhost, DB_PORT=5432, DB_NAME=colina_real<br>    npm install<br>    npm run start:dev<br>    # API disponible en http://localhost:3000/api<br>    # Swagger en http://localhost:3000/api/docs<br>    # 4. Frontend (otro terminal)<br>    cd frontend<br>    npm install<br>    npm start<br>    # App en http://localhost:4200<br>    # 5. Bridge-local (otro terminal, Arduino conectado)<br>    cd bridge-local<br>    Copy-Item .env.example .env<br>    # API_URL=http://localhost:3000<br>    npm install<br>    npm start<br><!-- End of picture text -->

##### **Estructura del monorepo:** 



<!-- Start of picture text -->
    app-lector/<br>    ├── firmware/<br>    │   └── src/main/main.ino       ← Sketch Arduino<br>    ├── bridge-local/<br>    │   ├── src/index.js            ← Bridge Node.js<br>    │   └── .env.example<br>    ├── backend/<br>    │   ├── src/<br>    │   │   ├── products/           ← Módulo productos + variantes<br>    │   │   ├── categories/         ← Módulo categorías<br>    │   │   ├── payment-methods/    ← Módulo medios de pago<br>    │   │   ├── inventory/          ← Módulo inventario<br>    │   │   ├── sales/              ← Módulo ventas + reportes<br>    │   │   ├── scanner/            ← Módulo eventos hardware<br>    │   │   └── main.ts             ← Bootstrap + seed<br>    │   └── docker-compose.yml<br><!-- End of picture text -->

```
    ├── frontend/
    │   └── src/app/
    │       ├── pos/                ← Punto de venta
    │       ├── inventory/          ← Gestión inventario
    │       ├── reports/            ← Reportes + gráficos
    │       ├── monitor/            ← Monitor nodo Arduino
    │       └── settings/           ← Config categorías/pagos
    ├── docs/                       ← Esta documentación
    └── .github/workflows/          ← CI/CD GitHub Actions
```

### **C. Variables de Entorno** 

**Bridge Local (`.env`):** 

|**Variable**|**Valor por defecto**|**Descripción**|
|---|---|---|
|`COM_PORT`|`null`(auto-detect)|Puerto COM del Arduino (ej.<br>`COM3`)|
|`BAUD_RATE`|`115200`|Baudrate Serial (debe coincidir<br>con firmware)|
|`API_URL`|`https://colina-real-`<br>`backend.onrender.com`|URL base del backend|
|`API_KEY`|`""`|API key para autenticación<br>(futuro)|
|`BRIDGE_ID`|`bridge-local-01`|Identificador único del nodo|
|`RETRY_INTERVAL`<br>`_MS`|`30000`|Intervalo de reintento de cola<br>offline|
|`MAX_QUEUE_SIZE`|`1000`|Máximo de eventos en cola<br>offline|
|`LOG_LEVEL`|`info`|Nivel de log:`error`, `warn`,<br>`info`, `debug`|







<!-- Start of picture text -->
MHET V3.0 Forcresarw Ardueres Sridge Local Hacheore AP<br>wrtupd| — boot message<br>[types boot! firrreware 21,0207, ty"20] al<br>Log “Ardudied TELS", fe dir?<br>“<br>yp<br>| Escansode producto<br>UARE: “FORO OOS Eira<br>ee||<br>trim(}, length » 0 sendBarcodeévent||<br>J<br>SS EEE eee|<br>SDH gorse [) — eeemplazar ts oon Dahencew)<br>—i<br>POST fap! scanner everdinitype data ta:real, bridgeicl)<br>b &<br>201 Craratied<br>Cade TEMP_IN TERIAL ren<br>resalrerrad Temp (Ua RES| |REPS |e<br>_<br>(Ciypa tern" valee "29.5, “unl 0"rae, te]<br>———$"es |<br>— POST /apl(ccannan oven ing hype. alg, unit raw ts real, bricked]<br>201 Created<br>AMET V3.0 Forcreare Archers Sricige Loca Bacherst Al"<br><!-- End of picture text -->





### **F. Evidencias Fotográficas** 

Las siguientes imágenes documentan el sistema implementado y funcionando en el entorno real de Impresiones Colina Real. 

#### **F.1 — Vista del dispositivo IoT (cara frontal con escáner)** 

El dispositivo muestra el lente óptico del escáner MH-ET V3.0 integrado en la carcasa personalizada, con la etiqueta institucional de Impresiones Colina Real. 



_El dispositivo lleva la etiqueta "SENSORES TÉRMICOS Y DE ESCANEO — MONITOREO ACTIVO - ESCANEO RÁPIDO" con la marca Impresiones Colina Real. Se aprecia el lente del escáner MH-ET V3.0 en la abertura frontal._ 



<!-- Start of picture text -->
Lector de escaneo<br>I<br>Z_— aap<br>AeA mins mucraces Mee YAM Ador es<br><!-- End of picture text -->

Lector de escaneo 



<!-- Start of picture text -->
ee oe, CSA=<br>=<br>—=—_ Affy a }<br>L impresiones hy<br>Se eM HOS LO? WHS 109 gen y |<br>Seemann cone 4<br>=aSa A<br>— CR.038465-609 f<br>Puerto_  USBZ tipo B<br><!-- End of picture text -->

#### **F.3 — Configuración completa del puesto de trabajo** 

Setup completo en el mostrador: el dispositivo IoT conectado por USB al laptop del cajero, con la interfaz Angular visible en segundo plano. 



_Vista del setup en el mostrador: laptop ASUS con la aplicación web cargada, dispositivo IoT (Arduino + MH-ET V3.0 en carcasa personalizada) conectado por cable USB, y el bridgelocal corriendo en segundo plano en la misma máquina._ 

#### **F.4 — Sistema en funcionamiento: escaneo de producto real** 

Demostración en tiempo real del flujo de venta: el cajero acerca un producto (marcadores Paper Mate) al lector, y el sistema procesa automáticamente el código de barras actualizando el POS Angular visible en la pantalla del laptop. 



_Se aprecia la pantalla del módulo POS de Angular con el carrito de compras activo, el producto escaneado en la interfaz, y el dispositivo IoT en primer plano al momento del escaneo. El flujo completo —desde el hardware hasta la UI web— funciona de extremo a extremo._ 



<!-- Start of picture text -->
© Dispositivo loT —<br>@ Lente optico MH-ET ¥ Conector USB tipo |<br>V3.0\nEscaneo . - “ Sensor temp.<br>EAN-13, BinAlimentacion 5V desde ee [<br>Code128, QR\nRango: 3-30 Arduino\nComandos. de . ninterno. a<br>cm configuracion. .. chip\nTelemetria nodo<br>NN @ Carcasa<br>BB Arduino Uno R3 personalizada\nEtiqueta<br>{interior)\nATmega328P @ Impresiones Colina<br>16 MHz\nFirmware v1.0.0 Real\nFormato compacto<br>| de mostrador<br>USB cable<br>B Pc de Caja<br>© Driver USB-Serial<br>CH340\nPuerto COM<br>virtual (Windows)<br>© bridge-local (2 Navegador<br>Node. js\nEscucha COM, Web\nAngular SPA —<br>reenvia a API localhost/netlify<br>HTTPS POST REST + 5SE<br>S Nube<br>® NestJS API\nRender.com titer sulla<br>CDN<br>HB PostgresoL<br>15\nRender.com<br><!-- End of picture text -->

### **G. Resumen de Decisiones de Diseño** 

|**Decisión**|**Alternativa**<br>**descartada**|**Razón de la elección**|
|---|---|---|
|Arduino Uno R3 (sin<br>WiFi)|ESP32 con WiFi|Evitar credenciales WiFi en firmware;<br>aprovechar conectividad del PC<br>anfitrión|
|MH-ET V3.0 (UART<br>TTL)|Scanner USB-HID<br>directo|Mantener el Arduino como nodo activo<br>(para telemetría de temperatura)|
|bridge-local Node.js|Python script|Ecosistema npm`serialport`más<br>maduro; misma tecnología que el<br>backend|
|NestJS (Node.js)|Spring Boot /<br>Django|Mismo runtime que bridge; decoradores<br>similares a Angular (equipo unificado)|
|PostgreSQL 15|MySQL / MongoDB|Soporte nativo TypeORM; transacciones<br>ACID para stock; tipo`jsonb`para<br>snapshots|
|Angular 17 Signals|React / Vue|Asignatura en Angular; Signals mejoran<br>reactividad sin RxJS boilerplate|
|Render.com + Netlify|AWS / GCP|Tier gratuito suficiente para MVP<br>académico; deploy automático desde<br>GitHub|
|`varchar(60)` para<br>paymentMethod|Enum TypeORM|Permite medios de pago configurables<br>desde UI sin migraciones de BD|
|systemCode auto-<br>generado|Barcode como ID|Barcode es opcional; sistemCode<br>garantiza identificador único interno<br>siempre|



_Documento generado el 2 de junio de 2026. Sistema IoT Impresiones Colina Real — Proyecto de Aula Semestral (PAS) Sistemas Operativos y Arquitectura de Computadores._ 

