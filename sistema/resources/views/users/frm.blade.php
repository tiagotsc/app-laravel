@extends('layouts.app')

@section('includesScriptsAlpineJS')
    @parent
    <script nonce="{{ csp_nonce() }}" src="/js/{{$entity}}/alpinejs.frm.min.js"></script>
@endsection

@section('includePluginsJquery')
    @parent
    <!-- <script defer src="/assets/plugins/jquery.validate.min.js"></script>
    <script defer src="/assets/plugins/jquery.blockUI.js"></script>
    <script defer src="/assets/plugins/sweetalert.min.js"></script> -->
@endsection

@section('title', $title)

@section('content')
<hr class="mb-4">
<div class="row">
    <div class="col-md-6">
        <input type="hidden" id="route_list" value="{{$route_list}}">
        <a href="{{route($entity.'.create')}}" data-toggle="tooltip" data-placement="top" title="Cadastrar"><i class="bi bi-plus-lg text-success fs-4"></i></a>
    </div>
    <div class="col-md-6 d-flex justify-content-end">
        <a href="{{route($entity.'.index')}}" data-toggle="tooltip" data-placement="top" title="Voltar"><i class="bi bi-arrow-left fs-4"></i></a>
    </div>
</div>
<div x-data="managerFrm" x-init="loadData" class="container app-card app-card-settings shadow-sm p-4">
    
    {!! Form::open(['id' => 'frm', 'method' => $method, 'route' => [$entity.(($id != '')? '.update':'.store'),$id]]) !!}
    <div class="row">
        <div class="form-group col-md-2">
        {!! Form::label('username', 'Username', ['class' => 'form-label']) !!}<span class="mandatory">*</span>
        {!! Form::text('username', '', ['id' =>'username', 'class' => 'form-control', 'maxlength' => '10', 'placeholder' => 'Preencha...']) !!}
        </div>
        <div class="form-group col-md-5">
        {!! Form::label('name', 'Nome', ['class' => 'form-label']) !!}<span class="mandatory">*</span>
        {!! Form::text('name', '', ['id' =>'name', 'class' => 'form-control', 'maxlength' => '255', 'placeholder' => 'Preencha...']) !!}
        </div>
        <div class="form-group col-md-5">
        {!! Form::label('email', 'Email', ['class' => 'form-label']) !!}<span class="mandatory">*</span>
        {!! Form::email('email', '', ['id' =>'email', 'class' => 'form-control', 'maxlength' => '255', 'placeholder' => 'Preencha...']) !!}
        </div>
    </div>
    <div class="row">
        <div class="form-group col-md-2">
        {!! Form::label('active', 'Status', ['class' => 'form-label']) !!}
        {!! Form::select('active', array('1'=>'Ativo','0'=>'Inativo'), '', ['id' =>'active', 'class' => 'form-select', 'readonly' => false]) !!}
        </div>
        <div class="form-group col-md-3">
        {!! Form::label('password', 'Nova senha', ['class' => 'form-label']) !!}
        {!! Form::password('password', ['id' =>'password', 'class' => 'form-control', 'maxlength' => '255', 'placeholder' => '']) !!}
        </div>
        <div class="form-group col-md-3">
        {!! Form::label('confirm_password', 'Confirme a nova senha', ['class' => 'form-label']) !!}
        {!! Form::password('confirm_password', ['class' => 'form-control', 'maxlength' => '255', 'placeholder' => '']) !!}
        </div>
    </div>
    <hr>
    <h5>Painel de perfis</h5>
    <div class="row">
        <div class="col-md-6">
            <label for="search" class="form-label">Pesquisar</label>
            <input class="form-control" id="search" id="search" placeholder="Pesquisar...">
        </div>
        <div class="col-md-6">
            <label for="search" class="form-label">Perfis disponíveis</label>
            <ul id="list_roles" class="list-group">
                <li class="list-group-item">
                    <input type="checkbox" id="allChecked">
                    <label for="allChecked"><b>Todos</b></label>
                </li>
                <!-- <template x-for="rol in filteredIRoles">
                    <li x-show="rol.show" class="list-group-item"> 
                            <input type="checkbox" @click="selected(rol.name)" x-bind:id="`role[${rol.name}]`" class="input_checkbox"
                            name="role[`${rol.name}`]" x-bind:value="`${rol.name}`" 
                            x-bind:checked="selectall || (selectedRoles.indexOf(rol.name) >= 0 && clicked == false ? true : false)">
                        <label x-text="rol.name" x-bind:for="`role[${rol.name}]`"></label>
                    </li>
                </template> -->
            </ul>
        </div>
    </div>
    <div class="row">
        <div class="d-flex justify-content-end pt-3">
            <button @click="submitData" id="save" class="btn app-btn-primary" type="button" x-text="buttonLabel" :disabled="loading"></button>
        </div>
    </div>
    {!! Form::close() !!}
</div>
@endsection

@section('includesJS')
    @parent
    <script defer nonce="{{ csp_nonce() }}" src="/js/{{$entity}}/frm.min.js"></script>
@endsection