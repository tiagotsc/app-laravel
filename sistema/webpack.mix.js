const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js').postCss('resources/css/app.css', 'public/css', [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
]);

mix.styles([
    'resources/css/customized.css'
], 'public/css/customized.min.css');

/**
 * Inclui icones bootstrap
 */
mix.sass('resources/sass/app.scss', 'public/css/additional_template.css');

/**
 * Alpine Script usado em todo o sistema
 */
mix.scripts([
    'resources/js/alpinejs.main.js'
], 'public/js/alpinejs.main.min.js');

/**
 * Util js usado em todo o sistema
 */
 mix.scripts([
    'resources/js/util.js'
], 'public/js/util.min.js');

/**
 * Bootstrap util js usado em todo o sistema
 */
 mix.scripts([
    'resources/js/bootstrap-util.js'
], 'public/js/bootstrap-util.min.js');

/**
 * BASE - arquivos, que não costumam ser alterados, compartilhados por diversos módulos
 */
mix.styles([
    'resources/css/base/batch/index.css'
], 'public/css/base/batch/index.min.css'); // Script Css
mix.scripts([ // Tela de log
    'resources/js/base/log/alpinejs.frm.js'
], 'public/js/base/log/alpinejs.frm.min.js'); // Script Alpine
mix.scripts([ // Tela upload
    'resources/js/base/file_return/alpinejs.upload.js'
], 'public/js/base/file_return/alpinejs.upload.min.js'); // Script Alpine
mix.scripts([
    'resources/js/base/file_return/upload.js'
], 'public/js/base/file_return/upload.min.js'); // Script Jquery
mix.scripts([ // Tela resultado
    'resources/js/base/result/alpinejs.js'
], 'public/js/base/result/alpinejs.min.js'); // Script Alpine
mix.scripts([
    'resources/js/base/result/index.js'
], 'public/js/base/result/index.min.js'); // Script Jquery

/**
 * Home
 */
mix.scripts([
    'resources/js/home/alpinejs.js'
], 'public/js/home/alpinejs.min.js'); // Script Alpine
mix.scripts([
    'resources/js/home/home.js'
], 'public/js/home/home.min.js'); // Script Jquery


/**
 * Usuário
 */
 mix.scripts([
    'resources/js/users/alpinejs.frm.js'
], 'public/js/users/alpinejs.frm.min.js'); // Script Alpine
mix.scripts([
    'resources/js/users/frm.js'
], 'public/js/users/frm.min.js'); // Script Jquery
mix.scripts([
    'resources/js/users/index.js'
], 'public/js/users/index.min.js'); // Script Jquery

/**
 * Permissões
 */
 mix.scripts([
    'resources/js/permissions/alpinejs.frm.js'
], 'public/js/permissions/alpinejs.frm.min.js'); // Script Alpine
mix.scripts([
    'resources/js/permissions/frm.js'
], 'public/js/permissions/frm.min.js'); // Script Jquery
mix.scripts([
    'resources/js/permissions/index.js'
], 'public/js/permissions/index.min.js'); // Script Jquery

/**
 * Perfis
 */
 mix.scripts([
    'resources/js/roles/alpinejs.frm.js'
], 'public/js/roles/alpinejs.frm.min.js'); // Script Alpine
mix.scripts([
    'resources/js/roles/frm.js'
], 'public/js/roles/frm.min.js'); // Script Jquery
mix.scripts([
    'resources/js/roles/index.js'
], 'public/js/roles/index.min.js'); // Script Jquery

/**
 * Módulo Deploy
 */
mix.scripts([
    'resources/js/deploys/alpinejs.frm.js'
], 'public/js/deploys/alpinejs.frm.min.js'); // Script Alpine
mix.scripts([
    'resources/js/deploys/index.js'
], 'public/js/deploys/index.min.js'); // Script Jquery
mix.styles([
    'resources/css/deploys/index.css'
], 'public/css/deploys/index.min.css'); // Script Css

/**
 * Módulo Credentials
 */
 mix.scripts([
    'resources/js/credentials/alpinejs.frm.js'
], 'public/js/credentials/alpinejs.frm.min.js'); // Script Alpine
mix.scripts([
    'resources/js/credentials/index.js'
], 'public/js/credentials/index.min.js'); // Script Jquery
mix.styles([
    'resources/css/credentials/index.css'
], 'public/css/credentials/index.min.css'); // Script Css


/**
 * Módulo Stock trade - GH
 */
 mix.scripts([
    'resources/js/stocktrade/gh/alpinejs.frm.js'
], 'public/js/stocktrade/gh/alpinejs.frm.min.js'); // Script Alpine
mix.scripts([
    'resources/js/stocktrade/gh/index.js'
], 'public/js/stocktrade/gh/index.min.js'); // Script Jquery
mix.styles([
    'resources/css/stocktrade/gh/index.css'
], 'public/css/stocktrade/gh/index.min.css'); // Script Css

