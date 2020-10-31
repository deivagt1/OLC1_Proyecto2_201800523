%{
	const { Instruccion } = require("../dist/ast/Instruccion");
	const { AST } = require("../dist/ast/AST");
	const { Asignacion } = require("../dist/ast/sentencias/Asignacion");
	const { Declaracion } = require("../dist/ast/sentencias/Declaracion");
	const { Print } = require("../dist/ast/sentencias/Print");
	const { While } = require("../dist/ast/sentencias/While");
	const { DoWhile } = require("../dist/ast/sentencias/DoWhile");
	const { For } = require("../dist/ast/sentencias/For");

	const { Break } = require("../dist/ast/sentencias/Break");
	const { Continue } = require("../dist/ast/sentencias/Continue");
	const { Return } = require("../dist/ast/sentencias/Return");

	const { Funcion } = require("../dist/ast/argumentos/Funcion")
	const { DeclFuncion } = require("../dist/ast/argumentos/DeclFuncion")
	const { OperacionAritmetica } = require("../dist/ast/expresiones/OperacionAritmetica");
	const { OperacionLogica } = require("../dist/ast/expresiones/OperacionLogica");
	const { OperacionRelacional } = require("../dist/ast/expresiones/OperacionRelacional");
	const { Parentesis } = require("../dist/ast/expresiones/Parentesis");
	const { Identificador } = require("../dist/ast/expresiones/Identificador");
	const { Primitivo } = require("../dist/ast/expresiones/Primitivo");
	const { Tipo } = require("../dist/ast/Tipo");
	const { TipoDeOperacion } = require("../dist/ast/Tipo");
	const { Main } = require("../dist/ast/argumentos/Main");
	const { Parametro } = require("../dist/ast/argumentos/Parametro");
	const { MedAsig } = require("../dist/ast/sentencias/MedAsig");
	const { FullAsig } = require("../dist/ast/sentencias/FullAsig");
	const { LlamadaMetodo } = require("../dist/ast/sentencias/LlamadaMetodo");


	const ListaToken =require( "../dist/ListaToken");
	const { Token } = require("../dist/Token");

	


%}

/* Definició Léxica */
%lex

%options case-insensitive

%%
\s+					//ignorando los espacios en blanco
"//".*				/* ignore comment line */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]		/* ignore comment Multilinea*/

"String"            %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"String", yytext));return 'String_'; %}
"int"               %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"int", yytext));return 'int_'; %}
"boolean"           %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"boolean", yytext));return 'boolean_'; %}
"double"            %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"double", yytext));return 'double_'; %}
"char"              %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"char", yytext));return 'char_'; %}
"void"              %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"void", yytext));return 'void_'; %}
"public"			%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"public", yytext));return 'public_'; %}
"static"			%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"static", yytext));return 'static_'; %}
"main"			    %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"main", yytext));return 'main_'; %}
"args"				%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"args", yytext));return 'args_'; %}
"class"				%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"class", yytext));return 'class_'; %}
"interface"			%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"interface", yytext));return 'interface_'; %}
"do"				%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"do", yytext));return 'do_'; %}
"while"				%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"while", yytext));return 'while_'; %}
"for"				%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"for", yytext));return 'for_'; %}
"if"				%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"if", yytext));return 'if_'; %}
"else"				%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"else", yytext));return 'else_'; %}
"break"             %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"break", yytext));return 'break_'; %}
"continue"          %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"continue", yytext));return 'continue_'; %}
"return"            %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"return", yytext));return 'return_'; %}
"System"            %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"System", yytext));return 'System_'; %}
"out"               %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"out", yytext));return 'out_'; %}
"print"             %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"print", yytext));return 'print_'; %}

