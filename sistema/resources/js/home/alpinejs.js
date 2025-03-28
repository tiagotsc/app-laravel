/**
 * 
 * Script em AlpineJS, mas mescla com alguns recursos do Jquery
 */

// function managerInit(){
// 	return {
//         data: [], // dados
//         qtyLoadDaysToHere: 0, // Quantidade de dias de carga até aqui
//         loading: false, // Loading botão
//         init: true, // Primeira execução função
//         loadData(){ // carrega dados tela inicial
//             this.loading = true;
//             let url = document.getElementById("panel_route_list").value.trim();
//             if(Boolean(url)){
//                 fetch(url)
//                 .then(res => res.json())
//                 .then(res => {
//                     this.data = res;
//                     $(function () {
//                         $('[data-toggle="tooltip"]').tooltip()
//                     });
//                 }).finally(() => {
//                     this.loading = false;
//                 })
//             }      
//         },
//         treatsData(value) {/**Verifica se valor é nulo, se for retorna string vazia */
//             if (value == null){
//                 return '';
//             }
//             return value;
//         }
//     }
// }

/**
 * Dentro dos padrões de CSP (Content-Security-Policy)
 */
document.addEventListener('alpine:init', () => {
    Alpine.data('managerInit', () => {
        return {
            data: [], // dados
            qtyLoadDaysToHere: 0, // Quantidade de dias de carga até aqui
            loading: false, // Loading botão
            initFunction: true, // Primeira execução função
            loadData(){ // carrega dados tela inicial
                this.loading = true;
                let url = document.getElementById("panel_route_list").value.trim();
                document.getElementById("dash-result").innerHTML = `
                <tr>
                    <td class="text-center" colspan="6"><b>Carregando...</b></td>
                </tr>`;
                if(Boolean(url)){
                    fetch(url)
                    .then(res => res.json())
                    .then(res => {
                        this.data = res;
                        let htmlResult = '';
                        res.forEach(data => {
                            // console.log(element);
                            htmlResult += `
                            <tr>
                                <td>
                                    <a href="${data.url}">
                                        <b data-toggle="tooltip" data-bs-placement="bottom" title="Ir até gestão de lotes | São tratados por: ${this.treatsData(data.responsible)}">${this.treatsData(data.monitoring)}</b>
                                    </a>
                                </td>
                                <td class="text-end">${this.treatsData(data.name_last_load)}</td> <!-- nome último lote gerado / carregado -->
                                <td class="text-end" data-toggle="tooltip" data-bs-placement="bottom" title="Dê ${this.treatsData(this.qtyLoadDaysToHere)} dias para cá foram baixados ${this.treatsData(data.qty_recently_downloaded)} lotes por completo">
                                    <span>${this.treatsData(data.dt_last_complete_download)}</span> <i class="fa fa-info-circle text-info" aria-hidden="true"></i>
                                </td> <!-- data última baixa completa -->
                                <td class="text-end">${this.treatsData(data.name_last_complete_download)}</td> <!-- último lote baixado completamente -->
                                <td class="text-end" data-toggle="tooltip" data-bs-placement="bottom" title="${this.treatsData(data.qty_pending_cases)} casos ainda estão pendentes de baixa em lotes ainda não baixados">
                                    <span>${this.treatsData(data.qty_pending_lots_low)}</span> <i class="fa fa-info-circle text-info" aria-hidden="true"></i>
                                </td> <!-- qtd. lote pendentes de baixa -->
                                <td class="text-end">${this.treatsData(data.qty_low_average_days)}</td> <!-- # dias em médias para baixa completa do lote -->
                            </tr>
                            `
                        });
                        document.getElementById("dash-result").innerHTML = htmlResult;
                        $(function () {
                            $('[data-toggle="tooltip"]').tooltip()
                        });
                    }).finally(() => {
                        this.loading = false;
                    })
                }      
            },
            treatsData(value) {/**Verifica se valor é nulo, se for retorna string vazia */
                if (Boolean(value) == false){
                    return '';
                }
                return value;
            }
        }
    })
});
