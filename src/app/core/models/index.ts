// Ce qu'on envoie au backend pour s'inscrire
export interface RegisterRequest{
  name : string;
  email: string;
  password: string;
}

// Ce qu'on envoie au backend pour se connecter
export interface LoginRequest{
  email : string;
  password : string;
}

// Ce que le backend nous renvoie après login/register
export interface AuthResponse{
  token : string;
  name : string;
  email : string;
}

// Ce qu'on envoie pour générer un QR code
export interface QrCodeRequest {
  contentType : string;
  contentData: any;
  foregroundColor : string;
  backgroundColor : string;
  size : number;
  logoBase64?: string;
}

// Ce que le backend nous renvoie après génération
export interface QrCodeResponse {
  id : number;
  contentType : string;
  contentData : any;
  foregroundColor: string;
  backgroundColor : string;
  size :number;
  pngUrl: string;
  svgUrl: string;
  createdAt : string;
}


// Un type de QR code (vient de /api/qrcode/types)
export interface QrCodeType{
  id :number;
  code :string;
  label : string;
  description : string;
  icon :string;
  isActive: boolean;
}

export interface UrlContent {
  url: string;
}

export interface TextContent {
  text: string;
}

export interface EmailContent {
  to: string;
  subject: string;
  body: string;
}

export interface WifiContent {
  ssid: string;
  password: string;
  security: string;
}

export interface VCardContent {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  company: string;
}
