@extends('layouts.app')

@section('includesCSS')
    @parent
    <link id="theme-style" nonce="{{ csp_nonce() }}" rel="stylesheet" href="/css/deploys/index.min.css">
    <!-- <link id="theme-style" rel="stylesheet" href="/assets/plugins/datatables/datatables.min.css"> -->
    
@endsection

@section('includesScriptsAlpineJS')
    @parent
    <script nonce="{{ csp_nonce() }}" src="/js/{{$entity}}s/alpinejs.frm.min.js"></script>
@endsection

@section('includePluginsJquery')
    @parent
    <!-- <script defer src="/assets/plugins/jquery.validate.min.js"></script>
    <script defer src="/assets/plugins/datatables/datatables.min.js"></script>
    <script defer src="/assets/plugins/sweetalert.min.js"></script> -->
@endsection

@section('title', $title)

@section('content')
<hr class="mb-4">
<div x-data="managerFrm" class="row g-4 settings-section mb-3">

    <div class="col-12 col-md-12">

        <div class="alert alert-info" role="alert">
            <b>Observação:</b> Após o agendamento, aguarde 5 minutos e retorne para conferir o status.
        </div>

        <div class="container app-card app-card-settings shadow-sm p-4">
            <input type="hidden" id="enveroment" value="{{env('APP_ENV')}}">
            <input type="hidden" id="route_list" value="{{$route_list}}">
            {!! Form::open(['id' => 'frm', 'method' => 'post', 'route' => ['deploy.store']]) !!}
            <div class="row">
                <div class="form-group col-md-12">
                {!! Form::label('repository', 'Repositório', ['class' => 'form-label']) !!}<span class="mandatory">*</span>
                {!! Form::select('repository', $repositories, '', ['id' =>'repository', 'class' => 'form-select', 'readonly' => false]) !!}
                </div>
            </div>
            <div class="row">
                <div class="d-flex justify-content-end pt-3">
                    <button @click="submitData" id="save" class="btn app-btn-primary" type="button" x-text="buttonLabel" :disabled="loading"></button>
                </div>
            </div>
            {!! Form::close() !!}
        </div>
    </div>

    <!-- Modal confirm low -->
    <div class="modal fade" id="modal-confirm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="confirmModalLabel">
                    Deseja agendar o deploy para o ambiente <span id="env"></span>?
                </h1>
            </div>
            <div class="modal-body text-center">
                <p><b>Repositório: </b><span id="repo"></span></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="bt-close-confirm" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" id="confirm" @click="save" class="btn btn-danger text-white">Sim</button>
            </div>
            </div>
        </div>
    </div>
</div>

<div class="row g-4 settings-section">
    <div class="col-12 col-md-12">
        <div class="app-card app-card-settings shadow-sm p-4">
            <table id="list" class="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Repositório</th>
                        <th>Ambiente</th>
                        <th>Solicitante</th>
                        <!--<th>Ação</th>-->
                        <th>Status</th>
                        <th>Dt. crição</th>
                        <th>Dt. aplicação</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>  
    </div>
</div><!--//row-->
@endsection

@section('includesJS')
    @parent
    <script defer nonce="{{ csp_nonce() }}" src="/js/{{$entity}}s/index.min.js"></script>
@endsection
