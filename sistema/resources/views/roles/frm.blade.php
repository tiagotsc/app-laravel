@extends('layouts.app')

@section('includesScriptsAlpineJS')
    @parent
    <script nonce="{{ csp_nonce() }}" src="/js/{{$entity}}/alpinejs.frm.min.js"></script>
@endsection

@section('includePluginsJquery')
    @parent
    <!-- <script defer src="/assets/plugins/jquery.blockUI.js"></script>
    <script defer src="/assets/plugins/jquery.validate.min.js"></script>
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

<div class="container app-card app-card-settings shadow-sm p-4" x-data="managerFrm" x-init="loadData">
{!! Form::open(['id' => 'frm', 'method' => $method, 'route' => [$entity.(($id != '')? '.update':'.store'),$id]]) !!}
    <div class="row">
        <div class="form-group col-md-12">
        {!! Form::label('name', 'Nome', ['class' => 'form-label']) !!}<span class="mandatory">*</span>
        {!! Form::text('name', '', ['id' =>'name', 'class' => 'form-control', 'maxlength' => '50', 'placeholder' => 'Preencha...']) !!}
        </div>
    </div>
    <hr>
    <h5>Painel de permissões</h5>
    <div class="row">
        <div class="col-md-6">
            <label for="search" class="form-label">Pesquisar</label>
            <input class="form-control" id="search" id="search" placeholder="Pesquisar...">
        </div>
        <div class="col-md-6">
            <label for="search" class="form-label">Permissões disponíveis</label>
            <ul id="list_permission" class="list-group">
                <!-- <li class="list-group-item">
                    <input @click="allChecked" type="checkbox" id="allChecked">
                    <label for="allChecked"><b>Todas</b></label>
                </li> -->
                <!-- <template x-for="per in filteredIPermissions">
                    <li x-show="per.show" class="list-group-item"> 
                            <input type="checkbox" @click="selected(per.name)" x-bind:id="`permission[${per.name}]`" class="input_checkbox"
                            name="permission[`${per.name}`]" x-bind:value="`${per.name}`" 
                            x-bind:checked="selectall || (selectedPermissions.indexOf(per.name) >= 0 && clicked == false ? true : false)">
                        <label x-text="per.name" id="name" x-bind:for="`permission[${per.name}]`"></label>
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