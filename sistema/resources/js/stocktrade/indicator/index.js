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
    order: [[1, 'desc']],
    searching: true,
    ajax: $('#route_list').val(),
    initComplete: function(settings, json) {// Tabela foi carregada por completo
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });
        /*this.api().column(2).every(function() { # Adiciona uma combo de busca
            var column = this;
            // Put the HTML of the <select /> filter along with any default options 
            var select = $('<select class="form-select"><option value="">Todos tipos</option></select>')
              // remove all content from this column's header and 
              // append the above <select /> element HTML code into it 
              .prependTo($(column.header()))
              //.appendTo($(column.header()).empty())
              //.appendTo($("#list_filter.dataTables_filter"))
              // execute callback when an option is selected in our <select /> filter
              .on('change', function() {
                // escape special characters for DataTable to perform search
                var val = $.fn.dataTable.util.escapeRegex(
                  $(this).val()
                );
                // Perform the search with the <select /> filter value and re-render the DataTable
                column
                  .search(val ? '^' + val + '$' : '', true, false)
                  .draw();
              });
            // fill the <select /> filter with unique values from the column's data
            column.data().unique().sort().each(function(d, j) {
              select.append("<option value='" + d + "'>" + d + "</option>")
            });
        });*/
    },
    columns: [
        { 
            class:          "details-control",
            orderable:      false,
            data:           null,
            defaultContent: ""
        },
        { data: 'id', width: "7%"},
        { data: 'reference_date', width: "10%"},
        { data: 'type', width: "15%"},
        { 
            data: 'start_date',
            width: "18%",
            orderable: false,
            render: function ( data, type, row ) { 
                return `${row.start_date} | ${row.end_date}`
            }
        },
        { data: 'user_created.name', width: "18%",
            render: function ( data, type, row ) { 
                if ( type === 'display' ) {
                    let arrayName = row.user_created.name.split(' ');
                    return `${arrayName[0]} ${arrayName[arrayName.length - 1]}`;
                }
                return data;
            }
        },
        { 
            data: 'status',/*, width: "30%"*/
            render: function ( data, type, row ) { 
                    let classSpan = 'text-warning';
                    if(row.status == 'complete'){
                        classSpan = 'text-success';
                    }
                    if(row.status == 'error'){
                        classSpan = 'text-danger';
                    }
                    return `<span class="${classSpan}"><b>${row.status}</b></span>`;
            }
        },
        { data: 'downloaded', className: 'text-center', width: "10%",
            render: function ( data, type, row ) { 
                let content = '';
                if(row.downloaded == 'yes'){
                    content = '<b class="text-info">Sim</b>';
                }else{
                    content = '<b class="text-danger">Não</b>';
                }
                
                return content;
            }
        },
        { 
            data: 'id', 
            className: 'text-center',
            orderable: false,  
            width: "15%",
            render: function ( data, type, row ) { 
                if ( type === 'display' ) {

                    const status = ["warning", "complete"];

                    let bts = '';
                    if(status.includes(row.status)){ // Se estiver com alerta ou completo, exibe botões
                        let url_result = $('#route_result').val().replace("*", row.id);
                        bts = `<a href="${url_result}" class="ms-2" data-toggle="tooltip" data-placement="top" title="Pegar resultado">
                                    <i class="bi bi-file-earmark-text-fill fs-5"></i>
                                </a>`;
                        let url_returnfile = $('#route_returnfile').val().replace("*", row.id);
                        bts += `<a href="${url_returnfile}" class="ms-2" data-toggle="tooltip" data-placement="top" title="Pegar arquivo de retorno">
                                    <i class="bi bi-download"></i>
                                </a>`;

                    }

                    let url_destroy = $('#route_destroy').val().replace("*", row.id);
                    let btnDestroy = `<a href="#" data-bs-toggle="modal" data-bs-target="#delete-register" class="destroy ms-2 text-danger" data_id="${row.id}" data_url="${url_destroy}" data_name="ID: ${row.id} - ${row.type} - ${row.start_date} | ${row.end_date}" data-toggle="tooltip" data-placement="top" title="Excluir registro"><i class="bi bi-trash fs-5"></i></a>`;
                    return bts+btnDestroy;
                }
                return data;
            }
        }
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
        let datas = [];
        
        let countTotal = row.data().count_total != null? row.data().count_total: 0;
        let countProceeds = row.data().count_proceeds != null? row.data().count_proceeds: 0;
        let countNotProceeds = row.data().count_not_proceeds != null? row.data().count_not_proceeds: 0;
        let countUndefined = row.data().count_undefined != null? row.data().count_undefined: 0;
        let countRecurrent = row.data().count_recurrent != null? row.data().count_recurrent: 0;

        let qtds = [];
        qtds.push(`<b>Total CPFs:</b> ${countTotal}`);
        qtds.push(`<b>Procede:</b> ${countProceeds}`);
        qtds.push(`<b>Não procede:</b> ${countNotProceeds}`);
        qtds.push(`<b>Sem definição:</b> ${countUndefined}`);
        qtds.push(`<b>Recorrente:</b> ${countRecurrent}`);

        datas.push(`<b>D-1 pregão:</b> ${row.data().yesterday_date} | `);
        datas.push(`${qtds.join(' | ')}<br><br>`);

        if(row.data().type == 'fato_relevante'){
            datas.push(`<b>Fato:</b> ${row.data().name}<br>`);
            datas.push(`<b>Qtd. de dias até o fato:</b> ${row.data().number_days}<br>`);
        }

        if(row.data().type == 'encarteiramento'){
            datas.push(`<b>Qtd. de dias para checar primeira compra:</b> ${row.data().check_days}<br>`);
        }
        datas.push(row.data().description != null && row.data().description != ''? `<b>Descrição:</b><br>${row.data().description}<br>`: '');

        row.child( datas.join('') ).show();

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

$('#list tbody').on( 'click', '.destroy', function (event) {
    event.preventDefault();
    let urlDelete = $(this).attr('data_url');
    let nameDelete = $(this).attr('data_name');
    let element = $(this);

    feedsDeleteRegister(nameDelete,urlDelete);
    $('#modal-bt-delete-register').off("click");
    $('#modal-bt-delete-register').on('click', async function (event) {
        let data = await modalDeleteExecute(urlDelete);
        if(data.status){
            table
                .row( element.parents('tr') )
                .remove()
                .draw();
        }
    });
});