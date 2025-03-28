/**
 * 
 * Script em AlpineJS, mas mescla com alguns recursos do Jquery
 */

// function managerFrm(){
// 	return {
//         category_id: '', // Categoria selecionada
//         categories: {}, // Categorias carregadas
//         files: {}, // arquivos que serão enviados
//         selectedFiles: '', // Arquivos selecionados
//         list: {}, // Lista de arquivos da base
//         loading: false, // Loading botão
//         buttonLabel: 'Cadastrar', // Texto botão
//         loadData(){ // carrega dados tela
//             this.loading = true;
//             this.buttonLabel = 'Aguarde, carregando dados...'
//             fetch(document.getElementById("route_datapage").value)
//                 .then(res => res.json())
//                 .then(res => {
//                     this.categories = res.categories;
//                     this.list = res.documents;
//             })
//             .finally(() => {
//                 this.loading = false;
//                 this.buttonLabel = 'Cadastrar';
//             })
//         },
//         clearFields(vthis, finish = false){ // Limpa campos
//             vthis.loading = false;
//             vthis.buttonLabel = 'Cadastrar';
//             document.getElementById("files").value = '';
//             vthis.files = {};
//             vthis.selectedFiles = '';
//             vthis.category_id = '';
//             if(finish){
//                 document.getElementById('progress-bar').style.width = '0%';
//                 document.getElementById('progress-bar').innerHTML = '0%';
//             }
//         },
//         validFiles(){ // Valida arquivos
//             const maxFileSizeInMB = 10;
//             const maxFileSizeInKB = 1024 * 1024 * maxFileSizeInMB;
//             let file = [];
//             let fileError = []; // Arquivos com tamanho além do permitido
//             let validFiles = new DataTransfer();
//             if(this.files.length > 5){
//                 this.clearFields(this);
//                 swal('Muitos arquivos!', 'envie no máximo 5 arquivos.', 'warning');
//                 return
//             }
//             for (let i = 0; i < this.files.length; i++) {
//                 if(this.files[i].size <= maxFileSizeInKB){ // Só pega arquivos abaixo do valor máximo
//                     file.push(this.files[i].name);
//                     validFiles.items.add(this.files[i]);
//                 }else{
//                     fileError.push(this.files[i].name);
//                 }
//             }
//             if(fileError.length){
//                 swal('Arquivos muito grande!', fileError.join(', '), 'warning');
//             }
//             this.files  = validFiles.files; // atualiza com arquivos que passaram na validação
//             this.selectedFiles = (this.files.length > 0)? this.files.length+' arquivos serão enviados: '+file.join(' | '): '';
//         },
//         change(el,event){ // Seleciona no input
//             this.files = event.target.files; 
//             this.validFiles();
//         },
//         dragover(el,event){ // Estive movendo encima da área
//             // e.preventDefault();
//             // e.stopPropagation();
//             el.classList.add('drag_drop_active')
//         },
//         dragleave(el,event){ // Estiver saindo da área
//             // event.preventDefault();
//             // event.stopPropagation();
//             el.classList.remove('drag_drop_active')
//         },
//         drop(el, event){ // Jogando arquivos na área
//             // event.preventDefault();
//             // event.stopPropagation();
//             el.classList.remove('drag_drop_active');
//             this.files = event.dataTransfer.files;
//             this.validFiles();
//         },
//         submitData(){
//             if($("#frm").valid()){
//                 if(Object.keys(this.files).length == 0){
//                     swal('Nenhum arquivo!', 'Selecione algum, por favor.', 'warning');
//                     return;
//                 }
//                 this.loading = true;
//                 this.buttonLabel = 'Aguarde, cadatrando arquivos...';

//                 const frm = new FormData();
//                 frm.append('category_id',this.category_id);
//                 frm.append('_token',document.head.querySelector('meta[name=csrf-token]').content);
//                 for (let i = 0; i < this.files.length; i++) {
//                     frm.append('file['+i+']',this.files[i]);
//                 }

