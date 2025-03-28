/**
 * 
 * Script em AlpineJS, mas mescla com alguns recursos do Jquery
 */

//  function managerFrm(){
// 	return {
//         data: {
//             _token: document.head.querySelector('meta[name=csrf-token]').content,
//             _method: document.querySelector('input[name="_method"]') !== null ? document.querySelector('input[name="_method"]').value: ''
//         }, // dados do formulário
//         loading: false, // Loading botão
//         buttonLabel: 'Enviar', // Texto botão
//         loadData(){ // carrega dados tela

//             // Valida anexo
//             let inputFileSelected = document.querySelector('#file')
//             inputFileSelected.addEventListener('change', (event) => {
//                 $('#frm').valid()
//             });
//         },
//         submitData(){
//             if($("#frm").valid()){
//                 var frm = new FormData();
//                 var file = $('#file')[0].files;
//                 frm.append('file',file[0]);
//                 frm.append('_token',document.head.querySelector('meta[name=csrf-token]').content);
//                 frm.append('_method','post');
 
//                 //this.buttonLabel = 'Aguarde enviando arquivo...'
//                 //this.loading = true
//                 /*$("#save").prop('disabled', true).html('Aguarde enviando arquivo...');
//                 $.ajax({
//                     url: document.getElementById("frm").action,
//                     type: 'post',
//                     data: frm,
//                     contentType: false,
//                     processData: false,
//                     dataType: "json",
//                     success: function(response){
//                         if(response.ok != true){ // Se algo errado ocorrer
//                             swal("Algo errado!", "Se persistir, fale com o administrador!", "error");
//                         }
//                         response.json().then(data => {
//                             swal('Muito bom!', 'Arquivo enviado com sucesso!', 'success');
//                         })
//                         //this.loading = false;
//                         //this.buttonLabel = 'Enviar';
//                         $("#save").prop('disabled', false).html('Enviar');
//                     },
//                     error: function (data, textStatus, errorThrown) {
                        
//                         swal("Error grave!", "Se persistir, fale com o administrador!", "error");
//                         $("#save").prop('disabled', false).html('Enviar');
//                         //this.loading = false;
//                         //this.buttonLabel = 'Enviar';
                        
//                      }
//                  });*/
//                 this.buttonLabel = 'Aguarde, enviando arquivo...'
//                 this.loading = true;
//                 fetch(document.getElementById("frm").action, {
//                     method: 'POST',
//                     body: frm
//                 })
//                 .then(response => response.json())
//                 .then((data) => { 
//                     if(data.status != true){ // Se algo errado ocorrer
//                         swal("Algo errado!", "Se persistir, fale com o administrador!", "error");
//                     }else{
//                         swal('Muito bom!', 'Arquivo enviado e processado com sucesso!', 'success');
//                     }
//                 })
//                 .catch(() => {
//                     swal("Error grave!", "Se persistir, fale com o administrador!", "error");
//                 }).finally(() => {
//                     this.loading = false;
//                     this.buttonLabel = 'Enviar';
//                     document.getElementById("file").value = '';
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
	
        data: {
            _token: document.head.querySelector('meta[name=csrf-token]').content,
            _method: document.querySelector('input[name="_method"]') !== null ? document.querySelector('input[name="_method"]').value: ''
        }, // dados do formulário
        loading: false, // Loading botão
        buttonLabel: 'Enviar', // Texto botão
        loadData(){ // carrega dados tela

            // Valida anexo
            let inputFileSelected = document.querySelector('#file')
            inputFileSelected.addEventListener('change', (event) => {
                $('#frm').valid()
            });
        },
        submitData(){
            if($("#frm").valid()){
                var frm = new FormData();
                var file = $('#file')[0].files;
                frm.append('file',file[0]);
                frm.append('_token',document.head.querySelector('meta[name=csrf-token]').content);
                frm.append('_method','post');
 
                this.buttonLabel = 'Aguarde, enviando arquivo...'
                this.loading = true;
                fetch(document.getElementById("frm").action, {
                    method: 'POST',
                    body: frm
                })
                .then(response => response.json())
                .then((data) => { 
                    if(data.status != true){ // Se algo errado ocorrer
                        modalStatus('Algo errado!','Se persistir, fale com o administrador!');
                    }else{
                        modalStatus('Muito bom!','Arquivo enviado e processado com sucesso!');
                    }
                })
                .catch(() => {
                    modalStatus('Error grave!','Se persistir, fale com o administrador!');
                }).finally(() => {
                    this.loading = false;
                    this.buttonLabel = 'Enviar';
                    document.getElementById("file").value = '';
                    table.clear().draw();
                    table.ajax.reload();
                    let modalStatus = new bootstrap.Modal(document.getElementById('modal-status'));
                        modalStatus.show();
                })
            }
        }

    }));

});