export interface DashboardListItem {
  displayName: string;
  id: string;
  starred: boolean;
}

export interface FullItemInfo {
  access: Access;
  allowedFilters: [];
  dashboardItems: DashboardItem[];
  displayName: string;
  id: string;
  restrictFilters: false;
  starred: true;
}

interface Access {
  delete: boolean;
  externalize: boolean; 
  manage: boolean; 
  read: boolean; 
  update: boolean; 
  write: boolean;
}

export interface DashboardItem {
  h: number; 
  id: string;
  reports: [];
  resources: [];
  type: string;
  users: [];
  visualization?: Visualization;
  text?: string;
  map: {id: string, name: string}
  shape?: string;
  w: number;
  x: number;
  y: number;
}

interface Visualization {
  type: string;
  id: string;
  name: string;
}