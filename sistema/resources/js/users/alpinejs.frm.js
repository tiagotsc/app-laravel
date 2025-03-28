/**
 * 
 * Script em AlpineJS, mas mescla com alguns recursos do Jquery
 */

// function managerFrm(){
// 	return {
//         search: '', // campo de busca
//         data: [], // dados do formulário
//         selectall: false, /* seleção de todos começa desmarcado */
//         clicked: false, /* verifica se função allChecked já foi clicada */
//         selectedRoles: [], // permissões que já vieram selecionadas
//         allRoles: [], // todas as permissões
//         loading: false, // Loading botão
//         buttonLabel: 'Salvar', // Texto botão
//         selected(id){ // Verifica se checkbox foi marcado ou não
 
//             let checkbox = document.getElementById(`role[${id}]`);
//             if(checkbox.checked == true){
//                 this.selectedRoles.push(checkbox.value);
//             }else{
//                 this.selectedRoles = arrayRemove(this.selectedRoles, checkbox.value);
//             }
         
//         },
//         loadData(){ // carrega dados tela
//             //loadingShow('Aguarde, carregando dados...');
//             this.loading = true;
//             fetch(document.getElementById("route_list").value)
//                                 .then(res => res.json())
//                                 .then(res => {
//                                     this.data = res.data;
//                                     this.selectedRoles = arrayColumn(res.data.roles, 'name');
//                                     this.allRoles = res.allRoles;
//                                     //loadingHide();
//                                     this.loading = false;
//                                 })
//         },
//         allChecked(){ // Marca ou desmarca todos os checkboxs
//             this.clicked = true; /* marca como true quando a função allChecked é executada */
//             this.selectall = !this.selectall;
//         },
//         get filteredIRoles() { // Filtra busca de permissões
//             return this.allRoles.filter(
//                 (i) => {
//                     if(i.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1){ // Se retorno do indexof for maior que 0 exibe registro
//                         i.show = true; // Exibe determinado registro
//                     }else{
//                         i.show = false; // Oculta determinado registro
//                     }
//                     return i;
//                 }
//             )
//         },
//         submitData(){
//             if($("#frm").valid()){

//                 this.buttonLabel = 'Aguarde...'
//                 this.loading = true;
//                 let _method = document.querySelector('input[name="_method"]') !== null ? document.querySelector('input[name="_method"]').value: '';
                
//                 this.data.role = this.selectedRoles;
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

//                 /*//let formData = new FormData(frm);
//                 let _method = document.querySelector('input[name="_method"]') !== null ? document.querySelector('input[name="_method"]').value: '';
//                 let formData = {
//                     name: document.getElementById('name').value,
//                     role: this.selectedRoles,
//                     _method: _method,
//                     _token: document.head.querySelector('meta[name=csrf-token]').content
//                 };

