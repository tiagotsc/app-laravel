$('.dt').mask('00/0000');
$('.div_dates').hide();

$(".dt").datepicker( {
    format: "mm/yyyy",
    autoclose: 'true',
	language: 'pt-BR',
    startView: "months", 
    minViewMode: "months",
    startDate: new Date(new Date().setDate(new Date().getDate() - 365)), /* Data mínima de dias para cá */
    endDate: new Date(new Date().setDate(new Date().getDate() + 60)), /* Data máxima de dias para frente */
});

$("#type").on("change", function(){
    if($(this).val() == 'CORRENTE'){
        $('.div_dates').hide();
        $('.dt').val('');
    }else{
        $('.div_dates').show();
    }
});

var table = $('#list').DataTable( {
    dom: 'Bfrtip',
    buttons: [
        {
            extend: 'csv', // Define botão de gerar excel
            text: 'Exportar tabela', // Nomeia o botão
            filename: 'base_investidores', // Define o nome do arquivo que será exportado
            fieldSeparator: ';',
            fieldBoundary: '',
            charset: 'UTF-8',
            bom: true,
            /*exportOptions: {
                columns: [1,2,3,4,5,6],
                modifier: {
                    selected: null
                }
            }*/
        },
    ],
    responsive: true,
    pageLength: 100,
    autoWidth: true,
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
            $("#bt").prop('disabled', false).html('Listar');
            $("#bt-export").prop('disabled', false);
            $("#list_processing").hide();
            $("#list > tbody").html(`<tr class="odd"><td valign="top" colspan="6" class="dataTables_empty">Erro ao carregar, pesquise novamente!</td></tr>`);
        }
    },
    initComplete: function(settings, json) {// Tabela foi carregada por completo
        $("#bt").prop('disabled', false).html('Listar');
        $("#bt-export").prop('disabled', false);
    },
    order: [[ 1, "asc" ]],
    columns: [
        {   data: 'cpf'/*, width: "15%" */},
        {   data: 'nome' /*defaultContent: '',
            render: function ( data, type, row ) { 
                let arrayName = row.nome.split(' ');
                return `${arrayName[0]} ${arrayName[arrayName.length - 1]}`;
            }*/
        },
        {   data: 'cargo_parentesco'/*, width: "25%" */},
        {   data: 'dependente'/*, width: "25%" */},
        {   data: 'cpf_responsavel'/*, width: "15%" */},
        /*{ defaultContent: '',
            render: function ( data, type, row ) { 
                if (row.responsible != null){
                    let arrayName = row.responsible.nome.split(' ');
                    return `${arrayName[0]} ${arrayName[arrayName.length - 1]}`;
                }
                //return data;
            }
        },*/
    ],

} );


/**
 * Script somente em JQUERY
 */

 frmValidate(
	"#frm",
	{
        start_date: {
            required:{
				depends: function(element){
					var status = false;
					if($("#type").val() != 'CORRENTE'){ // Se diferente de base corrente, então é obrigatório
						var status = true;
					}
					return status;
				}
			}
        },
        end_date: {
            required:{
				depends: function(element){
					var status = false;
					if($("#type").val() != 'CORRENTE'){ // Se diferente de base corrente, então é obrigatório
						var status = true;
					}
					return status;
				}
			}
        },
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
            $("#bt").prop('disabled', false).html('Listar');
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