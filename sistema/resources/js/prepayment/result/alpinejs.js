/**
 * 
 * Script em AlpineJS, mas mescla com alguns recursos do Jquery
 */

// Schema de todas as quantidades
let objQtd = {
    total:0, // Quantidade total
    unknown: 0, // Quantidade total de trilhões
    undefined: 0, // Quantidade sem retorno
    proceeds: 0, // Quantidade total de procede
    notProceeds: 0, // Quantidade total de não proce
    correction: 0, // Quantidade total de corrigidos
    notCorrection: 0 // Quantidade total de não corrigidos
};

// Schema de todos os valores
let objValue = {
    proceeds: 0.0, // Valor total de procede
    notProceeds: 0.0, // Valor total de não proce
    correction: 0.0, // Valor total de corrigidos
    notCorrection: 0.0 // Valor total de não corrigidos
};

// function managerFrm(){
//     return {
//         data: {
//             _token: document.head.querySelector('meta[name=csrf-token]').content
//         }, // dados do formulário
//         rows: {}, // Armazena a lista de dados
//         qtdAll: {...objQtd}, // Carrega schema qtd, clonando objeto
//         valueAll: {...objValue}, // Carrega schema value, clonando objeto
//         loading: false, // Loading botão
//         buttonLabel: 'Visualizar', // Texto botão
//         sumColumn(listArray, column, type){ // Realiza o somatório das quantidades
//             // Recebe array e coluna para filtragem e separação
//             // Pega no array somente os valores da coluna informada
//             let qtds = arrayColumn(listArray,column);
//             if(type == 'int'){
//                 return qtds.reduce((accumulator, value) => accumulator + (value == null? 0: parseInt(value)),0);
//             }else if(type == 'float'){
//                 return qtds.reduce((accumulator, value) => accumulator + (value == null? 0: parseFloat(value)),0);
//             }else{
//                 return 0;
//             }
//         },
//         async getList(){ // Carrega Lista
//             this.rows = {}; // Limpa lista
//             this.qtdAll = {...objQtd}; // Zera as quantidades, clonando objeto zerado original
//             this.valueAll = {...objValue}; // Zera os valores, clonando objeto zerado original
//             let url = document.getElementById("route_list").value;
//             let msgLoading = 'Aguarde, carregando dados...';
//             // AWAIT para aguardar retorno, para fazer uso, função pai precisa ter ASYNC
//             let resultRows = await this.requestGet(url,'Lista',msgLoading);
//             // Dados da lista
//             this.rows = resultRows.data;
//             // Pegando totais
//             this.qtdAll.total = this.sumColumn(resultRows.data, 'count_total', 'int');
//             this.qtdAll.unknown = this.sumColumn(resultRows.data, 'count_total_unknown', 'int');
//             this.qtdAll.undefined = this.sumColumn(resultRows.data, 'count_undefined', 'int');
//             this.qtdAll.proceeds = this.sumColumn(resultRows.data, 'count_proceeds', 'int');
//             this.qtdAll.notProceeds = this.sumColumn(resultRows.data, 'count_not_proceeds', 'int');
//             this.qtdAll.correction = this.sumColumn(resultRows.data, 'count_correction', 'int');
//             this.qtdAll.notCorrection = this.sumColumn(resultRows.data, 'count_not_correction', 'int');
//             // Pegando valores
//             this.valueAll.proceeds = this.sumColumn(resultRows.data, 'value_proceeds', 'float').toFixed(2);
//             this.valueAll.notProceeds = this.sumColumn(resultRows.data, 'value_not_proceeds', 'float').toFixed(2);
//             this.valueAll.correction = this.sumColumn(resultRows.data, 'value_correction', 'float').toFixed(2);
//             this.valueAll.notCorrection = this.sumColumn(resultRows.data, 'value_not_correction', 'float').toFixed(2);
//         }, // Exportar relatório detalhado
//         async exportReport(){
//             if($("#frm").valid()){
//                 let url = document.getElementById("route_export").value;
//                 let msgLoading = 'Aguarde, enviando relatório para seu email...';
//                 // AWAIT para aguardar retorno, para fazer uso, função pai precisa ter ASYNC
//                 await this.requestGet(url,'Exportação',msgLoading);
//                 swal('Poof!', 'Em instante chegará na sua caixa de entrada.', 'success');
//             }
//         }, // Ajax requisição GET
//         /* 
//         Faz a requisição AJAX do tipo GET e retorna uma Promise, ou seja, 
//         fica aguarndo retorno, por isso async no início da função
//         e nas requisições internas é usado await
//         */
//         async requestGet(url, label, msgLoading) {
//             //loadingShow(msgLoading);
//             this.loading = true;
//             let start = document.getElementById('start_date').value.split('/').reverse().join('-');
//             let end = document.getElementById('end_date').value.split('/').reverse().join('-');

