/**
 * Created by ruic on 04/04/2016.
 */

var soap = require('soap');
var credentials = {
    password: '1234567',
    username: 'ruicunh@gmail.com'
}
var BASE_URL = 'http://localhost:8080/api/axis/';
var FSQUARE_PATH = 'fsquare-shopping-portlet/';


function setLiferaySecurity(client){
    client.setSecurity(new soap.BasicAuthSecurity(credentials.username, credentials.password));
}

module.exports = {

    countriesApi: {
        url: BASE_URL+'Portal_CountryService?wsdl',
        getCountries: function (active) {

            var url = this.url;
            return new Promise(function(resolve, reject) {
                if (active === undefined) {
                    active = true;
                }
                var args = {active: active};
                soap.createClient(url, function (err, client) {
                    if(client) {
                        setLiferaySecurity(client);
                        client.getCountries(args, function (err, result) {
                            if (err) reject(err);
                            resolve(result);
                        });
                    }
                });
            });

        }
    },
    companyApi:{
        url: BASE_URL+'Portal_CompanyService?wsdl',
        getCompanies: function () {
            var url = "http://localhost:8080/"+FSQUARE_PATH+"api/axis/Plugin_FsquareShopping_SiteCommonActionsService?wsdl";
            console.log("URL: "+url);
            return new Promise(function(resolve, reject) {
                var args = null;
                soap.createClient(url, function (err, client) {
                    console.log("client: "+client);
                    if(client){
                        setLiferaySecurity(client);
                        client.getCompanies(args, function (err, result) {
                            if (err) reject(err);
                            resolve(result);
                        });
                    }else{
                        reject("ERRORRRRR");
                    }
                });
            });
        },

        getAccounts: function () {
            var url = "http://localhost:8080/"+FSQUARE_PATH+"api/axis/Plugin_FsquareShopping_SiteCommonActionsService?wsdl";
            console.log("URL: "+url);
            return new Promise(function(resolve, reject) {
                var args = null;
                soap.createClient(url, function (err, client) {
                    console.log("client: "+client);
                    if(client){
                        setLiferaySecurity(client);
                        client.getAccounts(args, function (err, result) {
                            if (err) reject(err);
                            resolve(result);
                        });
                    }else{
                        reject("ERRORRRRR");
                    }
                });
            });
        },


        addCompany:function(webId, virtualHost, mx, shardName, system, maxUsers, active){
            var url = BASE_URL+this.url;
            return new Promise(function(resolve, reject) {

                var args = {
                    webId: webId,
                    virtualHost: virtualHost,
                    mx: mx,
                    shardName:shardName,
                    system:system,
                    maxUsers:maxUsers,
                    active: active

                };
                soap.createClient(url, function (err, client) {
                    setLiferaySecurity(client);
                    client.addCompany(args, function (err, result) {
                        if (err) reject(err);
                        resolve(result);
                    });
                });
            });
        }
    }
}