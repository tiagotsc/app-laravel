/**
 * Script somente em JQUERY
 */

frmValidate( // Valida frm
	"#frm",
	{
		name: {
			required: true
		}
	},
	{
		name: {
			required: "Informe, por favor!"
		}
	}
);