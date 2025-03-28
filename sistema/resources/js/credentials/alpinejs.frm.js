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
//         buttonLabel: 'Alterar credencial', // Texto botão
//         getCredencial(){

//             if(this.data.identification == ''){
//                 this.data.username = '';
//                 this.data.password = '';
//                 return;
//             }

//             this.loading = true;
//             this.buttonLabel = 'Carregando credencial...'
//             fetch($('#route_get').val().replace("_", this.data.identification), {
//                 method: 'GET',
//                 headers: {
//                 'Content-Type': 'application/json',
//                 }
//             }).then((response) => { 
//                 if(response.ok != true){ // Se algo errado ocorrer
//                     swal("Algo errado ao carregar dados!", "Se persistir, fale com o administrador!", "error");
//                 }
//                 response.json().then(d => {
//                     this.data.username = d.username;
//                     this.data.password = d.password;
//                 })
//             })
//             .catch(() => {
//                 swal("Error ao carregar dados!", "Se persistir, fale com o administrador!", "error");
//             }).finally(() => {
//                 this.loading = false;
//                 this.buttonLabel = 'Alterar credencial';
//                 $('.error').hide();
//             })
//         },
//         submitData(){
//             if($("#frm").valid()){
//                 swal({
//                     title: `Deseja alterar a credencial?`,
//                     icon: "warning",
//                     buttons: true,
//                     dangerMode: true,
//                     buttons: ["Cancelar", "OK"]
//                   })
//                   .then((confirm) => {
//                     if (confirm) {
                    
//                         this.buttonLabel = 'Aguarde...'
//                         this.loading = true;
     
//                         fetch(document.getElementById("frm").action.replace("_", this.data.identification), {
//                             method: 'POST',
//                             headers: {
//                             'Content-Type': 'application/json',
//                             },
//                             body: JSON.stringify(this.data)
//                         }).then((response) => { 
//                             if(response.ok != true){ // Se algo errado ocorrer
//                                 swal("Algo errado!", "Se persistir, fale com o administrador!", "error");
//                             }
//                             response.json().then(data => {
//                                 swal('Muito bom!', 'Alterado com sucesso!', 'success');
//                             })
//                         })
//                         .catch(() => {
//                             swal("Error grave!", "Se persistir, fale com o administrador!", "error");
//                         }).finally(() => {
//                             this.loading = false;
//                             this.buttonLabel = 'Alterar credencial';
//                             table.clear().draw();
// 			                table.ajax.reload();
//                             this.data.identification = '';
//                             this.data.username = '';
//                             this.data.password = '';
//                         })
                
//                     }
//                   });

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
        buttonLabel: 'Alterar credencial', // Texto botão
        modalConfirm: new bootstrap.Modal(document.getElementById('confirmCredencial')), // Modal confirm
        loadData(){ // carrega dados tela
            // Input select
            let inputSelected = document.querySelector('#identification')
            inputSelected.addEventListener('change', (event) => {
                this.getCredencial()
            });
        },
        getCredencial(){

            let identification = document.getElementById("identification").value;
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            if(identification == ''){
                username = '';
                password = '';
                return;
            }

            this.loading = true;
            this.buttonLabel = 'Carregando credencial...'
            fetch($('#route_get').val().replace("_", identification), {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                }
            }).then((response) => { 
                if(response.ok != true){ // Se algo errado ocorrer
                    swal("Algo errado ao carregar dados!", "Se persistir, fale com o administrador!", "error");
                }
                response.json().then(d => {
                    // username = d.username;
                    // password = d.password;
                    document.getElementById("username").value = d.username;
                    document.getElementById("password").value = d.password;
                })
            })
            .catch(() => {
                swal("Error ao carregar dados!", "Se persistir, fale com o administrador!", "error");
            }).finally(() => {
                this.loading = false;
                this.buttonLabel = 'Alterar credencial';
                $('.error').hide();
            })
        },
        confirmApply(){
            if($("#frm").valid()){
                let identification = document.getElementById("identification").value;
                document.getElementById("credencial-name").innerText = identification;
                this.modalConfirm.show();
            }
        },
        setModalStatus(title, msg){
            document.getElementById("title-modal-status").innerText = title;
            document.getElementById("desc-status-modal").innerText=msg;
        },
        submitData(){
            if($("#frm").valid()){
                
                this.buttonLabel = 'Aguarde...'
                this.loading = true;

                let identification = document.getElementById("identification").value;
                let username = document.getElementById("username").value;
                let password = document.getElementById("password").value;

                this.data.username = username;
                this.data.password = password;

                this.modalConfirm.hide();
                fetch(document.getElementById("frm").action.replace("_", identification), {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.data)
                }).then((response) => { 
                    if(response.ok != true){ // Se algo errado ocorrer
                        // swal("Algo errado!", "Se persistir, fale com o administrador!", "error");
                        this.setModalStatus('Algo errado!','Se persistir, fale com o administrador!');
                    }
                    response.json().then(data => {
                        // swal('Muito bom!', 'Alterado com sucesso!', 'success');
                        this.setModalStatus('Muito bom!','Alterado com sucesso!');
                    })
                    
                })
                .catch(() => {
                    // swal("Error grave!", "Se persistir, fale com o administrador!", "error");
                    this.setModalStatus('Error grave!','Se persistir, fale com o administrador!');
                }).finally(() => {
                    this.loading = false;
                    this.buttonLabel = 'Alterar credencial';

                    // Criado para recarregar o initComplete no reload
                    function tooltip(){ 
                        $(function () {
                         $('[data-toggle="tooltip"]').tooltip()
                        });
                    }
                    initComplete:tooltip 

                    table.clear().draw();
                    table.ajax.reload(tooltip);
                    
                    document.getElementById("identification").value = '';
                    document.getElementById("username").value = '';
                    document.getElementById("password").value = '';

                    let modalStatus = new bootstrap.Modal(document.getElementById('modal-status'));
                        modalStatus.show();
                    
                })

                // swal({
                //     title: `Deseja alterar a credencial?`,
                //     icon: "warning",
                //     buttons: true,
                //     dangerMode: true,
                //     buttons: ["Cancelar", "OK"]
                //   })
                //   .then((confirm) => {
                //     if (confirm) {
                    
                //         this.buttonLabel = 'Aguarde...'
                //         this.loading = true;

                //         let identification = document.getElementById("identification").value;
                //         let username = document.getElementById("username").value;
                //         let password = document.getElementById("password").value;

                //         this.data.username = username;
                //         this.data.password = password;
     
                //         fetch(document.getElementById("frm").action.replace("_", identification), {
                //             method: 'POST',
                //             headers: {
                //             'Content-Type': 'application/json',
                //             },
                //             body: JSON.stringify(this.data)
                //         }).then((response) => { 
                //             if(response.ok != true){ // Se algo errado ocorrer
                //                 swal("Algo errado!", "Se persistir, fale com o administrador!", "error");
                //             }
                //             response.json().then(data => {
                //                 swal('Muito bom!', 'Alterado com sucesso!', 'success');
                //             })
                //         })
                //         .catch(() => {
                //             swal("Error grave!", "Se persistir, fale com o administrador!", "error");
                //         }).finally(() => {
                //             this.loading = false;
                //             this.buttonLabel = 'Alterar credencial';
                //             table.clear().draw();
			    //             table.ajax.reload();
                //             document.getElementById("identification").value = '';
                //             document.getElementById("username").value = '';
                //             document.getElementById("password").value = '';
                //         })
                
                //     }
                //   });

            }
        }
    }));

});