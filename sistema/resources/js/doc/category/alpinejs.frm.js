/**
 * 
 * Script em AlpineJS, mas mescla com alguns recursos do Jquery
 */

// function managerFrm(){
// 	return {
//         data: {}, // dados do formulário
//         loading: false, // Loading botão
//         buttonLabel: 'Salvar', // Texto botão
//         loadData(){ // carrega dados tela
//             if(document.getElementById('register_id').value == ''){
//                 return;
//             }
//             this.buttonLabel = 'Aguarde...'
//             this.loading = true;
//             fetch(document.getElementById("route_list").value)
//                 .then(res => res.json())
//                 .then(res => {
//                     this.data = res;
//                     this.data.status = res.status.substr(0, 1);
//             })
//             .finally(() => {
//                 this.loading = false;
//                 this.buttonLabel = 'Salvar'
//             })
//         },
//         submitData(){
//             if($("#frm").valid()){
//                 this.buttonLabel = 'Aguarde...'
//                 this.loading = true;
                
//                 let _method = document.querySelector('input[name="_method"]') !== null ? document.querySelector('input[name="_method"]').value: '';
//                 this.data._method = _method;
//                 this.data._token = document.head.querySelector('meta[name=csrf-token]').content;

//                 fetch(document.getElementById("frm").action, {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(this.data)
//                 })
//                 .then((response) => { 
//                     if(response.ok != true){ // Se algo errado ocorrer
//                         swal("Algo errado!", "Se persistir, fale com o administrador!", "error");
//                     }
//                     response.json().then(data => {
//                         swal('Muito bom!', 'Salvo com sucesso!', 'success')
//                         .then(() => {
//                             if (data.redirect != undefined) { // Se foi cadastrado, redireciona para tela de edição
//                                 window.location.href = data.redirect;
//                             }
//                         });
//                     })
//                 })
//                 .catch(() => {
//                     swal("Error grave!", "Se persistir, fale com o administrador!", "error");
//                 }).finally(() => {
//                     this.loading = false;
//                     this.buttonLabel = 'Salvar'
//                 })
        
//             }
//         }
//     }
// }

/**
 * No padrão do AlpineJS CSP
 */
document.addEventListener('alpine:init', () => {
    
    Alpine.data('managerFrm', () => {
        return {
            data: {}, // dados do formulário
            loading: false, // Loading botão
            buttonLabel: 'Salvar', // Texto botão
            loadData(){ // carrega dados tela
                if(document.getElementById('register_id').value == ''){
                    return;
                }
                this.buttonLabel = 'Aguarde...'
                this.loading = true;
                fetch(document.getElementById("route_list").value)
                    .then(res => res.json())
                    .then(res => {
                        if(Boolean(res.id)){
                            document.getElementById("name").value = res.name;
                            document.getElementById("status").value = res.status.substr(0, 1);
                        }
                })
                .finally(() => {
                    this.loading = false;
                    this.buttonLabel = 'Salvar'
                })
            },
            submitData(){
                if($("#frm").valid()){
                    this.buttonLabel = 'Aguarde...'
                    this.loading = true;
                    
                    let _method = document.querySelector('input[name="_method"]') !== null ? document.querySelector('input[name="_method"]').value: '';
                    this.data._method = _method;
                    this.data._token = document.head.querySelector('meta[name=csrf-token]').content;
                    this.data.name = document.getElementById("name").value;
                    this.data.status = document.getElementById("status").value;

                    fetch(document.getElementById("frm").action, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(this.data)
                    })
                    .then((response) => { 
                        if(response.ok != true){ // Se algo errado ocorrer
                            modalStatus('Algo errado!','Se persistir, fale com o administrador!');
                        }
                        response.json().then(data => {
                            modalStatus('Muito bom!','Salvo com sucesso!');
                            if (data.redirect != undefined) { // Se foi cadastrado, redireciona para tela de edição
                                window.location.href = data.redirect;
                            }
                        })
                    })
                    .catch(() => {
                        modalStatus("Error grave!","Se persistir, fale com o administrador!");
                    }).finally(() => {
                        let modalStatus = new bootstrap.Modal(document.getElementById('modal-status'));
                        modalStatus.show();
                        this.loading = false;
                        this.buttonLabel = 'Salvar';
                    })
            
                }
            }
        }
    })
});