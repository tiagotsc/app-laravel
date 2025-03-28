$('.dt').mask('00/0000');
$(".dt").datepicker( {
    format: "mm/yyyy",
    autoclose: 'true',
	language: 'pt-BR',
    startView: "months", 
    minViewMode: "months"
});

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