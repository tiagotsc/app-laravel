<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\DB;

class PermissionController extends Controller
{
    private $entity = 'permissions';

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    { 
        return view($this->entity.'.index',[
            'entity' => $this->entity, # Entidade
            'title' => 'Listar permissões', # título página
            'route_list' => route('permission.alldatajson'), # endereço requisição ajax principal
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view($this->entity.'.frm', [
            'id' => '', # id registro
            'entity' => $this->entity, # Entidade
            'title' => 'Cadastrar permissão', # título página
            'method' => 'post', # método frm principal
            'route_list' => route('permission.datajson',['']) # endereço requisição ajax principal
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = Permission::create(['name' => $request->name]);
        return response()->json(['status' => $data, 'redirect' => route($this->entity.'.edit',[$data->id])]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return view($this->entity.'.frm', [
            'id' => $id, # id registro
            'entity' => $this->entity, # Entidade
            'title' => 'Alterar permissão', # título página
            'method' => 'put', # método frm principal
            'route_list' => route('permission.datajson',[$id]), # endereço requisição ajax principal
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = Permission::find($id);
        $status = $data->update($request->all());
        return response()->json(['status' => $status]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Permission::find($id);
        $status = $data->delete()? true: false;
        return response()->json(['status' => $status]);
    }

    /**
     * Traz dados de um único registro ou não
     */
    public function dataJson($id = '')
    {
        $datas = trim($id) != ''? Permission::find($id): new Permission();
        return response()->json($datas);
    }

    /**
     * Traz dados de todos os registros
     */

    public function allDataJson()
    {
        $datas = DB::table('permissions as p')
                ->select('id', 'name', DB::raw('(SELECT COUNT(*) FROM role_has_permissions h WHERE h.permission_id = p.id) roles'))
                ->get();
        #$datas = Permission::orderBy('name')->get(['id','name']);
        return response()->json(['data' => $datas]);
    }
}
