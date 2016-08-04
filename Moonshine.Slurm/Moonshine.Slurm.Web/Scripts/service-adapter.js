/*
 * ServiceAdapter service-adapter.js
 * https://github.com/timwilkbrandt/service-adapter
 * Author: Tim Wilk Brandt
 * Version: 1.0
 * CreateDate: 2015-5-07
 * ModifyData: 2015-5-07
 */

var serviceAdapter = function () {

    var _this = this;

    this.responseData = null;
    this.responseXml = null;
    this.responseText = null;
    this.responseJson = null;

    this.settings = {
        isAsync: true,
        method: '',
        url: '',
        enctype: '',
        contentType: '',
        isJson: false,
        data: null,
        enableLogging: true
    };

    this.qsParameters = new function () {

        this.collection = JSON.parse('{"parameters":[]}');

        this.add = function (id, value) {
            var qsParameter = { "id": id, "val": value };
            this.collection['parameters'].push(qsParameter);
        };


    };

    this.headers = new function () {

        this.collection = JSON.parse('{"headers":[]}');

        this.add = function (id, value) {

            var header = { "id": id, "val": value };
            this.collection['headers'].push(header);

        };



        this.contains = function (id) {

            var isMatch = false;

            Array.prototype.forEach.call(this.collection['headers'], function (header, i) {

                if (header.id.toLowerCase() == id.toLowerCase()) {
                    isMatch = true;
                }
            });

            if (isMatch) {
                return true;

            } else {
                return false;
            }

        };

    };

    this.callbacks = new function () {

        this.customSuccessCallback = null;
        this.customErrorCallback = null;
        this.serviceAdapterCallback = function (xmlHttp) {

            function onSeverConnect(e) {

                if (_this.settings.enableLogging) {
                    console.group('server connection established'); console.log(e); console.groupEnd();
                }
            };

            function onRequestRecieved(e) {

                if (_this.settings.enableLogging) {
                    console.group('request recieved'); console.log(e); console.groupEnd();
                }
            };

            function onRequestProcessing(e) {
                if (_this.settings.enableLogging) {
                    console.group('request processing'); console.log(e); console.groupEnd();
                }
            };

            function onRequestEnd(e) {

                if (e.status == 200) {
                    success(e);
                }
                else {
                    error(e);
                }

                if (_this.settings.enableLogging) {
                    console.timeEnd('service-adapter');
                }

            };

            function success(e) {

                if (_this.settings.enableLogging) {
                    console.group('request complete: success'); console.log(e.status); console.log(e); console.groupEnd();
                }

                if (e != null) {

                    _this.responseData = e;
                    _this.responseText = e.responseText;
                    _this.responseXml = e.responseXML;

                    if (_this.settings.isJson) { _this.responseJson = JSON.parse(e.responseText); }

                }

                if (_this.callbacks.customSuccessCallback != null) {
                    _this.callbacks.customSuccessCallback(e);
                }

            };

            function error(e) {

                if (_this.settings.enableLogging) {
                    console.group('request complete: error'); console.log(e.status); console.log(e); console.groupEnd();
                }

                if (_this.callbacks.customErrorCallback != null) {
                    _this.callbacks.customErrorCallback(e);
                }

            }

            switch (xmlHttp.readyState) {

                case 1:
                    onSeverConnect(xmlHttp);
                    break;

                case 2:
                    onRequestRecieved(xmlHttp);
                    break;

                case 3:
                    onRequestProcessing(xmlHttp);
                    break;

                case 4:
                    onRequestEnd(xmlHttp);
                    break;
            };

        };

    };

    var addQsParametrsToUrl = function () {

        var tempUrl = this.settings.url
        Array.prototype.forEach.call(this.qsParameters.collection['parameters'], function (qsParameter, i) {

            var temp = '';

            if (i == 0) {
                temp = '?';
            }
            else {
                temp = '&';
            }


            tempUrl += temp + qsParameter.id + '=' + qsParameter.val;

        });

        this.settings.url = tempUrl;

    }.bind(this);

    serviceAdapter.prototype.send = function () {

        var _this = this;

        addQsParametrsToUrl();

        if (this.settings.enableLogging) {
            console.time('service-adapter');
        }

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function () { _this.callbacks.serviceAdapterCallback(xmlHttp) };

        if (!this.headers.contains('enctype')) {
            this.headers.add('enctype', this.settings.enctype);
        }

        if (!this.headers.contains('content-type')) {
            this.headers.add('content-type', this.settings.contentType);
        }

        if (this.qsParameters.collection.length > 0) {
            addQsParametrsToUrl();
        }

        xmlHttp.open(
            this.settings.method,
            this.settings.url,
            this.settings.isAsync);

        Array.prototype.forEach.call(this.headers.collection['headers'], function (header, i) {
            xmlHttp.setRequestHeader(header.id, header.val);
        });

        xmlHttp.send(this.settings.data);

    };

    serviceAdapter.prototype.get = function () {

        this.settings.method = 'GET';
        this.send();

    };

    serviceAdapter.prototype.getJson = function () {

        this.settings.isJson = true;
        this.settings.method = 'GET';
        this.settings.contentType = 'application/json';
        this.send();

    };

    serviceAdapter.prototype.getXml = function () {

        this.settings.isJson = false;
        this.settings.method = 'GET';
        this.send();

    };

    serviceAdapter.prototype.post = function () {

        this.settings.method = 'POST';
        this.send();

    };

    serviceAdapter.prototype.postJson = function () {

        this.settings.method = 'POST';
        this.settings.contentType = 'application/json';
        this.send();

    };

    serviceAdapter.prototype.postXml = function () {

        this.settings.method = 'POST';
        this.settings.contentType = 'application/xml';
        this.send();

    };

};

