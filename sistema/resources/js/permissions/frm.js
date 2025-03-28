/**
 * Script somente em JQUERY
 */

frmValidate(
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

