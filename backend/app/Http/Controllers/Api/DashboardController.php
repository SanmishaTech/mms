<?php

namespace App\Http\Controllers\Api;

use App\Models\Profile;
use App\Models\Receipt;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Helpers\AmountToWordsHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\ReceiptResource;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Support\Collection;

class DashboardController extends BaseController
{
     /**
     * Dashboard
     */
    public function index(Request $request): JsonResponse
    {
        $profileCount = Profile::count();

        $today = now()->toDateString();
        $date = $today;

        $todayStart = now()->startOfDay();
        $todayEnd = now()->endOfDay();

        $todayAggregates = Receipt::query()
            ->whereBetween('created_at', [$todayStart, $todayEnd])
            ->selectRaw('COUNT(*) as receipt_count_today')
            ->selectRaw("SUM(CASE WHEN cancelled = 0 THEN amount ELSE 0 END) as total_amount_today")
            ->selectRaw("SUM(CASE WHEN cancelled = 1 THEN 1 ELSE 0 END) as cancelled_receipts")
            ->first();

        $receiptCountToday = (int)($todayAggregates->receipt_count_today ?? 0);
        $totalAmountToday = (float)($todayAggregates->total_amount_today ?? 0);
        $cancelledReceipts = (int)($todayAggregates->cancelled_receipts ?? 0);

        $poojaDetails = [];
        $poojaRowsQuery = DB::table('receipts')
            ->join('poojas', 'poojas.receipt_id', '=', 'receipts.id')
            ->leftJoin('pooja_types', 'pooja_types.id', '=', 'poojas.pooja_type_id')
            ->leftJoin('devtas', 'devtas.id', '=', 'pooja_types.devta_id')
            ->where('receipts.cancelled', false)
            ->where('poojas.date', $date)
            ->select([
                'receipts.name as name',
                'receipts.gotra as gotra',
                'receipts.email as email',
                'receipts.mobile as mobile',
                'pooja_types.pooja_type as pooja_type',
                'devtas.devta_name as devta_name',
                'poojas.date as date',
            ]);

        foreach ($poojaRowsQuery->cursor() as $row) {
            $poojaDetails[] = [
                'name' => $row->name,
                'gotra' => $row->gotra,
                'email' => $row->email,
                'mobile' => $row->mobile,
                'pooja_type' => $row->pooja_type,
                'devta_name' => $row->devta_name,
                'date' => $row->date,
            ];
        }
        $poojaDetails = collect($poojaDetails);

        $hallRows = DB::table('receipts')
            ->join('hall_receipts', 'hall_receipts.receipt_id', '=', 'receipts.id')
            ->where('receipts.receipt_type_id', 9)
            ->where('receipts.special_date', $today)
            ->where('receipts.cancelled', false)
            ->select([
                'receipts.id as receipt_id',
                'receipts.amount as amount',
                'receipts.name as name',
                'hall_receipts.hall as hall_name',
                'hall_receipts.from_time as from_time',
                'hall_receipts.to_time as to_time',
                'hall_receipts.ac_charges as ac_charges',
            ])
            ->get();

        // Step 1: Map raw data first
        $hallBookingData = $hallRows->map(function ($row) {
            $fromTime = $row->from_time ? \Carbon\Carbon::parse($row->from_time)->format('H:i:s') : null;
            $toTime = $row->to_time ? \Carbon\Carbon::parse($row->to_time)->format('H:i:s') : null;

            return [
                'receipt_id' => $row->receipt_id,
                'hall_name' => $row->hall_name ?? 'N/A',
                'from_time' => $fromTime ? \Carbon\Carbon::parse($fromTime)->format('h:i A') : 'N/A',
                'to_time' => $toTime ? \Carbon\Carbon::parse($toTime)->format('h:i A') : 'N/A',
                'raw_from' => $fromTime, // for comparison
                'raw_to' => $toTime,
                'amount' => $row->amount,
                'name' => $row->name,
                'isAC' => $row->ac_charges ?? false,
            ];
        });

// Step 2: Group by name + from_time + to_time
$grouped = $hallBookingData->groupBy(function ($item) {
    return $item['name'] . '|' . $item['raw_from'] . '|' . $item['raw_to'];
});

// Step 3: Filter only one per group, and mark duplicates
$finalData = $grouped->map(function ($group) {
    $item = $group->first();

    $item['isduplicate'] = $group->count() > 1;

    return $item;
})->values();
$finalCount = $finalData->count();

    
    
        $prasadRows = DB::table('receipts')
            ->where('receipt_type_id', 15)
            ->where('special_date', $today)
            ->where('cancelled', false)
            ->select([
                'id as receipt_id',
                'name as name',
                'amount as amount',
            ])
            ->get();

        $prasadReceiptDetails = $prasadRows->map(function ($row) {
            return [
                'receipt_id' => $row->receipt_id,
                'person_name' => $row->name ? $row->name : "N/A",
                'amount' => $row->amount,
            ];
        });

        $totalPoojas = $poojaDetails->count();
        $totalHallBookings = $hallRows->count();
        $totalPrasadCount = $prasadReceiptDetails->count();

        $sareeRow = DB::table('receipts')
            ->join('saree_receipts', 'saree_receipts.receipt_id', '=', 'receipts.id')
            ->where('receipts.cancelled', false)
            ->where('saree_receipts.saree_draping_date_morning', $date)
            ->select([
                'saree_receipts.saree_draping_date_morning as saree_draping_date_morning',
                'saree_receipts.return_saree as return_saree',
                'receipts.name as name',
                'receipts.gotra as gotra',
            ])
            ->first();

        if ($sareeRow) {
            $sareeDetails = [
                'saree_draping_date_morning' => $sareeRow->saree_draping_date_morning,
                'return_saree' => $sareeRow->return_saree,
                'name' => $sareeRow->name,
                'gotra' => $sareeRow->gotra,
            ];
        } else {
            $sareeDetails = null;
        }

        $uparaneRow = DB::table('receipts')
            ->join('uparane_receipts', 'uparane_receipts.receipt_id', '=', 'receipts.id')
            ->where('receipts.cancelled', false)
            ->where('uparane_receipts.uparane_draping_date_morning', $date)
            ->select([
                'receipts.name as name',
                'receipts.gotra as gotra',
            ])
            ->first();

        if ($uparaneRow) {
            $uparaneDetails = [
                'name' => $uparaneRow->name,
                'gotra' => $uparaneRow->gotra,
            ];
        } else {
            $uparaneDetails = null;
        }
                            
        return $this->sendResponse(["ProfileCount"=>$profileCount,
                                'ReceiptCount'=>$receiptCountToday,
                                'ReceiptAmount'=>$totalAmountToday,
                                'CancelledReceiptCount'=>$cancelledReceipts,
                                'PoojaDetails'=>$poojaDetails,
                                'HallBookingDetails'=>$finalData,
                                'PrasadReceiptDetails'=>$prasadReceiptDetails,
                                'PoojaCount'=>$totalPoojas,
                                'HallBookingCount'=>$finalCount,
                                'PrasadCount'=>$totalPrasadCount,
                                'SareeDetails'=>$sareeDetails,
                                'UparaneDetails'=>$uparaneDetails,
                                ], "Dashboard data retrieved successfully");
    }


    
    public function addACCharges(Request $request, string $receiptId): JsonResponse
{
    $ac_amount = $request->input("ac_amount");

    $originalReceipt = Receipt::with("hallReceipt")->find($receiptId);
    if (!$originalReceipt) {
        return $this->sendError("Receipt not found", ['error' => 'Receipt not found']);
    }

    if ($originalReceipt->receipt_type_id != 9) {
        return $this->sendError("Receipt is not a hall receipt", ['error' => 'Receipt is not a hall receipt']);
    }

    if (!$originalReceipt->hallReceipt) {
        return $this->sendError("Hall receipt not found", ['error' => 'Hall receipt not found']);
    }

    // ✅ Declare the variable here so it exists in outer scope
    $newReceipt = null;

    DB::transaction(function () use ($originalReceipt, $ac_amount, &$newReceipt, &$request) {
        // Clone and create new receipt
        $newReceipt = $originalReceipt->replicate();
        $newReceipt->receipt_no = Receipt::generateReceiptNumber();
        $newReceipt->receipt_date = now();
        $newReceipt->payment_mode =  $request->input("payment_mode");
        $newReceipt->upi_number =  $request->input("upi_number");
        $newReceipt->bank_details =  $request->input("bank_details");
        $newReceipt->cheque_date =  $request->input("cheque_date");
        $newReceipt->cheque_number =  $request->input("cheque_number");
        
        $newReceipt->amount = $ac_amount;
        $newReceipt->amount_in_words = AmountToWordsHelper::amountToWords($ac_amount);
        $newReceipt->print_count = 0;
        
        $newReceipt->created_by = auth()->user()->profile->id;
        $newReceipt->updated_by = auth()->user()->profile->id;
        $newReceipt->created_at = now();
        $newReceipt->updated_at = now();
        $newReceipt->save();

        // Clone and create new hall receipt
        $newHallReceipt = $originalReceipt->hallReceipt->replicate();
        $newHallReceipt->receipt_id = $newReceipt->id;
        $newHallReceipt->ac_charges = true;
        $newHallReceipt->ac_amount = $ac_amount;
        $newHallReceipt->created_at = now();
        $newHallReceipt->updated_at = now();
        $newHallReceipt->save();
    });

    return $this->sendResponse(['Receipt' => new ReceiptResource($newReceipt)], "New receipt with AC charges created successfully");
}


}