[0-9]+"."[0-9]+		%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"decimal", yytext));return 'decimal_'; %}
[0-9]+				%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"numero", yytext));return 'numero_'; %}
\"[^\"]*\"		    %{yytext = yytext.substr(1,yyleng-2);ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"cadena", yytext));return 'cadena_'; %}/*//"*/
"true"              %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"true", yytext));return 'true_'; %}
"false"             %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"false", yytext));return 'false_'; %}

([a-zA-Z_])[a-zA-Z0-9_]*		%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"identificador", yytext));return 'identificador_'; %}

"{"                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"abrirLlave", yytext));return 'abrirLlave_'; %}
"}"                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"cerrarLlave", yytext));return 'cerrarLlave_'; %}
"("                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"abrirPar", yytext));return 'abrirPar_'; %}
")"                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"cerrarPar", yytext));return 'cerrarPar_'; %}
"["                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"abrirCor", yytext));return 'abrirCor_'; %}
"]"                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"cerrarCor", yytext));return 'cerrarCor_'; %}
"="                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"igual", yytext));return 'igual_'; %}
","                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"coma", yytext));return 'coma_'; %}
";"                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"puntocoma", yytext));return 'puntocoma_'; %}

"++"                %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"incremento", yytext));return 'incremento_'; %}
"--"                %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"decremento", yytext));return 'decremento_'; %}
"+"					%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"mas", yytext));return 'mas_'; %}
"-"					%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"menos", yytext));return 'menos_'; %}
"*"					%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"por", yytext));return 'por_'; %}
"/"					%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"division", yytext));return 'division_'; %}
">="                %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"mayorIgual", yytext));return 'mayorIgual'; %}
"<="                %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"menorIgual", yytext));return 'menorIgual_'; %}
">"                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"mayor", yytext));return 'mayor_'; %}
"<"                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"menor", yytext));return 'menor_'; %}
"=="                %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"dosIgual", yytext));return 'dosIgual_'; %}
"!="                %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"distinto", yytext));return 'distinto_'; %}
"||"				%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"or", yytext));return 'or_'; %}
"&&"				%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"and", yytext));return 'and_'; %}
"!"					%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"not", yytext));return 'not_'; %}
"^"                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"xor", yytext));return 'xor_'; %}
"."                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column,"punto", yytext));return 'punto_'; %}

[ \r\t]+			{}
\n					{}
<<EOF>>				return 'EOF';
.	{ 
		
		console.error('Error léxico: ' + yytext + ', line: ' + yylloc.first_line + ', column: ' + yylloc.first_column); 
	}

/lex

%left 'or_'
%left 'and_'
%left 'xor_'
%left 'dosIgual_' 'distinto_'

%left 'mayorIgual_' 'menorIgual_'
%left 'mayor_' 'menor_' 


%left 'mas_' 'menos_'
%left 'por_' 'division_'

%left uMenos
%right 'not_'
%left 'incremento_' 'decremento_'



%start S

%% 
/*
S : LISTA_CLASES EOF {
		var root = new AST($1);
		return root; 
	}
	;

LISTA_CLASES :
 	LISTA_CLASES CLASE {
		$1.push($2);
		$$ = $1;
	  }
    | CLASE {
		$$ = [$1];
	}
	| error cerrarLlave_ { 
		console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + (yylineno + 1) + ', en la columna: ' + this._$.first_column); 
	}
	|error puntocoma_ { 
		
		console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + (yylineno + 1) + ', en la columna: ' + this._$.first_column); 
	}
	;

CLASE : 
	public_ class_ identificador_ abrirLlave_  ARGUMENTOS cerrarLlave_ {
		$$ = $5;
	  }
	| public_ class_ identificador_ abrirLlave_  cerrarLlave_
	| class_ identificador_ abrirLlave_  ARGUMENTOS cerrarLlave_ {
		$$ = $4;
	  }
	| class_ identificador_ abrirLlave_  cerrarLlave_
	| public_ interface_ identificador_ abrirLlave_ ARGSINTERFAZ cerrarLlave_ {
		$$ = $5;
	  }
	| public_ interface_ identificador_ abrirLlave_  cerrarLlave_
	| interface_ identificador_ abrirLlave_ ARGSINTERFAZ cerrarLlave_ {
		$$ = $4;
	  }
	| interface_ identificador_ abrirLlave_  cerrarLlave_
	;

ARGSINTERFAZ: ARGSINTERFAZ ARGSINTERFAZ1
	| ARGSINTERFAZ1
	;

ARGSINTERFAZ1 : DECLARARFUNCION
	| DECLARACION
	;



*/
//-------------
S : ARGUMENTOS EOF {
		var root = new AST($1);
		return root; 
	}
	;


