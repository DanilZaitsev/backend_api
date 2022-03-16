let inputObj = {
    "successIndicator": true,
    "code": "200 - OK",
    "data": {
        "network": {
            "networkId": 600001370,
            "networkCode": "NET003",
            "descriptionText": "test",
            "dialPlanSetCode": null,
            "retryNumber": 3,
            "time": {
                "startTime": "0800",
                "endTime": "1700"
            },
            "holidayTableCode": 0,
            "announcementInd": 0,
            "relatedCorp": {
                "corporationId": 600001261
            }
        }
    }
};

let fields = 'successIndicator,data.network.networkCode,data.network.time,data.network.provider';



function fieldFilter(inputObj, fields) {
    const fields1 = fields.split(',');
    let new_obj = {};
    for (let i = 0; i < fields1.length; i++) {
        getObj(new_obj, inputObj, fields1[i].split('.'));
    }
    console.log(JSON.stringify(new_obj));
}

function getObj(new_obj, obj, paths) {
    let local_obj = new_obj;
    for (let i = 0; i < paths.length; i++) {
        if (!local_obj[paths[i]]) {
            if (i === paths.length - 1)
                local_obj[paths[i]] = obj[paths[i]];
            else
                local_obj[paths[i]] = {};
        }
        local_obj = local_obj[paths[i]];
        obj = obj[paths[i]];
        if (!obj)
            break;
    }
    return obj;
}

fieldFilter(inputObj, fields);