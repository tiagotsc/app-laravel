<?php

namespace Modules\Deploy\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Deploy\Entities\Deploy;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DeployController extends Controller
{ # teste
    private $entity = 'deploy';
    private $repositories = [
        '' => 'Escolha o repositório',
        'predator' => 'predator', # Repositório do sistema
        'collects_data_scripts' => 'collects_data_scripts' # Repositório dos scripts de coleta
    ];
    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index()
    {
       # $data = new Deploy();
        
        #var_dump($data); exit;
        
        return view('deploy::index',[
            'entity' => $this->entity, # Entidade
            'title' => 'Gerenciar deploy do ambiente: '.env('APP_ENV'), # título página
            'repositories' => $this->repositories,
            'route_list' => route('deploy.alldatajson'), # endereço requisição ajax principal
        ]);
        #return view('deploy::index');
    }

    /**
     * Show the form for creating a new resource.
     * @return Renderable
     */
    /*public function create()
    {
        return view('deploy::create');
    }*/

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */
    public function store(Request $request)
    {

        $data = Deploy::create([
            'repository' => $request->repository,
            'enveronment' => env('APP_ENV'),
            'user_id' => Auth::id(),
            'action' => 'commit',
            'status' => 'pending'
        ]);
  
        return response()->json(['status' => $data]);
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Renderable
     */
    /*public function show($id)
    {
        return view('deploy::show');
    }*/

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Renderable
     */
    /*public function edit($id)
    {
        return view('deploy::edit');
    }*/

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Renderable
     */
    /*public function update(Request $request, $id)
    {
        //
    }*/

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Renderable
     */
    /*public function destroy($id)
    {
        //
    }*/

    public function allDataJson()
    {
        $datas = DB::table('deploys as d')
                ->select(
                    'd.id',
                    'repository', 
                    'enveronment', 
                    'description',
                    'status', 
                    DB::raw('DATE_FORMAT(d.created_at, "%d/%m/%y %H:%i:%s") as created_at'),
                    DB::raw('DATE_FORMAT(d.updated_at, "%d/%m/%y %H:%i:%s") as updated_at'),
                    DB::raw('(SELECT Substring_index(name," ",1) name FROM users u WHERE u.id = d.user_id) user_name')
                    )
                ->orderBy('d.id', 'desc')
                ->get();

        return response()->json(['data' => $datas]);
    }
}
