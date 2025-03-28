
$('#initials').on('keyup', function(){
    const str = 'ÁÉÍÓÚáéíóúâêîôûàèìòùÇç';
    $(this).val($(this).val().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(' ', '_').toLowerCase());
});

frmValidate(
	"#frm",
	{
		initials: {
			required: true
		},
		name: {
			required: true
		},
		system: {
			required: true
		},
		description: {
			required: true
		},
		mail_title: {
			required: true
		},
		mail_message: {
			required: true
		}
	},
	{
		initials: {
			required: "Informe, por favor!"
		},
		name: {
			required: "Informe, por favor!"
		},
		system: {
			required: "Selecione, por favor!"
		},
		description: {
			required: "Informe, por favor!"
		},
		mail_title: {
			required: "Informe, por favor!"
		},
		mail_message: {
			required: "Informe, por favor!"
		}
	}
);

$(function() {
    $('#user_id').select2({ placeholder: "Preencha..." });
    // $( "#user_id" ).rules( "add", { // Adiciona validação, após a carga da combo
    //     required: true,
    //     messages: {
    //         required: "Selecione, por favor"
    //     }
    // });
	// $('#user_id').on("change", function (e) {
	// 	$(this).valid();
	// });
});