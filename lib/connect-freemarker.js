var child_process = require('child_process');
var iconv = require("iconv-lite");
var path = require("path");
var os= require('os');



var __express = function(file, context, cb) {
    var jarFile = path.join(__dirname, "../jar/FMRender.jar");
    var destFile ="template.html";
    var self=this;
    var basename=path.basename(file);
    var dataModel =JSON.stringify(context);
	
    var settings = JSON.stringify({
        "encoding": "utf-8",
		"sharedVariables":{},
		"tagSyntax":context.settings.ftl.tagSyntax || 0,
		"autoIncludes":context.settings.ftl.autoIncludes || [],
        "viewFolder":context.settings.views
    });
    var resultData = "";
    var cmd = child_process.spawn('java', ["-jar", jarFile,
        settings,
        file.replace(context.settings.views,""),
        dataModel]);
    cmd.stdout.on("data", function(data) {
      resultData += iconv.decode(data, 'gbk');
    });

    cmd.stderr.on('data', function (data) {
       cb(null,iconv.decode(data, 'gbk'));
    });

    cmd.stdout.on("end", function() {
        cb(null,resultData);
    });
}
module.exports =__express;
