/**
 * Script somente em JQUERY
 */

 frmValidate(
	"#frm",
	{
		file: {
			required: true,
            extension: "csv"
		}
	},
	{
		file: {
			required: "Selecione o arquivo, por favor!",
      		extension: "Tipo de arquivo inválido!"
		}
	}
);

/**Recarrega a tabela de tempos em tempos */
/*setInterval(function(){ 
    table.clear().draw();
	table.ajax.reload();
}, 60000);*/ /**Recarrega a cada 1 minuto */
