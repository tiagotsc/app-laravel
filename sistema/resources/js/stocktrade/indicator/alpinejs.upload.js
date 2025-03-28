/**
 * 
 * Script em AlpineJS, mas mescla com alguns recursos do Jquery
 */

// function managerFrm(){
// 	return {
//         data: {
//             _token: document.head.querySelector('meta[name=csrf-token]').content,
//             _method: 'put'
//         }, // dados do formulário
//         loading: false, // Loading botão
//         buttonLabel: 'Enviar', // Texto botão
//         submitData(){
//             if($("#frm").valid()){

//                 let frm = new FormData();
//                 let file = $('#file')[0].files;
//                 frm.append('file',file[0]);
//                 frm.append('_token',document.head.querySelector('meta[name=csrf-token]').content);
 
//                 this.buttonLabel = 'Aguarde, enviando arquivo...'
//                 this.loading = true;
//                 fetch(document.getElementById("frm").action, { // Envia o arquivo e valida
//                     method: 'POST',
//                     body: frm
//                 })
//                 .then(response => response.json())
//                 .then((data) => { 
//                     if(data.status != true){ // Se algo errado ocorrer
//                         Swal.fire({
//                             icon: 'error',
//                             title: 'Algo errado!',
//                             text: 'O ID não localizado ou erro no upload do arquivo!'
//                         })
//                     }else{
//                         Swal.fire({
//                             title: `Deseja prosseguir com a baixa do ID ${data.indicator.id} - ${data.indicator.type}?`,
//                             icon: 'warning',
//                             showCancelButton: true,
//                             cancelButtonText: 'Cancelar',
//                             confirmButtonText: 'Sim',
//                             confirmButtonColor: '#3085d6',
//                             //cancelButtonColor: '#d33',
//                         }).then((result) => {
//                             /* Read more about isConfirmed, isDenied below */
//                             if (result.isConfirmed) {
//                                 this.uploadStore(data.indicator.id);
//                             }
//                         })
//                 }
//                 })
//                 .catch(() => {
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Error grave! Ao enviar arquivo!',
//                         text: 'Se persistir, fale com o administrador!'
//                     })
//                 }).finally(() => {
//                     this.loading = false;
//                     this.buttonLabel = 'Enviar';
//                     document.getElementById("file").value = '';
//                 })
//             }
//         },
//         uploadStore(id){ // Realiza baixa de fato do ID
//             let urlStore = document.getElementById("route_upload_store").value.replace("*", id);
//             loadingShow('Aguarde, baixando ID...');
//             fetch(urlStore, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(this.data)
//             })
//             .then(response => response.json())
//             .then((data) => { 
//                 if(data.status != true){ // Se algo errado ocorrer
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Algo errado!',
//                         text: 'Não foi possível realizar a baixa do ID.'
//                     })
//                 }else{
//                     Swal.fire({
//                         icon: 'success',
//                         title: 'Muito bom!',
//                         text: `${data.affected_registers} de ${data.total_registers} registros foram baixados com sucesso!`,
//                         footer: `<ul class="list-unstyled">
//                                     <li><b>Detalhamento da baixa ID ${data.indicator.id} - ${data.indicator.type}:</b></li>
//                                     <li><b>Total CPFs:</b> ${data.indicator.count_total}</li>
//                                     <li><b>Total CPFs procede:</b> ${data.indicator.count_proceeds}</li>
//                                     <li><b>Total CPFs não procede:</b> ${data.indicator.count_not_proceeds}</li>
//                                     <li><b>Total CPFs sem definição:</b> ${data.indicator.count_undefined}</li>
//                                 </ul>`
//                     })
//                 }
//             })
//             .catch(() => {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error grave! Ao baixar ID!',
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
        modalConfirm: new bootstrap.Modal(document.getElementById('modal-confirm-indicator')),
        data: {
            _token: document.head.querySelector('meta[name=csrf-token]').content,
            _method: 'put'
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
        },
        submitData(){
            if($("#frm").valid()){
                this.showBtsConfirm();
                let frm = new FormData();
                let file = $('#file')[0].files;
                frm.append('file',file[0]);
                frm.append('_token',document.head.querySelector('meta[name=csrf-token]').content);
 
                this.buttonLabel = 'Aguarde, enviando arquivo...'
                this.loading = true;
                fetch(document.getElementById("frm").action, { // Envia o arquivo e valida
                    method: 'POST',
                    body: frm
                })
                .then(response => response.json())
                .then((data) => { 
                    if(data.status != true){ // Se algo errado ocorrer
                        this.setModalStatus('Algo errado!','O ID não localizado ou erro no upload do arquivo!');
                        this.modalStatus.show();
                    }else{
                        document.getElementById("modal-confirm-indicator-desc").innerText = `Com a baixa do ID ${data.indicator.id} - ${data.indicator.type}`;
                        this.modalConfirm.show();
                        this.data.id = data.indicator.id;
                        // Swal.fire({
                        //     title: `Deseja prosseguir com a baixa do ID ${data.indicator.id} - ${data.indicator.type}?`,
                        //     icon: 'warning',
                        //     showCancelButton: true,
                        //     cancelButtonText: 'Cancelar',
                        //     confirmButtonText: 'Sim',
                        //     confirmButtonColor: '#3085d6',
                        //     //cancelButtonColor: '#d33',
                        // }).then((result) => {
                        //     /* Read more about isConfirmed, isDenied below */
                        //     if (result.isConfirmed) {
                        //         this.uploadStore(data.indicator.id);
                        //     }
                        // })
                }
                })
                .catch(() => {
                    this.setModalStatus('Error grave! Ao enviar arquivo!','Se persistir, fale com o administrador!');
                    this.modalStatus.show();
                }).finally(() => {
                    this.loading = false;
                    this.buttonLabel = 'Enviar';
                    document.getElementById("file").value = '';
                })
            }
        },
        btCloseConfirm(){
            // document.getElementById("modal-confirm-indicator-desc").innerText = '';
            // document.getElementById("return-confirm").innerHTML = "";
        }, // Exibe botões da modal confirm
        showBtsConfirm(){
            document.getElementById("confirmIndicatorModalLabel").hidden = false;
            document.getElementById("bt-close-confirm-indicator").hidden = false;
            document.getElementById("confirm-down-indicator").hidden = false;
            document.getElementById("modal-confirm-indicator-desc").innerText = '';
            document.getElementById("return-confirm").innerHTML = "";
        },
        loadingConfirm(){
            document.getElementById("confirmIndicatorModalLabel").hidden = true;
            document.getElementById("bt-close-confirm-indicator").hidden = true;
            document.getElementById("confirm-down-indicator").hidden = true;
            document.getElementById("modal-confirm-indicator-desc").innerText = 'Aguarde, baixando ID...';
        },
        uploadStore(){ // Realiza baixa de fato do ID
            let urlStore = document.getElementById("route_upload_store").value.replace("*", this.data.id);
            // loadingShow('Aguarde, baixando ID...');
            this.loadingConfirm();
            fetch(urlStore, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.data)
            })
            .then(response => response.json())
            .then((data) => { 
                if(data.status != true){ // Se algo errado ocorrer
                    this.setModalStatus('Algo errado!','Não foi possível realizar a baixa do ID.');
                    this.modalStatus.show();
                }else{
                    let title = `Muito bom! ${data.affected_registers} de ${data.total_registers} registros foram baixados com sucesso!`;
                    let desc = `<ul class="list-unstyled">
                                    <li><b>Detalhamento da baixa ID ${data.indicator.id} - ${data.indicator.type}:</b></li>
                                    <li><b>Total CPFs:</b> ${data.indicator.count_total}</li>
                                    <li><b>Total CPFs procede:</b> ${data.indicator.count_proceeds}</li>
                                    <li><b>Total CPFs não procede:</b> ${data.indicator.count_not_proceeds}</li>
                                    <li><b>Total CPFs sem definição:</b> ${data.indicator.count_undefined}</li>
                                </ul>`;
                    document.getElementById("modal-confirm-indicator-desc").innerText = title;
                    document.getElementById("return-confirm").innerHTML = desc;

                    // Swal.fire({
                    //     icon: 'success',
                    //     title: 'Muito bom!',
                    //     text: `${data.affected_registers} de ${data.total_registers} registros foram baixados com sucesso!`,
                    //     footer: `<ul class="list-unstyled">
                    //                 <li><b>Detalhamento da baixa ID ${data.indicator.id} - ${data.indicator.type}:</b></li>
                    //                 <li><b>Total CPFs:</b> ${data.indicator.count_total}</li>
                    //                 <li><b>Total CPFs procede:</b> ${data.indicator.count_proceeds}</li>
                    //                 <li><b>Total CPFs não procede:</b> ${data.indicator.count_not_proceeds}</li>
                    //                 <li><b>Total CPFs sem definição:</b> ${data.indicator.count_undefined}</li>
                    //             </ul>`
                    // })
                }
            })
            .catch(() => {
                this.setModalStatus('Error grave! Ao baixar ID!','Se persistir, fale com o administrador!');
                this.modalStatus.show();
            }).finally(() => {
                // loadingHide();
                document.getElementById("bt-close-confirm-indicator").hidden = false;
            })
        }

    }));

});