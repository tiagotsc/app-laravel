@extends('layouts.app')

@section('includesScriptsAlpineJS')
    @parent
    <script src="/js/{{$entity}}/alpinejs.frm.min.js"></script>
@endsection

@section('includePluginsJquery')
    @parent
    <script defer src="/assets/plugins/jquery.validate.min.js"></script>
    <script defer src="/assets/plugins/sweetalert.min.js"></script>
@endsection

@section('title', $title)

@section('content')
<hr class="mb-4">
<div class="row">
    <div class="col-md-6">
        <input type="hidden" id="route_list" value="{{$route_list}}">
        <a href="{{route($entity.'.create')}}" data-toggle="tooltip" data-placement="top" title="Cadastrar"><i class="fas fa-plus fa-lg"></i></a>
    </div>
    <div class="col-md-6 d-flex justify-content-end">
        <a href="{{route($entity.'.index')}}" data-toggle="tooltip" data-placement="top" title="Voltar"><i class="bi bi-arrow-left fs-4"></i></a>
    </div>
</div>
<div x-data="managerFrm()" x-init="loadData()" class="container app-card app-card-settings shadow-sm p-4">
    
    {!! Form::open(['id' => 'frm', 'method' => $method, 'route' => [$entity.(($id != '')? '.update':'.store'),$id]]) !!}
    <div class="row">
        <div class="form-group col-md-12">
        {!! Form::label('name', 'Nome', ['class' => 'form-label']) !!}<span class="mandatory">*</span>
        {!! Form::text('name', '', ['x-model' =>'data.name', 'class' => 'form-control', 'maxlength' => '50', 'placeholder' => 'Preencha...']) !!}
        </div>
    </div>
    <div class="row">
        <div class="d-flex justify-content-end pt-3">
            <button @click="submitData()" id="save" class="btn app-btn-primary" type="button" x-text="buttonLabel" :disabled="loading"></button>
        </div>
    </div>
    {!! Form::close() !!}
</div>
@endsection

@section('includesJS')
    @parent
    <script defer src="/js/{{$entity}}/frm.min.js"></script>
@endsection