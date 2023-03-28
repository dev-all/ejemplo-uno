export interface ISidenavMenu{
  id?: number;
  label?: string;
  icon?: string;
  link?: string;
  expanded?: boolean;
  subItems?: any;
  isTitle?: boolean;
  badge?: any;
  parentId?: number;
  method?: () => any;
//  permission?: () => any;

}
