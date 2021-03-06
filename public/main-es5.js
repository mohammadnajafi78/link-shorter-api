(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
    /***/
    0:
    /*!***************************!*\
      !*** multi ./src/main.ts ***!
      \***************************/

    /*! no static exports found */

    /***/
    function _(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(
      /*! D:\projects\link-shorter\url-client\src\main.ts */
      "zUnb");
      /***/
    },

    /***/
    "AytR":
    /*!*****************************************!*\
      !*** ./src/environments/environment.ts ***!
      \*****************************************/

    /*! exports provided: environment */

    /***/
    function AytR(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "environment", function () {
        return environment;
      }); // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.


      var environment = {
        production: false,
        base: "/",
        // url: "https://1xad.net",
        // url: "http://localhost:3000",
        url: "https://my-link-shorter.herokuapp.com"
      };
      /*
       * For easier debugging in development mode, you can import the following file
       * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
       *
       * This import should be commented out in production mode because it will have a negative impact
       * on performance if an error is thrown.
       */
      // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

      /***/
    },

    /***/
    "KPvW":
    /*!********************************************!*\
      !*** ./src/app/services/ticket.service.ts ***!
      \********************************************/

    /*! exports provided: TicketService */

    /***/
    function KPvW(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "TicketService", function () {
        return TicketService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");

      var TicketService = /*#__PURE__*/function () {
        function TicketService(http) {
          _classCallCheck(this, TicketService);

          this.http = http;
          this.base = "/api/tickets";
        } // ?????????? ???????? ???????? ????


        _createClass(TicketService, [{
          key: "getTicketList",
          value: function getTicketList(params) {
            return this.http.get("".concat(this.base, "/all"), {
              params: params
            });
          } // ???????????? ????????

        }, {
          key: "readTicket",
          value: function readTicket(id) {
            return this.http.put("".concat(this.base, "/").concat(id), {});
          } // ?????????? ???????? ?????????? ????????

        }, {
          key: "create",
          value: function create(ticket) {
            return this.http.post(this.base, ticket);
          } // ?????????? ???????? ???? ????????

        }, {
          key: "getTicketById",
          value: function getTicketById(id) {
            return this.http.get("".concat(this.base, "/").concat(id));
          } // ?????????? ???????? ???? ???????? ????????????????

        }, {
          key: "sendResponse",
          value: function sendResponse(ticket) {
            return this.http.post("".concat(this.base, "/response"), ticket);
          } // ???????? ???????? ?????? ???? ??????????

        }, {
          key: "getUserTicket",
          value: function getUserTicket(params) {
            return this.http.get(this.base, {
              params: params
            });
          }
        }]);

        return TicketService;
      }();

      TicketService.??fac = function TicketService_Factory(t) {
        return new (t || TicketService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["????inject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]));
      };

      TicketService.??prov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineInjectable"]({
        token: TicketService,
        factory: TicketService.??fac,
        providedIn: "root"
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["??setClassMetadata"](TicketService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: "root"
          }]
        }], function () {
          return [{
            type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "KQZp":
    /*!*********************************************!*\
      !*** ./src/app/services/setting.service.ts ***!
      \*********************************************/

    /*! exports provided: SettingService */

    /***/
    function KQZp(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SettingService", function () {
        return SettingService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");

      var SettingService = /*#__PURE__*/function () {
        function SettingService(http) {
          _classCallCheck(this, SettingService);

          this.http = http;
          this.base = '/api/setting';
          this.drawer$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](false);
        }

        _createClass(SettingService, [{
          key: "get",
          value: function get() {
            return this.http.get(this.base);
          }
        }, {
          key: "update",
          value: function update(id, setting) {
            return this.http.put("".concat(this.base, "/").concat(id), setting);
          }
        }, {
          key: "findMethod",
          value: function findMethod() {
            return this.http.get("".concat(this.base, "/method"));
          }
        }]);

        return SettingService;
      }();

      SettingService.??fac = function SettingService_Factory(t) {
        return new (t || SettingService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["????inject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]));
      };

      SettingService.??prov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineInjectable"]({
        token: SettingService,
        factory: SettingService.??fac
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["??setClassMetadata"](SettingService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
        }], function () {
          return [{
            type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "Lpmr":
    /*!******************************************!*\
      !*** ./src/app/services/link.service.ts ***!
      \******************************************/

    /*! exports provided: LinkService */

    /***/
    function Lpmr(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LinkService", function () {
        return LinkService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");

      var LinkService = /*#__PURE__*/function () {
        function LinkService(http) {
          _classCallCheck(this, LinkService);

          this.http = http;
          this.base = "/api/links";
        } // ?????????? ???????? ?????? ????????


        _createClass(LinkService, [{
          key: "getLinkList",
          value: function getLinkList(params) {
            return this.http.get("".concat(this.base, "/all"), {
              params: params
            });
          } // ?????????? ???????? ?????? ???? ??????????

        }, {
          key: "getUserLinkList",
          value: function getUserLinkList(params) {
            return this.http.get("".concat(this.base), {
              params: params
            });
          } // ?????????? ???????? ?????????? ????????

        }, {
          key: "createLink",
          value: function createLink(newLink) {
            newLink.mainLink = newLink.mainLink.trim();
            return this.http.post(this.base, newLink);
          } // ???????????? ????????

        }, {
          key: "update",
          value: function update(id, newLink) {
            return this.http.put("".concat(this.base, "/").concat(id), newLink);
          } // ?????????? ???????? ???? ????????

        }, {
          key: "getVisit",
          value: function getVisit(id) {
            return this.http.get("".concat(this.base, "/visits/").concat(id));
          }
        }, {
          key: "getUserVisit",
          value: function getUserVisit() {
            return this.http.get("".concat(this.base, "/visit/all"));
          } // ?????????? ???????? ???? ???????? ??????????

        }, {
          key: "getLinkByShortLink",
          value: function getLinkByShortLink(shortLink) {
            return this.http.get("".concat(this.base, "/").concat(shortLink));
          } // ?????????? ???? ???????????? ????????

        }, {
          key: "createVisit",
          value: function createVisit(id) {
            return this.http.post("".concat(this.base, "/visit"), {
              link: id
            });
          }
        }]);

        return LinkService;
      }();

      LinkService.??fac = function LinkService_Factory(t) {
        return new (t || LinkService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["????inject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]));
      };

      LinkService.??prov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineInjectable"]({
        token: LinkService,
        factory: LinkService.??fac,
        providedIn: "root"
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["??setClassMetadata"](LinkService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: "root"
          }]
        }], function () {
          return [{
            type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "Sy1n":
    /*!**********************************!*\
      !*** ./src/app/app.component.ts ***!
      \**********************************/

    /*! exports provided: AppComponent */

    /***/
    function Sy1n(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
        return AppComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");

      var AppComponent = function AppComponent() {
        _classCallCheck(this, AppComponent);

        this.title = "url-client";
      };

      AppComponent.??fac = function AppComponent_Factory(t) {
        return new (t || AppComponent)();
      };

      AppComponent.??cmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineComponent"]({
        type: AppComponent,
        selectors: [["app-root"]],
        decls: 1,
        vars: 0,
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["????element"](0, "router-outlet");
          }
        },
        directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["??setClassMetadata"](AppComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: "app-root",
            templateUrl: "./app.component.html",
            styleUrls: ["./app.component.scss"]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "ZAI4":
    /*!*******************************!*\
      !*** ./src/app/app.module.ts ***!
      \*******************************/

    /*! exports provided: AppModule */

    /***/
    function ZAI4(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppModule", function () {
        return AppModule;
      });
      /* harmony import */


      var _utils_blockGaurd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./utils/blockGaurd */
      "nVLd");
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./app-routing.module */
      "vY5A");
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./app.component */
      "Sy1n");
      /* harmony import */


      var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/platform-browser/animations */
      "R1ws");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../environments/environment */
      "AytR");
      /* harmony import */


      var _utils_http_interceptor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ./utils/http.interceptor */
      "aO2B");
      /* harmony import */


      var _services_user_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ./services/user.service */
      "qfBg");
      /* harmony import */


      var _services_link_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ./services/link.service */
      "Lpmr");
      /* harmony import */


      var _services_withdraws_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ./services/withdraws.service */
      "k1+t");
      /* harmony import */


      var _services_ticket_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! ./services/ticket.service */
      "KPvW");
      /* harmony import */


      var _utils_gaurd__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! ./utils/gaurd */
      "uuFk");
      /* harmony import */


      var _utils_dashboardGuard__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! ./utils/dashboardGuard */
      "arI5");
      /* harmony import */


      var _services_setting_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! ./services/setting.service */
      "KQZp");
      /* harmony import */


      var _services_upload_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! ./services/upload.service */
      "jT/F");

      var AppModule = function AppModule() {
        _classCallCheck(this, AppModule);
      };

      AppModule.??mod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["????defineNgModule"]({
        type: AppModule,
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
      });
      AppModule.??inj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["????defineInjector"]({
        factory: function AppModule_Factory(t) {
          return new (t || AppModule)();
        },
        providers: [{
          provide: _angular_common__WEBPACK_IMPORTED_MODULE_7__["APP_BASE_HREF"],
          useValue: _environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].base
        }, {
          provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HTTP_INTERCEPTORS"],
          useClass: _utils_http_interceptor__WEBPACK_IMPORTED_MODULE_9__["MyHttpInterceptor"],
          multi: true
        }, _utils_gaurd__WEBPACK_IMPORTED_MODULE_14__["Guard"], _utils_dashboardGuard__WEBPACK_IMPORTED_MODULE_15__["DashboardGuard"], _utils_blockGaurd__WEBPACK_IMPORTED_MODULE_0__["BlockGaurd"], _services_link_service__WEBPACK_IMPORTED_MODULE_11__["LinkService"], _services_withdraws_service__WEBPACK_IMPORTED_MODULE_12__["WithdrawsService"], _services_ticket_service__WEBPACK_IMPORTED_MODULE_13__["TicketService"], _services_user_service__WEBPACK_IMPORTED_MODULE_10__["UserService"], _services_setting_service__WEBPACK_IMPORTED_MODULE_16__["SettingService"], _services_upload_service__WEBPACK_IMPORTED_MODULE_17__["UploadService"]],
        imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["????setNgModuleScope"](AppModule, {
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["??setClassMetadata"](AppModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"],
          args: [{
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]],
            imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"]],
            providers: [{
              provide: _angular_common__WEBPACK_IMPORTED_MODULE_7__["APP_BASE_HREF"],
              useValue: _environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].base
            }, {
              provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HTTP_INTERCEPTORS"],
              useClass: _utils_http_interceptor__WEBPACK_IMPORTED_MODULE_9__["MyHttpInterceptor"],
              multi: true
            }, _utils_gaurd__WEBPACK_IMPORTED_MODULE_14__["Guard"], _utils_dashboardGuard__WEBPACK_IMPORTED_MODULE_15__["DashboardGuard"], _utils_blockGaurd__WEBPACK_IMPORTED_MODULE_0__["BlockGaurd"], _services_link_service__WEBPACK_IMPORTED_MODULE_11__["LinkService"], _services_withdraws_service__WEBPACK_IMPORTED_MODULE_12__["WithdrawsService"], _services_ticket_service__WEBPACK_IMPORTED_MODULE_13__["TicketService"], _services_user_service__WEBPACK_IMPORTED_MODULE_10__["UserService"], _services_setting_service__WEBPACK_IMPORTED_MODULE_16__["SettingService"], _services_upload_service__WEBPACK_IMPORTED_MODULE_17__["UploadService"]],
            // exports: [RecaptchaModule],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "aO2B":
    /*!*******************************************!*\
      !*** ./src/app/utils/http.interceptor.ts ***!
      \*******************************************/

    /*! exports provided: MyHttpInterceptor */

    /***/
    function aO2B(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "MyHttpInterceptor", function () {
        return MyHttpInterceptor;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../environments/environment */
      "AytR");

      var MyHttpInterceptor = /*#__PURE__*/function () {
        function MyHttpInterceptor() {
          _classCallCheck(this, MyHttpInterceptor);

          this.BASE_URL = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].url;
        }

        _createClass(MyHttpInterceptor, [{
          key: "intercept",
          value: function intercept(req, next) {
            if (!req.url.startsWith('http')) {
              var token = localStorage.getItem('token');
              var request = req.clone({
                url: this.BASE_URL + req.url
              });

              if (token) {
                request = request.clone({
                  headers: req.headers.append('authorization', "Bearer ".concat(token))
                });
              }

              return next.handle(request);
            } else {
              return next.handle(req);
            }
          }
        }]);

        return MyHttpInterceptor;
      }();

      MyHttpInterceptor.??fac = function MyHttpInterceptor_Factory(t) {
        return new (t || MyHttpInterceptor)();
      };

      MyHttpInterceptor.??prov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineInjectable"]({
        token: MyHttpInterceptor,
        factory: MyHttpInterceptor.??fac,
        providedIn: 'root'
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["??setClassMetadata"](MyHttpInterceptor, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: 'root'
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "arI5":
    /*!*****************************************!*\
      !*** ./src/app/utils/dashboardGuard.ts ***!
      \*****************************************/

    /*! exports provided: DashboardGuard */

    /***/
    function arI5(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "DashboardGuard", function () {
        return DashboardGuard;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../services/user.service */
      "qfBg");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");

      var DashboardGuard = /*#__PURE__*/function () {
        function DashboardGuard(userService, router) {
          _classCallCheck(this, DashboardGuard);

          this.userService = userService;
          this.router = router;
        }

        _createClass(DashboardGuard, [{
          key: "canActivate",
          value: function canActivate() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var user;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.prev = 0;

                      if (localStorage.getItem("token")) {
                        _context.next = 3;
                        break;
                      }

                      throw false;

                    case 3:
                      _context.next = 5;
                      return this.userService.profile().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (res) {
                        return res.user;
                      })).toPromise();

                    case 5:
                      user = _context.sent;

                      if (!(user.status !== "block")) {
                        _context.next = 10;
                        break;
                      }

                      return _context.abrupt("return", true);

                    case 10:
                      this.router.navigate(["/member/dashboard/support"]);

                    case 11:
                      _context.next = 17;
                      break;

                    case 13:
                      _context.prev = 13;
                      _context.t0 = _context["catch"](0);
                      this.router.navigate(["/page/not-found"]);
                      throw false;

                    case 17:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this, [[0, 13]]);
            }));
          }
        }]);

        return DashboardGuard;
      }();

      DashboardGuard.??fac = function DashboardGuard_Factory(t) {
        return new (t || DashboardGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["????inject"](_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["????inject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]));
      };

      DashboardGuard.??prov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["????defineInjectable"]({
        token: DashboardGuard,
        factory: DashboardGuard.??fac
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["??setClassMetadata"](DashboardGuard, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"]
        }], function () {
          return [{
            type: _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "jT/F":
    /*!********************************************!*\
      !*** ./src/app/services/upload.service.ts ***!
      \********************************************/

    /*! exports provided: UploadService */

    /***/
    function jTF(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "UploadService", function () {
        return UploadService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");

      var UploadService = /*#__PURE__*/function () {
        function UploadService(http) {
          _classCallCheck(this, UploadService);

          this.http = http;
          this.base = '/api/upload';
        } // ???????? ?????????? ?????????? ????????


        _createClass(UploadService, [{
          key: "openFileChooser",
          value: function openFileChooser() {
            return new Promise(function (resolve, reject) {
              try {
                var fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.addEventListener('change', function (ev) {
                  var files = fileInput.files;

                  if (files) {
                    resolve(files);
                  } else {
                    reject(undefined);
                  }
                });
                fileInput.click();
              } catch (error) {
                reject();
              }
            });
          } // ???????? ?????????? ?????? ???? ????????

        }, {
          key: "upload",
          value: function upload(file) {
            var formData = new FormData();
            formData.append('file', file, file.name);
            return this.http.post("".concat(this.base, "/image"), formData, {
              // responseType: '',
              // ???????? ???????????? ??????????
              reportProgress: true,
              observe: 'events'
            });
          }
        }]);

        return UploadService;
      }();

      UploadService.??fac = function UploadService_Factory(t) {
        return new (t || UploadService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["????inject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]));
      };

      UploadService.??prov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineInjectable"]({
        token: UploadService,
        factory: UploadService.??fac,
        providedIn: 'root'
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["??setClassMetadata"](UploadService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [{
            type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "k1+t":
    /*!***********************************************!*\
      !*** ./src/app/services/withdraws.service.ts ***!
      \***********************************************/

    /*! exports provided: WithdrawsService */

    /***/
    function k1T(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "WithdrawsService", function () {
        return WithdrawsService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");

      var WithdrawsService = /*#__PURE__*/function () {
        function WithdrawsService(http) {
          _classCallCheck(this, WithdrawsService);

          this.http = http;
          this.base = "/api/withdraws";
        } // ?????????? ???????? ?????? ???????????? ????


        _createClass(WithdrawsService, [{
          key: "getWithdrawsList",
          value: function getWithdrawsList(params) {
            return this.http.get("".concat(this.base, "/all"), {
              params: params
            });
          } // ?????????? ???? ????????????

        }, {
          key: "create",
          value: function create(amount) {
            return this.http.post(this.base, {
              amount: amount
            });
          } // ?????????? ?????????????? ???? ????????????

        }, {
          key: "getWothdrawsById",
          value: function getWothdrawsById(id) {
            return this.http.get("".concat(this.base, "/").concat(id));
          } // ???????? ???????? ????????????

        }, {
          key: "setCancelWithdraws",
          value: function setCancelWithdraws(id) {
            return this.http.put("".concat(this.base, "/cancel/").concat(id), {});
          } // ???????????? ???????? ???????? ???? ????????????

        }, {
          key: "setSuccessWithdraws",
          value: function setSuccessWithdraws(id, trackNumber) {
            return this.http.put("".concat(this.base, "/success/").concat(id), {
              trackNumber: trackNumber
            });
          } // ?????????? ???????????? ?????? ???? ??????????

        }, {
          key: "getUserWithdrawsList",
          value: function getUserWithdrawsList(params) {
            return this.http.get(this.base, {
              params: params
            });
          }
        }]);

        return WithdrawsService;
      }();

      WithdrawsService.??fac = function WithdrawsService_Factory(t) {
        return new (t || WithdrawsService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["????inject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]));
      };

      WithdrawsService.??prov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineInjectable"]({
        token: WithdrawsService,
        factory: WithdrawsService.??fac,
        providedIn: "root"
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["??setClassMetadata"](WithdrawsService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: "root"
          }]
        }], function () {
          return [{
            type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "nVLd":
    /*!*************************************!*\
      !*** ./src/app/utils/blockGaurd.ts ***!
      \*************************************/

    /*! exports provided: BlockGaurd */

    /***/
    function nVLd(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "BlockGaurd", function () {
        return BlockGaurd;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../services/user.service */
      "qfBg");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");

      var BlockGaurd = /*#__PURE__*/function () {
        function BlockGaurd(userService, router) {
          _classCallCheck(this, BlockGaurd);

          this.userService = userService;
          this.router = router;
        }

        _createClass(BlockGaurd, [{
          key: "canActivate",
          value: function canActivate() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              var user;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.prev = 0;

                      if (localStorage.getItem("token")) {
                        _context2.next = 3;
                        break;
                      }

                      throw false;

                    case 3:
                      _context2.next = 5;
                      return this.userService.profile().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (res) {
                        return res.user;
                      })).toPromise();

                    case 5:
                      user = _context2.sent;
                      return _context2.abrupt("return", true);

                    case 9:
                      _context2.prev = 9;
                      _context2.t0 = _context2["catch"](0);
                      this.router.navigate(["/page/not-found"]);
                      throw false;

                    case 13:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this, [[0, 9]]);
            }));
          }
        }]);

        return BlockGaurd;
      }();

      BlockGaurd.??fac = function BlockGaurd_Factory(t) {
        return new (t || BlockGaurd)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["????inject"](_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["????inject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]));
      };

      BlockGaurd.??prov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["????defineInjectable"]({
        token: BlockGaurd,
        factory: BlockGaurd.??fac
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["??setClassMetadata"](BlockGaurd, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"]
        }], function () {
          return [{
            type: _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "qfBg":
    /*!******************************************!*\
      !*** ./src/app/services/user.service.ts ***!
      \******************************************/

    /*! exports provided: UserService */

    /***/
    function qfBg(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "UserService", function () {
        return UserService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");

      var UserService = /*#__PURE__*/function () {
        function UserService(http) {
          var _this = this;

          _classCallCheck(this, UserService);

          this.http = http;
          this.base = "/api/users";
          this.user$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](null);

          if (!!localStorage.getItem("token")) {
            this.profile().subscribe(function (res) {
              _this.user$.next(res.user);
            });
          }
        }

        _createClass(UserService, [{
          key: "login",
          value: function login(username, password) {
            return this.http.post("".concat(this.base, "/login"), {
              username: username,
              password: password
            });
          }
        }, {
          key: "signUp",
          value: function signUp(user) {
            return this.http.post("".concat(this.base, "/signup"), user);
          }
        }, {
          key: "findSubset",
          value: function findSubset() {
            return this.http.get("".concat(this.base, "/subset"));
          }
        }, {
          key: "profile",
          value: function profile() {
            return this.http.get("".concat(this.base, "/profile"));
          }
        }, {
          key: "getUserList",
          value: function getUserList(params) {
            return this.http.get(this.base, {
              params: params
            });
          }
        }, {
          key: "adminUpdate",
          value: function adminUpdate(user) {
            return this.http.put("".concat(this.base, "/").concat(user._id), user);
          }
        }, {
          key: "updateUser",
          value: function updateUser(user) {
            return this.http.put("".concat(this.base, "/profile"), user);
          }
        }, {
          key: "usernameExist",
          value: function usernameExist(username) {
            return this.http.post("".concat(this.base, "/username"), {
              username: username
            });
          }
        }, {
          key: "forgetPassword",
          value: function forgetPassword(email) {
            return this.http.post("".concat(this.base, "/forget-password"), {
              email: email
            });
          }
        }, {
          key: "verifyResetPassword",
          value: function verifyResetPassword(code) {
            return this.http.post("".concat(this.base, "/verify/").concat(code), {});
          }
        }, {
          key: "changePassword",
          value: function changePassword(code, password) {
            return this.http.post("".concat(this.base, "/change-password"), {
              code: code,
              password: password
            });
          }
        }]);

        return UserService;
      }();

      UserService.??fac = function UserService_Factory(t) {
        return new (t || UserService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["????inject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]));
      };

      UserService.??prov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineInjectable"]({
        token: UserService,
        factory: UserService.??fac,
        providedIn: "root"
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["??setClassMetadata"](UserService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: "root"
          }]
        }], function () {
          return [{
            type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "uuFk":
    /*!********************************!*\
      !*** ./src/app/utils/gaurd.ts ***!
      \********************************/

    /*! exports provided: Guard */

    /***/
    function uuFk(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Guard", function () {
        return Guard;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../services/user.service */
      "qfBg");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");

      var Guard = /*#__PURE__*/function () {
        function Guard(userService, router) {
          _classCallCheck(this, Guard);

          this.userService = userService;
          this.router = router;
        }

        _createClass(Guard, [{
          key: "canActivate",
          value: function canActivate() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var user;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.prev = 0;

                      if (localStorage.getItem("token")) {
                        _context3.next = 3;
                        break;
                      }

                      throw false;

                    case 3:
                      _context3.next = 5;
                      return this.userService.profile().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (res) {
                        return res.user;
                      })).toPromise();

                    case 5:
                      user = _context3.sent;

                      if (!(user.role === "admin" && user.status !== "block")) {
                        _context3.next = 10;
                        break;
                      }

                      return _context3.abrupt("return", true);

                    case 10:
                      throw false;

                    case 11:
                      _context3.next = 17;
                      break;

                    case 13:
                      _context3.prev = 13;
                      _context3.t0 = _context3["catch"](0);
                      this.router.navigate(["/page/not-found"]);
                      throw false;

                    case 17:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this, [[0, 13]]);
            }));
          }
        }]);

        return Guard;
      }();

      Guard.??fac = function Guard_Factory(t) {
        return new (t || Guard)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["????inject"](_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["????inject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]));
      };

      Guard.??prov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["????defineInjectable"]({
        token: Guard,
        factory: Guard.??fac
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["??setClassMetadata"](Guard, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"]
        }], function () {
          return [{
            type: _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]
          }, {
            type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "vY5A":
    /*!***************************************!*\
      !*** ./src/app/app-routing.module.ts ***!
      \***************************************/

    /*! exports provided: AppRoutingModule */

    /***/
    function vY5A(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
        return AppRoutingModule;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app.component */
      "Sy1n");

      var routes = [{
        path: '',
        component: _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
        children: [{
          path: '',
          loadChildren: function loadChildren() {
            return Promise.all(
            /*! import() | pages-client-client-module */
            [__webpack_require__.e("default~pages-admin-admin-module~pages-client-client-module~pages-dashboard-dashboard-module"), __webpack_require__.e("pages-client-client-module")]).then(__webpack_require__.bind(null,
            /*! ./pages/client/client.module */
            "Fbh4")).then(function (m) {
              return m.ClientModule;
            });
          }
        }, {
          path: 'admin/dashboard',
          loadChildren: function loadChildren() {
            return Promise.all(
            /*! import() | pages-admin-admin-module */
            [__webpack_require__.e("default~pages-admin-admin-module~pages-client-client-module~pages-dashboard-dashboard-module"), __webpack_require__.e("common"), __webpack_require__.e("pages-admin-admin-module")]).then(__webpack_require__.bind(null,
            /*! ./pages/admin/admin.module */
            "GCp2")).then(function (m) {
              return m.AdminModule;
            });
          }
        }, {
          path: 'member/dashboard',
          loadChildren: function loadChildren() {
            return Promise.all(
            /*! import() | pages-dashboard-dashboard-module */
            [__webpack_require__.e("default~pages-admin-admin-module~pages-client-client-module~pages-dashboard-dashboard-module"), __webpack_require__.e("common"), __webpack_require__.e("pages-dashboard-dashboard-module")]).then(__webpack_require__.bind(null,
            /*! ./pages/dashboard/dashboard.module */
            "/2RN")).then(function (m) {
              return m.DashboardModule;
            });
          }
        }, {
          path: '**',
          redirectTo: 'page/not-found'
        }]
      }];

      var AppRoutingModule = function AppRoutingModule() {
        _classCallCheck(this, AppRoutingModule);
      };

      AppRoutingModule.??mod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineNgModule"]({
        type: AppRoutingModule
      });
      AppRoutingModule.??inj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["????defineInjector"]({
        factory: function AppRoutingModule_Factory(t) {
          return new (t || AppRoutingModule)();
        },
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["????setNgModuleScope"](AppRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["??setClassMetadata"](AppRoutingModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
          args: [{
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "zUnb":
    /*!*********************!*\
      !*** ./src/main.ts ***!
      \*********************/

    /*! no exports provided */

    /***/
    function zUnb(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./environments/environment */
      "AytR");
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app/app.module */
      "ZAI4");
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
      }

      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
        return console.error(err);
      });
      /***/

    },

    /***/
    "zn8P":
    /*!******************************************************!*\
      !*** ./$$_lazy_route_resource lazy namespace object ***!
      \******************************************************/

    /*! no static exports found */

    /***/
    function zn8P(module, exports) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      module.exports = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = "zn8P";
      /***/
    }
  }, [[0, "runtime", "vendor"]]]);
})();
//# sourceMappingURL=main-es5.js.map