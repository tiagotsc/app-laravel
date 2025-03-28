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
        "order": [[ 1, "desc" ]],
        columns: [
            { data: 'gh', width: "50%"},
            { 
                data: 'user_name', width: "30%"
            },
            { data: 'created_at', orderable: false, width: "30%"},
            { 
                data: 'id', 
                className: 'text-center',
                orderable: false,  
                width: "20%",
                render: function ( data, type, row ) { 
                    if ( type === 'display' ) {
                        let url_destroy = $('#route_destroy').val().replace("*", row.id);
                        let btnDestroy = `<a href="#" data-bs-toggle="modal" data-bs-target="#delete-register" class="destroy ms-2 text-danger" data_id="${row.id}" data_url="${url_destroy}" data_name="${row.gh}"><i class="bi bi-trash fs-5"></i></a>`;
                        return btnDestroy;
                    }
                    return data;
                }
            }
        ],
    
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
    
    
    /**
     * Script somente em JQUERY
     */
    
     frmValidate(
        "#frm",
        {
            gh: {
                required: true
            }
        },
        {
            gh: {
                required: "Informe, por favor!"
            }
        }
    );
    
    $('#gh').mask('0#');
    
    /**Recarrega a tabela de tempos em tempos */
    /*setInterval(function(){ 
        table.clear().draw();
        table.ajax.reload();
    }, 60000);*/ /**Recarrega a cada 1 minuto */
    