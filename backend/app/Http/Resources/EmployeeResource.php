<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = new UserResource(User::find($this->user_id));

        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'department_id' => $this->department_id,
            'employee_name' => $this->employee_name,
            'email' => $this->email,
            'mobile' => $this->mobile,
            'joining_date' => $this->joining_date,
            'resignation_date' => $this->resignation_date,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'user'=> $user,
        ];
    }
}