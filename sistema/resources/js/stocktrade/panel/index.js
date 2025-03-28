$('.dt').mask('00/0000');
$(".dt").datepicker( {
    format: "mm/yyyy",
    autoclose: 'true',
	language: 'pt-BR',
    startView: "months", 
    minViewMode: "months"
});

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
    processing: true, // Habilita informação de carregando
    searching: true,
    ajax: {
        url: $('#route_list').val(),
        type: 'GET',
        data: function(data){ // Inputs que são enviados para requisição ajax
            data.type = $("#type").val();
            data.start_date = $("#start_date").val().split('/').reverse().join('-')+'-01';
            data.end_date = $("#end_date").val().split('/').reverse().join('-')+'-01';
        },
        //async: true,
        error: function (xhr, error, code) {
            $("#bt").prop('disabled', false).html('Visualizar');
            $("#bt-export").prop('disabled', false);
            $("#list_processing").hide();
            $("#list > tbody").html(`<tr class="odd"><td valign="top" colspan="7" class="dataTables_empty">Erro ao carregar, pesquise novamente!</td></tr>`);
        }
    },
    initComplete: function(settings, json) {// Tabela foi carregada por completo
        $("#bt").prop('disabled', false).html('Visualizar');
        $("#bt-export").prop('disabled', false);
    },
    order: [[ 5, "desc" ]],
    columns: [
        {   data: 'reference_date', width: "10%" },
        {   data: 'count_type', width: "12%" },
        {   data: 'type', width: "15%" },
        {   data: 'count_proceeds', width: "11%" },
        {   data: 'count_not_proceeds', width: "14%" },
        {   data: 'count_undefined', width: "14%" },
        {   data: 'count_total', width: "12%" },
        {   data: 'count_recurrent', width: "12%" }
    ],

} );


/**
 * Script somente em JQUERY
 */

 frmValidate(
	"#frm",
	{
		start_date: {
			required: true
		},
        end_date: {
			required: true
		}
	},
	{
		start_date: {
			required: "Informe, por favor!"
		},
        end_date: {
			required: "Informe, por favor!"
		}
	}
);

$("#bt").prop('disabled', true).html('Aguarde...');
$("#bt-export").prop('disabled', true);

$("#bt").on("click", function(){
    if($('#frm').valid()){
        $("#bt").prop('disabled', true).html('Aguarde...');
        $("#bt-export").prop('disabled', true);
        table.clear().draw();
        table.ajax.reload(function ( json ) {
            $("#bt").prop('disabled', false).html('Visualizar');
            $("#bt-export").prop('disabled', false);
        });
    }
});

$("#bt-export").on("click", function(){
    
    let route = $('#route_export').val();
    let type = $('#type').val();
    let startDate = $("#start_date").val().split('/').reverse().join('-')+'-01';
    let endDate = $('#end_date').val().split('/').reverse().join('-')+'-01';
    let url = `${route}?type=${type}&start_date=${startDate}&end_date=${endDate}`;

    let a = document.createElement("a");
    a.href = url;
    //a.target = '_blank';
    //a.setAttribute("download", fileName);
    a.click();
    a.remove();
});