"use strict";
exports.__esModule = true;
exports.MainRoutes = void 0;
var router_1 = require("@angular/router");
var cliente_component_1 = require("src/app/pages/cliente/cliente.component");
var home_component_1 = require("src/app/pages/home/home.component");
var movimiento_deposito_component_1 = require("src/app/pages/movimiento-deposito/movimiento-deposito.component");
var pdf_viewer_component_1 = require("src/app/pages/pdf.viewer/pdf.viewer.component");
var product_component_1 = require("src/app/pages/producto/product.component");
var ventas_component_1 = require("src/app/pages/ventas/ventas.component");
var home_component_2 = require("./home.component");
var routes = [
    {
        path: '',
        component: home_component_2.HomeLayout,
        children: [
            {
                path: '',
                component: home_component_1.HomePage
            },
            {
                path: 'productos',
                component: product_component_1.ProductPage
            },
            {
                path: 'movimiento-depositos',
                component: movimiento_deposito_component_1.MovimientoDepositoPage
            },
            {
                path: 'ventas',
                component: ventas_component_1.VentasComponent
            },
            {
                path: 'pdf-viewer/:binaryData/:reportType',
                component: pdf_viewer_component_1.PdfViewerPage
            },
            {
                path: 'clientes',
                component: cliente_component_1.ClienteComponent
            },
            {
                path: '**',
                redirectTo: ''
            },
        ]
    },
];
exports.MainRoutes = router_1.RouterModule.forChild(routes);
