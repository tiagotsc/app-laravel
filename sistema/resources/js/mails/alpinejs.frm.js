/**
 * 
 * Script em AlpineJS, mas mescla com alguns recursos do Jquery
 */

// function managerFrm() {
//     let emailRegex = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/; // Regex e-mail

//     return {
//         activeEmails: [], // todos os e-mails dos usuários ativos no sistema
//         selectedEmailsIds: [], // array com os Ids das pessoas cadastradas que estão associada ao envio de email
//         associatedSingleEmails: [], // Array com os email avulso que estão associados ao envio de email
//         current: '', // email avulso corrente digitado
//         data: {}, // dados do formulário
//         loading: false, // Loading botão
//         buttonLabel: 'Salvar', // Texto botão
//         addObject(dataArray, namePosition){ // Pega todos itens array e transforma em uma lista de itens de objeto
//             let itemObject = [];
//             for (let i = 0; i < dataArray.length; i++) {
//                 itemObject.push(JSON.parse(`{ "${namePosition}" : "${dataArray[i]}" }`));
//             }
//             return itemObject;
//         },
//         loadData() {
//             //loadingShow('Aguarde, carregando dados...');
//             this.loading = true;
//             fetch(document.getElementById("route_edit").value) // valores do banco da tabela mails com Join das tabelas mails_users e mails_singles
//                 .then(res => res.json())
//                 .then(res => {
//                     // Se for edição, alimenta objeto this.data para alimentar tela
//                     this.data = (res.data.id != undefined) ? res.data: {};
//                     this.selectedEmailsIds = res.data.mails_users != undefined ? arrayColumn(res.data.mails_users,'user_id'): [];
//                     this.associatedSingleEmails = res.data.mails_singles !=  undefined ? arrayColumn(res.data.mails_singles,'mail'): [];
//                     this.activeEmails = res.emails_cadastrados;
//                     // $( "#user_id" ).rules( "add", { // Adiciona validação, após a carga da combo
//                     //     required: true,
//                     //     messages: {
//                     //         required: "Selecione, por favor"
//                     //     }
//                     // });
//                     //loadingHide();
//                     this.loading = false;
//                 })
//         },
//         submitData() {
//             if ($("#frm").valid()) {
                
//                 this.data._method = document.querySelector('input[name="_method"]') !== null ? document.querySelector('input[name="_method"]').value: null;
//                 this.data.system = document.getElementById('system').value // valor do sistema
//                 this.data.user_id = this.addObject($("#user_id").val(),'user_id');
//                 this.data.mail = this.addObject(this.associatedSingleEmails,'mail');

//                 if(this.data.user_id.length == 0 && this.data.mail.length == 0){
//                     swal("Selecione quem recebe ou adicione um email avulso!", "Verifique, por favor!", "error");
//                     return;
//                 }

//                 this.buttonLabel = 'Aguarde...'
//                 this.loading = true;

