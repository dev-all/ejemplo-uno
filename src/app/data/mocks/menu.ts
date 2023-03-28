import { MenuItem } from "../consts/interfaces/ui/menu.model";

export const MENU: MenuItem[] = [
  {
    label: 'Menú',
    icon: '',
    isTitle: true
  },

  {
    label: 'Clientes',
    icon: 'people',
    subItems: [
      {
        label: 'Cliente',
        icon: 'people',
        link: '/clientes'
      }
    ]
  },
  {
    label: 'Productos',
    icon: 'inventory_2',
    subItems: [
      {
        label: 'Productos',
        icon: 'inventory_2',
        link: '/productos/list'
      },
      {
        label: 'Movimiento entre depositos',
        icon: 'inventory_2',
        link: '/movimiento-depositos'
      },
    ]
  },
  {
    label: 'Depósito',
    icon: 'storage',
    subItems: [
      {
        label: 'Control de Stock',
        icon: 'storage',
        link: '/productos/stock'
      }
    ]

  },

  {
    label: 'Facturación',
    icon: 'attach_money',
    subItems: [
      {
        label: 'Ventas',
        icon: 'attach_money',
        link: '/ventas',
      }
    ]
  },
  {
    label: 'Developer',
    icon: '',
    subItems: [
      {
        label: 'test',
        icon: 'attach_money',
        link: '/test',
      },
      {
        label: 'form',
        icon: 'attach_money',
        link: '/test/form',
      }
    ]
  },
  {
    label: 'MAGNUM',
    icon:'dashboard_customize',
    isTitle: true
  },

];
