#media dos pesos
SELECT (um.Temp + dois.Temp)/2 AS media
FROM projectAPI.episodio1 um, projectAPI.episodio2 dois;


#selecionar os verdadeiros da proveniencia de cada tabela
SELECT 
	CASE WHEN SUPP="True" THEN 'SUPP'
		WHEN SCI="True" THEN 'SCI'
        WHEN APR="True" THEN 'APR'
	
	END AS coluna_verdadeira
FROM projectAPI.episodio1
WHERE SUPP = "True" OR SCI = "True" OR APR = "True";