//                 fetch(document.getElementById("frm").action, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'X-CSRF-TOKEN': document.head.querySelector('meta[name=csrf-token]').content
//                     },
//                     body: JSON.stringify(this.data)
//                 }).then((response) => {
//                     if (response.ok != true) { // Se algo errado ocorrer
//                         swal("Algo errado!", "Se persistir, fale com o administrador!", "error");
//                     }
//                     response.json().then(data => {
//                         swal('Muito bom!', 'Adicionado com sucesso!', 'success')
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
//                     this.buttonLabel = 'Salvar';
//                 })
//             }
//         },
//         add() { // adicionando o e-mail avulso na lista
//             if (emailRegex.test(this.current) == true) { // verifica se é um e-mail válido [xpto@xpto.xpto]
//                 this.associatedSingleEmails.push(this.current.trim()); // primeiro adiciona
//                 this.associatedSingleEmails = [...new Set(this.associatedSingleEmails)]; // remove duplicata e converte para array através de ...
//                 this.current = ''; // Limpa campo para ficar disponível para próximo email
//             }
//             else {
//                 swal("E-mail não informado ou inválido!", "Verifique, por favor!", "error");
//             }
//         },
//         remove(item) { // removendo o e-mail avulso da lista
//             this.associatedSingleEmails.splice(this.associatedSingleEmails.indexOf(item), 1)
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
        emailRegex: /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/, // Regex e-mail
        activeEmails: [], // todos os e-mails dos usuários ativos no sistema
        selectedEmailsIds: [], // array com os Ids das pessoas cadastradas que estão associada ao envio de email
        associatedSingleEmails: [], // Array com os email avulso que estão associados ao envio de email
        current: '', // email avulso corrente digitado
        data: {}, // dados do formulário
        loading: false, // Loading botão
        buttonLabel: 'Salvar', // Texto botão
        addObject(dataArray, namePosition){ // Pega todos itens array e transforma em uma lista de itens de objeto
            let itemObject = [];
            for (let i = 0; i < dataArray.length; i++) {
                itemObject.push(JSON.parse(`{ "${namePosition}" : "${dataArray[i]}" }`));
            }
            return itemObject;
        },
        loadData() {

            //Esse código escuta o carregamento do DOM. Com a DOM carregada ele atribui o evento change ao input select2
            // util para executar funções jquery
            // Usado para executar evento do input select2
            window.addEventListener("DOMContentLoaded", () => {
                let selectUserId = document.querySelector('#user_id');
                $('#user_id').on('change', function (e) {
                    this.selectedEmailsIds = [];
                    Array.from(selectUserId.options).map((option) => { // Loop em todos options
                        if(option.selected){ // Se option estiver marcado, adiciona ao array
                            this.selectedEmailsIds.push(option.value)
                        }
                    });
                });
            });

            
            // aciona add
            let btAdd = document.querySelector('#add')
            btAdd.addEventListener('click', (event) => {
                this.add();
            });

            //loadingShow('Aguarde, carregando dados...');
            this.loading = true;
            fetch(document.getElementById("route_edit").value) // valores do banco da tabela mails com Join das tabelas mails_users e mails_singles
                .then(res => res.json())
                .then(res => {
                    // Se for edição, alimenta objeto this.data para alimentar tela
                    // this.data = (res.data.id != undefined) ? res.data: {};
                    if(res.data.id != undefined){
                        document.getElementById("initials").value = res.data.initials;
                        document.getElementById("name").value = res.data.name;
                        document.getElementById("system").value = res.data.system;
                        document.getElementById("status").value = res.data.status;
                        document.getElementById("path_script").value = res.data.path_script;
                        document.getElementById("description").value = res.data.description;
                        document.getElementById("mail_title").value = res.data.mail_title;
                        document.getElementById("mail_attach").value = res.data.mail_attach;
                        document.getElementById("mail_message").value = res.data.mail_message;
                    }
                    this.selectedEmailsIds = res.data.mails_users != undefined ? arrayColumn(res.data.mails_users,'user_id'): [];
                    this.associatedSingleEmails = res.data.mails_singles !=  undefined ? arrayColumn(res.data.mails_singles,'mail'): [];
                    this.activeEmails = res.emails_cadastrados;
                    this.loading = false;
                    this.comboUserId(this.activeEmails,this.selectedEmailsIds);

                    let thisAlpineJS = this; // Armazena a instância do AlpineJS

                    if(this.associatedSingleEmails.length){ // Depois de dados carregados e input de delete email presente na DOM
                        thisAlpineJS.eventDel();
                    }
                })
        },
        eventDel(){ // Adicionar evento de apagar após elemento estiver na tela
            let thisAlpineJS = this; // Armazena a instância do AlpineJS
            setTimeout(function() { // Aguarda 1 segundos para elemento aparecer na tela
                $('.bt-del').off("click");
                $('.bt-del').on('click', async function (event) {
                    thisAlpineJS.remove($(this).attr('email'));
                });
            }, 1000);
        },
        comboUserId(allActiveEmails, selectedEmailsIds){ // Alimenta combo e marca selecionados
            let combo = document.getElementById("user_id");
            let options = '';
            allActiveEmails.forEach(email => {
                let selected = (selectedEmailsIds.indexOf(email.id) >= 0)? 'selected': '';
                options += `<option ${selected} value="${email.id}">${email.email}</option>`;
            });
            combo.innerHTML = options;
        },
        submitData() {
            if ($("#frm").valid()) {
                
                this.data._method = document.querySelector('input[name="_method"]') !== null ? document.querySelector('input[name="_method"]').value: null;
                this.data.system = document.getElementById('system').value // valor do sistema
                this.data.user_id = this.addObject($("#user_id").val(),'user_id');
                this.data.mail = this.addObject(this.associatedSingleEmails,'mail');

                this.data.initials = document.getElementById("initials").value;
                this.data.name = document.getElementById("name").value;
                this.data.system = document.getElementById("system").value;
                this.data.status = document.getElementById("status").value;
                this.data.path_script = document.getElementById("path_script").value;
                this.data.description = document.getElementById("description").value;
                this.data.mail_title = document.getElementById("mail_title").value;
                this.data.mail_attach = document.getElementById("mail_attach").value;
                this.data.mail_message = document.getElementById("mail_message").value;

                if(this.data.user_id.length == 0 && this.data.mail.length == 0){
                    this.setModalStatus('Selecione quem recebe ou adicione um email avulso!','Verifique, por favor!');
                    this.modalStatus.show();
                    return;
                }

                this.buttonLabel = 'Aguarde...'
                this.loading = true;

                fetch(document.getElementById("frm").action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.head.querySelector('meta[name=csrf-token]').content
                    },
                    body: JSON.stringify(this.data)
                }).then((response) => {
                    if (response.ok != true) { // Se algo errado ocorrer
                        this.setModalStatus('Algo errado!','Se persistir, fale com o administrador!');
                    }
                    response.json().then(data => {
                        this.setModalStatus('Muito bom!','Adicionado com sucesso!');
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
                    this.buttonLabel = 'Salvar';
                })
            }
        },
        add() { // adicionando o e-mail avulso na lista
            let inputEmail = document.getElementById("current").value;
            if (this.emailRegex.test(inputEmail) == true) { // verifica se é um e-mail válido [xpto@xpto.xpto]
                this.associatedSingleEmails.push(inputEmail.trim()); // primeiro adiciona
                this.associatedSingleEmails = [...new Set(this.associatedSingleEmails)]; // remove duplicata e converte para array através de ...
                document.getElementById("current").value = ''; // Limpa campo para ficar disponível para próximo email
            }
            else {
                this.setModalStatus('E-mail não informado ou inválido!','Verifique, por favor!');
                this.modalStatus.show();
                document.getElementById("current").focus();
            }
            this.eventDel();
        },
        remove(item) { // removendo o e-mail avulso da lista
            this.associatedSingleEmails.splice(this.associatedSingleEmails.indexOf(item), 1)
        }

    }));

});