ARGUMENTOS : ARGUMENTOS ARGUMENTOS1 {
		$1.push($2);
		$$ = $1;
	  }
	|ARGUMENTOS1 {
		$$ = [$1];
	}
	;

ARGUMENTOS1:
 	FUNCION			{ $$ = $1; }
	| DECLARACION	{ $$ = $1; }
	| ASIGNACION	{ $$ = $1; }
	| MAIN			{ $$ = $1; }
	;
//--------------

MAIN : 
	public_ static_ void_ main_ abrirPar_ String_ abrirCor_ cerrarCor_ args_ cerrarPar_ BLOQUE_SENTENCIAS {
		$$ = new Main($4, $11, this._$.first_line, this._$.first_column)
	}
	;

SENTENCIAS :
	  SENTENCIAS SENTENCIAS_G {
		$1.push($2);
		$$ = $1;
	  }
	| SENTENCIAS_G {
		$$ = [$1];
	}
	;

SENTENCIAS_G : 
	DECLARACION		{ $$ = $1; }
	| ASIGNACION	{ $$ = $1; }
	//Repeticion
	| FOR			{ $$ = $1; }
	| WHILE			{ $$ = $1; }
	| DOWHILE		{ $$ = $1; }
	//Control
*	| IF			{ $$ = $1; }
	//Otros
	| BREAK			{ $$ = $1; }
	| CONTINUE		{ $$ = $1; }
	| RETURN		{ $$ = $1; }
	| LLAMADAMETODO	{ $$ = $1; }
	| JUSTID incremento_ puntocoma_	{ $$ = new OperacionAritmetica( TipoDeOperacion.INCREMENTO, $1, null, this._$.first_line, this._$.first_column); }
	| JUSTID decremento_ puntocoma_	{ $$ = new OperacionAritmetica( TipoDeOperacion.DECREMENTO, $1, null, this._$.first_line, this._$.first_column); }
	//Predeterminadas
	| PRINT1			{ $$ = $1; }
	;

LLAMADAMETODO : 
	identificador_  LISTA_PARAMETROS puntocoma_  { $$ = new LlamadaMetodo($1, $2, this._$.first_line, this._$.first_column); }
	;

JUSTID:
	identificador_ { $$ = new Identificador( $1, this._$.first_line, this._$.first_column); }
	;
DECLARACION : 
	TIPO COSASDECLARACION puntocoma_ { $$ = new Declaracion($1, $2, this._$.first_line, this._$.first_column); }
	;
	

COSASDECLARACION :  COSASDECLARACION coma_ COSASDECLA  {
		$1.push($3);
		$$ = $1;
	  }
	| COSASDECLA {
		$$ = [$1];
	}
	;
	

COSASDECLA : identificador_ igual_ EXPRESION { $$ = new FullAsig($1, $3, this._$.first_line, this._$.first_column); }
	| identificador_ { $$ = new MedAsig($1, this._$.first_line, this._$.first_column); }
	;

ASIGNACION : 
	identificador_ igual_ EXPRESION puntocoma_ 		{ $$ = new Asignacion($1, $3, this._$.first_line, this._$.first_column); }
	;

WHILE : 
	while_ CONDICION BLOQUE_SENTENCIAS	{ $$ = new While($2, $3, this._$.first_line, this._$.first_column); }
	;
