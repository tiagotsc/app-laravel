var table = $('#list').DataTable( {
    pageLength: 50, // Mínimo de registros por tela
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
            defaultContent: "",
            width: "2%"
        },
        { data: 'id', width: "4%"},
        { 
            data: 'name',
            width: "10%",
            orderable: false,
            render: function ( data, type, row ) { 
                //return `${row.start_date} | ${row.end_date}`
                let infoFile = 'Sem referência';
                if(row.original_name != null){
                    infoFile = `Referente ao lote ${row.original_name.substr(15,2)}/${row.original_name.substr(17,2)}/${row.original_name.substr(19,4)}`;
                }
                return `<spa data-toggle="tooltip" data-placement="top" title="${infoFile}">${row.name.substr(19)}</span>`
            }
        },
        { data: 'count_total', width: "6%"},
        { 
            data: 'value_total',
            width: "12%",
            orderable: true,
            render: function ( data, type, row ) { 
                //return row.value_total
                return parseFloat(row.value_total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            }
        },
        { data: 'downloaded', className: 'text-center', width: "3%",
            render: function ( data, type, row ) { 
                let content = '';
                if(row.downloaded == 'yes'){
                    content = `<b class="text-info" data-toggle="tooltip" data-placement="top" title="Última baixa realizada em ${row.updated_at}">Sim</b>`;
                }else{
                    content = '<b class="text-danger">Não</b>';
                }
                
                return content;
            }
        },
        { 
            data: 'count_undefined',
            width: "3%",
            orderable: true,
            render: function ( data, type, row ) { 
                let qtd = (row.count_undefined == null)? '': row.count_undefined;
                return qtd;
            }
        },
        { data: 'created_at', width: "9%"},
        { 
            data: 'id', 
            className: 'text-center',
            orderable: false,  
            width: "2%",
            render: function ( data, type, row ) { 
                let bts = '';
                let route_export = $('#route_export').val().replace("*", row.id);
                        bts += `<a href="#" data-bs-toggle="modal" data-bs-target="#modal-confirm" data_url="${route_export}" class="get_lote ms-2" data_name="${row.name}" data-toggle="tooltip" data-placement="top" title="Obter lote">
                                    <i class="bi bi-file-earmark-text-fill fs-5"></i>
                                </a>`;
                return bts
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
        
        // Desconhecido (Trilhões)
        let countTotalUnknown = row.data().count_total_unknown != null? row.data().count_total_unknown: 0;
        let valueTotalUnknown = row.data().value_total_unknown != null? row.data().value_total_unknown: 0;
            valueTotalUnknown = parseFloat(valueTotalUnknown).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        // Procede
        let countProceeds = row.data().count_proceeds != null? row.data().count_proceeds: 0;
        let valueProceeds = row.data().value_proceeds != null? row.data().value_proceeds: 0;
            valueProceeds = parseFloat(valueProceeds).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        // Não procede
        let countNotProceeds = row.data().count_not_proceeds != null? row.data().count_not_proceeds: 0;
        let valueNotProceeds = row.data().value_not_proceeds != null? row.data().value_not_proceeds: 0;
            valueNotProceeds = parseFloat(valueNotProceeds).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        // Corrigidos
        let countCorrection = row.data().count_correction != null? row.data().count_correction: 0;
        let valueCorrection = row.data().value_correction != null? row.data().value_correction: 0;
            valueCorrection = parseFloat(valueCorrection).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        // Não corrigidos
        let countNotCorrection = row.data().count_not_correction != null? row.data().count_not_correction: 0;
        let valueNotCorrection = row.data().value_not_correction != null? row.data().value_not_correction: 0;
            valueNotCorrection = parseFloat(valueNotCorrection).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        // Sem definição
        let countUndefined = row.data().count_undefined != null? row.data().count_undefined: 0;
        // Recorrente
        //let countRecurrent = row.data().count_recurrent != null? row.data().count_recurrent: 0;
    
        let table1 = `<table class="table table-bordered">
                        <thead class="table-dark">
                            <tr>
                                <th data-toggle="tooltip" data-placement="top" title="Qtd. de registros ainda não baixados, incluindo trilhões">Sem retorno <i class="fa fa-info-circle text-info" aria-hidden="true"></i></th>
                                <th colspan="2">Desconhecido (Trilhões)</th>
                            </tr>
                        </thead>
                        <tr>
                            <td><b>Qtd:</b> ${countUndefined}</td>
                            <td><b>Qtd.:</b> ${countTotalUnknown}</td>
                            <td><b>Valor:</b> ${valueTotalUnknown}</td>
                        </tr>
                    </table>`;
        let table2 = `<table class="table table-bordered">
                        <thead class="table-dark">
                            <tr>
                                <th colspan="2">Procede</th>
                                <th colspan="2" data-toggle="tooltip" data-placement="top" title="Qtd. de não procede + incorretos">Não procede <i class="fa fa-info-circle text-info" aria-hidden="true"></i></th>
                                <th colspan="2" data-toggle="tooltip" data-placement="top" title="Qtd. de não procede + incorretos + corrigidos">Corrigido <i class="fa fa-info-circle text-info" aria-hidden="true"></i></th>
                                <th colspan="2" data-toggle="tooltip" data-placement="top" title="Qtd. de não procede + incorretos + não corrigidos">Não corrigido <i class="fa fa-info-circle text-info" aria-hidden="true"></i></th>
                            </tr>
                        </thead>
                        <tr>
                            <td><b>Qtd.:</b><br>${countProceeds}</td>
                            <td><b>Valor:</b><br>${valueProceeds}</td>
                            <td><b>Qtd.:</b><br>${countNotProceeds}</td>
                            <td><b>Valor:</b><br>${valueNotProceeds}</td>
                            <td><b>Qtd.:</b><br>${countCorrection}</td>
                            <td><b>Valor:</b><br>${valueCorrection}</td>
                            <td><b>Qtd.:</b><br>${countNotCorrection}</td>
                            <td><b>Valor:</b><br>${valueNotCorrection}</td>
                        </tr>
                    </table>`;
        row.child( table1+table2 ).show();

        // Add to the 'open' array
        if ( idx === -1 ) {
            detailRows.push( tr.attr('id') );
        }
    }
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
} );

// On each draw, loop over the `detailRows` array and show any child rows
table.on( 'draw', function () {
    $.each( detailRows, function ( i, id ) {
        $('#'+id+' td.details-control').trigger( 'click' );
    } );
} );

$('#list tbody').on( 'click', '.get_lote', function (event) {
    event.preventDefault();
    let url = $(this).attr('data_url');
    let name = $(this).attr('data_name');
    let element = $(this);

    let title = 'O lote será enviado para seu email, tudo bem?';
    let msgLoading = 'Aguarde, enviando lote para seu email...';
    let msgOk = 'Poof! Em instante chegará na sua caixa de entrada.';
    feedsModalConfirm(title, name, url);
    $('#bt-modal-confirm').off("click");
    $('#bt-modal-confirm').on('click', async function (event) {
        await modalConfirmExecute(msgLoading, msgOk);
        // let data = await modalConfirmExecute(url);
        // if(data.status){
        //     table
        //         .row( element.parents('tr') )
        //         .remove()
        //         .draw();
        // }
    });

    // Swal.fire({
    //     icon: 'warning',
    //     title: "O lote será enviado para seu email, tudo bem?",
    //     text: name,
    //     showCancelButton: true,
    //     cancelButtonText: 'Não',
    //     confirmButtonText: 'Sim',
    //     confirmButtonColor: '#d33',
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //         loadingShow('Aguarde, enviando lote para seu email...');
    //         let type = 'success';
    //         let msg = 'Poof! Em instante chegará na sua caixa de entrada.';
    //         $.get( url, function( data ) {
    //             if(data.status == false){
    //                 type = 'error';
    //                 msg = 'Ops! Algo errado!';
    //             }
    //         }).fail(function() {
    //             type = 'error';
    //             msg = 'Error! Algo muito errado!';
    //         }).always(function() {
    //             loadingHide();
    //             Swal.fire(msg, '', type)
    //         });
    //     }
    //   })
});