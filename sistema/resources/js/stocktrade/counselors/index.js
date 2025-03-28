/* function format ( d ) {
    return '<pre>'+d.description+'</pre>';
} */

var table = $('#list').DataTable( {
    responsive: true,
    autoWidth: false,
    dom: 'Bfrtip',
    buttons: [
        {
            extend: 'csv', // Define botão de gerar excel
            text: 'Exportar tabela', // Nomeia o botão
            filename: 'base_conselheiros', // Define o nome do arquivo que será exportado
            fieldSeparator: ';',
            fieldBoundary: '',
            charset: 'UTF-8',
            bom: true,
            exportOptions: {
                columns: [0,1],
                /*modifier: {
                    selected: null
                }*/
            }
        },
    ],
    language: { // Traduz o plugin
        url: "/assets/plugins/datatables/pt_br.json", // Arquivo de tradução
        select: { // Tradução encima das operações de seleção de linha
            rows: { // Tradução para o Footer da tabela
                _: "Você selecionou %d linhas", // Footer -> Tradução para mais de uma linha selecionada
                0: "Clique na linha para selecionar", // Footer -> Tradução para nenhuma linha selecionada
                1: "Apenas 1 linha foi selecionada" // Footer -> Tradução para apenas uma linha selecionada
            }
        },
        buttons: { // Tradução encima da mensagem do botão de cópia
            copyTitle: 'Tabela copiada',
            copySuccess: {
                _: '%d linhas copiadas',
                1: '1 linha copiada'
            }
        }
    },
    searching: true,
    ajax: $('#route_list').val(),
    "order": [[ 2, "asc" ]],
    columns: [
        { data: 'cpf', width: "20%"},
        { data: 'nome', width: "40%"},
        { data: 'user_name', width: "20%"},
        { data: 'created_at', orderable: false, width: "30%"}
    ],

} );


/**
 * Script somente em JQUERY
 */

 frmValidate(
	"#frm",
	{
		file: {
			required: true,
            extension: "txt,csv"
		}
	},
	{
		file: {
			required: "Selecione o arquivo, por favor!",
            extension: "Tipo de arquivo inválido!"
		}
	}
);

/*$("#frm").validate({
    rules: {
      file: {
        required: true,
        extension: 'txt,csv'
      }
    },
    messages: {
      file: {
        required: "Selecione o arquivo, por favor!",
        extension: "Tipo de arquivo inválido!"
      }
    }
  });*/

/**Recarrega a tabela de tempos em tempos */
/*setInterval(function(){ 
    table.clear().draw();
	table.ajax.reload();
}, 60000);*/ /**Recarrega a cada 1 minuto */
