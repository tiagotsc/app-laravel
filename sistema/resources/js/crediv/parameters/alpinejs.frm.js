/**
 * 
 * Script em AlpineJS, mas mescla com alguns recursos do Jquery
 */
// function managerFrm(){
// 	return {
//         data: {
//             _token: document.head.querySelector('meta[name=csrf-token]').content,
//             _method: document.querySelector('input[name="_method"]') !== null ? document.querySelector('input[name="_method"]').value: ''
//         }, // dados do formulário
//         scenarios: ['BENEFICIO_PROPRIO','BENEFICIO_PARENTE','BENEFICIO_COLABORADOR','DUPLICIDADE','RECORRENCIA','QTD_PARCELAS','VALOR_ALTO'],
//         services: ['ICREDIV','CREDIVC'],
//         prefixes: ['ATACADO','CORPORATIVO'],
//         loading: false, // Loading botão
//         buttonLabel: 'Gravar', // Texto botão
//         submitData(){
//             if($("#frm").valid()){
//                 this.data.minimum_value = document.getElementById('minimum_value').value;
//                 this.data.higher_value = document.getElementById('higher_value').value;
//                 this.data.scenarios_without_value = $("#scenarios_without_value").val().join(",");
//                 this.data.only_services = $("#only_services").val().join(",");
//                 this.data.prefix_outside = $("#prefix_outside").val().join(",");
//                 this.buttonLabel = 'Aguarde...'
//                 this.loading = true;
//                 fetch(document.getElementById("frm").action, {
//                     method: 'POST',
//                     headers: {
//                     'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(this.data)
//                 }).then((response) => { 
//                     if(response.ok != true){ // Se algo errado ocorrer
//                         swal("Erro no retorno!", "Se persistir, fale com o administrador!", "error");
//                     }
//                     response.json().then(data => {
//                         if(data.status){
//                             swal('Muito bom!', 'Configuração aplicada com sucesso!', 'success');
//                         }else{
//                             swal("Error no processamento!", "Se persistir, fale com o administrador!", "error");
//                         }
//                     })
//                 })
//                 .catch(() => {
//                     swal("Error grave!", "Se persistir, fale com o administrador!", "error");
//                 }).finally(() => {
//                     this.loading = false;
//                     this.buttonLabel = 'Gravar';
//                     this.data = {};
//                     $('#scenarios_without_value,#only_services,#prefix_outside').val(null).trigger("change");
//                     table.clear().draw();
//                     table.ajax.reload();
//                 })
//             }
//         }
//     }
// }

/**
 * No padrão do AlpineJS CSP
 */
document.addEventListener('alpine:init', () => {
    
    Alpine.data("managerFrm", () => ({
        modalStatus: new bootstrap.Modal(document.getElementById('modal-status')),
        data: {
            _token: document.head.querySelector('meta[name=csrf-token]').content,
            _method: document.querySelector('input[name="_method"]') !== null ? document.querySelector('input[name="_method"]').value: ''
        }, // dados do formulário
        scenarios: ['BENEFICIO_PROPRIO','BENEFICIO_PARENTE','BENEFICIO_COLABORADOR','DUPLICIDADE','RECORRENCIA','QTD_PARCELAS','VALOR_ALTO'],
        services: ['ICREDIV','CREDIVC'],
        prefixes: ['ATACADO','CORPORATIVO'],
        loading: false, // Loading botão
        buttonLabel: 'Gravar', // Texto botão
        cleanFields(){
            this.data.day_delete_old_raw_files = '';
            this.data.year_delete_old_zipped_files = '';
            this.data.minimum_value = '';
            this.data.scenarios_without_value = '';
            this.data.only_services = '';
            this.data.month_recurrence = '';
            this.data.upper_portion = '';
            this.data.higher_value = '';
            this.data.prefix_outside = '';
            this.data.year_maintain_batches = '';

            document.getElementById("day_delete_old_raw_files").value = '';
            document.getElementById("year_delete_old_zipped_files").value = '';
            document.getElementById("minimum_value").value = '';
            document.getElementById("scenarios_without_value").value = '';
            document.getElementById("only_services").value = '';
            document.getElementById("month_recurrence").value = '';
            document.getElementById("upper_portion").value = '';
            document.getElementById("higher_value").value = '';
            document.getElementById("prefix_outside").value = '';
            document.getElementById("year_maintain_batches").value = '';
        },
        setModalStatus(title, msg){
            document.getElementById("title-modal-status").innerText = title;
            document.getElementById("desc-status-modal").innerText=msg;
        },
        submitData(){
            if($("#frm").valid()){

                this.data.day_delete_old_raw_files = document.getElementById('day_delete_old_raw_files').value;
                this.data.year_delete_old_zipped_files = document.getElementById('year_delete_old_zipped_files').value;
                this.data.minimum_value = document.getElementById('minimum_value').value;
                this.data.scenarios_without_value = $("#scenarios_without_value").val().join(",");
                this.data.only_services = $("#only_services").val().join(",");
                this.data.month_recurrence = document.getElementById('month_recurrence').value;
                this.data.upper_portion = document.getElementById('upper_portion').value;
                this.data.higher_value = document.getElementById('higher_value').value;
                this.data.prefix_outside = $("#prefix_outside").val().join(",");
                this.data.year_maintain_batches = document.getElementById('year_maintain_batches').value;
                this.buttonLabel = 'Aguarde...'
                this.loading = true;
                fetch(document.getElementById("frm").action, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.data)
                }).then((response) => { 
                    if(response.ok != true){ // Se algo errado ocorrer
                        this.setModalStatus('Algo errado!','Se persistir, fale com o administrador!');
                    }
                    response.json().then(data => {
                        if(data.status){
                            this.setModalStatus('Muito bom!','Configuração aplicada com sucesso!');
                        }else{
                            this.setModalStatus('Error no processamento!','Se persistir, fale com o administrador!');
                        }
                    })
                })
                .catch(() => {
                    this.setModalStatus('Error grave!','Se persistir, fale com o administrador!');
                }).finally(() => {
                    this.loading = false;
                    this.buttonLabel = 'Gravar';
                    this.data = {};
                    // Define os inputs select2 como nulos
                    $('#scenarios_without_value,#only_services,#prefix_outside').val(null).trigger("change");
                    // Oculta o alerta vermelho de preenchimento dos inputs select2
                    $('p.error').hide();
                    table.clear().draw();
                    table.ajax.reload();
                    this.cleanFields();
                    this.modalStatus.show();
                })
            }
        }

    }));

});