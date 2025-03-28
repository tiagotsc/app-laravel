/**
 * Script somente em JQUERY
 */

$(function () {
	$('[data-bs-toggle="tooltip"]').tooltip()
});
frmValidate(
	"#frm",
	{
		order: {
			required: true,
            extension: "csv"
		},
		order_detail: {
			required: true,
            extension: "csv"
		},
		supplier: {
			required: true,
            extension: "csv"
		}
	},
	{
		order: {
			required: "Selecione o arquivo, por favor!",
      		extension: "Tipo de arquivo inválido!"
		},
		order_detail: {
			required: "Selecione o arquivo, por favor!",
      		extension: "Tipo de arquivo inválido!"
		},
		supplier: {
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
