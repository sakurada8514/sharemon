<?php

namespace App\Http\Controllers\Api\Income;

use App\Http\Controllers\Controller;
use App\Services\IncomeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IncomeCategoryController extends Controller
{
    private ?IncomeService $_incomeService = null;

    public function __construct(IncomeService $_incomeService)
    {
        $this->_incomeService = $_incomeService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $_roomId = Auth::user()->room_id;

        $_res = $this->_incomeService->findCategoryList($_roomId);

        return response()->json(['categoryList' => $_res]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
