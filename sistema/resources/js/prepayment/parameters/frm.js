/* function format ( d ) {
    return '<pre>'+d.description+'</pre>';
} */

var table = $('#list').DataTable( {
    responsive: true,
    autoWidth: false,
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
    order: [[ 0, "desc" ]],
    initComplete: function(settings, json) {// Tabela foi carregada por completo, executa bloco
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });
    },
    createdRow: function( row, data, dataIndex){ // Personaliza css da linha
        if( data.status ==  'A'){
            $(row).addClass('color-blue');
        }else{
            $(row).addClass('text-secondary');
        }
    },
    columns: [
        { data: 'id', width: "1%", orderable: false},
        { data: 'historical_time', width: "5%", orderable: false},
        { data: 'value_unknown', width: "5%", orderable: false},
        { data: 'strange_value', width: "4%", orderable: false},
        { data: 'minimum_value', width: "4%", orderable: false},
        { data: 'archiving_time', width: "4%", orderable: false},
        { 
            data: 'user_id', 
            className: 'text-center',
            orderable: false,  
            width: "5%",
            render: function ( data, type, row ) { 
                if(row.user_id != null){
                    let arrayName = row.user_created.name.split(' ');
                    return `<span data-toggle="tooltip" data-placement="top" title="${row.user_created.name}">${arrayName[0]}</span>`;
                }else{
                    return ''
                }
                
            }
        },
        { 
            data: 'created_at', 
            className: 'text-center',
            orderable: false,  
            width: "15%",
            render: function ( data, type, row ) { 
                return `${row.created_at} | ${row.updated_at}`                
            }
        }
    ],

} );



/**
 * Script somente em JQUERY
 */

 frmValidate(
	"#frm",
	{
        historical_time: {
			required: true
		},
        archiving_time: {
			required: true
		},
        value_unknown: {
			required: true
		},
        strange_value: {
			required: true
		},
        minimum_value: {
			required: true
		},
	},
	{
        historical_time: {
			required: "Selecione, por favor!"
		},
        archiving_time: {
			required: "Selecione, por favor!"
		},
        value_unknown: {
			required: "Informe, por favor!"
		},
        strange_value: {
			required: "Informe, por favor!"
		},
        minimum_value: {
			required: "Informe, por favor!"
		}
	}
);

$('.number').mask("###0.00", {reverse: true});
$('.month').mask("#0");

/**Recarrega a tabela de tempos em tempos */
/*setInterval(function(){ 
    table.clear().draw();
	table.ajax.reload();
}, 60000);*/ /**Recarrega a cada 1 minuto */
