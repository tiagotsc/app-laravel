document.addEventListener('alpine:init', () => {
    // Alpine.data("main", () => ({
    //     btn_block: true,
    //     new_password: '',
    //     again_new_password: '',
    //     message1: '',
    //     show1: false,
    //     message2: '',
    //     show2: false,
    //     statusResetPass: '',
    //     clearFrmResetPass(){
    //         this.statusResetPass = '';
    //         this.new_password = '';
    //         this.again_new_password = '';
    //         this.show1 = false;
    //         this.show2 = false;
    //     },
    //     validationResetPassword(){
            
    //         if(this.new_password.trim() != '' && this.new_password.trim().length < 8){
    //             this.message1 = 'Mínimo de 8 caracteres!';
    //             this.show1 = true;
    //         }else{
    //             this.message1 = '';
    //             this.show1 = false;
    //         }

    //         if(this.again_new_password.trim() != '' && this.again_new_password.trim() != this.new_password.trim()){
    //             this.message2 = 'Senha diferente!';
    //             this.show2 = true;
    //         }else{
    //             this.message2 = '';
    //             this.show2 = false;
    //         }

    //         if(this.show1 == false && this.show2 == false && this.again_new_password.trim() == this.new_password.trim()){
    //             this.btn_block = false;
    //         }else{
    //             this.btn_block = true;
    //         }
            
    //     },
    //     resetPassword(){

    //         let formResetPass = {
    //             password: this.new_password,
    //             _method: 'PUT',
    //             _token: document.head.querySelector('meta[name=csrf-token]').content
    //         };

    //         fetch(document.getElementById("frm-reset-password").action, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(formResetPass)
    //         })
    //         .then((response) => { 
    //             if(response.ok){
    //                 this.statusResetPass = '<b class="color-blue">Senha alterada com sucesso!</b>';
    //             }else{
    //                 this.statusResetPass = '<b class="color-red">Algo errado! Se persistir, fale com o administrador!</b>';
    //             }
    //         })
    //         .catch(() => {
    //             this.statusResetPass = '<b class="color-red">Error grave! Se persistir, fale com o administrador!</b>';
    //         }).finally(() => {
    //             this.new_password = '';
    //             this.again_new_password = '';
    //             this.btn_block = true
    //         })
    //     }

    // }))
    
    Alpine.data('main', () => {
        return {
            btAlterPsw: 'Alterar',
            execAlter: false,
            btn_block: true,
            message1: '',
            show1: false,
            message2: '',
            show2: false,
            statusResetPass: '',
            clearFrmResetPass(){
                this.statusResetPass = '';
                document.getElementById("new_password").value = "";
                document.getElementById("again_new_password").value = "";
                this.show1 = false;
                this.show2 = false;
            },
            validationResetPassword(){
                let new_password = document.getElementById("new_password").value;
                let again_new_password = document.getElementById("again_new_password").value;
                if(new_password.trim() != '' && new_password.trim().length < 8){
                    this.message1 = 'Mínimo de 8 caracteres!';
                    this.show1 = true;
                }else{
                    this.message1 = '';
                    this.show1 = false;
                }

                if(again_new_password.trim() != '' && again_new_password.trim() != new_password.trim()){
                    this.message2 = 'Senha diferente!';
                    this.show2 = true;
                }else{
                    this.message2 = '';
                    this.show2 = false;
                }

                if(this.show1 == false && this.show2 == false && again_new_password.trim() == new_password.trim()){
                    this.btn_block = false;
                }else{
                    this.btn_block = true;
                }
                
            },
            resetPassword(){
                this.btn_block = true;
                let formResetPass = {
                    password: document.getElementById("new_password").value,
                    _method: 'PUT',
                    _token: document.head.querySelector('meta[name=csrf-token]').content
                };

                this.btAlterPsw = 'Alterando...';
                this.execAlter = true;
                fetch(document.getElementById("frm-reset-password").action, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formResetPass)
                })
                .then((response) => { 
                    if(response.ok){
                        this.statusResetPass = '<b class="color-blue">Senha alterada com sucesso!</b>';
                    }else{
                        this.statusResetPass = '<b class="color-red">Algo errado! Se persistir, fale com o administrador!</b>';
                    }
                })
                .catch(() => {
                    this.statusResetPass = '<b class="color-red">Error grave! Se persistir, fale com o administrador!</b>';
                }).finally(() => {
                    document.getElementById("new_password").value = "";
                    document.getElementById("again_new_password").value = "";
                    this.btn_block = true;
                    this.btAlterPsw = "Alterar";
                    this.execAlter = false;
                })
            }
        }
    })
});