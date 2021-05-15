export interface CloudAccount {
  _id: string,
  displayName: string,
  cloudProvider: string,
  accessKey: string,
  secretKey: string,
  scanInterval: number
}
