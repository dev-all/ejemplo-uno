"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ComponentsModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var icon_1 = require("@angular/material/icon");
var table_1 = require("@angular/material/table");
var input_1 = require("@angular/material/input");
var button_1 = require("@angular/material/button");
var select_1 = require("@angular/material/select");
var sidebar_component_1 = require("./sidebar/sidebar.component");
var form_field_1 = require("@angular/material/form-field");
var forms_1 = require("@angular/forms");
var stock_grid_component_1 = require("./stock.grid/stock.grid.component");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var global_spinner_component_1 = require("./global.spinner/global.spinner.component");
var message_dialog_component_1 = require("./dialogs/message.dialog/message.dialog.component");
var ajuste_stock_dialog_component_1 = require("./dialogs/ajuste.stock.dialog/ajuste.stock.dialog.component");
var inicio_stock_dialog_component_1 = require("./dialogs/inicio.stock.dialog/inicio.stock.dialog.component");
var core_2 = require("@angular/material/core");
var router_1 = require("@angular/router");
var checkbox_1 = require("@angular/material/checkbox");
var radio_1 = require("@angular/material/radio");
var dialog_1 = require("@angular/material/dialog");
var distinct_pipe_1 = require("../pipes/distinct.pipe");
var confirmation_dialog_component_1 = require("./dialogs/confirmation.dialog/confirmation.dialog.component");
var movimientos_dialog_component_1 = require("./dialogs/movimientos.dialog/movimientos.dialog.component");
var datepicker_1 = require("@angular/material/datepicker");
var menu_1 = require("@angular/material/menu");
var save_report_dialog_component_1 = require("./dialogs/save.report.dialog/save.report.dialog.component");
var whatsapp_report_dialog_component_1 = require("./dialogs/whatsapp.report.dialog/whatsapp.report.dialog.component");
var mail_report_dialog_component_1 = require("./dialogs/mail.report.dialog/mail.report.dialog.component");
var snack_bar_1 = require("@angular/material/snack-bar");
var global_snackbar_component_1 = require("./global.snackbar/global.snackbar.component");
var auto_login_component_1 = require("./auto-login/auto-login.component");
var tree_1 = require("@angular/material/tree");
var tree_component_1 = require("./tree/tree.component");
var lista_inputs_component_1 = require("./lista-inputs/lista-inputs.component");
var list_1 = require("@angular/material/list");
var nuevo_movimiento_dialog_component_1 = require("./dialogs/nuevo-movimiento-dialog/nuevo-movimiento-dialog.component");
var seleccion_productos_component_1 = require("./dialogs/seleccion-productos/seleccion-productos.component");
var ngx_mat_select_search_1 = require("ngx-mat-select-search");
var agregar_producto_dialog_component_1 = require("./dialogs/agregar-producto-dialog/agregar-producto-dialog.component");
var agregar_mercaderia_dialog_component_1 = require("./dialogs/agregar-mercaderia-dialog/agregar-mercaderia-dialog/agregar-mercaderia-dialog.component");
var modificar_movimiento_dialog_component_1 = require("./dialogs/modificar-movimiento-dialog/modificar-movimiento-dialog.component");
var magnum_input_component_1 = require("./magnum-input/magnum-input.component");
var magnum_button_component_1 = require("./magnum-button/magnum-button.component");
var magnum_select_component_1 = require("./magnum-select/magnum-select.component");
var cliente_dialog_component_1 = require("./dialogs/cliente-dialog/cliente-dialog.component");
var login_dialog_component_1 = require("./dialogs/login.dialog/login.dialog.component");
var pedido_mercaderia_dialog_component_1 = require("./dialogs/pedido.mercaderia.dialog/pedido.mercaderia.dialog.component");
var bonificacion_general_dialog_component_1 = require("./dialogs/bonificacion.general-dialog/bonificacion.general-dialog.component");
var bonificacion_item_dialog_component_1 = require("./dialogs/bonificacion.item-dialog/bonificacion.item-dialog.component");
var producto_dialog_component_1 = require("./dialogs/producto.dialog/producto.dialog.component");
var resumen_cuenta_dialog_component_1 = require("./dialogs/resumen.cuenta.dialog/resumen.cuenta.dialog.component");
var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                icon_1.MatIconModule,
                table_1.MatTableModule,
                radio_1.MatRadioModule,
                input_1.MatInputModule,
                button_1.MatButtonModule,
                select_1.MatSelectModule,
                core_2.MatOptionModule,
                dialog_1.MatDialogModule,
                checkbox_1.MatCheckboxModule,
                form_field_1.MatFormFieldModule,
                forms_1.ReactiveFormsModule,
                progress_spinner_1.MatProgressSpinnerModule,
                datepicker_1.MatDatepickerModule,
                core_2.MatNativeDateModule,
                menu_1.MatMenuModule,
                snack_bar_1.MatSnackBarModule,
                tree_1.MatTreeModule,
                list_1.MatListModule,
                ngx_mat_select_search_1.NgxMatSelectSearchModule,
            ],
            declarations: [
                distinct_pipe_1.DistinctPipe,
                sidebar_component_1.SidebarComponent,
                stock_grid_component_1.StockGridComponent,
                message_dialog_component_1.MessageDialogComponent,
                global_spinner_component_1.GlobalSpinnerComponent,
                global_snackbar_component_1.GlobalSnackbarComponent,
                movimientos_dialog_component_1.MovimientosDialogComponent,
                ajuste_stock_dialog_component_1.AjusteStockDialogComponent,
                inicio_stock_dialog_component_1.InicioStockDialogComponent,
                confirmation_dialog_component_1.ConfirmationDialogComponent,
                cliente_dialog_component_1.ClienteDialogComponent,
                save_report_dialog_component_1.SaveReportDialogComponent,
                whatsapp_report_dialog_component_1.WhatsappReportDialogComponent,
                mail_report_dialog_component_1.MailReportDialogComponent,
                auto_login_component_1.AutoLoginComponent,
                tree_component_1.TreeComponent,
                lista_inputs_component_1.ListaInputsComponent,
                nuevo_movimiento_dialog_component_1.NuevoMovimientoDialogComponent,
                seleccion_productos_component_1.SeleccionProductosComponent,
                agregar_producto_dialog_component_1.AgregarProductoDialogComponent,
                agregar_mercaderia_dialog_component_1.AgregarMercaderiaDialogComponent,
                modificar_movimiento_dialog_component_1.ModificarMovimientoDialogComponent,
                magnum_input_component_1.MagnumInputComponent,
                magnum_button_component_1.MagnumButtonComponent,
                magnum_select_component_1.MagnumSelectComponent,
                login_dialog_component_1.LoginDialogComponent,
                pedido_mercaderia_dialog_component_1.PedidoMercaderiaDialogComponent,
                bonificacion_general_dialog_component_1.BonificacionGeneralDialogComponent,
                bonificacion_item_dialog_component_1.BonificacionItemDialogComponent,
                producto_dialog_component_1.ProductoDialogComponent,
                resumen_cuenta_dialog_component_1.ResumenCuentaDialogComponent
            ],
            exports: [
                ajuste_stock_dialog_component_1.AjusteStockDialogComponent,
                message_dialog_component_1.MessageDialogComponent,
                global_spinner_component_1.GlobalSpinnerComponent,
                global_snackbar_component_1.GlobalSnackbarComponent,
                inicio_stock_dialog_component_1.InicioStockDialogComponent,
                stock_grid_component_1.StockGridComponent,
                sidebar_component_1.SidebarComponent,
                movimientos_dialog_component_1.MovimientosDialogComponent,
                whatsapp_report_dialog_component_1.WhatsappReportDialogComponent,
                mail_report_dialog_component_1.MailReportDialogComponent,
                auto_login_component_1.AutoLoginComponent,
                tree_component_1.TreeComponent,
                lista_inputs_component_1.ListaInputsComponent,
                nuevo_movimiento_dialog_component_1.NuevoMovimientoDialogComponent,
                seleccion_productos_component_1.SeleccionProductosComponent,
                agregar_mercaderia_dialog_component_1.AgregarMercaderiaDialogComponent,
                modificar_movimiento_dialog_component_1.ModificarMovimientoDialogComponent,
                cliente_dialog_component_1.ClienteDialogComponent,
                magnum_input_component_1.MagnumInputComponent,
                magnum_button_component_1.MagnumButtonComponent,
                magnum_select_component_1.MagnumSelectComponent,
                login_dialog_component_1.LoginDialogComponent,
                pedido_mercaderia_dialog_component_1.PedidoMercaderiaDialogComponent,
                bonificacion_general_dialog_component_1.BonificacionGeneralDialogComponent,
                bonificacion_item_dialog_component_1.BonificacionItemDialogComponent,
                producto_dialog_component_1.ProductoDialogComponent,
                resumen_cuenta_dialog_component_1.ResumenCuentaDialogComponent
            ]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());
exports.ComponentsModule = ComponentsModule;
