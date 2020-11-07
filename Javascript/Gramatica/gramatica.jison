%{
	const { Clase } = require("../dist/ast/clase/Clase");
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

	const { IF } = require("../dist/ast/sentencias/IF");
	const { Else } = require("../dist/ast/sentencias/Else");


	const ListaToken =require( "../dist/ListaToken");
	const { Token } = require("../dist/Token");
	
	


%}

/* Definició Léxica */
%lex

%options case-insensitive

%%
\s+					{}
"//".*				{}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]		{}

"String"            %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"String", yytext));return 'String_'; %}
"int"               %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"int", yytext));return 'int_'; %}
"boolean"           %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"boolean", yytext));return 'boolean_'; %}
"double"            %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"double", yytext));return 'double_'; %}
"char"              %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"char", yytext));return 'char_'; %}
"void"              %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"void", yytext));return 'void_'; %}
"public"			%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"public", yytext));return 'public_'; %}
"static"			%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"static", yytext));return 'static_'; %}
"main"			    %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"main", yytext));return 'main_'; %}
"args"				%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"args", yytext));return 'args_'; %}
"class"				%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"class", yytext));return 'class_'; %}
"interface"			%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"interface", yytext));return 'interface_'; %}
"do"				%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"do", yytext));return 'do_'; %}
"while"				%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"while", yytext));return 'while_'; %}
"for"				%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"for", yytext));return 'for_'; %}
"if"				%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"if", yytext));return 'if_'; %}
"else"				%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"else", yytext));return 'else_'; %}
"break"             %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"break", yytext));return 'break_'; %}
"continue"          %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"continue", yytext));return 'continue_'; %}
"return"            %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"return", yytext));return 'return_'; %}
"System"            %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"System", yytext));return 'System_'; %}
"out"               %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"out", yytext));return 'out_'; %}
"print"             %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"print", yytext));return 'print_'; %}
"println"           %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"println", yytext));return 'println_'; %}
[0-9]+"."[0-9]+		%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"decimal", yytext));return 'decimal_'; %}
[0-9]+				%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"numero", yytext));return 'numero_'; %}
\"[^\"]*\"		    %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"cadena", yytext ));return 'cadena_'; %}
"true"              %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"true", yytext));return 'true_'; %}
"false"             %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"false", yytext));return 'false_'; %}
"null"				%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"null", yytext));return 'null_'; %}

([a-zA-Z_])[a-zA-Z0-9_]*		%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"identificador", yytext));return 'identificador_'; %}

"{"                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"abrirLlave", yytext));return 'abrirLlave_'; %}
"}"                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"cerrarLlave", yytext));return 'cerrarLlave_'; %}
"("                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"abrirPar", yytext));return 'abrirPar_'; %}
")"                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"cerrarPar", yytext));return 'cerrarPar_'; %}
"["                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"abrirCor", yytext));return 'abrirCor_'; %}
"]"                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"cerrarCor", yytext));return 'cerrarCor_'; %}

","                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"coma", yytext));return 'coma_'; %}
";"                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"puntocoma", yytext));return 'puntocoma_'; %}

"++"                %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"incremento", yytext));return 'incremento_'; %}
"--"                %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"decremento", yytext));return 'decremento_'; %}
"+"					%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"mas", yytext));return 'mas_'; %}
"-"					%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"menos", yytext));return 'menos_'; %}
"*"					%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"por", yytext));return 'por_'; %}
"/"					%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"division", yytext));return 'division_'; %}
">="                %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"mayorIgual", yytext));return 'mayorIgual_'; %}
"<="                %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"menorIgual", yytext));return 'menorIgual_'; %}
">"                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"mayor", yytext));return 'mayor_'; %}
"<"                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"menor", yytext));return 'menor_'; %}
"=="                %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"dosIgual", yytext));return 'dosIgual_'; %}
"="                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"igual", yytext));return 'igual_'; %}
"!="                %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"distinto", yytext));return 'distinto_'; %}
"||"				%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"or", yytext));return 'or_'; %}
"&&"				%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"and", yytext));return 'and_'; %}
"!"					%{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"not", yytext));return 'not_'; %}
"^"                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"xor", yytext));return 'xor_'; %}
"."                 %{ListaToken.tokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"punto", yytext));return 'punto_'; %}

