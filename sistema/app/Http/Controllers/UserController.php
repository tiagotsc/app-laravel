<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use DB;

class UserController extends Controller
{
    private $entity = 'users';

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    { 
        return view($this->entity.'.index',[
                        'entity' => $this->entity, # Entidade
                        'title' => 'Listar usuários', # título página
                        'route_list' => route('user.alldatajson'), # endereço requisição ajax principal
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
                                    'title' => 'Cadastrar usuário', # título página
                                    'method' => 'post', # método frm principal
                                    'route_list' => route('user.datajson',['']) # endereço requisição ajax principal
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
        $requestData = $request->all();
        if($request->password != ''){ // Se senha estiver sendo criada / alterada / resetada
            $requestData['password'] = Hash::make($request->password);
        }
        
        $data = User::create($requestData);
        $data->syncRoles($request->role);
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
                                    'title' => 'Alterar usuário', # título página
                                    'method' => 'put', # método frm principal
                                    'route_list' => route('user.datajson',[$id]), # endereço requisição ajax principal
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
        $data = User::find($id);
        $requestData = $request->all();
        if($request->password != ''){ // Se senha estiver sendo criada / alterada / resetada
            $requestData['password'] = Hash::make($request->password);
        }
        $status = $data->update($requestData);
        if($request->role != null){
            $data->syncRoles($request->role);
        }else{
            $data->syncRoles([]);
        }
        return response()->json(['status' => $status]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updatePassword(Request $request, $id)
    {
        $data = User::find($id);
        $requestData = $request->all();
        if($request->password != ''){ // Se senha estiver sendo criada / alterada / resetada
            $requestData['password'] = Hash::make($request->password);
        }
        $status = $data->update($requestData);

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
        $data = User::find($id);
        $status = $data->delete()? true: false;
        return response()->json(['status' => $status]);
    }

    /**
     * Traz dados de um único registro ou não
     */
    public function dataJson($id = '')
    {
        $datas = trim($id) != ''? User::find($id): new User();
        $allRoles = Role::orderBy('name')->get(['name']);
        $datas->roles->pluck('name');
        return response()->json(['data' => $datas, 
                                'allRoles' => $allRoles]);
    }

    /**
     * Traz dados de todos os registros
     */

    public function allDataJson()
    {
        $datas = DB::table('users as u')
                ->select('id','username', 'name', 'active', DB::raw('(SELECT COUNT(*) FROM model_has_roles m WHERE m.model_id = u.id) roles'))
                ->get();
        #$datas = User::orderBy('name')->get(['id','name', 'active']);
        return response()->json(['data' => $datas]);
    }
}
