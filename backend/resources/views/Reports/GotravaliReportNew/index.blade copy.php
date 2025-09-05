<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
    
    body, div, p, h3, h4 {
        margin: 0;
        padding: 0;
        line-height: 2;
    }
    body {
        font-family: "freeserif";
        margin-bottom: 50px;
    }
    </style>
</head>
<body>
  
    @foreach($poojaTypeAndGotraCounts as $receiptType => $poojaTypeGroup) <!-- Loop through each receiptType -->
        <div style="width:100% margin-top:5px; padding:0px">
            <h3>{{ $receiptType }}</h3> <!-- Display the receipt type -->
        </div>

        @foreach($poojaTypeGroup as $poojaType => $gotraGroup) <!-- Loop through poojaType within the receiptType -->
            <div style="width:100% margin-top:5px; padding:0px">
                <h4>{{ $poojaType }}</h4> <!-- Display the poojaType -->
            </div>

            @foreach($gotraGroup as $gotra => $items) <!-- Loop through gotra within the poojaType -->
                <div style="margin:0px; padding:0px; border-bottom: 1px solid gray;">
                    <h4>गोत्र: {{ $gotra }}</h4>
                    <div style="margin:0px; padding:0px">
                        @foreach($items as $item)
                            <p>{{ $item['name'] }}</p> <!-- Print the name here -->
                        @endforeach
                    </div>
                    <p>एकुण: {{ $items->count() }}</p>
                </div>
            @endforeach

            @php
            $totalNamesForPoojaType = $gotraGroup->flatMap(function($gotraGroupItems) {
                return $gotraGroupItems->pluck('name'); // Collect names from all gotra groups
            })->count();
            @endphp
            <h4 style=" margin:10px 0px 15px; 0px;">एकुण {{$poojaType}}: {{$totalNamesForPoojaType}} </h4>
        @endforeach
    @endforeach

    <div style="margin:0px; padding:0px; border-bottom: 1px solid gray;">
    </div>
    <div style="display: flex; gap: 20px;">
        <!-- Saree Morning -->
        <div style="flex: 1;">
            <h4>साडी (सकाळ)</h4>
            <table border="1" width="100%" cellpadding="8" cellspacing="0">
                {{-- <thead>
                    <tr><th>नाव</th></tr>
                </thead> --}}
                <tbody>
                    @forelse ($sareeDetails as $item)
                        <tr>
                            <td>{{ $item['name'] ?? '' }}
                            </td>
                        </tr>
                    @empty
                        <tr><td>नोंद नाही</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    
        <!-- Saree Evening -->
        <div style="flex: 1;">
            <h4>साडी (संध्याकाळ)</h4>
            <table border="1" width="100%" cellpadding="8" cellspacing="0">
                {{-- <thead>
                    <tr><th>नाव</th></tr>
                </thead> --}}
                <tbody>
                    @forelse ($sareeEveningDetails as $item)
                        <tr>
                            <td>{{ $item['name'] ?? '' }}
                            </td>
                        </tr>
                    @empty
                        <tr><td>नोंद नाही</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
    
    <br>
    
    <div style="display: flex; gap: 20px;">
        <!-- Uparane Morning -->
        <div style="flex: 1;">
            <h4>उपरणे (सकाळ)</h4>
            <table border="1" width="100%" cellpadding="8" cellspacing="0">
                {{-- <thead>
                    <tr><th>नाव</th></tr>
                </thead> --}}
                <tbody>
                    @forelse ($uparaneDetails as $item)
                        <tr>
                            <td>{{ $item['name'] ?? '' }}
                            </td>
                        </tr>
                    @empty
                        <tr><td>नोंद नाही</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    
        <!-- Uparane Evening -->
        <div style="flex: 1;">
            <h4>उपरणे (संध्याकाळ)</h4>
            <table border="1" width="100%" cellpadding="8" cellspacing="0">
                {{-- <thead>
                    <tr><th>नाव</th></tr>
                </thead> --}}
                <tbody>
                    @forelse ($uparaneEveningDetails as $item)
                        <tr>
                            <td>{{ $item['name'] ?? '' }}
                            </td>
                        </tr>
                    @empty
                        <tr><td>नोंद नाही</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
    
  
</body>

</html>