[ \r\t]+			{}
\n					{}
<<EOF>>				return 'EOF';
.	{ 

		ListaToken.errorTokens.push(new Token(yylloc.first_line,yylloc.first_column+1,"Lexico", 'El caracter "' + yytext + '" no pertenece al lenguaje.'));  
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

S : LISTA_CLASES EOF {
		var root = new AST($1);
		return root; 
	}
	|  ERROR EOF{
		var root = new AST([]);
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
	|  ERROR SIMBOLOREC {	
		console.log("error del mundo");	
		$$ = [];}	 
	;

CLASE : 
	 public_ class_ identificador_ abrirLlave_  ARGUMENTOS cerrarLlave_ 		{ $$ = new Clase($3, $5, true,0, this._$.first_line, this._$.first_column ); }
	| public_ class_ identificador_ abrirLlave_  cerrarLlave_					{ $$ = new Clase($3, [], true,0, this._$.first_line, this._$.first_column ); }
	| public_ interface_ identificador_ abrirLlave_ ARGSINTERFAZ cerrarLlave_ 	{ $$ = new Clase($3, $5, false,2, this._$.first_line, this._$.first_column ); }
	| public_ interface_ identificador_ abrirLlave_  cerrarLlave_	 			{ $$ = new Clase($3, [], false,2, this._$.first_line, this._$.first_column ); }	
	| class_ identificador_ abrirLlave_  cerrarLlave_ 							{ $$ = new Clase($2, [], true,1, this._$.first_line, this._$.first_column ); }
	| interface_ identificador_ abrirLlave_  cerrarLlave_ 						{ $$ = new Clase($2, [], false,3, this._$.first_line, this._$.first_column ); }
	| class_ identificador_ abrirLlave_  ARGUMENTOS cerrarLlave_ 				{ $$ = new Clase($2, $4, true,1, this._$.first_line, this._$.first_column ); }
	| interface_ identificador_ abrirLlave_ ARGSINTERFAZ cerrarLlave_ 			{ $$ = new Clase($2, $4, false,3, this._$.first_line, this._$.first_column ); }
	;

ARGSINTERFAZ: ARGSINTERFAZ ARGSINTERFAZ1 {
		$1.push($2);
		$$ = $1;
	  }
	| ARGSINTERFAZ1 {
		$$ = [$1];
	}
	|  ERROR SIMBOLORECSENTENCIA1  {	
		console.log("error de interfaz");	
		$$ = [];}	 
	;

SIMBOLORECSENTENCIA1 : puntocoma_ {console.log("salvado por ;");$$ = [];}	
	| cerrarLlave_ {console.log("salvado por }");$$ = [];}	
	;

ARGSINTERFAZ1 :
	public_ DECLARARFUNCION { $$ = $2; }
	| DECLARARFUNCION { $$ = $1; }
	| DECLARACION				{ $$ = $1; }
	;



ARGUMENTOS : ARGUMENTOS ARGUMENTOS1 {	
		$1.push($2);
		$$ = $1;
	  }
	|ARGUMENTOS1 {
		$$ = [$1];
	}
	| ERROR SIMBOLOREC {	
		console.log("error de clase");	
		$$ = [];}		
	;

	
SIMBOLOREC : puntocoma_ {console.log("salvado por ;");$$ = [];}	
	| cerrarLlave_ {console.log("salvado por }");$$ = [];}
	

	;

ERROR : error  {console.log(yytext);ListaToken.errorTokens.push(new Token(this._$.first_line,this._$.first_column,"Sintanctico", 'Se encontró "' + yytext + '" y se esperaba ";".'  ));  }
	;

ARGUMENTOS1:
 	 FUNCION		{ $$ = $1; }
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

	
SIMBOLORECSENTENCIA : puntocoma_ {console.log("salvado por ;");$$ = [];}	
	| cerrarLlave_ {console.log("salvado por }");$$ = [];}
	;

SENTENCIAS_G :
	
	DECLARACION		{ $$ = $1; }
	| ASIGNACION	{ $$ = $1; }
	//Repeticion
	| FOR			{ $$ = $1; }
	| WHILE			{ $$ = $1; }
	| DOWHILE		{ $$ = $1; }
	//Control
	| IF			{ $$ = $1; }
	//Otros
	| BREAK			{ $$ = $1; }
	| CONTINUE		{ $$ = $1; }
	| RETURN		{ $$ = $1; }
	| LLAMADAMETODO	{ $$ = $1; }
	| JUSTID incremento_ puntocoma_	{ $$ = new OperacionAritmetica( TipoDeOperacion.INCREMENTO, $1, null, this._$.first_line, this._$.first_column); }
	| JUSTID decremento_ puntocoma_	{ $$ = new OperacionAritmetica( TipoDeOperacion.DECREMENTO, $1, null, this._$.first_line, this._$.first_column); }
	//Predeterminadas
	| PRINT			{ $$ = $1; }
	
	;

PRINT: System_ punto_ out_ punto_ print_ abrirPar_ EXPRESION cerrarPar_ puntocoma_ { $$ = new Print( 0, $7, this._$.first_line, this._$.first_column); }
	| System_ punto_ out_ punto_ println_ abrirPar_ EXPRESION cerrarPar_ puntocoma_ { $$ = new Print( 1, $7, this._$.first_line, this._$.first_column); }
	;

LLAMADAMETODO : 
	identificador_ LISTA_PARAMETROS_LLAMADA puntocoma_  { $$ = new LlamadaMetodo($1, $2, this._$.first_line, this._$.first_column); }
	;

LISTA_PARAMETROS_LLAMADA:
	 abrirPar_ PARAMETROS1 cerrarPar_	{ $$ = $2; }
	| abrirPar_ cerrarPar_				{ $$ = [] }	
	;
PARAMETROS1 : 	
	PARAMETROS1 coma_ PARAM1 {
		$1.push($3);
		$$ = $1;
	  }
	| PARAM1 {
		$$ = [$1];
	}		
	| ERROR SIMBOLOREC { 
		console.log("error de parametros1");
		$$ = [] }		
	;

PARAM1 : 
	TIPO identificador_		{$$ = new Parametro($1, $2, this._$.first_line, this._$.first_column)}	
	| PRIMITIVO1	{$$ = new Parametro(0,null, $1, this._$.first_line, this._$.first_column)}
	;

PRIMITIVO1 : 
  	decimal_		{$$ = new Parametro(0,null, $1, this._$.first_line, this._$.first_column)}
	| numero_		{$$ = new Parametro(0,null, $1, this._$.first_line, this._$.first_column)}
	| cadena_		{$$ = new Parametro(1,null, $1, this._$.first_line, this._$.first_column)}
	| true_			{$$ = new Parametro(0,null, $1, this._$.first_line, this._$.first_column)}
	| identificador_	{$$ = new Parametro(0,null, $1, this._$.first_line, this._$.first_column)}
	| false_		{$$ = new Parametro(0,null, $1, this._$.first_line, this._$.first_column)}
	| null_ 		{$$ = new Parametro(0,null, $1, this._$.first_line, this._$.first_column)}
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
	do_ BLOQUE_SENTENCIAS  DOWHILE2 {		 
		if($3 != null){
			console.log($3);
			$$ = new DoWhile($2, $3, this._$.first_line, this._$.first_column); 
		} else{
			$$ = null;
		}
	}	
	;

DOWHILE2 : while_ CONDICION puntocoma_ {$$ = $2}	
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

IF : if_ CONDICION BLOQUE_SENTENCIAS 		{ $$ = new IF($2,$3,null, this._$.first_line, this._$.first_column)}			
	| if_ CONDICION BLOQUE_SENTENCIAS ELSE	{ $$ = new IF($2,$3,$4, this._$.first_line, this._$.first_column)}
	;


ELSE : else_ BLOQUE_SENTENCIAS { $$ = new Else($2,null,0, this._$.first_line, this._$.first_column)}
	| else_ IF { $$ = new Else(null,$2,1, this._$.first_line, this._$.first_column)}
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
	 abrirLlave_  cerrarLlave_  { $$ = []; } 
	| abrirLlave_ ERROR cerrarLlave_ {console.log("camino 2"); $$ = []; }
	| abrirLlave_ SENTENCIAS cerrarLlave_  { $$ = $2; }
	| abrirLlave_ ERROR SENTENCIAS cerrarLlave_  {console.log("camino 1"); $$ = $3;  }

	;

FUNCION : 
	public_ void_ identificador_  LISTA_PARAMETROS BLOQUE_SENTENCIAS	{ $$ = new Funcion(Tipo.VOID, $3, $4, $5, this._$.first_line, this._$.first_column); }
	| public_  TIPO identificador_  LISTA_PARAMETROS BLOQUE_SENTENCIAS	{ $$ = new Funcion($2, $3, $4, $5, this._$.first_line, this._$.first_column); }
	| public_ DECLARARFUNCION {$$ = $2}
	| void_ identificador_  LISTA_PARAMETROS BLOQUE_SENTENCIAS	{ $$ = new Funcion(Tipo.VOID, $2, $3, $4, this._$.first_line, this._$.first_column); }
	| TIPO identificador_  LISTA_PARAMETROS BLOQUE_SENTENCIAS	{ $$ = new Funcion($1, $2, $3, $4, this._$.first_line, this._$.first_column); }
	| DECLARARFUNCION {$$ = $1}
	;

DECLARARFUNCION : 
	 void_ identificador_  LISTA_PARAMETROS  puntocoma_ { $$ = new DeclFuncion(Tipo.VOID, $2, $3, this._$.first_line, this._$.first_column); }
	| TIPO identificador_  LISTA_PARAMETROS puntocoma_ { $$ = new DeclFuncion($1, $2, $3, this._$.first_line, this._$.first_column); }
	
	;



LISTA_PARAMETROS : 
	abrirPar_ cerrarPar_				{ $$ = [] }
	| abrirPar_ PARAMETROS cerrarPar_	{ $$ = $2; }
	
	;

PARAMETROS : 	
	PARAMETROS coma_ PARAM {
		$1.push($3);
		$$ = $1;
	  }
	| PARAM	{
		$$ = [$1];
	}		
	| ERROR SIMBOLOREC { 
		console.log("error de parametros");
		$$ = [] }		
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
  	decimal_		{ $$ = new Primitivo(0, $1, this._$.first_line, this._$.first_column); }
	| numero_		{ $$ = new Primitivo(0, $1, this._$.first_line, this._$.first_column); }
	| cadena_		{ $$ = new Primitivo(1, $1, this._$.first_line, this._$.first_column); }
	| true_			{ $$ = new Primitivo(0, true, this._$.first_line, this._$.first_column); }
	| false_		{ $$ = new Primitivo(0, false, this._$.first_line, this._$.first_column); }
	| identificador_ { $$ = new Primitivo(0, $1, this._$.first_line, this._$.first_column); }
	| null_ { $$ = new Primitivo(0, null, this._$.first_line, this._$.first_column); }
	;

