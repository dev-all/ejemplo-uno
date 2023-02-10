"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var home_component_1 = require("./home.component");
var home_layout_routing_1 = require("./home-layout.routing");
var forms_1 = require("@angular/forms");
var form_field_1 = require("@angular/material/form-field");
var home_component_2 = require("src/app/pages/home/home.component");
var table_1 = require("@angular/material/table");
var product_component_1 = require("src/app/pages/producto/product.component");
var input_1 = require("@angular/material/input");
var button_1 = require("@angular/material/button");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var select_1 = require("@angular/material/select");
var core_2 = require("@angular/material/core");
var ngx_mat_select_search_1 = require("ngx-mat-select-search");
var icon_1 = require("@angular/material/icon");
var dialog_1 = require("@angular/material/dialog");
var components_module_1 = require("src/app/components/components.module");
var securityAccess_1 = require("src/app/shared/securityAccess");
var ng2_pdf_viewer_1 = require("ng2-pdf-viewer");
var pdf_viewer_component_1 = require("src/app/pages/pdf.viewer/pdf.viewer.component");
var paginator_1 = require("@angular/material/paginator");
var CustomMatPaginatorIntl_1 = require("src/app/shared/CustomMatPaginatorIntl");
var checkbox_1 = require("@angular/material/checkbox");
var movimiento_deposito_component_1 = require("src/app/pages/movimiento-deposito/movimiento-deposito.component");
var datepicker_1 = require("@angular/material/datepicker");
var ventas_component_1 = require("src/app/pages/ventas/ventas.component");
var round_pipe_1 = require("src/app/pipes/round.pipe");
var fixed_pipe_1 = require("src/app/pipes/fixed.pipe");
var cliente_component_1 = require("src/app/pages/cliente/cliente.component");
var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            imports: [
                home_layout_routing_1.MainRoutes,
                forms_1.FormsModule,
                common_1.CommonModule,
                icon_1.MatIconModule,
                table_1.MatTableModule,
                input_1.MatInputModule,
                button_1.MatButtonModule,
                select_1.MatSelectModule,
                dialog_1.MatDialogModule,
                core_2.MatOptionModule,
                form_field_1.MatFormFieldModule,
                forms_1.ReactiveFormsModule,
                progress_spinner_1.MatProgressSpinnerModule,
                ngx_mat_select_search_1.NgxMatSelectSearchModule,
                components_module_1.ComponentsModule,
                ng2_pdf_viewer_1.PdfViewerModule,
                paginator_1.MatPaginatorModule,
                checkbox_1.MatCheckboxModule,
                datepicker_1.MatDatepickerModule,
            ],
            declarations: [
                home_component_2.HomePage,
                product_component_1.ProductPage,
                home_component_1.HomeLayout,
                pdf_viewer_component_1.PdfViewerPage,
                movimiento_deposito_component_1.MovimientoDepositoPage,
                cliente_component_1.ClienteComponent,
                ventas_component_1.VentasComponent,
                cliente_component_1.ClienteComponent,
                round_pipe_1.RoundPipe,
                fixed_pipe_1.FixedPipe,
            ],
            providers: [
                securityAccess_1.SecurityAccess,
                {
                    provide: paginator_1.MatPaginatorIntl,
                    useClass: CustomMatPaginatorIntl_1.CustomMatPaginatorIntl
                },
            ]
        })
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