DOWHILE :
	do_ BLOQUE_SENTENCIAS  while_ CONDICION puntocoma_ { $$ = new DoWhile($2, $4, this._$.first_line, this._$.first_column); }
	;

CONDICION :
	abrirPar_ EXPRESION cerrarPar_ { $$ = $2; }
	;

FOR : 
	for_ abrirPar_ DECLARACIONASIGNACION  EXPRESION puntocoma_ INCRDCR cerrarPar_ BLOQUE_SENTENCIAS { $$ = new For($3, $4,$6, $8, this._$.first_line, this._$.first_column); }
	;


BREAK : 
	break_ puntocoma_ 				{ $$ = new Break($1, this._$.first_line, this._$.first_column)}
	;

CONTINUE : 
	continue_ puntocoma_			{ $$ = new Continue($1, this._$.first_line, this._$.first_column)}
	;

RETURN : 
	return_ EXPRESION puntocoma_	{ $$ = new Return($1,$2, this._$.first_line, this._$.first_column)}
	;

IF : if_ CONDICION BLOQUE_SENTENCIAS
	| if_ CONDICION BLOQUE_SENTENCIAS ELSE1
	;

ELSE1 : ELSE1 ELSE {
		$1.push($2);
		$$ = $1;
	  }
	| ELSE {
		$$ = [$1];
	}


ELSE : else_ BLOQUE_SENTENCIAS;
	;



DECLARACIONASIGNACION :
	DECLARACION		{ $$ = $1; }
	| ASIGNACION	{ $$ = $1; }
	| JUSTID incremento_ puntocoma_	{ $$ = new OperacionAritmetica( TipoDeOperacion.INCREMENTO, $1, null, this._$.first_line, this._$.first_column); }
	| JUSTID decremento_ puntocoma_	{ $$ = new OperacionAritmetica( TipoDeOperacion.DECREMENTO, $1, null, this._$.first_line, this._$.first_column); }
	;

INCRDCR: 
	 JUSTID incremento_ 	{ $$ = new OperacionAritmetica( TipoDeOperacion.INCREMENTO, $1, null, this._$.first_line, this._$.first_column); }
	| JUSTID decremento_ 	{ $$ = new OperacionAritmetica( TipoDeOperacion.DECREMENTO, $1, null, this._$.first_line, this._$.first_column); }
	;
BLOQUE_SENTENCIAS : 
	abrirLlave_ SENTENCIAS cerrarLlave_  { $$ = $2; }
	| abrirLlave_  cerrarLlave_  { $$ = [] }
	;

FUNCION : 
	void_ identificador_  LISTA_PARAMETROS BLOQUE_SENTENCIAS	{ $$ = new Funcion(Tipo.VOID, $2, $3, $4, this._$.first_line, this._$.first_column); }
	| TIPO identificador_  LISTA_PARAMETROS BLOQUE_SENTENCIAS	{ $$ = new Funcion($1, $2, $3, $4, this._$.first_line, this._$.first_column); }
	| void_ identificador_  LISTA_PARAMETROS  puntocoma_ { $$ = new DeclFuncion(Tipo.VOID, $2, $3, this._$.first_line, this._$.first_column); }
	| TIPO identificador_  LISTA_PARAMETROS puntocoma_ { $$ = new DeclFuncion($1, $2, $3, this._$.first_line, this._$.first_column); }
	;

LISTA_PARAMETROS : 
	 abrirPar_ PARAMETROS cerrarPar_	{ $$ = $2; }
	| abrirPar_ cerrarPar_				{ $$ = [] }
	;

PARAMETROS : 	
	PARAMETROS coma_ PARAM {
		$1.push($3);
		$$ = $1;
	  }
	| PARAM	{
		$$ = [$1];
	}				
	;

PARAM : 
	TIPO identificador_		{$$ = new Parametro($1, $2, this._$.first_line, this._$.first_column)}
	;


