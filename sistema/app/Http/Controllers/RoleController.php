<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{

    private $entity = 'roles';

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view($this->entity.'.index',[
            'entity' => $this->entity, # Entidade
            'title' => 'Listar perfis', # título página
            'route_list' => route('role.alldatajson'), # endereço requisição ajax principal
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
            'title' => 'Cadastrar perfil', # título página
            'method' => 'post', # método frm principal
            'route_list' => route('role.datajson',['']) # endereço requisição ajax principal
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
        $data = Role::create(['name' => $request->name]);
        $data->syncPermissions($request->permission);
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
            'title' => 'Alterar perfil', # título página
            'method' => 'put', # método frm principal
            'route_list' => route('role.datajson',[$id]), # endereço requisição ajax principal
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
        $data = Role::find($id);
        $status = $data->update($request->all());
        $data->syncPermissions($request->permission);
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
        $data = Role::find($id);
        $status = $data->delete()? true: false;
        return response()->json(['status' => $status]);
    }

    /**
     * Traz dados de um único registro ou não
     */
    public function dataJson($id = '')
    {
        $datas = trim($id) != ''? Role::find($id): new Role();
        $datas->permissions->pluck('name');
        $allPermissions = Permission::orderBy('name')->get(['name']);
        return response()->json(['data' => $datas, 
                                'allPermissions' => $allPermissions 
                                ]);
    }

    /**
     * Traz dados de todos os registros
     */

    public function allDataJson()
    {
        $datas = DB::table('roles as r')
                ->select('id', 'name', 
                    DB::raw('(SELECT COUNT(*) FROM role_has_permissions h WHERE h.role_id = r.id) permissions'),
                    DB::raw('(SELECT COUNT(*) FROM model_has_roles h WHERE h.role_id = r.id) users')
                    )
                ->get();

        #$datas = Role::orderBy('name')->get(['id','name']);
        return response()->json(['data' => $datas]);
    }
}
