export interface SubMenuItem {
  label: string;
  href: string;
  icon?: string;
  roles?: string[];
}

export interface MenuItem {
  label: string;
  href: string;
  icon: string;
  items?: SubMenuItem[];
  roles?: string[];
}

export interface MenuGroup {
  groupLabel: string;
  items: MenuItem[];
}
