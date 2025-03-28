/**
 * 
 * Script em AlpineJS, mas mescla com alguns recursos do Jquery
 */

//  function managerFrm(){
// 	return {
//         data: {
//             _token: document.head.querySelector('meta[name=csrf-token]').content,
//             _method: 'post'
//         }, // dados do formulário
//         loading: false, // Loading botão
//         buttonLabel: 'Enviar', // Texto botão
//         submitData(){
//             if($("#frm").valid()){

//                 let thisAlpineJS = this; // Armazena a instância do AlpineJS
//                 let frm = new FormData();
//                 let file = $('#file')[0].files;
//                 frm.append('file',file[0]);
//                 frm.append('moment_session', document.getElementById('moment_session').value)
//                 frm.append('_token',document.head.querySelector('meta[name=csrf-token]').content);
 
//                 this.buttonLabel = 'Aguarde, enviando arquivo...'
//                 this.loading = true;

//                 // Instância classe de requisição
//                 let xhr = new XMLHttpRequest();
//                 // Define retorno como JSON
//                 xhr.responseType = 'json';
//                 // Define como será tratado o retorno
//                 xhr.onload = function() { 
//                     if (xhr.status === 200) {
//                         let data = xhr.response; // Pega retorno
//                         Swal.fire({
//                             title: `Deseja baixar ${data.count_registers} registros em ${data.count_batchs} lotes?`,
//                             icon: 'warning',
//                             showCancelButton: true,
//                             cancelButtonText: 'Cancelar',
//                             confirmButtonText: 'Sim',
//                             confirmButtonColor: '#3085d6',
//                             //cancelButtonColor: '#d33',
//                         }).then((result) => {
//                             /* Read more about isConfirmed, isDenied below */
//                             if (result.isConfirmed) {
//                                 thisAlpineJS.uploadStore(document.getElementById('moment_session').value);
//                             }else{
//                                 document.getElementById('progress-bar').style.width = '0%';
//                                 document.getElementById('progress-bar').innerHTML = '0%';
//                             }
//                         })
//                     } else {
//                         Swal.fire("Algo errado!", "Se persistir, fale com o administrador!", "error");
//                     }

//                     // document.getElementById("save").disabled = false;
//                     // document.getElementById("save").innerHTML = 'Enviar';
//                     // document.getElementById("file").value = '';
//                     thisAlpineJS.loading = false;
//                     thisAlpineJS.buttonLabel = 'Enviar';
//                     document.getElementById("file").value = '';
//                 };

//                 // Fica observando o envio de arquivo e calculando a porcentagem de envio
//                 xhr.upload.onprogress = function(event) {
//                     let progress = Math.round((event.loaded / event.total) * 100);
//                     document.getElementById('progress-bar').style.width = progress+'%';
//                     document.getElementById('progress-bar').innerHTML = progress+'%';
//                 };

//                 // Define qual o tipo de método de requisição e qual URL
//                 xhr.open("POST", document.getElementById("frm").action);
//                 // Faz a requisição ajax
//                 xhr.send(frm);

//                 // fetch(document.getElementById("frm").action, { // Envia o arquivo e valida
//                 //     method: 'POST',
//                 //     body: frm
//                 // })
//                 // .then(response => response.json())
//                 // .then((data) => { 
//                 //     if(data.status != true){ // Se algo errado ocorrer
//                 //         Swal.fire({
//                 //             icon: 'error',
//                 //             title: 'Algo errado!',
//                 //             text: 'Erro no upload do arquivo!'
//                 //         })
//                 //     }else{
//                 //         Swal.fire({
//                 //             title: `Deseja baixar ${data.count_registers} registros em ${data.count_batchs} lotes?`,
//                 //             icon: 'warning',
//                 //             showCancelButton: true,
//                 //             cancelButtonText: 'Cancelar',
//                 //             confirmButtonText: 'Sim',
//                 //             confirmButtonColor: '#3085d6',
//                 //             //cancelButtonColor: '#d33',
//                 //         }).then((result) => {
//                 //             /* Read more about isConfirmed, isDenied below */
//                 //             if (result.isConfirmed) {
//                 //                 this.uploadStore(document.getElementById('moment_session').value);
//                 //             }
//                 //         })
//                 // }
//                 // })
//                 // .catch(() => {
//                 //     Swal.fire({
//                 //         icon: 'error',
//                 //         title: 'Error grave! Ao enviar arquivo!',
//                 //         text: 'Se persistir, fale com o administrador!'
//                 //     })
//                 // }).finally(() => {
//                 //     this.loading = false;
//                 //     this.buttonLabel = 'Enviar';
//                 //     document.getElementById("file").value = '';
//                 // })
//             }
//         },
//         uploadStore(momentSession){ // Realiza baixa de fato usando o registro de momento da sessão
//             let urlStore = document.getElementById("route_upload_store").value.replace("*", momentSession);
//             loadingShow('Aguarde, preparando a baixa...');
//             fetch(urlStore, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     _token: document.head.querySelector('meta[name=csrf-token]').content,
//                     _method: 'put'
//                 })
//             })
//             .then(response => response.json())
//             .then((data) => { 
//                 if(data.status != true){ // Se algo errado ocorrer
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Algo errado!',
//                         text: 'Não foi possível realizar a baixa dos lotes.'
//                     })
//                 }else{
//                     Swal.fire({
//                         icon: 'success',
//                         title: 'Baixa em andamento!',
//                         text: `Assim que terminar avisaremos por e-mail.`,
//                     //     footer: `<ul class="list-unstyled">
//                     //                 <li><b>Detalhamento da baixa ID ${data.indicator.id} - ${data.indicator.type}:</b></li>
//                     //                 <li><b>Total CPFs:</b> ${data.indicator.count_total}</li>
//                     //                 <li><b>Total CPFs procede:</b> ${data.indicator.count_proceeds}</li>
//                     //                 <li><b>Total CPFs não procede:</b> ${data.indicator.count_not_proceeds}</li>
//                     //                 <li><b>Total CPFs sem definição:</b> ${data.indicator.count_undefined}</li>
//                     //             </ul>`
//                     })
//                     document.getElementById('progress-bar').style.width = '0%';
//                     document.getElementById('progress-bar').innerHTML = '0%';
//                 }
//             })
//             .catch(() => {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error grave! Ao baixar lotes!',
//                     text: 'Se persistir, fale com o administrador!'
//                 })
//             }).finally(() => {
//                 loadingHide();
//             })
//         }
//     }
// }


