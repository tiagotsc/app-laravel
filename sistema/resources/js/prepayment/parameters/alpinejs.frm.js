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
//         loading: false, // Loading botão
//         buttonLabel: 'Gravar', // Texto botão
//         submitData(){
//             if($("#frm").valid()){
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
        loading: false, // Loading botão
        buttonLabel: 'Gravar', // Texto botão
        cleanFields(){
            this.data.historical_time = '';
            this.data.archiving_time = '';
            this.data.value_unknown = '';
            this.data.strange_value = '';
            this.data.minimum_value = '';

            document.getElementById("historical_time").value = '';
            document.getElementById("archiving_time").value = '';
            document.getElementById("value_unknown").value = '';
            document.getElementById("strange_value").value = '';
            document.getElementById("minimum_value").value = '';
        },
        setModalStatus(title, msg){
            document.getElementById("title-modal-status").innerText = title;
            document.getElementById("desc-status-modal").innerText=msg;
        },
        submitData(){
            if($("#frm").valid()){
                this.buttonLabel = 'Aguarde...'
                this.loading = true;
                this.data.historical_time = document.getElementById("historical_time").value;
                this.data.archiving_time = document.getElementById("archiving_time").value;
                this.data.value_unknown = document.getElementById("value_unknown").value;
                this.data.strange_value = document.getElementById("strange_value").value;
                this.data.minimum_value = document.getElementById("minimum_value").value;
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
                    table.clear().draw();
                    table.ajax.reload();
                    this.cleanFields();
                    this.modalStatus.show();
                })
            }
        }

    }));

});
