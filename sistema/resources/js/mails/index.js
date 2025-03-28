var table = $('#list').DataTable({
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
    order: [[1, "desc"]],
    columns: [
        {
            class: "details-control",
            orderable: false,
            data: null,
            defaultContent: ""
        },
        {
            data: 'id', width: "6%"
        },
        {
            data: 'system', width: "12%",
            render: function ( data, type, row ) { 
                let content = row.system.replace('_',' ');
                return content.charAt(0).toUpperCase()+content.slice(1);
            }
        },
        {
            data: 'initials'//, width: "30%"
        },
        {
            data: 'mail_title',// width: "50%"
        },
        {
            data: 'status', width: "5%",
            render: function ( data, type, row ) { 
                return (row.status !='A')? 'Inativo': 'Ativo';
            }
        },
        {
            data: 'id',
            className: 'text-center',
            orderable: false,
            width: "5%",
            render: function (data, type, row) {
                let url_edit = $('#route_edit').val().replace("*", row.id);
                return `<a href="${url_edit}"><i class="bi bi-pencil-square fs-5"></i></a>`;
            }
        }
    ],

});

var detailRows = [];

$('#list tbody').on( 'click', 'tr td.details-control', function () {
    var tr = $(this).closest('tr');
    var row = table.row(tr);
    var idx = $.inArray(tr.attr('id'), detailRows);

    if (row.child.isShown()) {
        tr.removeClass('details');
        row.child.hide();

        // Remove from the 'open' array
        detailRows.splice(idx, 1);
    }
    else {
        tr.addClass('details');

        let datas = [];
        datas.push(row.data().path_script != null && row.data().path_script != ''? `<font face="Calibri"><b class="text-secondary">Caminho do script: </font><span class="text-info font-monospace">${row.data().path_script}</span></b></br>`: '');
        datas.push(`<font face="Calibri"><b class="text-secondary">Descrição: </b></font><span class="font-monospace"> ${row.data().description}</span>`);
        row.child(datas.join('')).show();

        // Add to the 'open' array
        if (idx === -1) {
            detailRows.push(tr.attr('id'));
        }
    }
} );

// On each draw, loop over the `detailRows` array and show any child rows
table.on('draw', function () {
    $.each(detailRows, function (i, id) {
        $('#' + id + ' td.details-control').trigger('click');
    });
});
