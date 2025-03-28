/**
 * Configura o csrf token em todo o sistema
 */
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

// /**
//  * Habilite o tooptip do boostrap em todo o sistema
//  */
// $(function () {
//     $('[data-toggle="tooltip"]').tooltip()
// })

/**
 * Encapsula a chamada do jquery validate
 * @param {*} frmId Id do formulário
 * @param {*} rules Campos que serão validados
 * @param {*} messages Mensagens dos campos
 */
function frmValidate(frmId, rules, messages){
	$(frmId).validate({
		debug: false,
		errorClass: 'error',
		errorElement: 'p',
		onfocusout: false,
		invalidHandler: function(form, validator) { // Foca o elemento
			var errors = validator.numberOfInvalids();
			if (errors) {                    
				validator.errorList[0].element.focus();
			}
		},
		errorPlacement: function(error, element) {
		element.parents('.form-group').append(error);
		var msg = $(element).next('.help-block').text();
		$(element).attr('aria-label', msg );
		},
		highlight: function(element, errorClass){
		$(element)
		.attr('aria-invalid', true)
		.parents('.form-group')
		.addClass('has-error');
		},
		unhighlight: function(element, errorClass){
		$(element).removeAttr('aria-invalid')
		.removeAttr('aria-label')
		.parents('.form-group').removeClass('has-error');
		},
		rules: rules,
		messages: messages
	});
}

/**
 * Retorna somente a coluna de um array dimensional
 * Exemplo de uso arrayColumn(twoDimensionalArray, 'conteudo-posicao')
 */
const arrayColumn = (arr, n) => arr.map(x => x[n]);

/**
 * Remove determinado posição do array se baseando no valor
 * @param {*} arr Array que será verificado
 * @param {*} value Valor que será removido do array
 * @returns Retorno o array sem o conteúdo informado
 */
function arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

/**
 * Exibe loading
 * @param {*} msg 
 */
function loadingShow(msg) {

    if (msg === undefined) {
        msg = 'Aguarde...';
    }

    $.blockUI({
        message: '<b style="font-size: 20px">' + msg + '</b>',
        css: { /* CSS da mensagem */
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff',
            'z-index': 999999999999999999
        },
        overlayCSS: { /* Css da mascara */
            'z-index': 999999999999999999
        }
    });
}

/**
 * Remove loading
 */
function loadingHide() {
    $.unblockUI();
}

/**
 * Converte o valor para real BR
 * @param {*} value Valor fornecido para conversão
 * @returns valor convertido
 */
function moneyBRjs(value) {
    if(value == null){
        return '';
    }
	return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).toString();
}

/**
 * Formata número para real (Dinheiro)
 * @param {*} number Número que deseja formatar
 * @param {*} decimals Quantas casas decimais terá o número
 * @param {*} dec_point Simbolo utilizado na casa decimal
 * @param {*} thousands_sep Simbolo utilizado na casa de milhar
 * @returns 
 */
function number_format(number, decimals, dec_point, thousands_sep) {
    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

/**
 * Modal delete - Alimenta modal responsável por exibir o que vai ser excluído
 * e executar a exclusão, caso click em confirmar
 * @param {*} registerName Nome do registro que será apagado
 * @param {*} deleteURL URL que será chamada para excluir o registro
 */
function feedsDeleteRegister(registerName, deleteURL){
    document.getElementById("msg-modal-delete").innerText = '';
    document.getElementById("bt1-close-modal-delete").hidden = false;
    document.getElementById("bt2-close-modal-delete").hidden = false;
    document.getElementById("modal-bt-delete-register").hidden = false;
    document.getElementById("modal-label-bt-delete").innerText = "Excluir";
    document.getElementById('delete_register_name').innerText = registerName;
    document.getElementById('delete_register_url').value = deleteURL;
}

/**
 * Modal delete - Deleta o registro de fato
 * @returns o status e mensagem de retorno
 */
async function modalDeleteExecute(urlDelete){
    document.getElementById("bt1-close-modal-delete").hidden = true;
    document.getElementById("bt2-close-modal-delete").hidden = true;
    document.getElementById("modal-label-bt-delete").innerText = "Aguarde...";
    return await $.post( urlDelete, { _method: "DELETE", _token: $('meta[name="csrf-token"]').attr('content') }, function( data ) {
        let msg = 'Poof! Registro deletado!';
        if(data.status == false){
            msg = 'Ops! Algo errado!';
        }else{
            document.getElementById("modal-bt-delete-register").hidden = true;
        }
        document.getElementById("msg-modal-delete").innerText = msg;
        document.getElementById("bt1-close-modal-delete").hidden = false;
        document.getElementById("bt2-close-modal-delete").hidden = false;
        document.getElementById("modal-label-bt-delete").innerText = "Excluir";
       return {status: data.status, msg: msg};
    }).fail(function() {
        document.getElementById("msg-modal-delete").innerText = "Error! Algo muito errado!";
        document.getElementById("bt1-close-modal-delete").hidden = false;
        document.getElementById("bt2-close-modal-delete").hidden = false;
        document.getElementById("modal-label-bt-delete").innerText = "Excluir";
        return {status: false, msg: 'Error! Algo muito errado!'};
    });
}

/**
 * Alimenta a modal de status
 * que dá o feedback sobre o processamento
 * @param {*} title Título
 * @param {*} msg Mensagem
 */
function modalStatus(title, msg){
    document.getElementById("title-modal-status").innerText = title;
    document.getElementById("desc-status-modal").innerText=msg;
}

/**
 * Modal confirm - Alimenta modal responsável por executar algo
 * @param {*} title Título que a modal receberá
 * @param {*} registerName Nome de algo que será requisitado
 * @param {*} url URL que será chamada para fazer algo
 */
function feedsModalConfirm(title, registerName, url){
    document.getElementById("confirm-modal-title").innerText = title;
    document.getElementById("bt-close-modal-confirm").hidden = false;
    document.getElementById("bt-modal-confirm").hidden = false;
    document.getElementById("bt-modal-confirm").innerText = "Sim";
    document.getElementById('return-modal-confirm').innerHTML = '';
    document.getElementById('modal-confirm-desc').innerText = registerName;
    document.getElementById('modal_confirm_url').value = url;
}

/**
 * Modal confirm - Executa de fato o que está sendo solicitado
 * @param {*} url URL que será chamada para fazer algo
 * @param {*} msgLoading Mensagem exibida no momento que está em execução
 * @param {*} mskOk Mensagem de retorno para tudo estando ok
 * 
 * @returns o status e mensagem de retorno
 */
async function modalConfirmExecute(msgLoading, msg){
    document.getElementById("bt-close-modal-confirm").hidden = true;
    document.getElementById("bt-modal-confirm").hidden = true;
    document.getElementById('return-modal-confirm').innerHTML = msgLoading;
    let url = document.getElementById('modal_confirm_url').value;
    let status = {};
    return await $.get( url, function( data ) {
        if(data.status == false){
            type = 'error';
            msg = 'Ops! Algo errado!';
        }
        status = {status: data.status, msg: msg};
    }).fail(function() {
        status = {status: false, msg: 'Error! Algo muito errado!'};
    }).always(function() {
        document.getElementById("return-modal-confirm").innerHTML = msg;
        document.getElementById("bt-close-modal-confirm").hidden = false;
        return status;
    });
}