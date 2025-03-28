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
//         validateFileHeader(inputID, label, countColumnsHeader){
//                 const input = document.getElementById(inputID);
//                 const reader = new FileReader();
//                 reader.onload = function (e) {
//                     const content = e.target.result;
//                     // const rowData = content.split('\n');
//                     // const allLines = content.split(/\r\n|\n/);
//                     const rowData = content.split('\r');
//                     const columns = rowData[0].split(';');
//                     // Se última coluna estiver vazia, remove ela
//                     if(columns[columns.length-1].trim() == ''){
//                         columns.pop();
//                     }
//                     if(columns.length != countColumnsHeader){
//                         Swal.fire("Oops! Layout "+label+"!", "Layout precisa ter "+countColumnsHeader+" colunas.", "error");
//                         input.value = '';
//                         input.focus();
//                     }
//                     $('#frm').valid();
//                 };
//                 reader.readAsText(input.files[0],'ISO-8859-1');
//         },
//         submitData(){
//             if($("#frm").valid()){

//                 let thisAlpineJS = this; // Armazena a instância do AlpineJS
//                 const order = document.querySelector("#order").files[0];
//                 const orderDetail = document.querySelector("#order_detail").files[0];
//                 const supplier = document.querySelector("#supplier").files[0];

//                 const frm = new FormData();
//                 frm.append('order',order);
//                 frm.append('order_detail', orderDetail);
//                 frm.append('supplier',supplier);
//                 frm.append('_token',document.head.querySelector('meta[name=csrf-token]').content);

//                 this.buttonLabel = 'Aguarde, enviando arquivo...'
//                 this.loading = true;

//                 // Instância classe de requisição
//                 let xhr = new XMLHttpRequest();
//                 // Define retorno como JSON
//                 xhr.responseType = 'json';
//                 // Define como será tratado o retorno
//                 xhr.onload = function() { 
//                     if (xhr.status === 200 && xhr.readyState == 4) {
//                         Swal.fire('Muito bom!', 'Em breve você receberá o email sobre o processamento!', 'success');                        
//                     } else {
//                         Swal.fire("Algo errado!", "Se persistir, fale com o administrador!", "error");
//                     }
//                     // console.log(this.response);
//                     document.getElementById('progress-bar').style.width = '0%';
//                     document.getElementById('progress-bar').innerHTML = '0%';

//                     thisAlpineJS.loading = false;
//                     thisAlpineJS.buttonLabel = 'Enviar';
//                     document.getElementById("order").value = '';
//                     document.getElementById("order_detail").value = '';
//                     document.getElementById("supplier").value = '';
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
            let inputFileOrder = document.querySelector('#order')
            inputFileOrder.addEventListener('change', (event) => {
                let qtdColumn = event.target.getAttribute('column');
                this.validateFileHeader('order', 'Pedido', qtdColumn);
            });

            let inputFileOrderDetail = document.querySelector('#order_detail')
            inputFileOrderDetail.addEventListener('change', (event) => {
                let qtdColumn = event.target.getAttribute('column');
                this.validateFileHeader('order_detail', 'Pedido detalhe', qtdColumn);
            });

            let inputFileSupplier = document.querySelector('#supplier');
            inputFileSupplier.addEventListener('change', (event) => {
                let qtdColumn = event.target.getAttribute('column');
                this.validateFileHeader('supplier', 'Fornecedor', qtdColumn);
            });
        },
        validateFileHeader(inputID, label, countColumnsHeader){
                const input = document.getElementById(inputID);
                const reader = new FileReader();
                let thisAlpineJS = this;
                reader.onload = function (e) {
                    const content = e.target.result;
                    // const rowData = content.split('\n');
                    // const allLines = content.split(/\r\n|\n/);
                    const rowData = content.split('\r');
                    const columns = rowData[0].split(';');
                    // Se última coluna estiver vazia, remove ela
                    if(columns[columns.length-1].trim() == ''){
                        columns.pop();
                    }
                    if(columns.length != countColumnsHeader){
                        thisAlpineJS.setModalStatus("Oops! Layout "+label+"!","Layout precisa ter "+countColumnsHeader+" colunas.");
                        thisAlpineJS.modalStatus.show(); 
                        input.value = '';
                        input.focus();
                    }
                    $('#frm').valid();
                };
                reader.readAsText(input.files[0],'ISO-8859-1');
        },
        submitData(){
            if($("#frm").valid()){

                let thisAlpineJS = this; // Armazena a instância do AlpineJS
                const order = document.querySelector("#order").files[0];
                const orderDetail = document.querySelector("#order_detail").files[0];
                const supplier = document.querySelector("#supplier").files[0];

                const frm = new FormData();
                frm.append('order',order);
                frm.append('order_detail', orderDetail);
                frm.append('supplier',supplier);
                frm.append('_token',document.head.querySelector('meta[name=csrf-token]').content);

                this.buttonLabel = 'Aguarde, enviando arquivo...'
                this.loading = true;

                // Instância classe de requisição
                let xhr = new XMLHttpRequest();
                // Define retorno como JSON
                xhr.responseType = 'json';
                // Define como será tratado o retorno
                xhr.onload = function() { 
                    if (xhr.status === 200 && xhr.readyState == 4) {
                        thisAlpineJS.setModalStatus('Muito bom!','Em breve você receberá o email sobre o processamento!');                      
                    } else {
                        thisAlpineJS.setModalStatus('Algo errado!','Se persistir, fale com o administrador!');
                    }
                    thisAlpineJS.modalStatus.show();
                    document.getElementById('progress-bar').style.width = '0%';
                    document.getElementById('progress-bar').innerHTML = '0%';

                    thisAlpineJS.loading = false;
                    thisAlpineJS.buttonLabel = 'Enviar';
                    document.getElementById("order").value = '';
                    document.getElementById("order_detail").value = '';
                    document.getElementById("supplier").value = '';
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
