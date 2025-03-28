/**
 * 
 * Script em AlpineJS, mas mescla com alguns recursos do Jquery
 */

// const MINIMUM_QUANTITY = 5000;
// const CHECK_DAYS = 90; // 90 dias usados para checar no encateiramento entre primeira compra até venda

// function managerFrm(){
//     return {
//         search: '', // campo de busca
//         data: {
//                 minimum_quantity: MINIMUM_QUANTITY, // Quantidade mínima default de ações
//                 check_days: 0 // Usados para checar se primeira compra até venda cai dentro da quantidade de dias informados
//             }, // dados do formulário
//         rules: {
//             encarteiramento: '>=', // A pessoa pode comprar ações
//             periodo_silencio: '=', // A pessoa não pode nem comprar ou vender
//             fato_relevante: '=' // A pessoa não pode nem comprar ou vender

//         }, // Regra do indicador
//         divName: false, // Div input name
//         divStartDate: false, // Div input data início
//         divEndDate: false, // Div input data fim
//         divNumberDays: false, // Div input quantidade de dias
//         divCheckDays: false, // Div da quantidade de dias de checagem
//         loading: false, // Loading botão
//         buttonLabel: 'Salvar', // Texto botão
//         startPage(){ // carrega ou configura dados na tela
//             document.getElementById("start_date").readOnly = true; 
//         },
//         exeCalculateDate(){ // Chama função que calcula data
//             calculateDate()
//         },
//         changeIndicator(value){ // Aplica todas a regras na tela de acordo com o tipo de stock trade escolhido
//             this.data.name = '';
//             this.data.start_date = '';
//             this.data.end_date = '';
//             this.data.number_days = '';
//             this.data.rule = '';
//             this.data.check_days = 0;
//             this.divName = false;
//             this.divStartDate = false;
//             this.divEndDate = false;
//             this.divNumberDays = false;
//             document.getElementById('start_date').value = '';
//             document.getElementById("start_date").readOnly = false;
//             document.getElementById('end_date').value = '';
//             $('#start_date').datepicker('destroy');
//             switch(value){
//                 case 'encarteiramento':
//                     this.divStartDate = true;
//                     this.divEndDate = true;
//                     this.divCheckDays = true;
//                     this.data.rule = this.rules.encarteiramento;
//                     this.data.check_days = CHECK_DAYS;
//                     calendar('#start_date');
//                     break;
//                 case 'fato_relevante':
//                     this.divName = true;
//                     this.divStartDate = true;
//                     this.divEndDate = true;
//                     this.divNumberDays = true;
//                     this.divCheckDays = false;
//                     document.getElementById("start_date").readOnly = true;
//                     this.data.number_days = 7;
//                     this.data.rule = this.rules.fato_relevante;
//                     break;
//                 case 'periodo_silencio':
//                     this.divStartDate = true;
//                     this.divEndDate = true;
//                     this.divCheckDays = false;
//                     this.data.rule = this.rules.periodo_silencio;
//                     calendar('#start_date');
//                     break;
//             }
//         },
//         submitData(){
//             if($("#frm").valid()){
//                 let referenceDate = document.getElementById('reference_date').value.split('/').reverse().join('-');
//                 this.data.reference_date = referenceDate+'-01';

//                 this.data.start_date = document.getElementById('start_date').value.split('/').reverse().join('-');
//                 this.data.end_date = document.getElementById('end_date').value.split('/').reverse().join('-');

//                 this.buttonLabel = 'Aguarde...'
//                 this.loading = true;
//                 let _method = document.querySelector('input[name="_method"]') !== null ? document.querySelector('input[name="_method"]').value: document.getElementById("frm").method;
                    
//                 this.data._method = _method;
//                 this.data._token = document.head.querySelector('meta[name=csrf-token]').content;

//                 fetch(document.getElementById("frm").action, {
//                         method: 'POST',
//                         headers: { 'Content-Type': 'application/json' },
//                         body: JSON.stringify(this.data)
//                 })
//                 .then((response) => { 
//                         if(response.ok != true){ // Se algo errado ocorrer
//                         Swal.fire("Algo errado!", "Se persistir, fale com o administrador!", "error");
//                         }
//                         response.json().then(data => {
//                         Swal.fire('Muito bom!', 'Em breve sairá o resultado!', 'success')
//                         })
//                 })
//                 .catch(() => {
//                     Swal.fire("Error grave!", "Se persistir, fale com o administrador!", "error");
//                 }).finally(() => {
//                     this.data = {minimum_quantity: MINIMUM_QUANTITY, check_days: 0};
//                     document.getElementById('start_date').value = '';
//                     document.getElementById('end_date').value = '';
//                     this.divName = false; // Div input name
//                     this.divStartDate = false; // Div input data início
//                     this.divEndDate = false; // Div input data fim
//                     this.divNumberDays = false; // Div input quantidade de dias
//                     this.divCheckDays = false; // Div da quantidade de dias de checagem
//                     this.loading = false;
//                     this.buttonLabel = 'Salvar';
//                 })
//             }
//         }
//     }
// }

/**
 * No padrão do AlpineJS CSP
 */