/**
 * No padrão do AlpineJS CSP
 */
document.addEventListener('alpine:init', () => {
    
    Alpine.data("managerFrm", () => ({
        modalStatus: new bootstrap.Modal(document.getElementById('modal-status')),
        modalConfirmLow: new bootstrap.Modal(document.getElementById('modal-confirm-low')),
        data: {
            _token: document.head.querySelector('meta[name=csrf-token]').content,
            _method: 'post'
        }, // dados do formulário
        loading: false, // Loading botão
        buttonLabel: 'Enviar', // Texto botão
        loadData(){
            // Valida anexo
            let inputFileSelected = document.querySelector('#file')
            inputFileSelected.addEventListener('change', (event) => {
                $('#frm').valid()
            });
        },
        setModalStatus(title, msg){
            document.getElementById("title-modal-status").innerText = title;
            document.getElementById("desc-status-modal").innerText=msg;
        },// Define mensagem da modal confirm
        setMsgModalConfirm(title = '', msg = '', details = ''){
            document.getElementById("confirmLowModalLabel").innerText = title;
            document.getElementById("modal-confirm-low-desc").innerText = msg;
            document.getElementById("return-confirm-low").innerHTML = details;
        }, // Oculta botões da modal confirm
        hideBtsConfirm(){
            document.getElementById("bt-close-confirm-low").hidden = true;
            document.getElementById("confirm-low").hidden = true;
        }, // Exibe botões da modal confirm
        showBtsConfirm(){
            document.getElementById("bt-close-confirm-low").hidden = false;
            document.getElementById("confirm-low").hidden = false;
        }, // Ação do botão fechar da modal confirm
        btCloseConfirm(){
            document.getElementById('progress-bar').style.width = '0%';
            document.getElementById('progress-bar').innerHTML = '0%';
        },
        submitData(){
            if($("#frm").valid()){
                this.showBtsConfirm(); // Habilita exibição botões do modal da tela de confirmação
                let thisAlpineJS = this; // Armazena a instância do AlpineJS
                let frm = new FormData();
                let file = $('#file')[0].files;
                frm.append('file',file[0]);
                frm.append('moment_session', document.getElementById('moment_session').value)
                frm.append('_token',document.head.querySelector('meta[name=csrf-token]').content);
 
                this.buttonLabel = 'Aguarde, enviando arquivo...'
                this.loading = true;

                // Instância classe de requisição
                let xhr = new XMLHttpRequest();
                // Define retorno como JSON
                xhr.responseType = 'json';
                // Define como será tratado o retorno
                xhr.onload = function() { 
                    if (xhr.status === 200) {
                        let data = xhr.response; // Pega retorno
                        thisAlpineJS.setMsgModalConfirm('Deseja baixar?',`${data.count_registers} registros em ${data.count_batchs} lotes`);
                        thisAlpineJS.modalConfirmLow.show();
        
                    } else {
                        thisAlpineJS.setModalStatus('Algo errado!','Se persistir, fale com o administrador!');
                        thisAlpineJS.modalStatus.show();
                    }

                    thisAlpineJS.loading = false;
                    thisAlpineJS.buttonLabel = 'Enviar';
                    document.getElementById("file").value = '';
                };

                // Fica observando o envio de arquivo e calculando a porcentagem de envio
                xhr.upload.onprogress = function(event) {
                    let progress = Math.round((event.loaded / event.total) * 100);
                    document.getElementById('progress-bar').style.width = progress+'%';
                    document.getElementById('progress-bar').innerHTML = progress+'%';
                };

                // Define qual o tipo de método de requisição e qual URL
                xhr.open("POST", document.getElementById("frm").action);
                // Faz a requisição ajax
                xhr.send(frm);
            }
        },
        uploadStore(){ // Realiza baixa de fato usando o registro de momento da sessão
            momentSession = document.getElementById('moment_session').value;
            let urlStore = document.getElementById("route_upload_store").value.replace("*", momentSession);
            this.hideBtsConfirm();
            this.setMsgModalConfirm('','','Aguarde, preparando a baixa...');
            fetch(urlStore, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    _token: document.head.querySelector('meta[name=csrf-token]').content,
                    _method: 'put'
                })
            })
            .then(response => response.json())
            .then((data) => { 
                if(data.status != true){ // Se algo errado ocorrer
                    this.setMsgModalConfirm('Algo errado!','Não foi possível realizar a baixa dos lotes.','');
                }else{
                    this.setMsgModalConfirm('Baixa em andamento!','Assim que terminar avisaremos por e-mail.','');
                }
            })
            .catch(() => {
                this.setMsgModalConfirm('Error grave! Ao baixar lotes!','Se persistir, fale com o administrador!','');
            }).finally(() => {
                // Modal confirm - exibe botão de apenas fechar modal
                document.getElementById("bt-close-confirm-low").hidden = false;
            })
        }

    }));

});