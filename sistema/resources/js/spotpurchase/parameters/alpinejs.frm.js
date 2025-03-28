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
//                 this.data.minimum_value = document.getElementById('minimum_value').value;
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
            this.data.minimum_value = '';
            this.data.order_qtd_column = '';
            this.data.order_detail_qtd_column = '';
            this.data.supplier_qtd_column = '';
            this.data.month_recurrence = '';

            document.getElementById("minimum_value").value = '';
            document.getElementById("order_qtd_column").value = '';
            document.getElementById("order_detail_qtd_column").value = '';
            document.getElementById("supplier_qtd_column").value = '';
            document.getElementById("month_recurrence").value = '';
        },
        setModalStatus(title, msg){
            document.getElementById("title-modal-status").innerText = title;
            document.getElementById("desc-status-modal").innerText=msg;
        },
        submitData(){
            if($("#frm").valid()){
                this.buttonLabel = 'Aguarde...'
                this.loading = true;
                this.data.minimum_value = document.getElementById('minimum_value').value;
                this.data.order_qtd_column = document.getElementById("order_qtd_column").value;
                this.data.order_detail_qtd_column = document.getElementById("order_detail_qtd_column").value;
                this.data.supplier_qtd_column = document.getElementById("supplier_qtd_column").value;
                this.data.month_recurrence = document.getElementById("month_recurrence").value;
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