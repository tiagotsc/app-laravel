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
    columns: [
        
        { data: 'name', width: "50%"},
        { data: 'roles', width: "30%"},
        { 
            data: 'id', 
            className: 'text-center',
            orderable: false,  
            width: "20%",
            render: function ( data, type, row ) { 
                if ( type === 'display' ) {
                    let url_edit = $('#route_edit').val().replace("*", row.id);
                    let url_destroy = $('#route_destroy').val().replace("*", row.id);
                    let btnDestroy = `<a href="#" data-bs-toggle="modal" data-bs-target="#delete-register" class="destroy ms-2 text-danger" data_id="${row.id}" data_url="${url_destroy}" data_name="${row.name}"><i class="bi bi-trash fs-5"></i></a>`;
                    if(row.roles){ // Se ter perfil associado, oculta botão excluir
                        btnDestroy = '';
                    }
                    return `<a href="${url_edit}"><i class="bi bi-pencil-square fs-5"></i></a>
                            ${btnDestroy}`;
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
    // swal({
    //     title: "Deseja apagar o registro?",
    //     text: nameDelete,
    //     icon: "warning",
    //     buttons: true,
    //     dangerMode: true,
    //     buttons: ["Cancelar", "OK"]
    //   })
    //   .then((willDelete) => {
    //     if (willDelete) {
        
    //       $.post( urlDelete, { _method: "DELETE", _token: $('meta[name="csrf-token"]').attr('content') }, function( data ) {
    //             let type = 'success';
    //             let msg = 'Poof! Registro deletado!';
    //             if(data.status == false){
    //                 type = 'error';
    //                 msg = 'Ops! Algo errado!';
    //             }else{
    //                 table
    //                 .row( element.parents('tr') )
    //                 .remove()
    //                 .draw();
    //             }
    //             swal(msg, {
    //                 icon: type,
    //             });
    //       }).fail(function() {
    //             swal("Error! Algo muito errado!", {
    //                 icon: "error",
    //             });
    //         });
    //     }
    //   });
});

