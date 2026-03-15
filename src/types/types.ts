// ***** Auth **** //
export interface LoginRequest {
  login: string;
  password: string;
}

export interface RegisterRequest {
  login: string;
  password: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  data: {
    access_token: string;
    user: UserProfile;
  };
  message: string;
}

export interface UserProfile {
  login: string;
  name: string;
  email: string;
}

//**** Pets **** //
export interface Pet {
  id: number;
  name: string;
  commonName: string;
  description: string;
}

export interface PetsResponse {
  data: Pet[];
}

// **** Feedback **** //
export interface Feedback {
  id: number;
  name: string;
  text: string;
  rating?: number;
}

export interface FeedbackResponse {
  data: Feedback[];
}

// **** Cameras **** //
export interface Camera {
  id: number;
  petId: number;
  description: string;
  images: string[];
}

// **** Donation **** //
export interface DonationRequest {
  name: string;
  email: string;
  amount: number;
  petId: number;
}

export interface DonationResponse {
  success: boolean;
  message?: string;
}

// **** Saved Card (Local Storage) **** //
export interface SavedCard {
  cardNumber: string;
  expiry: string;
  cvv: string;
}

// **** API Error **** //
export interface ApiError {
  message: string;
  statusCode?: number;
}