/**
 * Módulo Stock trade - Counselors
 */
 mix.scripts([
    'resources/js/stocktrade/counselors/alpinejs.frm.js'
], 'public/js/stocktrade/counselors/alpinejs.frm.min.js'); // Script Alpine
mix.scripts([
    'resources/js/stocktrade/counselors/index.js'
], 'public/js/stocktrade/counselors/index.min.js'); // Script Jquery
mix.styles([
    'resources/css/stocktrade/counselors/index.css'
], 'public/css/stocktrade/counselors/index.min.css'); // Script Css

/**
 * Módulo Stock trade - Log
 */
 mix.scripts([
    'resources/js/stocktrade/log/alpinejs.frm.js'
], 'public/js/stocktrade/log/alpinejs.frm.min.js'); // Script Alpine

/**
 * Módulo Stock trade - Indicator
 */
 mix.scripts([
    'resources/js/stocktrade/indicator/index.js'
], 'public/js/stocktrade/indicator/index.min.js'); // Tela de pesquisa - Script Jquery
mix.styles([
    'resources/css/stocktrade/indicator/index.css'
], 'public/css/stocktrade/indicator/index.min.css'); // Tela de pesquisa - Script Css
 mix.scripts([
    'resources/js/stocktrade/indicator/alpinejs.frm.js'
], 'public/js/stocktrade/indicator/alpinejs.frm.min.js'); // Cadastro indicador - Script Alpine 
mix.scripts([
    'resources/js/stocktrade/indicator/frm.js'
], 'public/js/stocktrade/indicator/frm.min.js'); // Cadastro indicador - Script Jquery
mix.scripts([
    'resources/js/stocktrade/indicator/alpinejs.upload.js'
], 'public/js/stocktrade/indicator/alpinejs.upload.min.js'); // Tela upload - Script Alpine
mix.scripts([
    'resources/js/stocktrade/indicator/upload.js'
], 'public/js/stocktrade/indicator/upload.min.js'); // Tela upload - Script Jquery

/**
 * Módulo Stock trade - Painel
 */
 mix.scripts([
    'resources/js/stocktrade/panel/index.js'
], 'public/js/stocktrade/panel/index.min.js'); // Script Jquery

/**
 * Módulo Stock trade - Investidor
 */
 mix.scripts([
    'resources/js/stocktrade/investor/index.js'
], 'public/js/stocktrade/investor/index.min.js'); // Script Jquery

/**
 * Módulo Mail
 */
 mix.scripts([
    'resources/js/mails/index.js'
], 'public/js/mails/index.min.js'); // Tela de pesquisa - Script Jquery
mix.styles([
    'resources/css/mails/index.css'
], 'public/css/mails/index.min.css'); // Tela de pesquisa - Script Css
 mix.scripts([
    'resources/js/mails/alpinejs.frm.js'
], 'public/js/mails/alpinejs.frm.min.js'); // Cadastro mail - Script Alpine 
mix.scripts([
    'resources/js/mails/frm.js'
], 'public/js/mails/frm.min.js'); // Cadastro mail - Script Jquery

/**
 * Módulo Pré pagamento
 */
mix.styles([
    'resources/css/prepayment/batch/index.css'
], 'public/css/prepayment/batch/index.min.css'); // Tela de pesquisa de lote - Script Css
mix.scripts([
    'resources/js/prepayment/batch/index.js'
], 'public/js/prepayment/batch/index.min.js'); // Tela de pesquisa de lote - Script Jquery
mix.scripts([
    'resources/js/prepayment/batch/alpinejs.upload.js'
], 'public/js/prepayment/batch/alpinejs.upload.min.js'); // Tela upload de retorno - Script Alpine
mix.scripts([
    'resources/js/prepayment/batch/upload.js'
], 'public/js/prepayment/batch/upload.min.js'); // Tela upload de retorno - Script Jquery
mix.scripts([
    'resources/js/prepayment/log/alpinejs.frm.js'
], 'public/js/prepayment/log/alpinejs.frm.min.js'); // Tela de log - Script Alpine
mix.scripts([
    'resources/js/prepayment/parameters/frm.js'
], 'public/js/prepayment/parameters/frm.min.js'); // Tela de parâmetros - Script Jquery
mix.scripts([
    'resources/js/prepayment/parameters/alpinejs.frm.js'
], 'public/js/prepayment/parameters/alpinejs.frm.min.js'); // Tela de parâmetros - Script Alpine
mix.scripts([
    'resources/js/prepayment/result/index.js'
], 'public/js/prepayment/result/index.min.js'); // Tela de resultado - Script Jquery
mix.scripts([
    'resources/js/prepayment/result/alpinejs.js'
], 'public/js/prepayment/result/alpinejs.min.js'); // Tela de resultado - Script Alpine

