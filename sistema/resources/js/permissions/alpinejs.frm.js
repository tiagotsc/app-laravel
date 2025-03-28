/**
 * 
 * Script em AlpineJS, mas mescla com alguns recursos do Jquery
 */

// function managerFrm(){
// 	return {
//         data: [], // dados do formulário
//         loading: false, // Loading botão
//         buttonLabel: 'Salvar', // Texto botão
//         loadData(){ // carrega dados tela
//             //loadingShow('Aguarde, carregando dados...');
//             this.loading = true;
//             fetch(document.getElementById("route_list").value)
//                                 .then(res => res.json())
//                                 .then(res => {
//                                     this.data = res;
//                                     //loadingHide();
//                                     this.loading = false;
//                                 })
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
//                 /*$(this).prop('disabled', true).html('Aguarde...');
        
//                 let formData = new FormData(frm);
                
//                 $.ajax({
//                     type: 'POST',
//                     url: $("#frm").attr('action'),
//                     data: formData,
//                     processData: false,
//                     contentType: false,
//                     dataType: "json",
//                     success: function (data) {
//                         let type = 'error';
//                         let title = 'Ops! Algo errado!';
//                         let description = 'Erro ao salvar!';
                        
//                         // Retorno true = alterado com sucesso (controller::update) | returno length > 0 = cadastrado com sucesso (controller::store)
//                         if(data.status == true || Object.keys(data.status).length >= 0){ // OR
//                             type = 'success';
//                             title = 'Muito  bom!';
//                             description = 'Salvo com sucesso!';
//                         }
//                         swal(title, description, type)
//                         .then(() => {
//                             if (data.redirect != undefined) { // Se foi cadastrado, redireciona para tela de edição
//                                 $(location).attr('href',data.redirect);
//                             }
//                         });
//                         $('#password,#confirm_password').val(''); // Limpa campos de senha
//                         $("#save").prop('disabled', false).html('Salvar');
//                      },
//                      error: function (data, textStatus, errorThrown) {
//                         swal("Error grave!", "Se persistir, fale com o administrador!", "error");
//                         $("#save").prop('disabled', false).html('Salvar');
//                      },
//                 });*/
        
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
        setModalStatus(title, msg){
            document.getElementById("title-modal-status").innerText = title;
            document.getElementById("desc-status-modal").innerText=msg;
        },
        data: [], // dados do formulário
        loading: false, // Loading botão
        buttonLabel: 'Salvar', // Texto botão
        loadData(){ // carrega dados tela
            //loadingShow('Aguarde, carregando dados...');
            this.loading = true;
            fetch(document.getElementById("route_list").value)
                                .then(res => res.json())
                                .then(res => {
                                    this.data = res;
                                    if(res.name != undefined){
                                        document.getElementById("name").value = res.name;
                                    }
                                    //loadingHide();
                                    this.loading = false;
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

                fetch(document.getElementById("frm").action, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.data)
                })
                .then((response) => { 
                    if(response.ok != true){ // Se algo errado ocorrer
                        this.setModalStatus('Algo errado!','Se persistir, fale com o administrador!');
                    }
                    response.json().then(data => {
                        this.setModalStatus('Muito bom!','Salvo com sucesso!');
                        if (data.redirect != undefined) { // Se foi cadastrado, redireciona para tela de edição
                            window.location.href = data.redirect;
                        }
                    })
                })
                .catch(() => {
                    this.setModalStatus('Error grave!','Se persistir, fale com o administrador!');
                }).finally(() => {
                    this.modalStatus.show();
                    this.loading = false;
                    this.buttonLabel = 'Salvar'
                })
        
            }
        }

    }));

});