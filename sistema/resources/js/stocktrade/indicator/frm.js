moment.locale('pt-BR');

//$('#value_shares').maskMoney();
calendar();

$('#reference_date').mask('00/0000');
$("#reference_date").datepicker( {
    format: "mm/yyyy",
    autoclose: 'true',
	language: 'pt-BR',
    startView: "months", 
    minViewMode: "months"
});

function calendar(input = ''){

	input = input != ''? input: '.date_calendar'; 
	// mascara
	$(input).mask('00/00/0000');
	$(input).datepicker({
		format: 'dd/mm/yyyy',
		autoclose: 'true',
		language: 'pt-BR',
		weekStart: 0,
		//startDate:'0d',
		startDate: new Date(new Date().setDate(new Date().getDate() - 240)), /* Data mínima de 240 dias para cá */
		endDate: new Date(new Date().setDate(new Date().getDate() + 60)), /* Data máxima de até 60 dias para frente */
		todayHighlight: true
	}).on('changeDate', function(valor) {
		//let dataFull = valor.date.getDate()+'/'+valor.date.getMonth()+'/'+valor.date.getFullYear();
		//alert($(this).val());

		// Compara datas
		if($('#start_date').val().length == 10 && $('#end_date').val().length == 10){
			let start = $("#start_date").datepicker('getDate');
			let end = $("#end_date").datepicker('getDate');
			if(end < start){
				alert('Data fim é menor!');
				$('#end_date').val('').focus();
			}
		}

		calculateDate();

	});
}

// Faz a cálculo da data
function calculateDate(){

	if($('#type').val() == 'fato_relevante' && $('#end_date').val().length == 10 && $('#number_days').val() != ''){
		let days = -parseInt($('#number_days').val());
		let startDt = moment($('#end_date').val(), "DD/MM/YYYY").add(days, "days").format('DD/MM/YYYY');
		$('#start_date').val(startDt);
	}else if($('#type').val() == 'fato_relevante'){
		$('#start_date').val('');
	}

	$('#number_days,#start_date,#end_date').valid(); // valida campo
}


//$('#end_date').datepicker('remove');
//$('#end_date').datepicker('destroy');

frmValidate(
	"#frm",
	{
		type: {
			required: true
		},
		reference_date: {
			required: true
		},
		minimum_quantity: {
			required: true
		},
		number_days: {
			required: {
				depends: function(){
					var status = false;
					if($("#type").val() == 'fato_relevante'){ // Se for fato relevante, campo é obrigatório
						var status = true;
					}
					return status;
				}
			},
			min: 1
		},
		check_days: {
			required: {
				depends: function(){
					var status = false;
					if($("#type").val() == 'encarteiramento'){ // Se for fato relevante, campo é obrigatório
						var status = true;
					}
					return status;
				}
			},
			min: 0
		},
		start_date: {
			required: true
		},
		end_date: {
			required: true
		},
        name: {
            required:{
				depends: function(element){
					var status = false;
					if($("#type").val() == 'fato_relevante'){ // Se for fato relevante, campo é obrigatório
						var status = true;
					}
					return status;
				}
			}
        }
	},
	{
		type: {
			required: "Selecione, por favor!"
		},
		reference_date: {
			required: "Informe, por favor!"
		},
		minimum_quantity: {
			required: "Informe, por favor!"
		},
		number_days: {
			required: "Informe, por favor!",
			min: "Número precisa ser superior a zero!"
		},
		check_days: {
			required: "Informe, por favor!",
			min: "Informe zero ou superior!"
		},
		start_date: {
			required: "Informe, por favor!"
		},
		end_date: {
			required: "Informe, por favor!"
		},
		name: {
			required: "Informe, por favor!"
        }
	}
);