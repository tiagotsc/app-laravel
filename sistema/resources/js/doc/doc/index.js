frmValidate(
	"#frm",
	{
		category_id: {
			required: true
		}
	},
	{
		category_id: {
			required: "Selecione, por favor!"
		}
	}
);

var table = $('#list').DataTable( {
	order: [[0, 'desc']],
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
    processing: true,
    ajax: $('#route_list').val(),
    initComplete: function(settings, json) {// Tabela foi carregada por completo
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });

        var column = table.column( 2 );
        var select = $('<select class="form-select"><option value="">Todas</option></select>')
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

        // this.api().column(2).every(function() { 
        //     var column = this;
        //     // Put the HTML of the <select /> filter along with any default options 
        //     var select = $('<select class="form-select"><option value="">Todas</option></select>')
        //       // remove all content from this column's header and 
        //       // append the above <select /> element HTML code into it 
        //       .prependTo($(column.header()))
        //       //.appendTo($(column.header()).empty())
        //       //.appendTo($("#list_filter.dataTables_filter"))
        //       // execute callback when an option is selected in our <select /> filter
        //       .on('change', function() {
        //         // escape special characters for DataTable to perform search
        //         var val = $.fn.dataTable.util.escapeRegex(
        //           $(this).val()
        //         );
        //         // Perform the search with the <select /> filter value and re-render the DataTable
        //         column
        //           .search(val ? '^' + val + '$' : '', true, false)
        //           .draw();
        //       });
        //     // fill the <select /> filter with unique values from the column's data
        //     column.data().unique().sort().each(function(d, j) {
        //       select.append("<option value='" + d + "'>" + d + "</option>")
        //     });
        // });
    },
    columns: [
        { data: 'id', width: "5%"},
        { 
            data: 'name', 
            width: "30%"/*,
            render: function ( data, type, row ) { 
                let url_download = $('#route_download').val().replace("*", row.id);
                return `<a href="${url_download}">${row.name}</a>`
            }*/
        },
        { data: 'category.name', width: "15%"},
		{ data: 'created_at', width: "15%"},
		{ data: 'user.name', width: "20%",
			render: function ( data, type, row ) { 
				let arrayName = row.user.name.split(' ');
				return `${arrayName[0]} ${arrayName[arrayName.length - 1]}`;
			}
		},
        { 
            data: 'id', 
            className: 'text-center',
            orderable: false,  
            width: "7%",
            render: function ( data, type, row ) { 
                let url_download = $('#route_download').val().replace("*", row.id);
                let url_destroy = $('#route_destroy').val().replace("*", row.id);
                let btnDestroy = `<a href="#" data-bs-toggle="modal" data-bs-target="#delete-register" class="destroy ms-2 text-danger" data_id="${row.id}" data_url="${url_destroy}" data_name="${row.name}"><i class="bi bi-trash fs-5"></i></a>`;
                return `<a href="${url_download}"><i class="bi bi-download fs-5"></i></a>
                        ${btnDestroy}`;

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

