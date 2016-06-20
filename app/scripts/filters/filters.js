'use strict';
(function() {
    var app = angular.module('fsquareControlPanelApp.filters',[]);
    app.filter('numberToDate', function() {
        return function(input, format) {
            input = input || 0;
            if(input && input != null && input != ''){
                return new Date(parseInt(input));
            }
            return null;
        };
    })

    app.filter('liferayLangXml', function() {
        return function(input, field, locale) {
            var xml = $.parseXML(input);
            var $xml = $(xml);
            locale = locale || "en_GB";
            var $title = $xml.find(field+"[language-id='"+locale+"']");
            return $title.text();
        };
    })

    app.filter('liferayLangToJson', function() {
        return function(input, field, defaultLocale) {
            var json = {};
            try{
                var xml = $.parseXML(input);
                var $xml = $(xml);
                $xml.find(field).each(function(){
                    var languageId = $(this).attr('language-id');
                    var val = $(this).text();
                    json[languageId] = val;
                });

                return json;
            }catch(e){
                json[defaultLocale] = input;
                return json;
            }

        };
    })
})();
