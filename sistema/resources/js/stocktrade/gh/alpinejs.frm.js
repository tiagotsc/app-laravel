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
//         buttonLabel: 'Adicionar', // Texto botão
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
//                         swal("Algo errado!", "Se persistir, fale com o administrador!", "error");
//                     }
//                     response.json().then(data => {
//                         swal('Muito bom!', 'Adicionado com sucesso!', 'success');
//                     })
//                 })
//                 .catch(() => {
//                     swal("Error grave!", "Se persistir, fale com o administrador!", "error");
//                 }).finally(() => {
//                     this.loading = false;
//                     this.buttonLabel = 'Adicionar';
//                     table.clear().draw();
//                     table.ajax.reload();
//                     this.data.gh = '';
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
	
        data: {
            _token: document.head.querySelector('meta[name=csrf-token]').content,
            _method: document.querySelector('input[name="_method"]') !== null ? document.querySelector('input[name="_method"]').value: ''
        }, // dados do formulário
        loading: false, // Loading botão
        buttonLabel: 'Adicionar', // Texto botão
        submitData(){
            if($("#frm").valid()){
                this.buttonLabel = 'Aguarde...'
                this.loading = true;
                this.data.gh = document.getElementById("gh").value;
                fetch(document.getElementById("frm").action, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.data)
                }).then((response) => { 
                    if(response.ok != true){ // Se algo errado ocorrer
                        modalStatus('Algo errado!','Se persistir, fale com o administrador!');
                    }
                    response.json().then(data => {
                        modalStatus('Muito bom!','Adicionado com sucesso!');
                    })
                })
                .catch(() => {
                    modalStatus('Error grave!', 'Se persistir, fale com o administrador!"');
                }).finally(() => {
                    this.loading = false;
                    this.buttonLabel = 'Adicionar';
                    table.clear().draw();
                    table.ajax.reload();
                    this.data.gh = '';
                    document.getElementById("gh").value = "";
                    let modalStatus = new bootstrap.Modal(document.getElementById('modal-status'));
                        modalStatus.show();
                })
            }
        }

    }));

});