/**
 * Módulo Documentos
 */
// Categoria
mix.scripts([
    'resources/js/doc/category/index.js'
], 'public/js/doc/category/index.min.js'); // Tela de pesquisa - Script Jquery
mix.scripts([
    'resources/js/doc/category/alpinejs.frm.js'
], 'public/js/doc/category/alpinejs.frm.min.js'); // Tela cadastro /alteração - Script Alpine
mix.scripts([
    'resources/js/doc/category/frm.js'
], 'public/js/doc/category/frm.min.js'); // Tela cadastro / alteração - Script Jquery
// Arquivos
mix.styles([
    'resources/css/doc/doc/index.css'
], 'public/css/doc/doc/index.min.css'); // Tela de pesquisa - Script Css
mix.scripts([
    'resources/js/doc/doc/index.js'
], 'public/js/doc/doc/index.min.js'); // Tela de pesquisa - Script Jquery
mix.scripts([
    'resources/js/doc/doc/alpinejs.frm.js'
], 'public/js/doc/doc/alpinejs.frm.min.js'); // Tela cadastro /alteração - Script Alpine

/**
 * Módulo Restituição de valor
 */
mix.scripts([
    'resources/js/restitutionvalue/log/alpinejs.frm.js'
], 'public/js/restitutionvalue/log/alpinejs.frm.min.js'); // Tela de log - Script Alpine
mix.styles([
    'resources/js/restitutionvalue/parameters/alpinejs.frm.js'
], 'public/js/restitutionvalue/parameters/alpinejs.frm.min.js'); // Tela de parâmetro - Script Alpine
mix.styles([
    'resources/js/restitutionvalue/parameters/frm.js'
], 'public/js/restitutionvalue/parameters/frm.min.js'); // Tela de parâmetro - Script Jquery
mix.scripts([
    'resources/js/restitutionvalue/upload/alpinejs.frm.js'
], 'public/js/restitutionvalue/upload/alpinejs.frm.min.js'); // Tela de upload - Script Alpine 
mix.scripts([
    'resources/js/restitutionvalue/upload/frm.js'
], 'public/js/restitutionvalue/upload/frm.min.js'); // Tela de upload - Script Jquery
mix.scripts([
    'resources/js/restitutionvalue/batch/alpinejs.upload.js'
], 'public/js/restitutionvalue/batch/alpinejs.upload.min.js'); // Tela de baixa - Script Alpine 
mix.scripts([
    'resources/js/restitutionvalue/batch/upload.js'
], 'public/js/restitutionvalue/batch/upload.min.js'); // Tela de baixa - Script Jquery
mix.scripts([
    'resources/js/restitutionvalue/batch/index.js'
], 'public/js/restitutionvalue/batch/index.min.js'); // Tela de gerenciamento de lotes - Script Jquery
mix.scripts([
    'resources/js/restitutionvalue/result/index.js'
], 'public/js/restitutionvalue/result/index.min.js'); // Tela de resultado - Script Jquery
mix.scripts([
    'resources/js/restitutionvalue/result/alpinejs.js'
], 'public/js/restitutionvalue/result/alpinejs.min.js'); // Tela de resultado - Script Alpine
mix.styles([
    'resources/css/restitutionvalue/batch/index.css'
], 'public/css/restitutionvalue/batch/index.min.css'); // Tela de gerenciamento de lotes - Script Css


/**
 * Módulo Compra Spot
 */
mix.scripts([
    'resources/js/spotpurchase/log/alpinejs.frm.js'
], 'public/js/spotpurchase/log/alpinejs.frm.min.js'); // Tela de log - Script Alpine
mix.styles([
    'resources/js/spotpurchase/parameters/alpinejs.frm.js'
], 'public/js/spotpurchase/parameters/alpinejs.frm.min.js'); // Tela de parâmetro - Script Alpine
mix.styles([
    'resources/js/spotpurchase/parameters/frm.js'
], 'public/js/spotpurchase/parameters/frm.min.js'); // Tela de parâmetro - Script Jquery
mix.scripts([
    'resources/js/spotpurchase/batch/alpinejs.upload.js'
], 'public/js/spotpurchase/batch/alpinejs.upload.min.js'); // Tela de retorno do lote - Script Alpine 
mix.scripts([
    'resources/js/spotpurchase/batch/upload.js'
], 'public/js/spotpurchase/batch/upload.min.js'); // Tela de retorno do lote - Script Jquery 
mix.scripts([
    'resources/js/spotpurchase/batch/index.js'
], 'public/js/spotpurchase/batch/index.min.js'); // Tela de pesquisa do lote - Script Jquery
mix.scripts([
    'resources/js/spotpurchase/upload/alpinejs.frm.js'
], 'public/js/spotpurchase/upload/alpinejs.frm.min.js'); // Tela de upload de lote para geração - Script Alpine 
mix.scripts([
    'resources/js/spotpurchase/upload/frm.js'
], 'public/js/spotpurchase/upload/frm.min.js'); // Tela de upload de lote para geração - Script Jquery 
mix.scripts([
    'resources/js/spotpurchase/result/index.js'
], 'public/js/spotpurchase/result/index.min.js'); // Tela de resultado - Script Jquery
mix.scripts([
    'resources/js/spotpurchase/result/alpinejs.js'
], 'public/js/spotpurchase/result/alpinejs.min.js'); // Tela de resultado - Script Alpine
mix.styles([
    'resources/css/spotpurchase/batch/index.css'
], 'public/css/spotpurchase/batch/index.min.css'); // Tela de gerenciamento de lotes - Script Css

