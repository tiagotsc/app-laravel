/**
 * 
 * Script em AlpineJS, mas mescla com alguns recursos do Jquery
 */

// function managerFrm(){
// 	return {
//         dates: ['Carregando...'], // dados das datas de log
//         date: '', // data selecionada
//         data: [], // dados de log
//         loading: false, // Loading botão
//         buttonLabel: 'Enviar', // Texto botão
//         init: true, // Primeira execução função
//         loadData(vType){ // carrega dados tela inicial
//             this.loading = true;
//             vdate = '';
//             this.data = [];
//             if(vType != 'init'){
//                 this.init = false;
//                 vdate = this.date.split('/').reverse().join('-');
//             }
//             fetch(document.getElementById("route_list").value+'?date='+vdate)
//                                 .then(res => res.json())
//                                 .then(res => {
//                                     if(this.init == true){
//                                         this.dates = res.dates; // Alimenta combo data somente no carregamento da tela
//                                     }
//                                     this.data = res.data;
//                                 }).finally(() => {
//                                     this.loading = false;
//                                 })
//         }
//     }
// }

/**
 * No padrão do AlpineJS CSP
 */
document.addEventListener('alpine:init', () => {
    
    Alpine.data("managerFrm", () => ({
	
        dates: ['Carregando...'], // dados das datas de log
        date: '', // data selecionada
        loading: false, // Loading botão
        buttonLabel: 'Enviar', // Texto botão
        initStart: true, // Primeira execução função
        configInit(){
            // Anexa o arquivo por seleção na tela de escolha de arquivo
            let inputFileSelected = document.querySelector('#date')
            inputFileSelected.addEventListener('change', (event) => {
                this.loadData('')
            });
            if(this.initStart){
                this.loadData('init');
            }else{
                this.loadData('');
            }
        },
        loadData(vType){ // carrega dados tela inicial
            this.loading = true;
            vdate = '';
            if(vType != 'init'){
                this.initStart = false;
                vdate = document.getElementById("date").value.split('/').reverse().join('-');
            }
            if(document.getElementById("log-result")){
                document.getElementById("log-result").innerHTML = "";
            }
            fetch(document.getElementById("route_list").value+'?date='+vdate)
                                .then(res => res.json())
                                .then(res => {
                                    if(this.initStart == true){
                                        let dtFormat = []
                                        res.dates.forEach(date => {
                                            dtFormat.push(date.split('-').reverse().join('/'))
                                        });
                                        this.dates = dtFormat; // Alimenta combo data somente no carregamento da tela
                                    }
                                    this.foodTable(res.data);
                                }).finally(() => {
                                    this.loading = false;
                                })
        },
        foodTable(data){ // Alimenta tabela
            let tbody = document.getElementById("log-result");
            tbody.innerHTML="";
            data.forEach(item => {
                let identification = (item.identification == "PRE_PAGAMENTO_FILE")? "Bruto": "Lote";
                let cssClass = `row-table-${item.status.toLowerCase()}`;
                tbody.insertRow().innerHTML = `
                            <td class="${cssClass}">${identification}</td>
                            <td class="${cssClass}">${item.type}</td>
                            <td class="${cssClass}">${item.file}</td>
                            <td class="${cssClass}">${item.description}</td>
                            <td class="${cssClass}">${item.created_at}</td>
                            `;
            })
        }
    }));

});