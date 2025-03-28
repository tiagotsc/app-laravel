frmValidate(
	"#frm",
	{
		username: {
			required: true
		},
		name: {
			required: true
		},
		email: {
			required: true
		},
		password: {
			required: {
				depends: function(){
					var status = false;
					if($("input[name='_method']").length == 0 && $("input[name='_method']").val() != 'PUT'){ // Se tela cadastro, obriga preenchimento senha
						var status = true;
					}
					return status;
				}
			},
			minlength: 8
		},
        confirm_password: {
            required:{
				depends: function(element){
					var status = false;
					if( $("#password").val() != ''){
						var status = true;
					}
					return status;
				}
			},
            equalTo: "#password"
        }
	},
	{
		username: {
			required: "Informe, por favor!"
		},
		name: {
			required: "Informe, por favor!"
		},
		email: {
			required: "Informe, por favor!",
			email: "Informe um email válido, por favor!"
		},
		password: {
			required: "Informe, por favor!",
			minlength: "Mínimo de 8 caracteres"
		},
		confirm_password: {
			required: "Informe, por favor!",
            equalTo: "Repita a mesma senha, por favor!"
        }
	}
);

//var myForm = document.getElementById('frm');
//formData = new FormData(frm);
//formData.delete('_token');

//console.log(JSON.stringify(formData));
//for(let [name, value] of formData) {
    //console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
 // }

/*$("#save").on("click", function(){ 
	if($("#frm").valid()){
		$(this).prop('disabled', true).html('Aguarde...');
*/
        /* MODO 1
        let data = {
            username: $('#username').val(),
            name: $('#name').val(),
            email: $('#email').val(),
            active: $('#active').val(),
            password: $('#password').val(),
            _method: 'PUT'
        }

        $.post( $("#frm").attr('action'), data, function( data ) {
            $("#save").prop('disabled', false).html('Salvar');
            alert(data.status);
        },'json');
        */
/*
        let formData = new FormData(frm);
		
        $.ajax({
            type: 'POST',
            url: $("#frm").attr('action'),
			data: formData,
			processData: false,
			contentType: false,
            dataType: "json",
            success: function (data) {
				let type = 'error';
				let title = 'Ops! Algo errado!';
				let description = 'Erro ao salvar!';
				
				// Retorno true = alterado com sucesso (controller::update) | returno length > 0 = cadastrado com sucesso (controller::store)
				if(data.status == true || Object.keys(data.status).length >= 0){ // OR
					type = 'success';
					title = 'Muito  bom!';
					description = 'Salvo com sucesso!';
				}
				swal(title, description, type)
				.then(() => {
					if (data.redirect != undefined) { // Se foi cadastrado, redireciona para tela de edição
						$(location).attr('href',data.redirect);
					}
				});
				$('#password,#confirm_password').val(''); // Limpa campos de senha
                $("#save").prop('disabled', false).html('Salvar');
             },
             error: function (data, textStatus, errorThrown) {
				swal("Error grave!", "Se persistir, fale com o administrador!", "error");
                $("#save").prop('disabled', false).html('Salvar');
             },
        });

	}
});
*/