//             // await para aguardar retorno requisição
//             const response = await fetch(url+'/'+start+'/'+end);
        
//             if (!response.ok) { // Se houve algum problema na requisição
//                 this.loading = false;
//                 //loadingHide();
//                 swal(`Algo errado! ${label}`, "Se persistir, fale com o administrador!", "error");
//                 const message = `An error has occured: ${response.status}`;
//                 throw new Error(message);
//             }
        
//             // await para aguardar resposta da requisição
//             const result = await response.json();
//             //loadingHide();
//             this.loading = false;

//             $(function () {
//                 $('[data-toggle="tooltip"]').tooltip()
//             });

//             return result;
//         },
//         moneyBR(value) {
//             if(value == null){
//                 return '';
//             }
//             return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).toString();
//         },
//         submitData(){ // Recarrega lista
//             if($("#frm").valid()){
//                 this.getList();
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
            _token: document.head.querySelector('meta[name=csrf-token]').content
        }, // dados do formulário
        rows: {}, // Armazena a lista de dados
        qtdAll: {...objQtd}, // Carrega schema qtd, clonando objeto
        valueAll: {...objValue}, // Carrega schema value, clonando objeto
        loading: false, // Loading botão
        buttonLabel: 'Visualizar', // Texto botão
        setModalStatus(title, msg){
            document.getElementById("title-modal-status").innerText = title;
            document.getElementById("desc-status-modal").innerText=msg;
        },
        sumColumn(listArray, column, type){ // Realiza o somatório das quantidades
            // Recebe array e coluna para filtragem e separação
            // Pega no array somente os valores da coluna informada
            let qtds = arrayColumn(listArray,column);
            if(type == 'int'){
                return qtds.reduce((accumulator, value) => accumulator + (value == null? 0: parseInt(value)),0);
            }else if(type == 'float'){
                return qtds.reduce((accumulator, value) => accumulator + (value == null? 0: parseFloat(value)),0);
            }else{
                return 0;
            }
        },
        async getList(){ // Carrega Lista
            this.rows = {}; // Limpa lista
            this.qtdAll = {...objQtd}; // Zera as quantidades, clonando objeto zerado original
            this.valueAll = {...objValue}; // Zera os valores, clonando objeto zerado original
            let url = document.getElementById("route_list").value;
            // AWAIT para aguardar retorno, para fazer uso, função pai precisa ter ASYNC
            document.getElementById("result-tbody").innerHTML = '<tr><td colspan="14" class="text-center"><b>Aguarde, processo em andamento...</b></td></tr>';
            document.getElementById("result-tfoot").innerHTML = '';
            let resultRows = await this.requestGet(url,'Lista');
            // Dados da lista
            this.rows = resultRows.data;
            this.feedsTbody(this.rows);
            // Pegando totais
            this.qtdAll.total = this.sumColumn(resultRows.data, 'count_total', 'int');
            this.qtdAll.unknown = this.sumColumn(resultRows.data, 'count_total_unknown', 'int');
            this.qtdAll.undefined = this.sumColumn(resultRows.data, 'count_undefined', 'int');
            this.qtdAll.proceeds = this.sumColumn(resultRows.data, 'count_proceeds', 'int');
            this.qtdAll.notProceeds = this.sumColumn(resultRows.data, 'count_not_proceeds', 'int');
            this.qtdAll.correction = this.sumColumn(resultRows.data, 'count_correction', 'int');
            this.qtdAll.notCorrection = this.sumColumn(resultRows.data, 'count_not_correction', 'int');
            // Pegando valores
            this.valueAll.proceeds = this.sumColumn(resultRows.data, 'value_proceeds', 'float').toFixed(2);
            this.valueAll.notProceeds = this.sumColumn(resultRows.data, 'value_not_proceeds', 'float').toFixed(2);
            this.valueAll.correction = this.sumColumn(resultRows.data, 'value_correction', 'float').toFixed(2);
            this.valueAll.notCorrection = this.sumColumn(resultRows.data, 'value_not_correction', 'float').toFixed(2);
            this.feedsTfoot(this.qtdAll, this.valueAll);
        }, // Exportar relatório detalhado
        async exportReport(){
            if($("#frm").valid()){
                let url = document.getElementById("route_export").value;
                // AWAIT para aguardar retorno, para fazer uso, função pai precisa ter ASYNC
                await this.requestGet(url,'Exportação');
                this.setModalStatus('Poof!','Em instante chegará na sua caixa de entrada.');
                this.modalStatus.show();
            }
        }, // Ajax requisição GET
        /* 
        Faz a requisição AJAX do tipo GET e retorna uma Promise, ou seja, 
        fica aguarndo retorno, por isso async no início da função
        e nas requisições internas é usado await
        */
        async requestGet(url, label) {
            this.loading = true;
            let start = document.getElementById('start_date').value.split('/').reverse().join('-');
            let end = document.getElementById('end_date').value.split('/').reverse().join('-');

            // await para aguardar retorno requisição
            const response = await fetch(url+'/'+start+'/'+end);
        
            if (!response.ok) { // Se houve algum problema na requisição
                this.loading = false;
                //loadingHide();
                this.setModalStatus(`Algo errado! ${label}`,'Se persistir, fale com o administrador!');
                this.modalStatus.show();
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }
        
            // await para aguardar resposta da requisição
            const result = await response.json();
            //loadingHide();
            this.loading = false;

            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            });

            return result;
        },
        removeNull(data){
            if(Boolean(data)){
                return data;
            }else{
                return '';
            }
        },
        feedsTbody(rows){
            let tbody = document.getElementById("result-tbody");
            tbody.innerHTML="";
            rows.forEach(item => {
                let title = (item.original_name != null)? `Ref. ao lote: ${item.original_name.substr(15,2)}/${item.original_name.substr(17,2)}/${item.original_name.substr(19,4)}`: `Sem referência`;
                let first = `${item.name.substr(19, 6).replaceAll('-','/')}${item.name.substr(27, 2)}`;
                tbody.insertRow().innerHTML = `
                            <td data-toggle="tooltip" data-placement="top" title="${title}"><span>${first}</span></td>
                            <td>${this.removeNull(item.count_total)}</td>
                            <td>${this.removeNull(this.moneyBR(item.value_total).substr(3))}</td>
                            <td>${item.count_total_unknown}</td>
                            <td>${this.removeNull(this.moneyBR(item.value_total_unknown).substr(3))}</td>
                            <td>${this.removeNull(item.count_undefined)}</td>
                            <td>${this.removeNull(item.count_proceeds)}</td>
                            <td>${this.removeNull(this.moneyBR(item.value_proceeds).substr(3))}</td>
                            <td>${this.removeNull(item.count_not_proceeds)}</td>
                            <td>${this.removeNull(this.moneyBR(item.value_not_proceeds).substr(3))}</td>
                            <td>${this.removeNull(item.count_correction)}</td>
                            <td>${this.removeNull(this.moneyBR(item.value_correction).substr(3))}</td>
                            <td>${this.removeNull(item.count_not_correction)}</td>
                            <td>${this.removeNull(this.moneyBR(item.value_not_correction).substr(3))}</td>
                            `;
            });
            if(rows.length == 0){
                tbody.innerHTML = '<tr><td colspan="14" class="text-center"><b>Nenhum registro encontrado</b></td></tr>';
            }
        },
        feedsTfoot(qtdAll, valueAll){
            tfoot = document.getElementById("result-tfoot");
            tr = `<tr class="table-secondary">
                            <td data-toggle="tooltip" data-placement="top" title="Quantidade total" scope="col"><b>Q. Total</b></td>
                            <td colspan="2">${qtdAll.total}</td>
                            <td colspan="2">${qtdAll.unknown}</td>
                            <td>${qtdAll.undefined}</td>
                            <td>${qtdAll.proceeds}</td>
                            <td>${this.moneyBR(valueAll.proceeds).substr(3)}</td>
                            <td>${qtdAll.notProceeds}</td>
                            <td>${this.moneyBR(valueAll.notProceeds).substr(3)}</td>
                            <td>${qtdAll.correction}</td>
                            <td>${this.moneyBR(valueAll.correction).substr(3)}</td>
                            <td>${qtdAll.notCorrection}</td>
                            <td>${this.moneyBR(valueAll.notCorrection).substr(3)}</td>
                        </tr>`;
            tfoot.innerHTML = tr;
        },
        moneyBR(value) {
            if(value == null){
                return '';
            }
            return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).toString();
        },
        submitData(){ // Recarrega lista
            if($("#frm").valid()){
                this.getList();
            }
        }

    }));

});