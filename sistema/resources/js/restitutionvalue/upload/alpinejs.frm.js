/**
 * 
 * Script em AlpineJS, mas mescla com alguns recursos do Jquery
 */

// function managerFrm(){
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
//                         Swal.fire('Muito bom!', 'Em breve você receberá o lote por email!', 'success');                        
//                     } else {
//                         Swal.fire("Algo errado!", "Se persistir, fale com o administrador!", "error");
//                     }
//                     document.getElementById('progress-bar').style.width = '0%';
//                     document.getElementById('progress-bar').innerHTML = '0%';

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
            _method: 'post'
        }, // dados do formulário
        loading: false, // Loading botão
        buttonLabel: 'Enviar', // Texto botão
        setModalStatus(title, msg){
            document.getElementById("title-modal-status").innerText = title;
            document.getElementById("desc-status-modal").innerText=msg;
        },
        loadData(){
            // Valida anexo
            let inputFileSelected = document.querySelector('#file')
            inputFileSelected.addEventListener('change', (event) => {
                $('#frm').valid()
            });
        },
        submitData(){
            if($("#frm").valid()){

                let thisAlpineJS = this; // Armazena a instância do AlpineJS
                let frm = new FormData();
                let file = $('#file')[0].files;
                frm.append('file',file[0]);
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
                        thisAlpineJS.setModalStatus('Muito bom!','Em breve você receberá o lote por email!');                   
                    } else {
                        thisAlpineJS.setModalStatus('Algo errado!','Se persistir, fale com o administrador!');
                    }
                    thisAlpineJS.modalStatus.show(); 
                    document.getElementById('progress-bar').style.width = '0%';
                    document.getElementById('progress-bar').innerHTML = '0%';

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
        }

    }));

});
