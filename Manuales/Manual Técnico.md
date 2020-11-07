# Manual Técnico Traductor Java
### Manual Técnico




## Introducción

Realizar la traducción de un lenguaje a otro puede ser algo tedioso sobre todo cuando estamos trabajando sobre sistemas legacy y con los cuales queremos replicar la funcionalidad en otro lenguaje de programación que es más reciente o popular y del cual encontramos mayor información y soporte técnico. Para darle solución tenemos aquellos transpiradores que se dedican a traducir de un lenguaje de programación a otro con el mismo nivel de dificultad para su análisis. Pero estos están destinados a obtener un lenguaje en específico y traducirlo a únicamente otro de salida. Por ello se a desarrollado el siguiente programa, capaz de realizar el analisis de código escrito en java, para posteriormente ser traducido a javascript

## Caracteristicas del programa

- Frontend
Lenguaje para la ejecución: Golang v.1.15.2
Pagina web: html y javascript
Diseño: Plantillas de Boostrap v4

- Backend (Javascript)
Entorno de ejecución: NodeJS v.12.18.4
Lenguaje: Typescript (Traducido a JavaScript)
Librerias: cors, express, jison, typescript, util

## Interfaz de usuario
![Interfaz](/img/Screenshot 2020-11-06 201710.png)

La interfaz posee una barra de navegacion con dos botones principales, **Archivo** y **Descargar**.
Archivo contiene las siguientes opciones: 

#### Archivo
- Analizar, para realizar el analisis de la entrada.
- Abrir, para seleccionar un archivo de java y cargar su contenido
- Guardar, para descargar un archivo con el texto actual

#### Descargar
- Javascript, descargar un archivo .js con la traduccion
- Lista de Errores, para descargar un archivo .txt con los errores
- Lista de Toknes. para descargar un archivo .txt con los tokens

## Descripcion del analizador
Para el analisis de la entrada se utiliza la herramienta JISON, que permite generar un analizador léxico y sintactico a partir de una gramatica definida. Se utilizó la version 0.4.18. A continuacion, la gramatica utilizada en el analizador:


### Gramatica
S -> LISTA_CLASES EOF

LISTA_CLASES -> LISTA_CLASES CLASE
    | CLASE

CLASE -> 'public' 'class' identificador '{' CLASEDEV
	| 'public' 'interface' identificador '{' INTERFAZDEV

CLASEDEV -> ARGUMENTOS '}'
	| '}'

INTERFAZDEV -> ARGSINTERFAZ '}'
	| '}'

ARGSINTERFAZ -> DECLARARFUNCION
	| DECLARACION
   
ARGUMENTOS -> FUNCION
	| DECLARACION
	| ASIGNACION
	| MAIN

TIPO_CLASE -> 'class'
    | 'interface'

SENTENCIAS -> SENTENCIAS SENTENCIAS_G
    | SENTENCIAS_G 

SENTENCIAS_G -> 
	| DECLARACION
	| ASIGNACION
	//Repeticion
	| FOR
	| WHILE	
	| DOWHILE
	//Control
*	| IF
	//Otros
	| BREAK
	| CONTINUE
	| RETURN
	| LLAMADAMETODO
	//Predeterminadas
	| PRINT
	

DECLARACION -> TIPO 'identificador' 'igual' EXPRESION 'puntocoma'

DECLARARFUNCION -> TIPO 'identificador' '(' LISTA_PARAMETROS 'puntocoma'

ASIGNACION -> 'identificador' ' igual' EXPRESION 'puntocoma'

WHILE -> 'while' ( EXPRESION )  BLOQUE_SENTENCIAS 

DOWHILE -> 'do' BLOQUE_SENTENCIAS WHILEDOWHILE

WHILEDOWHILE -> 'while' '(' EXPRESION ')' 'puntocoma'

FOR -> 'for''(' DECLARAROASIGNAR 'puntocoma' EXPRESION 'puntocoma' EXPRESION ')' BLOQUE_SENTENCIAS

BREAK -> 'break' 'puntocoma'

CONTINUE -> 'continue' 'puntocoma'

RETURN -> 'return' EXPRESION 'puntocoma'

LLAMADAMETODO -> 'identificador' '(' LISTA_PARAMETROS 'puntocoma'

PRINT -> 'System' '.' 'out' '.' 'print' CONDICION pcoma

MAIN -> 'public' 'static' 'void' 'main' '(' 'String' '[' ']' 'args' ')' BLOQUE_SENTENCIAS

CONDICION ->  '(' EXPRESION ')'

FUNCION -> TIPO 'identificador' '(' LISTA_PARAMETROS BLOQUE_SENTENCIAS

LISTA_PARAMETROS -> PARAMETROS ')'
	| ')'

PARAMETROS -> PARAMETROS ',' PARAM
	PARAM

PARAM -> TIPO 'identificador'

BLOQUE_SENTENCIAS -> { BLOQUEDESENTENCIAS 
   
BLOQUEDESENTENCIAS -> SENTENCIAS '}'
	| '}

TIPO -> int
	| boolean
	| double
    | String
	| char
    | void

DECLARAROASIGNAR -> DECLARACION
	| ASIGNACION
	
IF -> if CONDICION BLOQUE_SENTENCIAS
	|   if CONDICION BLOQUE_SENTENCIAS ELSE

ELSE -> else BLOQUE_SENTENCIAS
	| else IF


EXPRESION ->
	// Aritmeticas
	| EXPRESION 'mas' EXPRESION		
	| EXPRESION 'menos' EXPRESION		
	| EXPRESION 'por' EXPRESION		
	| EXPRESION 'division' EXPRESION
	| EXPRESION 'incremento'
	| EXPRESION 'decremento' 
	| 'menos' EXPRESION
	// Relacionales
	| EXPRESION mayorQ EXPRESION	
	| EXPRESION menorQ EXPRESION	
	| EXPRESION mayosIgual EXPRESION	
	| EXPRESION menorIgual EXPRESION	
	| EXPRESION dobleIgual EXPRESION	
	| EXPRESION distinto EXPRESION	
	| EXPRESION or_ EXPRESION		
	| EXPRESION and_ EXPRESION		
	| not_ EXPRESION
	| EXPRESION xor EXPRESION					
	| parAbre EXPRESION parCierra
	| PRIMITIVO						

PRIMITIVO -> decimal		
	| cadena		
	| true_			
	| false_		
	| identificador 
	