//                 $.ajax({
//                     type: 'POST',
//                     url: $("#frm").attr('action'),
//                     header:{
//                         'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
//                       },
//                     data: formData,
//                     //processData: false,
//                     //contentType: false,
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
//                     },
//                     error: function (data, textStatus, errorThrown) {
//                         swal("Error grave!", "Se persistir, fale com o administrador!", "error");
//                         $("#save").prop('disabled', false).html('Salvar');
//                     },
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
        search: '', // campo de busca
        selectall: false, /* seleção de todos começa desmarcado */
        clicked: false, /* verifica se função allChecked já foi clicada */
        selectedRoles: [], // permissões que já vieram selecionadas
        allRoles: [], // todas as permissões
        loading: false, // Loading botão
        buttonLabel: 'Salvar', // Texto botão
        selected(id){ // Verifica se checkbox foi marcado ou não
 
            let checkbox = document.getElementById(`role[${id}]`);
            if(checkbox.checked == true){
                this.selectedRoles.push(checkbox.value);
            }else{
                this.selectedRoles = arrayRemove(this.selectedRoles, checkbox.value);
            }
         
        },
        loadData(){ // carrega dados tela
            //loadingShow('Aguarde, carregando dados...');
            this.loading = true;
            fetch(document.getElementById("route_list").value)
                                .then(res => res.json())
                                .then(res => {
                                    if(res.data?.id){
                                        document.getElementById("username").value = res.data.username;
                                        document.getElementById("name").value = res.data.name;
                                        document.getElementById("email").value = res.data.email;
                                        document.getElementById("active").value = res.data.active;

                                    }
                                    this.selectedRoles = arrayColumn(res.data.roles, 'name');
                                    this.allRoles = res.allRoles;
                                    //loadingHide();
                                    this.loading = false;

                                    this.feedLi();

                                    // aciona find
                                    let find = document.querySelector('#search')
                                    find.addEventListener('keyup', (event) => {
                                        this.search = event.target.value;
                                        this.feedLi();
                                    });
                                })
        },
        feedLi(){
            let lis = `<li class="list-group-item">
                            <input @click="allChecked" type="checkbox" id="allChecked">
                            <label for="allChecked"><b>Todas</b></label>
                        </li>`;
            this.filteredIRoles.forEach(rol => {
                if(rol.show){
                    let checked = (this.selectall || (this.selectedRoles.indexOf(rol.name) >= 0 && this.clicked == false) ? 'checked' : '')
                    lis += `<li class="list-group-item"> 
                                <input type="checkbox" id="role[${rol.name}]" class="input_checkbox"
                                name="role[${rol.name}]" value="${rol.name}" 
                                ${checked}>
                            <label id="name" for="role[${rol.name}]">${rol.name}</label>
                        </li>`;
                }
            })
            document.getElementById("list_roles").innerHTML = lis;
        },
        allChecked(){ // Marca ou desmarca todos os checkboxs
            this.clicked = true; /* marca como true quando a função allChecked é executada */
            this.selectall = !this.selectall;
            let checkboxes = document.querySelectorAll('.input_checkbox');
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = this.selectall? true: false;
            }, this);
        },
        getChecked(){
            this.selectedRoles = [];
            let checkboxes = document.querySelectorAll('.input_checkbox');
            checkboxes.forEach(function (checkbox) {
                if(checkbox.checked){
                    this.selectedRoles.push(checkbox.value);
                }
            }, this);
        },
        get filteredIRoles() { // Filtra busca de permissões
            return this.allRoles.filter(
                (i) => {
                    if(i.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1){ // Se retorno do indexof for maior que 0 exibe registro
                        i.show = true; // Exibe determinado registro
                    }else{
                        i.show = false; // Oculta determinado registro
                    }
                    return i;
                }
            )
        },
        submitData(){
            if($("#frm").valid()){

                this.buttonLabel = 'Aguarde...'
                this.loading = true;
                let _method = document.querySelector('input[name="_method"]') !== null ? document.querySelector('input[name="_method"]').value: '';
                
                this.getChecked();

                let data = {
                    _method: _method,
                    _token: document.head.querySelector('meta[name=csrf-token]').content,
                    username: document.getElementById("username").value,
                    name:document.getElementById("name").value,
                    email: document.getElementById("email").value,
                    active: document.getElementById("active").value,
                    password: document.getElementById("password").value,
                    confirm_password: document.getElementById("confirm_password").value,
                    role: this.selectedRoles
                }

                fetch(document.getElementById("frm").action, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
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
                    this.loading = false;
                    this.buttonLabel = 'Salvar';
                    this.modalStatus.show();
                })

                /*//let formData = new FormData(frm);
                let _method = document.querySelector('input[name="_method"]') !== null ? document.querySelector('input[name="_method"]').value: '';
                let formData = {
                    name: document.getElementById('name').value,
                    role: this.selectedRoles,
                    _method: _method,
                    _token: document.head.querySelector('meta[name=csrf-token]').content
                };

                $.ajax({
                    type: 'POST',
                    url: $("#frm").attr('action'),
                    header:{
                        'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
                      },
                    data: formData,
                    //processData: false,
                    //contentType: false,
                    dataType: "json",
                    success: function (data) { 
                        let type = 'error';
                        let title = 'Ops! Algo errado!';
                        let description = 'Erro ao salvar!';
                        // Retorno true = alterado com sucesso (controller::update) | returno length > 0 = cadastrado com sucesso (controller::store)
                        if(data.status == true || Object.keys(data.status).length >= 0){ // OR
                            type = 'success';
                            title = 'Muito  bom!';
                            description = 'Salvo com sucesso!';
                        }
                        swal(title, description, type)
                        .then(() => {
                            if (data.redirect != undefined) { // Se foi cadastrado, redireciona para tela de edição
                                $(location).attr('href',data.redirect);
                            }
                        });
                        $('#password,#confirm_password').val(''); // Limpa campos de senha
                        $("#save").prop('disabled', false).html('Salvar');
                    },
                    error: function (data, textStatus, errorThrown) {
                        swal("Error grave!", "Se persistir, fale com o administrador!", "error");
                        $("#save").prop('disabled', false).html('Salvar');
                    },
                });*/

            }
        }

    }));

});