/**
 * Módulo Contestação FTTH
 */
mix.scripts([
    'resources/js/contestationftth/log/alpinejs.frm.js'
], 'public/js/contestationftth/log/alpinejs.frm.min.js'); // Tela de log - Script Alpine
mix.scripts([
    'resources/js/contestationftth/parameters/alpinejs.frm.js'
], 'public/js/contestationftth/parameters/alpinejs.frm.min.js'); // Tela de parâmetro - Script Alpine
mix.scripts([
    'resources/js/contestationftth/parameters/frm.js'
], 'public/js/contestationftth/parameters/frm.min.js'); // Tela de parâmetro - Script Jquery
mix.scripts([
    'resources/js/contestationftth/batch/alpinejs.upload.js'
], 'public/js/contestationftth/batch/alpinejs.upload.min.js'); // Tela de retorno do lote - Script Alpine 
mix.scripts([
    'resources/js/contestationftth/batch/upload.js'
], 'public/js/contestationftth/batch/upload.min.js'); // Tela de retorno do lote - Script Jquery 
mix.scripts([
    'resources/js/contestationftth/batch/index.js'
], 'public/js/contestationftth/batch/index.min.js'); // Tela de pesquisa do lote - Script Jquery
mix.scripts([
    'resources/js/contestationftth/result/index.js'
], 'public/js/contestationftth/result/index.min.js'); // Tela de resultado - Script Jquery
mix.scripts([
    'resources/js/contestationftth/result/alpinejs.js'
], 'public/js/contestationftth/result/alpinejs.min.js'); // Tela de resultado - Script Alpine
mix.styles([
    'resources/css/contestationftth/batch/index.css'
], 'public/css/contestationftth/batch/index.min.css'); // Tela de gerenciamento de lotes - Script Css

/**
 * Módulo Crediv
 */
mix.scripts([
    'resources/js/crediv/parameters/alpinejs.frm.js'
], 'public/js/crediv/parameters/alpinejs.frm.min.js'); // Tela de parâmetro - Script Alpine
mix.scripts([
    'resources/js/crediv/parameters/frm.js'
], 'public/js/crediv/parameters/frm.min.js'); // Tela de parâmetro - Script Jquery
// mix.scripts([
//     'resources/js/crediv/batch/alpinejs.upload.js'
// ], 'public/js/crediv/batch/alpinejs.upload.min.js'); // Tela de retorno do lote - Script Alpine 
// mix.scripts([
//     'resources/js/crediv/batch/upload.js'
// ], 'public/js/crediv/batch/upload.min.js'); // Tela de retorno do lote - Script Jquery 
mix.scripts([
    'resources/js/crediv/batch/index.js'
], 'public/js/crediv/batch/index.min.js'); // Tela de pesquisa do lote - Script Jquery
// mix.scripts([
//     'resources/js/crediv/result/index.js'
// ], 'public/js/crediv/result/index.min.js'); // Tela de resultado - Script Jquery
// mix.scripts([
//     'resources/js/crediv/result/alpinejs.js'
// ], 'public/js/crediv/result/alpinejs.min.js'); // Tela de resultado - Script Alpine
// mix.styles([
//     'resources/css/crediv/batch/index.css'
// ], 'public/css/crediv/batch/index.min.css'); // Tela de gerenciamento de lotes - Script Css



/**
 * Módulo Cancelamento R1
 */
mix.scripts([
    'resources/js/cancelamentor1/parameters/alpinejs.frm.js'
], 'public/js/cancelamentor1/parameters/alpinejs.frm.min.js'); // Tela de parâmetro - Script Alpine
mix.scripts([
    'resources/js/cancelamentor1/parameters/frm.js'
], 'public/js/cancelamentor1/parameters/frm.min.js'); // Tela de parâmetro - Script Jquery
mix.scripts([
    'resources/js/cancelamentor1/batch/index.js'
], 'public/js/cancelamentor1/batch/index.min.js'); // Tela de pesquisa do lote - Script Jquery