//                 let xhr = new XMLHttpRequest();
//                 xhr.open("POST", document.getElementById("frm").action);
//                 let alpineJSThis = this; // Instância do AlpineJS
//                 xhr.onload = function() { // Retorno da requisição
//                     if (xhr.status === 200 && JSON.parse(this.responseText).response_status == true) {
//                         swal('Muito bom!', 'Arquivos enviados com sucesso!', 'success');
//                         table.clear().draw();
//                         table.ajax.reload();
//                         table.order( [ 0, 'desc' ] ).draw();
//                     } else {
//                         swal("Algo errado!", "Se persistir, fale com o administrador!", "error");
//                     }
//                     alpineJSThis.clearFields(alpineJSThis, true);
//                 };
//                 xhr.upload.onprogress = function(event) { // Progresso de envio
//                     let progress = Math.round((event.loaded / event.total) * 100);
//                     document.getElementById('progress-bar').style.width = progress+'%';
//                     document.getElementById('progress-bar').innerHTML = progress+'%';
//                 };
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
        categories: {}, // Categorias carregadas
        files: {}, // arquivos que serão enviados
        selectedFiles: '', // Arquivos selecionados
        list: {}, // Lista de arquivos da base
        loading: false, // Loading botão
        buttonLabel: 'Cadastrar', // Texto botão
        target: document.getElementById("drag_drop_area"), // Div que será manipulado para arrastar e soltar
        loadData(){ // carrega dados tela

            // Anexa o arquivo por seleção na tela de escolha de arquivo
            let inputFileSelected = document.querySelector('#files')
            inputFileSelected.addEventListener('change', (event) => {
                this.change(event)
            });

            // é disparado quando um elemento ou seleção de texto é arrastado sobre um destino de soltar válido
            this.target.addEventListener('dragover', (event) => {
                this.dragover(this, event)
            });

            // é disparado quando um elemento arrastado ou uma seleção de texto sai de um destino de soltar válido.
            this.target.addEventListener('dragleave', (event) => {
                this.dragleave(this, event)
            });

            // é disparado quando um elemento ou seleção de texto é solto em um destino de soltar válido.
            this.target.addEventListener('drop', (event) => {
                this.drop(this, event)
            });

            this.loading = true;
            this.buttonLabel = 'Aguarde, carregando dados...'
            fetch(document.getElementById("route_datapage").value)
                .then(res => res.json())
                .then(res => {
                    this.categories = res.categories;
                    this.list = res.documents;
            })
            .finally(() => {
                this.loading = false;
                this.buttonLabel = 'Cadastrar';
            })
        },
        clearFields(vthis, finish = false){ // Limpa campos
            vthis.loading = false;
            vthis.buttonLabel = 'Cadastrar';
            document.getElementById("files").value = '';
            vthis.files = {};
            vthis.selectedFiles = '';
            document.getElementById("category_id").value = '';
            if(finish){
                document.getElementById('progress-bar').style.width = '0%';
                document.getElementById('progress-bar').innerHTML = '0%';
            }
        },
        validFiles(){ // Valida arquivos
            const maxFileSizeInMB = 10;
            const maxFileSizeInKB = 1024 * 1024 * maxFileSizeInMB;
            let file = [];
            let fileError = []; // Arquivos com tamanho além do permitido
            let validFiles = new DataTransfer();
            if(this.files.length > 5){
                this.clearFields(this);
                // swal('Muitos arquivos!', 'envie no máximo 5 arquivos.', 'warning');
                this.setModalStatus('Muitos arquivos!','Envie no máximo 5 arquivos.');
                let modalStatus = new bootstrap.Modal(document.getElementById('modal-status'));
                    modalStatus.show();
                return
            }
            for (let i = 0; i < this.files.length; i++) {
                if(this.files[i].size <= maxFileSizeInKB){ // Só pega arquivos abaixo do valor máximo
                    file.push(this.files[i].name);
                    validFiles.items.add(this.files[i]);
                }else{
                    fileError.push(this.files[i].name);
                }
            }
            if(fileError.length){
                // swal('Arquivos muito grande!', fileError.join(', '), 'warning');
                this.setModalStatus('Arquivos muito grande!',fileError.join(', '));
                let modalStatus = new bootstrap.Modal(document.getElementById('modal-status'));
                    modalStatus.show();
            }
            this.files  = validFiles.files; // atualiza com arquivos que passaram na validação
            this.selectedFiles = (this.files.length > 0)? this.files.length+' arquivos serão enviados: '+file.join(' | '): '';
        },
        change(event){ // Seleciona no input
            this.files = event.target.files; 
            this.validFiles();
        },
        dragover(el,e){ // Estive movendo encima da área
            e.preventDefault();
            // e.stopPropagation();
            this.target.classList.add('drag_drop_active')
        },
        dragleave(el, e){ // Estiver saindo da área
            e.preventDefault();
            // event.stopPropagation();
            this.target.classList.remove('drag_drop_active')
        },
        drop(el, event){ // Jogando arquivos na área
            event.preventDefault();
            // event.stopPropagation();
            this.target.classList.remove('drag_drop_active');
            this.files = event.dataTransfer.files;
            this.validFiles();
        },
        setModalStatus(title, msg){
            document.getElementById("title-modal-status").innerText = title;
            document.getElementById("desc-status-modal").innerText=msg;
        },
        submitData(){
            if($("#frm").valid()){
                if(Object.keys(this.files).length == 0){
                    // swal('Nenhum arquivo!', 'Selecione algum, por favor.', 'warning');
                    this.setModalStatus('Nenhum arquivo!','Selecione algum, por favor.');
                    let modalStatus = new bootstrap.Modal(document.getElementById('modal-status'));
                        modalStatus.show();
                    return;
                }
                this.loading = true;
                this.buttonLabel = 'Aguarde, cadatrando arquivos...';

                const frm = new FormData();
                frm.append('category_id',document.getElementById("category_id").value);
                frm.append('_token',document.head.querySelector('meta[name=csrf-token]').content);
                for (let i = 0; i < this.files.length; i++) {
                    frm.append('file['+i+']',this.files[i]);
                }

                let xhr = new XMLHttpRequest();
                xhr.open("POST", document.getElementById("frm").action);
                let alpineJSThis = this; // Instância do AlpineJS
                xhr.onload = function() { // Retorno da requisição
                    if (xhr.status === 200 && JSON.parse(this.responseText).response_status == true) {
                        // swal('Muito bom!', 'Arquivos enviados com sucesso!', 'success');
                        alpineJSThis.setModalStatus('Muito bom!','Arquivos enviados com sucesso!');

                        table.clear().draw();
                        table.ajax.reload();
                        table.order( [ 0, 'desc' ] ).draw();
                    } else {
                        // swal("Algo errado!", "Se persistir, fale com o administrador!", "error");
                        alpineJSThis.setModalStatus('Algo errado!','Se persistir, fale com o administrador!');
                    }
                    let modalStatus = new bootstrap.Modal(document.getElementById('modal-status'));
                        modalStatus.show();
                    alpineJSThis.clearFields(alpineJSThis, true);
                };
                xhr.upload.onprogress = function(event) { // Progresso de envio
                    let progress = Math.round((event.loaded / event.total) * 100);
                    document.getElementById('progress-bar').style.width = progress+'%';
                    document.getElementById('progress-bar').innerHTML = progress+'%';
                };
                xhr.send(frm);
            }
        }
    }));

});