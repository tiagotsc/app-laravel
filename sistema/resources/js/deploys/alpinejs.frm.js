/**
 * 
 * Script em AlpineJS, mas mescla com alguns recursos do Jquery
 */

// function managerFrm(){
// 	return {
//         data: {
//             _token: document.head.querySelector('meta[name=csrf-token]').content
//         }, // dados do formulário
//         loading: false, // Loading botão
//         buttonLabel: 'Agendar deploy', // Texto botão
//         submitData(){
//             if($("#frm").valid()){

//                 let enveronment = document.getElementById("enveroment").value;
//                 let repository = this.data.repository;
//                 swal({
//                     title: `Deseja agendar o deploy para o ambiente ${enveronment}?`,
//                     text: `Repositório: ${repository}`,
//                     icon: "warning",
//                     buttons: true,
//                     dangerMode: true,
//                     buttons: ["Cancelar", "OK"]
//                   })
//                   .then((confirm) => {
//                     if (confirm) {
                    
//                         this.buttonLabel = 'Aguarde...'
//                         this.loading = true;
                
//                         fetch(document.getElementById("frm").action, {
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
//                                 swal('Muito bom!', 'Salvo com sucesso!', 'success')
//                                 .then(() => {
//                                     if (data.redirect != undefined) { // Se foi cadastrado, redireciona para tela de edição
//                                         window.location.href = data.redirect;
//                                     }
//                                 });
//                             })
//                         })
//                         .catch(() => {
//                             swal("Error grave!", "Se persistir, fale com o administrador!", "error");
//                         }).finally(() => {
//                             this.loading = false;
//                             this.buttonLabel = 'Agendar deploy';
//                             table.clear().draw();
// 			                table.ajax.reload();
//                             document.getElementById("repository").value = '';
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
        modalStatus: new bootstrap.Modal(document.getElementById('modal-status')),
        modalConfirm: new bootstrap.Modal(document.getElementById('modal-confirm')),
        data: {
            _token: document.head.querySelector('meta[name=csrf-token]').content
        }, // dados do formulário
        loading: false, // Loading botão
        buttonLabel: 'Agendar deploy', // Texto botão
        setModalStatus(title, msg){
            document.getElementById("title-modal-status").innerText = title;
            document.getElementById("desc-status-modal").innerText=msg;
        },
        save() {
            this.modalConfirm.hide();
            this.buttonLabel = 'Aguarde...'
            this.loading = true;

            this.data.repository = document.getElementById("repository").value;
    
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
                    this.setModalStatus('Muito bom!','Salvo com sucesso!');
                })
            })
            .catch(() => {
                this.setModalStatus('Error grave!','Se persistir, fale com o administrador!');
            }).finally(() => {
                this.loading = false;
                this.buttonLabel = 'Agendar deploy';
                this.modalStatus.show();
                table.clear().draw();
                table.ajax.reload();
                document.getElementById("repository").value = '';
            })
        },
        submitData(){
            if($("#frm").valid()){

                let enveronment = document.getElementById("enveroment").value;
                let repository = document.getElementById("repository").value;

                document.getElementById("env").innerText = enveronment;
                document.getElementById("repo").innerText = repository;
                this.modalConfirm.show();
                // swal({
                //     title: `Deseja agendar o deploy para o ambiente ${enveronment}?`,
                //     text: `Repositório: ${repository}`,
                //     icon: "warning",
                //     buttons: true,
                //     dangerMode: true,
                //     buttons: ["Cancelar", "OK"]
                //   })
                //   .then((confirm) => {
                //     if (confirm) {
                    
                //         this.buttonLabel = 'Aguarde...'
                //         this.loading = true;
                
                //         fetch(document.getElementById("frm").action, {
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
                //                 swal('Muito bom!', 'Salvo com sucesso!', 'success')
                //                 .then(() => {
                //                     if (data.redirect != undefined) { // Se foi cadastrado, redireciona para tela de edição
                //                         window.location.href = data.redirect;
                //                     }
                //                 });
                //             })
                //         })
                //         .catch(() => {
                //             swal("Error grave!", "Se persistir, fale com o administrador!", "error");
                //         }).finally(() => {
                //             this.loading = false;
                //             this.buttonLabel = 'Agendar deploy';
                //             table.clear().draw();
			    //             table.ajax.reload();
                //             document.getElementById("repository").value = '';
                //         })
                
                //     }
                //   });

            }
        }

    }));

});