const MINIMUM_QUANTITY = 5000;
const CHECK_DAYS = 90; // 90 dias usados para checar no encateiramento entre primeira compra até venda
document.addEventListener('alpine:init', () => {
    
    Alpine.data("managerFrm", () => ({
        modalStatus: new bootstrap.Modal(document.getElementById('modal-status')),
        data: {
                minimum_quantity: MINIMUM_QUANTITY, // Quantidade mínima default de ações
                check_days: 0 // Usados para checar se primeira compra até venda cai dentro da quantidade de dias informados
            }, // dados do formulário
        rules: {
            encarteiramento: '>=', // A pessoa pode comprar ações
            periodo_silencio: '=', // A pessoa não pode nem comprar ou vender
            fato_relevante: '=' // A pessoa não pode nem comprar ou vender

        }, // Regra do indicador
        divName: false, // Div input name
        divStartDate: false, // Div input data início
        divEndDate: false, // Div input data fim
        divNumberDays: false, // Div input quantidade de dias
        divCheckDays: false, // Div da quantidade de dias de checagem
        loading: false, // Loading botão
        buttonLabel: 'Salvar', // Texto botão
        startPage(){ // carrega ou configura dados na tela
            document.getElementById("minimum_quantity").value = MINIMUM_QUANTITY;
            document.getElementById("check_days").value = 0;
            document.getElementById("start_date").readOnly = true; 

            // Combo tipo indicador
            let inputFileSelected = document.querySelector('#type')
            inputFileSelected.addEventListener('change', (event) => {
                this.changeIndicator(event)
            });
        },
        setModalStatus(title, msg){
            document.getElementById("title-modal-status").innerText = title;
            document.getElementById("desc-status-modal").innerText=msg;
        },
        exeCalculateDate(){ // Chama função que calcula data
            calculateDate()
        },
        changeIndicator(event){ // Aplica todas a regras na tela de acordo com o tipo de stock trade escolhido
            let value = event.target.value;
            this.data.name = '';
            document.getElementById("name").value = '';
            this.data.start_date = '';
            this.data.end_date = '';
            this.data.number_days = '';
            document.getElementById("number_days").value = '';
            this.data.rule = '';
            document.getElementById("rule").value = '';
            this.data.check_days = 0;
            document.getElementById("check_days").value = 0;
            this.divName = false;
            this.divStartDate = false;
            this.divEndDate = false;
            this.divNumberDays = false;
            document.getElementById('start_date').value = '';
            document.getElementById("start_date").readOnly = false;
            document.getElementById('end_date').value = '';
            $('#start_date').datepicker('destroy');
            switch(value){
                case 'encarteiramento':
                    this.divStartDate = true;
                    this.divEndDate = true;
                    this.divCheckDays = true;
                    this.data.rule = this.rules.encarteiramento;
                    document.getElementById("rule").value = this.rules.encarteiramento;
                    this.data.check_days = CHECK_DAYS;
                    document.getElementById("check_days").value = CHECK_DAYS;
                    calendar('#start_date');
                    break;
                case 'fato_relevante':
                    this.divName = true;
                    this.divStartDate = true;
                    this.divEndDate = true;
                    this.divNumberDays = true;
                    this.divCheckDays = false;
                    document.getElementById("start_date").readOnly = true;
                    this.data.number_days = 7;
                    document.getElementById("number_days").value = 7;
                    this.data.rule = this.rules.fato_relevante;
                    document.getElementById("rule").value = this.rules.fato_relevante;
                    break;
                case 'periodo_silencio':
                    this.divStartDate = true;
                    this.divEndDate = true;
                    this.divCheckDays = false;
                    this.data.rule = this.rules.periodo_silencio;
                    document.getElementById("rule").value = this.rules.periodo_silencio;
                    calendar('#start_date');
                    break;
            }
        },
        submitData(){
            if($("#frm").valid()){
                let referenceDate = document.getElementById('reference_date').value.split('/').reverse().join('-');
                this.data.reference_date = referenceDate+'-01';

                this.data.start_date = document.getElementById('start_date').value.split('/').reverse().join('-');
                this.data.end_date = document.getElementById('end_date').value.split('/').reverse().join('-');

                this.data.type = document.getElementById("type").value;
                this.data.rule = document.getElementById("rule").value;
                this.data.minimum_quantity = document.getElementById("minimum_quantity").value;
                this.data.number_days = document.getElementById("number_days").value;
                this.data.check_days = document.getElementById("check_days").value;
                this.data.name = document.getElementById("name").value;

                this.buttonLabel = 'Aguarde...'
                this.loading = true;
                let _method = document.querySelector('input[name="_method"]') !== null ? document.querySelector('input[name="_method"]').value: document.getElementById("frm").method;
                    
                this.data._method = _method;
                this.data._token = document.head.querySelector('meta[name=csrf-token]').content;
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
                            this.setModalStatus('Muito bom!','Em breve sairá o resultado!');
                        })
                })
                .catch(() => {
                    this.setModalStatus('Error grave!','Se persistir, fale com o administrador!');
                }).finally(() => {
                    this.data = {minimum_quantity: MINIMUM_QUANTITY, check_days: 0, name: '',start_date: '',end_date: ''};
                    document.getElementById("type").value = '';
                    document.getElementById("check_days").value = 0;
                    document.getElementById("minimum_quantity").value = MINIMUM_QUANTITY;
                    document.getElementById('start_date').value = '';
                    document.getElementById('end_date').value = '';
                    this.divName = false; // Div input name
                    this.divStartDate = false; // Div input data início
                    this.divEndDate = false; // Div input data fim
                    this.divNumberDays = false; // Div input quantidade de dias
                    this.divCheckDays = false; // Div da quantidade de dias de checagem
                    this.loading = false;
                    this.buttonLabel = 'Salvar';
                    this.modalStatus.show();
                })
            }
        }

    }));

});