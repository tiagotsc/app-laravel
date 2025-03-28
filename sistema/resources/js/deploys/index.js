function format ( d ) {
    return '<pre>'+d.description+'</pre>';
}

/*$(document).ready(function() {*/
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
        "order": [[ 1, "desc" ]],
        columns: [
            { 
                class:          "details-control",
                orderable:      false,
                data:           null,
                defaultContent: ""
            },
            { data: 'id'/*, width: "50%"*/},
            { data: 'repository'/*, width: "50%"*/},
            { data: 'enveronment',/*, width: "30%"*/},
            { data: 'user_name'/*, width: "30%"*/},
            /*{ data: 'action', width: "30%"},*/
            { 
                data: 'status',/*, width: "30%"*/
                render: function ( data, type, row ) { 
                        let classSpan = 'text-warning';
                        if(row.status == 'complete'){
                            classSpan = 'text-success';
                        }
                        return `<span class="${classSpan}"><b>${row.status}</b></span>`;
                }
            },
            { data: 'created_at', orderable: false/*, width: "30%"*/},
            { data: 'updated_at', orderable: false/*, width: "30%"*/},
        ],

    } );

    // Array to track the ids of the details displayed rows
    var detailRows = [];

    $('#list tbody').on( 'click', 'tr td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
        var idx = $.inArray( tr.attr('id'), detailRows );

        if ( row.child.isShown() ) {
            tr.removeClass( 'details' );
            row.child.hide();

            // Remove from the 'open' array
            detailRows.splice( idx, 1 );
        }
        else {
            tr.addClass( 'details' );
            row.child( format( row.data() ) ).show();

            // Add to the 'open' array
            if ( idx === -1 ) {
                detailRows.push( tr.attr('id') );
            }
        }
    } );

    // On each draw, loop over the `detailRows` array and show any child rows
    table.on( 'draw', function () {
        $.each( detailRows, function ( i, id ) {
            $('#'+id+' td.details-control').trigger( 'click' );
        } );
    } );
/*} );*/


/**
 * Script somente em JQUERY
 */

 frmValidate(
	"#frm",
	{
		repository: {
			required: true
		}
	},
	{
		repository: {
			required: "Informe, por favor!"
		}
	}
);

/**Recarrega a tabela de tempos em tempos */
/*setInterval(function(){ 
    table.clear().draw();
	table.ajax.reload();
}, 60000);*/ /**Recarrega a cada 1 minuto */