TIPO : 
	int_ 	{ $$ = Tipo.INT }
	| boolean_	{ $$ = Tipo.BOOLEAN }
	| double_	{ $$ = Tipo.DOUBLE }
	| String_ 	{ $$ = Tipo.STRING }
	| char_ 	{ $$ = Tipo.CHAR }
	;

EXPRESION : 
	EXPRESION mas_ EXPRESION			{ $$ = new OperacionAritmetica( TipoDeOperacion.SUMA, $1, $3, this._$.first_line, this._$.first_column); }		
	| EXPRESION menos_ EXPRESION		{ $$ = new OperacionAritmetica( TipoDeOperacion.RESTA, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION por_ EXPRESION			{ $$ = new OperacionAritmetica( TipoDeOperacion.MULTIPLICACION, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION division_ EXPRESION		{ $$ = new OperacionAritmetica( TipoDeOperacion.DIVISION, $1, $3, this._$.first_line, this._$.first_column); }	
	| EXPRESION incremento_ 			{ $$ = new OperacionAritmetica( TipoDeOperacion.INCREMENTO, $1, null, this._$.first_line, this._$.first_column); }
	| EXPRESION decremento_ 			{ $$ = new OperacionAritmetica( TipoDeOperacion.DECREMENTO, $1, null, this._$.first_line, this._$.first_column); }
	| menos_ EXPRESION %prec uMenos		{ $$ = new OperacionAritmetica( TipoDeOperacion.NEGATIVO, $2, null, this._$.first_line, this._$.first_column); }	
	| EXPRESION or_ EXPRESION			{ $$ = new OperacionLogica( TipoDeOperacion.OR, $1, $3, this._$.first_line, this._$.first_column); }	
	| EXPRESION and_ EXPRESION			{ $$ = new OperacionLogica( TipoDeOperacion.AND, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION xor_ EXPRESION			{ $$ = new OperacionLogica( TipoDeOperacion.AND, $1, $3, this._$.first_line, this._$.first_column); }
	| not_ EXPRESION					{ $$ = new OperacionLogica( TipoDeOperacion.NOT, $2, null, this._$.first_line, this._$.first_column); }
	| EXPRESION mayorIgual_ EXPRESION 	{ $$ = new OperacionRelacional( TipoDeOperacion.MAYORIGUAL, $1, $3, this._$.first_line, this._$.first_column); }	
	| EXPRESION menorIgual_ EXPRESION 	{ $$ = new OperacionRelacional( TipoDeOperacion.MENORIGUAL, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION dosIgual_ EXPRESION		{ $$ = new OperacionRelacional( TipoDeOperacion.DOSIGUAL, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION distinto_ EXPRESION		{ $$ = new OperacionRelacional( TipoDeOperacion.DISTINTO, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION mayor_ EXPRESION		{ $$ = new OperacionRelacional( TipoDeOperacion.MAYOR, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION menor_ EXPRESION		{ $$ = new OperacionRelacional( TipoDeOperacion.MENOR, $1, $3, this._$.first_line, this._$.first_column); }	
	| abrirPar_ EXPRESION cerrarPar_	{ $$ = new Parentesis( $2, this._$.first_line, this._$.first_column); }
	| PRIMITIVO							{ $$ = $1; }
	;

PRIMITIVO : 
  	decimal_		{ $$ = new Primitivo( $1, this._$.first_line, this._$.first_column); }
	| numero_		{ $$ = new Primitivo( $1, this._$.first_line, this._$.first_column); }
	| cadena_		{ $$ = new Primitivo( $1, this._$.first_line, this._$.first_column); }
	| true_			{ $$ = new Primitivo( true, this._$.first_line, this._$.first_column); }
	| false_		{ $$ = new Primitivo( false, this._$.first_line, this._$.first_column); }
	| identificador_ { $$ = new Identificador( $1, this._$.first_line, this._$.first_column); }
	;

