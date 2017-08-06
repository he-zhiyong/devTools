function testDataRequest(params, url) {
    if(!url){
        url = "bookList"
    }
    $.ajax({
        url: "./testData/"+url+".json",
        type: "GET",
        async:true,
        dataType:'json',
        success: function (result){
            if(result.success){
                dataHandle(result.data.content,params.query)
            }else{
                console.log("数据请求失败！")
            }
        },
        error:function() {
            console.log("数据请求错误！")
        }
    })
    function dataHandle(data,queryWords){
        if(queryWords.order){
            data = sort(data,queryWords.order,queryWords.orderType)
        }
        for(var key in queryWords){
            if(key != "offset" && key != "rows" && key != "order" && key != "orderType"){
                data = filter(data,key,queryWords[key])
            }
        }
        if(queryWords.rows){
            data = data.slice(queryWords.offset,queryWords.rows)
        }
        function filter(data,key,value) {
            if(data.length&&key&&data[0][key]){
                var newData = []
                for(var i = 0;i < data.length;i++){
                    if(data[i][key] === value){
                        newData.push(data[i])
                    }
                }
                return newData
            }else {
                return data
            }
        }
        function sort(data,key,sortType) {
            var ascSort = function (obj1, obj2) {
                var val1 = obj1[key];
                var val2 = obj2[key];
                if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                    val1 = Number(val1);
                    val2 = Number(val2);
                }
                if (val1 < val2) {
                    return -1;
                } else if (val1 > val2) {
                    return 1;
                } else {
                    return 0;
                }
            }
            var descSort = function (obj1, obj2) {
                var val1 = obj1[key];
                var val2 = obj2[key];
                if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                    val1 = Number(val1);
                    val2 = Number(val2);
                }
                if (val1 < val2) {
                    return 1;
                } else if (val1 > val2) {
                    return -1;
                } else {
                    return 0;
                }
            }
            switch(sortType){
                case "asc" :
                    return data.sort(ascSort)
                    break
                case "desc" :
                    return data.sort(descSort)
                    break
            }
        }
    }
}
var params = {
    SERVICE_ID:[22,10,1010],
    query:{PUBDATE:"2016.08",TYPE:"专著",offset:0,rows:10,order:"COLLECTION",orderType:"asc"}
}
testDataRequest(params,"bookList")